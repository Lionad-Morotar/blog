---
title: 无边车的服务网格
description: 随着基于 sidecar 的服务网格在成本和运维复杂度上的问题持续存在，我们很高兴看到出现了另一种不依赖 sidecar 的服务网格选项：Istio Ambient 模式。
---

## Brief

随着基于 sidecar 的服务网格在成本和运维复杂度上的问题持续存在，我们很高兴看到出现了另一种不依赖 sidecar 的服务网格选项：Istio Ambient 模式。Ambient 模式引入了一种分层架构，将职责划分到两个关键组件之间：节点级的 L4 代理（ztunnel）和命名空间级的 L7 代理（Waypoint proxy）。

ztunnel 确保 L3 和 L4 流量能够高效且安全地传输。它通过为所有节点身份获取证书并处理与启用 Ambient 模式工作负载之间的流量重定向，为 Ambient 数据平面提供支持。Waypoint 代理是 Ambient 模式中的一个可选组件，它支持更丰富的 Istio 功能，例如流量管理、安全性和可观测性。

我们在小规模集群中使用 Ambient 模式的体验良好，并期待随着采用规模的扩大，能够获得更多关于大规模场景的实践洞见和最佳实践。

来源：技术雷达
