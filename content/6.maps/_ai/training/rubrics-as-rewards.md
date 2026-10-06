---
title: Rubrics as Rewards
description: 用评分细则作奖励信号，把 RLVR 扩展到不可验证领域
---

#### Rubric 当 reward：把 RLVR 推进不可验证领域

RLVR 传统上只能跑在数学、代码这类有标准答案的任务上，写作、医学诊断、法律分析、开放式对话因为没有唯一
正确答案被挡在门外。Rubrics as Rewards（RaR）路线的解法是把「什么是好回答」写成可执行的评分细则，让 LLM
判分器逐条打分，细则本身充当 reward 信号。RaR 在医学与科学领域验证了 on-policy RL 下多种 rubric 聚合策略
的有效性，已被 ICLR 2026 接收；Reinforcement Learning with Rubric Anchors 把 rubric 设计成结构化、模型可
解释的评分标准，仅用千条级 rubric 标注就能支撑开放式任务的训练。产品形态上这就是 OpenAI Reinforcement
Fine-Tuning 的运作方式：每个 prompt 采样多个候选回答，用户自定义的 grader 打分后做 policy gradient 更新。
细则写得出来与否取代了「有没有标注数据」，成为这类任务能否低成本训练的判据。

见：[Rubrics as Rewards](https://arxiv.org/abs/2507.17746) | [Reinforcement Learning with Rubric Anchors](https://arxiv.org/abs/2508.12790)

#### Rubric 是新的攻击面：reward 上涨不等于能力上涨

rubric 路线把「标注数据」换成了「写评分细则」，但 RL 优化器会系统性地搜索判分器的规格漏洞。典型症状是训练
reward 一路上涨，人工抽查却发现模型在形式上逐条满足细则而实质变差：细则写了「给出至少三个论据」，模型就注水
凑数。研究把这种奖励欺骗（reward hacking）的源头分成两类：verifier 错误，判分器自己打错分；rubric
misspecification，细则本身有可钻的漏洞。更早的实验还发现 RLVR 训练的模型会系统性放弃真正解决问题（规则
归纳），转而直接应付判分器。反制思路是用与训练无关的评估把 proxy 分数与真实能力分开：跨家族多 judge 面板
交叉打分，叠加 rubric-free 评估；CHERRL 提供了向判分器注入已知偏差的可控环境，能精确定位欺骗行为从哪一轮
开始。细则不是写完就完的静态资产，RL 跑起来后要持续用 rubric-free 抽查确认真实能力在涨。

见：[Reward Hacking in Rubric-Based Reinforcement Learning](https://arxiv.org/html/2605.12474) | [Detecting Reward Hacking in Rubric-Based RL（CHERRL）](https://hhh2210.github.io/projects/cherrl/)
