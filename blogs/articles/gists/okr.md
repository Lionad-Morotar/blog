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
  .slides h3 + p {
    margin-top: 1.1em;
  }
  .label-idx {
    display: inline-block;
    margin-right: .35em;
    width: 1.35em;
    border-radius: 0px;
    background-color: #383d3d;
    color: #f0f1eb;
    font-weight: bold;
  }
  .label-idx + .label-idx {
    margin-left: -.35em;
  }
  del {
    opacity: .31;
  }
  emoji {
    font-size: 1.8em;
  }
</style>

# OKR Review

Lionad-Guirtoar @baixing

---

### 内容总览

1. 业务输出及质量保证（7/10）
2. 团队协作与技术迭代（1/10）
3. 个人能力成长（2/10）

---

### 业务输出及质量保证

--

<span class="label-idx">1</span>易慧推迭代

// TODO

快照页面：样式隔离、兼容压缩快照

--

<span class="label-idx">2</span>中台配置系统

// TODO

重复造轮子、项目管理

--

<span class="label-idx">3</span>代码质量

// TODO

--

<span class="label-idx">总</span><span class="label-idx">结</span>

1. 多思考业务，提高代码质量
2. 学习项目管理，加强落地能力

note: 多思考业务，前因后果，数据的来由与去向，才能对代码的各种边界条件更游刃有余。

note: 学习项目管理是指，从调研需求、明确项目目标、里程碑、收集资源、任务拆分到开发测试部署一系列流程的节奏的把握。

---

### 团队协作及技术迭代

--

## Sentry

--

- 遇到了什么问题？
- 怎么去解决这些问题？
- 当前结果以及新的目标

---

### 遇到了什么问题？

--

note: 先看一张图，

<p><img src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/msedge_faMD4wFyo0.png" style="margin-top: .5em; max-height: 38vh;" /></p>

1. 遗留问题**过杂** {.fragment .current-only}

2. 遗留问题**过多** {.fragment .current-only}

--

<span class="label-idx">杂</span><span class="fragment">噪音过多，无法有效跟踪错误</span>

note: 各种网络错误、权限报错、框架代码错误扰乱视线，没有办法通过“最新问题”过滤出上线后的新代码到底有没有发生什么代码质量问题。

<span class="label-idx">多</span><span class="fragment">反应了令人不愉快的代码异味</span>

note: 举个例子，从某个错误跟踪到某个函数没处理空值，然后查代码后发现这段函数居然有多份拷贝。

note: 这两点中的任何一点都非常另人沮丧。

---

### 怎么去解决这些问题？

--

<span class="label-idx">静</span><span class="label-idx">默</span>

1. <span class="fragment">静默无关紧要的抛错</span>
2. <span class="fragment">快速解决简单的代码异味</span>

--

静默能缓解噪音问题，让开发专注更高价值的报警

--

<span class="label-idx">版</span><span class="label-idx">本</span><span class="label-idx">控</span><span class="label-idx">制</span>

![](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/20201224035754.png)

--

![](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/20201224034920.png)

--

版本迭代把数值巨大的目标，分解为步骤

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

<span class="label-idx">静</span><span class="label-idx">默</span> <span class="label-idx">版</span><span class="label-idx">本</span><span class="label-idx">控</span><span class="label-idx">制</span> <span class="label-idx">规</span><span class="label-idx">范</span> <span class="label-idx">流</span><span class="label-idx">程</span><span class="label-idx">约</span><span class="label-idx">束</span>

那么我的上层思考是什么？{.fragment}

--

<span class="label-idx">信</span><span class="label-idx">条</span>

- 努力不是推倒一切，而是**和平共处**
- 解决问题的上层思考，是**规避问题**

---

### 结果

--

note: 最主要的几点

1. 轻松跟踪新问题
2. 是项目基础建设

// TODO

---

### 新目标

--

<span class="label-idx">\*.</span>善用 Sentry

团队协作、用户信息、邮件报警、页面性能追踪...

--

<span class="label-idx">\*.</span>规范和校验 → 输出脚手架

代码生成器，把整套设施可选择性的迁移到新项目

--

<span class="label-idx">\*.</span>ESLint 接 Sonar

--

// TODO

---

### 个人成长

--

Java

// TODO

--

JS 核心原理

// TODO

--

分享

// TODO

---

<span class="label-idx">个</span><span class="label-idx">人</span><span class="label-idx">总</span><span class="label-idx">结</span>

加强业务思考

提高分享能力

努力把项目落地

// TODO

---

# Q & A

---

### 相关资料

- [《Error Tracker 的工作原理》](https://baixing.yuque.com/qian-tech/main/fzln6a)
