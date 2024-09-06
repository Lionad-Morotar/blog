---
title: Redis
description: About Redis
---

## 数据结构及其操作

#### `NX`和`XX`如何记忆？

设置字符串的值时，`NX`是当值不存在才能设置，`XX`是存在才能设置（更新），所以可以分别理解为“Not Exist”和“Exist”。

#### 常见的键名风格？

有“::”、“->”和“.”等，如键名“article::id::code”

#### 字符串 `GETRANGE` 和 JavaScript 的 `slice` 对比？

JS 的 Slice 方法是基于位置的，而 Redis 的 GetRange 是基于索引，所以：

```bash
set "hello world" "hello world"
getrange "hello world" 0 4
# result is "hello"
```

```ts
"hello world".slice(0, 4) // result is "hell"
```
