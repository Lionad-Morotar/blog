---
title: A Few Things About the Anchor Element’s href You Might Not Have Known
description: 系统梳理 `<a>` 的 `href` 可用值（协议、文本片段、数据 URL、媒体片段、特殊锚点等），并提供实测与验证方法。
tags:
  - anchor
  - href
  - url
  - data-url
  - media-fragment
  - text-fragment
  - browser-behavior
original: https://blog.jim-nielsen.com/2025/href-value-possibilities/
original_path: /maps/_frontend/html/href-value-possibilities
---

## 摘要

文章详尽枚举了 `<a>` 元素 `href` 属性的多种取值及其在浏览器中的行为差异，并通过 JavaScript/URL 构造函数对解析行为做了实测验证。

## 要点

* 协议类：`mailto:`, `tel:`, `sms:`, `javascript:` 等，以及协议相对路径 `//`。
* 文本片段（Text Fragments）：`#:~:text=...` 可定位到页面中特定文本（浏览器支持有限）。
* 特殊锚点：
  - `#`：跳到文档顶部或指定 id 为 `top` 的元素；
  - `.`：重载当前路径（会清除 query/hash，路径尾斜杠影响解析）；
  - `?`：清除查询参数与哈希但保留 `?` 本身。
* 数据 URL：`data:` 可内嵌文本、HTML、图片等内容，直接在新文档中展示。
* 媒体片段（Media Fragments）：`file.mp4#t=10,20` 可定位到媒体的时间段（兼容性参差）。
* PDF 与其它资源的片段语法：例如 `#page=` 可用于跳转 PDF 的指定页码。
* 测试方法：文章提供了使用 `new URL()` 与不同 base 进行解析的测试代码，便于在控制台复现。

## 适用场景

适合需要精细控制链接行为、构建深度链接、实现按文本定位或在客户端生成临时内容（data URL）的场景；也对调试浏览器差异有帮助。

