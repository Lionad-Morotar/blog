---
title: Tauri
description: Tauri 2 跨平台桌面应用开发框架
---

#### Tauri 2 的命令模式与 Capability 权限模型

Tauri 2 的前后端边界通过 `invoke` / `#[tauri::command]` 实现。前端调用 `invoke('cmd_name', args)`，
Rust 端用 `#[tauri::command]` 标注函数并在 `run()` 里注册。

调用敏感能力（如 `shell`、`opener`）时，必须在 `src-tauri/capabilities/` 中显式声明权限。
这种设计把"哪些 Web 前端能触发哪些原生能力"变成可审计的配置文件，而不是隐式信任前端代码。

见：[Tauri Commands](https://v2.tauri.app/develop/calling-rust/)

#### `tauri::async_runtime::spawn_blocking` 的用途

Tauri 底层基于 Tokio 异步运行时。当 Rust command 需要执行阻塞 IO（如读文件、跑系统命令、CPU
密集型计算）时，应使用 `tauri::async_runtime::spawn_blocking`，把任务扔到独立线程池，避免卡住主事件循环。

command 函数本身保持 `async`，用 `.await` 等待 blocking 任务结果，前端 `invoke` 体验与普通异步调用一致。

见：[Tauri Async Runtime](https://v2.tauri.app/develop/async-runtime/)
