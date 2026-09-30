---
title: Electron 分发与签名
description: Electron 应用分发面的签名、Gatekeeper、开机自启与 asar 防护
---

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
