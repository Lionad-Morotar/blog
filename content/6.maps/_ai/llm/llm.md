---
title: Large Language Models
description: 大语言模型（LLM）相关技术与实践，包括 Embeddings、结构化输出、评估等。
original_path: _ai/llm.md
---

## Tour

* [Embeddings 入门指南](/maps/_ai/llm/embeddings)

## Domain

* [结构化输出](/maps/_ai/llm/structured-output)
* [LLM as a judge](/maps/_ai/llm/llm-as-a-judge)
* [Benchmark](/maps/_ai/benchmark/benchmark)

## 日志审计

* [Datadog LLM Observability](/maps/_ai/llm/datadog/datadog-llm)

## 常见问题

#### 面试题

* [《图解大模型》配套阅读——大模型面试题 200 问](https://zhuanlan.zhihu.com/p/1899948583878394136)
* [About LLMs interview notes and answers](https://github.com/naginoa/LLMs_interview_notes)
* [LLM/RL 可视化原理图](https://github.com/changyeyu/LLM-RL-Visualized): 《大模型算法》作者整理的 100+ 张原创架构图，涵盖 LLM 结构、SFT、DPO、RLHF、PPO、GRPO 等

#### 如何下载模型？

可以使用 python 的 huggingface-hub 包下载 huggingface 上的模型；国内用户可以使用镜像源 hf-mirror 加速下载。

#### Price

常用的官方定价入口（随时可能更新，以官网为准）：

* [OpenAI API Pricing](https://platform.openai.com/docs/pricing)
* [Anthropic Claude API Pricing](https://platform.claude.com/docs/en/about-claude/pricing)
* [Gemini Developer API pricing](https://ai.google.dev/gemini-api/docs/pricing)
* [Azure OpenAI Service - Pricing](https://azure.microsoft.com/en-us/pricing/details/azure-openai/)
* [Amazon Bedrock Pricing](https://aws.amazon.com/bedrock/pricing/)
* [OpenAI Tokenizer（估算 token / 成本）](https://platform.openai.com/tokenizer)
* [火山引擎 Ark 控制台](https://console.volcengine.com/ark/region:ark+cn-beijing/openManagement)：国内 LLM API 用量与订阅管理

#### Benchmark

* [LLM Benchmark](/maps/_ai/benchmark/benchmark)
* [simple-benchmark](/maps/_ai/benchmark/simple)

#### Prompt

* [Prompt](/maps/_ai/prompt/prompt)
* [Prompt Collections](/maps/_ai/prompt/prompt-collections)
* [Stable Diffusion Prompt](/maps/_ai/image/stable-diffusion)

## 核心概念

#### Karpathy 的 MicroGPT：243 行纯 Python 零依赖 GPT 实现

2026 年 2 月，Andrej Karpathy 发布了一个完整的 GPT 训练 + 推理实现，仅用 243 行纯 Python 代码，零外部依赖（无 PyTorch、无 NumPy），只使用 `os`、`math`、`random` 三个标准库。所有操作从头手算——标量算术、自动微分（Value 类）、Transformer 架构。模型采用 GPT-2 结构（1 层、16 维嵌入、4 头注意力、RMSNorm、Adam 优化器），用名字数据集训练生成新名字。核心目的是展示 GPT 的本质算法，证明"Everything else is just efficiency"。

见：[microgpt.py — GitHub Gist](https://gist.github.com/karpathy/8627fe009c40f57531cb18360106ce95)、[microgpt 博文](http://karpathy.github.io/2026/02/12/microgpt/)

#### LLM 训练的三阶段流程？

**预训练（Pre-training）**

从互联网大规模获取知识，将海量文本压缩到神经网络参数中。使用 FineWeb 等数据集，通过"预测下一个词"的任务迫使模型学习世界知识。这是一个有损压缩过程——模型学到的是文本的"格式塔"而非精确复制。

**监督微调（SFT）**

通过人工标注的指令-回复对，教模型如何以助手的方式回应。OpenAI 等公司雇佣数据标注员，编写理想的助手回复示例。这是模型"个性"形成的关键阶段——模型本质上是数据标注员的神经网络模拟。

**强化学习（RL）**

思考型模型（如 o3-mini、o1）通过强化学习发现新的思考策略。在可验证领域（数学、代码）中练习时，模型可能发展出人类从未想过的解法，类似 AlphaGo 的"第37手"。这是模型超越单纯模仿、展现涌现能力的关键阶段。

见：[State of GPT - Andrej Karpathy](https://www.youtube.com/watch?v=bZQun8Y4L2A)

#### 瑞士奶酪能力模型？

LLM 的能力分布像瑞士奶酪一样有洞——某些方面表现惊艳（写作、翻译、知识问答），却会在出人意料的简单任务上失败（计数字母、比较小数大小、简单算术）。

这种不均匀性源于：
- **有限计算预算**：每次生成 token 只能进行固定量的计算
- **有损压缩**：模型学到的是统计模式而非精确规则
- **训练分布偏差**：互联网文本中某些技能被过度/不足代表

这意味着不应盲目信任模型输出，尤其在需要精确性的场景。建议将 LLM 视为"工具箱中的一员"，用于灵感启发和初稿生成，但始终需要人工验证。

见：[How I use LLM - Andrej Karpathy](https://www.youtube.com/watch?v=EWvNQjAaOHw)

## 使用反思

#### 即时知识获取的"浅薄化"代价

通过 LLM 获取知识消除了传统学习的"摩擦"——无需翻阅资料、无需追踪引用、无需建立知识间的连接。但这种便利带来了知识的"零食化"特质：从电池原理跳到汽车稳定杆再到加州公路，浅尝辄止，知识变得像社交媒体动态一样可丢弃。

学习的努力本是深度理解的必要过程。与花数周研究安倍晋三遇刺案、通过维基百科和日文资料层层追踪的体验相比——尽管没有获得明确答案，但建立了远更丰富的理解。品格和专业知识来自"寻找信息的 hunt"，而非摘要。

此外，一个根本性的使用困境是：你几乎无法发现幻觉，除非它涉及你已经掌握知识的领域。

见：[When access to knowledge is no longer the limitation](https://idiallo.com/blog/access-to-knowledge-is-no-longer-a-limitation)
