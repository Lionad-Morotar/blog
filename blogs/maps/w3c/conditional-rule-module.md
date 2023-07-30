# CSS Conditional Rules Module

[TOC]

## 说明

快照版本：[W3C Candidate Recommendation Snapshot, 9 December 2021](https://www.w3.org/TR/css-conditional-3/)

## 内容简介

主要描述了使用条件选择规则（at-rules）以及相关语法的使用以便在同一个样式表中有选择性的应用部分样式。

条件选择规则（conditional group rules）通常携带一个布尔逻辑判断。结果为真则应用相关规则，反之则不应用。从语法来说，它们可以放在 CSS 中任何样式规则可以被放置的地方。错误的语法或未知的规则是无效的，所以也不会被应用。以下给出一个正确语法的示例。

```css
@media print {
  /* hide navigation controls when printing */
  #navigation { display: none }
}
```

以下是完整的条件选择规则表：

```css
@media <media-query-list> {
  <stylesheet>
}
```

```css
@supports <supports-condition> {
  <stylesheet>
}
```

```css
<supports-condition> = not <supports-in-parens>
                     | <supports-in-parens> [ and <supports-in-parens> ]*
                     | <supports-in-parens> [ or <supports-in-parens> ]*
<supports-in-parens> = ( <supports-condition> ) | <supports-feature> | <general-enclosed>
<supports-feature> = <supports-decl>
<supports-decl> = ( <declaration> )
```

依据语法规则可以发现，不带括号的功能条件查询是不允许的，而多余的括号以及属性值携带 !important 标记是兼容的。

```css
// right
@supports ((display: flex !important)) {
  /* ... */
}
// false
@supports display: flex {
  /* ... */
}
```