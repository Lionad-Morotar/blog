---
title: Go
description: Go（又称 Golang）是 Google 开发的一种静态强类型、编译型、并发型，并具有垃圾回收功能的编程语言。Go 被誉为是未来的服务器端编程语言。
original_path: content/6.maps/_go/go.md
---

## Tour

* [A Tour of Go](https://tour.go-zh.org/list)
* [Go for JavaScript Developers](https://chenjinya.com/go-for-javascript-developers/pages/internals/)
* [深入 Go 语言之旅](https://go.cyub.vip)
* [Understanding Escape Analysis in Go](https://medium.com/@pranoy1998k/understanding-escape-analysis-in-go-b2db76be58f0): Go 逃逸分析原理与性能优化

## Specification

* [Golang Specification](https://go-zh.org/ref/spec)

## Packages

* [Go Internal Packages](https://go-zh.org/pkg/): 标准库、子代码库等
* [Go Packages](https://pkg.go.dev/): 包索引与搜索引擎。

## Patterns

* [Go Concurrency Patterns](https://www.youtube.com/watch?v=f6kdp27TYZs)
* [Go Advanced Concurrency Patterns](https://www.youtube.com/watch?v=QDDwwePbDtw)

## Dev Tools

* [Go Playground](https://go.dev/play/)：在线编写、运行和分享 Go 代码的工具
* [g](https://github.com/voidint/g)：Version manager for Go

## Build

#### Go 构建时的 VCS 信息嵌入

Go 1.18 引入的构建特性，编译时自动检测 Git 状态并将版本信息嵌入二进制文件。

VCS（Version Control System）信息包括 commit hash、分支名、是否有未提交修改等。可通过 `go version -m <binary>` 查看嵌入的构建信息。

当在非 Git 仓库目录构建时，Go 无法获取 VCS 信息会报错，此时需使用 `-buildvcs=false` 标志禁用该功能。
