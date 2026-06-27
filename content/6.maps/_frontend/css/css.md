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

#### text-align: match-parent 与 inherit 的方向解析差异

`match-parent`（CSS Text Module Level 3/4）与 `inherit` 都继承父元素的 `text-align`，但二者对 `start`/`end` 的解析上下文不同：

- `inherit` 继承的是**关键字值**，该关键字在子元素中按子元素**自身**的 `direction` 解析。例如 `<select dir="rtl">` 内的 `<option dir="ltr">`，
若继承 `start`，option 会按自己的 `ltr` 解析为 `left`
- `match-parent` 继承的是**计算后的实际方向**（`left` 或 `right`），基于**父元素**的 `direction` 解析

规范中的 UA 默认样式示例：`option { text-align: match-parent; }`

这一值由 fantasai 于 2010 年引入，源自 Xiaomei Ji（Google）提出的 `<option>` 对齐一致性问题——当子元素（如 option）具有与父容器（如 select）不同的 `dir` 时，
仍需保持对齐方向统一。

适用场景：表单控件、列表项等子元素方向可能独立设置，但对齐必须与父容器保持一致的组件。

#### 拼写检查伪元素的样式控制

`::spelling-error` 和 `::grammar-error` 伪元素允许开发者自定义 `contenteditable` 元素中浏览器原生拼写/语法检查波浪线的外观，例如将默认的红色波浪线改为设计系统配色，
无需 JavaScript 即可实现。

Chrome 已支持 `::spelling-error`，Firefox 尚未支持，建议作为渐进增强使用。在引入 JS 拼写检查方案前，优先尝试 CSS 原生能力。

### 参考资料

* [CSS Snapshot 2024](/maps/_frontend/css/snapshot-2024) - CSS 规范状态快照
* [CSS Mind Map](/maps/_frontend/css/css-mind-map) - CSS 知识体系思维导图

