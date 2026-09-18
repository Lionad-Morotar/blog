---
title: Model Context Protocol
description: MCP（Model Context Protocol）是 Anthropic 开源的标准协议，用于连接 AI 应用与外部系统，被誉为 AI 应用的 USB-C 接口。
original_path: _ai/mcp.md
---

#### MCP 是什么？

MCP 是 Model Context Protocol（模型上下文协议）的缩写，由 Anthropic 开源的一种标准协议，用于连接 AI 应用与外部系统。它就像 AI 应用的 USB-C 接口——
USB-C 为电子设备提供了标准化的连接方式，而 MCP 为 AI 应用提供了标准化的方式来连接外部数据源、工具和工作流。

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

#### MCP 的 Host-Client-Server 架构

MCP 采用 host-client-server 三层架构。host 是容器与协调者，负责创建多个 client 实例、控制权限与生命周期、执行安全策略、协调 LLM 集成并聚合上下文。
每个 client 与某个 server 维持一个有状态的 1:1 会话，处理协议协商、消息路由和订阅通知。server 暴露资源、工具和提示，可以是本地进程或远程服务。
多 server 能力并非来自单个 client 连接多个 server，而是来自 host 创建多个 client 分别连接不同 server，再由 host 聚合结果。server 之间保持隔离，不能读取完整对话，
也不能窥探其他 server。

见：[MCP Architecture](https://modelcontextprotocol.io/specification/2025-03-26/architecture)

#### MCP 的能力原语全景

server 侧暴露的能力按「谁控制」三分：Tools（模型控制，可执行动作）、Resources（应用控制，URI 寻址的只读上下文）、
Prompts（用户控制，模板，通常映射为斜杠命令）。client 侧有反向原语：Sampling（server 请宿主的 LLM 生成内容）、
Elicitation（server 向用户要结构化输入）、Roots（声明工作区边界）、Logging。MCP 是双向的：server 不是被动工具仓库，
它能向 client 反向发请求，这正是它与「带 schema 的 function calling」的本质区别（其中 Roots/Sampling/Logging 已于
2026 修订进入废弃窗口期，见下一节）。

见：[MCP Architecture](https://modelcontextprotocol.io/specification/2025-06-18/architecture)

#### MCP 与 Function Calling 是串联关系

两者不在同一层、不构成竞争：Function Calling 是模型推理层能力，决定「调什么工具、传什么参数」；MCP 是应用层协议，
解决「工具怎么被发现、描述、连接、调用」。执行链路是串联的：Agent 执行任务，模型经 FC 输出调用意图，宿主按意图
经 MCP 路由到对应 server，server 执行并返回。「要不要从 FC 换成 MCP」是范畴错误，两者共存。MCP 属于过度工程的
场景：工具只给单一应用内部用（直接函数调用）、高频低延迟（JSON-RPC 序列化开销比本地调用高一到两个数量级）、
工具逻辑与内部状态高度耦合（抽独立 server 反而带来状态同步复杂度）。MCP 真正发光是工具被多个 AI 应用复用、
或需要统一管理工具生命周期（版本、权限、日志集中在 server 侧）时。

见：[MCP Server 工程避坑指南](https://juejin.cn/post/7642329168471293992)：文末「MCP 的边界在哪里」讨论

#### 传输层两种形态与信任边界

stdio 以本地子进程承载逐行 JSON-RPC；Streamable HTTP 用于远程，POST 为主、响应可选 SSE 流
（旧的 HTTP+SSE 双端点方案自 2025-03 起废弃）。两种形态的信任不对称是安全判断的钥匙：本地 stdio server
等同任意代码执行，信任边界就在点「安装」那一刻；远程 MCP server 在 OAuth 2.1 里定位为 Resource Server，
令牌用 RFC 8707 resource indicators 绑定 audience，禁止宿主凭证透传。

见：[MCP Transports](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports)

#### 2026-07-28 修订让协议整体无状态化

MCP 自发布以来最大的一次修订，2026 年之前绝大多数教程描述的「有状态 1:1 会话 + initialize 握手」模型被推翻：
`initialize`/`notifications/initialized` 握手、`Mcp-Session-Id` 头、`ping`、`logging/setLevel` 全部移除，
协议版本与 client 能力改为内嵌在每个请求的 `_meta`（`io.modelcontextprotocol/protocolVersion`、`clientCapabilities`），
server MUST 实现 `server/discover` 用于公告版本与能力（SEP-2575/2567）。
server-initiated 请求（sampling、elicitation）改为 MRTR（Multi Round-Trip Requests）：server 返回
`resultType: "input_required"` + `inputRequests`，client 用重试原请求并携带 `inputResponses` 的方式补信息。
Roots、Sampling、Logging 整体进入废弃窗口期（最短 12 个月）；SSE 断线重投递（Last-Event-ID）移除，断流后须重发请求。
根因是部署经济学：有状态模型要求 session 粘滞与长连接，MCP server 无法放到普通负载均衡或 serverless 之后，
网关化部署诉求推动协议无状态化。另外协议修订用日期而非 semver 标识（2024-11-05 → 2026-07-28），与 SDK 版本号解耦。

见：[MCP 2026-07-28 Changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog)

## Tour

## Examples

* [ESLint MCP](https://github.com/eslint/rewrite/blob/main/packages/mcp/src/mcp-server.js)：ESLint MCP Server，Server 端直接调用 `eslint ...` 来修复代码。
* [PortKey MCP](https://github.com/Lionad-Morotar/port-key/tree/main/packages/mcp)：根据项目名找一个端口号，功能简单，包含 Stdio、Streamable HTTP Server 及 Resource。
* [Agent Reach](https://github.com/Panniantong/Agent-Reach)：为 AI Agent 提供互联网访问能力的 MCP 工具脚手架，支持 Twitter、Reddit、YouTube、Bilibili、小红书等平台读取和搜索，零 API 费用

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

#### 局域网部署的安全边界

MCP 的 Streamable HTTP 传输规范明确要求 server 验证 `Origin` 头、本地运行时绑定 `127.0.0.1` 而非 `0.0.0.0`，并对所有连接实施认证，以防止 DNS rebinding 等攻击。
当把 MCP server 部署到局域网供其他机器访问时，不能依赖“内网可信”假设，而应通过 mTLS、Bearer Token、OAuth 2.0 或防火墙规则进行保护。A2A 的本地发现协议 LAD-A2A 也采用同样前提，
要求 HTTPS、签名 Agent Card 和用户显式同意。

见：[MCP Transports](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports)、[A2A Agent Discovery](https://a2a-protocol.org/latest/topics/agent-discovery/)、[LAD-A2A Specification](https://lad-a2a.org/spec/)

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

#### Tool 定义是上下文的预扣税

接入 MCP server 的成本在用户开口前就全额支付：client 把所有已连接 server 的 `tools/list` schema 序列化进 system
prompt，20 个 server × 30 个工具即可预扣数万 token，且工具精度随数量衰减（不只是钱的问题）。工程推论：工具描述
50 字内、参数字段 ≤5，细节挪去 resource；超大工具集靠宿主动态启停或 Anthropic 提出的 code execution 模式
（模型写代码编排工具，中间结果不进上下文）。最隐蔽的耦合是工具列表顺序不稳定会击穿 prompt cache——工具定义在
system prompt 前部，顺序一变整段缓存失效，每轮多付一截输入价。官方 2026-07-28 修订补上了这一坑：`tools/list`
SHOULD 返回确定性顺序，并经 `CacheableResult` 新增 `ttlMs`/`cacheScope` 缓存契约。

见：[MCP Server 工程避坑指南](https://juejin.cn/post/7642329168471293992)：5 个线上 MCP Server 的 8 个生产级陷阱复盘

#### 两类错误：isError 给模型看，JSON-RPC error 给 client 看

工具执行失败（SQL 报错、API 超时）必须包在正常 result 的 content 里并置 `isError: true`；只有「工具不存在」
「server 不支持调用」这类协议级异常才返回 JSON-RPC error。两种错误的消费者不同：协议层错误被 client 拦截处理，
永远进不了模型视野，LLM 不知道调用失败过，于是不自我纠正而是停下来或编造结果。反过来把协议错误伪装成 isError
会让 client 的重试/鉴权逻辑失去触发信号。症状识别：agent 用某个 server 后行为变傻但 transcript 里看不到任何
报错，先查 server 是否把异常 throw 成了协议错误。

见：[MCP schema.ts](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/schema/2025-11-25/schema.ts) 中 `CallToolResult.isError` 的规范注释

#### stdio 模式下 stdout 就是协议管道

stdio 传输用 stdout 逐行承载 JSON-RPC，任何一行杂散输出都会污染协议流，日志必须走 stderr。但真正的事故来源通常
不是自己的 print，而是第三方库的意外 stdout 输出（初始化 banner、进度条、deprecation warning）。最阴险的是
「我机器上没事」效应：宽容的 client 跳过非 JSON 行继续工作，严格的 client 则表现为工具调用后永久挂起且无错误——
解析器没把它当错误，只是在等一个永远不来的合法响应。工程解法不是 code review 而是在入口劫持 sys.stdout 装
guard：只放行以 `{"` 开头的行，其余重定向 stderr 并告警，把协议完整性从开发纪律变成运行时断言。

见：[MCP Server 工程避坑指南](https://juejin.cn/post/7642329168471293992)

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

#### MCP Gateway 与多 Server 聚合

Microsoft 开源的 MCP Gateway 是一个反向代理与管理层，用于在 Kubernetes 等环境中聚合多个 MCP server。它提供 adapter 注册、tool 动态路由、基于 `session_id` 的会话保持、
Bearer/RBAC 认证授权，以及可选的 agent/session 管理。对局域网场景而言，如果一台机器上运行了多个 MCP server，可以通过网关暴露统一入口，本地 Claude Code 只需配置一个 server 连接，
网关内部按 tool 名称分发请求。这种方案适合 server 数量多、需要统一认证或审计的场景；两台电脑的简单场景直接配置多个独立 server 即可。

见：[Microsoft MCP Gateway](https://github.com/microsoft/mcp-gateway)

## Domain

* [Native API to MCP](/maps/_ai/mcp/native-api-to-mcp)：将现有 API 快速转换为 MCP Server 的指南

