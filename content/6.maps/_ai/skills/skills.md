---
title: Agent Skills
description: Skill 是一种能力，作为 Agent 和工具之间的胶水层，帮助 Agent 理解工具以及有控制上下文等优点。
original_path: _ai/skills.md
---

## Tour

* [Claude Skills](https://code.claude.com/docs/zh-CN/skills)
* [Agent Skills](https://github.com/agentskills/agentskills)：Anthropic 维护的开放格式，用于给 AI 代理添加新功能和专业知识。包含技能规范、文档和参考 SDK，支持编写一次、到处使用的指令文件夹。

## Domain

* [如何编写 Skills](/maps/_ai/skills/create-a-skill.md)
* [D2C 实践](/maps/_ai/skills/d2c)：基于 AWS Kiro + MCP + Skills 的智能 Design-to-Code 架构

## Ecosystem

Skills.homes 是由 ToQuery 创建的 AI Agent Skills 发现、安装和创建平台，为 Claude Code、Eloquent 以及其他兼容 MCP 的 Agent 提供可复用的能力扩展。

不同于单一工具或框架，Skills.homes 充当 Skills 生态的聚合入口 —— 开发者可以在这里发现社区维护的现成能力，也可以创建并分享自己的 Skills。

- **发现 Skills**：浏览精选的社区 Skills，涵盖代码审查、PR 创建、性能优化等场景
- **安装集成**：通过 `npx skills` 快速安装到本地项目
- **创建指南**：提供完整的 Skill 开发规范和最佳实践

见：[Skills.homes](https://skills.homes/zh-CN)

## 跨提供商发现机制

Agent Skills 是一个开放标准（[agentskills.io](https://agentskills.io/specification)），定义了可复用的 AI 代理能力包格式。所有主流 AI coding tool 提供商都已采纳该标准，但在 frontmatter 字段支持、目录发现机制、调用语法和扩展行为上存在显著差异。

**跨提供商目录兼容矩阵**：

| 提供商 | `.claude/skills/` | `.agents/skills/` | `.<provider>/skills/` | 向上扫描 |
|--------|:----------------:|:-----------------:|:---------------------:|:--------:|
| Claude Code | 原生 | - | 原生 | 否 |
| Cursor | 兼容 | 兼容 | 原生 | 否 |
| Copilot | 兼容 | 兼容 | 原生 | 否 |
| Codex CLI | 兼容 | 原生 | - | **是** |
| OpenCode | 兼容 | 兼容 | 原生 | 是 |
| Pi | 兼容 | 兼容 | 原生 | **是** |
| Gemini CLI | - | 兼容 | 原生 | 否 |
| Rovo Dev | - | 兼容 | 原生 | 否 |
| Kiro | - | - | 原生 | 否 |
| Trae | - | - | 原生 | 否 |

**关键发现**：

1. **跨提供商发现已成常态** — Cursor、Copilot、OpenCode、Pi 等都会读取 `.claude/skills/` 和 `.agents/skills/`，意味着为 Claude Code 编写的 Skill 可在多个平台复用
2. **Claude Code 拥有最丰富的扩展字段**（12 个 provider-specific 字段），远超其他提供商
3. **Codex CLI 和 OpenCode 支持向上扫描** — 从 CWD 向上扫描到 repo root，monorepo 友好
4. **Pi 支持 package.json 声明和 CLI `--skill` 参数** — 最灵活的发现机制

见：[Provider Skills Differences](/Users/lionad/Github/Run/impeccable/docs/research/provider-skills-differences.md) — 10 家提供商详细对比

## 提供商实现差异

### Frontmatter 字段分歧

标准规范定义 5 个核心字段（`name`、`description`、`license`、`compatibility`、`metadata`），但各提供商扩展程度差异巨大：

| 扩展字段 | Claude Code | Copilot | OpenCode | 其他 |
|----------|:-----------:|:-------:|:--------:|:----:|
| `user-invocable` | Yes | Yes | Yes | - |
| `argument-hint` | Yes | Yes | Yes | - |
| `disable-model-invocation` | Yes | Yes | - | Pi, Cursor |
| `model` / `effort` / `context` | Yes | - | - | - |
| `agent` / `hooks` / `paths` | Yes | - | - | - |
| `shell` | Yes | - | - | - |
| `allowed-tools` | 空格分隔 | 空格分隔 | 空格分隔 | Rovo Dev: **YAML 列表** |

### 调用语法差异

| 提供商 | 前缀 | 示例 |
|--------|------|------|
| Claude Code / Copilot / Kiro / OpenCode / Rovo / Trae | `/` | `/audit` |
| Pi | `/skill:` | `/skill:audit` |
| Codex CLI | `$` | `$audit` |
| Cursor / Gemini | 自动匹配 | Agent 根据 description 判断 |

### 独有能力

| 能力 | 提供商 | 说明 |
|------|--------|------|
| SKILL.md 变量替换 | Claude Code | `$ARGUMENTS`, `$0-$N`, `${CLAUDE_*}`, `` !`cmd` `` |
| 独立命令系统 | Gemini CLI | `.gemini/commands/*.toml`，TOML 格式 |
| 侧车扩展文件 | Codex CLI | `agents/openai.yaml` — UI 元数据、MCP 依赖 |
| 权限模型 | OpenCode | allow/deny/ask 三级，支持通配符 |
| 热替换 | Pi | 运行时修改技能文件即时生效 |
| 用户确认激活 | Gemini CLI | 每次激活需 UI 确认弹窗 |
| 扩展注册点 | VS Code Copilot | `package.json` `contributes.chatSkills` |

见：[HARNESSES.md](https://github.com/anthropics/harnesses.md) — Claude Code Skills 完整字段说明

## CLI

`skills` 是由 Vercel Labs 维护的 CLI 工具，用于管理 AI Agent 的 Skills，支持 35+ 种 Agent。

#### 核心命令？

| 命令 | 作用 |
|------|------|
| `npx skills add <source>` | 安装 Skill |
| `npx skills list` / `ls` | 列出已安装的 Skills |
| `npx skills find [query]` | 搜索 Skills |
| `npx skills remove` / `rm` | 移除 Skills |
| `npx skills check` | 检查更新 |
| `npx skills update` | 更新所有 Skills |
| `npx skills init [name]` | 创建 SKILL.md 模板 |

#### 安装源的格式？

```bash
# GitHub shorthand
npx skills add vercel-labs/agent-skills

# 完整 GitHub URL
npx skills add https://github.com/vercel-labs/agent-skills

# 子目录路径
npx skills add https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines

# 本地路径
npx skills add ./my-local-skills
```

#### 常用选项？

| 选项 | 说明 |
|------|------|
| `-g, --global` | 安装到用户目录（全局） |
| `-a, --agent <agents...>` | 指定目标 Agent（如 `claude-code`, `codex`） |
| `-s, --skill <skills...>` | 安装特定 Skills（`'*'` 表示全部） |
| `-l, --list` | 仅列出可用 Skills |
| `-y, --yes` | 跳过确认提示 |
| `--all` | 安装所有 Skills 到所有 Agents |

#### 使用示例？

```bash
# 列出仓库中的 Skills
npx skills add vercel-labs/agent-skills --list

# 安装特定 Skills 到特定 Agent
npx skills add vercel-labs/agent-skills --skill frontend-design -a claude-code

# 全局安装并跳过确认
npx skills add vercel-labs/agent-skills --skill frontend-design -g -y

# CI/CD 友好方式
npx skills add vercel-labs/agent-skills --skill frontend-design -g -a claude-code -y
```

见：[skills - npm](https://www.npmjs.com/package/skills)

## Gists

VSCode 有 Skill 的校验。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20260124134051380.png)
