# 推理 (Inference)

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

## 推理框架选择指南

vLLM 是通用在线服务的首选，易用性高且吞吐优秀；TensorRT-LLM 适合极致性能需求但仅支持 NVIDIA；llama.cpp 是本地/边缘部署的标准，跨平台且轻量；SGLang 在结构化生成和多轮对话场景表现突出。选择应权衡延迟、吞吐、易用性、硬件限制和具体应用场景。

见：[LLM 推理框架综述](https://www.arxiv.org/pdf/2505.01658v1) | [vLLM vs SGLang 对比](https://tensorfuse.io/blog/llm-throughput-vllm-vs-sglang)
