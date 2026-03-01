---
title: AI Core Concepts
description: 20个AI核心概念一句话速查
---

# AI Core Concepts

20个AI核心概念的一句话总结，涵盖神经网络基础、LLM机制、推理技巧和应用模式。

见：[20 AI Concepts Explained Simply](https://blog.algomaster.io/p/20-ai-concepts-explained-simply)

## 神经网络基础

#### Neural Network（神经网络）？

由神经元组成的层级结构，通过逐层转换输入来生成预测。

#### Transfer Learning（迁移学习）？

复用预训练模型进行新任务，而非从头训练，从而获得强劲的先发优势。

#### Embeddings（嵌入向量）？

捕获语义的向量表示，使语义相似的词在高维向量空间中距离相近。

#### Attention（注意力机制）？

让每个token能够查看输入中的其他所有token，并决定哪些对理解上下文更重要。

#### Transformer？

出自论文"Attention Is All You Need"的架构，使用堆叠的注意力层并行处理token。

## LLM核心机制

#### LLM（大语言模型）？

在数千亿到数万亿token上训练的Transformer，核心能力是预测下一个token。

#### Tokenization（分词）？

将文本转换为token（词、子词或字符）的过程，基于固定的词汇表进行映射。

#### Context Window（上下文窗口）？

模型一次能处理的最大token数量，相当于LLM的工作记忆容量。

#### Temperature（温度参数）？

控制token选择随机性的参数，0表示确定性输出，1+表示 increasingly random。

#### Hallucination（幻觉）？

LLM生成听起来自信可信但实际上不正确或虚构的内容。

## 训练与优化

#### Fine-tuning（微调）？

在特定任务的小数据集上继续训练预训练模型，使其向特定行为方向调整。

#### RLHF（基于人类反馈的强化学习）？

利用人类对模型回答的排序来训练奖励模型，使LLM输出更有帮助、礼貌且安全。

#### LoRA（低秩适配）？

冻结原始权重，仅添加少量可训练的适配器矩阵，用0.1%到1%的参数实现高效微调。

#### Quantization（量化）？

将权重精度从32位降至16/8/4位，大幅缩减模型体积并降低内存使用。

## 推理技巧

#### Prompt Engineering（提示工程）？

通过角色设定、 few-shot 示例等技巧精心构造输入，以获得更好的模型输出。

#### Chain of Thought（思维链）？

让模型在给出最终答案前逐步展示推理过程，提高复杂任务的准确性。

#### RAG（检索增强生成）？

在生成回答前先检索相关文档，使模型输出基于真实、最新的信息。

#### Vector Database（向量数据库）？

存储嵌入向量并通过相似度搜索实现"按语义而非关键词"检索的数据库。

## 应用与生成

#### AI Agents（AI智能体）？

能够执行操作、做出决策并与外部工具交互的LLM，通过观察-思考-行动循环完成任务。

#### Diffusion Models（扩散模型）？

通过学习逆转噪声腐蚀过程来生成数据，从随机噪声逐步恢复出结构化信号。
