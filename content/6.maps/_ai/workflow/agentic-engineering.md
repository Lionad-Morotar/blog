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

Linux kernel 维护者 Greg Kroah-Hartman 的实验显示，使用简单 prompt（"Give me this"）让 AI 分析代码后，AI 能输出 60 个问题及修复补丁：约 2/3 的补丁是正确的，
1/3 存在错误但仍能指向真实问题。

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

#### Vibe Coding 抬下限，Agentic Engineering 保上限

Karpathy 给两个术语划了清楚边界。Vibe Coding 抬高的是下限——更多人能用自然语言做出软件，不会写代码的人能做小工具，会写代码的人能更快做 side project，软件创造的入口变宽。
Agentic Engineering 保住的是上限——专业软件不能因为用了 AI 就引入安全漏洞、降低质量门槛或没人为生成的代码负责。

它不是某个具体工具，而是一种工程纪律：把 spiky entities（能力强但会犯错的 Agent）放进合适的流程里，让它们生成方案、写代码、跑测试、互相检查，让系统有边界、有验证、有回滚。Karpathy 的另一句判断是：
在 Agentic Engineering 里，熟练的人获得的加速倍数远不止 10x——真正的杠杆来自把多个 Agent、工具、测试和上下文有效组织起来。

见：[Karpathy 最新访谈：Vibe Coding 只是开始，真正重要的是 Agentic Engineering](https://baoyu.io/blog/andrej-karpathy-from-vibe-coding-to-agentic-engineering)

#### Agent 协作中规格属于人类，细节属于 Agent

Karpathy 用 MenuGen 的一个真实 bug 说明 Agent 的盲区。用户用 Google 账号登录，但购买 credits 时使用 Stripe；
Agent 实现购买逻辑时尝试用 Stripe 邮箱去匹配 Google 邮箱来归属用户。代码能跑、可能还过测试，但设计是错的——一个人完全可能用不同邮箱登录与付款，
正确做法是用系统内部稳定的 persistent user ID 绑定身份与资金。Agent 没有理解“身份-支付-资金归属”的工程风险。

由此 Karpathy 把人机分工落到具体边界：人必须负责 spec（顶层设计、约束条件、判断标准），Agent 填补实现细节。在更技术的层面也一致——
他不再记 PyTorch / NumPy / pandas 之间 `keepdims` vs `keepdim`、`dim` vs `axis`、`reshape` vs `permute` 这类碎片 API，把这些交给 Agent；
但他坚持理解张量、`view` 与 `storage` 的关系——什么时候只是改变同一块内存的视图、什么时候会复制数据。

> 细节可以外包，理解不能外包。API 名称可以忘，但概念结构不能丢。

见：[Karpathy 最新访谈：Vibe Coding 只是开始，真正重要的是 Agentic Engineering](https://baoyu.io/blog/andrej-karpathy-from-vibe-coding-to-agentic-engineering)

#### Code 贬值、Prose 升值：90/8/2 组成原则

PostHog Wizard 的工程师 Danilo Campos 公开过整个产品的「成分表」：

- **90%** Markdown 文件（文档与拟像应用）
- **8%** 用于交付与处理 Markdown 的工具
- **2%** Agent 框架代码

而这个产品每月被 15,000 用户使用，并在社交媒体收获主动好评。背后是一个 L3 价值判断：

> 整个职业生涯我们都因为「写代码」而获奖。但**今天写好的代码，明天新模型 drop 后价值不变（甚至下降）——代码一直是贬值资产**。**当你今天写出好的 Prose，明天更好的模型上线，那段 Prose 能被它解读出更多东西。**

这与「规格属于人类、细节属于 Agent」是同一个观察的另一面——人类写的 spec 是 Prose，会随模型升级而升值；Agent 生成的 implementation 是 Code，会随模型升级而被替代。
Agentic Engineering 的核心产物本质是文档 + 编排，不是控制流；优化哪些资产能跨模型代际累积，是 AI 时代工程价值积累的关键问题。

见：[The PostHog Wizard: Lessons in AI onboarding](https://www.youtube.com/watch?v=juoNbJiZUi0)

#### AI Native 公司的操作系统范式：闭环系统 vs 开环系统

Diana Hu（YC Partner）在 Startup School 中提出：AI 不应是公司"使用的工具"，而是公司"运行的操作系统"——所有工作流程、决策、流程都应流经一个不断学习和改进的智能层。

这一比喻借用控制系统理论的 **open loop（开环）** 与 **closed loop（闭环）** 概念：

- **开环系统**：没有反馈回路，信息流失，错误累积，改进依赖人工干预。传统公司基本以此方式运行——无数会议和决策产生，但知识和经验大部分随风而逝。
- **闭环系统**：自我调节，持续监控输出并调整流程以达成目标。每个重要行动都产生 **artifact（产物）**，公司中心的智能层从中学习并用于自我改进。

结果是公司始终拥有最新视图，知道实际发生了什么，而非依赖人工状态汇总。

见：[How To Build A Company With AI From The Ground Up](https://www.youtube.com/watch?v=EN7frwQIbKc)（Diana Hu, YC Startup School）

#### 可查询组织：让公司对所有 Agent 可读

要构建闭环系统，Diana Hu 要求让**整个公司变得 queryable（可查询）**。组织应对 AI 是 **legible（可读的）**：

- 用 AI 笔记工具记录会议，减少私信和邮件
- 在所有沟通渠道中嵌入 AI agent
- 为收入、销售、工程、招聘、运营等一切建立定制化仪表板

具体实践案例（工程 sprint 规划）：AI agent 访问 Linear tickets、Slack 工程频道、客户反馈、GitHub、Notion 高层计划、销售电话录音和站会记录，
综合分析上一 sprint 的实际交付与客户真实需求匹配度，进而提出更准确的未来 sprint 计划。

> 「已核实来源」Diana Hu 称自己管理过工程团队，现在在多个 YC 公司中看到这种做法。采用此方法的团队将 sprint 时间减半，完成工作量接近 10 倍。
> ⚠️ "10x"数据未标注实验条件、样本量和对照组，属于未经独立验证的声称。

核心原则：**为模型提供的上下文应和为员工提供的一样多**。当做到这一点时，公司不再是信息碎片化、需要人工解释的开环系统，而是状态、决策和结果被持续捕获并反馈到智能层的闭环系统。

见：[How To Build A Company With AI From The Ground Up](https://www.youtube.com/watch?v=EN7frwQIbKc)

#### AI Software Factory：规格与场景验证驱动开发

Diana Hu 提出的另一个范式是 **AI Software Factory**——TDD 的下一个演进：

- 人类编写规格和定义成功的测试
- AI agent 生成实现和代码
- Agent 迭代直到测试通过

**StrongDM** 的 AI 团队已将此推进到代码仓库**不包含任何手写代码**的程度——只有规格和测试工具。他们的系统使用基于场景的验证驱动 agent 编写测试并迭代代码，直到达到**概率满意度阈值**。

这实现了 Steve Yegge 所说的"千倍工程师"：让一个工程师被 AI agent 系统包围，构建以前需要整个团队或根本不可能实现的功能。

与 Agent-First 方法论的核心转变一致：工程师角色从"写代码"转向"定义问题、设计架构、编写测试"，代码本身成为可由 AI 大量生成的商品。

见：[How To Build A Company With AI From The Ground Up](https://www.youtube.com/watch?v=EN7frwQIbKc)
见：[StrongDM Software Factory](https://factory.strongdm.ai/)

#### 管理层级的消亡：智能层替代人类中间件

以 AI 循环、可查询组织和 Software Factory 构建公司的一个直接含义是：**经典管理层级不再有意义**。

传统世界里，中层管理者和协调者低效地在组织上下传递信息。在 AI Native 公司中，智能层承担了这个目的——公司速度只和信息流动速度一样快，每移除一层人类路由都是直接的速度提升。

Jack Dorsey 在 Block 的实践得出同样结论：保持相同的组织结构图和管理结构，就完全错过了这个转变。他提出未来公司将有三种员工原型，第一种是 **IC（Individual Contributor，建造者和操作者）**——
在 AI Native 公司中，不仅限于工程师，支持、销售等所有人都构建和操作，每个人都带着**可工作的原型而非 PPT** 来开会。

> 「作者主张」这是关于未来组织形态的预测性观点，而非已发生的事实。管理层级"消亡"的断言应视为 Diana Hu 和 Jack Dorsey 的价值判断，存在多种竞争性视角（如人类判断力在复杂决策中的不可替代性）。

见：[How To Build A Company With AI From The Ground Up](https://www.youtube.com/watch?v=EN7frwQIbKc)

