---
title: Whale Fall
description: 大型开源项目死亡后的生态演替，类比海洋中的鲸落现象
---

#### 开源项目的鲸落三阶段

当大型开源项目停止维护时，会像鲸尸一样经历三个生态阶段：

**1. 移动食腐者**：直接 fork 并接管项目
- OpenOffice → LibreOffice
- MySQL → MariaDB
- Hudson → Jenkins

**2. 富集机会主义者**：针对死项目的数据格式开发替代工具
- Google Reader 关闭后：Feedly、Miniflux、FreshRSS、Tiny Tiny RSS 等涌现，实现 Google Reader API 兼容
- 许可证无关紧要，接口公开且其他软件依赖它就足够

**3. 化能自养细菌**：协议、文件格式、API 契约等结构骨架持续支持社区
- OpenDocument Format 超越了创建它的 OpenOffice
- Docker 将容器运行时捐给 OCI，Docker 自身衰落但规范永存
- Tree-sitter 为 Atom 而建，Atom 归档后成为 Zed、Neovim、Helix 的语法引擎

见：[Whale Fall - Andrew Nesbitt](https://nesbitt.io/2026/02/21/whale-fall.html)

---

#### 连续再殖民化

开源项目死亡后的典型模式：项目沉寂 → 有人 fork → 其他项目依赖该 fork → fork 维护者燃尽 → 循环重复，但规模逐代缩小，直到概念迁移而非代码继承。

**Sass 的迁移路径**：Ruby gem → LibSass (C++) → Dart Sass。每代重写都受益于前代的 bug 报告和设计争论，但实现被抛弃。大多数写 Sass 的人不知道它始于 Ruby gem。

**失败模式**：Edera 在 Rust tar-rs 库发现解析漏洞，影响所有下游 fork（async-tar、tokio-tar、Astral 内部 fork）。代码通过连续 fork 复制，但没人重新审计继承自原版的 PAX 头解析逻辑。安全漏洞就这样藏在骨架中，协调披露需要联系约二十个实体，其中多个库无人维护。

---

#### 许可证变更触发食腐

项目从开源转向源码可用许可证时，食腐阶段几乎立即触发：

- Redis → Valkey
- Elasticsearch → OpenSearch
- Terraform → OpenTofu

社区已形成固定流程： rush fork 最后一个开放提交 → 短暂竞争 → 整合到一两个幸存者。从开源生态视角看，代码主体已停止接受外部贡献。

**持久的抽象层**：集成项目面临选择——跟随专有版本或转向 fork，许多人选择构建兼容垫片。这些垫片往往在许可证争议冷却多年后，仍在依赖原版 API 的骨架生存。

---

#### Sun Microsystems 的鲸群死亡

Oracle 2010 年收购 Sun 不是单一鲸落，而是整群鲸鱼同时死亡：Java、Solaris、ZFS、DTrace、VirtualBox、NetBeans、GlassFish、Hudson、MySQL。

每个都沉到各自的海底，产生不同的继承：
- **单一主导 fork**：Hudson→Jenkins、ZFS→OpenZFS
- **多线竞争**：MySQL 喂养出 MariaDB、Percona、Drizzle（后者本身又成为小鲸落）
- **基金会辗转**：NetBeans→Apache、GlassFish→Payara 和 Jakarta EE

结构骨架（JVM 字节码格式、ZFS 磁盘格式、MySQL 协议）至今仍是负载-bearing，而许多开发者从未听说过 Sun。

---

#### 浅水区与云厂商整合

**浅水区死亡**：收购式招聘（acqui-hires）——公司被吸收，代码闭源或归档，知识随人员 disperses 而非积累为公共资源。

**云厂商整合趋势**：当前大型开源项目被平台公司拥有的趋势正在减少鲸落率。这可能产生二阶效应——生态系统多样性受损，但无人追踪。

> 健康生态需要稳定的鲸落供应——尽管这意味着希望大型项目死亡，因为深海海底没有其他食物来源。
