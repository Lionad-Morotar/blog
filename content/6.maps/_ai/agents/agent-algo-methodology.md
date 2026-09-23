---
title: Agent 算法迭代方法论
description: 从 Agent 开发到 Agent 算法的升级路径：先验后验闭环、评测四级 scaling 链、策略升级与训练阶段的风险暗面。
---

## 先验后验的迭代闭环

#### Agent 开发做先验，Agent 算法追上限

Agent 开发与算法的分界：把一个 Agent 从零快速做到 60 分是开发，
从 80 分继续追高是算法。上线验证周期长、成本高，不可能每次迭代都等线上反馈，
所以完整的业务迭代方法论是「Benchmark → 策略 → 上线」闭环：
先用离线 Benchmark 尽可能对齐线上效果，用它快速指导先验策略迭代，
上线拿到真实后验后再反过来修正和补充先验。

评测侧沿四级链 scaling：Rubric（评分细则）把模糊的业务目标翻译成
非专家、LLM、程序都能稳定执行的评价标准；人工按 Rubric 标注一批样本看人人一致率，
一致率低说明标准本身不清而非标注员不行；LLM-as-a-Judge 用人标数据当 ground truth
调 Prompt 与采样超参，复现已稳定的人工判断；Reward Model（奖励模型）
再把已验证的评判蒸馏成低延迟、高吞吐的小模型，因为每次评测都调大模型时，
成本与时延随评测量线性增长，且很难靠压缩 Prompt 优化。
RM 只需在业务数据分布内强，可以用更小的基模训练。
「离线涨、线上没涨」的首要嫌疑是 Benchmark 未对齐业务，
要修的是样本、Rubric 与裁判而不是策略；
Benchmark 因此不是一次性交付物，而是跟着业务持续迭代。

见：[从 Agent 开发到 Agent 算法，进阶指南](https://mp.weixin.qq.com/s/0YFG-J2ZWwRO4lTP7f1JDA)

#### 策略升级路径：Prompt 燃尽再进 SFT，反馈信号是 RL 的命门

Agent 策略阶段的合理流程：纯 Prompt 跑通最小闭环，系统性分析 bad case，
再用 RAG、few-shot、CoT 等经典手法逼近上限，同步养 Benchmark。
判断 Prompt 层是否燃尽用梯度测试：在同一批样本上逐步增强 Prompt，
效果仍几乎不涨即到顶。SFT 阶段的准入原则是
「高频变化的信息留在 Context，长期稳定的行为才训进参数」：
实时库存、活动规则再重要也不进模型，输出格式、业务 SOP、工具调用范式才值得固化。
SFT 数据不是越多越好：同一场景下行为互相矛盾（一部分拒答一部分回答）时，
模型学到的不是灵活而是不确定性，清洗 SFT 数据本质是整理模型的行为分布；
未经 Benchmark 验证的 Prompt hack 直接扩数据训进去，
等于把没想明白的策略永久写进参数。
RL 阶段 Benchmark 从测试变成反馈，Rubric 定义什么叫好、Judge 判断好不好、
判断转成 Reward 决定优化方向，链上每级失真都会被训练放大，
所以离线 Reward 上涨不等于线上业务指标上涨。

见：[从 Agent 开发到 Agent 算法，进阶指南](https://mp.weixin.qq.com/s/0YFG-J2ZWwRO4lTP7f1JDA)

## 训练阶段的风险暗面

#### KL 惩罚挡不住奖励模型过优化

RLHF 常见的安全假设是给 Reward 加 KL 散度惩罚，策略就不会偏离真实目标太远。
Gao 等人 2022 年的实验给出量化反例：固定一个「金标准」奖励模型扮演人类，
用代理 RM 优化策略，金标准分数随优化量先升后降，与 Goodhart 定律一致；
加大 KL 惩罚系数并不改变这个交叉点的相对位置，
因为 RL 消耗 KL 预算的速度远快于 best-of-n 采样，按 KL 距离惩罚不改变相对排序。
后续研究进一步主张 KL 正则不足以缓解 reward misspecification。
工程含义：KL 系数不是安全阀，RM 上线后必须保留 held-out 真值评测
与定期人工或 LLM Judge 抽检，发现漂移即补充数据重训。

见：[Scaling Laws for Reward Model Overoptimization](https://arxiv.org/abs/2210.10760)

#### 直接拿 LLM 裁判当 RL 奖励会被策略攻陷

RLAIF 用 LLM 裁判的打分直接充当 RL 奖励时，
2026 年研究给出首个系统证据：随训练推进，策略学会利用裁判的系统性错误，
裁判分数持续上涨而真实质量退化。缓解方案是辩论训练（debate）：
生成器与批评家对抗、由较弱的裁判裁决，相比单策略直接训 RL 的基线
显著减少 reward hacking，挽回了约 45% 的性能差距，且裁判在 RL 压力下保持判别力；
该方向首批证据 2026 年 8 月才出现，缓解路线未终审。
工程上，裁判分数做 reward 时应混入 held-out 人工锚点做漂移监控，不能裸跑。

见：[Debate Training Reduces Reward Hacking in RLAIF](https://arxiv.org/abs/2608.17776)

#### SFT 的固化效果必须在分布外样本上验证

《SFT Memorizes, RL Generalizes》（Chu et al. 2025）比较两种后训练的泛化差异：
以结果为奖励的 RL 在文本规则变体与视觉变体上都泛化更好，
SFT 倾向记忆训练数据、出分布即崩；但同一篇也确认 SFT 是 RL 的前置稳定器，
它固定输出格式，后续 RL 才能吃到性能收益。
该结论的测量方式存在争议（NeurIPS 有后续工作质疑 SFT 高分的误导性），未终审，
但无论哪边成立，防御动作一致：SFT 验证集必须包含训练分布外的样本变体，
只看同分布 Benchmark 会系统性高估固化效果。

见：[SFT Memorizes, RL Generalizes](https://arxiv.org/abs/2501.17161)
