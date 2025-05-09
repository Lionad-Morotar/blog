---
title: 任务切片
description: 任务切片技术能使页面在不使用 Web Worker 的情况下榨干页面性能，并保持 UI 响应。
---

JS 执行会抢占 UI 渲染的时间，若 JS 任务长时间运作，页面看起来就会像“假死”，连滚动操作都无法正常进行。使用任务切片技术能使页面在不使用 Web Worker 的情况下榨干页面性能，并保持 UI 响应。

以下图形中有 400 个圆形。每 600ms 会对圆形进行一次更新。使用全量更新策略在我的个人电脑需要耗时约 360ms，也就意味着只有 2/5 的时间留给浏览器响应 UI 渲染。若使用任务切片，虽然总任务执行时间延长到 460ms，但令人惊喜的是，无论是滚动操作，还是界面中的动画，滚动页面带来的卡顿都得到缓解。

Article-G200919-TaskSlice

滚动测试滚动测试滚动测试滚动测试滚动测试滚动测试滚动测试滚动测试。

## 关键代码

#### FPS

FPS 统计使用了 requestAnimationFrame API。

第一种方法来自 [AlloyTeam 的示例代码](https://mp.weixin.qq.com/s/fD-jtZ0ETUWwyL3YhmA3kw)，通过累计时间以计算每一秒的帧率。

```js
let lastTime = performance.now()
let frames = 0
const loop = () => {
    const currentTime = performance.now()
    frames += 1
    if (currentTime > 1000 + lastTime) {
        fps = Math.round((frames * 1000) / (currentTime - lastTime))
        frames = 0
        lastTime = currentTime
        console.log(`fps:${fps}`)
      }
    window.requestAnimationFrame(loop)
}
loop()
```

也可以实施计算每一秒帧率。

```js
let date = +new Date()
const step = () => {
  const currentFPS = Math.floor(1000 / Math.abs(date - (date = +new Date())))
  this.$emit('onFPS', currentFPS)
  requestAnimationFrame(step)
}
requestAnimationFrame(step)
```
