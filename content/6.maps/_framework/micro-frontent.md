# 微前端



#### 微前端解决什么问题？

主要应对一个单体应用在相对长的时间跨度下，由于参与人数、团队的增多和变迁，从一个普通应用演变为了巨石应用，随之带来的难以维护的问题。

![单体应用、前后端分离和微前端](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20221023230253.png)

#### 微前端技术要点？

做到技术栈无关的同时提供以下技术能力支持：

* JS 沙箱：子应用全局变量、事件不互相影响
* CSS 隔离：子应用之间的样式不互相影响
* 公共依赖加载：不同子应用都用到的资源怎么加载
* 父子应用通讯：子应用如何调用父应用方法、父应用如何下发状态
* 按需加载
* 预加载
* 子应用嵌套
* 子应用并行

#### 微前端的方案选择？

* 基座方案：主应用中预先注册子应用，然后监听路由变化，加载匹配到的子应用资源。
* iframe：接入简单并且有完美的隔离效果，但是在共享资源如 URL、Cookie 时不好处理，再者是加载慢。
* Web Components：Custom Elements、Shadow DOM、HTML Templates 等规范的集合，需调查兼容性。
* Module Federation：没有基座，打包时使用模块联邦注册远程模块，使用时用 import 导入模块。
* ESM：微前端的无技术栈限制、应用单独开发，多应用整合三个特性都能很好支持，需调查兼容性，以及 ESM 语法有传染性。

表格总结见：[一文读懂5种微前端常用方案](https://zhuanlan.zhihu.com/p/556422347)