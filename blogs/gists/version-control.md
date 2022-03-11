# Version Control

[TOC]

## Semver

[语义化版本（Semantic Version）](https://semver.org/lang/zh-CN/)是一种版本号码标记方法，有“主版本号.次版本号.修订号”组成的显著的格式。

* 主版本号：当你做了不兼容的 API 修改
* 次版本号：当你做了向下兼容的功能性新增
* 修订号：当你做了向下兼容的问题修正

Semver 被设计用来解决依赖地狱的问题，常用于定义了公共 API 的项目，因为其各个版本号的意义都和 API 的变动挂钩。但是许多项目在使用版本号标记时只采用了 X.Y.Z 的形式，而没有遵守严格的 Semver 设计规则，需要注意。相关例子见：[Typescript should follow semantic versioning](https://github.com/microsoft/TypeScript/issues/14116)，Typescript 的开发者回应称，Typescript 只是遵守了 major.minor 的规则，其 minor 版本可能引入 Breaking Change。

## Git

<Frame src="/gists/git.html" />