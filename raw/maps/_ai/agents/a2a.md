# A2A Protocol

> Agent-to-Agent 协议，Google 推出的多智能体协同开放标准

## 概述

A2A（Agent-to-Agent）协议是 Google 于 2025 年 4 月发布的开放标准，旨在解决不同 AI 智能体之间的互操作性问题，允许不同供应商、框架和平台的智能体跨系统安全协作，打破"信息孤岛"。

见：[Google A2A 官方文档](https://developers.google.com/agent-to-agent) | [A2A 协议规范](https://github.com/google/A2A)

## 核心设计原则

#### 能力发现（Capability Discovery）

Agent 可动态发现其他 Agent 的能力，无需预先硬编码集成逻辑。通过标准化的能力描述格式，Agent 能理解其他 Agent 可以执行什么任务。

#### 任务管理（Task Management）

支持多 Agent 协作完成复杂任务，包含任务创建、状态跟踪、结果返回的全生命周期管理。

#### 多模态通信（Multimodal Communication）

支持文本、图像、音频、视频等多种数据格式的交换，适应不同场景需求。

#### 用户体验协商（User Experience Negotiation）

Agent 可协商如何向用户呈现结果，支持多种交互模式（同步/异步、流式/一次性返回等）。

#### Agent Card 与本地网络发现

A2A 通过 Agent Card 让智能体互相发现能力。Agent Card 是一份 JSON 文档，描述 agent 的身份、服务端点、能力、认证方式和技能列表，通常暴露在 `/.well-known/agent-card.json`。
对于局域网场景，A2A 社区提出了 LAD-A2A（Local Agent Discovery for A2A）草案，支持 mDNS/DNS-SD（`_a2a._tcp`）、well-known endpoint、
DHCP Option 和 QR/NFC 四种发现机制，按优先级 fallback。由于局域网并非默认可信，LAD-A2A 要求所有端点使用 HTTPS、Agent Card 必须经过 JWS 或 DID 签名、用户显式同意连接，
并按最小权限授予能力。

见：[A2A Agent Discovery](https://a2a-protocol.org/latest/topics/agent-discovery/)、[LAD-A2A Specification](https://lad-a2a.org/spec/)

#### ACP 与 A2A 的合并

ACP（Agent Communication Protocol）最初由 IBM Research 于 2025 年发布，定位是让不同框架、语言和运行环境的 AI 智能体通过 REST 接口互相通信。它支持单 agent 单 server、
多 agent 单 server、分布式多 server 以及 Router Agent 等部署模式，后者还会通过 MCP extension 调用下游 agent 的工具。2025 年下半年，
IBM 宣布将 ACP 并入 Google 的 A2A（Agent-to-Agent）协议，转由 Linux Foundation 统一治理。这意味着当前协议栈已经分层：MCP 解决 agent 与工具/数据的连接，A2A（
含 ACP 遗产）解决 agent 与 agent 的协作。

见：[Agent Communication Protocol Architecture](https://agentcommunicationprotocol.dev/core-concepts/architecture)、[A2A vs ACP vs MCP Compared](https://codex.danielvaughan.com/2026/05/29/agent-to-agent-communication-protocols-a2a-vs-acp-vs-mcp-compared/)、[IBM's ACP technical overview](https://workos.com/blog/ibm-agent-communication-protocol-acp)

## A2A vs MCP

A2A 与 MCP（Model Context Protocol）是互补关系：

<table>
<thead>
  <tr>
    <th>
      协议
    </th>
    
    <th>
      解决的问题
    </th>
    
    <th>
      类比
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      MCP
    </td>
    
    <td>
      Agent 与工具/资源的连接
    </td>
    
    <td>
      USB 接口
    </td>
  </tr>
  
  <tr>
    <td>
      A2A
    </td>
    
    <td>
      Agent 与 Agent 之间的协作
    </td>
    
    <td>
      网络协议
    </td>
  </tr>
</tbody>
</table>

MCP 让 Agent 能调用外部工具和访问资源，A2A 让 Agent 能与其他 Agent 协作完成更复杂的任务。

见：[MCP 与 A2A 对比](https://cloud.google.com/blog/products/application-modernization/mcp-and-a2a)

## 案例：希希咖啡店

**希希咖啡店**是基于 Google ADK 框架和 A2A 协议构建的多 Agent 协同案例，展示了企业级多业务系统的 Agent 集成方案。

### 架构设计

采用**通用智能体 + 业务领域 Agent** 的分层架构：

<table>
<thead>
  <tr>
    <th>
      组件
    </th>
    
    <th>
      角色
    </th>
    
    <th>
      职责
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      寒小艾（主 Agent）
    </td>
    
    <td>
      通用智能体
    </td>
    
    <td>
      意图识别、任务分发、对话管理
    </td>
  </tr>
  
  <tr>
    <td>
      希希咖啡店 Agent
    </td>
    
    <td>
      业务 Agent
    </td>
    
    <td>
      咖啡点单、菜单查询、订单管理
    </td>
  </tr>
  
  <tr>
    <td>
      送了么 Agent
    </td>
    
    <td>
      业务 Agent
    </td>
    
    <td>
      配送调度、物流跟踪
    </td>
  </tr>
  
  <tr>
    <td>
      后端服务
    </td>
    
    <td>
      OpenAPI
    </td>
    
    <td>
      业务逻辑实现，通过 FunctionAI Toolset 接入
    </td>
  </tr>
</tbody>
</table>

### 交互流程

**场景：用户下单并配送**

```text
用户："帮我点一杯大杯拿铁，配送到中关村大厦"

寒小艾（意图识别）→ 希希咖啡店 Agent（创建订单）→ 后端（订单系统）
                     → 送了么 Agent（创建配送单）→ 后端（配送系统）

返回："订单已确认，预计 30 分钟送达，配送费 5 元"
```

### 技术亮点

- **业务解耦**：各业务线独立开发部署，通过 A2A 协议协同
- **OpenAPI 快速集成**：现有 REST API 通过 FunctionAI Toolset 快速转化为 Agent 工具
- **云原生部署**：基于阿里云函数计算，支持弹性伸缩、按量付费

见：[希希咖啡店 GitHub](https://github.com/agentrun-ai/buy-me-a-coffee)

## 实践建议

#### 何时使用 A2A？

- 多业务系统需要 Agent 化协同
- 不同团队独立开发 Agent 需要互联互通
- 构建 Agent 生态系统，支持第三方 Agent 接入

#### 实施路径

1. **现有 API Agent 化**：通过 OpenAPI 规范快速接入
2. **通用 Agent 设计**：负责意图识别和任务分发
3. **业务 Agent 解耦**：按业务域划分 Agent 边界
4. **标准化协议对接**：遵循 A2A 协议进行能力注册和调用

见：[Google ADK 文档](https://developers.google.com/agent-development-kit) | [A2A 快速入门](https://developers.google.com/agent-to-agent/quickstart)

#### A2A 与 MCP 的桥接

A2A 与 MCP 可以互补使用：一个 agent 通常同时是 MCP client（调用自己的工具）和 A2A client/server（与其他 agent 协作）。
工程上常见的桥接模式是把 A2A agent 包装成一个 MCP server，使其对外表现为一个普通 MCP tool。这样，Claude Code 等 MCP host 无需原生支持 A2A，也能调用远程 agent 的能力。
ACP 的 Router Agent 模式也采用了类似思路，通过 MCP extension 把下游 agent 的工具暴露给上层编排器。

见：[A2A vs ACP vs MCP Compared](https://codex.danielvaughan.com/2026/05/29/agent-to-agent-communication-protocols-a2a-vs-acp-vs-mcp-compared/)、[Agent Communication Protocol Architecture](https://agentcommunicationprotocol.dev/core-concepts/architecture)
