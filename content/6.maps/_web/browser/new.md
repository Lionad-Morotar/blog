---
title: 浏览器新特性
description: Web.dev 月刊精选，追踪和总结主流浏览器的最新特性更新与时动态。
---

## 2023

系列来源：[News to the web platform](https://web.dev/series/new-to-the-web?hl=en)

以下只记录对应博客文章发布时主流浏览器都支持的特性。

## [2023-12](https://web.dev/blog/web-platform-12-2023)

* [CSS 嵌套语法](https://developer.chrome.com/blog/css-nesting-relaxed-syntax-update?hl=zh-cn)：众望所归无需多言。
* [details 手风琴模式](https://developer.chrome.com/docs/css-ui/exclusive-accordion)：多个相同 name 属性的 details 元素自动组合成手风琴。
* [`:has()` 选择器](https://developer.chrome.com/blog/has-m105)。
* iframe 的懒加载属性。
* [linear 缓动函数](https://developer.chrome.com/docs/css-ui/css-linear-easing-function)，当点的数量足够多时，linear 可以实现复杂的曲线动画效果。

## [2023-11](https://web.dev/blog/web-platform-11-2023?hl=en)

* 支持 lh 及对应的相对单位 rlh。
* 支持 [HTTP 103 early hints](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/103)，可以在服务器返回 200 前提前返回一些信息，以便客户端提前处理缓存或者其他事务。

## [2023-10](https://web.dev/blog/web-platform-10-2023?hl=en)

* groupBy：使用 [`Array.prototype.groupBy`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy) 或者 `Map.prototype.groupBy` 可以将数组或者 Map 按照指定的 key 分组。
* isWellFormed：String 的 isWellFormed 方法和 [toWellFormed](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toWellFormed) 方法成对使用，用于检查及将字符串转换为格式良好的字符串。
* [html search element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/search)：目前看来没有功能，支持一个标签占位，类似 main 标签。search 可以用来标记网站的搜索和过滤功能所在区域。举例，你可以在在 form 外层套上 search。
* [hr in select options](https://developer.chrome.com/blog/hr-in-select?hl=zh-cn)：Select 中，可以使用和 Option 元素平级的 hr 元素来分割选项。
