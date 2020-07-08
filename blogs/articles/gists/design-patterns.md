# 设计模式

![窗户图案](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200704/glass-patterns.jpg)

互联网时代从电话连线向万物互联逐步演进；代码世界经历开源文化到博客文化兴衰史。文化流行与衰亡的基础，某种程度上而言取决于其传播媒介。**网络**。同时，媒介往往反向作用于使用它的个体，以至于程序员们讨论的事物趋向于同样的某种性质。文化可以像宗教般传播开，开源文化就属于一种文化典型；文化也可以像语言一样深植人心，我们今天讨论的设计模式便是一种。

为什么我把设计模式类比为一种语言？因为即使追溯到设计模式定义之初，它也无关一种“技术”。**设计模式是一种“思想”，它是掌握面向对象的程序员们解决问题的通用方式**。不同的编程语言更像是加减了各种特征的“方言”，而它们背后的语言特征和语言规范的上一层抽象，才能叫设计模式。

因 JS 是动态的面向对象语言，所以实践起设计模式来显得轻而易举。本文将介绍 Web 开发种最常用的 7 种设计模式，以实际场景，带你领略使用 JS “交流”的秘诀。

## 从JS说起 / 原型模式

可能所有前端开发都知道，**JS是面向对象的、基于原型的、函数是一等公民的语言**。只是这些语言特性和设计模式有什么关系呢？换句话问作：说起 JS 的设计模式，我们到底在讨论什么？

编程语言并不是万能的。**特定的语言对特定类型的问题有着更适合的解法**。设计模式不仅仅是解决问题的抽象模式，它还是一种对编程语言表达力的强化。尽管 JS 拥有许多特征（参见犀牛书），但当我们提及其优点时，也许可以只谈“对象”、“函数”和“原型”。狭隘地说，使用 JS 解决问题的方式往往就基于这几个基本的语言特征；更进一步，可以说，JS 中其它种类的设计模式则是基于其语言特征的高层抽象。

我们在博客中讨论了太多了原型和原型链相关的知识，你应该了解“若在对象查找不到某种属性，则会自动追溯至其构造器的原型对象上，以此类推，直到没有原型对象可以追溯为止”这种基本的语言特征。我们一直说原型与原型链是特征，是因为这是 JS 的天赋。如果使用其它语言实现这种对象之间，通过原型进行链接的关系，那就称之为“原型模式”。在 JAVA 中，原型模式以属性拷贝创建新对象的方式取代使用构造器创建实例的方式，在某种场景下，能带来卓效的性能提升。不过在 JS 中，对象通过内部属性 \_\_proto\_\_ 链接万物，这是人皆悉知的概念，所以在 JS 中说起原型，便不是“原型模式”这种高深莫测的词汇了。也不说是“语言特征的更高一层抽象”了，因为他就是特征本身。

![JS原型模式](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200704/20200709004104.png?w=80)

比较以下 JAVA 和 JS 中的原型模式，相信可以理解许多人所支持的“设计模式是对语言不足的补充”这种观点了。设计模式是建立在语言特征上，以问题解决为导向的抽象概念。熟悉它之后，也许我们也可以不再显式地讨论它。不过此观点也有偏颇之处，比如：对于非面向对象语言，“设计模式”是不必要的。使用它们解决问题的过程中，不一定需要遵循特定范式，或者，“设计模式”至少可以用另外一种词等价替换（请想象一下 CSS 中的设计模式）。

**那么，说起 JS 的设计模式，我们到底在讨论什么？**

**是语言特征，以及通过语言特征组合形成的表达性更强的编程方式**。这种方式是使用 JS 的开发在问题解决时用以“交流”的办法。它们无处不在，以至于，在没接触“设计模式”概念之前，所有人都觉得这个词高深莫测；而接触后会惊呼，“嗷呜~ 原来这就是一种设计模式！”

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

## 适配器模式

适配器模式的概念十分简单，就是使两个接口不兼容的软件能兼容运行。你可以现象一下 USB 转接头，比如 Type-C 转音频接头，就是适配器。

![Type-C 转 3.5mm | 小米官网](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200704/20200708102158.png)

我在业务代码中也实践过适配器模式。比如，后端接口版本可能有更新迭代，其中字段可能不一样，如果我们在中国区上线了 V1 版本，在美国区上线了 V2 版本，那么同一套前端代码就会收到两份字段不一样的数据。我们可以通过适配器模式来对数据进行兼容，简单演示如下：

```js
// v1 data
{ version: 1, name: '标题' }
// v2 data
{ version: 2, title: '标题' }

ajax('url', {
    success(data) {
        const adaptor = {
            name: data.name || data.title
        }
        const name = adaptor.name
    }
})
```

## 代理模式

程序员熟知的“Great Fire Wall”相关概念中，就有“代理”这个概念。它是代理模式的一种，叫做“动态代理”——我们请求访问谷歌主页时，代理将把我们的请求自动转接到可靠的主机上，我们无需关心具体要连接哪台主机。如果访问某个对象的代理，代理把访问拒绝了，那么该代理称为“保护代理”（就像你的同桌拒绝了你向她提出帮忙向老师请假的要求）。另一种常用的代理是“虚拟代理”，它会对高性能消耗的操作进行延迟处理。比方说，给图片设置 SRC 时，常常弦用 Loading 占位，再异步请求图片，请求完成后再将 SRC 回填至标签——这就是虚拟代理。

获取代理可实现的功能增强这种特征看起来很像我们刚刚提到的装饰器模式，它们其实还是有区别滴：代理拦截了对对象的某种访问，可能在拦截时进行了功能增强；装饰器则不含拦截的概念。总之，**代理模式为对象提供一层概念上的“包装”，使其实现控制外部对源对象的访问**。

ES6 原生支持代理模式。对，就是 Vue3 中用到的那个“Proxy”，译为“代理器”。掘金有很多 Vue3 Proxy 分析的文章，这里不对 Vue3 中的 Proxy 再赘述了。以下展示两个使用 Proxy 拦截对象操作的小例子。

其一，禁止访问对象的下划线开头的属性：

```js
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`)
  }
}
const obj = {}
const proxy = new Proxy(obj, {
  get (target, key) {
    invariant(key, 'get')
    return target[key]
  },
  set (target, key, value) {
    invariant(key, 'set')
    target[key] = value
    return true
  }
})

proxy._prop
// Error: Invalid attempt to get private "_prop" property
proxy._prop = 'c'
// Error: Invalid attempt to set private "_prop" property
```

其二，以下展示一种通过 Proxy 拦截属性调用实现的属性查找功能：

```js
const rawObj = [
    { name: 'John', age: 23, skills: ['mongodb'] },
    { name: 'Lily', age: 21, skills: ['redis'] },
    { name: 'Iris', age: 43, skills: ['python', 'javascript'] },
]
const methods = {
    Has: (items, item) => items.includes(item)
}
const methodsNames = Object.keys(methods)
const proxy = new Proxy(rawObj, {
    get (target, prop) {
        if (prop in target) return target[prop]

        const prefix = 'find'
        if (!prop.startsWith(prefix)) return
        const usePublicMethod = methodsNames.find(x => prop.endsWith(x))
        if (!usePublicMethod) return
        const proxyProp = prop.replace(prefix, '').replace(usePublicMethod, '').toLowerCase()

        return val => target.find(x => methods[usePublicMethod](x[proxyProp], val))
    }
})

console.log(proxy.length)
// >>> 3

console.log(proxy.findSkillsHas('javascript'))
// >>> { name: 'Iris', age: 43, skills: ['python', 'javascript'] }
```



## 阅读更多

* [15年后 GoF 设计模式作者再谈模式](https://www.jdon.com/37356)
* [解密“设计模式”](http://www.yinwang.org/blog-cn/2013/03/07/design-patterns)
* [我的 if/else 代码纯净无暇，一个字也不能简化](https://www.sohu.com/a/285163368_129720)
* [前端代码错误上报](https://juejin.im/post/5c98cd63f265da611b1edcf2)
* [使用 ES decorators 构建一致性 API](https://developer.aliyun.com/article/272196)
* [Proxy 的巧用](https://juejin.im/post/5d2e657ae51d4510b71da69d)
* [How to use JavaScript Proxies for Fun and Profit](https://medium.com/dailyjs/how-to-use-javascript-proxies-for-fun-and-profit-365579d4a9f8)