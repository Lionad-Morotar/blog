# 提示工程 (Prompt Engineering)

## DSPy：声明式提示编程框架

DSPy 是斯坦福 NLP 团队开源的框架，将提示工程从"手工调优"转变为"编程优化"。核心抽象包括 Signature（声明输入输出语义）、Module（可组合的计算单元）、Optimizer（自动优化提示和权重）、Teleprompter（少样本示例编译器）。开发者只需描述任务逻辑，DSPy 自动优化提示词、选择示例、微调小模型，在多跳问答等任务上超越手工提示。

见：[DSPy GitHub](https://github.com/stanfordnlp/dspy) | [DSPy 文档](https://dspy.ai/) | [DSPy 论文](https://arxiv.org/abs/2310.03714)

## Instructor：结构化输出解析库

Instructor 基于 Pydantic 构建，解决 LLM 输出结构化的问题。通过定义数据模型类，自动将 LLM 的文本响应解析为强类型对象，内置重试、验证、流式处理。支持 OpenAI、Anthropic、Gemini 等主流模型，是生产环境中类型安全调用 LLM 的首选方案。

见：[Instructor GitHub](https://github.com/jxnl/instructor) | [Instructor 文档](https://python.useinstructor.com/)

## Guidance：约束生成控制模板

Guidance 提供模板语法控制 LLM 的生成过程，支持在生成中强制特定格式（JSON、正则匹配）、动态选择分支、变量插值。通过控制流与生成交错，大幅减少无效输出和后续解析失败，适合需要严格输出格式的场景。

见：[Guidance GitHub](https://github.com/guidance-ai/guidance)

## Outlines：可靠的文本结构化生成

Outlines 通过预编译正则表达式或 JSON Schema 到高效索引结构，实现完全符合格式的生成。与 Guidance 相比更轻量、性能更高，支持批量生成和多种模型后端，是结构化生成的现代替代方案。

见：[Outlines GitHub](https://github.com/outlines-dev/outlines) | [Outlines 文档](https://dottxt-ai.github.io/outlines/)

## 工具选型指南

选择取决于控制粒度：Instructor 适合"解析已知格式的响应"，Pydantic 验证确保类型安全；Guidance/Outlines 适合"强制模型按格式生成"，从源头约束输出结构。DSPy 则用于系统级优化，自动迭代提示策略。实际项目中常组合使用：Outlines 控制格式，Instructor 验证解析，DSPy 优化整体流程。

见：[DSPy vs Instructor 对比](https://www.linkedin.com/pulse/dspy-vs-instructor-pydantic-ai-which-one-right-you-answer-sancare-phdie) | [Outlines vs Guidance 性能对比](https://github.com/outlines-dev/outlines/blob/main/benchmarks/benchmark_readme.md)
