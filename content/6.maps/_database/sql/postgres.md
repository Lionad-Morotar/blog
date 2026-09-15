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

## 运维操作

#### 修改生产库密码：密码属于角色，不属于库

PG 的密码存在角色属性里，不属于某个数据库，一条 `ALTER USER x WITH PASSWORD` 对该角色可访问的所有库同时生效。
应用 env 里的 `DATABASE_URL` 只是客户端连接串：改 env 不改库，改库不改 env，
两处必须在同一次变更内同步，否则应用持旧密码持续报错。

平滑顺序（利用 PG 改密码不踢已认证连接的特性）：① `ALTER USER`（存量连接不断，应用无感）→
② 全量替换内嵌密码的连接串（env、compose、健康检查、跑批脚本）→
③ 重建应用容器读新 env，中断窗口仅重启几秒；数据库容器与镜像不动。

两个易错点：compose 的 `POSTGRES_PASSWORD` 只在首次初始化空数据目录时生效，
已初始化实例改它不动库密码，但要同步更新，避免重建 volume 时初始化出错位密码。
验证改密是否成功用新密码连接——报「库不存在」而非「密码认证失败」即认证已过。

见：[ALTER USER](https://www.postgresql.org/docs/current/sql-alteruser.html)
