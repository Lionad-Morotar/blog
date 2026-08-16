---
title: RESTful
description: REST 架构风格的实用主义落地：朴素 RESTful 核心约定、理查德森成熟度模型与 RPC 风格的工程取舍
---

## RESTful

#### 什么是朴素的 RESTful？

朴素的 RESTful 指业界对 REST 架构风格最常见的简化落地，核心约定有四条：以资源为中心组织 URL，路径用名词而非动词，
如 `/agents/42` 而非 `/getAgent?id=42`；用 HTTP 方法表达动作，GET 读、POST 增、PUT 全量替换、PATCH 部分更新、DELETE 删；
用语义化状态码承载结果，如 201 创建成功、404 不存在、409 冲突，而不是所有响应都返回 200 再在 body 里塞错误码；
每个请求自带完整上下文，服务端不保存会话状态。「朴素」的潜台词是砍掉了 HATEOAS（超媒体即应用状态引擎）——
Fielding 原教旨要求响应携带链接，客户端靠超媒体发现后续操作而非硬编码 URL，实践中几乎无人做到，
于是朴素 RESTful 事实上成了行业里「REST」这个词的默认含义。

见：[Fielding Dissertation: Chapter 5 REST](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)

#### 理查德森成熟度模型把 RESTful 分成四级

Leonard Richardson 提出的成熟度模型按对 HTTP 的利用深度把 RESTful 服务分为四级。
Level 0 把 HTTP 当传输隧道，单一端点、单一方法承载所有请求，SOAP 与 XML-RPC 属此类；
Level 1 引入资源概念，URL 按资源拆分，但仍只用单一方法（通常 POST）表达所有动作；
Level 2 充分利用 HTTP 动词与状态码，朴素 RESTful 即位于此；
Level 3 加入超媒体控制（HATEOAS），响应携带可用操作的链接，客户端状态迁移由超媒体驱动。
模型的价值在于提供一把刻度尺：评价一个 API 时先定位它在哪一级，而不是笼统争论「够不够 REST」。

见：[Richardson Maturity Model](https://martinfowler.com/articles/richardsonMaturityModel.html)

## 工程取舍

#### 内部 API 用 RPC 风格并不比 RESTful 差

朴素 RESTful 的收益——HTTP 缓存语义、标准化工具链、第三方无需文档即可推断接口形态——主要在对外开放 API 时才显著。
对内场景（如前端自配的 BFF 层）消费方只有自家代码，动词式路径（如 `/api/agent/list`）配合全 POST 反而直白，
与服务端文件路由一一对应，心智成本更低。正确做法是让风格服务于消费面：
公开契约追求 Level 2 的标准化，内部接口保持简单直接，不必为「看起来 REST」付出无谓的抽象成本。
