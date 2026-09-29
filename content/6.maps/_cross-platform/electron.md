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
