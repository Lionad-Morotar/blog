---
title: CSSOM View Module
original_path: /maps/_frontend/w3c/css/cssom-view
---

## 说明

当前版本：[Editor's Draft](https://drafts.csswg.org/cssom-view/)

## 内容简介

CSSOM View 规范在 CSS 对象模型之上补充了视图相关接口：窗口与滚动、坐标与命中测试、
媒体查询对象，以及元素的可见性判定 `checkVisibility()`。

#### checkVisibility 判的是「潜在可见」而非「用户可见」

`Element.checkVisibility()` 是 CSSOM View 提供的渲染存在性判定：回答元素还在不在渲染树、内容
有没有被跳过，视口外和被遮挡的元素照样返回 true。判据分三层。第一层默认生效：自身或祖先
`display: none/contents`（无关联布局盒）、自身或祖先 `content-visibility: hidden`、未接入文档，
任一命中即 false。第二层需要显式开选项：`visibilityProperty: true` 才判 `visibility: hidden`，
`opacityProperty: true` 才判 `opacity` 为 0——两者默认全关，零参数调用对透明隐藏态一律放行。
第三层 `contentVisibilityAuto: true` 才把当前正跳过渲染的 `content-visibility: auto` 子树判负。
所有条件都沿祖先链一次判掉，这使它优于只查自身 computed style 的手写判定——v-show 收起、
非活动 tab 面板等场景里，后代自身样式完全正常，隐藏发生在祖先层。两个够不到的边界：
opacity 阈值是恰等于 0，0.01 的渐隐中间帧仍判可见；语义隐藏（`aria-hidden`）与框架过渡类名
（如 Vue 的 leave-active）不属于渲染判据，需在调用外侧自行补层。支持面：Chrome/Edge 105
（2022-08）、Firefox 106（2022-11）、Safari 17.4（2024-03），Baseline 新近可用自 2024-03。

见：[MDN: Element.checkVisibility()](https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility)

#### checkVisibilityCSS 是活别名，不是失效的死参数

checkVisibility 的选项字典定稿前改过一次名：`checkOpacity` 改名 `opacityProperty`、
`checkVisibilityCSS` 改名 `visibilityProperty`，两个旧名按 WebIDL 字典惯例以「historic alias」
身份永久实现。WebIDL 对字典未知成员是静默忽略，但别名不是未知成员而是真生效的——读到
`checkVisibility({ checkVisibilityCSS: true })` 的旧式代码不等于写了死参数，它等价于开启
`visibilityProperty`，真的能判住 `visibility: hidden`。MDN 只在选项列表末尾一行带过别名映射，
教程基本不提，第一印象容易误判成拼写错误并「顺手修掉」，反而改变判据强度。

见：[MDN: Element.checkVisibility()](https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility)

#### 同名 API 在测试环境与 Chromium 里未必是同一判据

jsdom 至今未实现 checkVisibility（issue #3695 长期 open），而 happy-dom 在 20.9 与 20.14 之间
补上了完整实现：正经沿祖先链循环、认三个选项和两个历史别名。于是「没有 checkVisibility 就走
手写循环兜底」的 typeof 守卫，随测试基座升级会静默换轨——旧版本恒走兜底循环，新版本走的是
happy-dom 的模拟实现。模拟与原生有两处实测漂移：happy-dom 完全不模拟 `content-visibility`；
元素自身 `display: contents` 且有可见子节点时它放行，原生语义是自身无盒判 false。工程上写
「特性探测 + 手写祖先链循环」双路并不冗余，但要知道双路各自跑在什么实现上：测试全绿不等于
Node 端判据与浏览器端判据等价，依赖 content-visibility 或 contents 的元素差异只在真浏览器里
暴露。

见：[jsdom issue #3695](https://github.com/jsdom/jsdom/issues/3695)
