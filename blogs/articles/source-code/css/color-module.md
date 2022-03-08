# CSS Color Module

[TOC]

## 说明

快照版本：[CSS Color Module Level 3](https://www.w3.org/TR/2022/REC-css-color-3-20220118/)

## 内容简介

### 前景色

CSS Color 模块整合了多个规范中的颜色相关内容，并做了稍许增减。主要定义了 color 和 opacity 两个前景色属性，以及对应的颜色值的规范。

| Property  | Value  |
|---|---|
| Name  | color  |
| Value  | &lt;color&gt; \| inherit |
| Initial  | depends on user agent  |
| Inherited  | yes  |

| Property  | Value  |
|---|---|
| Name  | opacity  |
| Value  | &lt;alphavalue&gt; \| inherit |
| Initial  | 1  |
| Inherited  | no  |

opacity 属性的值会影响元素的层叠上下文（stacking context）。只要值小于 1，那么层叠上下文就会应用 z-index 的值，除非后者的值为 auto，此时默认为层叠顺序为 0。

### 颜色值

颜色值会经过计算，所以形式上，颜色关键字和十六进制颜色等同于 rgb(x,x,x)。

基础颜色关键字是定义好的、大小写敏感的一些词语。

![基础颜色关键字](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220308190730.png)

扩展颜色关键字来源于 SVG 1.0 规范。

![扩展颜色关键字](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220308193951.png)

RGB 值有多种形式。RGBA 类似 RGB，只是没有字面量及在函数标记中相比 RGB 额外携带了一个 &lt;alphavalue&gt;。由于颜色值经由计算，所以具体数值可能会受到裁剪和限制，比如 rgb(260,0,0) 会被裁剪为 rgb(255,0,0)。

```css
em { color: #rgb }
em { color: #rrggbb }
em { color: rgb(x,x,x) }
em { color: rgb(x%,x%,x%) }
```

transparent 等同于 rgba(0,0,0,0)。

currentColor 等同于 inherit。

新增的 HSL（hue-saturation-lightness） 颜色值弥补了 RGB 缺陷，后者是基于阴极射线管合成的、违反人类直觉的一种颜色表示方法。类似 RGB 有 RGBA，HSL 也有 HSLA。


