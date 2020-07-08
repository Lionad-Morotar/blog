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
// 完整源码地址：
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

用原生 JS 写其实也很简单，掘金有很多类似的文章，这里就不赘述了。不过还是需要提一下发布订阅模式的缺陷：发布订阅模式使得事件被执行时难以被追踪其来源，当事件的数量增多时这种缺点尤其明显；此外，需要写一些额外的代码，确保事件不被使用时注销，防止内存泄漏。

相关阅读：[《🚀 150 行代码带你实现小程序中的数据侦听》](/articles/150%E8%A1%8C%E4%BB%A3%E7%A0%81%E5%B8%A6%E4%BD%A0%E5%AE%9E%E7%8E%B0%E5%B0%8F%E7%A8%8B%E5%BA%8F%E4%B8%AD%E7%9A%84%E6%95%B0%E6%8D%AE%E4%BE%A6%E5%90%AC.html)

## 装饰器模式/包装器模式

我本来想说“装饰器模式在代码中被广泛使用”之类的话，但仔细一想，难道不是每一种设计模式都被“广泛使用”了么——没有被广泛使用的模式没有收编进设计模式中，因为这种模式不够优秀或者还未经验证。网上说常见的设计模式就二十来种，如果某门语言连这些常见的设计模式都无法实现（或仿制），那么面对它时我心里会<del>有点</del>很介意的。从这一角度来看，JS嘛真香...

回到正题，想象一下，你可以在你的大脑里植入芯片，而且这些芯片可以增强你的能力水平，比如自动屏蔽屏幕上的血腥效果（嗯，我不是在催 2077）——**某个对象能力不足，但可以使用插件给它增强额外的能力，这就是装饰器模式**。

假设你有一个正在迁移至新版的库文件，某些原来的 API 你不想给其他人用，那么可以在调用该 API 时，console.warn 提示一句“你好，我将在下个版本被移除”。把这段提示的逻辑挪出来，可以用装饰器模式轻松重构：

```js
class SomeClass {
    @deprecate('WARN: oldAPI would be removed in next Main Version.')
    oldAPI() {}

    // This function will automatically debounced
    @debounce
    scroll() {}
}

// 相关项目
// https://github.com/jayphelps/core-decorators
```

再举个例子：业务代码中常常会要求客户端发生错误后要上报服务器进行统计。传统的错误捕获思路无非这几种：try/catch，window.onerror，window.addEventListener('error')，不过这几种方法无法都无法捕获 new Promise().catch 中的错误，需要使用一种额外的事件：window.addEventListener('unhandledrejection')。不过，我们可以使用一种带“上报错误”能力的函数来装饰 catch，以增强其功能。见下代码：

```js
/* Promise Error Handle */

// 缓存原 catch 函数
const _catch = Promise.prototype.catch 
Promise.prototype.catch = function PromiseCatch(errorFn, ...args) {
    // 增加错误上报能力
    console.trace('Upload error occur in promise...')
    // 执行原函数（装饰器并未改变原函数的能力，甚至连 this 指向都没有变）
    _catch.bind(this)(errorFn, ...args)
}

// 错误仿制
new Promise((resolve, reject) => {
    reject('bad')
}).catch(error => {
    console.log('catch: ', error)
})

// >>> Upload error occur in promise...
// >>> PromiseCatch @ VMXXX
// >>> (匿名) @ VMXXX
// >>> catch:  bad

// 额外叨叨一句，这段代码只是展示一种“可能”，不建议在业务代码中修改原型。
```

装饰器和包装器往往混在一起谈论，因为在JS中，它们常混在一起使用。如果装饰器是用芯片增强你的大脑，那么包装器就好比钢铁侠那身外套——就像我们刚刚对 Promise.prototype.catch 进行了升级，升级方式是用一个新的函数把原函数“包裹起来”。

那么装饰器模式和包装器模式有什么需要注意的特性呢？哈，我相信你已经知道了——钢铁侠不能套很多件铁甲，因为那样会变胖！**（＞v＜﹗）** （导致运行速度下降 & 需要更多的内存。）

## 阅读更多

* [我的 if/else 代码纯净无暇，一个字也不能简化](https://www.sohu.com/a/285163368_129720)
* [前端代码错误上报](https://juejin.im/post/5c98cd63f265da611b1edcf2)
* [使用 ES decorators 构建一致性 API](https://developer.aliyun.com/article/272196)