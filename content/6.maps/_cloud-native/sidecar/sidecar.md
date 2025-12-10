---
title: Sidecar Pattern
---

## 概述

Sidecar 模式是一种设计模式，通常用于微服务架构中。它涉及将一个辅助容器（sidecar）与主应用程序容器一起部署在同一个 Pod 中。Sidecar 容器负责处理与主应用程序相关的辅助任务，如日志收集、配置管理、服务发现等，从而使主应用程序能够专注于其核心功能。

## Domain

* [Service Mesh without Sidecar](/maps/_cloud-native/sidecar/service-mesh-without-sidecar)
