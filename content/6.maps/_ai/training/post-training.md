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

#### 专家标注数据让小模型胜过前沿大模型，标签清洗靠模型筛分歧

Bridgewater AIA Labs 与 Thinking Machines 的实验把「业务判断能否教给模型」量化了：判断财经文章对投资人是否值得读，
前沿模型裸提示词约 50% 准确率（掷硬币水平），专家改写提示词加自动优化只能推到 78% 附近触顶，够不到可信赖的
80% 门槛；用投资专家标注的数据微调 Qwen3-235B 后达到 84.7%，比最强前沿模型少 29.8% 的错误，推理成本低 13.8 倍。
提示词只能传达专家说得出口的直觉，最有价值的判断恰恰最难言说，微调让模型自己长出判断；基座换代也带不来红利，
GPT-5.4 比 5.2 贵 43% 但准确率只有边际提升。配套的教训是标签质量：非专家标注的标签本身可能是错的，模型会忠实
学进错误答案。清洗方案是先拿脏数据训一版模型，让它在同一份训练集上自测，与标注分歧的样本只有两种可能，题目
真难或原标签有错，分歧样本送专家复核，模型筛分歧、专家做裁决。业务判断类任务的标注者必须真懂业务，廉价众包
等于批量生产「看起来像答案的错误答案」。

见：[Learning to Replicate Expert Judgment in Financial Tasks](https://thinkingmachines.ai/news/learning-to-replicate-expert-judgment-in-financial-tasks/)

#### 持续训练闭环：模型上线是训练的起点，评测是方向盘，资产在基座之外

模型研发正从一次性交付项目变成持续交付软件：Cursor 把真实用户是否采纳生成代码当奖励信号，最快每五小时推送一个
新 checkpoint。一轮完整闭环是：业务 Benchmark 自动评测定位问题，失败案例整理成训练数据，训练后用同一套 Benchmark
验收并对比新旧版本，再上线采集下一轮信号。评测因此不是训练结束后的验收环节，而是循环的方向盘：问题没有被准确
定位时，增加数据只会放大规模，不会改善结果。基座是消耗品，真正的资产是四件可迁移物：评测标准、标注数据、LoRA
专家（可插拔的附加参数）、关联版本可回退的训练配置，基座换代时四件资产无损迁移才算「拥有自己的模型」，Mind Lab
的 Macaron V1.1 用两周把基座从 GLM-5.2 换到 GLM-5.3 并保留四个 LoRA 专家即是演示。产业层面，后训练平台（Fireworks
Training API、Baseten Loops、Mint Recursive、Tinker）正成为开源模型与应用公司之间的中间层。

见：[Improving Composer through real-time RL](https://cursor.com/blog/real-time-rl-for-composer) | [只用 2 周完成模型升级，最适合应用公司的后训练平台来了](https://mp.weixin.qq.com/s/F7dVtWDZpHUBLI6DuI4PEw)

#### 训推失配（TIM）：工程误差会被训练系统误读为模型进步

训练引擎（FSDP、Megatron 等直接输出 bf16 概率）与推理引擎（vLLM、SGLang 等为吞吐做了聚合优化）对同一份权重、
同一输入会给出不同的 token 概率。RL 训练中这个数值分歧经 importance sampling ratio 混入梯度更新，训练系统把纯
工程误差当成「进步」，症状是 reward 曲线莫名上涨但真实评测不变，或训练中途突然崩溃，模型越大越难发现。对策：
两侧数值行为对齐（如统一 FP16）；验收走上线那套推理引擎而非训练引擎自测；选型时可直接问平台「同权重下两侧的
KL 散度是多少」，答不上来说明对方自己没测过。

见：[Defeating the Training-Inference Mismatch via FP16](https://arxiv.org/html/2510.26788v1) | [Diagnosing Training-Inference Mismatch in LLM RL](https://arxiv.org/pdf/2605.14220)

#### 权重同步是多节点 RL 的隐形瓶颈

每轮 RL 更新完要把数千亿参数（数百 GB）的新权重送进推理引擎才能开始下一轮 rollout，训练跨到多节点后这一步取代
算力成为主要等待。Modal 实测：同集群走 RDMA（3.2 Tbps）对比 TCP（50 Gbps）快约 100 倍，跨集群用 delta compression
只传权重变化量可省 98% 传输量。LoRA、异步 RL、trainer 与 rollout 同址部署是三种减压手段，各有取舍：LoRA 省带宽
但限制方法选择，异步 RL 提吞吐但引入轻度 off-policy。评估后训练平台时，「权重同步怎么做、有无 RDMA、支持 LoRA
热更新吗」比「支持多少张卡」更能筛掉外行。

见：[Reinforcement learning is an infrastructure problem](https://modal.com/blog/reinforcement-learning-infrastructure-problem)

#### GRPO 的成本红利止步于可验证边界

GRPO 砍掉价值模型、用组内相对排名当优势估计所以便宜，但红利只属于结果可验证的任务：奖励能靠规则或可执行验证算出，
组内排名才有意义。任务没有客观对错时硬套 RLVR，模型会学会钻奖励函数的空子（reward hacking），分数涨了真实能力
没涨。品味、风险偏好这类判断题的出路是专家偏好数据加改良算法，Bridgewater 用 CISPO 损失加在线策略蒸馏把
Qwen3-235B 从 73.5% 推到 84.7%，而非硬造机械判分规则。

见：[Post-Training in 2026: GRPO, DAPO, RLVR & Beyond](https://llm-stats.com/blog/research/post-training-techniques-2026) | [Reinforcement Learning for LLM Post-Training: A Survey](https://arxiv.org/abs/2407.16216)

