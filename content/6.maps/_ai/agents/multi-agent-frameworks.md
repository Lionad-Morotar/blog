---
title: 多智能体协作框架对比
description: AutoGen、DeepAgents、CrewAI、ElizaOS、OpenAI Swarm、AgentScope、LangGraph 等多智能体框架的核心设计、适用场景与选择建议
---

## 架构范式演进

#### 从"命令-执行"到"目标-委托"

智能体不再是被动的工具，而是主动的目标追求者。
用户将高层级目标委托给智能体后，智能体独立进行规划、推理、执行和反思，直到交付成果。
这标志着人与 AI 的关系从"命令-执行"演变为"目标-委托"。

#### 三大架构范式

当前实现自主协作的思路百花齐放，但架构范式大致可归纳为三个主流方向：

| 范式 | 代表框架 | 核心特征 |
|------|----------|----------|
| **单智能体自主循环** | BabyAGI、AutoGPT、AgentGPT | "思考-规划-执行-反思"闭环，自我提示迭代完成开放式目标 |
| **多智能体协作** | CrewAI、AutoGen、MetaGPT | 模拟人类团队协作，角色扮演式对话或组织化工作流 |
| **高级控制流架构** | LangGraph | 图结构编排，状态管理，生产级基础设施支持 |

## 早期探索：单智能体自主循环

#### BabyAGI

循环式任务管理闭环的开创者。核心思想是将大目标递归拆分为可执行的小任务，
通过优先级队列管理任务列表，形成"生成任务 → 执行任务 → 提取结果 → 生成新任务"的自治循环。

#### AutoGPT / AgentGPT

早期典型范式代表，强调通用智能体的自我迭代能力。
智能体通过"思考-规划-执行-反思"的闭环不断进行自我提示，
调用外部工具（搜索、代码执行等）以完成开放式的高层级目标。
其设计哲学是最大化智能体的自主性，减少人工干预。

## AutoGen

#### 圆桌会议模式

AutoGen 模拟人类圆桌会议，智能体之间自由对话达成共识。对话模式灵活，支持一对一、群聊、分层对话，每步决策都在交流过程中动态决定。可方便调用外部工具和函数。

#### 发言者选择机制

- **Auto 模式**：LLM 分析对话内容，自动挑选最适合的发言者（如技术问题让技术专家回答）
- **Round Robin**：轮替机制
- **Random**：完全随机
- **Manual**：手动指定
- **User**：用户主导

#### 适用场景

- 需要七嘴八舌讨论的研究型问题
- 头脑风暴新产品设计
- 从不同立场评审学术论文
- 探讨复杂伦理问题
- 无标准答案、需要碰撞出新想法的场景

## DeepAgents

#### 项目经理模式

采用"项目经理 + 专家团队"方式，将大任务逐层拆分为子任务，每个子任务分配给专门的智能体。内置 WriteTodos 工具自动分解任务，子智能体相互隔离（上下文不串），中间结果可保存在文件系统中实现跨会话记忆管理。

#### 资源控制优势

对 Token 消耗控制严格，适合资源紧张环境。

#### 适用场景

- 有清晰阶段划分和明确交付物的工程化任务
- 长期运行、需要不断续杯的场景
- Token 资源紧张的环境

## CrewAI

见：[CrewAI - Multi-Agent Platform](https://www.crewai.com/)

#### 公司团队模式

模拟真实公司团队，每个智能体创建时需明确角色和目标（如市场研究员、内容作家、数据分析师）。按预设顺序依次完成任务，流程清晰，每步都可灵活定义。

#### 适用场景

- 企业内有明确岗位职责的场景
- 多阶段软件开发
- 市场报告自动生成
- 数据分析流水线
- 快速搭建原型验证多智能体价值的项目

## 三框架对比

#### 设计哲学差异

| 框架 | 隐喻 | 控制方式 | 灵活性 | 结构化 |
|------|------|----------|--------|--------|
| AutoGen | 圆桌会议 | 对话驱动 | 高 | 低 |
| DeepAgents | 项目经理+专家 | 计划驱动 | 低 | 高 |
| CrewAI | 公司部门 | 角色驱动 | 中 | 中 |

#### 技术架构差异

- **AutoGen**：对等网络，所有智能体地位相同，可随时互相交流
- **DeepAgents**：树状层级结构，主智能体下挂子智能体，主从关系明确
- **CrewAI**：有向无环图（DAG），任务流像流水线一样清晰

#### 上下文处理方式

- **AutoGen**：直接共享，智能体可直接将上下文发给另一智能体
- **DeepAgents**：完全隔离，高层目标与底层任务细节分开
- **CrewAI**：链式传递，上一步输出直接变成下一步输入（接力赛模式）

## ElizaOS

见：[ElizaOS - GitHub](https://github.com/elizaOS/eliza)

#### Web3 原生多智能体操作系统

ElizaOS 是 100% TypeScript 实现的多智能体框架，GitHub 14.7K+ Stars，定位为 "Web3 友好的 AI Agent 操作系统"。它采用模块化架构，支持 250+ 模型（OpenAI、Anthropic、Llama、Grok 等），专为社交代理、交易机器人和区块链应用设计。

#### 五大核心组件

- **Agents（代理）**：处理自主交互的数字助手，拥有记忆和性格
- **Character Files（角色文件）**：定义智能体身份、个性、可用模型和操作的"人设"
- **Providers（提供者）**：提供市场数据、钱包详情、情绪分析等实时信息的"感知系统"
- **Actions（行动）**：从简单买卖到复杂 NFT 生成的"技能库"，每个动作都是独立事件
- **Evaluators（评估器）**：评估对话内容、提取关键信息、建立长期记忆的"决策系统"

#### 适用场景

- Web3 和区块链应用（智能合约交互、代币交易）
- 社交媒体代理（Discord、Telegram、Farcaster 等去中心化社交协议）
- 需要多模型支持的复杂 Agent 系统
- 社区驱动的插件生态系统

## OpenAI Swarm / Agents SDK

见：[OpenAI Swarm - GitHub](https://github.com/openai/swarm)、[OpenAI Agents SDK](https://openai.github.io/openai-agents-python/)

#### 极简多智能体编排框架

OpenAI Swarm 是实验性、教育性框架，核心代码仅约 300 行，通过两个基本抽象实现功能：Agent（智能体）和 Handoffs（交接）。2025 年 3 月，OpenAI 发布了 Swarm 的生产级继任者——OpenAI Agents SDK。

#### 核心原语

- **Agent**：封装 `instructions`（指令）和 `tools`（工具），可在任何时候将对话交接给另一个 Agent
- **Handoffs**：通过函数返回另一个 Agent 对象实现对话交接，支持动态任务分配
- **Guardrails**：输入输出校验机制
- **Sessions**：客户端状态管理（对话历史）
- **Tracing**：内置调试和追踪系统

#### 与 Claude Agent SDK 对比

| 维度 | OpenAI Agents SDK | Claude Agent SDK |
|------|-------------------|------------------|
| 发布时间 | 2025 年 3 月 | 2025 年 9 月 |
| 语言支持 | Python 优先 | TypeScript + Python |
| 核心哲学 | 快速上手、生产可用 | 少抽象、多授权 |
| MCP 支持 | 支持 | 原生支持（协议创建者） |
| 上下文管理 | 客户端 Sessions | 自动上下文压缩 |
| 长任务支持 | 有限 | 超过 30 小时自主编码 |
| 适用场景 | 快速原型、多智能体协作 | 复杂长周期任务、代码操作 |

#### 适用场景

- 快速原型设计和实验
- 教育目的，学习多智能体编排概念
- 处理大量独立能力和复杂指令的场景
- 需要高度可控和可测试性的场景

#### 局限性

- Swarm 明确声明为"实验性、教育性"框架，不建议用于生产环境
- 仅支持 OpenAI API，生态相对封闭
- 无状态设计，缺乏持久化状态管理能力
- 无官方 TypeScript 版本（Python 实现为主）

## AgentScope

见：[AgentScope - GitHub](https://github.com/agentscope-ai/agentscope)

#### 阿里开源的多智能体框架

AgentScope 是阿里巴巴开源的生产级多智能体框架，GitHub 16.5K+ Stars，Python 实现。其设计哲学是充分利用模型的推理和工具使用能力，而非用严格提示和固定编排来约束模型。

#### 核心特性

- **简单易用**：内置 ReAct Agent、工具、技能、人工介入、记忆、规划、实时语音、评估和模型微调支持，5 分钟上手
- **可扩展性强**：大量生态集成（工具、内存、可观测性），原生支持 MCP 和 A2A 协议，MsgHub 支持灵活的多智能体编排
- **生产就绪**：支持本地部署、无服务器云端部署或 K8s 集群部署，内置 OTel 可观测性支持

#### 特色功能

- **Agentic RL**：集成强化学习训练，支持数学求解、工具使用等场景的微调和优化
- **实时语音代理**：支持实时语音交互的多智能体系统
- **灵活 MCP 使用**：可将 MCP 工具作为本地可调用函数，自由组合到工具包中

#### 适用场景

- 需要快速构建和迭代的多智能体应用
- 企业级生产环境部署
- 需要强化学习优化 Agent 行为的场景
- 实时语音交互应用

## LangGraph

见：[LangGraph - GitHub](https://github.com/langchain-ai/langgraph)

#### 低级别智能体编排框架

LangGraph 是 LangChain 团队开发的低级别编排框架，用于构建、管理和部署长期运行、有状态的智能体（Agents）。它以图（Graph）的形式组织 Agent 工作流，支持循环、条件分支和持久化状态管理。被 Klarna、Replit、Elastic 等公司采用。

#### 核心优势

- **持久化执行（Durable Execution）**：Agent 能在故障后自动恢复，从断点继续执行
- **人机协作（Human-in-the-loop）**：可在执行过程中随时检查和修改 Agent 状态
- **全面记忆（Comprehensive Memory）**：支持短期工作记忆和长期跨会话持久化记忆
- **调试与可观测性**：通过 LangSmith 可视化执行路径、状态转换和运行时指标
- **生产级部署**：支持长周期、有状态工作流的规模化部署

#### 与 LangChain 生态系统的关系

- **LangSmith**：Agent 评估和可观测性工具
- **LangSmith Deployment**：专门的 Agent 部署平台，支持 LangGraph Studio 可视化原型设计
- **LangChain**：提供集成和可组合组件

#### 设计哲学

LangGraph 不抽象提示词或架构，而是提供底层基础设施支持**任何**长周期、有状态的工作流或 Agent。它受 Pregel 和 Apache Beam 启发，API 设计参考 NetworkX。

#### 适用场景

- 需要持久化状态和错误恢复的长周期任务
- 复杂的多步骤工作流，需要循环和条件分支
- 需要人机协作介入的 Agent 系统
- 企业级生产环境中的 Agent 部署

## 框架选型参考

#### 快速选型决策框架

| 需求特征 | 推荐框架 | 理由 |
|----------|----------|------|
| 快速原型验证 | AutoGen、OpenAI Swarm | 学习曲线低，对话模式灵活 |
| 企业流程自动化 | CrewAI、MetaGPT | 角色驱动，流程清晰，SOP 化 |
| 长周期复杂任务 | LangGraph | 持久化状态，故障恢复，生产级 |
| Token 资源受限 | DeepAgents | 严格资源控制，分层隔离 |
| Web3/区块链场景 | ElizaOS | 原生支持，多模型，社交代理友好 |
| 需要强化学习优化 | AgentScope | 内置 Agentic RL，支持模型微调 |

#### 演进趋势观察

从早期 BabyAGI、AutoGPT 的"单兵作战"模式，
到 CrewAI、AutoGen 的"团队协作"理念，
再到 LangGraph 提供的"基础设施"思维——
智能体框架正从实验性工具走向生产级系统。

一句话总结：**AutoGen 快、CrewAI 稳、LangGraph 强**。

## 参考

- [多智能体架构决策与工程实践](/maps/_ai/agents/multi-agent-architecture)
- [多智能体构建模式与实践指南](/maps/_ai/agents/multi-agent-patterns)
- [AI Agent 入门基础教程](https://blog.csdn.net/m0_59235245/article/details/157585071)
- [AI Agent 框架实测：AutoGen、CrewAI、LangGraph 有何不同？](https://www.cnblogs.com/jxyai/p/19171973)
- [主流 AI 智能体框架全景对比与深度剖析](http://82.157.247.243/archives/4117)
