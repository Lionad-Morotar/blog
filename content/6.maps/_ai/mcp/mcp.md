---
title: Model Context Protocol
description: MCP（Model Context Protocol）是 Anthropic 开源的标准协议，用于连接 AI 应用与外部系统，被誉为 AI 应用的 USB-C 接口。
original_path: _ai/mcp.md
---

#### MCP 是什么？

MCP 是 Model Context Protocol（模型上下文协议）的缩写，由 Anthropic 开源的一种标准协议，用于连接 AI 应用与外部系统。它就像 AI 应用的 USB-C 接口——USB-C 为电子设备提供了标准化的连接方式，而 MCP 为 AI 应用提供了标准化的方式来连接外部数据源、工具和工作流。

见：[MCP Introduction](https://modelcontextprotocol.io/docs/getting-started/intro)

#### MCP 能解决什么问题？

AI 应用（如 Claude、ChatGPT）可以通过 MCP 访问本地文件、数据库、搜索引擎、计算器等外部资源，让 AI 从"纯对话"进化为"能做事"的智能助手。例如：

- 个人助理可以访问你的 Google Calendar 和 Notion
- Claude Code 可以根据 Figma 设计直接生成 Web 应用
- 企业聊天机器人能连接多个数据库进行数据分析
- AI 可以直接在 Blender 中创建 3D 设计并发送到 3D 打印机

#### MCP 的价值分层？

对不同角色的价值各有不同：

- **开发者**：降低构建/集成 AI 应用的开发时间和复杂度
- **AI 应用/Agent**：获得丰富的数据源和工具生态，增强能力
- **终端用户**：获得更智能、能访问个人数据并代行操作的 AI 体验

## Tour

## Examples

* [ESLint MCP](https://github.com/eslint/rewrite/blob/main/packages/mcp/src/mcp-server.js)：ESLint MCP Server，Server 端直接调用 `eslint ...` 来修复代码。
* [PortKey MCP](https://github.com/Lionad-Morotar/port-key/tree/main/packages/mcp)：根据项目名找一个端口号，功能简单，包含 Stdio、Streamable HTTP Server 及 Resource。

## 工具

#### MCP Inspector

[MCP Inspector](https://github.com/modelcontextprotocol/inspector) 是用于测试和调试 MCP 服务器的开发者工具。

```bash
npx @modelcontextprotocol/inspector node build/index.js
```

## 授权与安全

#### MCP 授权机制基于 OAuth 2.1

MCP 的授权架构建立在 OAuth 2.1 和 RFC 9728（OAuth 2.0 Protected Resource Metadata）标准之上。
授权流程涉及四个核心角色：用户（User）、MCP 客户端（Client）、MCP 服务器（Resource Server）和授权服务器（Authorization Server）。
MCP 服务器通过 Token Introspection（RFC 7662）验证访问令牌的有效性，确保只有持有有效令牌且受众（audience）匹配的请求才能访问受保护资源。

#### MCP 服务器授权实现要点

TypeScript 实现使用 `@modelcontextprotocol/sdk/server/auth/router.js` 提供元数据端点，通过 `requireBearerAuth` 中间件保护 MCP 端点。
需要实现 `verifyAccessToken` 函数进行令牌验证，包括调用授权服务器的 introspection 端点、验证令牌激活状态和受众匹配。

见：[MCP Authorization Tutorial](https://modelcontextprotocol.io/docs/tutorials/security/authorization)

## Tool 设计模式

#### MCP Tool 设计的三维分类框架

每个 MCP Tool 都可以用三个维度来定位，从而确定适用的设计模式：

- **成熟度（Maturity）**：原子工具（单一操作）→ 编排工具（跨调用状态管理）
- **集成类型（Integration）**：API、数据库、文件系统、系统操作
- **访问模式（Access）**：同步、异步、流式、事件驱动

这三个维度的组合决定了工具需要哪些设计模式。例如，数据库工具需要幂等操作模式，因为 Agent 会在超时后重试。

#### Agent 优先的设计原则

"能工作"不等于"Agent 能用"。Tool 设计必须面向 LLM 优化：

- **描述清晰**：Tool 描述和参数名要便于 Agent 理解
- **参数强制转换（Parameter Coercion）**：接受 `"2024-01-15"`、`"January 15"`、`"yesterday"` 等多种格式，内部统一归一化
- **错误引导恢复**：不要只返回 429，而是告诉 Agent "速率受限，30 秒后重试或把批次大小减到 50"

#### 安全边界：Prompt 表达意图，代码强制执行规则

永远不要信任 Agent 来执行安全控制。授权和密钥必须通过服务端上下文传递（Context Injection 模式），绝不能经过 LLM。

#### Tool 组合原则

Tool 应该像 Unix 管道一样良好组合，而非像命令链一样互相依赖。这意味着：
- 一致的响应格式，便于一个 Tool 的输出作为另一个的输入
- 支持批处理，避免 Agent 逐个循环
- 提供多层次的抽象，让 Agent 根据任务选择合适的粒度

#### 54 个设计模式的 10 个分类

| 分类 | 核心问题 |
|------|----------|
| Tool Types | Query、Command 还是 Discovery？ |
| Tool Interface | Agent 如何理解和调用？ |
| Tool Discovery | Agent 如何找到合适的 Tool？ |
| Tool Composition | 是否应该捆绑多个操作？ |
| Tool Execution | 同步、异步还是事务性？ |
| Tool Response | 结果应该是什么样？ |
| Tool Context | 身份和状态如何管理？ |
| Tool Resilience | 如何从失败中恢复？ |
| Tool Security | 如何控制访问？ |
| Integration | 如何连接外部系统？ |

见：[54 Patterns for Building Better MCP Tools](https://www.arcade.dev/blog/mcp-tool-patterns)：Arcade 团队基于 8000+ 工具实践总结的设计模式

## WebMCP

#### WebMCP 是什么？

WebMCP 是 W3C Web Machine Learning 工作组的一个提案，由 Google 和 Microsoft 联合推动。
它允许网页通过 JavaScript API 向 AI Agent 注册客户端工具（Tools），让网页成为"在客户端实现工具的 MCP Server"。

与后端 MCP Server 不同，WebMCP 的工具在浏览器中执行，使 Agent 能够通过应用控制的 UI 与网页交互，
提供共享上下文给应用、Agent 和用户三方。

见：[WebMCP Proposal](https://github.com/webmachinelearning/webmcp)

#### WebMCP 的核心价值

- **复用现有业务逻辑**：企业无需重构产品来适配特定 Agent 的 API，可直接复用前端代码
- **人机协作（Human-in-the-loop）**：用户和 Agent 在同一界面协作，共享上下文
- **统一服务入口**：人类使用的 Web 界面和 Agent 访问的工具来自同一源头，避免服务碎片化
- **提升可访问性**：为辅助技术提供标准化的功能访问方式，超越传统无障碍树

#### WebMCP 与 MCP 的关系

| 维度 | MCP（后端集成） | WebMCP（客户端集成） |
|------|----------------|---------------------|
| 执行位置 | 服务器 | 浏览器 |
| 交互方式 | 直接 API 调用 | 通过应用控制的 UI |
| 用户参与 | 完全委托给 Agent | 人机协作 |
| 适用场景 | 完全自主的 Agent | 有人在环的本地浏览器工作流 |

WebMCP 不是 MCP 的替代品，而是互补方案。它特别适合需要用户参与的场景，如购物、创意设计、代码审查等。

#### WebMCP 的使用场景示例

- **创意设计**：用户在图形设计平台与 Agent 协作，Agent 帮助筛选模板、修改设计、批量生成变体
- **购物助手**：Agent 帮助筛选商品、比较选项，但用户保持最终决策权
- **代码审查**：Agent 通过专用工具获取构建状态、添加建议修改，用户审查后接受或拒绝

#### WebMCP 的目标与非目标

**目标**：
- 支持人机协作工作流
- 通过定义良好的 JavaScript 工具简化 Agent 集成
- 最小化开发者负担（复用现有代码）
- 改善可访问性

**非目标**：
- 无头浏览场景（Headless browsing）
- 完全自主的 Agent 工作流（更适合 A2A 协议）
- 取代后端集成（与 MCP 共存）

## Domain

* [Native API to MCP](/maps/_ai/mcp/native-api-to-mcp)：将现有 API 快速转换为 MCP Server 的指南
