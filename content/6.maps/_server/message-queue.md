---
title: 消息队列与异步任务
description: 消息队列模型对比、顺序性保证、异步任务处理方案谱系
---

#### NSQ 与 Kafka 的消息模型差异

NSQ 采用 topic + channel 模型：一个 topic 下每个 channel 收到全量消息副本，channel 内多消费者竞争消费，
天生无单点故障，但不保证消息顺序、也没有 partition 概念，更像“广播 + 竞争消费”。
Kafka 采用 topic + partition + offset 的日志模型，partition 内严格有序、持久化、可重放，
适合事件溯源与高吞吐流处理，但依赖较重的协调服务（KRaft/ZooKeeper）。
选型上：需要轻量实时分发、能容忍乱序选 NSQ；需要顺序保证、持久化回放、海量吞吐选 Kafka。

见：[NSQ Design](https://nsq.io/overview/design.html)

#### ShardingKey 在 NSQ 下不生效

很多 MQ 抽象层提供 WithShardingKey(key) 语义，意图让相同 key 的消息路由到同一分片、由同一消费者顺序处理。
但这个保证依赖底层 MQ 的 partition 机制：Kafka 把 key 哈希到固定 partition、
Pulsar/RMQ 按 key 路由分片，都能兑现串行承诺；
而 NSQ 没有原生 partition 概念，producer 的 Publish 只投递到 topic，ShardingKey 会被静默忽略。
当抽象层以 NSQ 为后端时，“同 key 串行”实际并未成立，
需靠业务层的状态机、幂等 upsert 或外部锁兜底。这是切换 MQ 实现时容易被忽略的隐性功能退化。

见：[NSQ Design - Guarantees](https://nsq.io/overview/design.html)

#### 异步任务处理的方案谱系

异步任务（文档解析、报表生成等）的落地存在一条由轻到重的谱系，可靠性与复杂度递增：
Redis BLPOP（阻塞弹队列，最简但无 ACK、宕机会丢）、
Redis Stream（消费者组 + ACK + 持久化，类 mini Kafka）、
Celery/Sidekiq（任务队列框架 + broker，带重试与任务管理）、
专业 MQ + 手写状态机 + checkpoint（可靠但需自研编排）、
Temporal（workflow 引擎，长事务、可恢复、可视，最重）。
选型原则是先估算任务量与可靠性需求，从最轻方案起步，避免一开始就上重型编排引擎。

见：[Redis Streams introduction](https://redis.io/docs/latest/develop/use/data-types/streams/)
