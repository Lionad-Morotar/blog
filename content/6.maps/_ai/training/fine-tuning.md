---
title: Fine-tuning
description: Model fine-tuning techniques and best practices
original_path: _ai/fine-tuning.md
---
## Axolotl：YAML 配置驱动的微调框架

Axolotl 的核心理念是"用 YAML 定义整个训练流程"——从数据预处理、模型加载、训练配置到导出部署，全部收敛在一个配置文件中。这种声明式接口降低了微调门槛，支持 LoRA/QLoRA、全参数微调、多模态微调和持续预训练。2025 年 2 月新增 LoRA 优化，在单 GPU 和多 GPU 训练中进一步降低内存占用并提升训练速度。

见：[Axolotl GitHub](https://github.com/axolotl-ai-cloud/axolotl) | [Axolotl 官方文档](https://docs.axolotl.ai/)

## LLaMA-Factory：一站式 LLM 训练与部署平台

LLaMA-Factory 是目前最全面的开源微调框架，支持 100+ 模型架构，提供 Web UI 界面让非技术人员也能轻松操作。其特色是集成了模型量化、合并、导出等全流程工具，微调完成后可直接生成 GGUF、vLLM 等部署格式。通过可扩展的模块统一了多种高效微调方法，让大模型微调真正普及。

见：[LLaMA-Factory GitHub](https://github.com/hiyouga/LLaMA-Factory) | [LLaMA-Factory 使用指南](https://zhuanlan.zhihu.com/p/694047673)

## LoRA：低秩适配的参数高效微调

LoRA（Low-Rank Adaptation）冻结预训练模型权重，注入可训练的秩分解矩阵到每一层：W = W_0 + BA，其中 W_0 冻结，B 和 A 可训练且秩远小于 W。这种方法将训练参数量减少 10000 倍，同时保持与全参数微调相当的性能，是在消费级 GPU 上微调大模型的标准选择。

见：[LoRA 论文](https://arxiv.org/abs/2106.09685) | [Hugging Face LoRA 教程](https://huggingface.co/learn/llm-course/en/chapter11/4)

## QLoRA：量化 + LoRA 的极致内存优化

QLoRA 将 4-bit 量化与 LoRA 结合，实现最大内存效率。全参数微调 70 亿参数模型需要 100-120GB 显存，而 QLoRA 仅需约 10GB，让消费级 GPU 也能微调大模型。量化后的模型权重以低精度存储，计算时动态反量化，配合 LoRA 的可训练适配器，在效率和效果之间取得完美平衡。

见：[LoRA vs QLoRA - RedHat](https://www.redhat.com/en/topics/ai/lora-vs-qlora) | [IBM QLoRA 文档](https://www.ibm.com/docs/en/watsonx/w-and-w/2.1.0?topic=tuning-qlora-fine)

## PEFT：Hugging Face 参数高效微调库

PEFT（Parameter-Efficient Fine-Tuning）是 Hugging Face 开源的参数高效微调库，集成了 LoRA、Prefix Tuning、Prompt Tuning、IA³、Adapter 等多种方法。它让研究者可以用统一接口尝试不同微调策略，无需修改模型代码即可切换方法，极大简化了实验流程。

见：[PEFT GitHub](https://github.com/huggingface/peft) | [PEFT 方法概览](https://huggingface.co/docs/peft/en/conceptual_guides/adapter)

## Unsloth：手写 CUDA 内核的极速微调

Unsloth 通过手写 CUDA 内核和算法优化，在保持精度的前提下将微调速度提升 2-5 倍，显存占用降低 50%+。它针对 LLM 训练中的热点操作（RoPE、LayerNorm、Cross-Entropy）定制 CUDA 实现，支持与 PEFT 完全兼容，只需修改几行导入语句即可加速现有 LoRA/QLoRA 训练代码。

见：[Unsloth 官网](https://unsloth.ai/) | [Unsloth 博客](https://unsloth.ai/blog)
