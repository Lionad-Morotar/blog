# HTML Extends

[TOC]

## 模板语法

#### Emmet 备忘录？

Emmet 的语法分为三组：分组、索引和属性。

* 分组：元素（如 link、meta）、子元素（>）、兄弟元素（+）、返回上一级（^）、分组（()）
* 索引：序列（*）、索引（$）
* 属性：ID（#）、类名（.）、文本（{}）、属性（[]）、文本（{}）、类型（:）

#### 帮助回忆的简短示例？

```html
<!-- (.card$>(.card-header>.title>em{Card Header}^.side-title{side title})+(.card-content>p{Card Contents $$$}))*5 -->
<div class="card1">
  <div class="card-header">
    <div class="title"><em>Card Header</em></div>
    <div class="side-title">side title</div>
  </div>
  <div class="card-content">
    <p>Card Contents 001</p>
  </div>
</div>
<!-- ... 省略部分元素 ... -->
<div class="card5">
  <div class="card-header">
    <div class="title"><em>Card Header</em></div>
    <div class="side-title">side title</div>
  </div>
  <div class="card-content">
    <p>Card Contents 005</p>
  </div>
</div>
```

```html
<!-- link:css -->
<link rel="stylesheet" href="style.css">

<!-- meta:vp -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```