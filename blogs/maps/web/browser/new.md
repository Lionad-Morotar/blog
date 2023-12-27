# 新浏览器特性

[TOC]

以下只记录对应博客文章发布时主流浏览器都支持的特性。

## [2023-12](https://web.dev/blog/web-platform-12-2023)

* [CSS 嵌套语法](https://developer.chrome.com/blog/css-nesting-relaxed-syntax-update?hl=zh-cn)
* [details 手风琴模式](https://developer.chrome.com/docs/css-ui/exclusive-accordion)，多个相同 name 属性的 details 元素自动组合成手风琴
* [`:has()` 选择器](https://developer.chrome.com/blog/has-m105)
* iframe 的懒加载属性
* [linear 缓动函数](https://developer.chrome.com/docs/css-ui/css-linear-easing-function)，当点的数量足够多时，linear 可以实现复杂的曲线动画效果

## [Baseline 2023](https://web.dev/blog/baseline2023)

* 在 caniuse 网站上能看到 Baseline 标志了

## [2023-11](https://web.dev/blog/web-platform-11-2023?hl=en)

* 支持 lh 及对应的相对单位 rlh
* 支持 [HTTP 103 early hints](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/103)，可以在服务器返回 200 前提前返回一些信息，以便客户端提前处理缓存或者其他事务
