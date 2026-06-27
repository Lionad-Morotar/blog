---
title: Inference
description: Model inference and serving techniques
original_path: _ai/inference.md
---
## vLLM：PagedAttention 高吞吐服务框架

vLLM 由伯克利 Sky Computing Lab 开发，核心贡献是 PagedAttention 技术。借鉴操作系统的虚拟内存分页机制，将 KV Cache 分块管理，实现近 100% 的内存利用率（传统实现仅 20-40%）。
支持 Continuous Batching（动态批处理）和流水线并行，吞吐提升 2-4 倍，是开源 LLM 服务的事实标准，全球超过 40 万 GPU 部署。

见：[vLLM GitHub](https://github.com/vllm-project/vllm) | [PagedAttention 论文](https://dl.acm.org/doi/10.1145/3600006.3613165) | [vLLM 1.0 路线图](https://github.com/vllm-project/vllm/issues/20336)

## SGLang：结构化生成语言运行时

SGLang 是伯克利推出的新一代推理框架，特色是结构化生成语言——用编程方式定义 LLM 调用流程，自动批处理多个请求。核心创新 RadixAttention 跨多个 LLM 生成调用自动高效重用 KV 缓存。
社区测试显示在某些场景下吞吐比 vLLM 高 50-150%，特别是在多轮对话和结构化输出场景。xAI 生产环境部署超过 10 万 GPU。

见：[SGLang GitHub](https://github.com/sgl-project/sglang) | [SGLang 论文](https://arxiv.org/abs/2312.07104) | [RadixAttention 介绍](https://lmsys.org/blog/2024-01-17-sglang/)

## llama.cpp：本地 CPU/GPU 推理引擎

llama.cpp 是纯 C++ 实现的推理引擎，目标是让 LLM 能在消费级硬件上运行。支持 ARM NEON、AVX 指令集优化，GGUF 格式量化（Q4 到 Q8），跨平台（Windows、macOS、Linux、iOS、
Android），无依赖单二进制文件即可运行。是本地开发测试、边缘设备部署、隐私敏感应用的首选方案。

见：[llama.cpp GitHub](https://github.com/ggml-org/llama.cpp) | [llama.cpp 边缘部署](https://medium.com/@nikheelvs/running-llms-on-edge-devices-a-step-by-step-guide-8cf1b3d74193)

## TensorRT-LLM：NVIDIA 推理优化库

TensorRT-LLM 是 NVIDIA 的闭源推理优化方案，针对自家 GPU 深度优化：Kernel 融合减少显存带宽瓶颈，FP8 支持 Hopper GPU 原生低精度推理，In-flight Batching 更激进的批处理策略。
在 NVIDIA GPU 上吞吐最高，但仅支持 NVIDIA 且配置复杂，适合追求极致性能且有工程投入能力的场景。

见：[TensorRT-LLM 文档](https://developer.nvidia.com/tensorrt-llm)

## 商业推理优化案例：Codex-Spark 的实时协作优化

OpenAI 在 GPT-5.3-Codex-Spark 中展示了面向实时协作场景的推理优化实践。该模型专为低延迟编程任务设计，生成速度超过 1200 tokens/秒。

#### 端到端延迟优化的维度

对于实时协作场景，模型推理速度只是核心要素之一，还需要优化整个请求-响应链路的延迟。OpenAI 通过以下工程改进实现显著延迟降低：

- **WebSocket 持久连接**：替代传统 HTTP 请求，客户端与服务器往返开销降低 80%
- **推理栈重写**：精简流式传输逻辑，单 token 传输开销降低 30%
- **会话初始化重构**：优化首字延迟（Time-to-first-token），缩短 50%

见：[OpenAI 官方发布](https://openai.com/zh-Hans-CN/index/introducing-gpt-5-3-codex-spark/) | [蓝点网报道](https://www.landiannews.com/archives/111836.html)

#### 专用 AI 加速器在超低延迟场景的应用

GPT-5.3-Codex-Spark 运行在 Cerebras WSE-3（Wafer Scale Engine 3）晶圆级引擎上。与 GPU 集群相比，Cerebras 通过将所有计算资源集成在单个晶圆级处理器上，
针对"延迟优先"工作流优化。这种架构选择使模型能够达到超过 1000 tokens/秒的生成速度，适合需要即时反馈的实时协作场景。

值得注意的是，GPU 仍是 OpenAI 训练与推理管线的主力，Cerebras 作为补充方案，在极致低延迟场景提供差异化能力。

见：[AI-Bio 技术解析](https://ai-bio.cn/gpt-5-3-codex-spark/) | [OpenAI 官方说明](https://openai.com/zh-Hans-CN/index/introducing-gpt-5-3-codex-spark/)

#### 实时协作 LLM 的设计权衡

Codex-Spark 采用轻量级工作风格以换取极致的交互流畅性：

- **最小化编辑策略**：默认只做精准局部修改，不自动运行测试
- **减少自主性换取速度**：除非用户明确要求，否则不主动扩展任务范围
- **128K 上下文窗口**：保持足够长的代码上下文理解能力

后续优化更新中，该模型速度进一步提升约 30%，达到每秒 1200+ tokens（@thsottiaux）。

见：[Twitter 更新](https://x.com/thsottiaux/status/2024947946849186064)

## 采样机制的工程陷阱

#### Temperature=0 的确定性幻觉

多数工程师认为 `Temperature=0` 即可获得完全可复现的输出，但推理框架的实现细节会打破这一假设。

vLLM、TensorRT-LLM 等系统处理 `temp=0` 时路径并不统一：部分框架走特殊贪心分支，另一部分仅用一个极小的浮点数替代温度除法[^1]。更根本的是，GPU 并行计算中的浮点累加顺序本身就不确定，
batch size 或显卡型号的改变都可能导致 softmax 后出现不同的 winner[^2]。

这意味着在 A100 上通过的 regression test，在 H100 上输出可能发生变化。「确定性」在参数层面是意图，在硬件实现层面却是伪命题。

见：[vLLM GitHub](https://github.com/vllm-project/vllm) | [TensorRT-LLM 文档](https://developer.nvidia.com/tensorrt-llm)

#### Top-P 的生产性能税

「Top-P 比 Top-K 更灵活」是事实，但代价是每次推理都要对整张词表（5万-10万维）做排序和累积概率计算。其 O(n log n) 的复杂度在高并发 serving 场景下会成为内存带宽瓶颈，
PagedAttention 的内存优化优势会被它吃掉一部分[^3]。

业内常见的工程权衡是用足够大的 Top-K（如 1024）来近似 Top-P 的效果，或者使用 CUDA 近似 Top-K kernel 绕过全排序[^4]。这是一个文档不会写、但上线后 profiler 会告诉你的决策点。

见：[vLLM GitHub](https://github.com/vllm-project/vllm) | [LLM 推理框架综述](https://www.arxiv.org/pdf/2505.01658v1)

## 推理框架选择指南

vLLM 是通用在线服务的首选，易用性高且吞吐优秀；TensorRT-LLM 适合极致性能需求但仅支持 NVIDIA；llama.cpp 是本地/边缘部署的标准，跨平台且轻量；SGLang 在结构化生成和多轮对话场景表现突出。
选择应权衡延迟、吞吐、易用性、硬件限制和具体应用场景。

见：[LLM 推理框架综述](https://www.arxiv.org/pdf/2505.01658v1) | [vLLM vs SGLang 对比](https://tensorfuse.io/blog/llm-throughput-vllm-vs-sglang)

[^1]: vLLM 与 TensorRT-LLM 对 `temperature=0` 的实现路径差异，详见各框架源码中 sampling 模块
[^2]: GPU 浮点累加顺序的非确定性，参见 NVIDIA CUDA 编程指南中关于 floating-point associativity 的说明
[^3]: PagedAttention 内存优化与采样计算开销的权衡，见 [vLLM PagedAttention 论文](https://dl.acm.org/doi/10.1145/3600006.3613165)
[^4]: CUDA 近似 Top-K kernel 方案，见 NVIDIA cuANN 及 vLLM 社区讨论

## 推理模型的成本与工程陷阱

推理模型（Reasoning Model）在复杂任务上的准确率显著提升，但生产部署时面临着普通模型不会遇到的隐性成本结构与可控性问题。以下陷阱来自模型"先思考后输出"的机制本质，常被产品选型时的简单价格对比所掩盖。

#### 思考 Token 的不可审计陷阱

OpenAI o3 的思考 token 可占总消耗的七成以上，且多数 API 不提供 `max_thinking_tokens` 参数——模型可能为简单问题展开冗长推导，而用户既无法限制也无法预知。
更棘手的是 Gemini 2.5 Pro 这类隐藏式思考模型：思考过程不返回、不可审计，成本完全黑箱。根因在于思考链长度与问题复杂度呈非线性增长，但当前计费模型未暴露思考深度的控制接口，导致生产环境的成本预测失准。

见：[OpenAI o3 定价说明](https://openai.com/api/pricing/) | [Gemini 2.5 Pro 文档](https://ai.google.dev/gemini-api/docs/models#gemini-2.5-pro)

#### Prompt Caching 被思考链击穿

普通模型中，system prompt 和用户上下文可被 KV Cache 复用以降低重复调用成本；但推理模型的思考过程是动态生成的，每次请求的隐状态各不相同，直接破坏了缓存命中的前提条件。结果是，你不仅为多出的思考 token 付费，
还失去了基础 prompt 的缓存折扣，实际成本可能达到普通模型的 5-15 倍。这在高并发对话系统中尤为致命——缓存失效的级联效应会让本已紧张的预算彻底失控。

见：[OpenAI Prompt Caching 文档](https://platform.openai.com/docs/guides/prompt-caching) | [Anthropic Prompt Caching](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching)

#### 简单任务的过度思考污染

一个反直觉的现象：推理模型对简单问题的回答反而更慢更贵。当你问"今天星期几"时，普通模型直接输出，而推理模型可能先推导日历系统、时区转换、闰年规则，最后才给出答案。这是因为推理模型的训练目标是最小化推理错误率而非 token 消耗，
导致它在置信度已极高时仍会继续展开思考链。产品层面很难用规则判定何时该切换普通模型——动态路由（Router）本身也引入延迟和误判成本，最终形成"简单问题不敢用，复杂问题必须用"的被动局面。

见：[DeepSeek R1 技术报告](https://arxiv.org/abs/2501.12948) | [o3 System Card](https://openai.com/index/openai-o3-system-card/)

#### "分类路由"本身就是隐藏成本杠杆

用分类模型先判断问题复杂度再分配推理预算，在纸面上完美，但工程落地时会撞上冷启动悖论：如果分类器本身也是一个 LLM 调用，那么简单问题变成了"分类 + 回答"两次调用，总延迟翻倍、总成本可能超过直接让小模型一次性回答。

真正在一线跑通的方案往往不是"模型路由"，而是规则预过滤——用正则、关键词、向量相似度等极低成本手段识别出显然的简单问题，直接走轻量模型；只有无法匹配规则的模糊请求才进入大模型分类器。
这个细节决定了 Test-Time Compute 策略是省 70% 成本还是反而多烧 30%。

#### Agent 多轮对话使上下文读取量二次增长

Agent 每轮都把完整对话历史重新注入上下文，导致第 N 轮的输入 token 量约为 1+2+…+(N-1) 的量级。在长对话中，模型开销主要由重复读取历史构成，而非本轮新增内容。Prefix Caching（前缀缓存）
因此成为决定实际成本的核心杠杆，缓存命中与未命中的 token 单价差距可达 10 倍。设计 Agent 时如果忽视上下文累积结构，账单会在多轮后呈二次曲线膨胀。

见：[Cache Hit Rates of Inference Are More Meaningful Than the Headline Costs](https://dirac.run/posts/cache-hit-rates-agents)

#### Provider 的缓存命中率比模型标价更能决定账单

同一份模型在不同 provider 上的有效输入价格可能相差数倍，差异往往来自缓存命中率而非官方标价。以 DeepSeek V4 Pro 为例，在官方端缓存命中率约 87%，有效输入价约 $0.056/M；
而在某些低价 provider 处命中率可能为 0，标价虽低，实际成本反而更高。选型时只 compare 标价会系统性低估多轮对话场景的真实支出。

见：[Cache Hit Rates of Inference Are More Meaningful Than the Headline Costs](https://dirac.run/posts/cache-hit-rates-agents)

#### Google Vertex 上 Claude 缓存命中率反超 Gemini

在 Google Vertex 平台上，Claude Opus 4.7 的缓存命中率可达 65.30%，而 Google 自家 Gemini 3.1 Pro Preview 仅 37.30%。这相当反直觉：
Google 拥有从 TPU 到模型的全栈，却在自家托管的竞品模型上表现更差。可能的原因之一是 Gemini 的"thought signature"架构对前缀复用不够友好，导致 KV Cache 复用效率低下。

见：[Cache Hit Rates of Inference Are More Meaningful Than the Headline Costs](https://dirac.run/posts/cache-hit-rates-agents)

#### 小模型未必更便宜：零缓存 provider 下的成本倒置

当 provider 完全没有命中缓存时，小模型的高单价输入 token 会被完整收取。以文中数据为例，DeepSeek V4 Pro（1.6T 总参、49B 活跃参数）在官方端因高缓存命中率，
实际使用成本可以低于某些 Qwen3.6 小模型在零缓存 provider 上的成本。模型参数规模只是成本公式中的一个变量，部署方的缓存策略和命中情况同样重要。

见：[Cache Hit Rates of Inference Are More Meaningful Than the Headline Costs](https://dirac.run/posts/cache-hit-rates-agents)

