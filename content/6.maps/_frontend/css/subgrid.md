---
title: CSS Subgrid
description: CSS subgrid 布局技术，用于让嵌套网格继承父网格轨道定义
---

#### CSS subgrid 在 CMS 布局中的 breakout 模式

- L1: CSS `subgrid` 允许嵌套网格继承父网格的轨道定义。在 CMS 内容布局中，可将 `<main>` 设为五列网格（`auto` 边距 + `30px` 间距 + `min(45rem, 100% - 60px)` 主内容区），然后给需要全宽的块设置 `grid-template-columns: subgrid` 并跨越外层轨道，使其背景延伸至视口边缘，而内部子元素仍通过 `grid-column: main` 保持与正文对齐。
- L1: 这种模式只需一个 class 即可实现 breakout 效果，且支持无限层级嵌套；若改为 `grid-column: margin` 则可实现"boxed"样式（背景仅延伸至边距区域）。
- L2: 有分析指出，相比传统的负边距或额外包装器方案，subgrid 能保持 HTML 结构干净，特别适合 WordPress 等 CMS 输出的大块 HTML 内容。

见：[CSS subgrid is super good – David Bushell](https://dbushell.com/2026/04/02/css-subgrid-is-super-good/)
