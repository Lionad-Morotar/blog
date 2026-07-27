---
title: UI 元素术语
description: NN/g 图形界面控件术语表，按功能分类归纳约 60 个 UI 元素的定义、别名与适用场景
---

图形界面控件（Control）是允许用户执行动作或输入数据的交互元素总称。
以下按功能分类归纳 NN/g 术语表中的常见控件，作为设计与开发沟通的术语基准。

#### 动作按钮

* Button（按钮）：点击执行特定动作，由可点区域与描述动作的标签构成
* Floating Button / FAB（浮动按钮）：悬于内容之上，承载页面最常用动作，滚动时持续可见
* Split Button（拆分按钮）：菜单与按钮混合体，标签触发默认动作，箭头展开备选动作
* Back-to-Top Button（返回顶部按钮）：常置右下角的浮动按钮，快速回页顶，适合长移动页
* State-Switch Control（状态切换控件）：在两个互斥状态间切换系统，如静音/取消静音
* Toggle（开关）：滑块式状态切换控件，需以颜色与标签明确指示当前状态
* Segmented Button（分段按钮）：水平相连按钮组，切换同一数据的不同视图或筛选内容

见：[User-Interface Elements: Glossary](https://www.nngroup.com/articles/ui-elements-glossary/)

#### 输入控件

* Input Control（输入控件）：允许用户向系统输入信息的组件总称
* Textbox（文本框）：单行或多行文本输入区域，表单的基本构件
* Checkbox（复选框）：独立两态选择；成组时从列表选子集，各项互不影响
* Radio Button（单选按钮）：互斥选项集中单选，选中一个即取消同组其他项
* Combo Box（组合框）：下拉列表与文本框混合，可选预定义项也可输入自定义值
* Listbox（列表框）：容器内垂直展示可选项，支持单选或多选
* Dropdown List（下拉列表）：默认收起，点击箭头展开选项，仅单选，选中后回填标签
* Input Stepper（步进器）：以固定步长增减数值，部分允许在文本框中直接改值
* Picker（选择器）：从选项集合选单个值的元素总称，含下拉、单选列表、滚轮等
* Range Control（范围控件）：在预定义范围内选任意值，如 Slider 与 Knob
* Slider（滑块）：沿轨道拖动 handle 调整值，适合音量、亮度等难以精确量化的场景
* Knob（虚拟旋钮）：值分布在圆弧上的范围控件，拟物自音频设备旋钮
* 2D Matrix（二维矩阵）：拖曲线上的点同时修改两个相关参数，用于照片曲线等场景
* Date Picker（日期选择器）：选日期的输入控件总称，分日历式与滚轮式两类
* Calendar Picker（日历选择器）：月视图日历中导航选择日、月、年
* Wheel Picker（滚轮选择器）：iOS 特有，以滚轮界面展示选项
* Wheel-Style Date Picker（滚轮式日期选择器）：iOS 特有，日/月/年分列滚轮，可用性低于日历式

见：[User-Interface Elements: Glossary](https://www.nngroup.com/articles/ui-elements-glossary/)

#### 菜单与导航

* Menu（菜单）：选项或命令集合，可常显（菜单栏）或可展开
* Menu Bar（菜单栏）：选项始终可见的条形菜单，工具栏与导航栏皆属此类
* Navigation Menu / Navigation Bar（导航菜单/导航栏）：承载导航选项的菜单及其常显条形实现
* Expandable Menu（可展开菜单）：点击 handle 才暴露选项集合的菜单总称
* Dropdown Menu（下拉菜单）：选项在 handle 下方以线性列表展开
* Megamenu（大菜单）：选项以矩形面板展开，主要用于站点导航
* Pie Menu（饼菜单/径向菜单）：选项环绕 handle 均布圆周、等距可达，始终小众
* Drawer Menu（抽屉菜单）：从屏幕左右缘滑出的侧边栏菜单，移动端常见导航形式
* Contextual Menu（上下文菜单）：右键等触发，只含与当前对象相关的小集合动作
* Submenu（子菜单）：主菜单项悬停或点击展开的次级菜单，承载层级而不膨胀主菜单
* Breadcrumbs（面包屑）：展示当前页在站点信息架构中从大到小的层级路径
* Link / Anchor Link（链接/锚点链接）：页间或页内跳转；锚点链接常用于页内目录
* Tab Bar（标签栏）：水平标签列表切换内容面板，组织内容；区别于组织命令的 Ribbon
* Ribbon（功能区）：选项卡分组的命令工具区，微软 Office 推广，Web 等价物是 Tab Bar
* Accordion（手风琴）：原地展开隐藏内容，压缩长页面，移动端尤其实用

见：[User-Interface Elements: Glossary](https://www.nngroup.com/articles/ui-elements-glossary/)

#### 浮层与弹层

* Overlay（浮层）：在页面内容之上显示内容，可模态或非模态、全屏或部分
* Dialog（对话框）：打断流程、要求立即决策的小窗口，可模态或非模态
* Popup / Popover（弹出层）：不占全屏的浮层，Apple 生态称 Popover
* Lightbox（灯箱）：不占全屏的浮层，多用于展示图片、视频等多媒体内容
* Bottom Sheet（底部面板）：锚定移动屏幕底缘的浮层，展示附加详情或动作
* Side Sheet / Drawer / Flyout（侧边栏）：从左右缘滑出、覆盖大部的浮层
* Snackbar / Toast（轻提示）：短暂出现后自动消失的非模态提示，可带撤销按钮
* Tooltip（工具提示）：鼠标或键盘悬停触发的简短说明小浮层
* Popup Tip（弹出提示）：触屏无悬停场景下点击 i/? 图标触发的 Tooltip 等价物

见：[User-Interface Elements: Glossary](https://www.nngroup.com/articles/ui-elements-glossary/)

#### 内容容器

* Container（容器）：承载并组织相关元素的图形区域，以边框、阴影或间距界定
* Card（卡片）：扑克牌大小的相关信息容器，一个概念单元的简短表示
* Carousel（轮播）：旋转展示一组内容，手动或自动切换，节省屏幕空间
* Scrollbar（滚动条）：指示并控制可见区域，含轨道与可拖 handle，现代 UI 按需出现

见：[User-Interface Elements: Glossary](https://www.nngroup.com/articles/ui-elements-glossary/)

#### 反馈与指示

* Progress Indicator（进度指示器）：反馈进行中任务的状态，降低不确定感
* Progress Bar（进度条）：水平填充显示完成百分比，超过 10 秒的任务建议使用
* Spinner（加载动画）：旋转圆圈表示任务进行中，无进度信息，仅适合 3 秒内短任务
* Skeleton Screen（骨架屏）：整页加载专用，以线框模拟页面布局的进度指示
* Badge（徽标）：图标上的圆点或数字，提示通知或未读计数
* Icon（图标）：视觉传达对象、动作或概念的小图形，多数应与文字配合使用

见：[User-Interface Elements: Glossary](https://www.nngroup.com/articles/ui-elements-glossary/)
