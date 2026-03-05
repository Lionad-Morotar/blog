---
title: Agent 生态系统全景
description: AI Agent 框架、平台、协议和基础设施的全面调研
---
## 多智能体框架对比

| 框架 | GitHub | Stars | 语言 | Tool | MCP | Skill | Memory | Hook | 特点 |
|------|--------|-------|------|------|-----|-------|--------|------|------|
| **LangGraph** | langchain-ai/langgraph | 10K+ | Python/TS | ✅ | ✅ | ✅ | ✅ | ✅ | 图状态机编排，生产级首选 |
| **AutoGen** | microsoft/autogen | 40K+ | Python/.NET | ✅ | ✅ | ✅ | ✅ | ✅ | 微软生态，对话式协作 |
| **CrewAI** | crewAIInc/crewAI | 38K+ | Python | ✅ | ✅ | ✅ | ✅ | ✅ | 角色化团队，易用性高 |
| **AgentScope** | agentscope-ai/agentscope | 16.5K+ | Python | ✅ | ✅ | ✅ | ✅ | ✅ | 阿里开源，强化学习集成 |
| **Google ADK** | google/adk-python | 新 | Python/Java/Go/TS | ✅ | ✅ | ✅ | ✅ | ✅ | 多语言支持，MCP/A2A原生 |
| **OpenAI Agents SDK** | openai/openai-agents-python | 8K+ | Python | ✅ | ✅ | ✅ | ✅ | ✅ | 极简设计，快速上手 |
| **Agno** (原Phi) | agno-agi/agno | 10K+ | Python | ✅ | ✅ | ✅ | ✅ | ✅ | 全栈平台，AgentOS运行时 |
| **Pydantic AI** | pydantic/pydantic-ai | 新 | Python | ✅ | ✅ | ❌ | ❌ | ❌ | 强类型验证，金融级安全 |

## 低代码/无代码平台

| 平台 | 定位 | 核心特性 | 开源/商业 |
|------|------|----------|-----------|
| **Dify.AI** | LLM 应用开发平台 | 可视化编排、RAG、Agent、工作流 | 开源 + 商业 |
| **扣子 (Coze)** | 字节跳动 Agent 平台 | 插件生态、知识库、工作流、发布到豆包/飞书 | 商业 |
| **腾讯元器** | 腾讯 Agent 平台 | 微信生态集成、知识引擎、工具链 | 商业 |
| **Langflow** | LangChain 可视化工具 | 拖放式工作流、与 LangChain 生态集成 | 开源 |
| **Flowise** | 开源 LLM 编排工具 | 类似 Langflow、支持多种模型 | 开源 |

## 企业级平台

| 平台 | 厂商 | 核心能力 |
|------|------|----------|
| **AWS Bedrock Agents** | Amazon | 统一模型接入、Policy 安全边界、AgentCore 运行时 |
| **Azure AI Agent Service** | Microsoft | 与 Microsoft 365 深度集成、可视化工作流设计器 |
| **Vertex AI Agent Builder** | Google | Model Garden、RAG 引擎、多模态能力 |
| **阿里云百炼** | 阿里巴巴 | 200+ 模型支持、V-RAG 开源、MCP 全生命周期服务 |
| **IBM watsonx Orchestrate** | IBM | 1000+ 预构建集成、AgentOps 全生命周期管理 |

## 垂直领域 Agent

### 编程/代码生成
* [Continue.dev](https://continue.dev/)：开源 AI 代码助手，支持任何 LLM
* [Supermaven](https://supermaven.com/)：20万 token 上下文代码补全
* [Codeium](https://codeium.com/)：完全免费的代码助手，支持 70+ IDE

### 数据分析
* [Julius AI](https://julius.ai/)：对话式数据分析
* [ChatCSV](https://www.chatcsv.co/)：CSV 数据对话分析

### 科研/学术
* [Elicit](https://elicit.com/)：AI 研究助手
* [Consensus](https://consensus.app/)：科学文献搜索引擎

### 法律
* [Harvey](https://www.harvey.ai/)：法律 AI 平台（ARR 7500万美元）
* [CoCounsel](https://www.cocounsel.com/)：法律研究助手

## Agent 基础设施

### 监控与可观测性
* [Langfuse](https://langfuse.com/)：开源 LLM 可观测性
* [LangSmith](https://smith.langchain.com/)：LangChain 官方平台
* [AgentOps](https://www.agentops.ai/)：Agent 运维平台

### 记忆/存储
* [Mem0](https://github.com/mem0ai/mem0)：开源 Agent 记忆层
* [Zep](https://www.getzep.com/)：长期记忆服务
* [Chroma](https://www.trychroma.com/)：向量数据库

### 安全与治理
* [Glaider](https://glaider.com/)：Agent 安全护栏
* [MI9 框架](https://github.com/barclays/mi9)：巴克莱开源运行时治理框架

## 协议与标准

### 协议栈全景

```
┌─────────────────────────────────────────────────────────────┐
│                      应用层                                   │
├─────────────────────────────────────────────────────────────┤
│                    呈现层（UI）                               │
│    AG-UI / A2UI - 智能体与用户界面的交互协议                   │
├─────────────────────────────────────────────────────────────┤
│                   Agent 通信层                                │
│    A2A - Agent 间协作协议（横向通信）                          │
├─────────────────────────────────────────────────────────────┤
│                     支付层                                    │
│    AP2（法币支付）+ x402（Crypto 支付）                       │
├─────────────────────────────────────────────────────────────┤
│                  工具与数据层                                 │
│    MCP - Agent 接入外部工具、数据库、API（纵向连接）            │
├─────────────────────────────────────────────────────────────┤
│                  身份与安全层                                 │
│    W3C DID / OAuth 2.1 / JWT - 身份认证与授权                 │
└─────────────────────────────────────────────────────────────┘
```

### 核心协议对比

| 协议 | 提出方 | 核心定位 | 成熟度 |
|------|--------|----------|--------|
| **MCP** | Anthropic | 工具与数据连接 | ★★★★★ 300万+周下载 |
| **A2A** | Google | Agent 间协作 | ★★★★☆ 50+企业支持 |
| **AP2** | Google | 支付授权 | ★★★☆☆ 60+机构 |
| **AG-UI** | CopilotKit | 前端交互 | ★★★★☆ 主流框架支持 |
| **ANP** | 开源社区 | 智能体互联网 | ★★★☆☆ 早期阶段 |

### MCP (Model Context Protocol)

AI 应用的"USB-C 接口"，标准化 LLM 与外部工具、数据源的连接方式。

**核心抽象：**
- **Resources**：应用程序控制的数据源
- **Tools**：模型可调用的功能
- **Prompts**：用户控制的预定义模板

**生态规模：**
- 周下载量超过 300 万次
- 数百家企业接入
- 官方 Registry 于 2025年9月发布

### A2A (Agent-to-Agent Protocol)

Agent 之间的"HTTP 协议"，解决跨框架、跨厂商 Agent 的互操作性问题。

**关键技术组件：**
- **Agent Card**：JSON 格式元数据，描述 Agent 能力
- **Task Object**：标准化任务管理
- **Message/Artifact**：多模态消息体

**生态支持：**
- 50+ 企业联合签署（Atlassian、Salesforce、SAP、ServiceNow 等）
- 已贡献给 Linux Foundation

## 选型建议

### 按场景选型

| 场景 | 推荐方案 |
|------|----------|
| 快速原型/MVP | CrewAI、OpenAI Agents SDK、Dify |
| 复杂流程控制 | LangGraph |
| 企业级生产环境 | AutoGen、Azure AI、AWS Bedrock |
| 阿里云生态/国内部署 | AgentScope、阿里云百炼 |
| 类型安全/金融级 | Pydantic AI |
| 低代码/无代码 | 扣子、Langflow、Flowise |

### 技术栈组合建议

**开源全栈：**
- 框架：LangGraph / AutoGen
- 协议：MCP + A2A
- 监控：Langfuse
- 记忆：Mem0
- 部署：Modal / BentoML

**企业全栈：**
- 平台：Azure AI Agent Service / AWS Bedrock
- 协议：MCP + A2A + AP2
- 监控：AgentOps
- 安全：Glaider

## 参考

* [MCP 官方文档](https://modelcontextprotocol.io/)
* [A2A 协议规范](https://google.github.io/A2A/)
* [Agentic AI Foundation](https://www.agentic.ai/)
* [Anthropic - Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)
