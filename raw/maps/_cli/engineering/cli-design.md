# CLI 设计哲学与用户体验

> 命令行工具的设计原则、交互模式与可访问性实践

#### CLI 设计应从"功能优先"转向"人机并重"

现代 CLI 不再只是功能的文本入口，而是需要同时服务人类用户和自动化脚本。clig.dev 提出"人类优先"原则：即使工具主要用于脚本，也应首先为人类设计。Atlassian 进一步强调与既定惯例对齐，例如 `-h` 表示帮助、
`-v` 表示版本，避免破坏用户心智模型。ThoughtWorks 建议采用 `platform-cli [noun] [verb]` 的命名结构和 kebab-case 规范。

人机并重的输出设计体现在：默认输出为人类可读的格式化文本，自动检测 TTY 环境；同时提供 `--json`、`--yaml` 等结构化输出，以及 `--plain` 纯文本表格，方便脚本解析。
这种双重设计是区分业余与专业 CLI 的根本标志。

见：[Command Line Interface Guidelines](https://clig.dev/)，[10 design principles for delightful CLIs](https://www.atlassian.com/blog/it-teams/10-design-principles-for-delightful-clis)，[Elevate developer experiences with CLI design guidelines](https://www.thoughtworks.com/en-cn/insights/blog/engineering-effectiveness/elevate-developer-experiences-cli-design-guidelines)

#### 交互式提示与非交互式标志应共存

交互式命令不应替代非交互式命令。最佳实践是在 `stdin` 为 TTY 时提供交互式提示，引导用户完成操作；同时始终提供等效的标志或参数，支持 `--yes`、
`--non-interactive` 或 `-f/--force` 用于 CI/CD 等自动化场景。ThoughtWorks 将这一原则表述为"尽可能提示，但绝不强制"。为缺失的必需信息提供智能默认值，允许用户直接按 Enter 继续，
也能显著降低使用门槛。

见：[Command Line Interface Guidelines](https://clig.dev/)，[UX patterns for CLI tools](https://lucasfcosta.com/blog/ux-patterns-cli-tools)，[Elevate developer experiences with CLI design guidelines](https://www.thoughtworks.com/en-cn/insights/blog/engineering-effectiveness/elevate-developer-experiences-cli-design-guidelines)

#### 上下文感知降低用户认知负荷

通过自动检测项目文件（如 `package.json`、`.git`、配置文件），CLI 可以推断用户意图并调整行为。npm 是这一模式的典范：`npm install` 自动读取当前目录的 `package.json`，
`npm ci` 专门读取 `package-lock.json`，`npm run build` 优先使用本地 `./node_modules/.bin/` 中的二进制文件。
Kubernetes 的 `kubectl` 则展示了命令树一致性带来的可预测性——`<tool> <action> <resource> [name] [flags]` 的结构使用户能够举一反三。

见：[UX patterns for CLI tools](https://lucasfcosta.com/blog/ux-patterns-cli-tools)

#### 可访问性是专业 CLI 的隐形门槛

NO_COLOR、TERM=dumb、XDG 合规等功能不会出现在功能清单上，但缺失它们会立即暴露工具的不成熟。AFixt 的指南指出，ANSI 转义序列会被屏幕阅读器读作字面字符，造成乱码输出。专业 CLI 应：
检测 `NO_COLOR` 并禁用颜色；在 `TERM=dumb` 或非 TTY 环境下禁用动画；提供 `--json` 等结构化输出；不通过颜色单一传达信息。
优先级应为 `NO_COLOR` > `FORCE_COLOR` > `TERM=dumb` > TTY 检测。

见：[Improving Command Line Interfaces for All Users](https://afixt.com/accessible-by-design-improving-command-line-interfaces-for-all-users)，[Command Line Interface Guidelines](https://clig.dev/)，[CLI UX best practices](https://evilmartians.com/chronicles/cli-ux-best-practices-3-patterns-for-improving-progress-displays)

#### 错误消息应包含可操作修复建议

专业 CLI 的错误消息应包含清晰的故障描述、根本原因解释、问题归属（工具本身还是外部因素）、可操作的修复步骤，以及指向更多帮助的链接。Node.js CLI 最佳实践进一步建议为错误分配可追踪代码（
如 `Error (E4002): please provide an API token`），使用户能够直接搜索解决方案。

见：[Command Line Interface Guidelines](https://clig.dev/)，[Node.js CLI Apps Best Practices](https://github.com/lirantal/nodejs-cli-apps-best-practices)，[Elevate developer experiences with CLI design guidelines](https://www.thoughtworks.com/en-cn/insights/blog/engineering-effectiveness/elevate-developer-experiences-cli-design-guidelines)
