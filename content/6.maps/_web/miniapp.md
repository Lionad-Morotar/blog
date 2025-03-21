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

## 框架对比

#### [小程序多端框架全面测评](https://developers.weixin.qq.com/community/develop/article/doc/000eaadb944de06374485c3ed51813)

讨论多端小程序时，我们其实是在讨论其架构的技术差异以及这些技术差异对业务的影响。

作者认为分为三种多端 UI 框架（这个词不太合适，原文是小程序多端框架）：全包型的 [Flutter](/maps/_cross-platform/flutter)，JS 作为 DSL 的 Web 技术类型如 React Native，和 JS 编译到 native 代码的编译型如 Taro。

查过 React Native 架构技术文档页面，写得是稀烂，一行都看不懂。

<q>交互复杂时难以写出高性能的代码，这类框架的设计就必然导致 JS 和 Native 之间需要通信，类似于手势操作这样频繁地触发通信就很可能使得 UI 无法在 16ms 内及时绘制。React Native 有一些声明式的组件可以避免这个问题，但声明式的写法很难满足复杂交互的需求。</q>

Flutter 的高保真是通过 Skia（以及 Web 端的 WASM Skia 实现的），如果没有 Skia，那么也很难说高保真（比如在 Web 端用 HTML 渲染）。

<q>由于没有渲染引擎，使用各端的原生组件渲染，相同代码渲染的一致性没有第一种高。</q>

简单的项目 if/else 就够用了，再复杂我觉得 Taro 的条件编译也够用。Chameleon 的 [多态协议](https://cml.js.org/docs/poly.html#%E5%88%9D%E5%A7%8B%E5%8C%96%E5%A4%9A%E6%80%81%E6%8E%A5%E5%8F%A3) 这个东西太复杂了，它包含多态接口、多态组件和多态模板，在编写 CML 业务层代码（CML 是 Chameleon 的 DSL）时，可以根据多态协议通过定义好的 .interface 来检查输入输出（编译时和运行时）、完成多端原生组件的调用。代价就是要编写额外的代码，且 Chamelon 本身变得复杂起来，比如需要一个强大的 Linter。

```html
<!-- 多态接口定义示例 -->
<script cml-type="interface">
type Callback = (state: string) => undefined;
interface UtilsInterface {
  setStorage(key: string, value: string, cb: Callback): undefined;
}
</script>

<!-- 多态接口百度小程序端实现示例 -->
<script cml-type="baidu">
class Method implements UtilsInterface {
  setStorage(key, value, cb) {
    try {
      swan.setStorageSync(key, value);
      cb('success');
    }
    catch(e) {
      cb('fail');
    }
  }
}
export default new Method();
</script>
```

![Chameleon Architecture](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220616033744.png)

<q>但值得一提的是 chameleon 有一套自研多态协议，编写多端代码的体验会好许多，可以说是一个能戳到多端开发痛点的功能。uni-app 则有一套独立的条件编译语法，这套语法能同时作用于 js、样式和模板文件。Taro 可以在业务逻辑中根据环境变量使用条件编译，也可以直接使用条件编译文件（类似 React Native 的方式）。</q>

在多种同类工具中选型，可以从开发功能（多端支持、保真度）、（IDE、Linter、TS、DSL Type）、生态（组件库、文档、DEMO）和社区（Github Star、PR、NPM Downloads、Forum）这些角度来考虑。

![chameleon vs mpvue vs Taro vs uni-app vs WePY](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220616030210.png)
