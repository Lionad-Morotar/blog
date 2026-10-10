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
把文本分词成词位，配合 `tsquery` 匹配、`ts_rank` 评分、GIN 索引加速，
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

## 并发与锁

#### 事务级 advisory lock 串行化同键并发写

pg_advisory_xact_lock(key) 对一个整数键加排他锁，拿不到就阻塞等待，持有到事务结束。它常用于给
「先 UPDATE 轮换旧行、再 INSERT 新行」这类逻辑补上并发互斥——例如要保证「同一用户同一来源任意
时刻至多一行活动会话」，移除 DB 唯一约束后，两个并发事务会各自跑完轮换 UPDATE（都没看到对方的
新行）再各自 INSERT，结果两行活动并存。advisory lock 以 user+来源为键把同键签发排成一队：后到者
进锁时已能看到先到者提交的行，轮换 UPDATE 便覆盖它，最终只剩最新一行。

advisory lock 只接受整数，文本键需经 hashtext() 哈希成 int4。用多字段拼键时必须以一个数据里
绝不出现的字符分隔（如码点 0 的 NUL 字节），否则 ("ab","cd") 与 ("abc","d") 会拼成同一串、
撞到同一把锁，让无关操作错误互斥。选事务级（_xact_）而非会话级：前者事务结束自动释放，配合事务块
天然防锁泄漏——会话级锁若忘记解、连接归还连接池后仍持锁，会锁死后续复用该连接的请求。hashtext
返回 32 位存在碰撞，但撞锁最多让两个无关操作假串行一次，不破坏正确性，是「小概率假串行换免用
bigint 双键」的可接受取舍。

见：[PostgreSQL: Advisory Locks](https://www.postgresql.org/docs/current/explicit-locking.html)
