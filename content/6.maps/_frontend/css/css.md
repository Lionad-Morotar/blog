---
title: CSS
description: 层叠样式表（Cascading Style Sheets），用于描述网页的呈现样式
---

## 主题导航

### 架构方法

* [BEM](/maps/_frontend/css/bem) - Block__Element--Modifier 命名规范
* [ITCSS](/maps/_frontend/css/inverted-triangle-css) - 倒三角 CSS 架构方法论

### 特性与规范

* [CSS 新特性 2025](/maps/_frontend/css/new-features-2025) - View Transitions、Container Queries、Scroll-driven Animations 等
* [CSS Subgrid](/maps/_frontend/css/subgrid) - 嵌套网格继承父轨道定义的 breakout 布局模式
* [CSS Layers](/maps/_frontend/css/layers) - 级联层与优先级管理

### 工具与预处理器

* [Sass](/maps/_frontend/css/sass) - CSS 预处理器
* [Tailwind CSS](/maps/_frontend/css/tailwind) - Utility-first CSS 框架

### 技术实践

* [CSS Sprite 动画](/maps/_frontend/css/sprite-animation) - 高性能帧动画实现方案

#### 拼写检查伪元素的样式控制

`::spelling-error` 和 `::grammar-error` 伪元素允许开发者自定义 `contenteditable` 元素中浏览器原生拼写/语法检查波浪线的外观，例如将默认的红色波浪线改为设计系统配色，无需 JavaScript 即可实现。

Chrome 已支持 `::spelling-error`，Firefox 尚未支持，建议作为渐进增强使用。在引入 JS 拼写检查方案前，优先尝试 CSS 原生能力。

见：[Design.dev](https://design.dev)

### 参考资料

* [CSS Snapshot 2024](/maps/_frontend/css/snapshot-2024) - CSS 规范状态快照
* [CSS Mind Map](/maps/_frontend/css/css-mind-map) - CSS 知识体系思维导图
