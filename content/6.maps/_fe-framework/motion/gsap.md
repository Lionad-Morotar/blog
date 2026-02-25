---
title: GSAP
description: GreenSock Animation Platform - 专业级 JavaScript 动画库
---

## 核心概念

#### 什么是 GSAP 的 registerEffect？

`gsap.registerEffect()` 是一个强大的方法，允许你创建可复用的动画效果，可在整个网站中作为独立动画或时间线内使用。

**基本用法：**

```javascript
gsap.registerEffect({
  name: 'revealTitle',
  extendTimeline: true,
  defaults: {
    ease: 'expo.out',
    duration: 1.2,
    stagger: 0.1
  },
  effect: (targets, vars) => {
    const tl = gsap.timeline({ defaults: vars })
    tl.to(targets, { yPercent: 0 })
    return tl
  }
})
```

**效果特点：**

* **统一参数**：维护一致的缓动、时长和交错值
* **时间线集成**：`extendTimeline: true` 允许直接在时间线中调用 `.revealTitle()`
* **组件化复用**：配合 Web Components 框架（如 piecesjs）实现自动实例化

**结合 Web Components 使用：**

```javascript
import { Piece } from 'piecesjs'
import gsap from 'gsap'

class Title extends Piece {
  mount() {
    this.split()
    this.initTrigger()
  }

  unmount() {
    this.trigger?.kill()
  }

  initTrigger() {
    this.trigger = store.scrollTrigger.create({
      trigger: this,
      start: 'top 90%',
      once: true,
      animation: gsap.effects.revealTitle(this.splittedTitle.instance.lines)
    })
  }
}

customElements.define('c-title', Title)
```

见：[Reshaping Telha Clarke's Digital Home](https://tympanus.net/codrops/2026/02/25/reshaping-telha-clarkes-digital-home-from-wordmark-to-motion-system/)

#### 如何使用 GSAP ScrollTrigger 实现无缝章节过渡？

通过 `clip-path` 结合 `translateX` 动画，可创建高性能的滚动关联过渡效果。

**实现思路：**

1. 计算源元素与目标元素的位置关系
2. 使用 clip-path 的 `inset()` 函数裁剪图片
3. 同时应用位移和缩放实现平滑过渡

**核心代码：**

```javascript
const animation = gsap.timeline()
const valuesRect = this.$values.getBoundingClientRect()
const imageRect = this.$vision.getBoundingClientRect()

// 计算相对位置
const top = imageRect.top - valuesRect.top
const bottom = valuesRect.bottom - imageRect.bottom
const left = imageRect.left - valuesRect.left
const right = valuesRect.right - imageRect.right

animation
  .to(this.$image, {
    clipPath: `inset(${top}px ${right}px ${bottom}px ${left}px)`
  })
  .to(this.$innerImage, {
    x: imageRect.left + imageRect.width / 2 - store.w.w / 2,
    scale: 1
  }, 0)
```

**技术要点：**

* **性能优化**：clip-path 动画由合成器处理，不触发重排
* **精确计算**：使用 `getBoundingClientRect()` 获取精确位置
* **时间线同步**：两个动画在同一时间点（`0`）开始，确保同步

这种"图片桥接"技术让章节之间几乎不可察觉地连接，创造出叙事流。

见：[Reshaping Telha Clarke's Digital Home](https://tympanus.net/codrops/2026/02/25/reshaping-telha-clarkes-digital-home-from-wordmark-to-motion-system/)

## 相关工具

* [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) - GSAP 官方滚动动画插件
* [Lenis](https://darkroom.engineering/) - 丝滑滚动库（Darkroom Engineering）
* [piecesjs](https://github.com/piecesjs/piecesjs) - 基于原生 Web Components 的轻量框架
