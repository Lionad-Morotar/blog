---
title: MLOps
description: 机器学习运维平台与工具，包括 Weights & Biases、MLflow、TensorBoard 等实验跟踪和模型管理方案。
original_path: _ai/mlops.md
---

# MLOps

## Weights & Biases：商业 MLOps 平台事实标准

W&B 是商业 MLOps 平台的事实标准，提供实验跟踪、超参搜索、模型管理、协作报告等一站式能力。核心功能包括自动记录超参/指标/输出、Artifact 版本追踪、Sweeps 分布式超参搜索、交互式实验报告。是 LLM 微调实验跟踪的首选工具。

见：[W&B 官网](https://wandb.ai/) | [W&B LLM 专项功能](https://wandb.ai/site/solutions/llm-fine-tuning/) | [W&B 实验跟踪](https://wandb.ai/site/experiment-tracking/)

## MLflow：开源 ML 生命周期管理

MLflow 是 Databricks 开源的 MLOps 平台，模块化设计可独立使用各组件：Tracking（实验记录）、Projects（可复现工作流打包）、Models（模型格式标准化）、Registry（模型版本管理）。完全开源、自建托管，适合需要数据主权和成本控制的企业。

见：[MLflow 官网](https://mlflow.org/) | [MLflow Model Registry](https://mlflow.org/docs/latest/ml/model-registry/) | [MLflow GitHub](https://github.com/mlflow/mlflow)

## TensorBoard：基础可视化工具

TensorBoard 是 TensorFlow 配套的可视化工具，也支持 PyTorch（通过 torch.utils.tensorboard）。适合小规模实验快速可视化、训练曲线和学习率监控、嵌入向量降维可视化。轻量易用，是调试训练过程的常用工具。

见：[TensorBoard 文档](https://www.tensorflow.org/tensorboard)

## LLM 专项 MLOps 挑战

LLM 带来独特挑战：模型文件巨大（7B 模型 14GB，版本管理困难）、训练周期长（需要断点续训和容错）、评估复杂（多维度基准测试）、对齐流程多阶段（SFT → DPO → RLHF）。解决方案包括模型注册表（MLflow Model Registry、W&B Artifacts）、分布式跟踪（Ray Train + W&B 集成）、评估集成（lm-eval-harness 结果自动记录）、Prompt 版本管理（W&B Prompts）。

见：[LLMOps 工具集](https://github.com/tensorchord/Awesome-LLMOps) | [2025 MLOps 工具榜单](https://www.datacamp.com/blog/top-mlops-tools)

## 可重复性与实验管理

可重复性是 ML 系统的核心支柱，涉及随机种子固定、数据版本控制、环境容器化等关键实践。详见 [ML 可重复性](./reproducibility.md)。
