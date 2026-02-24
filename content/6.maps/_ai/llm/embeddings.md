---
title: Embeddings 入门指南
description: LLM Embeddings 的核心概念、演进历史与实践
---

## 核心概念

Embeddings（词向量/嵌入）是将文本转换为数值向量的技术，是 LLM 理解语言的语义基础。当文本进入模型时，首先被转换为高维向量空间中的点，语义关系变为数学关系。

#### 好的 Embedding 有什么特征？

- **语义表示**：语义相近的词在向量空间中距离更近。如 "cat" 和 "dog" 的向量应比 "dog" 和 "strawberry" 更相似
- **维度权衡**：低维度向量（50-300）存储和计算效率高，高维度向量（768-7168）能捕获更复杂关系但易过拟合。GPT-2 最小 768 维，DeepSeek-V3 达 7168 维

#### 静态 vs 动态 Embeddings

- **静态 Embeddings**：Token 在输入层获得的固定向量，每个 token 有唯一的嵌入向量
- **动态/上下文 Embeddings**：经过 Transformer 层处理后，融入上下文信息的表示。"银行"在"河岸"和"银行抢劫"中静态 embedding 相同，但动态 embedding 会根据上下文分化

## 技术演进

#### TF-IDF（词频-逆文档频率）

基于统计的方法，通过计算词在文档中的重要性生成嵌入：
- **TF（词频）**：词在文档中出现频率，越高越重要
- **IDF（逆文档频率）**：词在所有文档中的稀缺程度，常见词（如"的"）权重低

**局限性**：词在向量空间中的距离与语义无关，仅反映共现频率。大多数词的 embedding 聚集在同一区域，缺乏区分度。

#### Word2Vec

神经网络驱动的嵌入方法，核心思想是通过上下文预测词（或反之）：

- **CBOW**：根据上下文词预测目标词
- **Skip-gram**：根据目标词预测上下文词

网络结构简单：输入层 → 隐藏层（存储 embeddings）→ 输出层。训练完成后丢弃输出层，隐藏层即为词向量。通过 Negative Sampling 优化大规模词汇表的训练效率。

**优势**：能捕获语义关系，支持向量运算（如 king - man + woman ≈ queen）。

#### BERT

首个基于 Transformer 的上下文嵌入模型， encoder-only 架构：

- **Tokenizer**：将文本分割为 token 序列
- **Embedding**：将 token 转为向量
- **Encoder**：多层自注意力 + 前馈网络，融合上下文
- **Task Head**：任务特定的输出层

预训练任务：
- **Masked Language Modeling**：预测被遮蔽的词
- **Next Sentence Prediction**：判断两句子是否连续

**突破**：同一词在不同上下文中产生不同表示，解决了多义词问题。

#### 现代 LLM 的 Embeddings

LLM 的 embedding 层作为查找表（Look-up Table）工作：给定 token ID，返回对应的嵌入向量。`torch.nn.Embedding` 本质上是接收索引而非 one-hot 编码的线性层。

Embedding 在 LLM 训练中与模型参数一起优化，而非使用预训练的 Word2Vec——这样 embedding 能针对特定任务和数据定制。

## 可视化与分析

#### Embedding Atlas

将词汇 embedding 映射到二维/三维空间可视化，语义相近的词会聚集。例如 "bridge"、"bridges"、"桥"、"橋" 在空间中距离很近，反映了跨语言的语义相似性。

* [Apple Embedding Atlas](https://apple.github.io/embedding-atlas/) - Apple 开源的大规模嵌入可视化工具，支持自动聚类、实时搜索、WebGPU 渲染

#### Embedding Graph

将 embedding 空间建模为图网络：token 为节点，向量相近的 token 之间建立边。可用于分析词汇的语义邻域结构。

## 实践工具

- **TensorFlow Embedding Projector**：[projector.tensorflow.org](https://projector.tensorflow.org/) - 交互式 embedding 可视化
- **MTEB Leaderboard**：[huggingface.co/spaces/mteb/leaderboard](https://huggingface.co/spaces/mteb/leaderboard) - 多语言文本嵌入模型基准测试

## 延伸阅读

* [LLM Embeddings Explained: A Visual and Intuitive Guide](https://huggingface.co/spaces/hesamation/primer-llm-embedding) - HuggingFace 交互式教程，包含 DeepSeek-R1-Distill-Qwen-1.5B 的 embedding 可视化
* Sebastian Raschka - [Build a Large Language Model (From Scratch)](https://www.manning.com/books/build-a-large-language-model-from-second) - 深入理解 embedding 层实现
