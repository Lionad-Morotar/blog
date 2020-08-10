# 📬 技术简历

<style>
    body.h1_content_技术简历 #page-bottom,
    body.h1_content_技术简历 footer,
    body.h1_content_技术简历 h1 {
        display: none;
    }
    body.h1_content_技术简历 li {
        margin-top: .5em !important;
    }
    body.h1_content_技术简历 #valine-vuepress-comment {
        display: none;
    }
    body.h1_content_技术简历 a[href^='http://']:after,
    body.h1_content_技术简历 a[href^='https://']:after,
    body.h1_content_技术简历 a[href^='/']:after {
        content: none !important;
    }
</style>

[TOC]

## 👨‍🚀 个人信息

* 个人信息：杨韵树 / 男 / 1996
* 毕业院校：江西师范大学 / 软件工程 / 2014 - 2018
* 工作年限：3 年 / 上海
* 联系方式：18579157140（Mobile） / tangnad@qq.com（Mail）
* 社交主页：[Lionad-Morotar@Github](https://github.com/Lionad-Morotar) / [个人博客](https://mgear-blogs.obs-website.cn-east-3.myhuaweicloud.com/) / [掘金](https://juejin.im/user/289926800227694)

## 💖 核心能力

**技术驱动；擅长解决问题；思路开阔；**

* JS 基本功扎实，读过 VueJS 源码；
* 喜欢写[个人博客](https://mgear-blogs.obs-website.cn-east-3.myhuaweicloud.com/)；活跃于[掘金社区](https://juejin.im/user/289926800227694)，掘力值 1700+
* 活跃于 [Github](https://github.com/Lionad-Morotar)；近期有读 HTML Parser 时顺手写的 [Markdown Parser](https://github.com/Lionad-Morotar/read-source-code/tree/master/module/markdown-parser)；
* 创造了一种新的 CSS 抗锯齿思路 [POAA](https://juejin.im/post/6844904180776173581)，被[前端早读课](https://mp.weixin.qq.com/profile?src=3&timestamp=1596562383&ver=1&signature=07VDeMiUAG0av39cka13COjcq44y7n*Dm-SQWhg5*7EXWFNrljOrwLHppSHEyIt79pg3qdfkzbf7IcjfnYQi1A==)推荐转载于第 1980 期；
* 研读过许多前端[技术书籍](https://book.douban.com/people/lionad/collect)，修炼内功；

## 🛫 工作经历

### 上海云拿 2019.8 - 2020.3

项目技术关键字：ReactJS、NodeJS、H5、Echarts、FP

#### [商户平台](/hire-me/resume-prepare/commercial-platform.html)

公司主营无人超市业务。商户平台用于给无人超市的经营者提供店铺管理、营销活动、营销数据及库存等服务支持。项目期间，我自荐并优化了项目的多语言工作流。

* **难点**：项目的多语言文件是按语言类型分文件存放的 JSON。每个文件有数千行键值对，要靠开发手动维护极容易出错。<br />
  **解决**：编写了包括多语言文件差量更新、更新版本号、自动上传脚本。结合 NPM 工作流，可以使用一个指令就完成之前需要数十分钟手工操作的事情。极大程度提升开发体验，减少了开发人员的低效时间。

* **难点**：商户平台项目需要多语言兼容，但不同语言的语序往往不一致。这给组件的多语言化的维护工作（尤其是表单组件的维护）增加了难度。<br />
  **解决**：封装模板字符串插值组件，可在字符串中直接插入节点或数据。此后，翻译人员可以无需考虑技术实现直接提供翻译。成功解决了因语序不同，给开发人员带来的组件代码冗余的困扰。

商户平台中的营销游戏包含 H5 端大转盘、刮刮乐等游戏。项目效果是：商户在商户平台，根据流程图配置好游戏的中奖逻辑；顾客可在无人超市内使用 APP 扫码游玩游戏。

* **难点**：“大转盘”等营销名词对非专业或海外商户来说比较陌生。所以，我提出建议，在商户配置游戏时，就要能查看游戏运行效果。<br />
  **解决**：调研后，我将游戏页面通过 iFrame 引入商户平台，使用 PostMessage API 实现跨父子页面通讯。最终，仅编写少量的兼容代码，就将 H5 游戏页面成功嵌入商户平台的表单页面。使“游戏”的概念一目了然，代码也得到重用。

#### [数据大盘](/hire-me/resume-prepare/shop-data.html)

数据大盘是超市营销数据的门脸。在客户进行实地考察时，数据大盘把专业性的营销数据可视化后，能起到很好的引导、介绍作用。

* **难点**：数据大盘展示内容需要根据需求需要，会进行灵活地调整与控制。比如，不同国家，需展示不同数据；对某些数据，需脱敏操作。这要求在架构上要设计一个可插拔的模块组织结构。<br />
  **解决**：项目根基立足于我编写的健壮的轮询管理器及 Websocket 管理器；之后，将图表通过配置文件做成可热插拔的形式，自动载入图表并初始化。完全解耦了请求、布局与图表逻辑，代码具有高可维护性。

### 乘云小程序 2017.7 - 2019.7

项目技术关键字：VueJS、Taro、H5 API、JS Module

#### [乘云新零售](/hire-me/resume-prepare/retail.html)

新零售是一套多端小程序搭建的社群+营销系统。能为线下商家提供优惠券、积分、红包等各色营销手段，以及商城、外卖、配送等客户经营服务。结合多种支付系统，助力线下实体商户经营转型至线上生态。

* 对市面多种小程序框架进行实践考察。基于研发体验和研发生态的角度，选型使用 Taro 进行多端小程序开发。带领前端开发完善业务功能页面，在 7 期迭代内完成 250+ 设计稿的**精准还原**。
* 封装页面**通用组件及公共库**。其中包括小程序状态管理及跨页通讯框架 [State-Vex](https://github.com/takecloud/state-vex) 和 API 简单、体积轻量的校验库 [Valy.js](https://github.com/takecloud/valy)。

#### [乘云小程序](/hire-me/resume-prepare/takecloud.html)

公司业务围绕小程序 SaaS 展开。乘云小程序项目是一套涵盖电商、餐饮等 9 大行业的小程序通用解决方案。商户可以使用后台提供的营销插件及视觉引擎功能，通过可视化搭建，以拖拽的形式生成低成本、高定制化的小程序。

* 负责可视化搭建引擎的原型开发。经迭代沉淀，积累了包含富文本在内等拥有 10+ 组件的组件库。
* 项目的技术栈主 VueJS。项目开发期间，我主持过《切入 VueJS 响应式原理》、[《前端状态管理简介》](https://resume-assets.obs-website.cn-east-3.myhuaweicloud.com/%E5%89%8D%E7%AB%AF%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E7%AE%80%E4%BB%8B.pptx) 等会题的内部技术分享。
* 通过乘云小程序，公司连续斩获两届阿拉丁“小程序最佳第三方服务商”奖项。

## 🔨 技术概览

* 通晓 JavaScript 核心特征及 ES6/ES6+ 规范；理解现代化前端。
* 扎实的 HTML、CSS 基础；有PC及移动端原生 H5 开发经验；能创造精巧的页面布局。
* 掌握 VueJS 生态；读过 VueJS 源码；有一定的 React 开发经验。
* 熟悉前端工程化实践；熟悉 Webpack、Rollup 等构建工具。
* 熟悉小程序及框架 Taro。
* 良好的软件技术：正则、性能优化、设计模式；
* 了解 NodeJS。

## 📕 我读过的前端相关书籍

<Commend
    type="title"
    src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/books/20200805015516.png"
    :callouts="[
        '《Webpack 实战：入门、进阶与调优》',
        '居玉皓 著 / 机械工业出版社 / 2019-6',
        'https://book.douban.com/subject/34430881/'
    ]"
/>

<Commend
    type="title"
    src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/books/20200805182455.png"
    :callouts="[
        '《JavaScript 之美》',
        'Anton Kovalyov / 杜春晓/司伟伟 / 中国电力出版社 / 2017-12-1',
        'https://book.douban.com/subject/28524769/'
    ]"
/>

<Commend
    type="title"
    src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/books/20200805182755.png"
    :callouts="[
        '《大教堂与集市》',
        'Eric S·Raymond / 卫剑钒 / 中国电力出版社 / 2014-5',
        'https://book.douban.com/subject/25881855/'
    ]"
/>

<Commend
    type="title"
    src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/books/20200805182951.png"
    :callouts="[
        '《计算机科学精粹》',
        '沃德斯顿·费雷拉·菲尔多 / 蒋楠 / 人民邮电出版社 / 2019-1',
        'https://book.douban.com/subject/30382590/'
    ]"
/>

<Commend
    type="title"
    src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/books/20200805183056.png"
    :callouts="[
        '《SEO 实战宝典》',
        '丁士锋 / 人民邮电出版社 / 2015-4-1',
        'https://book.douban.com/subject/26676942/'
    ]"
/>

<Commend
    type="title"
    caption="《我写我型》"
/>

<Commend
    type="title"
    caption="《艺术·设计的色彩构成》"
/>

<Commend
    type="title"
    caption="《艺术·设计的平面构成》"
/>

<Commend
    type="title"
    caption="《排版技术》"
/>

<Commend
    type="title"
    caption="《治字百方》"
/>

<Commend
    type="title"
    caption="《超越平凡的平面设计》"
/>

<Commend
    type="title"
    caption="《CSS 设计彻底研究》"
/>

<Commend
    type="title"
    src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/books/20200805183510.png"
    :callouts="[
        '《JavaScript 忍者秘籍》',
        'John Resig/Bear Bibeault / 徐涛 / 人民邮电出版社 / 2015-10',
        'https://book.douban.com/subject/26638316/'
    ]"
/>

<Commend
    type="title"
    src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/books/20200805183627.png"
    :callouts="[
        '《JavaScript 语言精粹》',
        'Douglas Crockford / 赵泽欣/鄢学鹍 / 电子工业出版社 / 2009-4',
        'https://book.douban.com/subject/3590768/'
    ]"
/>

<Commend
    type="title"
    src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/books/20200805183735.png"
    :callouts="[
        '《前端工程化：体系设计与实践》',
        '周俊鹏 / 电子工业出版社 / 2018-1',
        'https://book.douban.com/subject/27605366/'
    ]"
/>

<Commend
    type="title"
    src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/books/20200805183829.png"
    :callouts="[
        '《JavaScript 面向对象精要》',
        '尼古拉斯·泽卡斯 / 胡世杰 / 人民邮电出版社 / 2015-4',
        'https://book.douban.com/subject/26352658/'
    ]"
/>

<Commend
    type="title"
    src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/books/20200805183921.png"
    :callouts="[
        '《JavaScript 启示录》',
        'Cody Lindley / 徐涛 / 人民邮电出版社 / 2014-3-1',
        'https://book.douban.com/subject/25837367/'
    ]"
/>

<Commend
    type="title"
    src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/books/20200805184009.png"
    :callouts="[
        '《编写可维护的 JavaScript》',
        '扎卡斯 / 李晶/郭凯/张散集 / 人民邮电出版社 / 2013-4',
        'https://book.douban.com/subject/21792530/'
    ]"
/>

<Commend
    type="title"
    src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/books/20200805184114.png"
    :callouts="[
        '《你不知道的JavaScript（上卷）》',
        'Kyle Simpson / 赵望野/梁杰 / 人民邮电出版社 / 2015-4',
        'https://book.douban.com/subject/26351021/'
    ]"
/>

<Commend
    type="title"
    src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/books/黑客与画家.jpg"
    :callouts="[
        '《黑客与画家》',
        '做一个异端是有回报的，不仅是在科学领域，在任何有竞争的地方，只要你能看到别人看不到或不敢看的东西，你就有很大的优势。',
    ]"
/>

还有很多喜欢到不舍得读完的书就不放上来了...

## 🛫 下一份工作

期待有机会能与您共事。
