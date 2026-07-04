# Evaluation

> AI 系统评估与测试方法论，涵盖模型评估框架、可观测性平台和可重复性实践。

## Evaluation Framework

- [评估框架](/maps/_ai/evaluation/evaluation-framework) - lm-evaluation-harness、BigCode 等统一评估框架

## Observability

- [可观测性](/maps/_ai/evaluation/observability) - LangSmith、Phoenix、Langfuse 等 LLM 可观测性平台

## Reproducibility

- [可重复性](/maps/_ai/evaluation/reproducibility) - ML 可重复性核心实践与 PyTorch 配置指南

## 自动化的边界条件

#### 可验证性是 LLM 自动化的边界

Karpathy 给出了一条简明的判别原则：

> 传统计算机容易自动化你能写进代码的东西；这一代 LLM 容易自动化你能验证的东西。

传统软件自动化的前提是规则可显式表达——税率计算、排序、订单状态流转。LLM 自动化的前提变成“能某种方式判断输出好坏”——数学题可对答案、代码可跑测试、漏洞可复现。这类任务能进入 RL 环境，让模型在大量样本中优化。模型在数学、
代码与相邻领域能力快速上升，本质上是“实验室能造出多少可验证奖励环境”的副产品。

这也指向创业的一个具体方向：找到大模型实验室还未覆盖、但可以构造可验证奖励环境的具体问题。Karpathy 进一步推测，几乎所有任务最终都可能在某种程度上变得可验证——写作、设计可以用 LLM judges 形成近似评价——
但易难程度差别巨大。

见：[Karpathy 最新访谈：Vibe Coding 只是开始，真正重要的是 Agentic Engineering](https://baoyu.io/blog/andrej-karpathy-from-vibe-coding-to-agentic-engineering)
