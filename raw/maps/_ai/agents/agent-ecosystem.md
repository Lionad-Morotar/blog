# Agent 生态系统全景

> AI Agent 框架、平台、协议和基础设施的全面调研

## 多智能体框架对比

<table>
<thead>
  <tr>
    <th>
      框架
    </th>
    
    <th>
      GitHub
    </th>
    
    <th>
      Stars
    </th>
    
    <th>
      语言
    </th>
    
    <th>
      Tool
    </th>
    
    <th>
      MCP
    </th>
    
    <th>
      Skill
    </th>
    
    <th>
      Memory
    </th>
    
    <th>
      Hook
    </th>
    
    <th>
      特点
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <strong>
        LangGraph
      </strong>
    </td>
    
    <td>
      langchain-ai/langgraph
    </td>
    
    <td>
      10K+
    </td>
    
    <td>
      Python/TS
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      图状态机编排，生产级首选
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        AutoGen
      </strong>
    </td>
    
    <td>
      microsoft/autogen
    </td>
    
    <td>
      40K+
    </td>
    
    <td>
      Python/.NET
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      微软生态，对话式协作
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        CrewAI
      </strong>
    </td>
    
    <td>
      crewAIInc/crewAI
    </td>
    
    <td>
      38K+
    </td>
    
    <td>
      Python
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      角色化团队，易用性高
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        AgentScope
      </strong>
    </td>
    
    <td>
      agentscope-ai/agentscope
    </td>
    
    <td>
      16.5K+
    </td>
    
    <td>
      Python
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      阿里开源，强化学习集成
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        Google ADK
      </strong>
    </td>
    
    <td>
      google/adk-python
    </td>
    
    <td>
      新
    </td>
    
    <td>
      Python/Java/Go/TS
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      多语言支持，MCP/A2A原生
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        OpenAI Agents SDK
      </strong>
    </td>
    
    <td>
      openai/openai-agents-python
    </td>
    
    <td>
      8K+
    </td>
    
    <td>
      Python
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      极简设计，快速上手
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        Agno
      </strong>
      
       (原Phi)
    </td>
    
    <td>
      agno-agi/agno
    </td>
    
    <td>
      10K+
    </td>
    
    <td>
      Python
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      全栈平台，AgentOS运行时
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        Pydantic AI
      </strong>
    </td>
    
    <td>
      pydantic/pydantic-ai
    </td>
    
    <td>
      新
    </td>
    
    <td>
      Python
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      ❌
    </td>
    
    <td>
      ❌
    </td>
    
    <td>
      ❌
    </td>
    
    <td>
      强类型验证，金融级安全
    </td>
  </tr>
</tbody>
</table>

#### Hermes Agent 与 OpenClaw：自进化智能体的两种范式

Nous Research 于 2026 年 2 月发布 Hermes Agent（最新 v0.10.0，2026.4.16），定位为"能自我进化的开源自托管个人智能体"。同期 OpenClaw 活跃迭代（
2026.3.7 引入可插拔 ContextEngine），两者代表自托管智能体赛道的两种竞争性架构哲学。

**核心架构差异**：Hermes 以"Agent 执行循环"为同步编排引擎，围绕其集成网关、定时调度器、工具运行时和 ACP，形成"执行—学习—改进"的自我进化闭环；OpenClaw 以"网关"为中枢控制器，统一协调会话、路由、
工具调用和状态维护，强调人类可控和显式配置。

**记忆设计差异**：Hermes 采用四层分层结构——核心持久记忆（~1.3k tokens，每次会话加载）+ SQLite 可搜索历史（FTS5 全文索引，按需检索）+ Honcho 长期用户画像 + 技能层（程序性记忆，
存储"学会做什么"）；OpenClaw 采用 Markdown 文件化记忆，是"事实的权威来源"。

**安全与配置哲学**：Hermes 采用五层纵深防御（用户授权、危险命令审批、容器隔离、MCP 凭证过滤、上下文文件扫描），定位为"默认安全、生产就绪"；OpenClaw 强调操控性和可审查性，安全加固依赖用户自身运维，
定位为"强大但需手动配置"。

两者并非互斥——有分析认为可以并行运行、输出复用甚至互联，下一代产品可能兼具"用户直接掌控"和"能力复利"。

![Hermes Agent vs OpenClaw 对比表](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20260423195833082.png)

见：[Hermes Agent：挑战 OpenClaw 的新势力](https://blog.csdn.net/turingbooks/article/details/159999664)

## 低代码/无代码平台

<table>
<thead>
  <tr>
    <th>
      平台
    </th>
    
    <th>
      定位
    </th>
    
    <th>
      核心特性
    </th>
    
    <th>
      开源/商业
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <strong>
        Dify.AI
      </strong>
    </td>
    
    <td>
      LLM 应用开发平台
    </td>
    
    <td>
      可视化编排、RAG、Agent、工作流
    </td>
    
    <td>
      开源 + 商业
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        扣子 (Coze)
      </strong>
    </td>
    
    <td>
      字节跳动 Agent 平台
    </td>
    
    <td>
      插件生态、知识库、工作流、发布到豆包/飞书
    </td>
    
    <td>
      商业
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        腾讯元器
      </strong>
    </td>
    
    <td>
      腾讯 Agent 平台
    </td>
    
    <td>
      微信生态集成、知识引擎、工具链
    </td>
    
    <td>
      商业
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        Langflow
      </strong>
    </td>
    
    <td>
      LangChain 可视化工具
    </td>
    
    <td>
      拖放式工作流、与 LangChain 生态集成
    </td>
    
    <td>
      开源
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        Flowise
      </strong>
    </td>
    
    <td>
      开源 LLM 编排工具
    </td>
    
    <td>
      类似 Langflow、支持多种模型
    </td>
    
    <td>
      开源
    </td>
  </tr>
</tbody>
</table>

## 企业级平台

<table>
<thead>
  <tr>
    <th>
      平台
    </th>
    
    <th>
      厂商
    </th>
    
    <th>
      核心能力
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <strong>
        AWS Bedrock Agents
      </strong>
    </td>
    
    <td>
      Amazon
    </td>
    
    <td>
      统一模型接入、Policy 安全边界、AgentCore 运行时
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        Azure AI Agent Service
      </strong>
    </td>
    
    <td>
      Microsoft
    </td>
    
    <td>
      与 Microsoft 365 深度集成、可视化工作流设计器
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        Vertex AI Agent Builder
      </strong>
    </td>
    
    <td>
      Google
    </td>
    
    <td>
      Model Garden、RAG 引擎、多模态能力
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        阿里云百炼
      </strong>
    </td>
    
    <td>
      阿里巴巴
    </td>
    
    <td>
      200+ 模型支持、V-RAG 开源、MCP 全生命周期服务
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        IBM watsonx Orchestrate
      </strong>
    </td>
    
    <td>
      IBM
    </td>
    
    <td>
      1000+ 预构建集成、AgentOps 全生命周期管理
    </td>
  </tr>
</tbody>
</table>

## 垂直领域 Agent

### 编程/代码生成

- [Continue.dev](https://continue.dev/)：开源 AI 代码助手，支持任何 LLM
- [Supermaven](https://supermaven.com/)：20万 token 上下文代码补全
- [Codeium](https://codeium.com/)：完全免费的代码助手，支持 70+ IDE

### 数据分析

- [Julius AI](https://julius.ai/)：对话式数据分析
- [ChatCSV](https://www.chatcsv.co/)：CSV 数据对话分析

### 科研/学术

- [Elicit](https://elicit.com/)：AI 研究助手
- [Consensus](https://consensus.app/)：科学文献搜索引擎

### 法律

- [Harvey](https://www.harvey.ai/)：法律 AI 平台（ARR 7500万美元）
- [CoCounsel](https://www.cocounsel.com/)：法律研究助手

## Agent 基础设施

### 监控与可观测性

- [Langfuse](https://langfuse.com/)：开源 LLM 可观测性
- [LangSmith](https://smith.langchain.com/)：LangChain 官方平台
- [AgentOps](https://www.agentops.ai/)：Agent 运维平台

### 记忆/存储

- [Mem0](https://github.com/mem0ai/mem0)：开源 Agent 记忆层
- [Zep](https://www.getzep.com/)：长期记忆服务
- [Chroma](https://www.trychroma.com/)：向量数据库

### 安全与治理

- [Glaider](https://glaider.com/)：Agent 安全护栏
- [MI9 框架](https://github.com/barclays/mi9)：巴克莱开源运行时治理框架

## 协议与标准

### 协议栈全景

```text
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

<table>
<thead>
  <tr>
    <th>
      协议
    </th>
    
    <th>
      提出方
    </th>
    
    <th>
      核心定位
    </th>
    
    <th>
      成熟度
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <strong>
        MCP
      </strong>
    </td>
    
    <td>
      Anthropic
    </td>
    
    <td>
      工具与数据连接
    </td>
    
    <td>
      ★★★★★ 300万+周下载
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        A2A
      </strong>
    </td>
    
    <td>
      Google
    </td>
    
    <td>
      Agent 间协作
    </td>
    
    <td>
      ★★★★☆ 50+企业支持
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        AP2
      </strong>
    </td>
    
    <td>
      Google
    </td>
    
    <td>
      支付授权
    </td>
    
    <td>
      ★★★☆☆ 60+机构
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        AG-UI
      </strong>
    </td>
    
    <td>
      CopilotKit
    </td>
    
    <td>
      前端交互
    </td>
    
    <td>
      ★★★★☆ 主流框架支持
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        ANP
      </strong>
    </td>
    
    <td>
      开源社区
    </td>
    
    <td>
      智能体互联网
    </td>
    
    <td>
      ★★★☆☆ 早期阶段
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        <a href="https://github.com/open-gitagent/gitagent" rel="nofollow">
          gitagent
        </a>
      </strong>
    </td>
    
    <td>
      开源社区
    </td>
    
    <td>
      git 原生的 Agent 定义标准
    </td>
    
    <td>
      ★★☆☆☆ 早期阶段
    </td>
  </tr>
</tbody>
</table>

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

<table>
<thead>
  <tr>
    <th>
      场景
    </th>
    
    <th>
      推荐方案
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      快速原型/MVP
    </td>
    
    <td>
      CrewAI、OpenAI Agents SDK、Dify
    </td>
  </tr>
  
  <tr>
    <td>
      复杂流程控制
    </td>
    
    <td>
      LangGraph
    </td>
  </tr>
  
  <tr>
    <td>
      企业级生产环境
    </td>
    
    <td>
      AutoGen、Azure AI、AWS Bedrock
    </td>
  </tr>
  
  <tr>
    <td>
      阿里云生态/国内部署
    </td>
    
    <td>
      AgentScope、阿里云百炼
    </td>
  </tr>
  
  <tr>
    <td>
      类型安全/金融级
    </td>
    
    <td>
      Pydantic AI
    </td>
  </tr>
  
  <tr>
    <td>
      低代码/无代码
    </td>
    
    <td>
      扣子、Langflow、Flowise
    </td>
  </tr>
</tbody>
</table>

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

- [MCP 官方文档](https://modelcontextprotocol.io/)
- [A2A 协议规范](https://google.github.io/A2A/)
- [Agentic AI Foundation](https://www.agentic.ai/)
- [Anthropic - Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)
