---
title: Actor 模型
description: Actor 并发计算模型的核心结构、消息语义、工程价值与代表实现
---

#### Actor 模型：以异步消息为唯一交互的并发单元

Actor 模型是 Carl Hewitt 于 1973 年提出的并发计算模型（Model of Concurrent Computation），把 actor 作为计算的最小单元，
如同面向对象以对象为最小单元。每个 actor 由私有状态、行为与邮箱（Mailbox）三部分组成，外界无法直接读写其状态，
唯一的交互方式是异步消息传递（Asynchronous Message Passing）——没有共享内存，也就没有锁与竞态条件。

actor 一次只处理一条消息，这给了它单线程语义，内部状态不需要任何锁。处理一条消息时它可以做三件事的任意组合：
向其他 actor 发送有限条新消息、创建有限个新 actor、指定处理下一条消息时自己的行为（相当于更新状态）。

模型的工程价值集中在三点：

- 位置透明性（Location Transparency）：发消息不关心对方在本地还是另一台机器，同一套代码天然分布到集群
- 监督与自愈（Supervision）：Erlang 的 "let it crash" 哲学——actor 崩溃由监督者重启，而非层层防御式编程
- 可推断的并发：因果链沿消息走，比锁模型容易推理

发消息分两种形态：tell（发射后不管，发出即返回）与 ask（请求-响应，发出后拿到 future 等回信）。
代表实现有 Erlang/Elixir（BEAM 虚拟机）、Akka（JVM）、Microsoft Orleans（.NET）。

见：[Actor model - Wikipedia](https://en.wikipedia.org/wiki/Actor_model)
