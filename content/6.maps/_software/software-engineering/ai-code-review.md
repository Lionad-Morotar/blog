---
title: AI 代码评审
description: 阿里 Open Code Review 等 AI 代码评审工具的架构设计与工程实践
---

#### 确定性工程与 Agent 的边界划分决定评审稳定性

通用 Agent 做代码评审时常见的覆盖不全、位置漂移、效果不稳定，根因在于纯语言驱动架构缺乏对评审流程的强约束。Open Code Review 将文件筛选、文件打包、规则匹配、评论定位等"不能出错"的环节交给确定性工程；
把动态上下文召回、风险判断等需要语义理解的环节交给 Agent。这种边界划分让行为可预期、可调试，同时保留 Agent 的推理深度，也比纯 Agent 方案在开源评测集上获得更高的准确率与 F1。
GitHub README 明确将这一架构描述为 "Deterministic + Agent：engineering modules handle certainty，Agents handle semantics"。

见：[Open Code Review 官方文档](https://alibaba.github.io/open-code-review/)、[Open Code Review GitHub](https://github.com/alibaba/open-code-review)

#### 用 existing_code 片段替代行号解决位置漂移

LLM 直接输出行号容易偏移，复述代码又可能篡改原文（偏差率约 30%）。Open Code Review 要求模型通过 code_comment 工具给出 existing_code 片段，
系统在 diff hunks 上做归一化连续行匹配；匹配失败再回退到全文件扫描；仍失败则调用 LLM 重定位。三层递进式定位把评论位置准确率推到 97% 以上，其核心是把"定位"从 LLM 的语义能力转移给工程的文本匹配能力。

见：[阿里开源 Open Code Review：一周揽下 5k star，更专业的代码评审 CLI](https://www.bestblogs.dev/article/3732f5a7)

#### 从含噪用户反馈中蒸馏反思模型降低误报

生产环境的用户反馈天然带噪："忽略"里混着正确和错误的判断。ConceptRM 方法用少量专家标注作锚点，构造不同噪声比例的扰动数据集，通过协同训练多个差异化模型、以共识决策清洗出可靠负样本，从而在极低标注成本下训练出高效的反思模型。
阿里内部落地中，该模型把误报拦截率从 30.09% 提升到 52.63%，平均耗时从主模型 5 秒降到 500ms 内。

见：[ConceptRM: Consensus-Based Purity-Driven Data Cleaning for Reflection Modelling](https://arxiv.org/abs/2602.20166)

#### AI 评审质量应以过程轨迹与客观评测集量化

当 AI 评论占比达到 80%，采纳率、AI 生成占比等指标会失真——它们反映用户行为而非评审本身的质量。更可靠的评估方式是：基于运行轨迹对过程评估、基于 AACR-Bench 这类客观评测集对结果量化。
AACR-Bench 由 80+ 资深工程师交叉标注，覆盖 10 种语言、50 个仓库、200 个真实 PR，问题覆盖率相比原始 PR 评论提升 285%，并揭示上下文粒度与检索方法对模型表现的显著影响。

见：[AACR-Bench: Evaluating Automatic Code Review with Holistic Repository-Level Context](https://arxiv.org/abs/2601.19494)、[alibaba/aacr-bench](https://github.com/alibaba/aacr-bench)

