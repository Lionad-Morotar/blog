---
title: Agents
description: AI 代理（Agents）是能够自主执行任务并与环境交互的智能实体，通常基于大语言模型（LLM）构建。
original_path: _ai/agents.md
---

## Domain

* [有毒数据流分析](/maps/_ai/agents/toxic-flow-analysis)

## Deep Research

* [Deep Research 案例：大模型 MaaS 低价 Coding Plan 商业逻辑](https://dr.unifuncs.com/?sid=252a69b5-d259-42fc-a6ce-d315f89dde52)

## Protocol

* [A2A - Agent-to-Agent 多智能体协同协议](/maps/_ai/agents/a2a)
* [A2UI - Agent 驱动界面的声明式 UI 协议](/maps/_ai/agents/a2ui)

## Goose

* [Goose Prompts](/maps/_ai/agents/goose/prompts)

## 多智能体框架

* [AutoGen vs DeepAgents vs CrewAI 对比](/maps/_ai/agents/multi-agent-frameworks)

## Agent SDK

* [Claude Agent SDK (TypeScript) 发布记录](/maps/_ai/agents/claude-agent-sdk-releases)
* [OpenAI Agents SDK (JavaScript) 发布记录](/maps/_ai/agents/openai-agents-js-releases)

## Agent 架构第一性原理

#### 工作流与智能体的核心区别？

决策权归属是区分二者的关键。

**工作流（Workflow）** 像流水线或菜谱，任务流程固定且预先设计好。LLM 被代码调用完成特定子任务（如总结文本、提取信息），决策权在代码而非模型。

**智能体（Agent）** 像侦探，你给它总目标，但没有固定剧本。它会根据情况动态决定下一步该做什么、使用哪个工具、任务是否完成，决策权在 LLM 而非代码。

#### 技术选型金字塔？

Anthropic 建议始终从最简单方案开始，只有当简单方案无法满足需求时才增加复杂性。

| 层级 | 方案 | 适用场景 |
|------|------|----------|
| 底层（基础） | 优化单一 LLM 调用 | 简单任务，追求效率。通过 RAG、Few-shot 示例解决大部分问题 |
| 中层（中级） | 工作流 | 流程固定、明确、可预测，对质量有高标准 |
| 顶层（高级） | 智能体 | 开放式任务，无法预测步骤，需要模型大规模自主决策 |

**示例**：翻译 / 本地化任务
- 读一封外文邮件/工单，快速了解大意即可 → 单一 LLM 调用
- 需要稳定产出与可追溯质量（术语一致、格式固定、必须复核），如用户手册/合规文档翻译 → 工作流（翻译 → 术语校验 → 审校/回译）
- 目标是”把内容做成一条可发布的多语言产线”，涉及选题、改写、本地化用词、生成标题与摘要、更新站点/提交 PR 等多步决策与多工具协作 → 智能体

见：[Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)（Anthropic 官方指南）

#### 五种工作流模式？

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
- 适用：你能清楚定义“好/坏”的标准，而且多改几轮确实会变更好。通常有两个信号：人工点评能明显改善结果；模型也能按同一套标准给出可用的点评
- 示例：文学翻译（捕捉细微差别）、复杂搜索任务（多轮搜索分析）

#### Agent 设计三原则？

1. **简洁性** —— 保持设计简单
2. **透明性** —— 显式展示规划步骤
3. **ACI（Agent-Computer Interface）** —— 精心设计的工具文档和测试

#### 工具设计的最佳实践？

设计工具时，投入与 HCI（人机界面）相当的努力到 ACI（Agent-Computer Interface）：

**格式选择原则**
- 给模型足够 token 在”陷入困境”前思考
- 格式贴近模型在互联网上自然见过的形式
- 避免格式开销（如 diff 需计算行数、JSON 需转义引号）

**设计检查清单**
- 站在模型角度：工具描述和参数是否一目了然？好的工具定义包含示例用法、边界情况、输入格式要求
- 优化参数命名和描述：像为团队初级开发者写优秀 docstring
- 测试迭代：在 workbench 中运行大量示例输入，观察模型错误并迭代
- Poka-yoke（防错）：调整参数使错误更难发生

**Anthropic 实战经验**

在构建 SWE-bench Agent 时，优化工具的时间超过优化提示。例如：发现模型在使用相对路径的工具上出错（Agent 已移出根目录后），改为要求绝对路径后，模型 flawlessly 使用该方法。

#### 长时运行 Agent 的 Harness 设计？

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

## 参考

* [Building effective agents @Anthropic](https://www.anthropic.com/engineering/building-effective-agents)
* [How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)
