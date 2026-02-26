---
title: Agents
description: AI 代理（Agents）是能够自主执行任务并与环境交互的智能实体，通常基于大语言模型（LLM）构建。
original_path: _ai/agents.md
---

## Domain

* [有毒数据流分析](/maps/_ai/agents/toxic-flow-analysis)

## Deep Research

* [Deep Research 案例：大模型 MaaS 低价 Coding Plan 商业逻辑](https://dr.unifuncs.com/?sid=252a69b5-d259-42fc-a6ce-d315f89dde52)

## Protocol

* [A2A - Agent-to-Agent 多智能体协同协议](/maps/_ai/agents/a2a)
* [A2UI - Agent 驱动界面的声明式 UI 协议](/maps/_ai/agents/a2ui)

## Goose

* [Goose Prompts](/maps/_ai/agents/goose/prompts)

## 多智能体框架

* [AutoGen vs DeepAgents vs CrewAI 对比](/maps/_ai/agents/multi-agent-frameworks)

## Agent 架构第一性原理

#### 工作流与智能体的核心区别？

决策权归属是区分二者的关键。

**工作流（Workflow）** 像流水线或菜谱，任务流程固定且预先设计好。LLM 被代码调用完成特定子任务（如总结文本、提取信息），决策权在代码而非模型。

**智能体（Agent）** 像侦探，你给它总目标，但没有固定剧本。它会根据情况动态决定下一步该做什么、使用哪个工具、任务是否完成，决策权在 LLM 而非代码。

#### 技术选型金字塔？

Anthropic 建议始终从最简单方案开始，只有当简单方案无法满足需求时才增加复杂性。

| 层级 | 方案 | 适用场景 |
|------|------|----------|
| 底层（基础） | 优化单一 LLM 调用 | 简单任务，追求效率。通过 RAG、Few-shot 示例解决大部分问题 |
| 中层（中级） | 工作流 | 流程固定、明确、可预测，对质量有高标准 |
| 顶层（高级） | 智能体 | 开放式任务，无法预测步骤，需要模型大规模自主决策 |

**示例**：翻译 / 本地化任务
- 读一封外文邮件/工单，快速了解大意即可 → 单一 LLM 调用
- 需要稳定产出与可追溯质量（术语一致、格式固定、必须复核），如用户手册/合规文档翻译 → 工作流（翻译 → 术语校验 → 审校/回译）
- 目标是“把内容做成一条可发布的多语言产线”，涉及选题、改写、本地化用词、生成标题与摘要、更新站点/提交 PR 等多步决策与多工具协作 → 智能体
