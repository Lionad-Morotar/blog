---
title: 小程序
description: 微信小程序开发指南，包含双线程模型、Exparser 组件框架、分包异步化等技术原理和最佳实践。
---

## 技术

* [小程序底层框架](https://developers.weixin.qq.com/ebook?action=get_post_info&volumn=1&lang=zh_CN&book=miniprogram&docid=0000e82f924ca0bb00869a5de5ec0a)
* [微信小程序技术原理分析](https://zhaomenghuan.js.org/blog/wechat-miniprogram-principle-analysis.html)

#### 小程序双线程模型是怎样的？

小程序的渲染层和逻辑层使用两个不同的线程管理。渲染层使用 Webviews 渲染页面，逻辑层使用 JSCore 解析执行 JS，而两个线程间的通讯以及 JS 发起的 HTTP、WS 等请求交由 Native 处理。

#### 小程序对比网页的优势与限制？

相比 PWA 的手动缓存，小程序框架提供了包的自动更新机制。但是出于安全和管控的考虑，小程序阻止页面跳转、动态脚本以及 DOM 操作等能力。

#### 小程序的 Exparser 是什么？

Exparser 是一套小程序的组件框架，它提供了一套类似 Shadow DOM 标准的实现，以维护页面节点树信息，同时它提供了一套内置的基础组件库，用于满足小程序日常开发需求。

## 常见问题

#### 分包异步化是什么？

指通过 `require.async('sub/xxx')` 引用分包中的代码，达到减小主包体积的目的。同理，还有分包插件异步化这种方法。

见：[分包异步化在货拉拉微信小程序中的实践](https://juejin.cn/post/7205092873326723109)

#### 微信内的小程序在什么时候会更新版本？

小程序更新分为同步和异步更新：

* 打开小程序时异步检查并下载最新版小程序，在下次小程序冷启动时使用新版
* 微信定期检查小程序版本或小程序长时间未启动再打开时使用同步更新，同步更新会阻塞使用流程
* 开发者使用 `getUpdateManager.onUpdateReady` 接口提醒用户同步更新最新版本

#### 小程序对 Grid 布局的支持能力如何？

有许多手机不支持 Grid 布局，如果需要写响应式的栅格布局，要安装插件。

见：[小程序对 grid 布局支持的如何？](https://developers.weixin.qq.com/community/develop/doc/000004337c41c074412c471d356000?jumpto=comment&commentid=000e664b2e8f28c4432c782675b0)
