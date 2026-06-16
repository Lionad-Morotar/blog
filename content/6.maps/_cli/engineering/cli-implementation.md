---
title: CLI 技术实现与架构
description: 命令行工具的分层架构、框架选择、错误处理与配置管理
---

#### CLI 架构应分层解耦

专业 CLI 应将命令解析、业务逻辑和输出渲染分离。这种分层不仅提高可维护性，还使工具能灵活适应交互式和脚本化两种场景。现代生产 CLI  increasingly 采用混合架构：Commander 或 oclif 处理参数解析和命令路由，Clack 或 Ink 处理交互式提示与进度显示。Claude Code 自身即使用 Commander.js 进行参数解析，React + Ink 进行终端 UI 渲染。

见：[Command Line Interface Guidelines](https://clig.dev/)，[Best CLI Frameworks for Node.js in 2026](https://www.pkgpulse.com/guides/best-cli-frameworks-nodejs-2026)，[UX patterns for CLI tools](https://lucasfcosta.com/blog/ux-patterns-cli-tools)

#### 框架选择应匹配工具复杂度

CLI 框架可按复杂度分层选择：轻量级解析器（Commander.js、yargs、cac）适合简单到中等复杂度的工具；企业级框架（oclif）适合复杂多命令、需要插件扩展性的场景，其命令懒加载和自动生成文档能力被 Heroku、Salesforce、Shopify 广泛采用；终端 UI 层（Ink、Bubble Tea）则用于构建动态交互界面，但应作为渲染层与解析器配合使用，而非替代。Go 生态的 Cobra + Viper 组合是企业级 CLI 的事实标准，Rust 生态则以 Clap 的类型安全见长。

见：[Best CLI Frameworks for Node.js in 2026](https://www.pkgpulse.com/guides/best-cli-frameworks-nodejs-2026)，[Open Sourcing oclif](https://engineering.salesforce.com/open-sourcing-oclif-the-cli-framework-that-powers-our-clis-21fbda99d33a/)，[Building CLI Apps in Go with Cobra & Viper](https://www.glukhov.org/developer-tools/cli-tools/go-cli-applications-with-cobra-and-viper/)，[Effective Error Handling in Rust CLI Apps](https://technorely.com/insights/effective-error-handling-in-rust-cli-apps-best-practices-examples-and-advanced-techniques/)

#### 错误处理应区分 stdout 与 stderr

专业 CLI 应遵循明确 I/O 规范：主要输出写入 `stdout`，日志、错误和诊断信息写入 `stderr`；成功返回退出码 0，失败返回非零退出码；为不同错误模式定义有意义的退出码（如 64 表示命令行用法错误，66 表示输入文件不存在）。Rust 生态建议使用 `Cli::try_parse()` 替代 `Cli::from_args()`，避免直接调用 `std::process::exit()`，以便正确展开堆栈和释放资源；应用级错误使用 `anyhow`，库代码使用 `thiserror` 定义结构化错误类型。

见：[Command Line Interface Guidelines](https://clig.dev/)，[Handling errors in Go CLI tools](https://youssefameachaq.com/blog/handling-errors-in-go-cli-tools/)，[Effective Error Handling in Rust CLI Apps](https://technorely.com/insights/effective-error-handling-in-rust-cli-apps-best-practices-examples-and-advanced-techniques/)

#### 配置管理应遵循 XDG 规范

XDG Base Directory Specification 将应用文件按用途分类，避免主目录污染。专业 CLI 应将配置文件放在 `$XDG_CONFIG_HOME/<app>/`（默认 `~/.config/<app>/`），数据文件放在 `$XDG_DATA_HOME/<app>/`，缓存放在 `$XDG_CACHE_HOME/<app>/`，日志/历史放在 `$XDG_STATE_HOME/<app>/`。实施优先级应为：工具特定覆盖 > XDG 环境变量 > 传统路径（向后兼容）> XDG 默认路径。向后兼容策略：先检查传统位置（如 `~/.myapp`）是否存在，若存在则继续使用或迁移，不存在则使用 XDG 标准位置。

见：[XDG Base Directory Specification](https://specifications.freedesktop.org/basedir-spec/basedir-spec-0.7.html)，[Node.js CLI Apps Best Practices](https://github.com/lirantal/nodejs-cli-apps-best-practices)，[Claude Code does not respect XDG](https://github.com/anthropics/claude-code/issues/1455)

#### 跨平台路径需要专门处理

不同操作系统的配置和数据路径存在差异：Linux/BSD 使用 `~/.config/<app>/` 和 `~/.local/share/<app>/`；macOS 传统使用 `~/Library/Application Support/<app>/`，但也可尊重 XDG 环境变量；Windows 使用 `%APPDATA%\<app>\` 和 `%LOCALAPPDATA%\<app>\`。各语言生态提供了简化实现：`os.UserConfigDir()`（Go）、`configstore`/`conf`（Node.js）、`platformdirs`（Python）、`directories`（Rust）。零配置理念则通过自动检测 `TMPDIR`、`NO_COLOR`、`DEBUG`、`HTTP_PROXY` 等通用变量，实现即插即用体验。

见：[XDG Base Directory Specification](https://specifications.freedesktop.org/basedir-spec/basedir-spec-0.7.html)，[Node.js CLI Apps Best Practices](https://github.com/lirantal/nodejs-cli-apps-best-practices)，[Building CLI Apps in Go with Cobra & Viper](https://www.glukhov.org/developer-tools/cli-tools/go-cli-applications-with-cobra-and-viper/)
