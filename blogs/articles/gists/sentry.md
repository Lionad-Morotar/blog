---
theme : "serif"
transition: "slide"
highlightTheme: "zenburn"
slideNumber: false
enableChalkboard: falseenableChalkboard
enableTitleFooter: false
title: "Git 生态建设"
logo: "https://gravatar.loli.net/avatar/1023688aa5bd010e35fdf503280955c9"
---

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
    border-radius: 3px;
    background-color: #383d3d;
    color: #f0f1eb;
    font-weight: bold;
  }
  del {
    opacity: .31;
  }
</style>

# Sentry

Lionad-Guirtoar @baixing

---

### 目录

* Sentry
* 问题复现
* 解决过程
* 最终结果

---

### 为什么把关注点放到 Sentry？

<!-- 【简单介绍】Sentry 是一个开源的错误追踪工具，能帮助开发者实时监控并追踪代码中的错误。 -->

持续集成、提高效率、提升用户体验

--

### 之前的 Sentry 有什么问题？

--

以一张截图举例

![](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/msedge_faMD4wFyo0.png)

1. 遗留问题**过杂** {.fragment .current-only}

2. 遗留问题**过多** {.fragment .current-only}

--

<span class="label-idx">杂</span><span class="fragment">噪音过大，找不到有价值的信息</span>

<span class="label-idx">多</span><span class="fragment">想处理问题却没重点，有心无力</span>

--

**“从无序中建立有序”**

这是项目工程化实践中相关基础建设的内容

---

### 重点关注

<del class="label-idx">杂</del><span class="fragment">代码规范 + 提交规范</span>

<del class="label-idx">多</del><span class="fragment">流程约束 + 版本管理</span>

---

### 代码规范

<span class="fragment">EditorConfig</span><span class="fragment"> + Prettier</span><span class="fragment"> + ESLint</span>

--

**工具名称** | **工具特征**
:-------------|:---------------
EditorConfig | 无需插件、提供基本约束
Prettier | 多语言格式化（HTML、JS、CSS）
ESLint | JavaScript 静态分析工具

--

严格的规范 → <span class="fragment">整洁的代码</span>

> 保证所有代码看起来都像一人编写的{.fragment}

<!-- 有代码规范，可以帮助开发快速熟悉代码，根据 Sentry 反馈的问题找到问题源头 -->

---

### 提交规范

--

业界有许多成熟的提交规范

<ul class="fragment current-only" style="margin-left: 20%">
  <li><a href="http://arah.in/6cbH" target="_blank" rel="nofollow">Angular Commit Guide</a>
  <li><a href="https://udacity.github.io/git-styleguide/" target="_blank" rel="nofollow">Udacity Git Commit Message Style</a>
  <li><a href="https://open.leancloud.cn/git-commit-message/" target="_blank" rel="nofollow">LeanCloud Commit Guide</a>
</ul>

--

“如何使每一次的代码提交**有意义**"

--

<!-- 在 LeanCloud 规范的基础上 -->

<del>符合国情的</del>熟悉且接受的规范

```js
提交类型：变动内容，简短描述，50 个字符
空行
可选提交详情，72 字符内，说明该提交的原因或是副作用
空行
可选注释及其它（BREAKING CHANGE）
```

--

![我的博客的提交规范](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/20201208160054.png)

<!-- 提交规范的作用：除了美观之外，易于理解、方便回溯 -->

---

### 版本管理

--

[Semantic Version](https://semver.org/lang/zh-CN/)

“主版本号.次版本号.修订号”{.fragment}

“1.0.0”{.fragment}

<!-- 各个数位的涵义 -->

--

![通过版本号管理问题](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/other/20201209155040.png)

---

### 流程约束

--

[Husky](https://www.npmjs.com/package/husky)


