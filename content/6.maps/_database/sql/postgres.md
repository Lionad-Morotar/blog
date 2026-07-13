---
title: Postgres
description: PostgreSQL 是一个强大的开源关系型数据库，通过丰富的插件生态可以覆盖多种数据场景。
original_path: content/6.maps/_database/postgres/index.md
---

## 扩展生态

#### Postgres 能替代哪些专用数据库？

传统架构中不同用途使用不同数据库：搜索用 Elasticsearch、缓存用 Redis、队列用 Kafka。但 Postgres 通过插件生态可以覆盖所有这些场景：全文搜索、JSON 存储、地理信息、消息队列等。

这种"一专多能"的选型思路可以显著降低技术栈复杂度，特别适合中小团队。当数据库的扩展性足够好时，单一工具往往比多工具组合更具维护优势。

> #周刊摘录 见：[科技周刊第385期](/articles/weekly-385)

#### tsvector 与 pgvector 互不依赖

PostgreSQL 的 `tsvector` 是内置的全文检索数据类型（PG 核心自带，PG 8.3/2008 年就有），
把文本分词成词位，配合 `tsquery` 匹配、`ts_rank` 排序、GIN 索引加速，
相当于把轻量 ES 嵌入数据库，`ts` 即 Text Search。
pgvector 则是独立的第三方扩展，给 PG 加向量类型与 HNSW/IVFFlat 索引做语义检索，
相当于把 Milvus 能力嵌入 PG。两者完全独立、可共存——组合起来在单一 PG 实例上
同时完成关键词召回（tsvector）与向量召回（pgvector），
小项目可借此替代 ES + Milvus 的双组件架构。

见：[PostgreSQL Full Text Search](https://www.postgresql.org/docs/current/textsearch.html)、[pgvector](https://github.com/pgvector/pgvector)
