---
title: Lore
description: Epic Games 开源的新一代版本控制系统，针对代码与大型二进制资产混合的项目设计
---

## 主题

* [版本控制](./version-control) - Git、版本管理与工作流
* [Lore 官方仓库](https://github.com/EpicGames/lore)

## 简介

#### Lore 是什么

Epic Games 于 2026 年 State of Unreal 大会开源的新一代版本控制系统，Rust 编写，MIT 许可证。
它定位为"下一代开源版本控制系统"，专门针对同时包含代码与大型二进制资产的项目
（如游戏、影视）设计。

见：[EpicGames/lore](https://github.com/EpicGames/lore)

#### Lore 的核心架构

Lore 是集中式、内容寻址的版本控制系统，用 Merkle Tree 表示仓库状态，
用不可变版本链记录历史。关键设计包括：块级内容寻址、大文件分块存储、按需水合、
轻量级分支、集中式服务加缓存。

见：[Lore System Design](https://github.com/epicgames/lore/blob/main/docs/explanation/system-design.md)

## 对比

#### Lore 与 Git 的差异

Git 的内容寻址停留在对象级（blob/tree/commit），文件改动会生成完整的新快照；
Lore 将内容寻址下沉到块级，只存储变化的分块，支持跨版本去重。
Git 对二进制文件是"二等公民"，Lore 将大文件分块作为一等公民。

见：[Lore FAQ](https://github.com/epicgames/lore/blob/main/docs/faq.md)

#### Lore 与 Perforce 的差异

Perforce 是商业、专有协议的集中式系统，分支与锁机制在大规模团队下扩展困难；
Lore 是开源、API-first 的集中式服务，结合内容寻址与缓存，支持轻量分支与多语言 SDK。

见：[Lore FAQ](https://github.com/epicgames/lore/blob/main/docs/faq.md)

## 组件

#### Lore 的组件划分

Lore 产品分为 Lore library（Rust crate，可嵌入应用）、Lore Server（集中式服务与真相源）、
Lore CLI（命令行客户端）以及 C/C++、C#、Rust、Go、Python、JavaScript 等语言 SDK。
Lore 是 API-first 设计，CLI 只是薄层。

见：[Lore README](https://github.com/epicgames/lore/blob/main/README.md)
