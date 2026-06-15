---
title: RAG
description: 检索增强生成（Retrieval-Augmented Generation）模型与技术
original_path: _ai/rag.md
---

## 简介

RAG 技术意味着在生成数据前将检索到的高质量数据作为上下文提供给模型，以减少幻觉，获得更好的生成质量。在实践中，通常首先要将文档及相关数据以向量化或文档搜索的方式储存在数据库中，如：pgvector 等。在收到给定提示后，数据库会被调取以检索相关文档，然后这些文档会与提示结合在一起，为 LLM 提供更丰富的上下文。

相关限制：模型的上下文大小。

#### 落地经验

1. 快速冷启动（Vector KB）：
- 场景：电商搭建售后机器人。
- 做法：导入产品手册、退换货政策PDF。
-收益：1-2周上线，解决80%常见语义匹配问题。

2. 阶段二：精度调优（Hybrid Search）：
-场景：用户反馈搜不到特定型号参数。
-做法：引入关键词搜索与向量搜索结合。
-收益：确保专有名词的精确匹配。

3. 阶段三：引入图谱（Knowledge Graph）：
- 场景：处理兼容性咨询。
- 做法：构建小规模图谱，定义适配关系。
- 收益：利用图的逻辑推理能力，给出准确回答。

见：[知识库（Knowledge Base）与知识图谱（Knowledge Graph）到底该怎么选？ @tataqiuqiu](https://mp.weixin.qq.com/s/qugyc6WlsbrCmG2wTAXzGg)

#### HNSW 的 O(log N) 是拿召回率换的

HNSW 把向量组织成多层图结构后，查询时从顶层稀疏图逐层下沉到底层稠密图，平均复杂度接近 O(log N)，但这个数字只描述了遍历次数，没说明每次遍历的搜索宽度和最终召回质量。真正决定结果好坏的是 M（节点最大出度）、efConstruction（构建时的候选列表大小）和 efSearch（查询时的候选列表大小）三个参数：M 越大图越稠密，召回率越高但内存和构建时间线性增长；efConstruction 越高，建图时留下的连接质量越好，但索引构建时间会显著拉长；efSearch 越高，查询时考虑的候选越多，召回率提升但延迟增加。生产环境中常见的一个误区是只关注 QPS 和延迟指标，却用默认参数跑高召回场景，最后发现 top-k 结果里漏掉了关键文档。调参的关键不是把三个值都拉到最大，而是根据业务对召回率的要求反推可接受的延迟和内存预算，在索引构建阶段就把 efConstruction 定够，否则重建索引的成本会在数据量变大后成为瓶颈。

见：[What are the key configuration parameters for an HNSW index](https://milvus.io/ai-quick-reference/what-are-the-key-configuration-parameters-for-an-hnsw-index-such-as-m-and-efconstructionefsearch-and-how-does-each-influence-the-tradeoff-between-index-size-build-time-query-speed-and-recall)

#### pgvector 的舒适区在十万级以下

pgvector 的优势在于和 PostgreSQL 共用存储、事务和运维体系，团队不需要引入新组件就能完成语义检索，这在数据规模可控时非常划算。但 pgvector 的 HNSW 实现在单节点 Postgres 上的并发能力和扩展性有明显边界，当向量数量达到数百万甚至上千万时，专用向量数据库在 QPS、分布式分片和混合查询优化上的优势会迅速拉开。工程上的常见陷阱是先用 pgvector 验证原型，等数据增长后才发现查询延迟不可接受，但迁移到专用向量库又涉及索引重建、嵌入重导和查询语义一致性校验。一个更稳妥的做法是在选型时就明确规模预期：如果预计半年内向量规模会超过百万级，或者对混合检索、多租户隔离有强需求，优先评估 Qdrant、Milvus 等专用方案；如果数据量在十万级以下且团队已深度使用 Postgres，pgvector 仍然是务实的选择。

见：[Choosing the Foundation for Your RAG System: pgvector vs Qdrant vs Milvus](https://dev.to/linou518/choosing-the-foundation-for-your-rag-system-pgvector-vs-qdrant-vs-milvus-2026-4i5o)

#### Elasticsearch 的向量搜索是 segment 级索引

Elasticsearch 从 8.0 开始为 dense_vector 字段默认启用 HNSW 索引，但它是在每个 Lucene segment 内部独立构建 HNSW 图，查询时需要分别遍历多个 segment 的图再合并结果。这与 Milvus、Qdrant 等专用向量数据库维护全局统一索引的方式不同：segment 级设计让 ES 能利用现有的段合并和分片机制，但也意味着向量搜索仍然受 segment 数量、合并策略和分片路由的影响。更深层的影响在于，ES 的核心架构是为文本倒排索引和聚合分析优化的，dense_vector 更像是一项附加能力，其查询 DSL、缓存策略和运维工具链都带有浓厚的文本检索色彩。对于已经使用 ES 做日志或文档搜索的团队，用 dense_vector 扩展语义搜索是合理的；但如果业务的核心是海量向量的低延迟相似度检索，专用向量数据库在索引结构和查询优化上会更聚焦。

见：[Dense vector field type | Elasticsearch Reference](https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/dense-vector)

#### 小数据集上 ANN 可能不如暴力扫描

HNSW、IVF 这类 ANN 索引的本质是用预先构建的数据结构换取查询时跳过全量计算，但这个交换成立的前提是数据集足够大。当向量数量只有几千到一万条时，ANN 索引的图遍历开销、缓存不友好性和参数调优成本可能抵消甚至超过其节省的计算量；而暴力扫描虽然复杂度是 O(N)，但 N 很小，配合现代 CPU 的 SIMD 和向量化计算，延迟反而更低且召回率是 100%。这也是为什么原文提到“小项目（<1 万条）用 pgvector 就够了”——此时即使不用 HNSW，只靠精确 kNN 也能获得可接受的性能。真正需要 ANN 的是数据量达到几十万、上百万甚至上亿，全量距离计算成为瓶颈的场景。选型时不要被“ANN 一定更快”的说法绑架，而要先估算数据规模和召回要求。

见：[Approximate Nearest Neighbour Search on Dynamic Datasets: An Investigation](https://arxiv.org/html/2404.19284v5)

#### 向量检索的访问控制边界

企业知识库中的文档通常带有部门、职级、项目等访问属性，但向量数据库的相似度搜索本身不感知用户身份。如果只靠 metadata filtering 做权限过滤，一旦查询条件被绕过、索引配置出错，或者过滤逻辑与业务权限不同步，A 部门的内容就可能被返回给 B 部门的用户。OWASP 的 RAG 安全备忘单建议把访问控制元数据附在每个向量 chunk 上，并在检索时强制执行访问控制检查，而不是仅在摄入时做一次性标记。真正的权限边界需要与身份系统打通，并把权限约束作为不可被用户篡改的检索条件写入每次查询。

见：[RAG Security - OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/cheatsheets/RAG_Security_Cheat_Sheet.html)

#### 语义缓存的成本杠杆

传统缓存只命中完全相同的问题，而 RAG 场景中大量问题语义相近但措辞不同。语义缓存通过比较查询向量把相似问题归为一类，命中一次就能跳过 embedding、检索、rerank、生成整条链路。在高并发、问题重复度高的场景中，这能显著降低延迟和资源消耗。但它的阈值设置、缓存失效和多租户隔离是落地关键，调得不好要么命中率过低浪费算力，要么返回过期甚至不该被该用户看到的内容。

见：[Semantic Caching: Accelerating beyond basic RAG @Brain Co](https://brain.co/blog/semantic-caching-accelerating-beyond-basic-rag)

#### 向量检索的上下文完整性陷阱

RAG 被当作突破上下文限制的银弹，但它引入了一个反直觉的副作用：检索到的片段在向量空间里确实"相似"，却往往是脱离原语境的断章。一段被检索出来的用户评论可能缺少"这是三年前的反馈"这一时间约束，一段技术文档片段可能丢失了"以下配置仅适用于企业版"的限定条件。模型拿到这些看似相关的碎片后，会因为信息完整性的错觉而自信地生成错误结论，且这种幻觉比纯虚构更难排查——因为检索结果确实来自真实文档，错误根源在于"相关性≠充分性"这一隐蔽断层。

#### RAG 反噬：有依据幻觉与跨片段一致性校验

如果说"上下文完整性陷阱"暴露的是"信息不够"，那 RAG 还有一层更隐蔽的风险——"信息够了，但拼接错了"。当检索系统返回多个真实片段后，模型在整合这些片段时会产生**有依据幻觉（Grounded Hallucination）**：每个引用都真实存在，但模型错误地建立了它们之间的因果关系或时序关系。

这种幻觉比纯编造更难检测。传统事实核查工具只会验证"引用是否存在"，而不会验证"引用之间的逻辑组合是否合理"。工程上，这意味着 RAG 系统不能止步于检索质量优化，还必须额外引入**跨片段一致性校验**——对多个检索片段之间的时序、因果、逻辑一致性进行显式验证，否则只是将"无依据幻觉"转化为更难排查的"有依据幻觉"。

#### RAG 幻觉的形态迁移

RAG 常被当作消除幻觉的银弹，但它真正做的是把幻觉的发生位置从“模型凭空生成”迁移到“检索与生成边界”。当召回片段与用户问题并不真正相关、多个片段之间存在矛盾、或者模型越过片段做过度推断时，答案仍然会出现事实错误。这类错误更难排查，因为检索结果往往来自真实文档，给人一种“有依据”的错觉。工程上，优化的重点应放在召回质量、上下文一致性和生成约束上，而不是认为接入向量库就解决了幻觉问题。

见：[More Data, More Delusion: Why RAG chatbots hallucinate and how to fix it @IBM](https://community.ibm.com/community/user/blogs/adarsh-c-s/2025/06/19/rag-chatbots-hallucination)

#### RAG 评估的盲区

* [RAGAS faithfulness 无法捕获"伪忠实"幻觉](/maps/_ai/evaluation/evaluation-framework#ragas-faithfulness-无法捕获伪忠实幻觉)

#### 引用溯源不等于证据可信

RAG 让模型“基于检索内容回答”，但模型生成引用时仍会出现三种典型偏差：编造不存在的来源、把片段张冠李戴到错误文档、或者引用了真实片段却断章取义。CiteFix 论文指出，行业研究中流行的生成式搜索引擎引用准确率仅约 74%，这意味着每四条引用就有一条存在问题。因此生产环境需要把引用与原始 chunk 的 ID、页码、版本做刚性绑定，并在生成后做引用与原文的二次校验，而不是把“模型说了出自某文档”直接当成证据。

见：[CiteFix: Enhancing RAG Accuracy Through Post-Processing Citation Correction](https://arxiv.org/abs/2504.15629)

#### Chunk size 是嵌入模型的函数

RAG 流水线里“切成 500–1000 tokens”几乎是一个被重复到失去意义的默认值，但 chunk size 的真正约束来自 embedding 模型的训练分布与目标任务的查询类型。arxiv 2025 年的一项多数据集分析发现，较小 chunk（64–128 tokens）在事实型、短答案查询上表现更好，因为它减少了无关上下文对向量的稀释；而需要综合理解的复杂查询则需要 512–1024 tokens 的大 chunk 来保留上下文。更关键的是，不同 embedding 模型对 chunk size 的敏感度不同：Stella 这类模型擅于利用大 chunk 的全局上下文，而 Snowflake 在细粒度实体匹配上更依赖小 chunk。这意味着 chunk size 不是一次性的超参数，而是与模型能力、查询模式、数据特征绑定的设计决策，调错它会在检索阶段就系统性地丢失相关信息。

见：[Rethinking Chunk Size For Long-Document Retrieval: A Multi-Dataset Analysis](https://arxiv.org/abs/2505.21700)

#### Embedding 模型不是排行榜第一就最好

工程团队常把 embedding 模型选择简化为“选 MTEB 榜首”，但通用排行榜与真实领域检索质量之间往往没有显著相关性。FinMTEB 对 15 个模型在 64 个金融数据集上的评测显示，通用 MTEB 排名与金融领域表现的相关性统计上不显著；在特定领域，通用模型会把领域专有术语压缩成最接近的通用概念，例如 “EBITDA covenant breach” 被映射到 “contract violation”，导致高相似度检索结果在法律或事实上是错的。这种语义压缩损失不会因为调大 top-k 或加 reranker 而消失，因为问题发生在向量化阶段。正确的做法是把 embedding 选择当作领域对齐决策：评估时用自己的领域查询-文档对做召回测试，必要时使用领域微调模型或句子级领域适配。

见：[Why Your Embeddings Are the Wrong Shape for Your Domain](https://ranjankumar.in/rag-engineering-embedding-model-domain-mismatch)

#### 生产环境检索默认是 hybrid + rerank

只依赖稠密向量检索的生产 RAG 很快就会遇到“语义相近但关键词不同”或“专业术语被平均化”的问题。典型场景是工程师查询 “dead-letter queue threshold configuration”，稠密检索却把讲 exponential backoff 的文档排在前面，因为 embedding 把两者压缩到了相近的语义空间；真正需要的文档可能排在第 11 位，刚好在 top-k 之外。解决路径通常是 hybrid search：用 BM25/sparse 检索补齐精确术语匹配，再用 cross-encoder reranker 对合并后的候选重新打分，因为 bi-encoder 把整段 chunk 压缩成单一向量的过程会丢失细节，而 reranker 可以用查询-文档交互计算更精确的相关性。在大多数企业知识库场景里，hybrid + rerank 已经从“优化项”变成默认配置。

见：[Hybrid Search and Re-Ranking in Production RAG](https://towardsdatascience.com/hybrid-search-and-re-ranking-in-production-rag/)

#### 检索结果的顺序会改变 LLM 答案

RAG 系统常常把检索到的 top-k chunk 按检索分数直接拼接进 prompt，却忽略了 LLM 对上下文位置的非线性注意力。研究表明 LLM 对输入开头和结尾的信息赋予更高权重，中间部分则容易被“lost in the middle”。这意味着同样一组 chunk，按不同顺序交给模型，生成的答案可能偏向排在最前或最后的片段，而不是真正最相关的片段。工程上不能只做“召回 top-k”，还需要设计 chunk 排序策略：按相关性重排、把关键证据放在上下文两端、限制总长度，甚至在排序后做二次一致性校验，否则检索质量的提升会被生成阶段的位置偏差抵消。

见：[LLM Position Bias: Primacy and Recency Effects in Prompts](https://intuitionlabs.ai/articles/llm-position-bias-primacy-recency-effects)

## Domain

* [设备端信息检索](/maps/_ai/rag/on-device-info-retrieval)
