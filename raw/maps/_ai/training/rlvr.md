# RLVR

> Reinforcement Learning with Verifiable Rewards 核心概念与算法

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

## ResRL 用投影残差隔离正负样本的共享语义

RLVR 中，一条正确的 rollout 和一条错误的 rollout 往往共享大量 token：解题格式、部分中间步骤甚至前缀推理链。
NSR 通过放大负样本梯度来保持多样性，但这种“无差别惩罚”会把共享的正确语义一起压低，造成
Lazy Likelihood Displacement（正确轨迹的似然不升反降）。ResRL 的做法是把每个负样本 token 的隐状态
投影到由正样本 token 构成的低秩子空间上，用投影残差（即正交补能量）衡量该 token 与正确语义的偏离程度；
残差小的负 token 会被降权保护，残差大的负 token 才会被重点惩罚，从而在提升 Pass@1 的同时不牺牲 Pass@k。

这一机制的关键在于一个廉价的单 forward 代理指标。输出头梯度的内积可分解为 logit 空间项与表示空间项的乘积
⟨∇Wℓ−, ∇Wℓ+⟩ ∝ |⟨δ−,δ+⟩|·|⟨x−,x+⟩|，但逐 token 计算完整参数梯度不可行。ResRL 忽略 logit 项，
仅用最末隐藏层前一层的 LayerNorm+中心化表示构造正样本子空间，并以正交补能量
e(x)=||(I−PS)x||²/d 作为 |⟨x−,x+⟩| 的保守上界。这带来了效率，但也隐含前提：
如果 logit 项与表示项方向相反或剧烈变化，残差会低估真实干扰；若去掉 LayerNorm 和中心化处理，
子空间几何会失稳，训练出现高方差梯度与不规律的 KL。

见：[ResRL: Boosting LLM Reasoning via Negative Sample Projection Residual Reinforcement Learning](https://arxiv.org/abs/2605.00380)

## ResRL 的子空间秩与正则化 trade-off

正样本子空间的秩 k 决定了“保护正确语义”与“区分错误模式”之间的平衡。k 过小会欠覆盖共享语义，
导致正样本样 token 被误当成错误方向而过度惩罚；k 过大则会吸收错误特定的方向，使残差对比 collapse，
大量负样本 token 的权重被压到 floor ξ，负向塑造变弱。论文在 AIME24/25 上的消融显示 k=64 是甜点，
k≥128 时梯度范数出现 burst，优化震荡。因此 k 应该匹配正样本推理流形的内在维度，而不是模型维度。

由于投影门控本身就能抑制与正样本对齐的负梯度，ResRL 甚至可以去掉显式 KL 惩罚而保持稳定：
消融中移除 KL 后 AIME2024 提升约 9%，KL 仍平滑上升而非失控漂移。但这里有两个前提：
一是用长度缩放奖励在长回复尾部削弱基于长度的奖励剥削，二是量化分位数阈值（q）要足够严格。
论文 sweep 显示 q=0.1/0.2 比 q=0.3 收敛更快、精度更高；更宽松的阈值会削弱残差权重，
导致梯度方差增大。若忽视这些配套设计，直接取消 KL 很可能让策略在长程推理中发散或利用回复长度。

见：[ResRL: Boosting LLM Reasoning via Negative Sample Projection Residual Reinforcement Learning](https://arxiv.org/abs/2605.00380)
