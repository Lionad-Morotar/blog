# Andrej Karpathy

> AI 研究员、教育家，OpenAI 创始成员，前 Tesla AI 高级总监

#### 简介？

Andrej Karpathy 是斯洛伐克裔加拿大计算机科学家，1986 年出生于捷克斯洛伐克。他是斯坦福大学李飞飞教授的学生，博士期间专注于深度学习与计算机视觉。Karpathy 是 OpenAI 的创始成员和研究科学家，
后担任 Tesla AI 高级总监，领导自动驾驶的计算机视觉团队。2023 年离开 Tesla 后回归 OpenAI，2024 年离职专注于 AI 教育。他被网友称为"赛博活佛"，因其将复杂的 AI 概念讲解得深入浅出。

#### 主要贡献/观点？

**LLM 科普教育**

制作了多个面向普通观众的高质量 LLM 科普视频，包括：

- 《State of GPT》- 详解大模型训练流程（预训练、SFT、RLHF）
- 《How I use LLM》- 实用的大模型使用指南，涵盖提示技巧、工具选择、生态系统

**神经网络教育框架**

开发了 [micrograd](https://github.com/karpathy/micrograd) 和 [llm.c](https://github.com/karpathy/llm.c) 等教学项目，用最精简的代码展示核心原理。llm.c 仅需约 1000 行 C 代码即可训练 GPT-2 级别的语言模型。

**对 LLM 本质的理解**

提出 LLM 是"数据标注员的神经网络模拟"的观点——监督微调阶段的模型本质上是学习了人类标注员的回复风格。同时强调 LLM 的"瑞士奶酪"能力特征：在某些任务上表现惊艳，却在简单任务上有出人意料的盲点。

**思考可外包，理解不可外包**

在 2026 年 4 月 Sequoia Ascent 访谈中，Karpathy 引用并阐释了一句格言："你可以外包你的思考，但不能外包你的理解。" 他自述正在变成系统的瓶颈——必须知道在建什么、为什么值得做、如何指导 Agent。
Agent 可以记 API 细节、写支付逻辑、生成大量代码、跑很多个方案；但人要理解张量与内存模型、判断身份与资金的绑定方式、识别抽象是否臃肿、决定目标是否值得做。

这个判断有自我隐含张力——他自己也承认，品味与判断之所以暂时不可替代，"原因只是实验室还没把审美奖励纳入 RL 目标"。如果几乎所有领域最终都能被验证，则瓶颈最终从执行端移向目标设定端，但人类不可替代部分的有效期仍是开放问号。

**强化学习的潜力**

认为思考型模型（如 o1、o3-mini）通过强化学习在可验证领域（数学、代码）发现的思考策略，可能代表 AI 超越人类水平的新范式，类似 AlphaGo 的"第37手"。

#### 代表作品？

- [State of GPT](https://www.youtube.com/watch?v=bZQun8Y4L2A) (2023) - 微软 Build 大会演讲，详解大模型训练
- [How I use LLM](https://www.youtube.com/watch?v=EWvNQjAaOHw) (2025) - 实用的大模型使用指南
- [llm.c](https://github.com/karpathy/llm.c) - 纯 C 语言实现的大模型训练
- [nanoGPT](https://github.com/karpathy/nanoGPT) - 最简洁的 GPT 训练实现

见：[YouTube 频道](https://www.youtube.com/@AndrejKarpathy) | [个人网站](https://karpathy.ai/) | [GitHub](https://github.com/karpathy)
