# RAG (检索增强生成)

## Chroma：轻量级嵌入式向量数据库

Chroma 是最易上手的向量数据库，主打"嵌入式"——直接 pip 安装，无需额外服务。适合原型验证和中小规模应用（< 1000 万向量），提供直观的 Python API，与 LangChain、LlamaIndex 无缝集成。对于需要快速启动的 AI 应用，Chroma 是零成本入门的首选。

见：[Chroma 官网](https://www.trychroma.com/) | [2025 最佳向量数据库](https://www.truefoundry.com/blog/best-vector-databases) | [RAG 向量数据库对比](https://en.paperblog.com/vector-databases-for-rag-pinecone-vs-weaviate-vs-chroma-2025-comparison-guide-8014057/)

## FAISS：Facebook 高效相似度搜索库

FAISS 是 Facebook 开源的向量搜索库，提供多种索引算法：Flat（精确搜索，小数据集）、IVF（倒排文件索引，平衡速度/精度）、HNSW（图索引，高维大数据集最优）、PQ（乘积量化，极致压缩）。适合需要精细控制索引算法、已有数据基础设施只需向量搜索模块、大规模数据集（十亿级向量）的场景。

见：[FAISS GitHub](https://github.com/facebookresearch/faiss) | [FAISS 索引选择指南](https://github.com/facebookresearch/faiss/wiki/Guidelines-to-choose-an-index) | [HNSW vs IVF 对比](https://milvus.io/blog/understanding-ivf-vector-index-how-It-works-and-when-to-choose-it-over-hnsw.md)

## Qdrant：Rust 实现的开源向量数据库

Qdrant 是用 Rust 编写的向量数据库，性能优异且功能丰富：过滤搜索（向量相似度 + 元数据过滤同时进行）、混合搜索（稀疏向量 + 密集向量结合）、量化（Scalar、Product 量化降低内存 97%）、分布式原生支持集群部署。适合生产级 RAG 应用。

见：[Qdrant 官网](https://qdrant.tech/) | [Qdrant 混合搜索](https://qdrant.tech/documentation/concepts/hybrid-queries/) | [Qdrant 量化指南](https://qdrant.tech/documentation/guides/quantization/)

## Sentence Transformers：文本嵌入模型库

Sentence Transformers（SBERT）是生成文本嵌入的事实标准库，提供预训练模型（all-MiniLM、all-mpnet 等）、多语言支持、微调接口，与向量数据库无缝集成。all-MiniLM-L6-v2 是最流行的轻量级模型，将句子映射到 384 维向量空间。

见：[Sentence Transformers 文档](https://www.sbert.net/) | [预训练模型列表](https://www.sbert.net/docs/sentence_transformer/pretrained_models.html) | [多语言模型](https://sbert.net/examples/sentence_transformer/training/multilingual/README.html)

## RAG 进阶技术

多向量检索：句子窗口（存储段落，检索句子 + 上下文）、父子块（小块用于匹配，大块用于生成）、摘要索引（用摘要辅助长文档检索）。查询优化：查询扩展（用 LLM 生成同义查询）、HyDE（生成假设文档，用其嵌入检索）、路由（根据查询类型选择不同检索策略）。Agentic RAG 结合 Agent 能力实现多跳推理、子问题分解、工具使用。

见：[RAG 最佳实践指南](https://www.truefoundry.com/blog/best-vector-databases) | [VectorDB Bench 性能测试](https://github.com/zilliztech/VectorDBBench)
