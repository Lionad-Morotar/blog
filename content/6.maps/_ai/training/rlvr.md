---
title: RLVR
description: Reinforcement Learning with Verifiable Rewards 核心概念与算法
---

## Reward 与 Advantage

Reward 是 verifier 对单条 rollout 的绝对评分，如数学题答对得 1、答错得 0。Advantage 则是 rollout 相对于同组平均
表现的差异。GRPO 中按 `A_i = (v_i - mean(v)) / std(v)` 计算。这个区别直接影响训练信号：reward 只告诉你“对不对”，
advantage 告诉你“比同组其他回答好多少”。当一组回答全对或全错时，所有人的 advantage 都是 0，这就是 GRPO 的
zero advantage 问题——即使付出了生成成本，模型也从中得不到更新信号。

见：[DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models](https://arxiv.org/abs/2402.03300)

## Off-policy 复用与 importance sampling ratio 的陷阱

On-policy 只用当前 policy 生成的 rollout 训练，用完即弃；Off-policy 则把历史 rollout 存入 replay buffer 复用。
在 LLM 训练中，复用旧数据通常需要 importance sampling ratio = π_new / π_old。但 LLM policy 演化很快，同一条 rollout
在新旧策略下的概率可能相差几个数量级，导致 ratio 爆炸或衰减。CBS 等方法的思路是不硬算 ratio，而是把 sample age、
usage count 等 freshness 特征交给 scheduler 学习，让选择器自己判断哪些旧 rollout 仍然有价值。

见：[Proximal Policy Optimization Algorithms](https://arxiv.org/abs/1707.06347)

## Entropy 不是质量指标

Entropy 衡量 policy 输出分布的不确定性：熵高表示模型觉得很多 token 都可能，输出更随机；熵低表示模型高度集中在少数
token 上。但熵高不等于 rollout 质量好——模型可能是在“乱猜”，生成很多样但推理错误的回答。CBS 在 scheduler reward 中
加入 entropy penalty，正是因为如果只优化 gain，scheduler 会偏爱这些高熵但低质量的 rollout，导致 policy 输出分布发散
而非收敛到正确推理。

见：[Contextual Rollout Bandits for Reinforcement Learning with Verifiable Rewards](https://arxiv.org/html/2602.08499v2)

## GRPO 的核心机制与代价

GRPO 去掉 PPO 中的 Critic 模型，改为对同一 prompt 生成一组回答，用组内 reward 的相对关系估计 advantage。优势是显存
开销低，适合数学、代码等可验证任务；代价是训练稳定性更依赖组内 reward 分布。如果组内所有回答 reward 相同，advantage
为 0，该 prompt 不产生学习信号。这也解释了为什么 DAPO 引入 dynamic sampling：遇到全对/全错组时重采样，避免数据浪费。

见：[DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models](https://arxiv.org/abs/2402.03300)

## DAPO 对 GRPO 的两项工程改进

DAPO 在 GRPO 基础上做了两个关键调整。一是 clip-higher：提高 importance sampling ratio 的 upper clip 阈值，避免 GRPO
中过度压缩低概率 token 的探索空间，从而缓解 entropy collapse。二是 dynamic sampling：当一组 rollout 全对或全错导致
advantage 为 0 时，重新采样直到组内出现差异，提高数据利用率。这两项改进都是针对 GRPO 训练稳定性的工程优化，不改变
组内相对 advantage 的核心范式。

见：[DAPO: An Open-Source LLM Reinforcement Learning System at Scale](https://arxiv.org/abs/2503.14476)
