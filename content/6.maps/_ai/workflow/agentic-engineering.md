---
title: Agentic Engineering
description: 超越 Vibe Coding 的 AI 辅助工程方法论
---

#### 是什么？

Agentic Engineering 是由 Peter Steinberger 提出的 AI 辅助开发方法论，区分于随意的 "vibe coding"（碰运气式编码）。核心特征是有意识、架构驱动的 AI 协作。

#### 核心实践？

**并行工作流**

同时运行 5-10 个 agents 处理不同模块，单日可合并 600+ commits。

**对话式迭代**

与 AI "讨论"而非直接下指令——先让它探索多种方案，理解后再决定方向。

**系统架构思维**

自己不写代码，但深度把控架构方向。关注产品感觉（taste）而非代码细节。

#### Closing the Loop

AI 擅长编码而不擅长写作的原因是：**代码可以被验证**（编译、运行测试、检查输出）。

设计"可验证的架构"：
- 让 AI 能自我测试、自我调试
- 本地运行测试比 CI 更快（10 分钟 → 几分钟）
- 代码结构要便于验证

> "写更少代码反而让你成为更好的架构师，因为你必须设计易于验证的系统。"

#### 从 PR 到 Prompt Request

Peter 将 GitHub PR 重新定义为 "Prompt Request"：
- 几乎不阅读 PR 中的代码
- 更关注 **prompt** 本身——"你是怎么让 AI 做到这个的？"
- 常用 workflow：看到 PR → 用 Codex 重新实现（融入自己的架构 vision）→ 合并

**重要的不是代码是什么，而是如何得到这段代码的思考过程。**

#### 为什么 CLI > MCP

Peter 对 MCP（Model Context Protocol）持怀疑态度：

| 维度 | MCP | CLI |
|------|-----|-----|
| 上下文 | 预加载所有函数定义，污染上下文 | 按需调用，精确控制 |
| 链式调用 | 无法链式组合 | 可用管道（\|）灵活组合 |
| 过滤 | 返回所有字段，模型必须消化全部 | 可用 `jq` 精确过滤所需字段 |

> "MCP 是临时拐杖。模型非常擅长使用 bash。"

#### 给新人的建议

- **无限好奇心**：不懂就问 AI，它是无限耐心的老师
- **动手建造**：通过建造获得经验，而非只写代码
- **玩这个游戏**：把学习 AI 辅助开发当作乐器或游戏，越练越上瘾

见：[The Pragmatic Engineer Podcast - Peter Steinberger Interview](https://podcasts.apple.com/us/podcast/the-pragmatic-engineer/id1457313865)
