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

## Syntax

#### 函数语法结构快速入门

```go
func (u *UserApplicationService) GetSpaceListV2(
    ctx context.Context,
    req *playground.GetSpaceListV2Request,
) (*playground.GetSpaceListV2Response, error) {
    // 业务逻辑实现
}
```

| 部分 | 含义 | TypeScript 类比 |
|------|------|-----------------|
| `func` | 定义函数/方法 | `function` |
| `(u *UserApplicationService)` | **接收者** - 这个方法属于谁 | `class UserApplicationService { async GetSpaceListV2(...) }` 中的 `this` |
| `GetSpaceListV2` | 方法名 | 方法名 |
| `ctx context.Context` | 第一个参数 | 参数（Go 是显式传递 context，不像前端自动） |
| `req *playground.GetSpaceListV2Request` | 第二个参数（指针类型） | 类似 `req: GetSpaceListV2Request` |
| `(*playground.GetSpaceListV2Response, error)` | 返回值（两个） | `Promise<[GetSpaceListV2Response, null] \| [null, Error]>` |

```go
// 定义结构体（类似 class）
type UserApplicationService struct {
    db *Database
}
// 给这个结构体"绑定"方法
func (u *UserApplicationService) GetSpaceListV2(...) { ... }
```

## 包与作用域

#### 包内函数可见性机制

同一目录下的 `.go` 文件，如果声明相同的 `package xxx`，它们就属于同一个包。包内所有文件共享作用域，无需 import 即可互相调用函数、变量、类型。只有不同包之间才需要 import。

```go
// request_inspector.go
package middleware
func RequestInspectorMW() { isNeedOpenapiAuth(ctx) }  // 直接调用，无需import

// openapi_auth.go
package middleware
func isNeedOpenapiAuth(c *app.RequestContext) bool { ... }
```
