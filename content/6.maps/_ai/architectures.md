# 模型架构 (Model Architectures)

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
