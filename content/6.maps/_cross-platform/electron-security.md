---
title: Electron 安全基线
description: 加载远程内容的安全清单、导航白名单盲区、回环域判定形态与权限双层执法
---

#### 加载远程内容的安全清单：默认放行与导航接管才是硬门

隔离三件套（`contextIsolation`、`sandbox`、`nodeIntegration: false`）在新版已是默认值，显式钉死即可；
真正出事故的是清单后半：`setPermissionRequestHandler` 对远程内容的权限请求默认自动批准，通知、地理位置、
摄像头都会直接放行；`will-navigate` 与 `setWindowOpenHandler` 不接管时，站点可以把窗口导航到任意 URL
或弹出新窗；所有 IPC 消息必须校验 sender；`shell.openExternal` 只喂白名单 URL。官方清单共 20 条，
对加载远程内容的壳可收敛为五组：隔离、导航接管、权限审批、IPC 校验、fuses。

见：[Security Recommendations](https://www.electronjs.org/docs/latest/tutorial/security)

#### 导航白名单有三个静默盲区

`will-navigate` 只在「用户或页面发起导航」时触发，三个盲区都藏在这个限定里。其一，服务端 302
重定向发生在导航进行中，走的是 `will-redirect` 事件：只挂 `will-navigate` 的白名单，会被可信页面
的一跳 302 静默带到外域。其二，壳自身的程序化 `loadURL`（起窗、恢复会话）同样不触发
`will-navigate`，首屏 URL 天然免检，必须按受信输入对待。其三，官方文档明确：对任一可取消事件调用
`preventDefault()` 后，后续导航事件链不再触发，双事件各自的裁决缺一不可。解法是 `will-navigate` 与
`will-redirect` 各挂一份同白名单裁决。

见：[webContents navigation events](https://www.electronjs.org/docs/latest/api/web-contents)

#### 回环白名单认不全形态：URL 层与解析层各自维护必然漂移

白名单条目本身之外，同一份清单在两个消费层各自抄写也会静默失守。WHATWG URL 解析后
`url.hostname` 对 IPv6 字面量恒输出带方括号形态（`http://[::1]:1886/` 的 hostname 是 `[::1]`），
而 DNS 解析、hosts 文件、手写配置里出现的是裸 `::1`，同一台回环机两种拼写。Electron 壳的典型事故：
URL 层白名单只认带括号形态，下载链路的解析层豁免清单却只写裸形态，两处各自维护漂移后，IPv6 回环
在 URL 层即被拒；白名单判定的失败模式是 return false 而非 throw，形态失配静默变现为「功能不通」，
没有任何报错。更深的坑是 IPv4-mapped 形态：URL 里写 `http://[::ffff:127.0.0.1]:1886/`，hostname
出来是 `[::ffff:7f00:1]`，WHATWG 规范要求 IPv6 按压缩规则重序列化，dotted 形态被改写成纯十六进制词，
手写清单放哪种拼写都只能匹配一半来源。回环等价形态全集不可枚举（带括号/裸/dotted-mapped/hex-mapped
至少四种），清单式判定注定漏网；完备解是语义判定（ipaddr.js 的 `range() === 'loopback'`），
Chromium 内部用 IsLoopbackIp 而非字符串比对正是此因。工程纪律：回环判定做成单一导出纯函数，
URL 层白名单与解析层豁免面消费同一份，物理上杜绝两处清单漂移。

见：[URL Standard](https://url.spec.whatwg.org/)

#### localhost 第一跳常是 ::1：Node 17 的 verbatim 解析顺序

回环清单必须认 ::1 不是锦上添花，而是 Node 17 之后的常态要求。Node 17 起 `dns.lookup` 默认
`verbatim: true`，解析结果按 OS 返回顺序直出、不再重排成 IPv4 优先；macOS/Linux 开 IPv6 的机器上
`localhost` 第一条常是 `::1`（实测 `dns.lookup('localhost', {all: true})` 返回 `[::1, 127.0.0.1]`）。
当年大量项目踩坑：服务端只 bind 127.0.0.1，客户端按名字连 localhost 拿到 ::1，直接 `ECONNREFUSED ::1`
（vercel/vercel#7306 是典型现场，社区绕法是删 hosts 里的 ::1 条目）。对白名单的决策影响：::1 是现代
Node 环境回环流量的常态第一形态，任何「本机回环」判定的清单少了它，默认拓扑下第一个被拒的就是正常流量。

见：[nodejs/node#40702](https://github.com/nodejs/node/pull/40702)

#### 0.0.0.0 双面性：dev server 的入口形态与浏览器的 bypass 载体

与 ::1 相对，0.0.0.0 要不要进白名单是更细的裁决。连接语义侧：0.0.0.0 是 RFC 1122 的「本网络」
占位符，各 OS 的 connect 把它路由到本机回环，macOS 实测 `curl http://0.0.0.0:1886/` 与 127.0.0.1
同样返回 200，这正是 dev server 监听通配地址时框架把它打印为 Local 入口的原因。安全语义侧：
Oligo Security 2024 年披露的 "0.0.0.0 Day"（存在 18 年）证明公网恶意页面可经 `http://0.0.0.0/`
直连本机 API，当时绕过了 Chromium 专为此设的 PNA（Private Network Access）；各浏览器其后陆续收口，
macOS Sequoia 也对浏览器访问加了确认，但 curl 等非浏览器路径不受影响。决策含义：把 0.0.0.0 纳入
可信清单必须带环境门，本地 dev 环境下它是入口形态，进入生产白名单等于把一个公网页面也能触达的
本机别名放进可信域族。同族裁决：局域网私网段（RFC1918）不要顺手放宽，白名单的语义边界是
「本机」而非「同网段」，放宽只增加攻击面。

见：[0.0.0.0 Day: Exploiting Localhost APIs From the Browser](https://www.oligo.security/blog/0-0-0-0-day-exploiting-localhost-apis-from-the-browser)

#### 整个 .localhost 顶级域都是本机：RFC 6761 的保留语义

除地址形态外，名字域也有整块保留区。RFC 6761 把 `localhost` 及其一切子域保留给回环，
Chrome/Firefox/Safari 均实现：`build-a.localhost` 不经 DNS、不看 hosts 文件，直接解析到 127.0.0.1
（draft-west-let-localhost-be-localhost 进一步要求 stub resolver 必须如此）。这制造了「浏览器视为本机、
清单不认」的形态：dev 场景用子域拆环境（`app.localhost` / `api.localhost` 是 Vite 生态常见实践）时，
白名单若只精确匹配 `localhost` 会把这些同机域名全部拒绝，且拒绝点在导航守卫、症状是页面打不开
而非报错。若需支持，匹配形态是 `endsWith('.localhost')` 而非追加清单条目，它是域级保留语义，
与地址级枚举是两种粒度。

见：[RFC 6761](https://datatracker.ietf.org/doc/html/rfc6761)

#### 权限白名单要两层执法：request 与 check handler 缺一不可

站点和权限打交道有两种动作：真要权限（`getUserMedia`、`Notification.requestPermission`）触发授权
流程，走 `setPermissionRequestHandler`；只是打听状态（`navigator.permissions.query`）走同步的
`setPermissionCheckHandler`。check handler 未设置时，Electron 对查询默认返回 granted：站点 UI 显示
「通知已开启」，实际发通知又被 request handler 拒掉，前端拿着假状态做出一连串误判（社区 issue 记录
`permissions.query` 恒返回 granted，且裁决 API 只有布尔、没有 prompt 态）。解法是两个 handler 共用
同一个裁决纯函数，两层答案天然一致。另一个粒度事实：media 的授权单位是整个 permission 而非单个设备，
audio+video 组合请求拆不开、只能整体拒，请求里缺 `mediaTypes` 时按拒绝处理。

见：[session.setPermissionCheckHandler](https://www.electronjs.org/docs/latest/api/session#sessetpermissioncheckhandlerhandler)
