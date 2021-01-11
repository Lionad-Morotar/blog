---
theme: 'serif'
transition: 'slide'
highlightTheme: 'zenburn'
slideNumber: false
enableChalkboard: falseenableChalkboard
enableTitleFooter: false
title: 'OKR Review'
logo: 'https://gravatar.loli.net/avatar/1023688aa5bd010e35fdf503280955c9'
---

<!-- <link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
/> -->
<style>
  :root {
    /******************************* 主题颜色 */
    --c-theme: #F5D5A0;
  }
  .reveal section img,
  .reveal section video,
  .reveal section iframe {
    max-width: 100%;
    border: none;
  }
  .reveal .slides h3 + p {
    margin-top: 1.1em;
  }
  .reveal .label-idx {
    display: inline-block;
    margin-right: .35em;
    min-width: 1.35em;
    border-radius: 0px;
    background-color: #383d3d;
    color: #f0f1eb;
    font-weight: bold;
  }
  .reveal .label-idx + .label-idx {
    margin-left: -.35em;
  }
  .reveal del {
    opacity: .31;
  }
  .reveal emoji {
    font-size: 1.8em;
  }
  .reveal .description {
    margin: .8em 0;
    font-size: 16px;
  }
</style>

# OKR Review

Lionad-Guirtoar @baixing

---

### 内容总览

1. 业务输出及质量保证（8/10）
2. 团队协作与技术迭代（1/10）
3. 个人技术能力成长（1/10）

---

### 业务输出及质量保证

--

<span class="label-idx">1</span>易慧推迭代

1. 完成一期攻坚，查词记录、报表页等
2. 完成二期迭代，三词一省、图表优化
3. 支持三期迭代，前端逻辑微调

--

![](https://baixing-assets.obs.cn-east-3.myhuaweicloud.com/%E5%BF%AB%E7%85%A7%E9%A1%B5%E9%9D%A2.png)

--

<video src="https://baixing-assets.obs.cn-east-3.myhuaweicloud.com/%E6%98%93%E6%85%A7%E6%8E%A8-%E6%9F%A5%E8%AF%8D%E9%A1%B5%E9%9D%A2.mp4" autoplay loop />


--

目标、挑战性 & 结果

1. 熟悉工作流程及代码，快速融入团队
2. 按时保质完成迭代，无技术原因延期

<!-- 未来：看业务安排 -->

--

<span class="label-idx">2</span>中台配置系统

0. <del>【入职两周】系统搭建，业务页面编写</del>
1. 【9月底~攻坚前】联调自测、部署到线下
2. 【11月27日】和曹勇交接商品服务代码

--

![](https://baixing-assets.obs.cn-east-3.myhuaweicloud.com/%E5%88%9B%E5%BB%BA%E5%95%86%E5%93%81%E9%A1%B5%E9%9D%A2.png)

<!-- 不展示视频 -->

--

目标 & 结果

1. 延期两周、暂停开发
2. 了解项目部署基本操作
3. 后续接OA登录、测试...{.fragment}

<!-- 看安排 -->

--

<span class="label-idx">3</span>标王凤鸣

支持为主、小的需求

--

<span class="label-idx">4</span>代码质量

1. 线上没有影响业务流程的问题
2. 提测时稍轻浮、问题较多（攻坚）

--

<span class="label-idx">总</span><span class="label-idx">结</span>

1. 多思考业务，提高代码质量
2. <del>学习项目管理，加强落地能力</del>

note: 多思考业务，前因后果，数据的来由与去向，才能对代码的各种边界条件更游刃有余。

note: 学习项目管理是指，从调研需求、明确项目目标、里程碑、收集资源、任务拆分到开发测试部署一系列流程的节奏的把握。

---

### 团队协作及技术迭代

--

## Sentry

--

- 遇到了什么问题？
- 怎么去解决这些问题？
- 当前结果 & 新的目标

--

### [遇到了什么问题？](http://sentry.baixing.cn/BX/bax-fe-90/searches/655/)

--

### 怎么去解决这些问题？

--

<span class="label-idx">静</span><span class="label-idx">默</span>

1. <span class="fragment">静默无关紧要的抛错</span>
2. <span class="fragment">快速解决简单的代码异味</span>

--

静默能缓解噪音问题，让开发专注更高价值的报警

--

<a href="http://sentry.baixing.cn/BX/bax-fe-90/releases/" target="_blank" rel="nofollow"><span class="label-idx">版</span><span class="label-idx">本</span><span class="label-idx">控</span><span class="label-idx">制</span></a>

![](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/20201224035754.png)

--

![](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/20201224034920.png)

--

<span class="label-idx">规</span><span class="label-idx">范</span>

1. 代码规范：<span class="fragment">静态语法错误 + 最佳实践</span>
2. 提交规范：<span class="fragment">记录有意义的提交信息</span>

--

严格的规范 → 整洁的代码

1. 减少低级错误
2. 帮助开发快速熟悉代码，确定问题源头

--

提交规范带来：美观、易于理解、方便回溯

![我的博客的提交规范](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/20201208160054.png)

--

<span class="label-idx">流</span><span class="label-idx">程</span><span class="label-idx">约</span><span class="label-idx">束</span>

1. 提交检测：静态扫描、校验提交信息
2. 推送检测：分支保护、校验推送信息

--

<div class="mermaid">
graph LR
  subgraph Gitlab
    Gitlab
  end
  subgraph Local PC
    WD --> |"校验代码和提交信息"| check{提交时检测}
    check --> |失败| reject1[提交失败]
    style reject1 stroke:#f66,stroke-width:3px;
    check --> |通过| git[Git]
  end
  git --> check2{推送检测}
  check2 --> |失败| reject2[推送时失败]
  style reject2 stroke:#f66,stroke-width:3px;
  check2 --> |通过| Gitlab
</div>

--

### 当前结果 & 新的目标

--

<span class="label-idx">\*.</span>规范和校验 → 输出脚手架

代码生成器，把整套设施可选择性的迁移到新项目

---

### 个人成长

1. Java
2. JS 核心原理
3. 团队分享

---

# Q & A

---

### 相关资料

- [《Error Tracker 的工作原理》](https://baixing.yuque.com/qian-tech/main/fzln6a)
