# 可观测性 (Observability)

## LangSmith：LangChain 生态追踪平台

LangSmith 是 LangChain 官方的可观测性平台，与 LangChain 生态深度集成。提供调用链可视化、错误定位与重放、批量测试评估、生产指标仪表盘。2025 年推出 LangSmith Fetch CLI 工具，可直接在终端和 IDE 中调试 Agent 追踪数据。适合已使用 LangChain 构建应用的团队，但部分功能需付费，不支持自托管。

见：[LangSmith 官网](https://smith.langchain.com/) | [LangSmith Fetch 发布](https://blog.langchain.com/introducing-langsmith-fetch/) | [Deep Agents 调试指南](https://blog.langchain.com/debugging-deep-agents-with-langsmith/)

## Phoenix：开源 LLM 可观测性平台

Phoenix 由 Arize AI 开发，是完全开源的 LLM 可观测性解决方案。基于 OpenTelemetry 标准实现框架无关的追踪，提供 RAG 检索质量可视化、Embedding 向量空间探索、内置 Evals 评估库。支持自托管，与 MLflow 等 MLOps 工具集成良好，是企业级可观测性的首选开源方案。

见：[Phoenix GitHub](https://github.com/Arize-ai/phoenix) | [Phoenix 官网](https://phoenix.arize.com/) | [LLM Evals 库](https://arize.com/docs/phoenix/evaluation/llm-evals)

## Langfuse：开源可观测性新选择

Langfuse 是 2025 年快速崛起的开源 LLM 可观测性平台，提供 Traces 追踪、Evals 评估、Prompt 管理、Metrics 指标分析。支持 OpenAI、LangChain、LlamaIndex、LiteLLM 等 10+ 集成，采用 OpenTelemetry 标准。作为完全开源的欧洲产品，是重视数据主权团队的理想选择。

见：[Langfuse 官网](https://langfuse.com/) | [Langfuse Wrapped 2025](https://langfuse.com/wrapped)

## OpenTelemetry：开放追踪标准

OpenTelemetry 成为 LLM 可观测性的事实标准，提供与框架无关的 instrumentation 能力。Traceloop (OpenLLMetry) 是基于 OpenTelemetry 的 SDK，实现 LLM 应用的统一追踪和指标采集。采用开放标准可避免 vendor lock-in，实现跨平台数据兼容。

见：[OpenLLMetry GitHub](https://github.com/traceloop/openllmetry) | [OpenTelemetry 官网](https://opentelemetry.io/)

## 工具选型指南

LangSmith 适合 LangChain 生态用户，功能完善但需付费；Phoenix 适合需要自托管和 RAG 分析的团队，完全开源；Langfuse 适合重视数据主权和 Prompt 管理的场景；OpenTelemetry 方案适合追求开放标准和技术自主的团队。实际部署中，开发阶段可用 LangSmith 快速上手，生产环境考虑 Phoenix 或 Langfuse 自托管以控制成本和数据安全。

见：[2025 LLM 可观测性工具榜单](https://www.firecrawl.dev/blog/best-llm-observability-tools) | [LangSmith vs Phoenix 对比](https://medium.com/@aunraza021/langsmith-vs-phoenix-by-arize-ai-choosing-the-right-tool-for-llm-observability-0b4c2f21c077)
