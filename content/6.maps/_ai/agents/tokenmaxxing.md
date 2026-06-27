---
title: Tokenmaxxing：三个月必然失败的 AI 应用层泡沫
description: 从 2026 年初 Tokenmaxxing 现象出发，分析 Agentic coding 的成本失控、组织流程瓶颈、Agent 能力错配与需求天花板，并将其置于 J 型增长曲线与生产率悖论的经济学框架中理解。
---

## Brief

Tokenmaxxing 是 2026 年初在硅谷兴起的激进压榨 token 上限的 AI 实验，三个月内被 Amazon、Uber、微软等巨头相继叫停。它失败的直接原因是 Agent 成本失控，深层原因是组织流程与 Agent 能力错配，根本原因则是生产率悖论在 AI 时代的重演。本文围绕有效反馈计算、交付链衰减、能力参差不齐与 J 型曲线下探四个切面，整理其中的工程与组织启示。

#### Agentic coding 的 EFC 转化率陷阱

Agentic coding 的 token 消耗可达普通代码问答的约 1000 倍，但哈工大论文提出的 Effective Feedback Compute（有效反馈计算）显示，复杂 Terminal 与 SWE 任务中主流 harness 的 EFC 转化率 η 接近 0.1，意味着超过 90% 的 token 花在了没有带来新增有效信息的反复试探上。更隐蔽的是，成本大头不在输出而在输入：Harness 为保证模型不跑偏，会把累积的上下文连同已读过的局部信息反复送回模型，Explore 与 Fix 两个阶段就占了约三分之二的用量，而不同尝试间 token 消耗最高可差 30 倍。这揭示了一个工程现实：在 harness 本身的上下文累积机制被优化之前，单纯扩大 token 上限只是在放大无效计算。

见：[三个月，一场必然失败的 Tokenmaxxing](https://www.bestblogs.dev/article/8a08f9d4)

#### 从 commit 到 release 的上游红利衰减

MIT 对 10 万多名 GitHub 开发者的研究发现，自主 coding agent 能让 commit 累计增加约 180%，但传导到项目数只剩约 50%，再传到 releases 只剩约 30%。原因是软件交付不是写代码这一环的独奏，设计、审核、测试、产品决策、发布流程、应用商店审核、用户采用都没有同步加速。AI 把“切菜”变快了，但炒菜、装盘、上菜、顾客买单都没跟上，厨房里只会堆出更多半成品。更棘手的是，AI 生成的代码需要人工 review 的警告增加约 18%、理解难度上升约 39%，下游审核不但没有变轻松，反而更耗人脑带宽。这说明衡量 Agent 价值不能只看上游代码产量，而要看端到端交付转化率。

见：[三个月，一场必然失败的 Tokenmaxxing](https://www.bestblogs.dev/article/8a08f9d4)

#### Agent 能力的「参差不齐」与企业落地错配

当前 AI 模型被 Joshua Bengio 称为“能力参差不齐”的智能（Jagged Intelligence）。UC Berkeley 牵头的 Agents' Last Exam 覆盖 55 个子领域、1400 多个真实专业任务，结果显示主流系统平均完整通过率仅 2.6%，商业和法律等高频企业场景反而落在模型弱区。失败案例中 75% 归因于“理解”和“策略”，而非执行层面的 bug 或 GUI 操作错误——Agent 不是手脚不灵，是脑子里没有行业 know-how。企业 70% 的 Agent 调用往往集中在某几个高频工作流，只要这些工作流落在弱区，更多 token 不会带来线性改善，只会产生更多需要人工返工的中间产物。

见：[三个月，一场必然失败的 Tokenmaxxing](https://www.bestblogs.dev/article/8a08f9d4)

#### Tokenmaxxing 是 J 型曲线下探的组织改造成本

Tokenmaxxing 现象的本质是生产率悖论在 AI 时代的重演。J 型增长曲线理论指出，通用技术带来的生产率提升往往在企业同步改变设备、流程、技能和组织结构后才会出现；在此之前，企业一边支付技术成本，一边支付组织改造成本，统计生产率甚至可能下降。Tokenmaxxing 就是企业在 J 型曲线下探阶段“趟出瓶颈”的过程：Amazon 关闭 Kirorank、Uber 烧光全年 Claude Code 预算、微软收紧内部授权，都是这场下探的具体切片。因此它的失败并非毫无意义，而是为真正的生产力爆发积累基础设施与组织经验，但前提是组织能把 token 消耗从“炫技指标”转回“有效交付”与“可沉淀资产”。

见：[三个月，一场必然失败的 Tokenmaxxing](https://www.bestblogs.dev/article/8a08f9d4)
