# 智能体 (AI Agents)

## LangChain：构建 LLM 应用的编排框架

LangChain 提供构建 LLM 应用的标准组件：Chains（将多个 LLM 调用串联成工作流）、Agents（动态决策调用哪些工具）、Memory（对话历史管理）、Callbacks（日志、监控集成）。支持 ReAct（推理+行动交替）、Plan-and-Execute（先制定计划再执行）、Structured Chat（结构化输出解析）等 Agent 类型。是构建复杂 LLM 应用的首选框架。

见：[LangChain 官网](https://langchain.com/) | [ReAct Agent 基准测试](https://blog.langchain.com/react-agent-benchmarking/) | [LangChain Agents 教程](https://www.youtube.com/watch?v=Gi7nqB37WEY)

## LlamaIndex：数据增强的 Agent 开发框架

LlamaIndex 专注于"数据增强的 Agent"——连接 LLM 与私有数据。提供 100+ Data Connectors（PDF、SQL、API 等数据源）、多种 Index Types（向量索引、树索引、图索引）、Query Engines（RAG、多文档问答）。Workflow 机制允许定义复杂的 Agent 协作流程，结合工具调用与检索能力，是 RAG 和知识库应用的首选。

见：[LlamaIndex 官网](https://www.llamaindex.ai/) | [LlamaIndex RAG 指南](https://developers.llamaindex.ai/python/framework/understanding/rag/) | [Document Agents 工作流](https://www.llamaindex.ai/blog/automate-workflows-with-document-agents-a-complete-tutorial-to-building-context-aware-AI)

## CrewAI：多 Agent 协作框架

CrewAI 将 Agent 定义为具有角色、目标和工具的"数字员工"，通过定义任务依赖实现协作。支持 Role-Playing Agents（专业化角色设定）、Autonomous Collaboration（自主协作）、Task Delegation（任务委托）。适合研究报告生成、代码审查流水线、客户服务自动化等需要多角色协作的场景。

见：[CrewAI 官网](https://www.crewai.com/) | [CrewAI 文档](https://docs.crewai.com/en/introduction) | [CrewAI 实战指南](https://www.digitalocean.com/community/tutorials/crewai-crash-course-role-based-agent-orchestration)

## AutoGPT：自主 Agent 先驱

AutoGPT 是首个引发广泛关注的自主 Agent 项目，展示了 LLM 独立完成任务的可能性：目标分解将大目标拆分为可执行步骤、自主循环（观察-思考-行动-记忆）、工具使用（文件操作、网络搜索、代码执行）。但也面临循环陷阱、成本失控、可靠性等现实挑战，更多用于探索性任务。

见：[AutoGPT GitHub](https://github.com/Significant-Gravitas/AutoGPT)

## Agent 的记忆问题

#### AI 记忆层次的缺陷

人类记忆层次包括感觉记忆、短期记忆和长期记忆，可随时将短期记忆巩固为长期记忆。但 AI 系统仅有两种记忆：上下文作为短期记忆（任务结束即清除）、模型权重作为长期记忆（需昂贵训练才能更新）。这种缺失限制了 Agent 的持续学习和个性化能力。

#### 为什么记忆对 Agent 至关重要

想象一下：如果软件工程师每天醒来后对公司代码库一无所知，又要重新开始入职培训；如果每次与朋友聊天都忘记之前的对话内容。这正是当前 AI Agent 的处境——缺乏将短期经验转化为长期记忆的灵活机制。ChatGPT 的"记忆功能"尝试通过提取用户偏好摘要来解决这一问题，但仍显初级。

#### 持续学习评估的缺失

学术界面临的核心挑战不是缺少方法，而是缺少合适的评估基准。当研究者尝试让 Agent 从过往任务中学习时，审稿人往往质疑"这对其他方法不公平"。这种评估困境阻碍了持续学习 Agent 的发展。真正的突破需要重新设计评估设定，从评估"现有能力"转向评估"学习能力"。

见：[The Second Half - 长期记忆](https://ysymyth.github.io/The-Second-Half/)

## 框架选择指南

LangChain 适合复杂 LLM 应用，学习曲线中等；LlamaIndex 适合 RAG 和知识库，学习曲线平缓；CrewAI 适合多角色协作场景，学习曲线平缓；AutoGPT 适合探索性任务，学习曲线陡峭。实际项目中常组合使用，如 LlamaIndex 负责数据检索，LangChain 负责工具编排，CrewAI 负责多 Agent 协作。

见：[2025 主流 AI Agent 框架调研](https://damodev.csdn.net/69671cabea53844658f6afed.html) | [LangChain vs LlamaIndex vs CrewAI 对比](https://draftnrun.com/en/blog/250915-ai-agent-frameworks-comparison/)

## 多 Agent 架构模式

#### 通用智能体 + 业务领域 Agent

一种适用于企业级多业务系统的分层架构模式：

**角色划分：**
- **通用主 Agent**：负责意图识别、对话管理、任务分发
- **业务领域 Agent**：专注特定业务领域（如订单、库存、客服）
- **后端服务**：通过 OpenAPI 提供业务逻辑，经 FunctionAI Toolset 接入

**优势：**
- **业务解耦**：各业务线独立开发部署自己的 Agent
- **协议标准化**：通过 A2A 等协议实现跨系统协作
- **低摩擦集成**：现有 REST API 可快速转化为 Agent 工具

**典型案例：**
- [希希咖啡店](/maps/_ai/agents/a2a) - 基于 Google ADK + A2A 协议的咖啡点单与配送协同

#### Agent 协议选择

| 协议 | 适用场景 | 代表案例 |
|------|----------|----------|
| A2A | Agent 与 Agent 之间的协作 | 希希咖啡店的多 Agent 协同 |
| A2UI | Agent 驱动 UI 界面渲染 | 声明式 UI 协议 |
| MCP | Agent 与工具/资源的连接 | Claude Desktop 的工具调用 |

见：[A2A 协议详解](/maps/_ai/agents/a2a) | [MCP 规范](https://modelcontextprotocol.io/)

## Tour

#### LangGraph 1.0 完全指南

由 LangChain 团队开发的开源 Agent 框架，v1.0 引入中间件（Middleware）机制实现工作流的高效拓展和可定制化。本教程为基于 Jupyter Notebook 的可交互教程，关注具体实践而非概念讲解。

**章节目录：**
| 序号 | 章节 | 主要内容 |
|------|------|----------|
| 1 | 快速入门 | 创建你的第一个 ReAct Agent |
| 2 | 状态图 | 使用 StateGraph 创建工作流 |
| 3 | 中间件 | 使用自定义中间件实现：预算控制、消息截断、敏感词过滤、PII 检测 |
| 4 | 人机交互 | 使用内置的 HITL 中间件实现人机交互 |
| 5 | 记忆 | 创建短期记忆、长期记忆 |
| 6 | 上下文工程 | 使用 State、Store、Runtime 管理上下文 |
| 7 | MCP Server | 创建 MCP Server 并接入 LangGraph |
| 8 | 监督者模式 | 两种方法实现监督者模式：tool-calling、langgraph-supervisor |
| 9 | 并行 | 如何实现多节点并行 |
| 10 | Deep Agents | 简单介绍 Deep Agents |
| 11 | 调试页面 | 介绍 langgraph-cli 提供的调试页面 |

见：[LangGraph 1.0 完全指南](https://www.luochang.ink/dive-into-langgraph/)
