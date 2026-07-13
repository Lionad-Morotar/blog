---
title: Redis
description: About Redis
original_path: content/6.maps/_database/redis.md
---

## 数据结构及其操作

#### `NX`和`XX`如何记忆？

设置字符串的值时，`NX`是当值不存在才能设置，`XX`是存在才能设置（更新），所以可以分别理解为"Not Exist"和"Exist"。

#### 常见的键名风格？

有"::"、"->"和"."等，如键名"article::id::code"

#### 字符串 `GETRANGE` 和 JavaScript 的 `slice` 对比？

JS 的 Slice 方法是基于位置的，而 Redis 的 GetRange 是基于索引，所以：

```bash
set "hello world" "hello world"
getrange "hello world" 0 4
# result is "hello"
```

```ts
"hello world".slice(0, 4) // result is "hell"
```

#### Redis 8 把检索/JSON/时序模块并入核心

Redis 8（2025 GA）是近年最大的架构升级：原来单独售卖的 RediSearch（全文检索 + 二级索引）、
RedisJSON、RedisTimeSeries、RedisBloom（概率结构）等模块全部并入开源核心，不再需要单独安装；
同时新增原生的 Vector Set 数据结构，直接支持语义检索与推荐场景。
此外还有 30+ 项性能优化（部分命令快 87%）。这使 Redis 从“缓存”演进为
“缓存 + 文档 + 向量检索 + 时序”的统一内存数据平台，对小项目可显著减少组件数量。

见：[What's new in Redis 8.0](https://redis.io/docs/latest/develop/whats-new/8-0/)

#### SSPL 争议与 Valkey 分叉

Redis 在 7.4（2024）从 BSD 改为 SSPL/RSALv2 双许可，引发开源社区震荡。
SSPL 要求“把数据库作为服务提供时必须开源整个服务栈（含监控、备份等配套）”，
OSI 据此拒绝承认其为开源协议，Debian/Fedora 随即移除 Redis。
随后 Linux Foundation 在 AWS/Google/Oracle 等支持下 fork 出 Valkey
（BSD-3，由前 Redis 核心维护者主导），AWS ElastiCache 已切换。
Redis 8（2025）回加 OSI 认证的 AGPLv3 试图修复关系，
但 Valkey 已成既定事实，双方长期并行。本质是“开源 vs 云厂商白嫖”的治理矛盾。

见：[What is Valkey? A comparison with Redis](https://redis.io/blog/what-is-valkey/)
