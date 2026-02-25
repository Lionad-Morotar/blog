---
title: A2UI
description: Google 推出的声明式 UI 协议，让 AI Agent 能生成富交互界面
original_path: _ai/agents/a2ui.md
---

#### A2UI 是什么？

Google 推出的声明式 UI 协议，让 AI Agent 能生成富交互界面。Agent 输出 JSON 描述界面结构，客户端用原生组件渲染，无需执行任意代码，兼顾安全性与原生体验。

见：[What is A2UI?](https://a2ui.org/introduction/what-is-a2ui/)

#### 为什么需要 A2UI？

纯文本交互效率低。比如订餐厅需要多轮问答，而 A2UI 让 Agent 直接生成表单（日期选择器、时间选择器、提交按钮），用户一步完成操作。

#### 核心技术原理？

* **声明式 JSON**：Agent 发送 `surfaceUpdate`、`dataModelUpdate` 等消息描述 UI
* **客户端渲染**：用 Angular、Flutter、React 等原生框架渲染，继承应用样式
* **跨平台**：同一套 JSON 可在 Web、移动端、桌面端渲染

#### 与相关协议的关系？

* **A2A**：Agent 间通信协议（Agent to Agent），A2UI 可通过 A2A 通道传输
* **MCP**：连接 Agent 与外部工具/数据
* **AG-UI**：另一个 Agent UI 协议，与 A2UI 竞争

见：[A2A vs MCP vs AG-UI](https://dev.to/czmilo/a2a-vs-mcp-vs-ag-ui-1a03)、[Introducing A2UI](https://developers.googleblog.com/introducing-a2ui-an-open-project-for-agent-driven-interfaces/)

#### 设计原则？

1. **LLM 友好**：扁平组件列表，带 ID 引用，便于流式生成和纠错
2. **框架无关**：Agent 发送抽象组件树，客户端映射到原生控件
3. **关注点分离**：UI 结构、应用状态、渲染层分离，支持数据绑定

#### 核心概念？

* **Surface**：组件画布（对话框、侧边栏、主视图）
* **Component**：UI 元素（按钮、文本框、卡片等）
* **Data Model**：应用状态，组件绑定到它
* **Catalog**：可用的组件类型集合
* **Message**：JSON 对象（surfaceUpdate、dataModelUpdate、beginRendering 等）

#### A2UI 不是什么？

* 不是框架（是协议）
* 不是 HTML 的替代品（用于 Agent 生成 UI，而非静态站点）
* 不是成熟的样式系统（客户端控制样式，服务端样式支持有限）
* 不限于 Web（也支持移动端和桌面端）
