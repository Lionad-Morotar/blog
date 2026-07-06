---
title: Post-training
description: Post-training optimization and model alignment
original_path: _ai/post-training.md
---
## DPO：直接偏好优化的对齐革命

DPO（Direct Preference Optimization）将 RLHF 的两阶段流程（训练 Reward Model + PPO 优化）压缩为单阶段。它直接在偏好数据上优化策略，数学上等价于带 KL 约束的 RL，但实现更简单、
训练更稳定。无需强化学习，只需监督学习即可完成对齐，大大降低了后训练门槛。

见：[DPO 论文](https://arxiv.org/abs/2305.18290) | [DPO 详解 - Deep Learning Focus](https://cameronrwolfe.substack.com/p/direct-preference-optimization) | [2025 DPO 对齐指南](https://www.philschmid.de/rl-with-llms-in-2025-dpo)

## GRPO：DeepSeek-R1 的推理突破关键

GRPO（Group Relative Policy Optimization）是 DeepSeek-R1 实现 reasoning 能力突破的核心技术。与传统 PPO 需要独立的 Critic 模型不同，
GRPO 通过组内采样估计 baseline——对同一问题生成多组回答，以组内得分的相对排名作为优势估计，显存开销降低 50%，让超长思维链（Chain-of-Thought）的训练成为可能。

见：[DeepSeek-R1 技术报告](https://arxiv.org/pdf/2501.12948) | [GRPO 数学原理](https://medium.com/@sahin.samia/the-math-behind-deepseek-a-deep-dive-into-group-relative-policy-optimization-grpo-8a75007491ba) | [Unsloth GRPO 本地训练](https://unsloth.ai/blog/r1-reasoning)

## RLVR Rollout 调度：Contextual Bandit 视角

#### 用性能增益重新定义 rollout 价值

RLVR 里常见做法是用 reward 或 advantage 的静态阈值过滤 rollout，比如去掉 zero-advantage 样本或只保留高 reward 回答。
但 CBS 把“好 rollout”定义为它实际带来的 policy performance gain，即连续两轮优化之间验证指标的变化 Vt+1−Vt。
这种定义会直接暴露 guessed-correct 等陷阱：一个回答 reward 很高，只是因为模型蒙对，policy 从中并学不到东西；
而某些低 reward 的 negative sample 反而提供纠正信号。更隐蔽的风险是静态规则会随训练阶段失效——早期需要探索性样本，
晚期则需要精细纠错，固定阈值无法兼顾。CBS 用 MLP scheduler 在线预测这个 gain，让选择标准随训练动态演化。

见：[Contextual Rollout Bandits for Reinforcement Learning with Verifiable Rewards](https://arxiv.org/html/2602.08499v2)

#### rollout 复用不必依赖重要性采样

多数 off-policy 方法复用旧 rollout 时依赖 importance sampling ratio，但 LLM policy 在 RLVR 中演化很快，
ratio 容易爆炸或衰减，导致方差过大。CBS 的做法是把 staleness 和 usage history 直接编码进 10 维特征：
sample age 表示 rollout 距今多少轮，usage count 表示被选中次数。scheduler 在学习过程中自己判断哪些旧样本仍然有价值。
论文的理论结果也支持这一点：在简化设定下，增大 replay buffer 可以提升 policy 性能上界。
这意味着“全删旧 rollout”和“盲目复用旧 rollout”都不是最优解，关键在于让选择器感知数据新鲜度。

见：[Contextual Rollout Bandits for Reinforcement Learning with Verifiable Rewards](https://arxiv.org/html/2602.08499v2)

#### scheduler reward 中的 entropy penalty 是防崩溃关键

CBS 给 scheduler 的奖励不是纯 accuracy gain，而是额外 penalize entropy 超过阈值后的上升。这看起来反常——
RLVR 社区更常讨论的是 entropy collapse（熵降到 0）。但消融实验显示，去掉 entropy penalty 后 entropy 会持续上升，
policy 性能随之恶化。原因在于 scheduler 如果只优化 gain，会偏爱高熵但低质量的 rollout，导致输出分布发散。
这个设计提醒我们：RLVR 训练不稳定有两个方向，熵降得过快会提前收敛，熵升得过高同样会崩溃。

见：[Contextual Rollout Bandits for Reinforcement Learning with Verifiable Rewards](https://arxiv.org/html/2602.08499v2)

#### policy perception metrics 识别误导性 rollout

CBS 的 10 维特征里，entropy 和 clip ratio 属于 policy perception metrics，它们反映的是“当前 policy 怎么看这个 rollout”，
而不是 rollout 本身的属性。只看 reward 会把 guessed-correct 判定为好样本，但结合 clip ratio 和 entropy 就能发现：
这种 rollout 虽然答案对，policy 对其 token 的概率分布并不稳定，学习价值有限。同理，长度过长或被截断的回答
可能 reward 不低，但 entropy 或 truncation flag 会暴露其质量问题。把模型状态投影到数据上，是区分真正高价值样本
与噪声样本的关键。

见：[Contextual Rollout Bandits for Reinforcement Learning with Verifiable Rewards](https://arxiv.org/html/2602.08499v2)

## ORPO：SFT 与对齐的合并

ORPO（Odds Ratio Preference Optimization）将传统两阶段流程（先 SFT 再 DPO）合并为单阶段。它用一个损失函数同时优化指令跟随和偏好对齐，训练效率提升一倍，且无需参考模型。
这是目前最高效的后训练方法之一。

见：[ORPO 论文](https://arxiv.org/abs/2403.07691) | [Hugging Face ORPO Trainer](https://huggingface.co/docs/trl/en/orpo_trainer) | [Llama 3 ORPO 微调](https://www.analyticsvidhya.com/blog/2024/05/finetuning-llama-3-with-odds-ratio-preference-optimization/)

## SimPO：更简单直接的偏好优化

SimPO 进一步简化 DPO，移除参考模型，直接优化响应间的胜率。它引入"长度归一化"，避免模型生成冗长但空洞的回复，是对 DPO 的实用改进。

见：[SimPO 介绍](https://huggingface.co/docs/trl/en/index)

## TRL：后训练的一站式解决方案

TRL（Transformer Reinforcement Learning）是 Hugging Face 生态中的后训练全栈库，集成 SFT、DPO、PPO、GRPO、Reward Modeling 等方法。
它与 transformers、peft、datasets 无缝协作，是入门后训练的首选工具。

见：[TRL GitHub](https://github.com/huggingface/trl) | [TRL 文档](https://huggingface.co/docs/trl/en/index)

## 后训练最佳实践：数据质量 > 数量

偏好对的质量远胜于数量——1000 条精心标注的偏好对 > 10000 条噪声数据。推荐流程：冷启动（高质量 SFT 建立基础指令跟随能力）→ 多轮对齐（SFT → DPO → RL，逐步逼近目标分布）→ 能力保持（
定期在基础能力测试集上评估，防止对齐税）。

见：[LLM 微调全指南](https://www.53ai.com/news/finetuning/2026010417029.html)

