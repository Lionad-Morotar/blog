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
* [LLM Benchmark 原始任务示例集](/maps/_ai/benchmark/llm-benchmark-task-examples) — SimpleQA、HLE、Apex Shortlist、Codeforces、SWE Verified、Terminal Bench 2.0、Toolathlon
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

#### 锯齿状智能：能力高峰由 RL 数据决策塑造

LLM 的能力曲线不是平滑上升，而是有显著的高峰与断崖——一个最先进的模型能重构 10 万行代码、找零日漏洞，却可能告诉你应该走路去 50 米外的洗车店洗车（忽略要被洗的就是车）。Karpathy 称之为 jagged intelligence。

这个分布并非“模型整体变聪明”的结果，而高度依赖实验室的数据决策。GPT-3.5 到 GPT-4 国际象棋能力跳变，是因为有人在 OpenAI 决定把大量国际象棋数据加进了预训练。能力的提升路径是：可验证任务被构造成 RL 环境 → 模型在尝试与奖励中优化 → 该领域形成能力高峰；落到 RL 训练分布外的任务，即使人类觉得简单也可能出错。

实操含义：场景在覆盖的“能力回路”里，开箱即用；在外面，需要自己做微调，不要指望模型一上来就会。瑞士奶酪强调局部盲点，锯齿状智能则进一步把高峰与断崖归因到实验室的数据选择。

见：[Karpathy 最新访谈：Vibe Coding 只是开始，真正重要的是 Agentic Engineering](https://baoyu.io/blog/andrej-karpathy-from-vibe-coding-to-agentic-engineering)

#### 长上下文的中段信息衰减

标称窗口大小（Claude 200K、GPT-4o 128K）给人一种"能吞整本书"的安全感，但长序列的信息提取能力并非均匀分布。Liu 等人记录的"Lost in the Middle"现象表明，模型对长文档中间区域的召回率显著低于开头和结尾——关键细节如果落在全文 30%-70% 的区间，被模型"看见"却不"记住"的概率会大幅上升。Chroma Research 在 2025 年对 18 个前沿模型的评测进一步证实，所有模型均随输入长度增长而单调退化。arXiv:2510.05381 的实验更具冲击力：即使在完美检索和最小干扰的情况下，向上下文插入 25,000 个空白 token 就足以导致模型得出错误答案，证明上下文长度本身就会损害推理，与检索质量无关。

这意味着 prompt 工程的一个隐藏杠杆是：无论窗口多大，关键指令、约束条件和参考示例都应该尽量前置或后置，把中间区域留给模型可以安全忽略的过渡性内容。这不是玄学，而是直接决定长上下文任务成败的工程决策。

#### 涌现能力的度量幻象

传统观点认为涌现是模型内部的质变，但 Stanford 的 Schaeffer 等人发现这可能只是评估方式制造的光学错觉。
他们在 NeurIPS 2023 的论文中验证：将 exact match 这类不连续指标换成 token-level 概率等连续指标后，
GPT-3 家族和 BIG-Bench 上的能力曲线会从悬崖跳变恢复为平滑上升。论文进一步在视觉任务上复现了同样的伪涌现现象，
证明这不是 NLP 领域特有。这意味着涌现阈值不是固定常数，而是随评估方式浮动的变量——直接影响模型选型时
"多大才够"的工程判断。

见：[Are Emergent Abilities of Large Language Models a Mirage?](https://arxiv.org/abs/2304.15004)：Schaeffer et al., NeurIPS 2023

#### 小模型验证的不可迁移性

团队常在 7B 模型上调优 prompt、验证推理策略，确认有效后再迁移到 70B+ 模型复现——这是一个隐蔽的成本陷阱。
Inverse Scaling 研究表明模型规模改变后内部表示拓扑会发生重构，小模型上没有的元推理通路在大模型中被激活，
导致 prompt 的最优结构可能发生翻转。Ethan Perez 等人发起的 Inverse Scaling Prize 征集到大量"模型越大表现越差"
的任务；arXiv:2604.00025 报告了 7.7% 的 benchmark 中出现逆缩放。工程实践的直接后果是：你无法通过廉价的小
模型实验预判大模型行为，必须在目标规模上直接验证，显著增加实验预算。

见：[Inverse Scaling Prize](https://github.com/inverse-scaling/prize)：Ethan Perez 等人发起的逆缩放任务征集

## 使用反思

#### 即时知识获取的"浅薄化"代价

通过 LLM 获取知识消除了传统学习的"摩擦"——无需翻阅资料、无需追踪引用、无需建立知识间的连接。但这种便利带来了知识的"零食化"特质：从电池原理跳到汽车稳定杆再到加州公路，浅尝辄止，知识变得像社交媒体动态一样可丢弃。

学习的努力本是深度理解的必要过程。与花数周研究安倍晋三遇刺案、通过维基百科和日文资料层层追踪的体验相比——尽管没有获得明确答案，但建立了远更丰富的理解。品格和专业知识来自"寻找信息的 hunt"，而非摘要。

此外，一个根本性的使用困境是：你几乎无法发现幻觉，除非它涉及你已经掌握知识的领域。

见：[When access to knowledge is no longer the limitation](https://idiallo.com/blog/access-to-knowledge-is-no-longer-a-limitation)
