---
title: jsonb
description: PostgreSQL 的 jsonb 类型：规范化存储模型、查询与索引语义、更新写放大与版本边界。
---

## 主题

#### jsonb 存解析树而非原文

jsonb 解决结构可变数据在关系库内的存储与查询问题。json 类型保存原始文本，每次查询重新解析，字节级保真；
jsonb 保存解析后的规范化树，查询快、可比较、可索引，但不承诺表示相等。查询代数分三层：取值操作符
`->` 与 `->>` 无索引支持；包含操作符 `@>` `?` `?&` `?|` 走 GIN 倒排索引；SQL/JSON 路径语言
（`jsonb_path_query`，PG12+）带过滤表达式、正则与 `last`，覆盖多数 JSON_TABLE 场景。更新模型上没有
原位子树更新：任何改动都整列重写并产生新行版本，`jsonb_set` 与整列赋值在 IO 上等价，大文档还会触发
TOAST 整体重写与 GIN 全量重插。边界：需要字段级约束（NOT NULL/FK/CHECK）、高频局部更新的大文档、
跨行按 JSON 内部值做关联、审计留痕要保留原始字节时，应改用普通列、拆行或 json 类型。版本现状：
SQL 标准函数全家桶（JSON_TABLE、JSON_EXISTS/JSON_VALUE/JSON_QUERY 与构造器）PG17 才落地，
PG18 补 jsonb null 可 cast 为标量、SIMD 解析加速与 GIN 并行建索引，PG16 及以下只能用路径语言表达等价查询。

见：[PostgreSQL Docs: JSON Types](https://www.postgresql.org/docs/current/datatype-json.html)

#### GIN 索引只覆盖包含类查询

GIN(jsonb) 只加速 `@>` `?` `?&` `?|` 这类包含/存在判断；`WHERE d->>'k' = 'v'` 这种取值后再过滤的谓词
永远走顺序扫描（PG16 万行表实测：建 GIN 后 `->>` 查询仍 Seq Scan，同数据的 `@>` 走 Bitmap Index Scan）。
取值谓词要走索引必须建表达式索引 `((d->>'k'))`。次生影响在优化器：没有表达式索引时 planner 对该表达式
没有统计，等值选择率默认按约 0.5% 猜测，大表 JOIN 会因低估行数选错算法；而表达式索引存在后 ANALYZE
会顺带收集该表达式的统计，一个索引同时修复索引路径与行数估算。

见：[pganalyze: Postgres planner JSONB selectivity](https://pganalyze.com/blog/5mins-postgres-planner-jsonb-selectivity)

#### jsonb 回读值不可直接做内容哈希

入库规范化决定了 jsonb 只保语义不保字节：对象键按长度加字典序重排、重复键静默取后者、数字统一为
numeric（`'{"a":1,"a":2}'` 回读 `{"a": 2}`，`1e2` 回读 100）。同一 JSON 字符串两次入库，回读的键序与
数字表示都可能不同于输入，因此原文比对、内容哈希、审计回放都不能依赖 jsonb 回读值；需要对 jsonb 内容
做确定性哈希时，先对对象键递归排序再序列化。要字节级保真，写入用 json 类型或 text。

见：[PostgreSQL Docs: JSON Types](https://www.postgresql.org/docs/current/datatype-json.html)
