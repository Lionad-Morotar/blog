---
title: Agentic Engineering
description: 超越 Vibe Coding 的 AI 辅助工程方法论
---

#### 是什么？

Agentic Engineering 指使用能够**生成并执行代码**的 coding agents（如 Claude Code、OpenAI Codex）来构建软件的工程实践。
核心特征是 agents 可以**独立测试和迭代代码**，无需人类逐轮指导。

与 **vibe coding**（原定义为"完全不关注代码"的编程方式，常用于非程序员使用 LLM 写代码的场景）形成对比，
Agentic Engineering 代表另一个极端：专业软件工程师利用 coding agents **放大现有专业知识**。

见：[Writing about Agentic Engineering Patterns](https://simonwillison.net/2026/Feb/23/agentic-engineering-patterns/)

#### Agentic Engineering Patterns 项目

Simon Willison 于 2026 年 2 月启动的开源文档项目，旨在系统性地收集和记录 Agentic Engineering 的**编码实践和模式**。

项目特点：
- 采用 **guide/chapter** 内容形式：guide 是可更新的章节集合，每个 chapter 类似博客文章但支持持续更新
- 灵感源自 1994 年的《Design Patterns》经典书籍格式
- 计划以每周 1-2 章的速度扩展

已发布章节：
- **"Writing code is cheap now"**：讨论初始代码成本趋近于零对个体和团队工作直觉的影响
- **"Red/green TDD"**：测试优先开发如何帮助 agents 编写更简洁可靠的代码

见：[Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/)

#### 核心实践？

**并行工作流**

同时运行 5-10 个 agents 处理不同模块，单日可合并 600+ commits。

**对话式迭代**

与 AI "讨论"而非直接下指令——先让它探索多种方案，理解后再决定方向。

**系统架构思维**

自己不写代码，但深度把控架构方向。关注产品感觉（taste）而非代码细节。

#### Red/green TDD 与 Coding Agents

在与 coding agent 协作时，"use red/green TDD" 是一句极其高效的 prompt。

**Red/green 的含义：**
- **Red**：先写测试，确认测试失败
- **Green**：实现代码，让测试通过

**为何适合 coding agents：**
- 防止写出无法工作的代码
- 避免构建不必要的功能
- 同步建立回归测试防护网

"red/green TDD" 已成为模型理解的简写——无需展开解释完整流程，
agent 会自动遵循"先写测试→确认失败→实现通过"的循环。

见：[Red/green TDD - Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/red-green-tdd/)

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
