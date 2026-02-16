# 评估 (Evaluation)

## lm-evaluation-harness：统一评估框架

lm-evaluation-harness 由 EleutherAI 开发，提供统一的接口测试生成式语言模型在 60+ 学术基准上的表现，解决了各基准实现不一致、结果不可比的问题。支持 MMLU（多学科知识，15,908 题）、GSM8K（数学推理，1,319 题）、HellaSwag（常识推理）、HumanEval（代码生成）、BBH（复杂推理）、TruthfulQA（事实性）等核心基准。

见：[lm-evaluation-harness GitHub](https://github.com/EleutherAI/lm-evaluation-harness) | [lm-eval 使用指南](https://blog.csdn.net/M00Rue_/article/details/148063263)

## BigCode：代码能力评估

BigCode 项目专注于代码大模型的评估，提供 HumanEval（手写函数补全，164 题）、MBPP（Python 编程问题，约 1000 题）、DS-1000（数据科学场景代码）、BigCodeBench（更复杂的实际编程任务，需调用多个工具）等基准。HumanEval Pro 和 MBPP Pro 是新一代基准，支持自调用代码生成评估。

见：[BigCode 项目](https://bigcode-project.org/) | [BigCodeBench](https://huggingface.co/blog/leaderboard-bigcodebench) | [EvalPlus Leaderboard](https://evalplus.github.io/leaderboard.html)

## 评估维度：知识、推理、代码、安全

基础能力包括知识问答（MMLU、ARC）、阅读理解（RACE、SQuAD）、推理能力（GSM8K、BBH）；专业能力涵盖代码（HumanEval、MBPP）、科学（GPQA、TheoremQA）、多语言（XNLI、MGSM）；安全性评估包括有害内容检测、越狱测试（AdvBench、HarmBench）、指令遵循（IFEval）。

见：[Hugging Face Open LLM Leaderboard](https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard)

## 评估最佳实践

避免数据污染：使用训练集 cut-off 日期后的基准，检查训练语料是否包含测试数据，对敏感任务使用动态评估（hold-out）。统计显著性：多次运行取平均，报告标准差，使用配对 t-test 比较模型差异。

见：[自定义评估基准构建](https://blog.csdn.net/gitblog_00326/article/details/151852170)
