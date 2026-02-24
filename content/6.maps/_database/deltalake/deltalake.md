---
title: Delta Lake
description: 一个开源的存储层，旨在为数据湖提供 ACID 事务支持、可扩展的元数据处理和统一的批处理与流处理能力。
original_path: content/6.maps/_database/delta-lake/delta-lake.md
---

## 主题

* [Delta Lake Liquid Clustering](./liquid-clustering) - 动态数据布局优化技术

## 概述

Delta Lake 是一个开源的存储层，旨在为数据湖提供 ACID 事务支持、可扩展的元数据处理和统一的批处理与流处理能力。它构建在现有数据湖存储（如 S3、HDFS、Azure Data Lake Storage）之上，通过添加事务日志和版本控制，解决了传统数据湖在数据一致性、数据质量和性能方面的挑战。
