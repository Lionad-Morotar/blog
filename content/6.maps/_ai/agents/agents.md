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

* [Agent 生态系统全景](/maps/_ai/agents/agent-ecosystem)：框架、平台、协议和基础设施全面调研
* [AgentScope - 阿里开源多智能体框架](/maps/_ai/agents/agentscope)
* [框架对比：AutoGen、DeepAgents、CrewAI、ElizaOS、OpenAI Swarm、AgentScope、LangGraph](/maps/_ai/agents/multi-agent-frameworks)
* [架构决策与工程实践](/maps/_ai/agents/multi-agent-architecture)
* [构建模式与实践指南](/maps/_ai/agents/multi-agent-patterns)

## Agent SDK

* [Claude Agent SDK (TypeScript) 发布记录](/maps/_ai/agents/claude-agent-sdk-releases)
* [Claude Agent SDK 使用方式与调用栈](/maps/_ai/agents/claude-agent-sdk)
* [OpenAI Agents SDK (JavaScript) 发布记录](/maps/_ai/agents/openai-agents-js-releases)

## 治理与政策

* [智能体治理与政策](/maps/_ai/governance/agent-governance)：三部委《智能体规范应用与创新发展实施意见》要点解读

## 架构

* [Agent 架构设计原则与最佳实践](/maps/_ai/agents/agent-architecture)：工作流与智能体的区别、技术选型金字塔、五种工作流模式、工具设计、长时运行 Agent 的 Harness 设计
* [Agent 分类学](/maps/_ai/agents/agent-taxonomy)：Russell & Norvig 五大智能体类型、三个互补分类维度

## 编码 Agent 实现

* [Pi Agent 源码解析](/maps/_ai/agents/pi-agent)：事件同步屏障、半轮压缩前缀、会话树状态回滚与工具流更新截止门

## 沙箱与运行时安全

* [Agent 沙箱的 Egress 管控](/maps/_ai/agents/agent-sandbox)：受控可信 MITM、SNI 策略锚点、逃生门代价与推理独立执法域

## 人机协作团队

* [人机协作智能体团队](/maps/_ai/agents/human-agent-teams)：Anthropic 关于构建高效人类与智能体协作团队的经验

## Harness 工程

* [Harness 工程](/maps/_ai/agents/harness-engineering)：控制论前馈/反馈、Rules/Hooks 实践、Token 成本优化与流程型 Skill 设计
* [模型与 Harness 的训练耦合](/maps/_ai/agents/model-harness-coupling)：新模型在第三方 harness 编造工具参数、后训练过拟合机制与约束采样对策
* [SoL-Pi：auto-research 搜出的效率机制集](/maps/_ai/agents/sol-pi)：四类 token 浪费的机制归因、压缩投资回收、组合损失累积、自动研究局部盆地与一次性编排循环

## 企业落地

* [Tokenmaxxing：三个月必然失败的 AI 应用层泡沫](/maps/_ai/agents/tokenmaxxing)：Agentic coding 成本失控、组织流程瓶颈、能力错配与 J 型曲线下探
* [软件工厂（Software Factory）](/maps/_ai/agents/software-factory)：事件驱动多 Agent 工程流程的定义与边界、注入攻击面、失败即代码库体检、隔离 subagent 与标签状态机
* [Agent 算法迭代方法论](/maps/_ai/agents/agent-algo-methodology)：先验后验闭环、评测四级 scaling 链、策略升级路径与 KL 过优化、裁判当奖励被攻陷、SFT 分布外验证

## 参考

* [Building effective agents @Anthropic](https://www.anthropic.com/engineering/building-effective-agents)
* [How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)
