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

相关阅读：[《📝 你本可以少写些 if-else》](/articles/%E4%BD%A0%E6%9C%AC%E5%8F%AF%E4%BB%A5%E5%B0%91%E5%86%99%E4%BA%9Bif-else.html)

## 观察者模式/发布订阅模式

想象一下，你不可能没过五分钟就去看看猫粮有没有被吃完（setInterval）——大可不必——当主子没粮可吃的时候，它自然会用爪子扒你的脸！这就是观察者模式。如果猫每扒你的脸时，你就会去网上订购一袋猫粮，那这套流程就是发布订阅模式。

发布订阅模式和观察者模式可以看成是一个模式，在有些书里，会把两者等同对待。它们都主要依据**降低耦合**的思想形成模式。不过我觉得还是稍稍有些区别，观察者模式只有观察者和被观察者两种实体概念，比如你的猫会通知你而不会去通知你的邻居，你也只会给你的家猫加粮食而不是你邻居的电子羊🐏。发布订阅则是你的猫不知道哪有粮食，它饿了就会通知你，而你知道哪里可以买粮食，你可以使用APP购买粮食，把粮食“Return”给猫猫。不同之处便是多了“中间件”，或称之“代理”。为了方便起见，下文将两种模式都称作“发布订阅模式”。

发布订阅模式很好的解耦了时间耦合度和对象关系耦合，而 JS 本身就是事件驱动的，所以，可以想象，在 JS 中，发布订阅模式随处可见。页面图片懒加载的过程中，页面滑动到一定Y值，通知相应图片加载是一个很典型的例子。DOM 模型中的 addEventListener 也是一个例子：

```js
button.addEventListener('click', () => console.log('clicked'))
button.click()
```

而海面的冰山之下（两行代码的背后），可能是这样的实现：

```js
const button = {
    event: {},
    addEventListener (type, fn) {
        button.event[type]
            ? button.event[type].push(fn)
            : (button.event[type] = || [fn])
    },
    handleEvent(type) {
        (button.event[type] || []).map(fn => fn())
    }
    click() {
        handleEvent('click')
    }
}
```

上面的例子只是在 button 对象中的发布订阅抽象。实际代码中，我们完全可以把发布订阅的“中间件”给抽离成一个独立的组件来维护，比方说，在 VueJS 中，我们会用一个 Vue 实例做事件转发器：

```js
// App.vue
const Event = new Vue()
Vue.prototype.$event = Event
// Component A
this.$event.$emit('A')
// Component B
this.$event.$on('A', () => console.log('do something'))
```

用原生 JS 写其实也很简单，掘金有很多类似的文章，这里就不赘述了。

相关阅读：[《🚀 150 行代码带你实现小程序中的数据侦听》](/articles/150%E8%A1%8C%E4%BB%A3%E7%A0%81%E5%B8%A6%E4%BD%A0%E5%AE%9E%E7%8E%B0%E5%B0%8F%E7%A8%8B%E5%BA%8F%E4%B8%AD%E7%9A%84%E6%95%B0%E6%8D%AE%E4%BE%A6%E5%90%AC.html)

## 阅读更多

* [我的 if/else 代码纯净无暇，一个字也不能简化](https://www.sohu.com/a/285163368_129720)