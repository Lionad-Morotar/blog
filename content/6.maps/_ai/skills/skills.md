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
