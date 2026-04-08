---
title: Agentic Engineering
description: 超越 Vibe Coding 的 AI 辅助工程方法论
original_path: _ai/workflow/agentic-engineering.md
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

#### AI 生成补丁的有效率与人机协作模式

Linux kernel 维护者 Greg Kroah-Hartman 的实验显示，使用简单 prompt（"Give me this"）让 AI 分析代码后，AI 能输出 60 个问题及修复补丁：约 2/3 的补丁是正确的，1/3 存在错误但仍能指向真实问题。

关键洞察：即使正确的补丁也需要人工清理——更好的 changelog、集成工作和人类判断。但 AI 已经从"完全无用"跃升到"可作为有效起点"。

这种人机协作模式的核心：**AI 生成初稿，人类精修**。它不替代维护者，而是显著提升维护者处理简单错误条件的吞吐量。

见：[Linux kernel czar says AI bug reports aren't slop anymore - The Register](https://www.theregister.com/2026/03/26/greg_kroahhartman_ai_kernel/)

#### Agent-First 工程方法论

OpenAI 团队在 5 个月内用**0 行手写代码**构建了一个内部产品，所有代码（应用逻辑、测试、CI 配置、文档、可观测性工具）均由 Codex 生成。核心原则是"**人类掌舵，Agents 执行**"。

团队从 3 名工程师扩展到 7 名，累计提交约 1500 个 PR，平均每人每天 3.5 个 PR，且吞吐量随团队规模增长而提升。产品已有数百名内部用户，包括日常重度使用者。

关键转变是工程师角色从"写代码"转向"**设计环境、明确意图、构建反馈循环**"，让 Codex agents 能可靠地完成工作。

见：[Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)

#### 知识的渐进式披露原则

OpenAI 团队发现将大量指令塞入 `AGENTS.md` 会产生反效果：
- **上下文是稀缺资源** - 巨大的指令文件会挤占任务、代码和文档的空间
- **过度指导等于无指导** - 当一切都"重要"，agents 会局部模式匹配而非全局导航
- **文档快速腐烂** - 单体手册变成陈旧规则的坟场，难以验证和维护

解决方案是将 `AGENTS.md` 视为**目录而非百科全书**（约 100 行），真正的知识库存储在结构化的 `docs/` 目录中，作为系统的真实数据源。

这实现了**渐进式披露**：agents 从小型稳定的入口点开始，学习下一步去哪里查找，而非一开始就被淹没。

见：[Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)

#### 架构约束优于实现细节

在 agent-first 环境中，架构规则通过**机械执行的不变量**来保证一致性，而非微管理实现。

OpenAI 采用刚性架构模型：
- 每个业务域分为固定层次（Types → Config → Repo → Service → Runtime → UI）
- 依赖方向严格验证，跨域关注点（认证、连接器、遥测）通过单一接口进入
- 使用自定义 linter 和结构化测试强制执行

这类架构通常在数百名工程师规模时才引入，但在 coding agents 环境中是**早期前提条件** - 约束是速度无衰减或架构腐化的保障。

错误信息也设计为将**补救指令注入 agent 上下文**，人类品味通过审查评论、重构 PR 和 bug 报告持续反馈到系统中。

见：[Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)

#### 自动化品味编码

完全自主的 agents 会复制仓库中的现有模式，即使是次优模式，导致熵增。

OpenAI 初期每周五花 20% 时间清理"AI 垃圾"，但这不可扩展。解决方案是：
1. 将"**黄金原则**"（如优先共享工具包而非手写 helpers、验证边界而非 YOLO 式探测）编码到仓库
2. 建立定期清理流程 - 后台 Codex 任务扫描偏差、更新质量等级、开立重构 PR
3. 大多数重构 PR 可在 1 分钟内审查并自动合并

这类似**垃圾回收**：技术债务像高息贷款，持续小额偿还有助于避免复利累积。人类品味一次性捕获，然后在每行代码上持续执行。

见：[Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)
