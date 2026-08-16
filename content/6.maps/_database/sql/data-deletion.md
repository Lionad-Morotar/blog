---
title: 数据删除策略
description: 软删除与硬删除的取舍依据、常见陷阱与归档清理方案
---

#### 软删除与硬删除的选择依据

删除策略没有银弹，判断顺序为：数据需要恢复吗、合规要求保留吗、量级多大、有关联数据吗、
删除是终局语义吗。软删除（Soft Delete）适用于用户可恢复的操作（回收站、云盘、待办）、
审计与合规留痕（订单、操作日志）、外键被引用的数据（硬删会级联报错或断链）、重建成本高的数据。
硬删除（Hard Delete）适用于敏感数据彻底清除（GDPR 被遗忘权要求物理擦除，仅标记不满足）、
低价值大流量数据（日志、事件流、中间态）、可再生成数据、高频写入需控制表膨胀的场景。
本质判断是数据属不可再生资产还是可再生资源：资产软删保恢复，资源硬删省空间；
合规（如 GDPR）是唯一能推翻该判断的强制力。

见：[Difference Between Soft Delete and Hard Delete - GeeksforGeeks](https://www.geeksforgeeks.org/dbms/difference-between-soft-delete-and-hard-delete/)

#### 软删除与唯一约束冲突

软删除记录仍占用唯一键，最典型是用户被软删除后邮箱无法重新注册。PostgreSQL 用 partial index
限定仅对活跃行建立唯一约束：

```sql
CREATE UNIQUE INDEX idx_users_email ON users (email) WHERE deleted_at IS NULL;
```

MySQL/MariaDB 无 partial index，用 generated column 让已删除行该列取 NULL（NULL 不参与唯一性比较）。
另一方案是删除时改写唯一键字段（如邮箱追加 `-deleted@` 后缀）。软删除把"删除"变成状态字段后，
唯一约束的语义从"全表唯一"变为"活跃记录内唯一"，所有既有唯一键都应重新审视。

见：[PostgreSQL 11.8. Partial Indexes](https://www.postgresql.org/docs/current/indexes-partial.html)

#### 软删除的级联断裂与查询遗漏

`ON DELETE CASCADE` 对软删除不生效：软删除是 UPDATE 而非 DELETE，子表不会自动联动，
需各自同步标记，漏一处就会查询到脏数据。软删除的正确性依赖每次查询都带 `deleted_at IS NULL`
过滤，漏一个条件就出 bug，工程上用 ORM 全局 scope、数据库视图或策略层统一兜底。
根源在于软删除把"删除"建模成生命周期状态，查询、外键、唯一约束全部要从"删除"思维切换到
"状态过滤"思维，四个坑都出自这一转换处。

见：[Soft Delete vs Hard Delete: The Trade-offs Nobody Tells You About - yousuf-dev](https://yousuf-dev.com/blog/soft-deletes-vs-hard-deletes)

#### 两段式删除：软删除 + 归档清理

软删除不等于不占空间，被标记行仍留在原表，高频写入场景下表膨胀会拖慢索引扫描，必须配合归档机制。
两段式删除（archival deletion）：用户视角立即软删除（秒级响应、可恢复、可审计），后台定时任务把
N 天前的软删除数据迁移到归档表或冷存储后物理清理。既保留可恢复性与合规留痕，又控制热表体积，
是生产环境兼顾两者的常见折中。

见：[Soft Delete vs Hard Delete: Patterns, Trade-offs, and GDPR Compliance - codelit](https://codelit.io/blog/soft-delete-vs-hard-delete)
