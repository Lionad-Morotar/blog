---
title: A2A Protocol
description: Agent-to-Agent 协议，Google 推出的多智能体协同开放标准
---

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

## A2A vs MCP

A2A 与 MCP（Model Context Protocol）是互补关系：

| 协议 | 解决的问题 | 类比 |
|------|-----------|------|
| MCP | Agent 与工具/资源的连接 | USB 接口 |
| A2A | Agent 与 Agent 之间的协作 | 网络协议 |

MCP 让 Agent 能调用外部工具和访问资源，A2A 让 Agent 能与其他 Agent 协作完成更复杂的任务。

见：[MCP 与 A2A 对比](https://cloud.google.com/blog/products/application-modernization/mcp-and-a2a)

## 案例：希希咖啡店

**希希咖啡店**是基于 Google ADK 框架和 A2A 协议构建的多 Agent 协同案例，展示了企业级多业务系统的 Agent 集成方案。

### 架构设计

采用**通用智能体 + 业务领域 Agent** 的分层架构：

| 组件 | 角色 | 职责 |
|------|------|------|
| 寒小艾（主 Agent） | 通用智能体 | 意图识别、任务分发、对话管理 |
| 希希咖啡店 Agent | 业务 Agent | 咖啡点单、菜单查询、订单管理 |
| 送了么 Agent | 业务 Agent | 配送调度、物流跟踪 |
| 后端服务 | OpenAPI | 业务逻辑实现，通过 FunctionAI Toolset 接入 |

### 交互流程

**场景：用户下单并配送**

```
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