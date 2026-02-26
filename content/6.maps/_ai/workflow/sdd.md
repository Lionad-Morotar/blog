---
title: Spec-Driven Development (SDD)
description: 规格驱动开发方法论与工具对比
original_path: _ai/workflow/sdd.md
---

#### SDD 是什么？

一种将规格说明（Specification）而非代码视为核心产物的开发方法论。
规格成为可直接生成实现的"可执行文档"，代码只是"最后一公里"的产物。

作为 AI 辅助编码工作流，SDD 遵循结构化功能规格 → 分解模块 → 生成任务的多步过程。
规格形态多样：单一文档、文档组或系列结构化工件。

主流实践包括：

* **Amazon Kiro**：三阶段工作流（需求 → 设计 → 任务）
* **GitHub Spec Kit**：三步流程 + 编排能力 + 可配置提示 + "宪法"原则
* **Tessl Framework**：规格取代代码成为主要维护工件（2025 年内测）

见：[Understanding Spec-Driven Development](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)

#### Thoughtworks 的观察？

Thoughtworks 技术雷达认为 SDD 领域值得关注，但当前工具存在明显局限：

- 工作流繁琐且主观设计倾向强
- 生成冗长规格文件，难以审阅
- PRD/用户故事的目标读者不清晰
- 规模扩展性存疑——为 AI 逐条手工制定规则难以长期维持

## OpenSpec

#### 定位？

轻量级开源 SDD 框架，由 Fission-AI 开发。强调**灵活而非僵化、迭代而非瀑布**。

#### 核心命令？

| 命令 | 作用 |
|------|------|
| `/opsx:new` | 创建变更 |
| `/opsx:ff` | Fast-forward 自动生成规划文档 |
| `/opsx:apply` | 执行实现 |
| `/opsx:archive` | 归档已完成变更 |

#### 特点？

- 5 分钟快速启动（vs Spec Kit 的 30 分钟）
- 无严格阶段门控，可随时修改任何产物
- Node.js 运行，无需 Python
- 执行更快，规格文件更简洁

见：[OpenSpec 官网](https://openspec.pro/)

## Spec Kit (GitHub)

#### 定位？

GitHub 官方推出的系统化 SDD 工具包，适合需要严格质量控制的团队。

#### 核心命令？

| 命令 | 作用 |
|------|------|
| `/speckit.constitution` | 创建项目基本原则 |
| `/speckit.specify` | 定义功能规格 |
| `/speckit.plan` | 技术实现计划 |
| `/speckit.tasks` | 生成任务清单 |
| `/speckit.implement` | 系统执行所有任务 |
| `/speckit.clarify` | 结构化澄清需求 |

#### 特点？

- 严格的阶段门控（规划前必须澄清）
- 丰富的模板系统
- Python CLI 工具
- 支持 17+ AI 工具（Claude Code、Cursor、Copilot 等）

见：[Spec Kit GitHub](https://github.com/github/spec-kit)

## GSD (Get Shit Done)

#### 定位？

轻量级 meta-prompting + context engineering + SDD 系统，由 TÂCHES 创建。

#### 核心解决的问题？

**Context Rot** — 随着 Claude 上下文窗口填满而产生的质量衰减。

#### 核心命令？

| 命令 | 作用 |
|------|------|
| `/gsd:new-project` | 初始化项目（问题 → 研究 → 需求 → 路线图） |
| `/gsd:discuss-phase` | 捕获实现决策 |
| `/gsd:plan-phase` | 研究 + 规划 + 验证 |
| `/gsd:execute-phase` | 并行执行计划 |
| `/gsd:verify-work` | 人工验收测试 |
| `/gsd:quick` | 快速模式（跳过可选步骤） |

#### 核心机制？

- **XML 格式化提示**：每个计划都是结构化 XML，优化 Claude 理解
- **多代理并行**：研究、规划、执行各阶段并行子代理
- **原子 Git 提交**：每个任务独立提交
- **上下文隔离**：每个计划 200k tokens 纯净上下文

#### 特点？

- 无企业仪式（无 sprint ceremonies、story points、Jira）
- 系统复杂但工作流程简单
- 支持 Claude Code、OpenCode、Gemini CLI

见：[GSD GitHub](https://github.com/gsd-build/get-shit-done)

## BMAD (Breakthrough Method for Agile AI-Driven Development)

#### 定位？

AI 驱动的敏捷开发框架，模拟完整软件开发团队。

#### 核心组成？

- **21 个专业 Agent**：产品经理、架构师、开发工程师、UX 设计师、Scrum Master 等
- **50+ 引导式工作流**：覆盖完整开发流程

#### 特点？

- 最完整的"AI 团队"模拟
- 真正的敏捷方法论（sprints、ceremonies）
- human-in-the-loop，强调人与 AI 协作
- 适合大型、复杂项目

见：[BMAD GitHub](https://github.com/bmad-code-org/BMAD-METHOD)

## 四者对比

| 维度 | OpenSpec | Spec Kit | GSD | BMAD |
|------|----------|----------|-----|------|
| **定位** | 轻量 SDD 框架 | 系统 SDD 工具包 | 上下文工程系统 | AI 敏捷团队框架 |
| **复杂度** | 低 | 高 | 中 | 最高 |
| **启动成本** | 5 分钟 | 30 分钟 | 5 分钟 | 较高 |
| **团队模拟** | 无 | 无 | 无 | 21 个 Agent |
| **核心优势** | 灵活快速 | 严格质量控制 | 解决 context rot | 完整敏捷流程 |
| **最佳场景** | 个人/小团队 | 企业团队 | 复杂多阶段项目 | 大型敏捷项目 |
