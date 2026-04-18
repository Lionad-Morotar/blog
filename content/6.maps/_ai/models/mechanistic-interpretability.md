---
title: Mechanistic Interpretability
description: Understanding model internals and interpretability methods
original_path: _ai/mechanistic-interpretability.md
---
## TransformerLens：逆向工程 GPT 风格模型的标准工具

TransformerLens 由 Neel Nanda 开发，是机制可解释性领域的事实标准工具。它提供对 GPT 风格语言模型内部的深度访问能力，包括激活缓存、注意力模式分析、因果追踪和激活修补（Activation Patching）。使用它可以重现经典研究：归纳头（Induction Heads）负责 few-shot 学习的注意力回路、间接对象识别（IOI）解析代词指代消解的电路、以及定位执行简单数学运算的子网络。

见：[TransformerLens GitHub](https://github.com/TransformerLensOrg/TransformerLens) | [TransformerLens 教程](https://neelnanda-io.github.io/TransformerLens/) | [Activation Patching 论文](https://arxiv.org/html/2404.15255v1)

## 稀疏自动编码器：将神经元分解为可解释特征

稀疏自动编码器（SAE）是当前可解释性研究的热点方向。它将高维激活向量分解为稀疏的、可解释的"特征"基向量，这些特征往往对应人类可理解的概念：数字、颜色、语法结构、甚至抽象的情感概念。Anthropic 在 Claude 3 Sonnet 上的研究发现，约 70% 的 SAE 特征可被人类解释，实现了从"多义神经元"到"单语义特征"的突破。

见：[Anthropic SAE 研究](https://transformer-circuits.pub/2024/scaling-monosemanticity/) | [SAE 入门指南](https://nickjiang.substack.com/p/a-primer-on-sparse-autoencoders) | [SAELens GitHub](https://github.com/jbloomAus/SAELens)

## nnsight 与 NDIF：远程可解释性实验基础设施

传统可解释性工具受限于单机 GPU 显存，难以分析 70B+ 参数模型。nnsight 通过远程执行架构解决了这个问题——本地编写干预逻辑，远程在大型 GPU 集群执行，只返回分析结果。National Deep Inference Facility (NDIF) 为研究者提供免费的远程可解释性计算资源，让任何研究者都能分析 Llama-2-70B 级别的模型。

见：[nnsight 文档](https://nnsight.net/) | [nnsight GitHub](https://github.com/ndif-team/nnsight) | [NDIF 官网](https://ndif.us/)

## 归纳头：Few-shot 学习的注意力回路

归纳头是 Transformer 中一种特殊的注意力头模式，负责识别序列中的重复模式并进行 few-shot 学习。当一个 token 在序列中重复出现时，归纳头能够"复制"之前出现的模式，这是大模型上下文学习能力的重要机制。通过 TransformerLens 的激活修补技术，可以精确定位这些回路并研究其工作机制。

见：[Circuit Stability 论文](https://aclanthology.org/2025.acl-long.442.pdf) | [如何成为可解释性研究员](https://www.alignmentforum.org/posts/jP9KDyMkchuv6tHwm/how-to-become-a-mechanistic-interpretability-researcher)

## 表征工程：主动修改模型内部行为

表征工程（Representation Engineering）是通过定位和修改模型内部表征来实现特定行为的技术。包括增强诚实性（检测并抑制模型幻觉）、提升有用性（增强指令遵循能力）、以及改善安全性（抑制有害输出）。这为 AI 对齐提供了一条不同于 RLHF 的技术路径——直接操作模型的内部表征而非仅仅调整输出分布。

见：[Anthropic 可解释性研究](https://www.anthropic.com/research/transformer-circuits) | [ARENA 可解释性教程](https://arena-chapter1-transformer-interp.streamlit.app/)

## 安全可解释性：安全神经元的定位与解读

安全行为并非黑箱输出，而是可以被追溯至具体神经元的可解释决策过程。

「已核实」EACL 2026 论文发现，安全知识神经元不仅存在于 MLP 层中，而且可以被"翻译"为人类可理解的词汇表——通过分析这些神经元的激活模式，可以构建一个对应的安全概念词汇表（如拒绝、有害、政策违规等）。这为安全对齐的透明化提供了可能。

基于此提出的 SafeTuning 策略通过强化安全关键神经元来提升模型鲁棒性，是对齐微调的新方向。这与稀疏自动编码器（SAE）的研究方向一致：从"多义神经元"到"单语义特征"的突破，同样适用于安全相关概念。

见：[Unraveling LLM Jailbreaks Through Safety Knowledge Neurons](https://arxiv.org/abs/2509.01631)：EACL 2026，Zhao & Huang
