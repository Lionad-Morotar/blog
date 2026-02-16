# 数据处理 (Data Processing)

## NeMo Curator：GPU 加速的企业级数据整理

NeMo Curator 是 NVIDIA 推出的企业级数据整理工具包，专为大规模生成式 AI 训练设计。它利用 RAPIDS 库（cuDF、cuML、cuGraph）实现 GPU 加速，配合 Ray 支持多节点分布式扩展。在 DGX 系统上可在数小时内处理 TB 级语料，比传统 CPU 方案快 10-100 倍。支持文档提取、文本清洗、精确/模糊去重、质量评分和 PII 检测等模块化管道。

见：[NeMo Curator GitHub](https://github.com/NVIDIA-NeMo/Curator) | [NVIDIA 官方文档](https://docs.nvidia.com/nemo/curator/) | [ChipNeMo 案例](https://developer.nvidia.cn/blog/streamlining-data-processing-for-domain-adaptive-pretraining-with-nvidia-nemo-curator/)

## Ray Data：分布式数据加载与预处理

Ray Data 是 Ray 生态系统中的数据层，提供可扩展的数据加载、转换和传输能力。它与 PyTorch、TensorFlow、HuggingFace 无缝集成，支持从单机扩展到千节点集群。关键特性包括流式处理（无需全部载入内存）、自动分片（与分布式训练对齐）、以及 CPU 预处理 + GPU 训练的流水线并行。

见：[Ray Data 文档](https://docs.ray.io/en/latest/data/data.html) | [Ray Data 博客](https://www.anyscale.com/blog/fast-flexible-scalable-data-loading-for-ml-training-with-ray-data)

## MinHash + LSH：大规模近似去重

MinHash 结合局部敏感哈希（LSH）是大规模数据集去重的标准算法。通过计算文档的签名并比较相似度，可以高效识别重复或高度相似的文档。研究表明这是 LLM 预训练数据去重的最合适算法，Data-Juicer 的实现在 8 节点 1280 CPU 核心上可在 3 小时内完成 TB 级数据集去重。

见：[MinHash LSH 去重研究](https://dl.acm.org/doi/10.1007/978-3-031-82481-4_27) | [Zilliz 万亿级去重](https://zilliz.com/blog/data-deduplication-at-trillion-scale-solve-the-biggest-bottleneck-of-llm-training)

## 数据质量分层：Tier 1-3 体系

高质量数据应分为多个层级训练：Tier 1 是人工精选（Wikipedia、书籍、学术论文），Tier 2 是自动过滤后的 Web 数据（Common Crawl 子集），Tier 3 是代码、对话等专项数据。训练时按不同比例混合各层级数据，可显著提升模型泛化能力并减少数据污染。

见：[Deduplicating Training Data 论文](https://arxiv.org/abs/2107.06499) | [The Pile 数据集论文](https://arxiv.org/abs/2101.00027)

## 数据混合策略：决定模型能力的关键

不同来源数据的比例对模型能力有显著影响：代码数据比例提升会增强推理能力，对话数据比例提升会增强指令遵循能力，Web 数据比例提升会扩展知识广度但引入噪声。精心设计的数据混合策略是训练高性能模型的核心 secret sauce。

见：[FineWeb 技术报告](https://huggingface.co/spaces/HuggingFaceFW/blogpost-fineweb-v1) | [DataComp 基准](https://datacomp.ai/)
