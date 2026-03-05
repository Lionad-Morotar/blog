---
title: AI Architectures
description: System architectures and design patterns for AI systems
original_path: _ai/architectures.md
---
## LitGPT：PyTorch Lightning 原生的 LLM 工具包

LitGPT 让在个人数据上训练、微调和部署大模型变得简单高效。它内置 20+ 主流开源架构（Llama、Mistral、Qwen 等），并预配置 Flash Attention、FSDP 分布式训练、4-bit/8-bit 量化等生产级优化，开箱即用。核心代码采用"单文件模型"设计，没有过度抽象，适合快速原型验证和学习 LLM 工程实践。

见：[LitGPT GitHub](https://github.com/Lightning-AI/litgpt) | [LitGPT 文档](https://lightning.ai/litgpt)

## Mamba：线性复杂度的状态空间模型

Mamba 代表了后 Transformer 时代的重要探索。传统 Transformer 的自注意力机制是二次复杂度 O(n²)，长序列时计算和内存开销爆炸。Mamba 通过选择性状态空间（Selective State Space）将复杂度降至线性 O(n)，同时保留了长程依赖建模能力。2024 年起，Mamba 与 Transformer 的混合架构成为主流——用 Mamba 处理长程上下文，用注意力机制处理局部精细交互。

见：[Mamba: Linear-Time Sequence Modeling](https://arxiv.org/abs/2312.00752) | [A Visual Guide to Mamba](https://newsletter.maartengrootendorst.com/p/a-visual-guide-to-mamba-and-state)

## NanoGPT：极简 GPT 教学实现

Andrej Karpathy 开发的 NanoGPT 用最简洁的代码实现了完整的 GPT 训练流程，核心代码仅约 300 行。这种"minimal but complete"的设计理念，让研究者能聚焦核心机制而非工程细节。配合《Let's build GPT: from scratch》视频系列，是理解 GPT 原理的最佳入门资料。

见：[nanoGPT GitHub](https://github.com/karpathy/nanoGPT) | [build-nanogpt 教学仓库](https://github.com/karpathy/build-nanogpt)

## RWKV：RNN 与 Transformer 的混合架构

RWKV（Receptance Weighted Key Value）结合了 RNN 的 O(1) 推理内存和 Transformer 的并行训练能力。训练时像 Transformer 一样并行，推理时像 RNN 一样常数内存——这个特性让它在端侧部署和长文本生成场景有独特优势，支持 10 万+ tokens 的长文本续写。

见：[RWKV 论文](https://arxiv.org/abs/2305.13048) | [Hugging Face RWKV 介绍](https://huggingface.co/blog/rwkv)

## TorchTitan：PyTorch 原生大规模训练框架

TorchTitan 是 PyTorch 官方出品的大规模模型训练框架，目标是成为"PyTorch 原生的 Megatron/DeepSpeed 替代"。它提供 4D 并行（数据并行、张量并行、流水线并行、序列并行）的统一实现，支持弹性扩缩容。各并行策略可独立开关、自由组合，无需修改模型代码即可无缝应用到大规模训练。

见：[TorchTitan GitHub](https://github.com/pytorch/torchtitan) | [TorchTitan 论文](https://arxiv.org/abs/2410.06511)

## JEPA：非生成式自监督学习架构

JEPA（Joint Embedding Predictive Architecture）是杨立昆提出的非生成式学习架构，核心创新是在抽象表示空间而非像素/token 空间进行预测。与传统生成模型重建输入不同，JEPA 学习语义表示，一次性预测而无需顺序解码。LeCun 认为这是通向 AGI 的必经之路——真正的智能需要世界模型，而非仅仅自回归生成。

见：[JEPA 深度解析](https://rohitbandaru.github.io/blog/JEPA-Deep-Dive/) | [V-JEPA 官方发布](https://ai.meta.com/blog/v-jepa-yann-lecun-ai-model-video-joint-embedding-predictive-architecture/)

## 空间智能：理解三维世界的新一代 AI

李飞飞创立的 World Labs 专注于"空间智能"——让 AI 理解三维世界的几何、物理和语义。真正的空间智能世界模型需要三种能力：生成性（创造遵守物理定律的世界）、多模态（融合视觉、语言、空间信息）、交互性（支持探索和导航的 3D 环境）。她预言未来五年，Transformer 可能被淘汰。

见：[李飞飞空间智能长文](https://www.mittrchina.com/news/detail/15468) | [李飞飞万字访谈](https://zhuanlan.zhihu.com/p/1976808836682765387)

## Transformer 基础架构

#### Transformer 是什么？

Transformer 是一种神经网络架构，2017 年在论文 "Attention is All You Need" 中首次提出。它已成为深度学习模型的主流架构，驱动着 GPT、Llama、Gemini 等文本生成模型，同时也应用于音频生成、图像识别、蛋白质结构预测等领域。文本生成类 Transformer 的核心原理是**下一个 token 预测**——根据用户输入的文本提示，预测最可能的下一个词（或词片段）。其核心创新在于自注意力机制（self-attention），使模型能够处理整个序列并更有效地捕捉长距离依赖关系。

见：[Transformer Explainer](https://poloclub.github.io/transformer-explainer/)

#### Transformer 架构三大组件是什么？

每个文本生成 Transformer 包含三个关键组件：
1. **Embedding（嵌入层）**：将文本输入切分为 token（词或子词），转换为捕获语义含义的数值向量
2. **Transformer Block（变换器块）**：模型的核心构建模块，包含：
   - **Attention Mechanism（注意力机制）**：允许 token 之间通信，捕获上下文信息和词间关系
   - **MLP（多层感知机）**：对每个 token 独立操作，精化每个 token 的表示
3. **Output Probabilities（输出概率）**：最终的线性层和 softmax 层将处理后的嵌入转换为概率，预测序列中的下一个 token

#### Embedding 层如何将文本转换为向量表示？

Embedding 层将输入提示转换为模型可理解的数值表示，包含四个步骤：
1. **Tokenization（分词）**：将输入文本切分为 token（词或子词）。GPT-2 的词表有 50,257 个唯一 token
2. **Token Embedding（词嵌入）**：每个 token 被表示为 768 维向量（维度因模型而异）。相似含义的 token 在高维空间中距离更近
3. **Positional Encoding（位置编码）**：编码每个 token 在输入序列中的位置信息。GPT-2 从零开始训练自己的位置编码矩阵
4. **Final Embedding（最终嵌入）**：将 token 编码和位置编码相加，得到最终的嵌入表示

#### 多头自注意力机制如何工作？

自注意力机制使模型能够捕获序列中 token 之间的关系：
1. **Q/K/V 矩阵计算**：每个 token 的嵌入向量被转换为三个向量——Query（查询）、Key（键）、Value（值）。可用搜索类比理解：Q 是搜索框输入，K 是网页标题，V 是网页内容
2. **多头分割**：Q/K/V 向量被分割成多个头（GPT-2 small 有 12 个头），每个头独立处理嵌入的不同段，捕获不同的句法和语义关系
3. **Masked Self-Attention（掩码自注意力）**：
   - 计算 Q 和 K 的点积得到注意力分数
   - 对注意力矩阵的上三角应用 mask，防止模型访问未来 token（不能"偷看"未来）
   - 经过 softmax 转换为概率，每行总和为 1
4. **输出和拼接**：将注意力分数与 V 矩阵相乘，12 个头的输出拼接后通过线性投影

#### MLP 层的作用是什么？

MLP（多层感知机）在自注意力之后增强模型的表示能力：
- 包含两个线性变换，中间使用 GELU 激活函数
- 第一次线性变换将维度从 768 扩展到 3072（4 倍），允许模型在高维空间捕获更复杂的模式
- 第二次线性变换将维度压缩回 768，保留有用的非线性变换
- 与自注意力不同，MLP 独立处理每个 token，仅将每个 token 的表示从一个空间映射到另一个空间

#### 输出概率如何生成下一个 token？

经过所有 Transformer Block 处理后：
1. 最终线性层将表示投影到 50,257 维空间（词表大小），每个 token 对应一个 logit 值
2. Softmax 将 logits 转换为概率分布（总和为 1）
3. 通过采样生成下一个 token，关键超参数：
   - **Temperature**：控制随机性
     - =1：无影响
     - <1：更确定、更尖锐的分布
     - >1：更柔和、更"有创意"的分布
   - **Top-k 采样**：仅考虑概率最高的 k 个 token
   - **Top-p 采样**：考虑累积概率超过阈值 p 的最小 token 集合

#### 辅助架构特性有哪些？

- **Layer Normalization（层归一化）**：稳定训练、加速收敛，在每个 Transformer Block 中应用两次（注意力前和 MLP 前）
- **Dropout（随机失活）**：训练时随机将部分权重设为零，防止过拟合；推理时关闭
- **Residual Connections（残差连接）**：绕过一层或多层的快捷连接，缓解梯度消失问题，使深层网络训练成为可能。GPT-2 在每个 Transformer Block 中使用两次

## 端侧 AI 限制

#### 端侧 Agent 的物理瓶颈

端侧 AI 面临严峻的物理限制：新设备通常仅 8-16GB RAM，扣除系统占用后仅剩 4-8GB 给 AI。
7B 参数模型需 5GB+，而 Agent 任务需要 32K+ 上下文，KV Cache 可能使 AI 部分占用超过 16GB RAM。

更棘手的是速度问题：端侧 token 生成随上下文增长急剧下降，16K 上下文时从 100 tok/s 跌至 <10 tok/s。
长时间运行还导致过热降频。

#### 供应链与规模困境

HBM（数据中心）与 DDR5（消费端）竞争产能，RAM 价格上涨 300%。
即使云端卸载，数十亿设备的计算需求也是巨大挑战——仅 5% 的 iOS 用户（约 1 亿）使用轻量级 Agent，
就可能消耗相当于 Anthropic 全部的计算资源。

见：[Why On-Device Agentic AI Can't Keep Up](https://martinalderson.com/posts/why-on-device-agentic-ai-cant-keep-up/)
