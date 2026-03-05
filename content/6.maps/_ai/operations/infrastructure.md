---
title: Infrastructure
description: AI 基础设施与云平台，包括 Modal、Lambda Labs、SkyPilot 等 Serverless GPU 和多云编排方案。
original_path: _ai/infrastructure.md
---
## Modal：Python 原生的 Serverless GPU 平台

Modal 是面向 AI/ML 工程师的 Serverless 计算平台，核心卖点是"Python-native"——用纯 Python 代码定义计算任务，自动处理容器化、调度、扩缩容。支持从 0 到数百 GPU 的秒级扩容，按秒计费，用后即焚。内置高性能分布式文件系统，大模型权重秒级加载。适合快速原型验证和推理服务部署。

见：[Modal 官网](https://modal.com/) | [Modal 文档](https://modal.com/docs) | [Serverless GPU 对比](https://modal.com/blog/serverless-gpu-article)

## Lambda Labs：高性价比 AI 云服务商

Lambda Labs 是专注 AI 工作负载的云服务商，以高性价比 GPU 实例著称。相比 AWS/GCP，Lambda 的 GPU 价格通常低 50%+，且提供即时可用的实例（无需排队）。支持 NVIDIA B200、H100、A100、GH200 等最新 GPU，提供按小时计费的 GPU 实例和长期租用的私有集群，是训练任务的性价比之选。

见：[Lambda Labs 官网](https://lambda.ai/) | [Lambda 定价](https://lambda.ai/pricing) | [H100 vs A100 对比](https://lambda.ai/blog/deepchat-3-step-training-at-scale-nvidia-h100-sxm5-vs-a100-sxm4)

## SkyPilot：多云 AI 编排框架

SkyPilot 是伯克利大学 Sky Computing Lab 开源的多云编排工具，目标是"Run AI on Any Infrastructure"。它抽象了不同云厂商的差异，支持 AWS、GCP、Azure、Lambda、Kubernetes、Slurm 等多种基础设施，自动选择最便宜的可用区域和实例类型，实例被抢占时自动迁移，让用户专注算法而非基础设施。

见：[SkyPilot 官网](https://skypilot.co/) | [SkyPilot 文档](https://docs.skypilot.co/) | [SkyPilot 论文](https://www.usenix.org/system/files/nsdi23-yang-zongheng.pdf)

## 基础设施选型指南

快速原型和推理服务推荐 Modal，开发效率最高；长期训练任务推荐 Lambda Labs，性价比最优；多云和混合云场景推荐 SkyPilot，避免厂商锁定；企业级需求选择 AWS/GCP/Azure，生态最完善。实际选择应权衡开发效率、成本、可迁移性和合规要求。

见：[Cloud GPUs 完整对比](https://fullstackdeeplearning.com/cloud-gpus/) | [SkyPilot vs Modal 对比](https://www.linkedin.com/pulse/skypilotvllmaws-vs-modal-which-platform-should-power-ai-ramkumar-zqghe)
