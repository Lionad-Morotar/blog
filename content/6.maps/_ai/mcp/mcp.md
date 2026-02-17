---
title: Model Context Protocol
description: MCP（Model Context Protocol）是 Anthropic 开源的标准协议，用于连接 AI 应用与外部系统，被誉为 AI 应用的 USB-C 接口。
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

## Domain

* [Native API to MCP](/maps/_ai/mcp/native-api-to-mcp)
