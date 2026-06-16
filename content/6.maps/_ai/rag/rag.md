---
title: RAG
description: 检索增强生成（Retrieval-Augmented Generation）模型与技术
original_path: _ai/rag.md
---

## 简介

RAG 技术意味着在生成数据前将检索到的高质量数据作为上下文提供给模型，以减少幻觉，获得更好的生成质量。在实践中，通常首先要将文档及相关数据以向量化或文档搜索的方式储存在数据库中，如：pgvector 等。在收到给定提示后，数据库会被调取以检索相关文档，然后这些文档会与提示结合在一起，为 LLM 提供更丰富的上下文。

相关限制：模型的上下文大小。

#### RAG 与 Fine-tuning 是正交优化

企业级知识库常被描述为"RAG 优先、Fine-tuning 补充"，但二者其实优化的是不同维度。RAG 解决的是"模型不知道"——上下文缺失、知识过期、私域数据未参与训练；Fine-tuning 解决的是"模型行为不对"——输出格式不稳定、语气不符、推理路径不一致。OpenAI 的优化指南把二者放在正交矩阵里：RAG 属于上下文优化，Fine-tuning 属于 LLM 行为优化。试图用 Fine-tuning 注入大量新知识，反而容易让模型在回答超出训练分布的问题时与预训练知识冲突，产生更多幻觉。因此知识库问答的底座应是 RAG，Fine-tuning 只用于格式化、风格化或特定推理模式固化。

见：[Optimizing LLM Accuracy | OpenAI API](https://developers.openai.com/api/docs/guides/optimizing-llm-accuracy)

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

#### 1536 维不是通用标准

很多开发者会把 1536 维当作 Embedding 的“默认规格”，这其实是 OpenAI text-embedding-3-small 和已退役的 ada-002 的模型特定输出，而非协议或标准。text-embedding-3-large 默认输出 3072 维，Cohere、Voyage、Google 等模型的维度也各不相同；Matryoshka 表示模型甚至允许在 256 到完整维度之间动态截断。选型时真正需要比较的是模型在目标领域查询上的召回表现，而不是默认维度数字本身，否则容易把某个厂商的实现细节当成行业基准。

见：[Choose the right dimension count for your embedding models](https://devblogs.microsoft.com/azure-sql/embedding-models-and-dimensions-optimizing-the-performance-resource-usage-ratio/)

#### Embedding 维度可被压缩

现代 Embedding 模型（如 text-embedding-3 系列）支持在 API 层直接缩短输出维度，而不需要重新训练或导出模型。OpenAI 官方给出的例子是，text-embedding-3-large 缩短到 256 维后，在 MTEB 上仍能超过未截断的 1536 维 ada-002。这意味着向量存储、索引构建和距离计算的内存与计算成本可以下降数倍，而检索质量未必同步下降。工程上的常见误区是为了“保留全部信息”坚持使用完整维度，结果白白浪费了存储和索引预算；正确做法是根据召回测试确定满足业务需求的最小维度。

见：[Choose the right dimension count for your embedding models](https://devblogs.microsoft.com/azure-sql/embedding-models-and-dimensions-optimizing-the-performance-resource-usage-ratio/)

#### 余弦相似度会丢弃幅度信息

余弦相似度只比较两个向量的夹角，忽略向量的长度。在文本 Embedding 场景里，这种“尺度不变性”通常被认为是优点，因为它让短句和长句可以在同一尺度上比较。但当向量模长本身携带语义信号时——例如模型对置信度、显著性或频率的编码——余弦相似度会把这些信息一并丢掉，导致两个方向相近但“语义强度”不同的向量得到相同分数。近年研究指出，这在某些检索任务中会造成系统性的误判，因此不能无条件把余弦相似度当作 Embedding 比较的默认答案，尤其是在语义强度或置信度本身构成排序依据的场景。

见：[Semantics at an Angle: When Cosine Similarity Works Until It Doesn’t](https://arxiv.org/html/2504.16318v1)

#### Embedding 维度并不对应可解释特征

初学者常把 1536 维想象成“性别、年龄、地域”等可解释特征的线性列表，但真实 Embedding 的每一维都高度纠缠，单独某一维通常没有稳定的人类语义标签。这种类比只是教学工具：Embedding 是神经网络把文本压缩到连续语义空间后的分布式表示，语义信息分散在众多维度及其非线性组合中。把维度当作可解释特征来调优或筛选，容易引入错误假设，比如认为删除“看起来不重要”的维度只会损失边缘信息。工程上应把它当作一个整体向量处理，依赖距离度量或下游任务表现来评估，而不是逐维解读。

见：[The Dimensions of dimensionality](https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(24)00189-X)

#### 语义缓存的成本杠杆

传统缓存只命中完全相同的问题，而 RAG 场景中大量问题语义相近但措辞不同。语义缓存通过比较查询向量把相似问题归为一类，命中一次就能跳过 embedding、检索、rerank、生成整条链路。在高并发、问题重复度高的场景中，这能显著降低延迟和资源消耗。但它的阈值设置、缓存失效和多租户隔离是落地关键，调得不好要么命中率过低浪费算力，要么返回过期甚至不该被该用户看到的内容。

见：[Semantic Caching: Accelerating beyond basic RAG @Brain Co](https://brain.co/blog/semantic-caching-accelerating-beyond-basic-rag)

#### 语义缓存的伪命中陷阱

Semantic Cache 被用来降低 Token 成本和延迟，思路是"两个问题语义相似就复用答案"。但语义相似不等于答案相同。Membrane Labs 的实验显示，在企业常见的模板化查询中，"Is X allowed?" 和 "Is X not allowed?" 这样的否定对，BGE 嵌入的余弦相似度可达 0.94，远高于 0.85 的常见阈值；而更隐蔽的"Is leave paid?" 与 "Is leave unpaid?" 这种单个词翻转，也会导致缓存把错误答案返回给另一个问题。由于缓存命中不会触发 LLM 生成，监控系统只能看到高命中率，看不到答案错误率在暗中上升。工程上需要把语义相似度阈值和答案一致性校验结合，比如对命中的缓存答案再做一次轻量的事实核对，或者对否定词、限定词敏感的问题绕过缓存。

见：[Your RAG Cache Is Serving Wrong Answers. Here's The Proof. — Membrane Labs](https://www.membranelabs.org/research/rag-cache-wrong-answers)

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

#### 父子文档检索的是定位符而非上下文

RAG 里 Retrieval 和 Generation 对 chunk 大小的需求天然矛盾：检索希望 chunk 小，向量表示紧凑、相关信号集中；生成希望 chunk 大，能读到完整上下文。Parent-Child 的做法不是找折中点，而是把两个阶段的输入拆开：索引阶段把大文档切成小 chunk（child）做向量检索，查询命中后并不把 child 直接送进 LLM，而是根据 child 的 `parent_id` 把更大的原始段落召回。这样 child 只承担“定位符”的角色，真正用于生成的文本保留了父级完整语义。LangChain 的 `ParentDocumentRetriever`、Elasticsearch 的 nested 文档都可以实现这种两层映射。代价是索引体积翻倍，且父文档也不能无限大，否则仍会遇到上下文窗口或重排模型截断，但对于合同、技术手册等强依赖上下文的文本，这是缓解“检索到了但答不了”的最直接杠杆。

见：[Chunking Strategies for RAG: Fixed-Size, Semantic, and Hierarchical](https://mljourney.com/chunking-strategies-for-rag-fixed-size-semantic-and-hierarchical/)

#### 重叠切分修不了语义边界断裂

固定大小切分加一个 10–20% 的 overlap，是工程上最顺手的平滑手段，但它只能保证相邻 chunk 有共享文本，不能保证共享文本落在语义完整的边界上。如果一句话或一个论证刚好跨在 chunk 边界两侧，overlap 只会让同一半句话在两个 chunk 里重复出现，真正需要的另一半仍然在另一个 chunk 里。Ertas 的对比基准里，固定大小 chunking 在结构化文档上召回率垫底（Recall@5 仅 64–73%），而语义切分通过 sentence embedding 的相似度下降点来放置边界，能显著降低“切在论点中间”的概率。它的成本是索引阶段要把每句话都嵌入一次，latency 可能增加数倍；因此 overlap 更适合作为基线兜底，而不是解决边界问题的终极方案。

见：[RAG Chunking Strategy Benchmark: Fixed-Size vs Semantic vs Document-Aware](https://www.ertas.ai/blog/rag-chunking-strategy-benchmark-fixed-semantic)

#### 嵌入模型会静默截断超长 chunk

选择 chunk size 时如果只盯 LLM 的上下文窗口，会忽略另一个更隐蔽的约束：embedding 模型本身有固定的最大序列长度。OpenAI `text-embedding-3-small`、sentence-transformers 常见模型是 512 或 8192 tokens 不等，一旦 chunk 超过该长度，超出部分会被 tokenizer 直接截断，不会报错也不会在向量里留下痕迹。Redis 的实践说明把这比作“chunk 的末尾消失”——检索时你仍会得到一个向量，但它只代表了 chunk 的前半段，真正位于尾部的事实、条件或免责声明并未参与相似度计算。更危险的是，截断发生在嵌入阶段，下游检索和 rerank 都以为拿到的是完整文本，直到生成结果出错才被发现。因此 chunk size 必须同时满足 LLM 上下文、embedding 模型 max sequence length 和 reranker max_length 三个约束中最短的那一个。

见：[Best Chunking Strategies for RAG Pipelines](https://redis.io/blog/chunking-strategy-rag-pipelines/)

#### Reranker 的 max_length 是 chunk 新上限

很多企业 RAG 在向量检索后加一层 cross-encoder reranker，以为只要 embedding 模型能吞下大 chunk 就没问题；但 reranker 会把 query 和 chunk 拼接成一对输入，也受 max_length 限制。`ms-marco-MiniLM` 默认 max_length 只有 512，如果 chunk 平均 400 tokens、query 20 tokens，query-document pair 就经常超出阈值，尾部被截断后 reranker 其实是在不完整文档上打分。即便换成 `BGE-Reranker-v2-m3` 这类支持 8192 tokens 的模型，输入变长也会直接增加推理延迟：CPU 上重排 30 个候选就可能多花 200–400ms。于是 chunk 大小的决策从“LLM 能装下”和“embedding 能装下”进一步收紧到“reranker 能在限定长度内完整读完”，否则高成本重排环节打分失真，反而把真正相关的文档挤出 top-k。

见：[How to Use Cross-Encoders for Reranking in RAG Pipelines](https://mljourney.com/how-to-use-cross-encoders-for-reranking-in-rag-pipelines/)

#### PDF 表格转 Markdown 会引入结构幻觉

数据切片阶段常把 PDF 表格交给 Unstructured 或 GPT-4o-mini 转成 Markdown，认为这样比纯文本更保留行列结构。但复杂表格中的合并单元格、跨行表头、嵌套层级对模型来说仍是视觉推理难题，GPT-4o Vision 在处理复杂表格时会出现“看起来合理但单元格错位”的情况，模型会为了补全行列结构而“脑补”数值或标签。结果 Markdown 虽然语法正确，实际内容已经失真，向量检索会把这些错误片段召回给 LLM，导致答案带着错误的行列关系。工程上需要对表格抽取结果做结构化校验，比如与原始 PDF 的 OCR 结果做单元格级对比，或把表格作为独立实体建立“表头-行-单元格”元数据，而不是直接塞进文本切片。

见：[GPT-4o-vision for extraction of complex tables - OpenAI Developer Community](https://community.openai.com/t/gpt-4o-vision-for-extraction-of-complex-tables/1138461)

#### BGE-M3 的中文优势不等于领域优势

面试答案常把 "换更好的模型" 简化为 "BGE-M3 中文好"，但 BGE-M3 的多语言优势来自多语言多粒度预训练，支持 100 多种语言和稠密、稀疏、多向量三种检索模式；这并不意味着它在金融、法律、医疗等垂直领域自动优于领域微调模型。通用多语言模型可能把领域专有术语压缩成最接近的通用概念，例如把 "EBITDA covenant breach" 映射到 "contract violation"，造成语义损失。模型选型时，语言能力是必要条件，但充分条件是与自身查询-文档分布的对齐度。

见：[BGE-M3 — BGE documentation](https://bge-model.com/bge/bge_m3.html)

#### Embedding 模型不是排行榜第一就最好

工程团队常把 embedding 模型选择简化为“选 MTEB 榜首”，但通用排行榜与真实领域检索质量之间往往没有显著相关性。FinMTEB 对 15 个模型在 64 个金融数据集上的评测显示，通用 MTEB 排名与金融领域表现的相关性统计上不显著；在特定领域，通用模型会把领域专有术语压缩成最接近的通用概念，例如 “EBITDA covenant breach” 被映射到 “contract violation”，导致高相似度检索结果在法律或事实上是错的。这种语义压缩损失不会因为调大 top-k 或加 reranker 而消失，因为问题发生在向量化阶段。正确的做法是把 embedding 选择当作领域对齐决策：评估时用自己的领域查询-文档对做召回测试，必要时使用领域微调模型或句子级领域适配。

见：[Why Your Embeddings Are the Wrong Shape for Your Domain](https://ranjankumar.in/rag-engineering-embedding-model-domain-mismatch)

#### Multi-Query 的隐性成本与适用边界

Multi-Query 通过 LLM 把用户问题改写成多个查询变体再分别检索，确实能覆盖同义表达和不同侧面，但工程上它引入了一条几乎被面试答案忽略的隐性成本链：每多一个变体就要走完整的一次 embedding、检索、去重链路，token 消耗和延迟与变体数量近似线性增长；合并结果时还要处理不同查询召回的分数不可比问题。因此它提升的是召回率的上限，却以成本和响应时间为代价，更适合高价值查询或离线链路，而不是无差别地加在所有请求上。

#### 混合检索的固定权重是起点而非答案

原始答案里 "0.7 × Vector + 0.3 × BM25" 是一个教学示例，不是通用配方。向量检索擅长语义近似但关键词不同的表达，BM25 擅长命中精确术语和产品型号；不同查询分布下两者的贡献差异很大。真实系统里权重应当根据数据集动态调优，比如专业术语密集的查询应提高 BM25 权重，口语化、同义替换多的查询则应提高向量权重，否则混合检索只是形式上组合，实质上仍偏向某一侧。

见：[Hybrid Search: Combining BM25 and Vector Retrieval for Production RAG](https://sureprompts.com/blog/hybrid-search-implementation-guide)

#### 生产环境检索默认是 hybrid + rerank

只依赖稠密向量检索的生产 RAG 很快就会遇到“语义相近但关键词不同”或“专业术语被平均化”的问题。典型场景是工程师查询 “dead-letter queue threshold configuration”，稠密检索却把讲 exponential backoff 的文档排在前面，因为 embedding 把两者压缩到了相近的语义空间；真正需要的文档可能排在第 11 位，刚好在 top-k 之外。解决路径通常是 hybrid search：用 BM25/sparse 检索补齐精确术语匹配，再用 cross-encoder reranker 对合并后的候选重新打分，因为 bi-encoder 把整段 chunk 压缩成单一向量的过程会丢失细节，而 reranker 可以用查询-文档交互计算更精确的相关性。在大多数企业知识库场景里，hybrid + rerank 已经从“优化项”变成默认配置。

见：[Hybrid Search and Re-Ranking in Production RAG](https://towardsdatascience.com/hybrid-search-and-re-ranking-in-production-rag/)

#### Rerank 候选池大小是精度与延迟的关键杠杆

"先召回 50 个再精选 Top-5" 是常见的召回-精排模式，但 50 这个数值本身不是最佳实践而是权衡结果。Cross-Encoder 的评分复杂度与候选数线性相关，候选池越大，reranker 延迟越高，边际精度增益却可能递减。工程上应把候选池当作可配置杠杆：先用 embedding 和 hybrid search 把前 N 个候选压准，再让 reranker 处理尽可能少的文档；同时用延迟 P99 和精度 A/B 测试共同决定 N，而不是照搬 50。

#### Reranker 的延迟可能高过 LLM

检索优化中提到 Reranker 能把 50 个候选压缩成 Top-5，这确实能提升上下文精度，但代价常被低估。BGE-Reranker 本质是 cross-encoder，每次评分都要把 query 和 document 一起喂给 Transformer，计算复杂度随候选数线性增长。实测 BGE-reranker-v2-m3 在 CPU 上重排几个文档就要 200-400ms，几乎接近甚至超过一次轻量 LLM 调用的耗时；即便在 GPU 上也需要 50-100ms。BGE 官方文档也强调 cross-encoder 是为了“平衡准确率和时间成本”而使用。如果检索阶段已经用好的 embedding 和 Hybrid Search 把候选压得很准，Reranker 的边际收益可能抵不上它引入的延迟和部署成本，需要把检索精度、延迟 P99、GPU 预算一起评估 ROI。

见：[BGE-Reranker — BGE documentation](https://bge-model.com/bge/bge_reranker.html)、[Best Reranker Models for RAG: Open-Source vs API Comparison (2026)](https://docs.bswen.com/blog/2026-02-25-best-reranker-models/)

#### 检索结果的顺序会改变 LLM 答案

RAG 系统常常把检索到的 top-k chunk 按检索分数直接拼接进 prompt，却忽略了 LLM 对上下文位置的非线性注意力。研究表明 LLM 对输入开头和结尾的信息赋予更高权重，中间部分则容易被“lost in the middle”。这意味着同样一组 chunk，按不同顺序交给模型，生成的答案可能偏向排在最前或最后的片段，而不是真正最相关的片段。工程上不能只做“召回 top-k”，还需要设计 chunk 排序策略：按相关性重排、把关键证据放在上下文两端、限制总长度，甚至在排序后做二次一致性校验，否则检索质量的提升会被生成阶段的位置偏差抵消。

见：[LLM Position Bias: Primacy and Recency Effects in Prompts](https://intuitionlabs.ai/articles/llm-position-bias-primacy-recency-effects)

## Domain

* [设备端信息检索](/maps/_ai/rag/on-device-info-retrieval)
