# 分布式 (Distributed Training)

## DeepSpeed：ZeRO 优化器的显存革命

DeepSpeed 是微软开源的深度学习优化库，核心是 ZeRO（Zero Redundancy Optimizer）技术。通过三个阶段逐步释放显存压力：ZeRO-1 优化器状态分片节省 4x 显存，ZeRO-2 梯度分片再节省 2x，ZeRO-3 参数分片再节省 2x 并支持单卡加载超大模型。它是训练 100B+ 参数模型的首选方案，支持流水线并行、张量并行与 ZeRO 的组合。

见：[DeepSpeed GitHub](https://github.com/deepspeedai/DeepSpeed) | [ZeRO 论文](https://www.microsoft.com/en-us/research/blog/zero-deepspeed-new-system-optimizations-enable-training-models-with-over-100-billion-parameters/) | [DeepSpeed 官网](https://www.deepspeed.ai/)

## FSDP：PyTorch 原生全分片数据并行

FSDP（Fully Sharded Data Parallel）是 PyTorch 官方的大模型分布式方案，设计理念与 DeepSpeed ZeRO-3 类似，但集成更紧密。它将模型参数、梯度和优化器状态分片到多个 GPU 上，在保持通信开销不变的同时显著降低单卡内存占用。API 简洁，与 PyTorch 生态无缝集成，适合快速迭代的研究场景。

见：[PyTorch FSDP 文档](https://docs.pytorch.org/tutorials/intermediate/FSDP_advanced_tutorial.html) | [FSDP 介绍](https://pytorch.org/blog/introducing-pytorch-fully-sharded-data-parallel-api/) | [FSDP vs DeepSpeed 对比](https://huggingface.co/docs/accelerate/en/concept_guides/fsdp_and_deepspeed)

## Megatron-Core：万亿参数模型的训练框架

Megatron-Core 是 NVIDIA 专为万亿参数模型设计的训练框架，提供张量并行（层内切分，适合单节点多卡）、流水线并行（层间切分，适合多节点）、序列并行（长序列场景降低激活显存）的原生实现。通过 8 路张量并行和 8 路流水线并行，可在 1024 张 A100 上训练 175B 参数的 GPT-3 模型。

见：[Megatron-LM GitHub](https://github.com/NVIDIA/Megatron-LM) | [Megatron 并行策略指南](https://docs.nvidia.com/megatron-core/developer-guide/latest/user-guide/parallelism-guide.html) | [万亿参数训练](https://developer.nvidia.com/blog/scaling-language-model-training-to-a-trillion-parameters-using-megatron/)

## Accelerate：Hugging Face 分布式封装

Accelerate 是 Hugging Face 提供的分布式训练封装库，让单卡代码几乎零改动扩展到多卡/多机。只需几行代码即可完成模型、优化器、数据加载器的分布式准备。支持 DeepSpeed、FSDP、Megatron 等多种后端，提供统一的配置界面，是研究实验快速迭代的利器。

见：[Accelerate 文档](https://huggingface.co/docs/accelerate/index) | [Accelerate GitHub](https://github.com/huggingface/accelerate)

## 分布式训练选择指南

模型规模决定并行策略：< 7B 单卡或 DDP 足够，7B-70B 使用 FSDP 或 DeepSpeed ZeRO-3，70B+ 需要 Megatron-Core 配合多种并行组合。场景偏好：研究/实验推荐 Accelerate + FSDP 快速迭代，生产部署选择 DeepSpeed 功能全面，超大规模训练使用 Megatron-Core 配合 NVIDIA 优化。

见：[分布式训练完整指南](https://sumanthrh.com/post/distributed-and-efficient-finetuning/) | [LLaMA-Factory 分布式](https://llamafactory.readthedocs.io/en/latest/advanced/distributed.html)
