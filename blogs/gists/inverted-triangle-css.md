# ITCSS（Inverted Triangle CSS）

[TOC]

平常我们写 CSS 可能会碰到以下问题：

- CSS 的组织结构很松散，有时按页面，有时按组件组织
- 不良的开发习惯导致页面样式的继承很凌乱
- 凌乱的继承引来更多的选择器特殊性问题

其实这一切都是 CSS 本身的特征导致的问题，CSS 本身是弱逻辑的，“装饰性”的，这注定了一般情况下我们不会重视它——没有文档、没有质量保证机制——所以写 CSS 时常常陷入“用新的样式去覆盖旧的样式”的怪圈。

遵守 ITCSS 理论能够约束我们的行为，它是由 csswizardry 提倡的一种用来组织与管理项目中的样式文件的体系结构，或是一种 CSS 方法论。

ITCSS（Inverted Triangle CSS） 名字很形象，见以下倒立的三角形，每一层都代表一类样式，而每一层都会被下一层更高的优先级覆盖：

![ITCSS（Inverted Triangle CSS）](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200628214218.png)

- Settings：Global variables、Config switches
- Tools：Mixins、Functions
- Generic：Ground-zero styles（Normalize.css，resets.css）
- Base：Unclassed HTML elements（Type selectors）
- Objects：Cosmetic-free design patterns
- Components：Designed components
- Trumps：Helpers、Overrides

实践理论将带来的好处显而易见：层级自上而下，选择器影响的 DOM 数量也越来越少，同时选择器特殊性递增。修改某个样式时我们可以轻易从相关组织文件中做出修改，而不影响其它样式，或是导致 CSS 样式继承的崩塌。

一个使用 ITCSS 组织的项目，其 index.css 可能长这个样子：

![ITCSS index.css](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200628215447.png)