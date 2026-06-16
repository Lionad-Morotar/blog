---
title: CLI 测试、文档与发布
description: 命令行工具的质量保障、文档规范与自动化发布流程
---

#### E2E 测试应基于编译后的二进制文件

CLI 的核心价值在于命令行接口的行为正确性，因此端到端测试必须基于编译后的二进制文件执行，而非直接调用内部函数。关键原则包括：在受控环境中测试真实二进制文件；使用不同目录或扩展名区分测试类型；控制环境（临时目录、隔离配置、mock 外部服务）；使用 Golden Files 存储预期输出；新测试需多次运行验证稳定性后才能合并。Google Gemini CLI 的测试结构包括 `integration-tests/`、`memory-tests/` 和 `perf-tests/`，并在测试前先执行构建。

见：[Shopify CLI Testing Strategy](https://shopify.github.io/cli/cli/testing-strategy.html)，[End-to-End command line tool testing](https://pkaramol.medium.com/end-to-end-command-line-tool-testing-with-bats-and-auto-expect-7a4ffb19336d)

#### 帮助信息应作为最重要的文档入口

`--help` 是 CLI 最重要的文档入口，应在 `-h`、`--help` 以及 `help` 子命令上显示。帮助文本应将示例放在首位，显示最常用的标志和命令，包含描述、示例、常见标志和指向完整帮助的链接，并提供支持路径。`--help` 不等于 `man`——两者应同时支持：`--help` 提供快速参考，man 手册遵循 Linux man-pages 标准结构（NAME、SYNOPSIS、DESCRIPTION、OPTIONS、EXIT STATUS、ENVIRONMENT、FILES、EXAMPLES、SEE ALSO）提供深度文档。

见：[Command Line Interface Guidelines](https://clig.dev/)，[10 design principles for delightful CLIs](https://www.atlassian.com/blog/it-teams/10-design-principles-for-delightful-clis)，[man-pages(7)](https://linux.die.net/man/7/man-pages)

#### 发布流程应采用 SemVer 与 Conventional Commits

专业 CLI 的发布流程应实现完全自动化。语义化版本控制要求版本号格式为 `MAJOR.MINOR.PATCH`：MAJOR 表示不兼容 API 变更，MINOR 表示向后兼容功能添加，PATCH 表示问题修复。Conventional Commits 通过提交消息前缀自动推断版本号：`fix:` 对应 Patch，`feat:` 对应 Minor，`feat!:` 或 `BREAKING CHANGE:` 对应 Major。Node.js 生态通常使用 semantic-release 自动确定版本、生成变更日志、创建 Git 标签和 GitHub Release；Go 生态则使用 GoReleaser 实现跨平台编译、打包和分发。

见：[Semantic Versioning](https://semver.org/)，[Conventional Commits](https://www.conventionalcommits.org/)，[Building CLI Apps in Go with Cobra & Viper](https://www.glukhov.org/developer-tools/cli-tools/go-cli-applications-with-cobra-and-viper/)

#### 跨平台分发优先考虑单二进制文件

专业 CLI 应尽可能分发为单二进制文件，简化安装和卸载。Go 和 Rust 在这方面具有天然优势。分发渠道包括原生包安装程序（Homebrew、apt、choco、scoop）以及 `curl | sh` 或 `npm install -g` 等方式。版本信息应在构建时通过链接器标志注入（如 Go 的 `-ldflags "-X main.Version=$(VERSION)"`），而非硬编码。向后兼容策略上，应尽可能保持变更叠加，非叠加性变更前发出警告，改变人类可读输出通常可接受，但应鼓励脚本使用 `--plain` 或 `--json`。

见：[Command Line Interface Guidelines](https://clig.dev/)，[Building CLI Apps in Go with Cobra & Viper](https://www.glukhov.org/developer-tools/cli-tools/go-cli-applications-with-cobra-and-viper/)，[Node.js CLI Apps Best Practices](https://github.com/lirantal/nodejs-cli-apps-best-practices)
