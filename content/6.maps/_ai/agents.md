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

## 框架选择指南

LangChain 适合复杂 LLM 应用，学习曲线中等；LlamaIndex 适合 RAG 和知识库，学习曲线平缓；CrewAI 适合多角色协作场景，学习曲线平缓；AutoGPT 适合探索性任务，学习曲线陡峭。实际项目中常组合使用，如 LlamaIndex 负责数据检索，LangChain 负责工具编排，CrewAI 负责多 Agent 协作。

见：[2025 主流 AI Agent 框架调研](https://damodev.csdn.net/69671cabea53844658f6afed.html) | [LangChain vs LlamaIndex vs CrewAI 对比](https://draftnrun.com/en/blog/250915-ai-agent-frameworks-comparison/)
