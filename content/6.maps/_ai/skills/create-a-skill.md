---
title: 如何编写 Agent Skills
description: 如何编写 Agent Skills - 完整指南
original_path: _ai/skills/create-a-skill.md
---


## 目录

- [核心概念](#%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5)

- [核心设计原则](#%E6%A0%B8%E5%BF%83%E8%AE%BE%E8%AE%A1%E5%8E%9F%E5%88%99)

- [Skills 与其他工具的关系](#skills-%E4%B8%8E%E5%85%B6%E4%BB%96%E5%B7%A5%E5%85%B7%E7%9A%84%E5%85%B3%E7%B3%BB)

  - [Skills vs Prompts](#skills-vs-prompts)

  - [Skills vs MCP (Model Context Protocol)](#skills-vs-mcp-model-context-protocol)

- [为什么使用 Skills](#%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BD%BF%E7%94%A8-skills)

- [Skill 的文件结构规范](#skill-%E7%9A%84%E6%96%87%E4%BB%B6%E7%BB%93%E6%9E%84%E8%A7%84%E8%8C%83)

- [SKILL.md 文件的结构要求](#skillmd-%E6%96%87%E4%BB%B6%E7%9A%84%E7%BB%93%E6%9E%84%E8%A6%81%E6%B1%82)

- [frontmatter 必需字段](#frontmatter-%E5%BF%85%E9%9C%80%E5%AD%97%E6%AE%B5)

- [frontmatter 可选字段](#frontmatter-%E5%8F%AF%E9%80%89%E5%AD%97%E6%AE%B5)

- [frontmatter 示例](#frontmatter-%E7%A4%BA%E4%BE%8B)

- [SKILL.md 正文内容组织](#skillmd-%E6%AD%A3%E6%96%87%E5%86%85%E5%AE%B9%E7%BB%84%E7%BB%87)

- [工作流程和反馈循环的设计](#%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B%E5%92%8C%E5%8F%8D%E9%A6%88%E5%BE%AA%E7%8E%AF%E7%9A%84%E8%AE%BE%E8%AE%A1)

- [编写清晰的操作指令](#%E7%BC%96%E5%86%99%E6%B8%85%E6%99%B0%E7%9A%84%E6%93%8D%E4%BD%9C%E6%8C%87%E4%BB%A4)

- [提供有效的示例](#%E6%8F%90%E4%BE%9B%E6%9C%89%E6%95%88%E7%9A%84%E7%A4%BA%E4%BE%8B)

- [内容指南](#%E5%86%85%E5%AE%B9%E6%8C%87%E5%8D%97)

- [模板模式的应用](#%E6%A8%A1%E6%9D%BF%E6%A8%A1%E5%BC%8F%E7%9A%84%E5%BA%94%E7%94%A8)

- [评估驱动的开发方法](#%E8%AF%84%E4%BC%B0%E9%A9%B1%E5%8A%A8%E7%9A%84%E5%BC%80%E5%8F%91%E6%96%B9%E6%B3%95)

- [与 Claude 迭代开发 Skills](#%E4%B8%8E-claude-%E8%BF%AD%E4%BB%A3%E5%BC%80%E5%8F%91-skills)

- [观察 Claude 如何导航 Skills](#%E8%A7%82%E5%AF%9F-claude-%E5%A6%82%E4%BD%95%E5%AF%BC%E8%88%AA-skills)

- [脚本文件的组织和引用](#%E8%84%9A%E6%9C%AC%E6%96%87%E4%BB%B6%E7%9A%84%E7%BB%84%E7%BB%87%E5%92%8C%E5%BC%95%E7%94%A8)

- [解决问题而不是推卸责任](#%E8%A7%A3%E5%86%B3%E9%97%AE%E9%A2%98%E8%80%8C%E4%B8%8D%E6%98%AF%E6%8E%A8%E5%8D%B8%E8%B4%A3%E4%BB%BB)

- [创建可验证的中间输出](#%E5%88%9B%E5%BB%BA%E5%8F%AF%E9%AA%8C%E8%AF%81%E7%9A%84%E4%B8%AD%E9%97%B4%E8%BE%93%E5%87%BA)

- [视觉分析的应用](#%E8%A7%86%E8%A7%89%E5%88%86%E6%9E%90%E7%9A%84%E5%BA%94%E7%94%A8)

- [包依赖管理](#%E5%8C%85%E4%BE%9D%E8%B5%96%E7%AE%A1%E7%90%86)

- [MCP 工具引用](#mcp-%E5%B7%A5%E5%85%B7%E5%BC%95%E7%94%A8)

- [参考文档的组织和引用](#%E5%8F%82%E8%80%83%E6%96%87%E6%A1%A3%E7%9A%84%E7%BB%84%E7%BB%87%E5%92%8C%E5%BC%95%E7%94%A8)

- [渐进式披露原则的应用](#%E6%B8%90%E8%BF%9B%E5%BC%8F%E6%8A%AB%E9%9C%B2%E5%8E%9F%E5%88%99%E7%9A%84%E5%BA%94%E7%94%A8)

  - [Level 1: 元数据层（始终加载）](#level-1-%E5%85%83%E6%95%B0%E6%8D%AE%E5%B1%82%E5%A7%8B%E7%BB%88%E5%8A%A0%E8%BD%BD)

  - [Level 2: 指令层（触发时加载）](#level-2-%E6%8C%87%E4%BB%A4%E5%B1%82%E8%A7%A6%E5%8F%91%E6%97%B6%E5%8A%A0%E8%BD%BD)

  - [Level 3: 资源层（按需加载）](#level-3-%E8%B5%84%E6%BA%90%E5%B1%82%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD)

- [Skills 的架构原理](#skills-%E7%9A%84%E6%9E%B6%E6%9E%84%E5%8E%9F%E7%90%86)

- [Skills 在不同平台的可用性](#skills-%E5%9C%A8%E4%B8%8D%E5%90%8C%E5%B9%B3%E5%8F%B0%E7%9A%84%E5%8F%AF%E7%94%A8%E6%80%A7)

  - [Claude API](#claude-api)

  - [Claude.ai](#claudeai)

  - [Claude Code](#claude-code)

  - [Claude Agent SDK](#claude-agent-sdk)

- [⚠️ 重要限制： Skills 不跨平台同步](#%EF%B8%8F-%E9%87%8D%E8%A6%81%E9%99%90%E5%88%B6-skills-%E4%B8%8D%E8%B7%A8%E5%B9%B3%E5%8F%B0%E5%90%8C%E6%AD%A5)

- [可用的预构建 Agent Skills](#%E5%8F%AF%E7%94%A8%E7%9A%84%E9%A2%84%E6%9E%84%E5%BB%BA-agent-skills)

- [领域知识的捕获](#%E9%A2%86%E5%9F%9F%E7%9F%A5%E8%AF%86%E7%9A%84%E6%8D%95%E8%8E%B7)

- [编写可组合的 Skills](#%E7%BC%96%E5%86%99%E5%8F%AF%E7%BB%84%E5%90%88%E7%9A%84-skills)

- [测试和验证 Skill](#%E6%B5%8B%E8%AF%95%E5%92%8C%E9%AA%8C%E8%AF%81-skill)

- [Skill 的版本管理和维护](#skill-%E7%9A%84%E7%89%88%E6%9C%AC%E7%AE%A1%E7%90%86%E5%92%8C%E7%BB%B4%E6%8A%A4)

- [🔒 安全性重要提示](#-%E5%AE%89%E5%85%A8%E6%80%A7%E9%87%8D%E8%A6%81%E6%8F%90%E7%A4%BA)

- [性能优化建议](#%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96%E5%BB%BA%E8%AE%AE)

- [文档风格和语言](#%E6%96%87%E6%A1%A3%E9%A3%8E%E6%A0%BC%E5%92%8C%E8%AF%AD%E8%A8%80)

- [常见错误和陷阱](#%E5%B8%B8%E8%A7%81%E9%94%99%E8%AF%AF%E5%92%8C%E9%99%B7%E9%98%B1)

- [高级技巧](#%E9%AB%98%E7%BA%A7%E6%8A%80%E5%B7%A7)

- [与 MCP 的集成](#%E4%B8%8E-mcp-%E7%9A%84%E9%9B%86%E6%88%90)

- [实际应用场景示例](#%E5%AE%9E%E9%99%85%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF%E7%A4%BA%E4%BE%8B)

- [持续改进的方法](#%E6%8C%81%E7%BB%AD%E6%94%B9%E8%BF%9B%E7%9A%84%E6%96%B9%E6%B3%95)

- [总结检查清单](#%E6%80%BB%E7%BB%93%E6%A3%80%E6%9F%A5%E6%B8%85%E5%8D%95)

  - [核心质量检查](#%E6%A0%B8%E5%BF%83%E8%B4%A8%E9%87%8F%E6%A3%80%E6%9F%A5)

  - [代码和脚本检查](#%E4%BB%A3%E7%A0%81%E5%92%8C%E8%84%9A%E6%9C%AC%E6%A3%80%E6%9F%A5)

  - [测试检查](#%E6%B5%8B%E8%AF%95%E6%A3%80%E6%9F%A5)

  - [技术要求检查](#%E6%8A%80%E6%9C%AF%E8%A6%81%E6%B1%82%E6%A3%80%E6%9F%A5)

- [企业级 Skills 治理与部署](#%E4%BC%81%E4%B8%9A%E7%BA%A7-skills-%E6%B2%BB%E7%90%86%E4%B8%8E%E9%83%A8%E7%BD%B2)

  - [安全审查与风险评估](#%E5%AE%89%E5%85%A8%E5%AE%A1%E6%9F%A5%E4%B8%8E%E9%A3%8E%E9%99%A9%E8%AF%84%E4%BC%B0)

  - [Skills 部署前评估](#skills-%E9%83%A8%E7%BD%B2%E5%89%8D%E8%AF%84%E4%BC%B0)

## 核心概念

- Agent Skills 是基于文件系统的可重用资源，为 AI Agent 提供领域专业知识、工作流程和最佳实践

- 每个 Skill 是一个独立的目录，包含一个必需的 [SKILL.md](http://SKILL.md) 文件以及可选的脚本、资源和参考文档

- Skills 通过渐进式加载机制工作：元数据始终加载，完整内容按需加载，资源文件动态引用

- Skills 的设计目标是将通用 Agent 转变为特定领域的专家，类似于为新员工准备入职指南

- Skills 在 Claude 的虚拟机环境中运行，Agent 拥有文件系统访问权限，可以通过 bash 命令读取文件和执行脚本

## 核心设计原则

- 上下文窗口是公共资源，Skill 需要与系统提示词、对话历史、其他 Skills 元数据和用户请求共享上下文空间

- 简洁至关重要：虽然只有元数据在启动时预加载，但 [SKILL.md](http://SKILL.md) 一旦加载就会与其他内容竞争上下文空间

- 默认假设 Claude 已经非常聪明，只添加 Claude 不具备的上下文信息

- 对每条信息提出质疑：Claude 真的需要这个解释吗？我能假设 Claude 已经知道这个吗？这段文字值得消耗这些 token 吗？

- 避免过度解释：不要解释 Claude 已知的概念（如什么是 PDF、库如何工作等），直接提供具体指令

- 根据任务的脆弱性和可变性设置适当的自由度：高自由度用于多种方法都有效的场景，低自由度用于脆弱且容易出错的操作

- 使用类比理解自由度：窄桥（两侧是悬崖）需要精确指令和护栏（低自由度），开阔场地（无危险）可以给出大方向让 Claude 自主选择路径（高自由度）

- 针对计划使用的所有模型进行测试：Haiku 可能需要更多指导，Opus 可能不需要过度解释，Sonnet 需要平衡的清晰度和效率

## Skills 与其他工具的关系

### Skills vs Prompts

- **Prompts**: 会话级别的一次性指令，需要在每次对话中重复提供

- **Skills**: 可重用的模块化能力，按需自动加载，无需重复说明

- **使用场景**：如果某个指导需要在多次对话中使用，应该创建 Skill 而不是依赖 Prompt

### Skills vs MCP (Model Context Protocol)

- **MCP**: 提供对外部系统的标准化数据访问能力（如 GitHub API、数据库连接）

- **Skills**: 提供使用这些系统的工作流程、业务逻辑和领域知识

- **协同工作**： MCP 负责“能访问什么”, Skills 负责“如何使用”

- **示例**： MCP 提供 GitHub API 访问，Skill 定义代码审查的完整流程

## 为什么使用 Skills

**核心优势**：

- **专业化 Claude**: 为特定领域任务定制能力

- **减少重复**：创建一次，自动使用

- **组合能力**：组合多个 Skills 构建复杂工作流

- **零上下文惩罚**：可以安装大量 Skills，只在需要时才加载内容

## Skill 的文件结构规范

- 每个 Skill 必须是一个独立的目录，目录名使用小写字母、数字和连字符，例如 pdf-processing 或 code-review-workflow

- 目录内必须包含一个名为 [SKILL.md](http://SKILL.md) 的文件，这是 Skill 的核心定义文件

- 可选创建 scripts/ 子目录，存放可执行的 Python、Shell 或其他脚本文件

- 可选创建 references/ 子目录，存放 API 文档、数据库 schema、技术规范等参考资料

- 可选创建 assets/ 子目录，存放模板文件、配置文件、示例数据等静态资源

- 可选创建其他 Markdown 文件（如 [forms.md、](http://forms.md)[api-reference.md](http://api-reference.md))，用于存放详细的补充说明

- 避免创建过深的目录层级，保持结构扁平化以便 Agent 快速定位文件

- 所有文件使用 UTF-8 编码，Markdown 文件遵循标准 Markdown 语法

- 始终使用 Unix 风格的正斜杠路径（scripts/helper.py），即使在 Windows 上也不要使用反斜杠，因为 Unix 风格路径跨平台兼容

### 完整目录结构示例

```plaintext
my-code-review-skill/
├── SKILL.md                 # 必需: 核心定义文件
├── forms.md                 # 可选: 详细的表单处理说明
├── api-reference.md         # 可选: API 文档
├── scripts/                 # 可选: 可执行脚本目录
│   ├── check_style.py      # Python 脚本
│   ├── run_tests.sh        # Shell 脚本
│   └── validate.py         # 验证脚本
├── references/              # 可选: 参考资料目录
│   ├── coding-standards.md # 编码标准
│   └── security-rules.md   # 安全规则
└── assets/                  # 可选: 静态资源目录
    ├── template.md         # 模板文件
    ├── config.json         # 配置文件
    └── examples/           # 示例数据
        └── sample-pr.json
```

## [SKILL.md](http://SKILL.md) 文件的结构要求

- [SKILL.md](http://SKILL.md) 文件必须以 YAML frontmatter 开头，使用三个连字符 `---` 包裹

- frontmatter 之后是 Markdown 格式的正文内容，包含 Skill 的核心指令和使用说明

- frontmatter 和正文之间必须有空行分隔

- 正文应使用清晰的标题层级（`##`、`###`）组织内容，便于 Agent 快速扫描和理解

- 正文长度应控制在合理范围内（建议 500-2000 字），过长的内容应拆分到单独的引用文件中

- 如果引用其他文件，使用标准 Markdown 链接语法，例如 `【详细说明】(forms.md)` 或 `[API 文档】(api-reference.md)`

- 避免在 [SKILL.md](http://SKILL.md) 中直接嵌入大量代码，应将代码放在 `scripts/` 目录中并通过文件路径引用

## frontmatter 必需字段

- name 字段是必需的，用于唯一标识这个 Skill，最多 64 个字符

- name 只能包含小写字母（a-z）、数字（0-9）和连字符（-），不能包含空格或特殊字符

- name 不能包含 XML 标签，不能包含保留词：“anthropic”、“claude”

- name 应简洁且具有描述性，例如 pdf-processing、code-review、api-testing

- 推荐使用动名词形式命名（动词 + ing），清晰描述 Skill 提供的活动或能力，如 processing-pdfs、analyzing-spreadsheets、managing-databases、testing-code、writing-documentation

- 可接受的替代命名方式包括名词短语（pdf-processing、spreadsheet-analysis）或动作导向（process-pdfs、analyze-spreadsheets）

- 避免使用模糊名称（helper、utils、tools）、过于通用的名称（documents、data、files）或不一致的命名模式

- 一致的命名使得 Skills 更易于引用、理解、组织和维护

- description 字段是必需的，用于描述 Skill 的功能和使用时机，最多 1024 个字符

- description 必须非空，不能包含 XML 标签

- description 必须使用第三人称编写，因为它会被注入到系统提示词中，不一致的视角会导致发现问题

- 正确示例：Processes Excel files and generates reports（第三人称）

- 错误示例：I can help you process Excel files 或 You can use this to process Excel files（第一或第二人称）

- description 应包含两部分信息：这个 Skill 做什么，以及何时应该使用它（具体的触发场景和上下文）

- description 应包含具体的关键术语和触发词，帮助 Claude 从可能的 100+ 个 Skills 中选择正确的 Skill

- description 是 Skill 发现的关键：Claude 使用它来决定何时选择该 Skill，而 [SKILL.md](http://SKILL.md) 的其余部分提供实现细节

- 有效的 description 示例：Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction

- 避免模糊的 description，如 Helps with documents 或 Processes data 或 Does stuff with files

## frontmatter 可选字段

- **allowed-tools** 字段用于限制该 Skill 可以使用的工具，格式为逗号分隔的工具列表

- allowed-tools 示例：`"Read, Write, Bash(git:)"` 表示只允许使用 Read、Write 工具和 git 相关的 Bash 命令

- 如果不指定 allowed-tools，则 Skill 可以使用所有可用工具

- **model** 字段用于指定执行该 Skill 时使用的特定模型，例如 `claude-3-5-sonnet-20241022`

- 如果不指定 model，则继承当前会话使用的默认模型

- **license** 字段用于声明 Skill 的许可证信息，例如 MIT、Apache-2.0 等

- 可以添加自定义字段用于文档目的，但 Agent 不会处理未定义的字段

## frontmatter 示例

**最简示例**：

```yaml
---
name: pdf-processing
description: Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction.
---
```

**完整示例**：

```yaml
---
name: code-review-workflow
description: Execute standard code review process including style checks, security analysis, and test coverage verification. Use when the user asks to review code, check pull requests, or perform code quality analysis.
allowed-tools: Read,Write,Bash(git:,grep:*)
model: claude-3-5-sonnet-20241022
license: MIT
---
```

## [SKILL.md](http://SKILL.md) 正文内容组织

- 正文第一个标题（`#` 级别）应该是 Skill 的完整名称，与 frontmatter 中的 name 对应但可以使用空格和大写

- 在标题之后，应该有一段简短的概述（1-2 句话），说明这个 Skill 的核心价值

- 使用 `## Quick Start` 或 `## 快速开始` 章节提供最常用的使用方法，让 Agent 能快速上手

- 使用 `## Instructions` 或 `## 操作指南` 章节提供详细的分步指令，告诉 Agent 应该按什么顺序执行什么操作

- 使用 `## Examples` 或 `## 示例` 章节提供具体的使用场景和预期输出，帮助 Agent 理解实际应用

- 使用 `## Best Practices` 或 `## 最佳实践` 章节说明注意事项、常见陷阱和推荐做法

- 使用 `## Troubleshooting` 或 `## 故障排查` 章节说明常见错误及其解决方法

- 如果有复杂的参考信息，使用 `## References` 章节并链接到单独的文件，例如 `【详见 API 文档】(api-reference.md)`

## 工作流程和反馈循环的设计

- 对于复杂任务，将操作分解为清晰的顺序步骤

- 对于特别复杂的工作流程，提供一个检查清单，让 Claude 可以复制到响应中并在进行时勾选

- 工作流程模式适用于分析任务（无代码）和代码任务：都应该有明确的步骤和进度跟踪

- 清晰的步骤可以防止 Claude 跳过关键验证，检查清单帮助 Claude 和用户跟踪多步骤工作流程的进度

- 实施反馈循环：运行验证器、修复错误、重复的模式可以大大提高输出质量

- 对于无代码 Skills，验证器可以是参考文档（如 STYLE_GUIDE.md），Claude 通过阅读和比较来执行检查

- 对于有代码 Skills，使用脚本作为验证器，在每次编辑后立即验证，只有在验证通过时才继续

- 验证循环可以及早发现错误，避免在错误的基础上继续工作

## 编写清晰的操作指令

- 指令应该是明确的、可执行的步骤，使用祈使句，例如 “首先读取文件内容” 而不是 “你可以读取文件”

- 每个步骤应该只包含一个明确的操作，避免在一个步骤中混合多个动作

- 使用编号列表（1. 2. 3.）表示必须按顺序执行的步骤

- 使用无序列表（-）表示可以灵活选择或并行执行的操作

- 对于条件分支，使用清晰的 if-then 结构，例如 “如果文件是 PDF 格式，则使用 pdfplumber；如果是 Word 文档，则使用 python-docx”

- 对于循环操作，明确说明迭代的对象和终止条件，例如 “对于每个变更的文件，执行以下检查……”

- 在关键步骤后说明预期结果，帮助 Agent 验证操作是否成功，例如 “执行后应该看到包含 3 列的表格数据”

- 避免使用模糊的词语如 “可能”、“大概”、“通常”，应该给出确定性的指导

- 对于条件工作流程，引导 Claude 通过决策点：确定任务类型，然后根据类型遵循相应的工作流程

- 如果工作流程变得庞大或复杂，考虑将它们推送到单独的文件中，并告诉 Claude 根据手头任务读取适当的文件

## 提供有效的示例

- 每个示例应该包含三个部分：场景描述、输入数据、预期输出

- 场景描述应该说明在什么情况下使用这个示例，例如 “当用户上传了一个包含表单字段的 PDF 文件时”

- 输入数据应该具体且真实，避免使用占位符如 “xxx” 或 “your_file_here”

- 预期输出应该展示完整的结果格式，包括数据结构、格式化方式等

- 对于输出质量依赖于看到示例的 Skills，提供输入输出对，就像在常规提示中一样

- 示例帮助 Claude 理解期望的风格和详细程度，比单独的描述更清晰

- 提供多个示例覆盖不同的使用场景，例如简单场景、复杂场景、边界情况

- 对于每个示例，说明为什么这样做，帮助 Agent 理解背后的逻辑而不是死记硬背

## 内容指南

- 避免时间敏感信息：不要包含会过时的信息（如 “如果在 2025 年 8 月之前，使用旧 API”）

- 使用“旧模式”部分保存历史上下文：将已弃用的方法放在可折叠的详细信息部分，提供历史背景而不会使主要内容混乱

- 使用一致的术语：在整个 Skill 中选择一个术语并坚持使用（如始终使用 “API endpoint” 而不是混用 “URL”、“API route”、“path”）

- 术语一致性帮助 Claude 理解和遵循指令

- 避免提供太多选项：除非必要，不要呈现多种方法（如 “你可以使用 pypdf、pdfplumber、PyMuPDF、pdf2image……”）

- 提供默认方法和逃生舱口：给出推荐的默认方法，只在特殊情况下提及替代方案（如 “使用 pdfplumber 提取文本。对于需要 OCR 的扫描 PDF，改用 pdf2image 和 pytesseract”）

## 模板模式的应用

- 为输出格式提供模板，根据需求匹配严格程度

- 对于严格要求（如 API 响应或数据格式），明确说明 “始终使用这个确切的模板结构”

- 对于灵活指导（当适应有用时），说明 “这是一个合理的默认格式，但根据分析使用你的最佳判断” 并允许根据特定上下文调整部分

## 评估驱动的开发方法

- 在编写大量文档之前先构建评估，确保 Skill 解决真实问题而不是记录想象的问题

- 评估驱动开发流程：识别差距（在没有 Skill 的情况下运行 Claude 执行代表性任务，记录具体失败或缺失上下文）

- 创建评估：构建三个测试这些差距的场景

- 建立基线：在没有 Skill 的情况下测量 Claude 的性能

- 编写最小指令：创建足够的内容来解决差距并通过评估

- 迭代：执行评估，与基线比较，并改进

- 这种方法确保你解决实际问题，而不是预测可能永远不会实现的需求

- 评估是衡量 Skill 有效性的真实来源

## 与 Claude 迭代开发 Skills

- 最有效的 Skill 开发过程涉及 Claude 本身：使用一个 Claude 实例（Claude A）创建将被其他实例（Claude B）使用的 Skill

- Claude A 帮助你设计和完善指令，Claude B 在真实任务中测试它们

- 这种方法有效是因为 Claude 模型既理解如何编写有效的 agent 指令，也理解 agent 需要什么信息

- 创建新 Skill 的流程：在没有 Skill 的情况下完成任务（与 Claude A 一起使用正常提示完成问题，注意你反复提供的信息）

- 识别可重用模式：完成任务后，识别你提供的哪些上下文对类似的未来任务有用

- 要求 Claude A 创建 Skill：Claude 模型原生理解 Skill 格式和结构，不需要特殊的系统提示

- 审查简洁性：检查 Claude A 是否添加了不必要的解释，要求删除 Claude 已知的内容

- 改进信息架构：要求 Claude A 更有效地组织内容（如将表 schema 放在单独的引用文件中）

- 在类似任务上测试：使用加载了 Skill 的 Claude B（新实例）处理相关用例，观察 Claude B 是否找到正确信息、正确应用规则并成功处理任务

- 基于观察迭代：如果 Claude B 遇到困难或遗漏某些内容，返回 Claude A 并提供具体信息

- 迭代现有 Skills：在实际工作流程中使用 Skill（给 Claude B 实际任务而不是测试场景）

- 观察 Claude B 的行为：注意它在哪里遇到困难、成功或做出意外选择

- 返回 Claude A 进行改进：分享当前的 [SKILL.md](http://SKILL.md) 并描述你观察到的内容

- 审查 Claude A 的建议：Claude A 可能建议重组以使规则更突出、使用更强的语言或重组工作流程部分

- 应用和测试更改：使用 Claude A 的改进更新 Skill，然后在类似请求上再次使用 Claude B 测试

- 基于使用重复：在遇到新场景时继续这个观察-改进-测试循环

- 收集团队反馈：与队友分享 Skills 并观察他们的使用，询问 Skill 是否按预期激活、指令是否清晰、缺少什么

- 这种方法有效的原因：Claude A 理解 agent 需求，你提供领域专业知识，Claude B 通过真实使用揭示差距，迭代改进基于观察到的行为而不是假设

## 观察 Claude 如何导航 Skills

- 在迭代 Skills 时，注意 Claude 在实践中实际如何使用它们

- 观察意外的探索路径：Claude 是否以你没有预料到的顺序读取文件？这可能表明你的结构不如你想象的直观

- 观察错过的连接：Claude 是否未能跟随对重要文件的引用？你的链接可能需要更明确或更突出

- 观察对某些部分的过度依赖：如果 Claude 反复读取同一个文件，考虑该内容是否应该在主 [SKILL.md](http://SKILL.md) 中

- 观察被忽略的内容：如果 Claude 从不访问捆绑的文件，它可能是不必要的或在主指令中信号不足

- 基于这些观察而不是假设进行迭代

- name 和 description 在 Skill 元数据中特别关键：Claude 在决定是否触发 Skill 以响应当前任务时使用这些

- 确保它们清楚地描述 Skill 的功能和应该何时使用

## 脚本文件的组织和引用

- 脚本文件应该放在 scripts/ 子目录中，使用描述性的文件名，例如 extract_pdf_tables.py 而不是 [script1.py](http://script1.py)

- 每个脚本文件应该有清晰的用途，一个脚本只做一件事，遵循单一职责原则

- 脚本文件开头应该包含文档字符串（docstring），说明脚本的功能、参数和返回值

- 脚本应该接受命令行参数而不是硬编码路径，例如使用 argparse 或 sys.argv

- 脚本应该有适当的错误处理，在出错时返回有意义的错误信息和非零退出码

- 在 [SKILL.md](http://SKILL.md) 中引用脚本时，应该说明如何调用，例如 “运行 python scripts/extract_fields.py 来提取表单字段”

- 说明脚本的依赖项，例如 “此脚本需要安装 pdfplumber 库：pip install pdfplumber”

- 重要提示：脚本代码本身不会被加载到 Agent 的上下文窗口中，Agent 通过 Bash 工具执行脚本并获取输出结果

- 因此脚本可以包含大量代码而不会消耗 token，应该充分利用这一特性将复杂逻辑封装在脚本中

- 即使 Claude 可以编写脚本，预制脚本也提供优势：比生成的代码更可靠、节省 token（无需在上下文中包含代码）、节省时间（无需代码生成）、确保跨用途的一致性

- 在指令中明确说明 Claude 应该执行脚本（最常见：“运行 analyze_form.py 提取字段”）还是将其作为参考阅读（用于复杂逻辑：“参见 analyze_form.py 了解字段提取算法”）

- 对于大多数实用脚本，执行是首选，因为它更可靠和高效

## 解决问题而不是推卸责任

- 编写 Skills 脚本时，处理错误条件而不是推卸给 Claude

- 脚本应该明确处理错误：如果文件不存在，创建默认文件而不是失败；如果权限错误，提供替代方案而不是失败

- 配置参数也应该有理由并记录，避免“巫术常量”（Ousterhout 定律）：如果你不知道正确的值，Claude 如何确定它？

- 使用自文档化的配置：为常量提供注释解释为什么选择这个值（如 “HTTP 请求通常在 30 秒内完成，更长的超时考虑了慢速连接”）

- 避免魔法数字：不要使用没有解释的任意值（如 TIMEOUT = 47，为什么是 47？）

## 创建可验证的中间输出

- 当 Claude 执行复杂、开放式的任务时，它可能会犯错误

- “计划-验证-执行”模式通过让 Claude 首先以结构化格式创建计划，然后在执行前用脚本验证该计划，可以及早发现错误

- 示例场景：要求 Claude 根据电子表格更新 PDF 中的 50 个表单字段，没有验证可能会引用不存在的字段、创建冲突的值、遗漏必需字段或错误应用更新

- 解决方案：添加一个中间的 changes.json 文件，在应用更改之前进行验证，工作流程变为：分析 → 创建计划文件 → 验证计划 → 执行 → 验证

- 这种模式有效的原因：及早发现错误（验证在应用更改之前发现问题）、机器可验证（脚本提供客观验证）、可逆计划（Claude 可以在不触及原始文件的情况下迭代计划）、清晰调试（错误消息指向特定问题）

- 何时使用：批量操作、破坏性更改、复杂验证规则、高风险操作

- 实施技巧：使验证脚本详细，提供具体的错误消息，如 “未找到字段 ‘signature_date’。可用字段：customer_name、order_total、signature_date_signed”，以帮助 Claude 修复问题

## 视觉分析的应用

- 当输入可以呈现为图像时，让 Claude 分析它们

- 示例：将 PDF 转换为图像，Claude 可以视觉识别表单字段位置和类型

- Claude 的视觉能力有助于理解布局和结构

## 包依赖管理

- Skills 在代码执行环境中运行，具有平台特定的限制

- [claude.ai](http://claude.ai)：可以从 npm 和 PyPI 安装包，并从 GitHub 仓库拉取

- Anthropic API：没有网络访问，没有运行时包安装

- 在 [SKILL.md](http://SKILL.md) 中列出所需的包，并验证它们在代码执行工具文档中可用

- 不要假设包已安装：明确说明依赖项和如何安装它们

- 错误示例：假设安装（“使用 pdf 库处理文件”）

- 正确示例：明确依赖项（“安装所需包：pip install pypdf，然后使用它：from pypdf import PdfReader”）

## MCP 工具引用

- 如果 Skill 使用 MCP（模型上下文协议）工具，始终使用完全限定的工具名称以避免“找不到工具”错误

- 格式：ServerName: tool_name

- 示例：使用 BigQuery: bigquery_schema 工具检索表 schema，使用 GitHub: create_issue 工具创建问题

- 其中 BigQuery 和 GitHub 是 MCP 服务器名称，bigquery_schema 和 create_issue 是这些服务器内的工具名称

- 没有服务器前缀，Claude 可能无法找到工具，特别是当有多个 MCP 服务器可用时

## 参考文档的组织和引用

- 参考文档应该放在单独的 Markdown 文件中，例如 `api-reference.md`、`database-schema.md`

- 参考文档可以包含大量详细信息，因为它们只在 Agent 需要时才会被读取

- 在 [SKILL.md](http://SKILL.md) 中引用参考文档时，使用描述性的链接文本，例如 “[详细的 API 端点说明见 API 参考](api-reference.md)"

- 参考文档应该有良好的结构，使用标题、表格、代码块等元素组织信息

- 对于 API 文档，应该包含：端点 URL、HTTP 方法、请求参数、响应格式、错误码说明

- 对于数据库 schema，应该包含：表名、字段名、数据类型、约束条件、关系说明

- 对于配置说明，应该包含：配置项名称、数据类型、默认值、可选值、使用场景

- 避免在参考文档中包含操作指令，操作指令应该在 [SKILL.md](http://SKILL.md) 中，参考文档只提供事实性信息

## 渐进式披露原则的应用

渐进式披露是 Skills 架构的核心设计原则：在每个阶段只提供恰好足够的信息。Skills 包含三种内容类型，在不同时机加载。

- [SKILL.md](http://SKILL.md) 应作为概览，指向详细材料，就像入职指南的目录一样

- 为获得最佳性能，[SKILL.md](http://SKILL.md) 正文应保持在 500 行以内

- 当内容接近此限制时，将内容拆分到单独的文件中

- 避免深度嵌套的引用：所有引用文件应直接从 [SKILL.md](http://SKILL.md) 链接（保持一层深度），避免引用文件再引用其他文件

- 深度嵌套会导致 Claude 使用 head -100 等命令部分读取文件，而不是读取完整文件，导致信息不完整

- 对于超过 100 行的引用文件，在顶部包含目录，确保 Claude 即使在预览时也能看到可用信息的完整范围

- 使用领域特定组织：对于具有多个领域的 Skills，按领域组织内容以避免加载无关上下文

- 示例：当用户询问销售指标时，Claude 只需读取销售相关的 schema，而不需要财务或营销数据

- 使用条件详细信息模式：显示基本内容，链接到高级内容，让 Claude 仅在需要时读取高级功能文档

### Level 1: 元数据层（始终加载）

- **内容类型**：指令（Instructions）

- **加载时机**：启动时始终加载

- **Token 成本**： ~100 tokens/Skill

- **包含内容**： frontmatter 中的 `name` 和 `description`

- **关键作用**： Claude 在启动时加载所有 Skills 的元数据到系统提示词中，用于判断何时触发该 Skill

- **设计要点**：必须精心设计，包含清晰的触发关键词和使用场景

### Level 2: 指令层（触发时加载）

- **内容类型**：指令（Instructions）

- **加载时机**：当 Agent 判断该 Skill 相关时

- **Token 成本**：通常 < 5k tokens

- **包含内容**： [SKILL.md](http://SKILL.md) 正文，包含工作流程、最佳实践、操作指南

- **访问方式**： Claude 通过 bash 命令读取 [SKILL.md](http://SKILL.md) 文件

- **设计要点**：应包含核心的、最常用的信息，过长内容拆分到引用文件

### Level 3: 资源层（按需加载）

- **内容类型**：指令（Instructions）、代码（Code）、资源（Resources）

- **加载时机**：当 Agent 需要详细信息时

- **Token 成本**：实际上无限制

- **包含内容**：

  - **指令**：额外的 Markdown 文件（[FORMS.md](http://FORMS.md), [REFERENCE.md](http://REFERENCE.md)）包含专门指导

  - **代码**：可执行脚本（fill_form.py, [validate.py](http://validate.py)）通过 bash 运行

  - **资源**：参考资料如数据库 schema、API 文档、模板、示例

- **访问方式**： Claude 按需读取引用的文件或执行脚本

- **关键优势**：

  - 脚本代码永远不会进入上下文窗口，只有输出结果会被处理

  - 可以包含大量参考文档，只在需要时读取特定部分

  - 没有实际的内容大小限制

### 渐进式加载的性能优势

| 加载级别 | 加载时机 | Token 成本 | 内容类型 |
| --- | --- | --- | --- |
| **Level 1: 元数据** | 启动时始终加载 | ~100 tokens/Skill | frontmatter 的 name 和 description |
| **Level 2: 指令** | Skill 被触发时 | 通常 < 5k tokens | [SKILL.md](http://SKILL.md) 正文内容 |
| **Level 3: 资源** | 按需访问 | 实际上无限制 | 通过 bash 执行的文件，不占用上下文 |

### 实际应用示例

假设有一个 PDF 处理 Skill:

1. **启动阶段**：系统提示词包含 `PDF Processing - Extract text and tables from PDF files, fill forms, merge documents`

2. **用户请求**： “提取这个 PDF 的文本并总结”

3. **Claude 触发**：执行 `bash: read pdf-skill/SKILL.md` → 指令加载到上下文

4. **Claude 判断**：表单填写不需要，所以 [FORMS.md](http://FORMS.md) 不会被读取

5. **Claude 执行**：使用 [SKILL.md](http://SKILL.md) 中的指令完成任务

### 设计建议

- [SKILL.md](http://SKILL.md) 应该包含核心的、最常用的信息，将详细的、特定场景的信息放在单独文件中

- 例如，在 [SKILL.md](http://SKILL.md) 中写 “对于复杂的表单填写场景，参见 [表单指南](FORMS.md)“，而不是在 [SKILL.md](http://SKILL.md) 中直接写 10 页的表单说明

- 这样做的好处是：减少不必要的 token 消耗，加快 Agent 的响应速度，同时保持信息的完整性

- 在设计 Skill 时，应该问自己：Agent 在 80% 的情况下需要哪些信息？这些信息放在 [SKILL.md](http://SKILL.md) 中，其余 20% 放在引用文件中

- 充分利用脚本的优势：复杂逻辑封装在脚本中，脚本可以包含大量代码而不消耗 token

## Skills 的架构原理

Skills 运行在代码执行环境中，Claude 拥有文件系统访问权限、bash 命令和代码执行能力。可以这样理解：Skills 作为目录存在于虚拟机上，Claude 使用与你在计算机上导航文件相同的 bash 命令与它们交互。

### Claude 如何访问 Skill 内容

当 Skill 被触发时，Claude 使用 bash 从文件系统读取 [SKILL.md](http://SKILL.md)，将其指令加载到上下文窗口。如果这些指令引用其他文件（如 [FORMS.md](http://FORMS.md) 或数据库 schema), Claude 也会使用额外的 bash 命令读取这些文件。当指令提到可执行脚本时，Claude 通过 bash 运行它们并只接收输出（脚本代码本身永远不会进入上下文）。

### 这种架构的优势

- **按需文件访问**： Claude 只读取每个特定任务所需的文件。一个 Skill 可以包含数十个参考文件，但如果你的任务只需要销售 schema, Claude 只加载那一个文件。其余文件保留在文件系统上，消耗零 token

- **高效的脚本执行**：当 Claude 运行 `validate_form.py` 时，脚本代码永远不会加载到上下文窗口。只有脚本的输出（如 “验证通过” 或特定错误消息）消耗 token。这使得脚本比让 Claude 即时生成等效代码要高效得多

- **捆绑内容没有实际限制**：因为文件在被访问之前不消耗上下文，Skills 可以包含全面的 API 文档、大型数据集、大量示例或任何你需要的参考资料。未使用的捆绑内容没有上下文惩罚

这种基于文件系统的模型使渐进式披露成为可能。Claude 像你引用入职指南的特定章节一样导航你的 Skill，访问每个任务所需的确切内容。

## Skills 在不同平台的可用性

Skills 可在 Claude 的多个产品中使用，但每个平台有不同的特性和限制。

### Claude API

Claude API 支持预构建 Agent Skills 和自定义 Skills。两者工作方式相同：在 `container` 参数中指定相关的 `skill_id`，并配合代码执行工具使用。

**前置要求**：通过 API 使用 Skills 需要三个 beta headers:

- `code-execution-2025-08-25` - Skills 在代码执行容器中运行

- `skills-2025-10-02` - 启用 Skills 功能

- `files-api-2025-04-14` - 文件上传/下载到容器所需

**使用方式**：

- **预构建 Skills**: 通过引用 `skill_id`（如 `pptx`、`xlsx`）使用

- **自定义 Skills**: 通过 Skills API(`/v1/skills` 端点）创建和上传，组织范围内共享

**运行时限制**：

- **无网络访问**： Skills 无法进行外部 API 调用或访问互联网

- **无运行时包安装**：只能使用预装包，无法在执行期间安装新包

- **仅预配置依赖**：查看代码执行工具文档了解可用包列表

### [Claude.ai](http://Claude.ai)

[Claude.ai](https://claude.ai) 支持预构建 Agent Skills 和自定义 Skills。

**预构建 Agent Skills**: 这些 Skills 在你创建文档时已经在后台工作。Claude 会自动使用它们，无需任何设置。

**自定义 Skills**:

- 通过 Settings > Features 上传 zip 文件

- 可用于 Pro、Max、Team 和 Enterprise 计划（需启用代码执行）

- **重要**：每个用户独立，不在组织范围内共享，管理员无法集中管理

**运行时限制**：

- **网络访问变化**：根据用户/管理员设置，Skills 可能有完整、部分或无网络访问

### Claude Code

[Claude Code](https://code.claude.com) 仅支持自定义 Skills。

**自定义 Skills**:

- 创建包含 [SKILL.md](http://SKILL.md) 文件的目录

- Claude 自动发现和使用它们

- 基于文件系统，不需要 API 上传

**存储位置**：

- 个人： `~/.claude/skills/`

- 项目： `.claude/skills/`

**运行时限制**：

- **完整网络访问**： Skills 拥有与用户计算机上任何其他程序相同的网络访问权限

- **不建议全局包安装**： Skills 应该只在本地安装包，避免干扰用户的计算机

### Claude Agent SDK

[Claude Agent SDK](https://docs.anthropic.com/en/agent-sdk/overview) 通过基于文件系统的配置支持自定义 Skills。

**自定义 Skills**:

- 在 `.claude/skills/` 创建包含 [SKILL.md](http://SKILL.md) 文件的目录

- 在 `allowed_tools` 配置中包含 `"Skill"` 以启用 Skills

- SDK 运行时自动发现 Skills

## ⚠️ 重要限制： Skills 不跨平台同步

**自定义 Skills 不会在不同平台之间自动同步**。上传到一个平台的 Skills 不会自动在其他平台上可用：

- 上传到 [Claude.ai](http://Claude.ai) 的 Skills 必须单独上传到 API

- 通过 API 上传的 Skills 在 [Claude.ai](http://Claude.ai) 上不可用

- Claude Code 的 Skills 基于文件系统，与 [Claude.ai](http://Claude.ai) 和 API 分离

**实际影响**：

- 需要为每个使用平台单独管理和上传 Skills

- 在多平台环境中，建议维护 Skills 的版本控制仓库

- 更新 Skill 时，需要在所有使用的平台上分别更新

**共享范围差异**：

- [**Claude.ai**](http://Claude.ai): 仅个人用户，团队成员需各自上传

- **Claude API**: 工作空间范围，所有成员可访问

- **Claude Code**: 个人（`~/.claude/skills/`）或项目级（`.claude/skills/`)，也可通过 Claude Code Plugins 共享

## 可用的预构建 Agent Skills

以下预构建 Agent Skills 可在 Claude API 和 [claude.ai](http://claude.ai) 上立即使用：

| Skill | skill_id | 功能 |
| --- | --- | --- |
| **PowerPoint** | `pptx` | 创建演示文稿、编辑幻灯片、分析演示内容 |
| **Excel** | `xlsx` | 创建电子表格、分析数据、生成带图表的报告 |
| **Word** | `docx` | 创建文档、编辑内容、格式化文本 |
| **PDF** | `pdf` | 生成格式化的 PDF 文档和报告 |

**使用方式**：

- **Claude API**: 在 `container` 参数中指定 `skill_id`（如 `pptx`)

- [**Claude.ai**](http://Claude.ai): 自动可用，无需设置，Claude 会在相关时自动使用

## 领域知识的捕获

Skills 的核心价值是捕获和传递领域专业知识，这些知识可能包括：工作流程、最佳实践、公司规范、行业标准。

在编写 Skill 时，应该思考：**一个新员工需要知道什么才能完成这个任务？**

### 捕获隐性知识

那些有经验的人知道但没有写在文档里的技巧和注意事项。

例如，在代码审查 Skill 中，不仅要说 “检查代码风格”，还要说 “特别注意是否使用了公司禁止的 `eval()` 函数“

### 捕获决策逻辑

在什么情况下选择方案 A，什么情况下选择方案 B。

例如，在数据处理 Skill 中，说明 “如果数据量小于 10000 行，使用 pandas；如果超过 100000 行，使用 Dask”

### 捕获常见错误

新手经常犯的错误以及如何避免。

例如，在 API 调用 Skill 中，提醒 “注意 rate limiting，建议在请求之间添加 0.5 秒延迟”

### 捕获公司特定规范

你的组织特有的要求和约定。

例如，在文档编写 Skill 中，说明 “所有对外文档必须使用公司统一的 Markdown 模板，位于 `assets/doc-template.md`"

## 编写可组合的 Skills

- Skills 应该设计为可以相互调用和组合，形成更复杂的工作流

- 一个 Skill 应该专注于一个明确的领域或任务，避免做太多事情

- 例如，创建独立的 “PDF 处理” Skill 和 “邮件发送” Skill，而不是一个 “PDF 处理并发送邮件” Skill

- 在 Skill 中可以引用其他 Skills，例如 “如果需要发送结果，使用 email-sender Skill”

- 使用清晰的输入输出约定，使得 Skills 可以串联使用

- 例如，一个 Skill 的输出是 JSON 格式的数据，另一个 Skill 接受 JSON 格式的输入

- 避免 Skills 之间的紧耦合，每个 Skill 应该能够独立工作

- 设计 Skill 时考虑可重用性：这个 Skill 能否在不同的项目或场景中使用？

- 例如，“代码审查” Skill 应该是通用的，而不是绑定到特定的代码仓库

## 测试和验证 Skill

- 在编写完 Skill 后，必须进行测试以确保其正确工作

- 使用 `/skills` 命令（在支持的环境中）查看你的 Skill 是否被正确发现和加载

- 检查 Skill 的元数据是否正确显示，特别是 name 和 description

- 创建测试场景，使用包含触发关键词的提示来验证 Skill 是否被正确激活

- 例如，如果 description 中写了 “当用户提到 PDF 时使用”，那么测试时说 “帮我处理这个 PDF 文件”

- 验证 Agent 是否能够正确理解和执行 [SKILL.md](http://SKILL.md) 中的指令

- 测试脚本是否能够正常执行，检查脚本的输出是否符合预期

- 测试引用的文件是否能够被正确读取，链接是否有效

- 测试边界情况和错误处理：当输入不符合预期时，Skill 是否能够给出有用的错误信息

- 如果可能，请其他人使用你的 Skill，收集反馈并改进

## Skill 的版本管理和维护

- 将 Skills 纳入版本控制系统（如 Git），跟踪变更历史

- 在 [SKILL.md](http://SKILL.md) 或单独的 [CHANGELOG.md](http://CHANGELOG.md) 文件中记录重要的变更

- 当 Skill 的行为发生重大变化时，考虑更新版本号（可以在 frontmatter 中添加 version 字段）

- 定期审查和更新 Skills，确保它们反映最新的最佳实践和工具变化

- 收集使用反馈：Skill 是否达到了预期效果？哪些部分需要改进？

- 当底层工具或 API 发生变化时，及时更新 Skill 中的说明和脚本

- 考虑为 Skill 编写测试用例，自动验证脚本的功能

- 文档化 Skill 的依赖项，例如需要的 Python 包、系统工具等

## 🔒 安全性重要提示

**核心原则**：仅使用来自可信来源的 Skills - 您自己创建的或从 Anthropic 获得的。

### 为什么 Skills 存在安全风险？

Skills 为 Claude 提供新能力，包括指令和可执行代码。这使它们功能强大，但也意味着恶意 Skill 可以：

- **工具滥用**：指示 Claude 以有害方式调用工具（文件操作、bash 命令、代码执行）

- **数据泄露**：访问敏感数据并将其发送到外部系统

- **隐蔽操作**：执行与 Skill 声明目的不符的操作

### 使用未知来源 Skills 的风险

⚠️ **警告**：如果必须使用来自不可信或未知来源的 Skill，请极度谨慎并在使用前彻底审计。根据 Claude 执行 Skill 时的访问权限，恶意 Skills 可能导致数据泄露、未经授权的系统访问或其他安全风险。

### 审计检查清单

- [ ]  审查所有捆绑文件：

- [ ]  查找异常模式：意外的网络调用、文件访问模式、与声明目的不符的操作

- [ ]  

- [ ]  检查工具使用：验证 allowed-tools 设置是否遵循最小权限原则

- [ ]  评估数据访问：确认 Skill 访问的数据范围是否合理

### 最佳实践

- 将 Skills 视为安装软件 - 只使用可信来源

- 在生产系统中集成 Skills 时格外小心，特别是有敏感数据访问权限时

- 定期审查已安装的 Skills，移除不再需要的

- 监控 Skills 的行为，确保其按预期工作

- 不要在 Skills 中硬编码敏感信息，如 API 密钥、密码、访问令牌

- 使用环境变量或配置文件来存储敏感信息，并在文档中说明如何设置

- 在 [SKILL.md](http://SKILL.md) 中明确说明 Skill 需要哪些权限和访问

- 使用 allowed-tools 字段限制 Skill 可以使用的工具，遵循最小权限原则

- 在脚本中验证输入，防止注入攻击

- 对于会修改文件或执行危险操作的 Skills，在文档中明确警告用户

- 考虑在 Skill 中添加确认步骤

## 性能优化建议

- 保持 [SKILL.md](http://SKILL.md) 文件简洁，避免包含大量不必要的文本，因为它会被完整加载到上下文中

- 将详细的参考信息、大型数据集、长篇文档放在单独的文件中，让 Agent 按需读取

- 脚本应该高效执行，避免不必要的计算或 I/O 操作

- 对于耗时的操作，在文档中说明预期的执行时间，例如 “处理大型 PDF 可能需要 30-60 秒”

- 考虑提供快速路径和完整路径，例如 “对于简单场景，使用快速命令 X；对于复杂场景，参见详细流程”

- 避免在 Skill 中包含冗余信息，每个信息点应该只出现一次

- 使用清晰的标题和结构，帮助 Agent 快速定位需要的信息，减少不必要的阅读

## 文档风格和语言

- 使用清晰、直接、专业的语言，避免口语化或模糊的表达

- 使用主动语态而不是被动语态，例如 “运行脚本” 而不是 “脚本应该被运行”

- 使用一致的术语，不要在同一个 Skill 中用不同的词指代同一个概念

- 对于技术术语，在第一次出现时给出简短的解释或链接到详细说明

- 使用具体的例子而不是抽象的描述，例如 “使用 pdfplumber 库” 而不是 “使用合适的库”

- 保持语言简洁，删除不必要的修饰词和冗余表达

- 使用列表、表格、代码块等格式化元素提高可读性

- 如果 Skill 面向国际用户，使用英语；如果只在特定语言环境中使用，可以使用本地语言

- 保持一致的格式和风格，例如标题的大小写规则、代码块的缩进等

## 常见错误和陷阱

### 错误 1: description 写得太模糊

**问题**：导致 Agent 不知道何时使用该 Skill

**修正**：在 description 中明确列出触发场景和关键词

### 错误 2: 在 [SKILL.md](http://SKILL.md) 中包含过多细节

**问题**：导致上下文窗口浪费

**修正**：将详细信息移到单独的引用文件中

### 错误 3: 指令不够明确

**问题**：使用 “可以”、“或许” 等模糊词语

**修正**：使用明确的祈使句，给出具体的操作步骤

### 错误 4: 脚本缺乏错误处理

**问题**：出错时没有有用的信息

**修正**：在脚本中添加 try-catch 块和有意义的错误消息

### 错误 5: 引用的文件路径错误

**问题**：文件不存在或路径不正确

**修正**：仔细检查所有文件路径，使用相对路径而不是绝对路径

### 错误 6: Skill 做了太多事情

**问题**：变成了一个大杂烩

**修正**：将 Skill 拆分成多个专注的小 Skills

### 错误 7: 没有提供示例

**问题**： Agent 难以理解如何使用

**修正**：至少提供 2-3 个覆盖不同场景的具体示例

### 错误 8: frontmatter 格式错误

**问题**：导致 Skill 无法被正确解析

**修正**：严格遵循 YAML 语法，使用工具验证 YAML 格式

## 高级技巧

- **技巧 1**: 使用条件逻辑让 Skill 适应不同场景，例如 “如果项目使用 TypeScript，则……；如果使用 JavaScript，则……”

- **技巧 2**: 在 Skill 中嵌入决策树，帮助 Agent 选择正确的执行路径

- **技巧 3**: 提供模板和样板代码，让 Agent 可以直接使用或修改

- **技巧 4**: 使用 Skill 来标准化团队的工作流程，例如 “代码提交前必须运行的检查清单”

- **技巧 5**: 创建 “元 Skill”，即指导如何使用其他 Skills 的 Skill

- **技巧 6**: 利用脚本的输出作为后续步骤的输入，形成数据处理管道

- **技巧 7**: 在 Skill 中包含故障排查指南，帮助 Agent 自主解决常见问题

- **技巧 8**: 使用表格格式总结复杂的决策规则或配置选项，提高可读性

## 与 MCP 的集成

- MCP(Model Context Protocol）提供对外部系统的标准化访问，Skills 提供使用这些系统的工作流程

- 在 Skill 中可以引用 MCP 提供的工具，例如 “使用 GitHub MCP 的 list_pull_requests 工具获取 PR 列表”

- Skills 应该关注 “如何使用” MCP 工具来完成任务，而不是重复 MCP 工具的文档

- 例如，不要在 Skill 中详细说明 GitHub API 的参数，而是说明 “在代码审查工作流中，按以下顺序调用这些 API”

- 当 MCP 和 Skills 一起使用时，MCP 负责数据访问，Skills 负责业务逻辑和领域知识

- 在设计 Skill 时，考虑它可能会与哪些 MCP 服务器配合使用，并在文档中说明依赖关系

- 例如，“此 Skill 需要安装 GitHub MCP 服务器，运行 `npm install -g @modelcontextprotocol/server-github`"

## 实际应用场景示例

- **场景 1: 代码审查** - 创建一个 Skill 捕获团队的代码审查标准，包括安全检查、性能考虑、测试覆盖率要求

- **场景 2: 文档生成** - 创建一个 Skill 自动生成 API 文档，遵循公司的文档模板和风格指南

- **场景 3: 数据分析** - 创建一个 Skill 执行标准的数据清洗和分析流程，包括异常值检测、可视化等

- **场景 4: 部署流程** - 创建一个 Skill 指导如何部署应用，包括环境检查、构建步骤、回滚程序

- **场景 5: 客户支持** - 创建一个 Skill 包含常见问题的解决方案和升级流程

- **场景 6: 合规检查** - 创建一个 Skill 确保代码或文档符合行业法规要求，如 GDPR、HIPAA

- **场景 7: 性能优化** - 创建一个 Skill 指导如何分析和优化应用性能，包括使用的工具和指标

- **场景 8: 测试自动化** - 创建一个 Skill 定义测试策略，包括单元测试、集成测试、端到端测试的编写规范

## 持续改进的方法

- 定期收集使用数据：哪些 Skills 被频繁使用？哪些很少被触发？

- 分析失败案例：当 Skill 没有达到预期效果时，是什么原因？指令不清晰？缺少信息？

- 进行用户访谈：询问团队成员 Skills 是否有帮助，哪些地方可以改进

- A/B 测试：对于重要的 Skills，尝试不同的编写方式，比较效果

- 建立反馈循环：在 Skill 中包含反馈机制，例如 “如果此 Skill 没有帮助，请告诉我具体问题”

- 学习最佳实践：研究其他团队或开源社区的 Skills，学习他们的设计模式

- 迭代优化：不要期望一次就写出完美的 Skill，通过多次迭代不断改进

- 文档化经验教训：记录在 Skill 开发过程中学到的东西，形成团队的知识库

## 总结检查清单

在发布 Skill 之前，使用此检查清单确保质量：

### 核心质量检查

- description 具体且包含关键术语

- description 包含 Skill 的功能和使用时机两部分

- [SKILL.md](http://SKILL.md) 正文在 500 行以内

- 额外细节放在单独文件中（如需要）

- 没有时间敏感信息（或放在“旧模式”部分）

- 整个 Skill 使用一致的术语

- 示例具体而非抽象

- 文件引用保持一层深度

- 适当使用渐进式披露

- 工作流程有清晰的步骤

### 代码和脚本检查

- 脚本解决问题而不是推卸给 Claude

- 错误处理明确且有帮助

- 没有“巫术常量”（所有值都有理由）

- 所需包在指令中列出并验证可用

- 脚本有清晰的文档

- 没有 Windows 风格路径（全部使用正斜杠）

- 关键操作有验证/验证步骤

- 质量关键任务包含反馈循环

### 测试检查

- 至少创建了三个评估

- 使用 Haiku、Sonnet 和 Opus 进行了测试

- 使用真实使用场景进行了测试

- 纳入了团队反馈（如适用）

### 技术要求检查

- frontmatter 包含必需的 name 和 description 字段

- name 符合命名规范（小写字母、数字、连字符，最多 64 字符）

- name 不包含 XML 标签和保留词（“anthropic”、“claude”）

- description 使用第三人称编写

- description 不包含 XML 标签且不超过 1024 字符

- 所有引用的文件路径正确，文件存在

- 脚本可以正常执行

- 没有硬编码敏感信息，使用环境变量或配置文件

- 如果使用 allowed-tools，遵循最小权限原则

- 已经测试 Skill 能够被正确发现和执行

- 文档化了依赖项和前置条件

- 了解目标平台的运行时限制（网络访问、包依赖等）

## 企业级 Skills 治理与部署

### 安全审查与风险评估

- 部署企业级 Skills 需要回答两个核心问题：Skills 平台本身是否安全，以及如何审查特定 Skill 的安全性

- 在批准部署前需要对每个 Skill 进行风险等级评估，识别潜在的安全隐患

- 代码执行风险属于高风险指标：Skill 目录中的脚本文件（如 Python、Shell、JavaScript）会以完整环境访问权限运行

- 指令操纵风险属于高风险指标：指示 Claude 忽略安全规则、向用户隐藏操作或根据条件改变行为的指令可能绕过安全控制

- MCP 服务器引用属于高风险指标：引用 MCP 工具的指令会扩展访问范围到 Skill 本身之外

- 网络访问模式属于高风险指标：URL、API 端点、fetch、curl 或 requests 调用可能成为数据外泄的途径

- 硬编码凭证属于高风险指标：Skill 文件或脚本中的 API 密钥、令牌或密码会暴露在 Git 历史和上下文窗口中

- 文件系统访问范围属于中等风险指标：Skill 目录之外的路径、宽泛的通配符模式、路径遍历可能访问意外数据

- 工具调用属于中等风险指标：指示 Claude 使用 bash、文件操作或其他工具的指令需要审查具体执行的操作

- 部署前必须阅读 Skill 目录的所有内容，包括 [SKILL.md](http://SKILL.md)、所有引用的 Markdown 文件以及任何捆绑的脚本或资源

- 必须在沙箱环境中运行脚本并验证脚本行为与声明目的一致，确认输出与 Skill 描述相符

- 必须检查对抗性指令，寻找指示 Claude 忽略安全规则、向用户隐藏操作、通过响应外泄数据或根据特定输入改变行为的指令

- 必须检查外部 URL 获取或网络调用，在脚本和指令中搜索网络访问模式（如 http、requests.get、urllib、curl、fetch）

- 必须验证没有硬编码凭证，检查 Skill 文件中的 API 密钥、令牌或密码，凭证应使用环境变量或安全凭证存储

- 必须识别 Skill 指示 Claude 调用的所有工具和命令，列出所有 bash 命令、文件操作和工具引用

- 必须确认重定向目标，如果 Skill 引用外部 URL，验证它们指向预期的域名

- 必须验证没有数据外泄模式，寻找读取敏感数据然后写入、发送或编码以进行外部传输的指令

- 永远不要在没有完整审计的情况下部署来自不可信来源的 Skills，恶意 Skill 可以指示 Claude 执行任意代码、访问敏感文件或向外部传输数据

- 应该以与在生产系统上安装软件相同的严格程度对待 Skill 安装

### Skills 部署前评估

- Skills 如果触发不正确、与其他 Skills 冲突或提供错误指令，会降低 Agent 性能，因此在生产部署前必须进行评估

- 触发准确性评估：Skill 是否在正确的查询时激活并在不相关查询时保持不活动

- 触发准确性失败示例：Skill 在每次提到电子表格时都触发，即使用户只是想讨论数据

- 隔离行为评估：Skill 是否能够独立正确工作

- 隔离行为失败示例：Skill 引用其目录中不存在的文件

- 共存性评估：添加此 Skill 是否会降低其他 Skills 的性能

- 共存性失败示例：新 Skill 的描述过于宽泛，窃取了现有 Skills 的触发机会

- 指令遵循评估：Claude 是否准确遵循 Skill 的指令

- 指令遵循失败示例：Claude 跳过验证步骤或使用错误的库

- 输出质量评估：Skill 是否产生正确、有用的结果

- 输出质量失败示例：生成的报告有格式错误或缺少数据

- 必须要求 Skill 作者提交评估套件，每个 Skill 包含 3-5 个代表性查询，涵盖 Skill 应该触发、不应该触发和模糊边界情况

- 必须跨组织使用的所有模型（Haiku、Sonnet、Opus）进行测试，因为 Skill 有效性因模型而异

- 触发准确性下降时应更新 Skill 的描述或指令

- 共存冲突时应合并重叠的 Skills 或缩小描述范围

- 输出质量持续低下时应重写指令或添加验证步骤

- 跨更新持续失败时应弃用该 Skill

### Skills 生命周期管理

- 规划阶段：识别重复性、易出错或需要专业知识的工作流程，将这些映射到组织角色并确定哪些是 Skills 的候选

- 创建和审查阶段：确保 Skill 作者遵循最佳实践，使用审查清单进行安全审查，在批准前要求评估套件

- 创建和审查阶段必须建立职责分离：Skill 作者不应该是自己的审查者

- 测试阶段：要求在隔离环境（仅 Skill）和与现有 Skills 一起（共存测试）进行评估

- 测试阶段必须在批准生产前验证触发准确性、输出质量以及活跃 Skill 集中没有回归

- 部署阶段：通过 Skills API 上传以实现工作空间范围的访问

- 部署阶段必须在内部注册表中记录 Skill，包括目的、所有者和版本

- 监控阶段：跟踪使用模式并收集用户反馈

- 监控阶段必须定期重新运行评估以检测随着工作流程和模型演变的漂移或回归

- 监控阶段注意：使用分析目前不通过 Skills API 提供，需要实施应用程序级日志记录来跟踪请求中包含哪些 Skills

- 迭代或弃用阶段：在推广新版本前要求完整评估套件通过

- 迭代或弃用阶段应在工作流程变化或评估分数下降时更新 Skills

- 迭代或弃用阶段应在评估持续失败或工作流程退役时弃用 Skills

### 大规模组织 Skills

- 作为一般指导原则，限制同时加载的 Skills 数量以保持可靠的召回准确性

- 每个 Skill 的元数据（名称和描述）在系统提示词中竞争注意力，Skills 过多时 Claude 可能无法选择正确的 Skill 或完全错过相关的 Skills

- 应使用评估套件在添加 Skills 时测量召回准确性，当性能下降时停止添加

- API 请求每个请求最多支持 8 个 Skills，如果角色需要的 Skills 超过单个请求支持的数量，考虑将窄 Skills 合并为更广泛的 Skills 或根据任务类型将请求路由到不同的 Skill 集

- 鼓励团队从窄的、特定工作流程的 Skills 开始，而不是广泛的多用途 Skills

- 随着模式在组织中出现，将相关 Skills 合并为基于角色的包

- 仅当合并 Skill 的评估确认与其替换的各个 Skills 性能相当时才合并窄 Skills

- 命名示例进展：从 formatting-sales-reports、querying-pipeline-data、updating-crm-records 开始，合并为 sales-operations（当评估确认性能相当时）

- 跨组织使用一致的命名约定，维护包含目的、所有者、版本、依赖项和评估状态的内部注册表

- 按组织角色分组 Skills 以保持每个用户的活跃 Skill 集专注，例如销售团队（CRM 操作、管道报告、提案生成）、工程团队（代码审查、部署工作流程、事件响应）、财务团队（报告生成、数据验证、审计准备）

- 每个基于角色的包应仅包含与该角色日常工作流程相关的 Skills

### Skills 分发与版本控制

- 将 Skill 目录存储在 Git 中以进行历史跟踪、通过拉取请求进行代码审查以及回滚能力

- 每个 Skill 目录（包含 [SKILL.md](http://SKILL.md) 和任何捆绑文件）自然映射到 Git 跟踪的文件夹

- Skills API 提供工作空间范围的分发，通过 API 上传的 Skills 对所有工作空间成员可用

- 生产环境应将 Skills 固定到特定版本，在推广新版本前运行完整评估套件

- 应将每次更新视为需要完整安全审查的新部署

- 开发和测试环境应使用最新版本在生产推广前验证更改

- 必须维护先前版本作为后备，如果新版本在生产中评估失败，立即回滚到最后已知良好版本

- 应计算已审查 Skills 的校验和并在部署时验证它们，在 Skill 仓库中使用签名提交以确保来源

- 自定义 Skills 不会跨平台同步，上传到 API 的 Skills 在 [claude.ai](http://claude.ai) 或 Claude Code 上不可用，反之亦然

- 必须在 Git 中维护 Skill 源文件作为单一真实来源

- 如果组织跨多个平台部署 Skills，必须实施自己的同步流程以保持它们一致

## 参考资源

- [Agent Skills 官方文档](https://docs.anthropic.com/en/agents-and-tools/agent-skills)

- [Agent Skills 快速开始教程](https://docs.anthropic.com/en/agents-and-tools/agent-skills/quickstart)

- [Agent Skills Cookbook](https://platform.claude.com/cookbook/skills-notebooks-01-skills-introduction)

- [Agent Skills 最佳实践](https://docs.anthropic.com/en/agents-and-tools/agent-skills/best-practices)

- [Agent Skills 企业级部署指南](https://docs.anthropic.com/en/agents-and-tools/agent-skills/enterprise)

- [Anthropic 工程博客： Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)

- [安全部署 AI Agents](https://docs.anthropic.com/en/agent-sdk/secure-deployment)