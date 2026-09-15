---
title: Langfuse OTel
description: Langfuse 的 OpenTelemetry 接入机制：OTLP 端点、v4 摄入头、属性映射与契约层桥接的踩坑与选型。
---

#### v4 摄入头决定数据实时性

直接经 OTLP 端点向 Langfuse 发送 span 时，`x-langfuse-ingestion-version: 4` 请求头决定数据走哪条摄入管道。缺这个头时数据落入旧管道，
最长延迟约 10 分钟才在 UI 与 v2 API 可见；带上则实时进入 v4 数据模型。排查“span 已导出却迟迟不可见”时，第一检查项是这个头是否被 collector
或 SDK 配置吞掉，而非 exporter 的 endpoint 拼写。OTel Collector 的 signal 级 headers 配置会覆盖通用级 `OTEL_EXPORTER_OTLP_HEADERS`，两处都要带上。

见：[Langfuse OpenTelemetry 接入文档](https://langfuse.com/integrations/native/opentelemetry)

#### trace 级属性必须传播到每个 span

Langfuse v4 数据模型的过滤与聚合越来越多跨 observation 进行，而非只在 trace 级。`userId`、`sessionId`、`metadata`、`tags` 等属性只设在 root
span 上时，按这些维度过滤和聚合会漏掉子 span 数据而失真。其机制在于 v4 把聚合粒度下沉到了 observation，属性必须在每个 span 上重复出现。
工程上应用 OpenTelemetry Baggage 配合 `BaggageSpanProcessor` 在 trace 上下文内自动复制这些键值；Langfuse SDK 用户可用 `propagate_attributes()`
（Python）或 `propagateAttributes()`（TS）一行解决。注意 baggage 会跨服务边界传播，不能放敏感信息。

见：[Langfuse OpenTelemetry 接入文档](https://langfuse.com/integrations/native/opentelemetry)

#### span 词汇决定 LLM 字段识别

Langfuse 从 OTel span 自动提取模型名、token 用量、成本，依赖的是 GenAI 语义约定（`gen_ai.*` 属性）与 `langfuse.*` 私有属性，裸 OTLP 协议本身不带
这些字段。这意味着厂商中立契约（如 `@earendil-works/pi-telemetry` 的 `pi.ai.*`、`pi.harness.*` 词汇）自研的 span，即使正确接入 OTLP 端点，
也只落成普通 span：链路树完整，但成本、token、模型列全部为空。adapter 层必须做属性名翻译，把自有词汇映射到 `gen_ai.*` 才能解锁 LLM 特性。

见：[Langfuse OpenTelemetry 接入文档](https://langfuse.com/integrations/native/opentelemetry)

#### 契约层与 OTel-native 的分层选型

LLM 遥测生产端有两种对立分层。厂商中立契约层把 span 抽象（callback 式 context、类型化 schema、adapter 一致性测试）做成不依赖任何后端的核心包，
OpenTelemetry 只是可替换 adapter 之一，换来 runtime 中立、无 ambient 状态、schema 编译期校验，代价是自研生态 instrumentation。OTel-native 则把
官方 OTel client 当底座直接暴露（Langfuse SDK v4 即如此），免费获得全部 OTel 生态 instrumentation，但契约与 OTel 的上下文模型、属性约定绑定。
接 Langfuse 时，契约层方案需要“契约 adapter → OTel SDK → OTLP 端点”两级桥接，词汇翻译发生在第一级；OTel-native 一级直达，但换后端就要重写
全部打点代码，契约层方案此时只换 adapter。

见：[pi-telemetry README](https://github.com/badlogic/pi-mono/tree/main/packages/telemetry)
