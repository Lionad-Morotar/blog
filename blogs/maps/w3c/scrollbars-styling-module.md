# CSS Scrollbars Styling Module

[TOC]

## 相关链接

快照版本：[W3C Candidate Recommendation Snapshot, 9 December 2021](https://www.w3.org/TR/2021/CR-css-scrollbars-1-20211209/)

用于控制内容区域是否滚动的规范见：[CSS Overflow Module](https://drafts.csswg.org/css-overflow/)

## 内容简介

<!-- BLOCK - 2a2171afae04283296e4f0a931eec534 -->
Scrollbars Styling 模块主要定义了用于控制滚动条的样式使用到的一些属性。在 Level 1 规范中，主要介绍了 scrollbar-color 和 scroll-width，分别用来控制滚动条的颜色和宽度。
<!-- BLOCK - END -->

主要相关三个使用场景：

* 改变滚动条颜色以适配页面视觉效果
* 使得在较小的滚动区域缩小滚动条宽度成为可能
* 提供自定义的滚动条，以代替默认滚动条

The primary purpose of this property is **not** to allow authors to chose a particular scrollbar **aesthetic** for their pages, but to let them indicate for certain small or cramped elements of their pages that a smaller scrollbar would be desirable.

#### scrollbar-color

This property allows the author to set colors of an element’s scrollbars.

| Property  | Value  |
|---|---|
| Name  | scrollbar-color  |
| Value  | auto \| &lt;color&gt;[^color]  |
| Initial  | auto  |
| Inherited  | yes  |

[^color]: Apply the **first** color to the **thumb** of the scrollbar, and the **second** color to the **track** of the scrollbar.

#### scrollbar-width

This property allows the author to specify the desired thickness of an element’s scrollbars.

| Property  | Value  |
|---|---|
| Name  | scrollbar-width  |
| Value  | auto \| thin[^thin] \| none[^none]  |
| Initial  | auto  |
| Inherited  | yes  |

[^thin]: Thinner scrollbars than auto.
[^none]: 不展示滚动条。但不意味着内容区域是不可滚动的。