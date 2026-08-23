---
title: 模型与 Harness 的训练耦合
description: 模型后训练日益适配特定 Harness 的工具 Schema，导致第三方 Harness 上工具调用退化、Schema 不再中性的现象、机制与对策。
---

模型能力的评测与使用越来越无法脱离其训练时所适配的 Harness。这里记录模型后训练与特定 Harness 工具生态互相耦合的证据、机制与工程对策。

#### 工具 Schema 不再中性：后训练过拟合主导 Harness

新一代 Claude 模型（Opus 4.8、Sonnet 5）在第三方 harness Pi 上调用其 edit 工具时，oldText/newText 本体逐字节正确，
却会在对象尾部现场编造 requireUnique、matchCase、oldText2 等不存在的键；旧模型完全没有这一行为。
该失败强依赖上下文：单轮新会话无法复现，长 agentic 历史里约 20% 失败率，剥离历史中的思考块减半，
开启严格约束采样后消失。

其机制在于后训练环境：厂商的 RL 环境就是自家 harness 或其仿真，而该 harness 极其宽容——接受参数别名、
静默过滤未知键、修复 Unicode、重试坏调用，畸形调用照样完成任务拿到奖励，模型没有梯度学会"不要编造键"。
同时模型对主导 harness 的规范 schema 形成强先验，遇到不同 shape 的同语义工具时反而更用力地反抗。
工程含义是工具 schema 不再是中性契约：第三方 harness 要么向主导 shape 靠拢，要么在采样层启用
严格约束解码兜底——Pi 在问题曝光后的版本里加入了实验性 strict JSON-schema 约束采样作为直接回应。

见：[Better Models: Worse Tools](https://lucumr.pocoo.org/2026/7/4/better-models-worse-tools/)
