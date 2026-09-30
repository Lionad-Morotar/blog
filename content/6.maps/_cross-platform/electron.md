---
title: Electron
description: Electron 桌面应用开发：薄壳架构、环境与构建、窗口与运行时行为
---

#### Electron 薄壳是什么：可分发的自定义浏览器

Electron 把 Chromium（渲染进程）与 Node.js（主进程）打包成桌面应用，本质是「自带浏览器的可分发发行版」。
薄壳（thin shell）形态指壳只加载远程站点、不含本地运行时：它为 Web 应用补上浏览器给不了的两样东西，
OS 能力面（托盘、通知、深链、开机自启、全局快捷键、下载管理）和自主分发更新通道。

与相邻形态的分界：PWA/TWA 没有主进程，能力受浏览器沙箱与商店审核限制；iframe 嵌入没有进程级隔离；
厚壳是薄壳加本地运行时。壳与站点解耦的惯用契约是预加载脚本（preload）经 contextBridge 白名单暴露 API，
站点侧做特性检测（如 `window.myShell?.bridgeVersion`），壳向后兼容、站点降级可用，两边独立发版。

版本节奏是隐含成本：官方只支持最新 3 个 major，约 8 周发一个 major，Chromium 安全补丁驱使壳持续升级。

见：[Process Model](https://www.electronjs.org/docs/latest/tutorial/process-model)

#### 薄壳骨架的装配顺序、会话分区与可测性切分

一个最小可用的薄壳骨架，装配顺序有四条原则：`crashReporter.start` 放最前（它只监控其后创建的进程，
晚装就漏掉更早创建的 renderer/GPU 子进程的崩溃）；单实例锁在 app ready 前裁决，抢不到直接退出，
不付 ready 成本；logger 不 import electron、日志目录由入口注入，锁失败的退出路径上日志依然可用；
权限守卫先于起窗，远程内容第一个请求到达时裁决已就位。

远程内容走 `session.fromPartition('persist:xxx')` 独立分区，与默认会话隔离。可测性的切法是把
「导航白名单判定」「权限裁决」「日志保留期」提炼成与 electron 解耦的纯函数入 vitest 套件，
依赖 electron 运行时的装配层不自动化测试，策略层全测、装配层靠运行验证。构建出双目标产物：
main 打 ESM，preload 打 CJS，`.cjs` 后缀在 `"type":"module"` 包体内强制按 CJS 解析，因为 sandbox
渲染进程不支持 ESM preload。桥 API 未定型前 preload 宁可空占位：半截 API 会进站点特性探测面造成误判。

见：[Security Recommendations](https://www.electronjs.org/docs/latest/tutorial/security)

#### 薄壳多环境协议与壳内静态页

薄壳的多环境协议收成三条通道：`--env=<value>` 等号形式启动参数优先，环境变量次之，默认生产环境，
非法值 fail-fast 退出而非静默回退（连错环境比启动失败更难排查）。只认等号形式是刻意的：两段式
`--env local <深链URL>` 的位置参数归属有歧义，单义形式让深链参数永不误入环境解析；多个参数最后生效
与常见 CLI 覆写语义一致。壳加载不了时用户看什么，收进随包分发的 `file://` 单 HTML 静态页：等待、错误、
关于三态共用一副骨架，态经 `query.page` 传入、页内 URLSearchParams 自渲染，不用 executeJavaScript、
不依赖桥，裸壳期即可用；错误页重试链接直接把站点 URL 写进 href，点击走导航白名单回站，执法复用、
不新增放行逻辑。纯本地面板小窗（关于窗类）要全拒导航转系统浏览器，不能复用主窗白名单，可信域被载入
不可缩放小窗是 UX 陷阱。菜单不可省：macOS 无 Edit 菜单时 Cmd+C/V 等快捷键失效，视图 reload 留作
断网恢复的手动通道。

见：[Application Menu](https://www.electronjs.org/docs/latest/api/menu)

#### loadFile 相对路径跟着应用根漂移

在编译产物目录里写 `win.loadFile('../renderer/page.html')`，直觉上它相对当前入口文件解析、命中同级
目录，实际运行落到一个不存在的位置。机制在 Electron 源码里：loadFile 是
`path.resolve(app.getAppPath(), filePath)`，相对「应用根」而非入口文件，而 appPath 取决于启动方式，
从仓库根起 `electron <子目录>` 与从包目录起，同一个相对路径解析到完全不同的位置。文档只有一句模糊的
「relative to the root of your application」。稳态写法是 `join(import.meta.dirname, 相对产物路径)`
拼绝对路径传给 loadFile，与编译产物位置绑定、与启动方式解耦。

见：[contents.loadFile](https://www.electronjs.org/docs/latest/api/web-contents#contentsloadfilefilepath-options)

#### did-fail-load 把取消也报成失败

探活就绪切站的瞬间，进行中的壳页导航被新导航打断，`did-fail-load` 触发、错误码 ERR_ABORTED(-3)：
官方文档对事件语义的原文是「load failed **or was cancelled**」，取消（window.stop、新导航抢占）也走
失败事件。见失败就切兜底页的编排会自己制造假故障。失败处理要三分：`isMainFrame` 为假直接忽略（子资源
失败不切页）；ERR_ABORTED 视为编排性中止而非故障；`file:` 协议自身的失败不切页，错误页加载失败再切
错误页是递归死循环。任何「导航失败 → 兜底页」的编排都需要这三分。

见：[did-fail-load](https://www.electronjs.org/docs/latest/api/web-contents#event-did-fail-load)

#### net.fetch 与 Node fetch 是两套网络栈

主进程里有两个同名 fetch：全局的走 Node 的 HTTP 栈（undici），`net.fetch` 走 Chromium 网络栈。
差别不是性能是视角：net.fetch 自动走系统代理（wpad/pac、NTLM/Kerberos 认证代理）、HTTPS 隧道、
挂在 defaultSession 上、会触发 webRequest 钩子，且 app ready 之前调用直接抛错。探活与健康检查选哪个
决定「谁视角的可达」，公司内网强制代理的环境里两者结论可能相反。限制要知情：不支持 `data:`/`blob:`
协议，返回 Response 的 `.type`/`.url` 值不可靠，探活只用「resolve 还是 reject」则不受影响。

见：[net.fetch](https://www.electronjs.org/docs/latest/api/net#netfetchinput-init-options)

#### 探活口径由探测对象的生命周期特征决定

dev server 已起但路由未就绪时，HEAD 请求返回 404，对任意路径返回 404/302 是 dev server 的常态。
探活判定若写成「2xx 才算活」，会得到服务明明在、壳永远在等待的假死。判定口径必须跟着探测对象走：
探测目标是 dev server 时收成「有 HTTP 响应即活」（fetch 抛错才算未起），配 `redirect: 'manual'`
防跟随（重定向会漂移判定语义）；轮询用 setTimeout 链而非 setInterval，上一轮在途时不叠加下一轮。
同一套代码拿去探生产健康检查，口径要反过来：200 且校验响应体内容。

见：[fetch() redirect option](https://developer.mozilla.org/en-US/docs/Web/API/fetch#redirect)

#### 日志器要防 EPIPE 反杀主进程

开发期 dev runner（父进程）退出后，接着主进程 stdout 的管道随之关闭，主进程还在打日志，就会撞上
EPIPE（向已关闭管道写数据的错误码）。EPIPE 有两种抵达方式：同步 throw，`try/catch` 能抓住；异步
`error` 事件，`try/catch` 早就执行过去了抓不住。而 Node 有条铁律：EventEmitter 发出 `error` 事件
而没有任何监听器时进程直接崩溃，默认没人监听 stdout 的 error 事件，一条日志就能杀掉主进程，症状是
「应用莫名退出」。防御必须两层各防一种抵达方式：`process.stdout`/`process.stderr` 各挂 error 监听
选择性吞 EPIPE（其余照抛，真错误不掩盖），`console` 调用外再包一层同步 `try/catch` 只吞 EPIPE。

见：[Note on process I/O](https://nodejs.org/api/process.html#a-note-on-process-io)

#### tsup 的 external 默认值会在 sandbox preload 里炸桥

sandbox 模式下 preload 脚本的 `require` 只能加载 electron 自身的一小部分 API，没有加载 node_modules
任意包的能力；而 tsup 打包时对 package.json `dependencies` 与 `peerDependencies` 声明的包一律
external 化（产物保留裸包名引用，假设来自发 npm 库场景：使用方安装时会自动带上）。两者相撞：桥代码
import 的依赖若放在 dependencies，产物在 sandbox 里解析裸包名失败，**整个 preload 脚本顶层抛错死亡**，
`window` 上的桥注入从未发生。症状不是构建报错也不是崩溃，而是桥静默消失、站点特性检测探不到壳，
无栈可查。解法：两端产物 external 只留 electron，被打包的依赖归位 devDependencies（tsup 只 bundle
devDependencies），这在壳包里反转了「devDependencies 是构建期依赖」的常规语义。

见：[tsup Excluding packages](https://tsup.egoist.dev/#excluding-packages)

#### getAllWindows()[0] 不是你的主窗

`BrowserWindow.getAllWindows()` 返回所有窗口的数组，主窗、关于窗混在一起，「主窗」在 Electron 眼里
没有任何特殊标记，谁是主窗是业务概念。两层坏法：其一，深链投递或前置聚焦写 `getAllWindows()[0]`，
关于窗开着时数组首位可能就是它，消息发给没有订阅的窗口石沉大海；其二，用 `getAllWindows().length
=== 0` 判断「无窗才重建主窗」，主窗已关、关于窗存活时长度是 1，误判为有窗，主窗永不重建，订阅者永不
出现，深链在缓冲队列里永无补投触发点，用户点击静默落空，全程无报错。解法是模块级变量显式跟踪主窗
引用，`closed` 时清掉、用前查 `isDestroyed()`，投递、聚焦、activate 复活语义只认它；macOS 拉起另需
应用级 `app.show()`，窗口级 show/focus 不足以把应用带到前台。

见：[BrowserWindow](https://www.electronjs.org/docs/latest/api/browser-window#class-browserwindow)
