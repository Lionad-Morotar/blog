---
title: Agent 架构第一性原理
description: Agent 架构设计的核心原则、工作流模式、工具设计与最佳实践
---

## LLM 是神经符号主义的极佳实践？

神经符号人工智能（Neuro-Symbolic AI）旨在融合神经网络的学习能力与符号 AI 的推理能力。这与认知科学的双过程理论高度契合：系统1（快速、直觉、无意识）对应神经网络，系统2（缓慢、深思熟虑、有意识）对应符号推理。

LLM 智能体通过 Chain-of-Thought 实现了这一融合——神经网络内核提供亚符号的模式识别（系统1），而生成的结构化推理文本又实现了符号主义的逻辑能力（系统2）。LLM 充当了符号空间与自然语言空间之间的桥梁，使 AI 系统既能从海量数据中学习，又能进行严谨的符号推理。

三种神经符号融合范式：
- **Symbolic→LLM**：符号方法生成推理数据，LLM 学习模仿（如 AlphaGeometry、LOGIPT）
- **LLM→Symbolic**：LLM 将问题形式化后调用符号求解器（如 LogicLM、LLM+P、PAL）
- **LLM+Symbolic**：端到端混合架构，符号与神经网络协同工作（如 DeepProbLog、可微分符号模块）

见：[神经符号人工智能：迈向提升大语言模型的推理能力](https://www.163.com/dy/article/KDRD9CE705567BBF.html)、[大型语言模型：符号推理的新趋势](https://zhuanlan.zhihu.com/p/678549814)

## PEAS 模型如何描述智能体任务环境？

PEAS 模型是人工智能领域用于精确描述智能体任务环境的经典框架，由四个维度构成：

| 维度 | 含义 | 示例（智能旅行助手） |
|------|------|---------------------|
| **P**erformance（性能度量） | 评估智能体成功与否的标准 | 用户满意度、行程可行性、预算控制 |
| **E**nvironment（环境） | 智能体运作的场景与条件 | 航班系统、酒店平台、天气服务 |
| **A**ctuators（执行器） | 智能体影响环境的方式 | 搜索航班、预订酒店、生成行程 |
| **S**ensors（传感器） | 智能体获取环境信息的渠道 | 用户输入、API 返回数据 |

LLM 智能体面对的环境通常具备四个鲜明特点：
- **部分可观察**（Partially Observable）：无法一次性获取全貌，需要记忆和探索
- **随机性**（Stochastic）：行动结果不确定，环境状态动态变化
- **多智能体**（Multi-agent）：环境中存在其他行动者（如其他用户、自动化脚本）
- **序贯且动态**（Sequential & Dynamic）：当前动作影响未来，环境自身在变化

见：[智能体(Agent)核心技术解析：从PEAS模型到主流框架实战](https://zhuanlan.zhihu.com/p/1982412289576546663)、[一文搞懂大模型智能体工作原理](https://blog.csdn.net/Trb701012/article/details/156984467)

#### 完整案例分析

[智能健身教练：PEAS 模型完整案例分析](/maps/_ai/agents/peas-coach-example)

## 工作流与智能体的核心区别？

决策权归属是区分二者的关键。

**工作流（Workflow）** 像流水线或菜谱，任务流程固定且预先设计好。LLM 被代码调用完成特定子任务（如总结文本、提取信息），决策权在代码而非模型。

**智能体（Agent）** 像侦探，你给它总目标，但没有固定剧本。它会根据情况动态决定下一步该做什么、使用哪个工具、任务是否完成，决策权在 LLM 而非代码。

#### 完整案例分析

[Workflow 与 Agent 对比：电商退款案例](/maps/_ai/agents/workflow-vs-agent) —— 通过售后退款场景对比两种方案优劣及混合架构设计

## 技术选型金字塔？

Anthropic 建议始终从最简单方案开始，只有当简单方案无法满足需求时才增加复杂性。

| 层级 | 方案 | 适用场景 |
|------|------|----------|
| 底层（基础） | 优化单一 LLM 调用 | 简单任务，追求效率。通过 RAG、Few-shot 示例解决大部分问题 |
| 中层（中级） | 工作流 | 流程固定、明确、可预测，对质量有高标准 |
| 顶层（高级） | 智能体 | 开放式任务，无法预测步骤，需要模型大规模自主决策 |

**示例**：翻译 / 本地化任务
- 读一封外文邮件/工单，快速了解大意即可 → 单一 LLM 调用
- 需要稳定产出与可追溯质量（术语一致、格式固定、必须复核），如用户手册/合规文档翻译 → 工作流（翻译 → 术语校验 → 审校/回译）
- 目标是"把内容做成一条可发布的多语言产线"，涉及选题、改写、本地化用词、生成标题与摘要、更新站点/提交 PR 等多步决策与多工具协作 → 智能体

见：[Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)（Anthropic 官方指南）

## 五种工作流模式？

Anthropic 从生产实践中总结出五种可组合的工作流模式，按复杂度递增：

**Prompt Chaining（提示链）**
任务分解为顺序步骤，每步 LLM 处理上一步输出。可添加程序检查（gate）确保过程正确。
- 适用：可清晰分解为固定子任务，用延迟换准确性
- 示例：生成营销文案 → 翻译成其他语言；写大纲 → 检查 → 写文档

**Routing（路由）**
输入分类后路由到专门下游任务，分离关注点，构建更专业的提示。
- 适用：复杂任务有明确类别，分类可由 LLM 或传统模型处理
- 示例：客服查询按类型（一般问题/退款/技术支持）路由到不同流程

**Parallelization（并行化）**
- **Sectioning（分段）**：任务拆分为独立子任务并行处理
- **Voting（投票）**：同一任务多次运行，聚合多样输出
- 适用：可并行提速，或需多视角/多次尝试提高置信度
- 示例：代码漏洞审查（多提示并行审查）、内容安全评估

**Orchestrator-workers（编排器-工作者）**
中心 LLM 动态分解任务，委派给工作 LLM，再综合结果。与并行的关键区别：子任务不是预定义的，而是由编排器根据输入动态决定。
- 适用：复杂任务无法预测子任务（如编码需修改的文件数量和性质取决于任务）
- 示例：多文件复杂代码修改、多源信息搜集分析

**Evaluator-optimizer（评估-优化）**
一个 LLM 生成响应，另一个提供评估反馈，循环迭代。
- 适用：你能清楚定义"好/坏"的标准，而且多改几轮确实会变更好。通常有两个信号：人工点评能明显改善结果；模型也能按同一套标准给出可用的点评
- 示例：文学翻译（捕捉细微差别）、复杂搜索任务（多轮搜索分析）

## Agent 设计三原则？

1. **简洁性** —— 保持设计简单
2. **透明性** —— 显式展示规划步骤
3. **ACI（Agent-Computer Interface）** —— 精心设计的工具文档和测试

## 工具设计的最佳实践？

设计工具时，投入与 HCI（人机界面）相当的努力到 ACI（Agent-Computer Interface）：

**格式选择原则**
- 给模型足够 token 在"陷入困境"前思考
- 格式贴近模型在互联网上自然见过的形式
- 避免格式开销（如 diff 需计算行数、JSON 需转义引号）

**设计检查清单**
- 站在模型角度：工具描述和参数是否一目了然？好的工具定义包含示例用法、边界情况、输入格式要求
- 优化参数命名和描述：像为团队初级开发者写优秀 docstring
- 测试迭代：在 workbench 中运行大量示例输入，观察模型错误并迭代
- Poka-yoke（防错）：调整参数使错误更难发生

**Anthropic 实战经验**

在构建 SWE-bench Agent 时，优化工具的时间超过优化提示。例如：发现模型在使用相对路径的工具上出错（Agent 已移出根目录后），改为要求绝对路径后，模型 flawlessly 使用该方法。

## 长时运行 Agent 的 Harness 设计？

当 Agent 需要跨多个上下文窗口工作（数小时甚至数天）时，核心挑战是**每个新会话都从零开始**，对之前工作一无所知。Anthropic 采用 **Initializer Agent + Coding Agent** 的双代理架构解决此问题。

**Initializer Agent（初始化代理）**

首次会话运行，负责搭建基础环境：
- `feature_list.json`：详细功能清单（如 claude.ai 克隆项目超过 200 个功能），全部初始标记为 `failing`
- `claude-progress.txt`：进度日志，记录每个会话完成的工作
- `init.sh`：启动脚本，一键运行开发服务器
- 初始 git commit，建立版本基线

**Coding Agent（编码代理）**

后续所有会话运行，遵循增量开发原则：
- 会话开始时：读取进度文件和 git log → 运行 `init.sh` 启动服务 → 端到端测试验证基础功能
- 每次只处理**一个功能**，避免"一次性做完"的冲动
- 会话结束时：提交 git commit（描述性消息）→ 更新进度文件 → 保持环境在"可合并状态"

**功能清单的设计要点**

使用 JSON 而非 Markdown，因为模型更不容易误改 JSON 结构。每个功能包含 `category`、`description`、`steps`、`passes` 字段。Coding Agent 只能修改 `passes` 字段，强烈措辞约束："删除或编辑测试是不可接受的，这会导致功能缺失或 bug"。

**端到端测试的必要性**

Agent 容易"未经充分测试就标记功能完成"。显式提示使用浏览器自动化工具（如 Puppeteer MCP），像人类用户一样测试。这能发现仅从代码看不出的 bug，但注意 Claude 无法看到浏览器原生 alert 弹窗。

| 常见失败模式 | Initializer 解决方案 | Coding Agent 解决方案 |
|-------------|---------------------|----------------------|
| 过早宣布整个项目完成 | 设置详细功能清单 | 每次只选一个功能开发 |
| 留下 bug 或未记录的进度 | 初始化 git 和进度文件 | 开始读进度/git log，结束写 commit |
| 过早标记功能完成 | 设置功能清单文件 | 自验证所有功能，仔细测试后才标记 passing |
| 花时间摸索如何运行应用 | 编写 `init.sh` 脚本 | 会话开始就读 `init.sh` |

见：[Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)（Anthropic Engineering）

## Claude Agent SDK 的核心设计原则？

Claude Agent SDK（原 Claude Code SDK）的设计哲学是**给 Claude 一台计算机**——让它能够使用程序员日常使用的工具（终端、文件系统、代码执行），从而像人类一样工作。

这不仅让 Claude 擅长编码，还能处理各种非编码任务：读取 CSV、搜索网页、构建可视化、解释指标等。核心反馈循环是：**收集上下文 → 采取行动 → 验证工作 → 重复**。

> Over the past several months, Claude Code has become far more than a coding tool. At Anthropic, we've been using it for deep research, video creation, and note-taking, among countless other non-coding applications. In fact, it has begun to power almost all of our major agent loops.
> —— Anthropic

## Agent 如何有效收集上下文？

**Agentic Search（代理式搜索）**
文件系统代表"可能被拉入上下文"的信息。Agent 使用 `grep`、`tail` 等 bash 脚本自主决定如何加载大文件（如日志）。文件夹结构本身成为一种上下文工程。

**Semantic Search（语义搜索）**
通常比代理式搜索更快，但准确性较低、维护更困难、透明度更低。建议先使用代理式搜索，仅在需要更快结果或更多变体时添加语义搜索。

**Subagents（子代理）**
SDK 默认支持子代理，有两个主要用途：
- **并行化**：同时启动多个子代理处理不同任务
- **上下文管理**：子代理使用独立的上下文窗口，只返回相关信息给编排器

**Compaction（上下文压缩）**
当 Agent 长时间运行时，自动总结之前的消息以避免上下文耗尽。这是 Claude Code `/compact` 命令的底层能力。

## Agent 采取行动的关键方式？

**Tools（工具）**
工具是 Agent 执行的主要构建块，在 Claude 的上下文窗口中非常突出。设计工具时要考虑上下文效率，将最频繁的操作定义为工具。

**Bash & Scripts**
Bash 作为通用工具，让 Agent 能够灵活地使用计算机完成各种任务。例如：下载 PDF、转换为文本、搜索内容。

**Code Generation（代码生成）**
代码精确、可组合、无限复用，是 Agent 执行复杂操作的理想输出。Claude.AI 的文件创建功能完全依赖代码生成——用 Python 脚本创建 Excel、PPT、Word 文档。

**MCPs（Model Context Protocol）**
提供与外部服务的标准化集成，自动处理认证和 API 调用。可快速连接 Slack、GitHub、Google Drive、Asana 等，无需编写自定义集成代码。

## Agent 如何验证工作质量？

**Defining Rules（定义规则）**
最佳反馈形式是提供清晰的输出规则，然后解释哪些规则失败及原因。代码 linting 是优秀的规则反馈——生成 TypeScript 比纯 JavaScript 更好，因为提供了额外的反馈层。

**Visual Feedback（视觉反馈）**
对于 UI 生成或测试等视觉任务，截图或渲染可以提供有价值的验证。检查布局、样式、内容层次、响应式表现等。使用 Playwright MCP 可以自动化此反馈循环。

**LLM as a Judge**
让另一个语言模型基于模糊规则评判输出。这不是非常稳健的方法，且有较高的延迟代价，但在追求性能提升的应用中可能有帮助。

## 测试和改进 Agent 的关键问题？

- 如果 Agent 误解任务，是否缺少关键信息？能否调整搜索 API 结构？
- 如果 Agent 反复失败，能否在工具调用中添加正式规则来识别和修复？
- 如果 Agent 无法修复错误，能否提供更有用或更有创意的工具？
- 如果性能随功能增加而变化，能否基于客户使用构建代表性的测试集进行程序化评估？

见：[Building agents with the Claude Agent SDK](https://claude.com/blog/building-agents-with-the-claude-agent-sdk)（Claude 官方博客）

## 参考

* [Building effective agents @Anthropic](https://www.anthropic.com/engineering/building-effective-agents)
* [How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)
* [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
* [Building agents with the Claude Agent SDK](https://claude.com/blog/building-agents-with-the-claude-agent-sdk)
