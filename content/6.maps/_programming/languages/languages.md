---
title: 编程语言
description: 编程语言概览与特性
original_path: content/6.maps/_programming/programming-language.md
---

## 编程语言

* [Lean](https://www.leanprover.cn/)
* [Prolog](https://www.metalevel.at/prolog/facets)
* [Moonbit](https://docs.moonbitlang.cn/index.html)

#### macOS 预装 Perl 的原因

macOS 底层是 Darwin（BSD Unix），系统内部不少脚本（软件更新、证书管理等）用 Perl 编写。
Perl 在 Python 出现前就是 Unix 文本处理和系统管理的标准工具。
Apple 已在 macOS 12.3 移除 Python 2 和 Ruby，但 Perl 因系统依赖更重而暂时保留。
官方建议开发者不要依赖系统预装脚本语言，应自行安装。

#### Rust `let...else` 模式匹配语法

`let...else` 是 Rust 1.65 稳定的语法糖，用于在绑定成功时继续执行，失败时提前返回/跳转。
它把"模式匹配 + 错误分支"压缩成一行，比 `match` 更紧凑。

```rust
let Some(value) = maybe else { return Err(...); };
```

适合 Option / Result 的解包场景，语义等价于 `if let` 的反向写法，但把"成功路径"留在缩进主体内，
失败路径被提前抛出。

见：[Rust Reference - Let else](https://doc.rust-lang.org/reference/statements.html#let-else-statements)
