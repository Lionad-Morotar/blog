---
title: Electron
description: Electron 桌面应用开发，重点是薄壳加载远程站点的安全基线、系统集成与分发更新
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

#### 加载远程内容的安全清单：默认放行与导航接管才是硬门

隔离三件套（`contextIsolation`、`sandbox`、`nodeIntegration: false`）在新版已是默认值，显式钉死即可；
真正出事故的是清单后半：`setPermissionRequestHandler` 对远程内容的权限请求默认自动批准，通知、地理位置、
摄像头都会直接放行；`will-navigate` 与 `setWindowOpenHandler` 不接管时，站点可以把窗口导航到任意 URL
或弹出新窗；所有 IPC 消息必须校验 sender；`shell.openExternal` 只喂白名单 URL。官方清单共 20 条，
对加载远程内容的壳可收敛为五组：隔离、导航接管、权限审批、IPC 校验、fuses。

见：[Security Recommendations](https://www.electronjs.org/docs/latest/tutorial/security)

#### macOS 15+ 无签名应用失去右键绕过 Gatekeeper

Apple 在 macOS Sequoia（15）移除了 Control-click 绕过 Gatekeeper 的老路径。adhoc 签名对 Gatekeeper
等同「未正确签名」：用户从 DMG 拖出的应用首次双击会被硬拦，唯一放行路径是「系统设置 → 隐私与安全性 →
仍要打开」；quarantine（隔离属性）叠加时还会报「已损坏，建议移到废纸篓」，只能
`xattr -dr com.apple.quarantine` 补救。无签名分发的产品决策（手动下载 DMG、更新提示）必须把这条放行
教程算进用户体验与验收成本。

见：[Updates to runtime protection in macOS Sequoia](https://developer.apple.com/news/?id=saqachfa)

#### Windows 开机自启必须指向 stub 启动器，而非可执行文件

Squirrel.Windows 的安装布局是 `%LocalAppData%\<app>\app-<version>\`，每次更新换版本目录。
`app.setLoginItemSettings` 不传 `path` 时默认写 `process.execPath`，注册表里的自启项指向版本目录内的
exe，下一轮自动更新后旧路径失效，自启静默消失。官方文档示例把 `path` 指向版本目录上一级的 stub
启动器。自启功能的验收必须包含「自动更新一轮之后仍然生效」。

见：[app.setLoginItemSettings](https://www.electronjs.org/docs/latest/api/app#appsetloginitemsettingssettings-macos-windows)

#### asar 不是保护，fuses 才是闸门

`app.asar` 任何人 `npx asar extract` 一秒解开；且 Electron 默认按 `app.asar → app → default_app.asar`
顺序定位代码，往资源目录丢一个 `app` 文件夹就能整体劫持应用。真正的闸门是打包后翻转的 fuses（熔断开关）：
关 `runAsNode`（否则 `ELECTRON_RUN_AS_NODE=1` 可把应用当纯 Node 进程跑，主进程防护全部旁路）、
开 `onlyLoadAppFromAsar` 与 asar 完整性校验。代价要知情：关掉 `runAsNode` 后主进程里
`child_process.fork` 会失效（它依赖该环境变量）；2025 年的 CVE-2025-55305 也证明完整性校验存在旁路
窗口。加载远程内容的壳应把它当纵深防御的一层，不是终点。

见：[Electron Fuses](https://www.electronjs.org/docs/latest/tutorial/fuses)

#### 深链与自定义启动参数共用 argv 通道

应用自定义命令行参数（如环境切换）后，深链处理会与之打架：macOS 深链走 `open-url` 事件、不进 argv；
Windows/Linux 深链走 `second-instance` 事件的 commandLine，里面同时躺着自定义参数、Electron 内部参数
和深链 URL，「取最后一个元素」的官方示例写法在加入自定义参数后不再可靠。环境类参数解析必须容忍 argv
里混着协议 URL，且深链解析要在环境判定之后执行，否则一次从深链冷启动就会把应用带进错误环境。

见：[Launch app from URL in another app](https://www.electronjs.org/docs/latest/tutorial/launch-app-from-url-in-another-app)

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

#### 导航白名单有三个静默盲区

`will-navigate` 只在「用户或页面发起导航」时触发，三个盲区都藏在这个限定里。其一，服务端 302
重定向发生在导航进行中，走的是 `will-redirect` 事件：只挂 `will-navigate` 的白名单，会被可信页面
的一跳 302 静默带到外域。其二，壳自身的程序化 `loadURL`（起窗、恢复会话）同样不触发
`will-navigate`，首屏 URL 天然免检，必须按受信输入对待。其三，官方文档明确：对任一可取消事件调用
`preventDefault()` 后，后续导航事件链不再触发，双事件各自的裁决缺一不可。解法是 `will-navigate` 与
`will-redirect` 各挂一份同白名单裁决。

见：[webContents navigation events](https://www.electronjs.org/docs/latest/api/web-contents)

#### 权限白名单要两层执法：request 与 check handler 缺一不可

站点和权限打交道有两种动作：真要权限（`getUserMedia`、`Notification.requestPermission`）触发授权
流程，走 `setPermissionRequestHandler`；只是打听状态（`navigator.permissions.query`）走同步的
`setPermissionCheckHandler`。check handler 未设置时，Electron 对查询默认返回 granted：站点 UI 显示
「通知已开启」，实际发通知又被 request handler 拒掉，前端拿着假状态做出一连串误判（社区 issue 记录
`permissions.query` 恒返回 granted，且裁决 API 只有布尔、没有 prompt 态）。解法是两个 handler 共用
同一个裁决纯函数，两层答案天然一致。另一个粒度事实：media 的授权单位是整个 permission 而非单个设备，
audio+video 组合请求拆不开、只能整体拒，请求里缺 `mediaTypes` 时按拒绝处理。

见：[session.setPermissionCheckHandler](https://www.electronjs.org/docs/latest/api/session#sessetpermissioncheckhandlerhandler)

#### 纯本地落盘的 crashReporter 仍有外泄面，用不可达域焊死

应用只想把崩溃 minidump 存本地时，常规做法是 `crashReporter.start` 设 `uploadToServer: false`。
但这是运行期开关而不是封印：后续任何代码调 `crashReporter.setUploadToServer(true)`，本地积累的
minidump（含进程内存快照，属敏感数据）就开始往 `submitURL` POST。占位解法是给 `submitURL` 填一个
`.invalid` 伪域（IANA 保留的永不可达顶级域，同族还有 `.test`、`.example`）：文档虽标注
`uploadToServer: false` 时 `submitURL` 可省，伪域把「不上报」从约定升级为网络层不可能，将来误开
上传包也发不到任何真实服务器。两个装配事实：`start()` 只监控其后创建的进程，必须最先装配；
minidump 落盘目录的文件布局是官方明说的实现细节，别写代码去读，将来要传数据应自建 `submitURL` 接收端。

见：[Crash Reporting](https://www.electronjs.org/docs/latest/tutorial/crash-reporting)

#### 日志器要防 EPIPE 反杀主进程

开发期 dev runner（父进程）退出后，接着主进程 stdout 的管道随之关闭，主进程还在打日志，就会撞上
EPIPE（向已关闭管道写数据的错误码）。EPIPE 有两种抵达方式：同步 throw，`try/catch` 能抓住；异步
`error` 事件，`try/catch` 早就执行过去了抓不住。而 Node 有条铁律：EventEmitter 发出 `error` 事件
而没有任何监听器时进程直接崩溃，默认没人监听 stdout 的 error 事件，一条日志就能杀掉主进程，症状是
「应用莫名退出」。防御必须两层各防一种抵达方式：`process.stdout`/`process.stderr` 各挂 error 监听
选择性吞 EPIPE（其余照抛，真错误不掩盖），`console` 调用外再包一层同步 `try/catch` 只吞 EPIPE。

见：[Note on process I/O](https://nodejs.org/api/process.html#a-note-on-process-io)
