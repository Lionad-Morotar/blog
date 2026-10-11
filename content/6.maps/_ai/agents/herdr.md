---
title: herdr
description: coding agent 的终端运行时：server/client 终端复用、agent 生命周期状态机与 tmux 的分界。
---

herdr 是为并行运行 coding agent 设计的终端工作区管理器，单 Rust 二进制，Apache-2.0，最新稳定版 v0.9.3（2026-09）。

#### herdr：为 coding agent 而生的终端运行时

herdr 是单 Rust 二进制的终端工作区管理器，架构上由后台 server 持有真实 PTY 进程、客户端只负责渲染，
detach（默认 ctrl+b q）后 agent 进程不死，重连即恢复现场。它针对两个痛点：agent 跑在普通终端里，
窗口一关或 SSH 一断进程就死；同时跑多个 coding agent 时不知道哪个在等审批、哪个已完成，只能逐个终端轮询。
与 tmux 的分界：prefix 键、detach/attach 这套键盘模型承自 tmux，但 tmux 不理解 pane 里跑的是什么，
herdr 的核心增量是 agent 生命周期状态机（working/blocked/done/idle/unknown）、状态向上汇总的侧边栏、
以及让脚本或 agent 通过 CLI/socket API 编排彼此的能力；鼠标是一等公民，键盘是可选层。
单 agent 且不需要 detach 的场景它只是多余一层，纯复用器需求 tmux/zellij 仍是更轻的选择。

见：[herdr README](https://github.com/herdrdev/herdr)
