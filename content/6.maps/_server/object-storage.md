---
title: 对象存储
description: 对象存储核心概念、MinIO 基础与业务系统接入姿势
---

#### MinIO 定位：私有化环境的 S3 平替

MinIO 是用 Go 编写的高性能开源对象存储服务端，单二进制部署，核心卖点是 S3 兼容（S3-compatible）：
应用直接用 AWS SDK 把 endpoint 指向 MinIO 即可工作，迁移到真 S3 时业务代码零改动。
它的典型角色是私有化/内网环境下的 AWS S3 替代方案，常见于 AI/ML、数据密集型场景的自建存储底座。
学习 MinIO 本质上是学习 S3 的模型，差异只在 endpoint 和认证来源。

见：[MinIO Concepts](https://github.com/minio/docs/blob/main/source/operations/concepts.rst)

#### 核心概念：Bucket、Object 与纠删码

Bucket（桶）是对象的顶层命名空间；Object（对象）= 文件内容 + 元数据，以 `bucket/path/name` 形式的 key 寻址。
MinIO 不做 RAID 或多副本，而是用纠删码（Erasure Coding）：把对象切成数据分片 + 校验分片
散布在一组磁盘（Erasure Set）上，丢失若干块盘仍能在线重建，冗余开销远低于副本。
另有位衰减修复（Bit Rot Healing）：每次 GET/HEAD 自动做哈希校验，发现静默损坏就从其他分片就地修复。
选盘靠对象名 + 路径的确定性哈希，无中心元数据服务，任意节点都能处理请求，这是它水平扩展的关键。

见：[MinIO Concepts](https://github.com/minio/docs/blob/main/source/operations/concepts.rst)

#### SDK 接入与 presigned URL

两个流派：官方 minio SDK（minio-js、minio-py、minio-go）API 顺手、自带 presigned 便捷方法；
或 AWS SDK 把 endpoint 指向 MinIO——此时必须开启 forcePathStyle（路径风格寻址），
否则默认的 virtual-hosted 风格（bucket 塞进域名）会导致签名或 DNS 解析失败，这是接入 MinIO 最常见的坑。
presignedGetObject 生成的签名 URL 可在指定时间内免凭证下载，是私有桶对外放行的标准姿势。
有效期由 expires 参数决定（URL 里编码为 X-Amz-Expires 秒数，服务端校验"签发时间 + expires"）；
SigV4 规定上限 7 天（604800 秒），这也是许多业务把默认有效期写成 `3600*24*7` 的原因。

见：[minio/minio-js](https://github.com/minio/minio-js)

#### 业务系统接入姿势：元数据在 DB，字节在对象存储

以 coze-studio（扣子开源版）为例，它把 MinIO 封装在仅有 7 个方法的 Storage 接口后
（minio/s3/tos 三实现按环境变量切换），业务层的文件元数据（文件名、归属、雪花 ID）
存在 MySQL files 表，MinIO 只当字节仓库，两者用对象 URI 关联。
URI（对象 key，如 `icon/12345.png`）是稳定标识符，不含域名、签名与过期时间；
URL 则是绑定了 endpoint、签名和有效期的易失访问地址。
DB 只存 URI、读取时现签 URL，历史数据才不会因签名过期、换桶或换域名而失效。
这一分层的推论：读大文件应直接发签名 URL 让客户端直连，
而不是让后端 GetObject 全量读进内存中转。

见：[coze-studio minio.go](https://github.com/coze-dev/coze-studio/blob/main/backend/infra/storage/impl/minio/minio.go)

#### 对象 Tagging 承载业务归属信息

S3 模型的对象标签（Tagging）是随对象存储的键值对，适合写入归属类元数据。
coze-studio 上传时用 `WithTagging(uid, conversation_id, type)` 把上传者与会话归属打到对象上，
列举时以 `WithMetadata` 选项批量带回，实现"谁传的、属于哪个业务实体"的追溯，而不必回查业务库。
注意对象存储没有数据库意义的索引：唯一可检索维度是 key 本身（List 按 key 字典序 + Prefix 过滤），
tag 不在任何查询路径上——S3 API 没有"按 tag 找对象"的操作。
所以标签只承载归属追溯类静态信息；任何多维检索（按用户分页、按类型筛选）都必须靠业务 DB 建表。

见：[coze-studio minio.go](https://github.com/coze-dev/coze-studio/blob/main/backend/infra/storage/impl/minio/minio.go)

#### presigned URL 作为唯一读取出口

coze-studio 的设计里桶保持完全私有，所有读取都经 GetObjectUrl 现签发出（默认 7 天有效期）；
上传也不把 MinIO 凭证下发给客户端，而是前端传到自家后端、后端中转 PutObject 进桶。
这套"默认私有、签名放行、凭证不出后端"的姿势牺牲了直传吞吐（上传流量全过应用服务器），
换来私有化部署下的凭证安全与审计便利。
上传侧并非只能后端中转，浏览器直传 MinIO 有三种标准姿势，长期凭证同样不出后端：
presigned PUT URL（后端为单个 key 签名，浏览器直接 PUT）、
presigned POST Policy（表单直传，可限定文件大小与 key 前缀）、STS 临时凭证。

见：[coze-studio minio.go](https://github.com/coze-dev/coze-studio/blob/main/backend/infra/storage/impl/minio/minio.go)

#### 列举对象的流式语义与假分页反模式

minio-go 的 ListObjects 返回 channel：SDK 内部自动分页（S3 ListObjectsV2 每页最多 1000 条，
用 ContinuationToken 逐页拉取），对象逐个产出，调用方边收边处理，内存 O(1)；
收够数量就 break，剩余分页根本不会发请求。
把 channel 榨干成数组（for range 全量 append）就亲手消费掉了流式能力——
coze-studio 的 ListObjectsPaginated 正是如此：内部全量拉完再返回 `IsTruncated=false`，
桶内对象变多后接口退化为全量扫描。
真分页的姿势：MaxKeys=pageSize，收够即停，最后一个 key 作为 cursor 返回，下次用 StartAfter 续传。

见：[minio/minio-go](https://github.com/minio/minio-go)

#### 资源分发的方案谱系：公开读、presigned 与 STS

前端展示私有图片用 presigned GET URL 是标准做法（img src 直接渲染，无需凭证），
真实痛点是每次渲染要后端签发、长签名串对 CDN 缓存键不友好、URL 泄漏即资源泄漏（有效期内任何人可用）。
按场景选方案：完全公开资源（默认头像、公开图标）用桶级公开读 policy，URL 永久稳定且 CDN 友好；
私有资源展示用 presigned GET；浏览器直传单文件用 presigned PUT / POST Policy；
浏览器分片直传大文件或第三方系统直连，再上 STS 临时凭证——
MinIO 内置 AssumeRole，零额外组件，可附 session policy 收窄权限，临时凭证默认短时效。
STS 的必要场景很窄，普通图床用 presigned 组合即可，不值得过早引入 STS 的复杂度。

见：[MinIO STS AssumeRole](https://github.com/minio/minio/blob/master/docs/sts/assume-role.md)
