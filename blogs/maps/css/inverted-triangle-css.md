# ITCSS（Inverted Triangle CSS）

[TOC]

## 简介

#### ITCSS 是什么？

ITCSS 是由 csswizardry 提倡的一种用来组织与管理项目中的样式文件的体系结构，或一种 CSS 方法论。遵守 ITCSS 理论能够约束我们写的 CSS，在一定程度解决 CSS 弱逻辑带来的问题。

#### CSS 弱逻辑的特性会碰到什么问题？

CSS 本身是弱逻辑的，“装饰性”的，这注定了一般情况下我们不会重视它——没有文档、没有质量保证机制——所以写 CSS 时常常陷入“用新的样式去覆盖旧的样式”的怪圈。

- CSS 的组织结构很松散，有时按页面，有时按组件组织
- 不良的开发习惯导致页面样式的继承很凌乱
- 凌乱的继承引来更多的选择器特殊性问题

#### ITCSS 如何组织 CSS 层级？

<!-- BLOCK - d95f28ea5e53b5f7bc4510ba68f937c8 -->
ITCSS 使用倒立的三角形表示项目的样式继承关系。三角中的每一层都代表一类样式，而每一层都会被下一层更高的优先级覆盖。所以实践 ITCSS 意味着，随着层级自上而下，选择器特殊性递增，能影响的 DOM 数量也越来越少，我们可以轻易修改特定样式，而不影响其它样式，或是导致样式继承的崩塌这种连锁效应。

![ITCSS（Inverted Triangle CSS）](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200628214218.png?type=win11)
<!-- BLOCK - END -->

- Settings：Global variables、Config switches
- Tools：Mixins、Functions
- Generic：Ground-zero styles（Normalize.css，resets.css）
- Base：Unclassed HTML elements（Type selectors）
- Objects：Cosmetic-free design patterns
- Components：Designed components
- Trumps：Helpers、Overrides

#### 一个使用 ITCSS 项目示例？

![ITCSS index.css](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200628215447.png)