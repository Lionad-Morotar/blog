# 后训练 (Post-Training)

## DPO：直接偏好优化的对齐革命

DPO（Direct Preference Optimization）将 RLHF 的两阶段流程（训练 Reward Model + PPO 优化）压缩为单阶段。它直接在偏好数据上优化策略，数学上等价于带 KL 约束的 RL，但实现更简单、训练更稳定。无需强化学习，只需监督学习即可完成对齐，大大降低了后训练门槛。

见：[DPO 论文](https://arxiv.org/abs/2305.18290) | [DPO 详解 - Deep Learning Focus](https://cameronrwolfe.substack.com/p/direct-preference-optimization) | [2025 DPO 对齐指南](https://www.philschmid.de/rl-with-llms-in-2025-dpo)

## GRPO：DeepSeek-R1 的推理突破关键

GRPO（Group Relative Policy Optimization）是 DeepSeek-R1 实现 reasoning 能力突破的核心技术。与传统 PPO 需要独立的 Critic 模型不同，GRPO 通过组内采样估计 baseline——对同一问题生成多组回答，以组内得分的相对排名作为优势估计，显存开销降低 50%，让超长思维链（Chain-of-Thought）的训练成为可能。

见：[DeepSeek-R1 技术报告](https://arxiv.org/pdf/2501.12948) | [GRPO 数学原理](https://medium.com/@sahin.samia/the-math-behind-deepseek-a-deep-dive-into-group-relative-policy-optimization-grpo-8a75007491ba) | [Unsloth GRPO 本地训练](https://unsloth.ai/blog/r1-reasoning)

## ORPO：SFT 与对齐的合并

ORPO（Odds Ratio Preference Optimization）将传统两阶段流程（先 SFT 再 DPO）合并为单阶段。它用一个损失函数同时优化指令跟随和偏好对齐，训练效率提升一倍，且无需参考模型。这是目前最高效的后训练方法之一。

见：[ORPO 论文](https://arxiv.org/abs/2403.07691) | [Hugging Face ORPO Trainer](https://huggingface.co/docs/trl/en/orpo_trainer) | [Llama 3 ORPO 微调](https://www.analyticsvidhya.com/blog/2024/05/finetuning-llama-3-with-odds-ratio-preference-optimization/)

## SimPO：更简单直接的偏好优化

SimPO 进一步简化 DPO，移除参考模型，直接优化响应间的胜率。它引入"长度归一化"，避免模型生成冗长但空洞的回复，是对 DPO 的实用改进。

见：[SimPO 介绍](https://huggingface.co/docs/trl/en/index)

## TRL：后训练的一站式解决方案

TRL（Transformer Reinforcement Learning）是 Hugging Face 生态中的后训练全栈库，集成 SFT、DPO、PPO、GRPO、Reward Modeling 等方法。它与 transformers、peft、datasets 无缝协作，是入门后训练的首选工具。

见：[TRL GitHub](https://github.com/huggingface/trl) | [TRL 文档](https://huggingface.co/docs/trl/en/index)

## 后训练最佳实践：数据质量 > 数量

偏好对的质量远胜于数量——1000 条精心标注的偏好对 > 10000 条噪声数据。推荐流程：冷启动（高质量 SFT 建立基础指令跟随能力）→ 多轮对齐（SFT → DPO → RL，逐步逼近目标分布）→ 能力保持（定期在基础能力测试集上评估，防止对齐税）。

见：[LLM 微调全指南](https://www.53ai.com/news/finetuning/2026010417029.html)
