# 设计模式

## 策略模式

策略模式在代码中有着广泛的应用。比如我们在页面上做表单校验时，针对不同字段，会使用不同的校验方法，那我们就会把这些方法同一封装为返回 True 或 False 即代表校验成功或失败的函数。这些校验函数就是我们说的“策略”，它们被外部函数通过调用，外部无需关系内部的具体实现。

```js
const strategies = {
    A: () => console.log('A')
    B: () => console.log('B')
}
const someType = 'A'
const strategy = strategies[someType]
```

策略模式可以这样形容：**定义一系列的算法，将其封装成具有共同目标的的函数**。其背后的思想是在实践编码过程中**封装变化，委托任务，体现了开放封闭原则**。

直观而言，策略模式对消除大量 if/else 嵌套有巨大帮助。不是所有情况都需要使用策略模式消除 if/else 代码，因为两种模式的思维结构不一样。if/else 强调并尽可能维护同种逻辑的所有状态，确保每一种分支都被清楚地考虑；策略模式则是使同种逻辑可被多种方式处理，它将不同方式地变化封装起来，维护了开放封闭原则。

这里有一个根据不同的动画缓动速度类型进行转动速度对比的例子：

<Article-G200708-Animation />

```js
// 源码地址
// https://github.com/Lionad-Morotar/blogs/tree/master/blogs/.vuepress/components/Article/G200708/Animation.vue

// 定义缓动动画步进策略
const tween = {
    linear(t, b, c, d) {
        return (c * t) / d + b  
    },
    easein(t, b, c, d) {
        return c * (t /= d) * t * t * t + b
    }
}
// 旋转函数
function rotate() {
    const type = this.type // 'linear', 'easein', 'easeout' ...
    const from = 0
    const to = 720
    const run = tween[type] // 选择步进策略
    const totalTime = 1000  // 动画总时间
    let curTime = 0         // 时间记录
    let tick = +new Date()  // 帧时间记录
    const safe = num => (num > to ? to : num)
    const step = () => {
        const newTick = +new Date()
        curTime += newTick - tick
        tick = newTick
        const nv = safe(run(curTime, from, to, totalTime)) // 根据步进策略计算当前时间预计的旋转角度
        this.rotateDeg = nv // 设置圆的旋转角度（Vue语法）
        if (curTime < totalTime) {
            this.animation = utils.requestAnimationFrame(step)
        } else {
            this.rotate()
        }
    }
    this.animation && utils.cancelAnimationFrame(this.animation)
    this.animation = utils.requestAnimationFrame(step)
}
```

## 阅读更多

* [我的if else代码纯净无暇，一个字也不能简化](https://www.sohu.com/a/285163368_129720)