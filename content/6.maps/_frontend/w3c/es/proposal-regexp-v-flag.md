---
title: proposal-regexp-v-flag
description: 正则的 v 模式兼容 u 模式并带来了 emoji 多码匹配等改进
original_path: /maps/_frontend/w3c/es/proposal-regexp-v-flag
---

[proposal-regexp-v-flag](https://github.com/tc39/proposal-regexp-v-flag)

<q>the v and u flags cannot be combined</q>

正则的 v 模式拥有 u 模式所有优点（支持 unicode）并带来了新功能和改进，且有后向兼容。因为他是一个全新的模式，所以 u 模式和 v 模式不能同时使用。

1. v 模式支持预设的几种字符串属性（properties of strings），可以解决 u 模式不能匹配多码合一 Emoji 的问题（最终这些字符串属性在 u 模式中也能使用）。

```js
'👨🏾‍⚕️'  // '\u{1F468}\u{1F3FE}\u200D\u2695\uFE0F'

/^\p{Emoji}$/u.test('👨🏾‍⚕️') // -> false
/^\p{RGI_Emoji}$/v.test('👨🏾‍⚕️') // -> true
```

2. v 模式支持集合操作（交集、并集、合集）

```js
/[\p{Decimal_Number}--[0-9]]/v.test('𑜹'); // → true
```

3. 改善了大小写匹配逻辑
