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

Python 实现使用 FastMCP 框架简化授权集成，通过 `AuthSettings` 配置授权服务器元数据，令牌验证委托给 `IntrospectionTokenVerifier` 类。

C# 实现利用 ASP.NET Core 的 JWT Bearer 认证中间件，使用 `AddMcp` 配置 Protected Resource Metadata，通过 `AudienceValidator` 自定义受众验证逻辑。

见：[MCP Authorization Tutorial](https://modelcontextprotocol.io/docs/tutorials/security/authorization)

## Domain

* [Native API to MCP](/maps/_ai/mcp/native-api-to-mcp)
* [WebMCP](https://github.com/webmachinelearning/webmcp) - W3C 提案，允许网页向 AI 代理注册客户端工具（Google & Microsoft 联合推动）
