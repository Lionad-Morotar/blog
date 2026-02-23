---
title: CSS Sprite 动画
description: 使用 CSS object-fit 和 object-position 实现高性能 Sprite 动画的技术方案
---

#### CSS Sprite 动画如何实现？

通过 `object-fit: cover` 与 `object-position` 配合 `@keyframes` 动画来实现帧动画效果。

容器尺寸设置为单帧大小，背景图为包含所有帧的 Sprite 图。`object-fit: cover` 确保图片覆盖容器但保持比例，`object-position` 控制显示图片的哪个部分。

```css
.trophy {
  width: 200px;
  height: 400px;
  object-fit: cover;
  animation: sprite 1s steps(5, jump-none) infinite;
}

@keyframes sprite {
  from { object-position: 0% 0%; }
  to { object-position: 100% 0%; }
}
```

`steps(5, jump-none)` 将动画分成 5 个离散步骤，`jump-none` 确保每帧均匀显示，适合循环动画。

见：[Sprites on the Web](https://www.joshwcomeau.com/animation/sprites/)

#### 相比 GIF 有哪些优势？

Sprite 动画相比传统 GIF 方案具有以下优势：

- **可控性**：可动态调整 `animation-duration`、`animation-play-state` 实现暂停/播放
- **性能**：优化后的 AVIF Sprite 可小于 30kb，而 GIF 通常超过 100kb 且仅支持 256 色
- **灵活性**：可分层叠加多个 Sprite（如静态奖杯 + 动态火焰分别控制）

Twitter 2015 年的点赞动画最初包含 16 个独立 DOM 元素，对低端移动设备负担过重，改用 Sprite 技术后显著提升了性能。

见：[Sprites on the Web](https://www.joshwcomeau.com/animation/sprites/)

#### Sprite 动画适合什么场景？

**适合的场景**：具有"Sprite 风格"的动画，如角色动画、复古游戏美学、装饰性元素。

**不适合的场景**：需要每次播放都有独特效果的复杂程序动画。例如使用三角函数和随机数生成的点击效果，Sprite 只能重复播放相同序列。

核心权衡：Sprite 提供可预测、高性能、可控的动画；程序动画提供动态、独特的效果，但计算开销更大。

见：[Sprites on the Web](https://www.joshwcomeau.com/animation/sprites/)
