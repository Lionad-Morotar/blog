---
title: Inference
description: Model inference and serving techniques
original_path: _ai/inference.md
---
## vLLM：PagedAttention 高吞吐服务框架

vLLM 由伯克利 Sky Computing Lab 开发，核心贡献是 PagedAttention 技术。借鉴操作系统的虚拟内存分页机制，将 KV Cache 分块管理，实现近 100% 的内存利用率（传统实现仅 20-40%）。支持 Continuous Batching（动态批处理）和流水线并行，吞吐提升 2-4 倍，是开源 LLM 服务的事实标准，全球超过 40 万 GPU 部署。

见：[vLLM GitHub](https://github.com/vllm-project/vllm) | [PagedAttention 论文](https://dl.acm.org/doi/10.1145/3600006.3613165) | [vLLM 1.0 路线图](https://github.com/vllm-project/vllm/issues/20336)

## SGLang：结构化生成语言运行时

SGLang 是伯克利推出的新一代推理框架，特色是结构化生成语言——用编程方式定义 LLM 调用流程，自动批处理多个请求。核心创新 RadixAttention 跨多个 LLM 生成调用自动高效重用 KV 缓存。社区测试显示在某些场景下吞吐比 vLLM 高 50-150%，特别是在多轮对话和结构化输出场景。xAI 生产环境部署超过 10 万 GPU。

见：[SGLang GitHub](https://github.com/sgl-project/sglang) | [SGLang 论文](https://arxiv.org/abs/2312.07104) | [RadixAttention 介绍](https://lmsys.org/blog/2024-01-17-sglang/)

## llama.cpp：本地 CPU/GPU 推理引擎

llama.cpp 是纯 C++ 实现的推理引擎，目标是让 LLM 能在消费级硬件上运行。支持 ARM NEON、AVX 指令集优化，GGUF 格式量化（Q4 到 Q8），跨平台（Windows、macOS、Linux、iOS、Android），无依赖单二进制文件即可运行。是本地开发测试、边缘设备部署、隐私敏感应用的首选方案。

见：[llama.cpp GitHub](https://github.com/ggml-org/llama.cpp) | [llama.cpp 边缘部署](https://medium.com/@nikheelvs/running-llms-on-edge-devices-a-step-by-step-guide-8cf1b3d74193)

## TensorRT-LLM：NVIDIA 推理优化库

TensorRT-LLM 是 NVIDIA 的闭源推理优化方案，针对自家 GPU 深度优化：Kernel 融合减少显存带宽瓶颈，FP8 支持 Hopper GPU 原生低精度推理，In-flight Batching 更激进的批处理策略。在 NVIDIA GPU 上吞吐最高，但仅支持 NVIDIA 且配置复杂，适合追求极致性能且有工程投入能力的场景。

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

GPT-5.3-Codex-Spark 运行在 Cerebras WSE-3（Wafer Scale Engine 3）晶圆级引擎上。与 GPU 集群相比，Cerebras 通过将所有计算资源集成在单个晶圆级处理器上，针对"延迟优先"工作流优化。这种架构选择使模型能够达到超过 1000 tokens/秒的生成速度，适合需要即时反馈的实时协作场景。

值得注意的是，GPU 仍是 OpenAI 训练与推理管线的主力，Cerebras 作为补充方案，在极致低延迟场景提供差异化能力。

见：[AI-Bio 技术解析](https://ai-bio.cn/gpt-5-3-codex-spark/) | [OpenAI 官方说明](https://openai.com/zh-Hans-CN/index/introducing-gpt-5-3-codex-spark/)

#### 实时协作 LLM 的设计权衡

Codex-Spark 采用轻量级工作风格以换取极致的交互流畅性：

- **最小化编辑策略**：默认只做精准局部修改，不自动运行测试
- **减少自主性换取速度**：除非用户明确要求，否则不主动扩展任务范围
- **128K 上下文窗口**：保持足够长的代码上下文理解能力

后续优化更新中，该模型速度进一步提升约 30%，达到每秒 1200+ tokens（@thsottiaux）。

见：[Twitter 更新](https://x.com/thsottiaux/status/2024947946849186064)

## 推理框架选择指南

vLLM 是通用在线服务的首选，易用性高且吞吐优秀；TensorRT-LLM 适合极致性能需求但仅支持 NVIDIA；llama.cpp 是本地/边缘部署的标准，跨平台且轻量；SGLang 在结构化生成和多轮对话场景表现突出。选择应权衡延迟、吞吐、易用性、硬件限制和具体应用场景。

见：[LLM 推理框架综述](https://www.arxiv.org/pdf/2505.01658v1) | [vLLM vs SGLang 对比](https://tensorfuse.io/blog/llm-throughput-vllm-vs-sglang)
