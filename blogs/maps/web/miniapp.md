# 小程序

[TOC]

## 技术

* [小程序底层框架](https://developers.weixin.qq.com/ebook?action=get_post_info&volumn=1&lang=zh_CN&book=miniprogram&docid=0000e82f924ca0bb00869a5de5ec0a)
* [微信小程序技术原理分析 | 框架逆向](https://zhaomenghuan.js.org/blog/wechat-miniprogram-principle-analysis.html)

#### 小程序双线程模型是怎样的？

小程序的渲染层和逻辑层使用两个不同的线程管理。渲染层使用 Webviews 渲染页面，逻辑层使用 JSCore 解析执行 JS，而两个线程间的通讯以及 JS 发起的 HTTP、WS 等请求交由 Native 处理。

#### 小程序对比网页的优势与限制？

相比 PWA 的手动缓存，小程序框架提供了包的自动更新机制。但是出于安全和管控的考虑，小程序阻止页面跳转、动态脚本以及 DOM 操作等能力。

#### 小程序的 Exparser 是什么？

Exparser 是一套小程序的组件框架，它提供了一套类似 Shadow DOM 标准的实现，以维护页面节点树信息，同时它提供了一套内置的基础组件库，用于满足小程序日常开发需求。
