# Emmet

说来惭愧，写 HTML 写了四年，我装 Emmet 插件估计也有四年了，但是四年来我对 Emmet 的使用都只停留在诸如 div.class 等非常简单的几个快捷语法上。今天整理正式过一遍文档，整理一波有用的东西。

#### 快捷语法

快捷语法我将其分为三组：语法控制，索引控制和属性控制。

* 语法控制：子元素（>）、兄弟元素（+）、返回上一级（^）、分组（()）
* 索引控制：序列（*）、索引（$）
* 属性控制：ID（#）、类名（.）、文本（{}）、属性（[]）、文本（{}）

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
<div class="card2">
  <div class="card-header">
    <div class="title"><em>Card Header</em></div>
    <div class="side-title">side title</div>
  </div>
  <div class="card-content">
    <p>Card Contents 002</p>
  </div>
</div>
<div class="card3">
  <div class="card-header">
    <div class="title"><em>Card Header</em></div>
    <div class="side-title">side title</div>
  </div>
  <div class="card-content">
    <p>Card Contents 003</p>
  </div>
</div>
<div class="card4">
  <div class="card-header">
    <div class="title"><em>Card Header</em></div>
    <div class="side-title">side title</div>
  </div>
  <div class="card-content">
    <p>Card Contents 004</p>
  </div>
</div>
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

#### HTML

现在大家都是写 Vue、React 了，HTML 部分用到的功能就少得多了。HTML 主要依赖单词缩写以及冒号+类型的方式来快速生成，比如 header 的缩写是 hdr；input 后面可以跟 :tel、:number 等十来种类型等。以下记录几个比较有意思的。

```html
<!-- link:css -->
<link rel="stylesheet" href="style.css">

<!-- meta:vp -->
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
```

#### CSS

看到 Emmet 文档底部栏顿时眼前一亮，这快捷语法不就是我实习的时候按照字典压缩法给项目加的一堆“Atomic CSS”类名嘛hhhh，我是真没想到 Emmet 居然早就有了一套完整的 CSS 快捷语法方案（因为平常用的实在是少）！

蹲一个 CSS 压缩类库和一个完整的 Emmet Atomic CSS 库。
