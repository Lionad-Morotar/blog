---
title: Tokenization
description: Text tokenization and encoding
original_path: _ai/tokenization.md
---

# 分词 (Tokenization)

## HuggingFace Tokenizers：Rust 实现的高性能分词

HuggingFace Tokenizers 基于 Rust 实现，提供 Python 绑定，在训练和推理速度上都显著优于纯 Python 实现。在 GB 级语料上训练 tokenizer，它比纯 Python 实现快 10-100 倍，内存占用更低。支持 BPE、Byte-Level BPE、WordPiece、Unigram 等主流算法，与 transformers 生态无缝集成。

见：[HuggingFace Tokenizers GitHub](https://github.com/huggingface/tokenizers) | [Tokenizers 文档](https://huggingface.co/docs/tokenizers/index)

## SentencePiece：语言无关的无监督分词器

SentencePiece 由 Google 开发，采用"语言无关"的设计理念——不依赖预定义的单词边界（如空格），直接从原始文本学习子词单元。这让它在处理中文、日文等没有空格分隔的语言时特别有效，无需预先分词。支持 BPE、Unigram、Char、Word 四种模式。

见：[SentencePiece GitHub](https://github.com/google/sentencepiece) | [SentencePiece 论文](https://aclanthology.org/D18-2012.pdf)

## BPE：从小到大的子词合并算法

BPE（Byte-Pair Encoding）是 GPT 系列使用的分词算法，从字符开始逐步合并高频子串。训练方向是"从小到大"，每次选择频率最高的字符对合并，直到达到目标词表大小。优点是简单高效，能很好地平衡词表大小和序列长度。

见：[BPE 分词算法详解](https://zhuanlan.zhihu.com/p/716655053)

## WordPiece：基于似然增益的分词策略

WordPiece 是 BERT 使用的分词算法，与 BPE 类似也是从小到大合并，但选择策略不同——不是选频率最高的对，而是选似然增益最大的对。训练目标是最大化训练数据的似然概率，在数学上更加严谨。

见：[WordPiece tokenization - Hugging Face](https://huggingface.co/learn/llm-course/en/chapter6/6)

## Byte-level BPE：从根本上消除 OOV

GPT-2 引入的 Byte-level BPE 将词表基础单元从字符降为字节，任何 Unicode 字符都可表示为 1-4 个字节序列，从根本上消除了 OOV（未登录词）问题。代价是序列长度略有增加，但对于现代 Transformer 的长上下文能力而言，这是可接受的权衡。

见：[字节级 BPE 详解](https://blog.csdn.net/u013172930/article/details/147045833)

## 中文分词：词表扩充是关键

LLaMA 原生 tokenizer 仅包含少量中文字符，导致一个汉字被切分成 2-3 个 token，显著降低编码效率。使用 SentencePiece 训练中文扩展词表是中文 LLM 开发的必要步骤。推荐词表大小：32K-50K 用于通用英语，100K+ 用于多语言，200K+ 用于文本+代码混合。

见：[大模型词表扩充必备工具](https://zhuanlan.zhihu.com/p/630696264)
