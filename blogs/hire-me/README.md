# 📬 技术简历

<style>
    body.h1_content_技术简历 #valine-vuepress-comment {
        display: none;
    }
</style>

[TOC]

## 👨‍🚀 个人信息

* 个人信息：杨韵树 / 男 / 1996
* 毕业院校：江西师范大学 / 软件工程 / 2014-2018
* 工作年限：3 年
* 联系方式：tangnad@qq.com（Mail） / 1806234223（QQ）
* Github：[Lionad-Morotar](https://github.com/Lionad-Morotar)
* 技术博客：[www.lionad.art](http://www.lionad.art) / [备用网址](https://mgear-blogs.obs-website.cn-east-3.myhuaweicloud.com/)
* 期望城市：上海
* 技术概览：[常用技术栈（HR 请看这里）](/articles/gists/resume.html#🔨-技术概览)

## 🛫 工作经历

### 上海云拿科技

2019.8 - 2020.3

这份工作给我带来的最重要的感受就是，前端的视野应该远不止使用三件套完成代码这么简单。经过两个可交互式项目的积累，我在项目架构、代码拓展与安全性、界面易用性等方面有不少沉淀；习得 React、SVG 相关的一些经验；对**首屏优化**与**复杂布局**等问题有心得体会。

#### 商户平台

公司主营无人超市业务，[商户平台](/articles/gists/resume-prepare/commercial-platform.html)用于给无人超市的经营者提供店铺管理、营销活动、营销数据及库存服务支持。

* 负责营销游戏相关内容。架设了一套跨项目代码复用，使得我在 H5 端编写的大转盘、刮刮乐等营销游戏可在商户在配置游戏时即时查看效果。
* 改进了项目的多语言解决方案；和商务组成员共同推进了营销等模块的国际化。
* 在没有改动项目逻辑的情况下，重构项目的导航为三级菜单；重构了店内设备、用户推送、营销等模块。

#### 数据大盘

[数据大盘](/articles/gists/resume-prepare/shop-data.html)用于超市营销数据的展示。不同国家，需展示不同数据；具体到店铺与顾客时，还需数据脱敏。总体而言，数据大盘可根据需求进行灵活调整与控制。

* 收集不同国家及详细到省份的数据，组建数据文件。
* 将图表通过配置文件做成可热插拔的形式，Require.context 自动载入图表并初始化。解耦了页面布局与图表逻辑。
* 编写健壮的轮询管理器及 Websocket 管理器；使用函数式思路处理后台返回的数据。解耦了请求逻辑及数据处理逻辑。

### 乘云小程序

2017.7 - 2019.7

两年时间，我学习了不少 VueJS 生态、小程序生态方面的技术知识；积累了项目架构、组件设计、进度管理等方面的一些粗浅认识。任职期间，我负责多款新项目启动时的前端构建。对市面常见前端技术进行**实践调研**，结合业务及团队确认项目框架及开发规范。积极参与公司技术文化建设。主持过《切入 VueJS 响应式原理》、[《前端状态管理简介》](https://resume-assets.obs-website.cn-east-3.myhuaweicloud.com/%E5%89%8D%E7%AB%AF%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E7%AE%80%E4%BB%8B.pptx) 等会题的技术分享会。

#### 乘云店火伴

[店火伴](http://www.takecloud.cn/home/shopPartner)是一套多端小程序搭建的社群+营销系统。能为线下商家提供优惠券、积分、红包等各色营销手段，以及商城、外卖、配送等客户经营服务。结合多种支付系统，助力线下实体商户经营转型至线上生态。

* 对市面多种小程序框架进行考察，基于研发体验和研发生态的角度，选型使用 Taro 进行多端小程序开发。PC 端后台管理系统使用 Vue-Element-Admin 快速搭建业务系统。
* 封装页面通用组件及公共库，提高开发体验。其中包括小程序状态管理框架 [State-Vex](https://github.com/takecloud/state-vex) 和 API 简单、体积轻量的校验库 [Valy.js](https://github.com/takecloud/valy)。
* 带领前端开发完善业务功能页面，在 7 期迭代内完成 250+ 设计稿的精准还原。

#### 乘云小程序

[乘云小程序](/articles/gists/resume-prepare/takecloud.html)是一套涵盖电商、餐饮等 9 大行业的通用解决方案。商户可以使用后台提供的营销插件及视觉引擎功能，通过可视化搭建，以拖拽的形式生成低成本、高定制化的小程序界面。

* 负责视觉引擎前两个大版本的原型开发。经迭代沉淀，最终积累了包含音视频、富文本在内，拥有 10+ 组件的组件库。

## 💖 核心能力

**技术狂热症；擅长解决问题；思路开阔；**

* 活跃于 [Github](https://github.com/Lionad-Morotar)，写了一些小型轮子，近期有 [MarkdownParser](https://github.com/Lionad-Morotar/read-source-code/tree/master/module/markdown-parser)；
* 读过许多技术书籍；热爱读技术博客及社区的每周精选；关注业界风向；
* 活跃于[掘金社区](https://juejin.im/user/289926800227694)，掘力值 1700+
* 创造了一种新的 CSS 抗锯齿思路 [POAA](https://juejin.im/post/6844904180776173581)，被[前端早读课](https://mp.weixin.qq.com/profile?src=3&timestamp=1596562383&ver=1&signature=07VDeMiUAG0av39cka13COjcq44y7n*Dm-SQWhg5*7EXWFNrljOrwLHppSHEyIt79pg3qdfkzbf7IcjfnYQi1A==)推荐转载于第 1980 期；
* 喜欢读源码；擅长解决代码及工程问题；

**温和随性；又有很强的创造及表达欲望；**

* 热爱[文字阅读](https://book.douban.com/people/lionad/collect)；喜欢写[个人博客](https://mgear-blogs.obs-website.cn-east-3.myhuaweicloud.com/)；
* 活跃于[网易云音乐](https://music.163.com/#/user/home?id=64236446)，能演奏多种乐器；
* 对平面设计有了解；对待美的事物有追求；

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

## 🔨 技术概览

* 通晓 JavaScript 核心特征及 ES6/ES6+ 规范。
* 扎实的 HTML、CSS 基础；有原生 H5 开发经验；能创造各式精巧的页面布局。
* 掌握 Vue 生态；有一定的 React 开发经验。
* 熟悉前端工程化实践；熟悉 Webpack、Rollup、Gulp 等构建工具。
* 熟悉小程序及框架 Taro。
* 熟悉常见代码性能优化手段。
* 了解 NodeJS。

## 🛫 下一份工作

期待能与您共事。
