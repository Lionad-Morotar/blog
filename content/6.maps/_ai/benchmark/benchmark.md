---
title: LLM Benchmark
description: 各类大语言模型的基准测试结果与排行榜资源。
original_path: _ai/benchmark.md
---

* [Arena.ai](https://arena.ai/zh/leaderboard/code)：经典大模型竞技场

* [SanityHarness](https://sanityboard.lr7.dev/)：Agentic 基准

* [ZigScan](https://raw.githubusercontent.com/gnusec/AI-PK/refs/heads/main/results/REPORT_ZH.html)

真实世界 AI 编码代理性能基准

* [Agentic、Safety、Frontier、Legacy LBs](https://scale.com/leaderboard/mcp_atlas)

* [各数据集榜单](https://llm-stats.com/benchmarks)

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

在你当前浏览的 **Artificial Analysis AI Trends** 页面里，比较维度非常丰富，主要围绕不同角度来衡量和对比 AI 模型的发展。总结下来有以下几个核心维度：

**📊 模型能力与智能指数**
- Artificial Analysis Intelligence Index：基于 10 项评估（如 MMLU-Pro、GPQA Diamond、LiveCodeBench、SciCode 等），对模型智能进行量化。
- 推理模型s 非推理模型**：区分是否具备复杂推理能力。

**⚙️ 效率与性能**
- 推理价格：每百万 tokens 的成本。
- 输出速度：每秒生成的 tokens 数量。
- 效率趋势：智能水平与成本/速度的关系。

**🌍 国家与地区维度**
- 国家对比：美国、中国等主要 AI 研发国家的模型智能水平。
- 领先模型按国家：不同国家的代表性模型在指数上的表现。

**🔓 开源 vs 专有**
- 开放权重模型：可自由部署和微调的模型。
- 专有模型：由公司封闭控制的模型。
- 智能对比：开源与专有模型在智能指数上的差异。

**🏗️ 模型架构**
- Dense vs MoE（Mixture of Experts）：不同架构的智能表现。
- 参数总量 vs 活跃参数：模型规模与实际推理时启用的参数数量。
- 上下文长度：支持的上下文窗口大小（如几十万到百万 tokens）。

**💰 投资与训练**
- 资本支出（Capex）：主要科技公司在 AI 上的季度投资。
- 训练规模：训练 tokens 数量（以万亿计）。
- 训练规模 vs 智能指数：训练数据量与模型智能的关系。

#### 各维度最强 LLM 推荐（2025）

数字生命卡兹克基于构建 970 道题评测集的实战经验（18 个大维度、近 100 个小维度），
通过让顶级模型互相出题审查迭代 Skill，总结出各维度的最强模型体感推荐：

**Coding 能力**
* 软件工程与代码生成：GPT-5.3 codex
* 代码理解、推理与质量：GPT-5.3 codex
* 调试、测试与维护：GPT-5.3 codex
* 数据工程与后端服务：Claude Opus 4.6
* 前端与产品工程：Claude Opus 4.6

**Agent 能力**
* Agent 工具调用：Claude Opus 4.6
* Web 与桌面自动化（静态）：Claude Opus 4.6
* 研究与知识工作 Agent（静态）：GPT-5.2 Pro

**推理与知识**
* 数学与形式推理：Gemini 3.1 Pro
* 逻辑与规划：Gemini 3.1 Pro
* 知识广度与事实核验：Gemini DeepThink
* 阅读理解与信息抽取：GPT-5.2 Thinking
* 长上下文记忆与多轮一致性：GPT-5.2 Thinking

**多模态与交互**
* 多模态理解与视觉推理：GPT-5.2 Thinking
* 情商与协作沟通：GPT-4.5
* 创作表达与审美：Claude Opus 4.6
* 指令遵循与对齐：Claude Opus 4.6

**额外提示**：搜索 AI 最新信息（如 OpenClaw 玩法等），使用 Grok 4.2 有奇效。

见：[春节6天，我找到了各个领域最强的大模型](https://mp.weixin.qq.com/s/cVn-1MXQnhlFmhiMtVWi9A)
