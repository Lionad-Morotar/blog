---
title: 版本管理
description: 版本管理是一种软件开发过程中的管理方法，它通过对软件的版本号进行管理，以便于开发者和用户了解软件的变动情况。
---

## 源码管理

- [Git](/maps/_devops/git)
- [Gitflow](/maps/_devops/git/gitflow)

TODO：[Sapling](https://sapling-scm.com/docs/introduction/differences-git)

## 版本号管理

#### 语义化版本是什么？

语义化版本（Semantic Version）是一种版本号码标记方法，它要求版本号由“主版本号.次版本号.修订号”组成，分别代表不兼容的 API 改动、向下兼容的功能性改动或新增、向下兼容的问题修正。

见：[语义化版本 @semver.org](https://semver.org/lang/zh-CN/)

#### 语义化版本解决了什么问题？

Semver 被设计用来解决依赖地狱的问题，常用于定义了公共 API 的项目，因为其各个版本号的意义都和 API 的变动挂钩。但 Semver 从某种意义上来说过于理想化，主要因为实际开发中代码变动没用绝对意义上的 no breaking change 这么一说。bug 和 breaking change 的界限本身就很模糊，所以实际上，任何改动都可能带来意料之外的 breaking change。

许多项目并不遵循 Semver，如 TS 的开发者声称，其 minor 版本可能引入 Breaking Change，见：[TypeScript should follow semantic versioning @GitHub](https://github.com/microsoft/TypeScript/issues/14116)。

#### 如何解决版本号膨胀问题？

在单仓多包项目中，如果遵循语义化版本，那么版本同步会使版本号迅速膨胀。一个好的方案是现在其他项目使用 0.x 版本号开发，等 API 稳定后再合并到单仓中升级成为 1.0.0 版本。

见：[The Case for MonoreposJJJ](https://medium.com/netscape/the-case-for-monorepos-907c1361708a)
