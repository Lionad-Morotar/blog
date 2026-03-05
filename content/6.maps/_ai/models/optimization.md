---
title: Optimization
description: Model optimization techniques
original_path: _ai/optimization.md
---
## Flash Attention：内存高效的注意力计算

Flash Attention 由 Tri Dao 开发，通过分块计算（tiling）和重计算（recomputation）策略，将注意力计算从 O(N²) 内存复杂度降至 O(N)，同时保持计算精度不变。Flash Attention-3 进一步优化 Hopper GPU，利用 Tensor Core 异步执行，支持 2-4 倍更长序列，实际计算速度提升 2-4 倍。

见：[Flash Attention GitHub](https://github.com/Dao-AILab/flash-attention) | [Flash Attention-3 博客](https://tridao.me/blog/2024/flash3/) | [Flash Attention 论文](https://arxiv.org/abs/2205.14135)

## bitsandbytes：8-bit/4-bit 量化训练

bitsandbytes 是 Hugging Face 生态的量化训练库，提供 8-bit AdamW、4-bit 量化训练等功能。与 PEFT 结合实现 QLoRA——4-bit 量化基础模型权重，冻结量化权重，训练 LoRA 适配器，训练时动态反量化，推理时保持量化。让 7B 模型能在消费级 GPU（如 RTX 3090）上微调。

见：[bitsandbytes GitHub](https://github.com/bitsandbytes-foundation/bitsandbytes) | [QLoRA 论文](https://arxiv.org/abs/2305.14314)

## GPTQ：训练后 INT4 量化

GPTQ 是训练后量化（PTQ）方法，通过逐层量化并补偿误差，将模型压缩至 INT4 精度。适合部署场景，无需重新训练。广泛应用于 llama.cpp、Ollama 等本地推理框架，可在单卡加载 2-3 倍大的模型。

见：[GPTQ 论文](https://arxiv.org/abs/2210.17323) | [GPTQ vs AWQ 对比](https://www.newline.co/@zaoyang/gptq-vs-awq-quantization--d792476e)

## AWQ：激活感知权重量化

AWQ（Activation-aware Weight Quantization）发现"并非所有权重的贡献相同"——保护对激活值影响大的权重通道，可以显著减少量化损失。相比 GPTQ，perplexity 损失更小，支持 INT4 乘加指令，吞吐提升 2-3 倍，与 TensorRT-LLM、vLLM 集成良好。

见：[AWQ 论文](https://arxiv.org/abs/2306.00978) | [AWQ GitHub](https://github.com/mit-han-lab/llm-awq) | [AWQ 深度解析](https://leimao.github.io/blog/AWQ-Activation-Aware-Weight-Quantization/)

## GGUF：llama.cpp 本地推理格式

GGUF（GPT-Generated Unified Format）是 llama.cpp 项目的模型格式，专为本地 CPU/GPU 推理优化。支持多种量化方案：Q4_0（极致压缩）、Q4_K_M（平衡选择）、Q5_K_M（质量优先）、Q8_0（接近无损）。是 Ollama、LM Studio 等本地 LLM 工具的标准格式。

见：[GGUF 格式规范](https://github.com/ggerganov/ggml/blob/master/docs/gguf.md) | [GGUF 量化选择指南](https://kaitchup.substack.com/p/choosing-a-gguf-model-k-quants-i) | [llama.cpp 量化论文](https://arxiv.org/pdf/2601.14277)
