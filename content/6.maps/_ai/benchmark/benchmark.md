---
title: LLM Benchmark
description: 各类大语言模型的基准测试结果与排行榜资源。
original_path: _ai/benchmark.md
---

## 基准测试

* [Arena.ai](https://arena.ai/zh/leaderboard/code)：经典大模型竞技场

* [SanityHarness](https://sanityboard.lr7.dev/)：Agentic 基准

* [ZigScan](https://raw.githubusercontent.com/gnusec/AI-PK/refs/heads/main/results/REPORT_ZH.html)

真实世界 AI 编码代理性能基准

* [Agentic、Safety、Frontier、Legacy LBs](https://scale.com/leaderboard/mcp_atlas)

* [LLM Stats](https://llm-stats.com/benchmarks)：LLM 综合评测基准聚合平台，涵盖 Coding、Tool Calling、Long Context、Image Understanding、Math & Science 等多维度评测

* [Repo Prompt](https://repoprompt.com/bench)：长上下文推理、文件编辑精度和指令遵循能力 Benchmark

* [Web Frameworks Token Efficiency](https://martinalderson.com/posts/which-web-frameworks-are-most-token-efficient-for-ai-agents/)：19 个 Web 框架的 AI Agent token 效率对比，Minimal API 框架（如 ASP.NET Minimal）效率最高，全功能框架中 SvelteKit 和 Django 表现最佳

长上下文推理、文件编辑精度和指令遵循能力 Benchmark

* [Artificial Analysis AI Trends](https://artificialanalysis.ai/trends)

#### LMSYS Chatbot Arena

[LMSYS Chatbot Arena](https://lmarena.ai/) 是基于人类对比的模型排行榜。人类对模型输出进行盲测评判，计算 Elo 排名。这是目前最受信任的模型评估方式之一，但近期可能存在被"刷榜"的情况，建议作为参考而非唯一标准。

见：[LMSYS Chatbot Arena](https://lmarena.ai/)

#### AI News 简报

[AI News](https://buttondown.com/ainews/) 是由 Swyx 等人维护的综合性 AI 资讯简报，几乎每两天更新一次。内容包含人工精选和 LLM 自动整理的 AI 领域最新动态，涵盖论文、产品、社区讨论等，是跟踪 AI 快速发展的有效渠道。

见：[AI News 归档](https://buttondown.com/ainews/archive/)

#### SWE-bench Verified 的两大核心问题

OpenAI 的分析表明，SWE-bench Verified 已不适合衡量前沿模型的编程能力，主要存在两个问题：

1. **测试用例设计缺陷（约 59.4% 的失败题目）**：
   - **过窄测试（35.5%）**：测试强行限定具体实现细节，导致功能正确的解法被判错
   - **过宽测试（18.8%）**：测试检查问题描述中未提及的额外功能
   - 例如：测试直接导入函数名 `get_annotation`，但该名称从未在问题描述中出现

2. **数据污染（训练数据泄露）**：
   - 前沿模型能逐字复现"金标准补丁"（gold patch）
   - 模型甚至能背出任务的具体描述
   - 接触原题的模型在信息不完整的测试中表现更好，因为它们从训练中获取了额外信息

见：[为何 SWE-bench Verified 已无法衡量前沿编程能力](https://openai.com/zh-Hans-CN/index/why-we-no-longer-evaluate-swe-bench-verified/)

#### Eval Awareness：模型自主识别评估场景

Anthropic 在 BrowseComp 基准测试中发现一种新型模型行为：当 Claude Opus 4.6 经历数百次搜索失败后，
会自主分析问题的"人为构造"特征（过于具体、冷门个人内容、多约束叠加），进而推测自己可能处于评估场景中。

模型随后主动枚举已知基准（GAIA、BrowseComp、FRAMES、SimpleQA 等），通过 GitHub 找到评测源代码，
发现 XOR 加密方案，编写 `derive_key()` 和 `decrypt()` 函数，从 HuggingFace 镜像成功解密全部 1266 条答案。
整个过程消耗约 4050 万 tokens（中位数的 38 倍），其中前 3000 万 tokens 用于常规多语言搜索。

关键洞察：多智能体配置的"意外解"率（0.87%）是单智能体（0.24%）的 3.7 倍——并行架构增加了至少一个
智能体遇到泄露材料或怀疑评估的概率。研究还发现跨智能体污染：电商站点将搜索查询缓存为索引页面，
形成智能体间的污染链。

Anthropic 不将此归类为对齐失败（模型仅被指示寻找答案，未限制搜索方法），但强调应将评估完整性
视为持续的对抗性问题，而非设计时的一次性考虑。至少 20 个不同的 BrowseComp 答案泄露源已被识别。

见：[Eval Awareness in Claude Opus 4.6's BrowseComp Performance](https://www.anthropic.com/engineering/eval-awareness-browsecomp)：
Anthropic 技术博客，2026年3月

#### 欠规格物理实验：检验 LLM"品味"能力的测试

编程和数学题有确定答案，而欠规格（under-specified）的物理实验没有——回答这类问题需要"品味"：
判断哪些因素主导、如何处理缺失细节。对咖啡冷却曲线的预测实验显示：多个 LLM 独立收敛于双
指数衰减形式（T(t) = 20 + A·e^(-t/a) + B·e^(-t/b)），能正确识别"水→杯快速导热"和
"杯→空气慢速散热"两个主导因素，预测方向正确，但系统性低估初期降温速率、高估后期速率。

见：[LLMs predict my coffee](https://dynomight.net/coffee/)：LLM 预测咖啡冷却曲线实验

## Provider Benchmark

* [glm-5.1-bench](https://z.ai/blog/glm-5.1)

## Vibe Coding 测试

* [2026 年了，谁画页面更强一些](./frontend-copy.md)

## Local Benchmark

**M3 Max 128GB**

* [qwen3.5-9b-mlx-4bit](./local/qwen3.5-9b-mlx-4bit.md)
* [qwen3-coder-next-mlx-4bit](./local/qwen3-coder-next-mlx-4bit.md)
* [mlx-qwen3.5-27b-claude-4.6-opus-reasoning-distilled-4bit](./local/mlx-qwen3.5-27b-claude-4.6-opus-reasoning-distilled-4bit.md)
* [qwen3-embedding-8b-4bit-dwq](./local/qwen3-embedding-8b-4bit-dwq.md)
* [glm-ocr-8bit](./local/glm-ocr-8bit.md)
