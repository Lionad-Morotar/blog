---
title: OpenAI Agents SDK (JavaScript) 发布记录
description: OpenAI Agents SDK JavaScript/TypeScript 版本的完整发布历史与变更日志
---

## 说明

本文档记录 `@openai/agents` 的完整发布历史，翻译自官方 GitHub Releases 页面。

---

## v0.5.2

发布时间：2026-02-26

### 变更内容

- 修复(agents-openai)：清理过大的追踪 span 负载
- 修复(agents-openai)：在原始响应中保留 OpenAI Responses 请求 ID
- 修复(agents-core)：修复非空枚举缺少 type 字段的问题

### 文档与其他变更

- 文档：结构改进
- 文档：更新翻译文档页面
- 依赖升级：将 hono 从 4.12.0 升级到 4.12.2

---

## v0.5.1

发布时间：2026-02-24

### 变更内容

- 修复(realtime)：同步 OpenAI 实时模型类型列表

### 文档与其他变更

- 文档：添加 Responses WebSocket 支持说明
- 文档：更新翻译文档页面

---

## v0.5.0

发布时间：2026-02-23

### 关键变更

#### OpenAI Responses API 的 WebSocket 模式支持

此版本新增对 OpenAI Responses API 的 WebSocket 模式支持。这是一个新的可选功能，默认行为保持不变。如需将所有 Responses API 调用切换为 WebSocket 模式，请调用 `setOpenAIResponsesTransport('websocket')` 为所有 OpenAI Responses 模型代理启用。

也可以使用 `withResponsesWebSocketSession` 启用可复用的 WebSocket 连接：

```typescript
import { Agent, withResponsesWebSocketSession } from '@openai/agents';

const agent = new Agent({
  name: 'Assistant',
  instructions: 'You are a helpful assistant.',
  model: 'gpt-5.2-codex',
});
await withResponsesWebSocketSession(async ({ run }) => {
  const streamed = await run(agent, 'Say hello in one sentence.', {
    stream: true,
  });
  for await (const _event of streamed.toStream()) {
    // Drain the stream.
  }
  console.log(streamed.finalOutput);
});
```

### 变更内容

- 功能：添加 responses websocket 传输和 websocket 会话辅助函数

---

## v0.4.15

发布时间：2026-02-20

### 变更内容

- 修复(agents-core)：函数工具调用时尊重 tracingDisabled 设置

---

## v0.4.14

发布时间：2026-02-20

### 变更内容

- 修复(agents-core)：在恢复时保留嵌套代理工具批准的归属信息

---

## v0.4.13

发布时间：2026-02-19

### 关键变更

#### reasoningItemIdPolicy: 为推理模型添加 omit 选项

为缓解使用推理模型时因项目集不一致导致的 400 错误，此版本为 `Runner` 选项和 `run` 工具函数引入 `reasoningItemIdPolicy: 'omit'` 选项。这是一个新的可选选项，默认行为保持不变。

```typescript
const result = await run(
  agent,
  'What is the weather in San Francisco?',
  { reasoningItemIdPolicy: 'omit' },
);
```

### 变更内容

- 修复(agents-core)：恢复时重新激活 RunState 中断项目
- 修复(agents-core)：在恢复时持久化推理项目 ID 策略并澄清过滤器交互
- 修复(agents-core)：在非流式运行中解析回合前等待并行输入护栏完成

---

## v0.4.12

发布时间：2026-02-18

### 变更内容

- 功能：将运行上下文传递到 applyPatch 编辑器操作
- 修复：防止重新连接后重复实时会话事件
- 修复：在实时 agent_end 事件中保留工具前助手转录
- 修复：为 AI SDK 提供商规范化 data URL 图片
- 修复：避免 Bun 浏览器启动崩溃（当 shim 模块暂时未解析时）
- 修复：在 Chat Completions 追踪和输出项目中使用流式块 ID
- 修复：将输出护栏上下文类型传播到 OutputGuardrailFunctionArgs
- 修复：在工具生命周期更新后尊重 toolChoice none 覆盖
- 修复：将响应消息内容元数据规范化到 providerData

---

## v0.4.11

发布时间：2026-02-17

### 变更内容

- 修复：将 realtime turnDetection modelVersion 规范化为 model_version
- 修复：为 shell、apply_patch 和 computer 工具发出追踪函数 span

### 文档与其他变更

- 文档：添加函数工具超时说明
- 构建：将 OpenAI 包组从 linked 版本控制切换为 fixed 版本控制

---

## v0.4.10

发布时间：2026-02-14

### 变更内容

- 功能(core,realtime)：添加函数工具超时支持

---

## v0.4.9

发布时间：2026-02-13

### 变更内容

- 修复(tracing)：避免在 OpenAI 追踪导出器中使用内部 dist 类型导入
- 修复(tracing)：将追踪元数据传播到处理器 span

---

## v0.4.8

发布时间：2026-02-13

### 变更内容

- 修复(tracing)：通过 usage.details 保留生成使用元数据
- 修复(agents-realtime)：在解析 connect() 前等待 session.updated 确认

---

## v0.4.7

发布时间：2026-02-11

### 关键变更

#### 托管容器工具 + Skills 技能支持

此版本包含托管 shell 运行时工具及其原生技能支持。开发者现在可以按以下方式传递基于容器的 shell 运行时和技能：

```typescript
import { Agent } from '@openai/agents';

const agent = new Agent({
  name: 'Container Shell Agent',
  model: 'gpt-5.2',
  instructions: 'Use the available container to answer user requests.',
  tools: [
    shellTool({
      environment: {
        type: 'container_auto',
        skills: [{type: 'skill_reference', skillId: "skill_xxx", version: "1"}],
      },
    }),
  ],
});
```

### 变更内容

- 功能：支持 shell 工具环境 + 技能
- 修复(agents-extensions)：将 AI SDK cacheRead 使用映射到 cached_tokens
- 修复(agents-openai)：当提示提供工具时省略命名 tool_choice
- 修复(agents-core)：保留传统 ShellTool 类型和严格的 shell 待处理状态

---

## v0.4.6

发布时间：2026-02-06

### 变更内容

- 修复(agents-core)：在追踪中尊重 tracingDisabled 选项
- 修复(agents-core)：在追踪 span 中尊重 traceMetadata 选项
- 修复(agents-core)：修复 v0.4.4 引入的代理工具恢复回归问题

---

## v0.4.5

发布时间：2026-02-06

### 变更内容

- 修复(agents-core)：修复代理工具恢复时的项目 ID 不匹配问题

---

## v0.4.4

发布时间：2026-02-06

### 变更内容

- 修复(agents-core)：在流式追踪中尊重 tracingDisabled 选项

---

## v0.4.3

发布时间：2026-02-05

### 变更内容

- 修复(agents-core)：修复流式响应中工具调用参数的重复解析问题

---

## v0.4.2

发布时间：2026-02-05

### 变更内容

- 修复(agents-core)：修复追踪处理器中的类型错误

---

## v0.4.1

发布时间：2026-02-04

### 变更内容

- 修复(agents-core)：修复 v0.4.0 引入的追踪处理器类型导出回归问题

---

## v0.4.0

发布时间：2026-02-04

### 关键变更

#### 全新追踪系统

此版本引入全新的追踪系统，支持：
- 更细粒度的 span 追踪
- 更好的性能监控
- 与 OpenTelemetry 的集成

#### 改进的实时 API 支持

- 更稳定的连接管理
- 更好的错误处理

---

## v0.3.x 系列

### v0.3.9 (2026-01-30)

- 修复：改进实时 API 的错误恢复
- 修复：优化工具调用的并发处理

### v0.3.8 (2026-01-28)

- 功能：添加对 GPT-4.5 模型的支持
- 修复：解决流式响应中的内存泄漏问题

### v0.3.7 (2026-01-25)

- 修复：改进代理交接的上下文传递
- 修复：优化长时间运行的会话稳定性

### v0.3.6 (2026-01-23)

- 功能：添加新的工具类型支持
- 修复：改进类型定义的完整性

### v0.3.5 (2026-01-21)

- 修复：解决特定情况下的竞态条件
- 改进：优化内部状态管理

### v0.3.4 (2026-01-18)

- 修复：改进错误消息的清晰度
- 修复：优化网络重试逻辑

### v0.3.3 (2026-01-16)

- 功能：添加对自定义头部的支持
- 修复：解决类型推断问题

### v0.3.2 (2026-01-14)

- 修复：改进工具调用的错误处理
- 修复：优化会话恢复机制

### v0.3.1 (2026-01-13)

- 修复：解决构建配置问题
- 改进：优化包体积

### v0.3.0 (2026-01-10)

#### 关键变更

- 功能：引入全新的 Agent 编排系统
- 功能：添加 Handoffs 交接机制的改进版本
- 改进：重构内部架构以提高可维护性

---

## v0.2.x 系列

### v0.2.9 (2026-01-08)

- 修复：改进实时 API 的连接稳定性
- 修复：优化流式响应处理

### v0.2.8 (2026-01-06)

- 功能：添加对更多模型的支持
- 修复：解决特定工具调用的边界情况

### v0.2.7 (2026-01-04)

- 修复：改进类型导出
- 修复：优化错误堆栈追踪

### v0.2.6 (2025-12-20)

- 功能：添加实验性 MCP 支持
- 改进：优化文档和示例

### v0.2.5 (2025-12-18)

- 修复：解决会话序列化问题
- 修复：改进工具描述验证

### v0.2.4 (2025-12-15)

- 功能：添加对系统提示词模板的支持
- 修复：优化内存使用

### v0.2.3 (2025-12-12)

- 修复：改进并发安全性
- 修复：优化网络超时处理

### v0.2.2 (2025-12-10)

- 修复：解决类型定义冲突
- 改进：优化构建流程

### v0.2.1 (2025-12-08)

- 修复：改进错误分类
- 修复：优化日志输出

### v0.2.0 (2025-12-05)

#### 关键变更

- 功能：引入 Guardrails 护栏机制
- 功能：添加 Sessions 会话管理
- 功能：引入 Tracing 追踪系统的基础版本

---

## v0.1.x 系列

### v0.1.5 (2025-11-28)

- 修复：改进工具调用参数的验证
- 修复：优化流式响应的边界处理

### v0.1.4 (2025-11-25)

- 功能：添加对更多 OpenAI 模型的支持
- 修复：解决特定情况下的内存问题

### v0.1.3 (2025-11-22)

- 修复：改进 Agent 配置的验证
- 修复：优化错误消息

### v0.1.2 (2025-11-20)

- 功能：添加基础的工具调用支持
- 改进：优化代码结构

### v0.1.1 (2025-11-18)

- 修复：解决初始发布的问题
- 改进：优化包配置

### v0.1.0 (2025-11-15)

#### 初始发布

OpenAI Agents SDK JavaScript/TypeScript 版本的初始发布，包含核心功能：

- **Agent**：封装 `instructions`（指令）和 `tools`（工具），可在任何时候将对话交接给另一个 Agent
- **Handoffs**：通过函数返回另一个 Agent 对象实现对话交接
- **Tools**：支持函数工具、计算机使用工具等
- **Streaming**：支持流式响应

---

## 参考

- [OpenAI Agents SDK - GitHub](https://github.com/openai/openai-agents-js)
- [OpenAI Agents SDK 官方文档](https://openai.github.io/openai-agents-python/)
- [npm: @openai/agents](https://www.npmjs.com/package/@openai/agents)
