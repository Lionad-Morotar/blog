# 🍲 浅见 | 设计模式是 JS 的魔法锅吗？

[[TOC]]

![窗户图案](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200704/glass-patterns.jpg)

## 设计模式是什么

文化流行与衰亡的基础，某种程度上而言取决于其传播媒介。对代码文化而言，网络是必备条件。正有历史的车轮驱动互联网时代从电话连线向万物互联逐步演进；代码文化历经“开源与商业”到“个体与博客”的荣枯史。同时，媒介往往反向作用于其中个体：网络迫使开发们讨论的事物的上下文越发趋同，这时，文化的统一性成了趋势。文化可以像宗教般传播开，开源文化就属于一种典型；也可以像语言一样深植人心，我们即将讨论的设计模式便是一种。

为什么我把设计模式类比为一种语言？因为它是技术人员之间特定的“交流方式”。即使追溯到设计模式诞生之初，它也无关一种“技术”。1994 年，GoF 借用建筑思想家亚历山大著作《建筑模式语言》中关乎“人文关怀”的“模式”的概念，创造了最初版本的《设计模式》。两种“模式”所在领域不同，但有内在联系，它们都想解决“物”与“人”的关系的问题。

**设计模式是一种“思想”，它是掌握面向对象的程序员们解决问题的通用方式。** 

其次，设计模式把使用面向对象思想解决问题的方式概括为一种“可谈论的”名词，使经验各不相同的人也能快速理解代码意图——它是一种强而有力的表达方式，经过一代人验证的表达方式——良好的设计能够经受住时间的考验，适应不同的技术形态。

## 从JS说起

说起 JS 的设计模式，等等... 我知道 **JS是面向对象的、基于原型的语言**。但是讨论设计模式时，为什么要区分编程语言对待呢？

编程语言并不是万能的。**特定的语言对特定类型的问题有着更适合的解法**。就通用 OOP 编程语言而言，设计模式不仅仅是解决问题的抽象模式，它还是一种对编程语言表达力的强化。尽管 JS 拥有许多特征，但当我们提及其优点时，也许可以只谈“对象”、“函数”和“原型”。狭隘地说，使用 JS 快速解决问题的方式往往就基于这几个基本的语言特征；也可以更进一步，想要解决其它问题，必须使用基本语言特征去仿制其它语言特征。

![https://www.reddit.com/r/ProgrammerHumor/comments/gfh862/javascript_the_good_parts/](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200704/20200709104930.png)

放到设计模式的角度来看，这个理论同样成立。人们可以使用不同的语言特征来表达编程思想，当语言特征表达能力不足时，只有对基础进行组合或复用——甚至放弃表达。

谈论 JS，离不开闭包、高阶函数等概念，逐渐演化的语言规范更是给 JS 带来了各种新奇的玩意儿。编程的复杂性逐渐从人与代码的关系中转移到语言底层，或者，至少两者的复杂性是在相互较量。此时，设计模式的地位堪忧。当语言的表达能力足够强时，传统的设计模式的概念，被淡化了。以下，我以原型模式举例。

## 原型模式

我们在编程社区里讨论了太多太多关于原型和原型链相关知识，这里不再重复。

你应该了解“若在对象查找不到某种属性，则会自动追溯至其构造器的原型对象上继续查找，以此类推，直到没有原型对象可以追溯为止”这种基本的语言特征。这是 JS 的天赋。如果使用其它语言（比如 JAVA）实现这种对象之间通过原型进行属性查找委托的关系，通常需要将属性从源对象上拷贝一份存放至目标对象，这种模式被称为“原型模式”。在某种特殊场景下，比如为了节约从构造器创建新实例的消耗时，原型模式能带来卓越效果。不过在 JS 中，对象通过内部属性 \_\_proto\_\_ 链接万物，这是路人皆知的概念，以至于在 JS 中说起原型模式，便不是“原型模式”这种高深莫测的词汇；也不是开篇提及的“语言特征的更高一层抽象”，因为它就是语言特征本身。

![JS原型模式](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200704/20200709004104.png?w=70)

比较过 JAVA 和 JS 中的原型模式，相信我们都可以理解许多人所支持的“设计模式是对语言不足的补充”这种观点了。设计模式建立在语言特征之上，是以问题解决为导向的抽象概念。熟悉某种模式之后，也许我们再也不显式地讨论它。

不过他们支持的这种观点也有偏颇之处，需要强调的是，设计模式和面向对象是强绑定在一起的。对于非面向对象语言，“设计模式”不是必要。使用非面向对象语言解决问题的过程中，也许有特定范式可遵循，但至少“设计模式”可以用另外一种词等价替换。请想象一下 CSS 中的设计模式。嗯？CSS 有设计模式么？私以为有，特殊性、继承和层叠作为 CSS 基础特征，就是隐式的设计模式。

**那么，说起 JS 的设计模式，我们到底在讨论什么？**

**语言特征，以及通过语言特征组合形成的表达性更强的编程方式**。这种方式是使用 JS 的开发者在某种场景下的问题解决时用以“交流”的方式。这种方式无处不在，以至于，在没接触“设计模式”概念之前，所有人都觉得这个词高深莫测；而接触后则会惊呼，“嗷呜~ 😋 原来这就是设计模式！”

## 模块模式

上一小节我们说到原型模式是 JS 依托语言特征实现的、不需要显式讨论的一种设计模式。这里我迫不及待想谈谈“模块模式”，因为传统的面向对象语言以“类”相关的概念封装模块、保护变量、向外暴露 API，这和模块模式的目标一致，所以不需要显式提及模块模式的。然而为什么在 JS 却不同呢？

“模块”功能似乎已经是各路语言必要的组成部分了。但是，至少在 CommonJS 之前，JS 都没有使用模块组织代码的规范。我们只能使用一些取巧的办法实现模块。见下代码，使用 IIFE 及闭包创造的 MyModule：

```js
const MyModule = (global => {
    let instance
    const init = _ => ['New instance']
    const install = ext => 
        (instance || init()).prototype[ext.name] = ext

    return {
        install,
        getInstance: _ => instance || （instance = init())
    }
})(global)
```

可能是由于被“禁锢”地太久，社区中相关 JS 模块化讨论的热度总是居高不下。毕竟直到 2015 年，ES 6 中新语言特征的出现才给 JS 的模块带来一种规范的思路。我们讨论的内容从“如何创造块级作用域”转变为“如何扩充模块”，再转变为“如何导入导出（以文件为单位的模块）”，现如今则是... “模块化发展史”。

对比一下原型模式和模块模式在 JS 中以及其它语言中的概念，相信你能对我所提出的“讨论 JS 的设计模式就是讨论 JS 语言特征，以及通过语言特征组合形成的表达性更强的编程方式”这种观点更深刻地理解。接下来，我们着眼于几种常见的设计模式。

## 策略模式

策略模式在代码中有着广泛的应用。比如我们在页面上做表单校验时，针对不同的表单字段，需要写不同的校验。也许我们会把这些函数统一封装成返回 True 或 False 值来代表校验成功或失败。然后集中调用。这些校验函数就是我们说的“策略”，它们被外部函数通过调用，外部无需关系内部的具体实现。我们把代码中“变化”的部分，交给了不同策略处理，而调用策略的函数，只负责转发任务。

```js
let strategies = {
    A: () => 'Get A'
    B: () => 'Get B'
}
let someType = 'A'
let exec = strategies[someType]
let result = exec()
```

策略模式可以形容为：**定义一系列的算法，将其封装成具有共同目标的的函数**。直观而言，策略模式对消除大量 if/else 嵌套有巨大帮助。不是所有情况都需要使用策略模式消除 if/else 代码，因为两种模式的思维结构不一样。if/else 强调并尽可能维护同种逻辑的所有状态，确保每一种分支都被清楚地考虑；策略模式则是封装变化，维护了开放封闭原则。

关于策略模式，这里有一个更具体的示例。该例子根据选择不同的动画缓动速度策略来控制圆球的转动速度：

<Article-G200708-Animation />

```js
// 源码见：
// https://github.com/Lionad-Morotar/blogs/tree/master/blogs/.vuepress/components/Article/A200708/Animation.vue

// 定义缓动动画步进策略
const tween = {
    linear(t, b, c, d) {
        return (c * t) / d + b  
    },
    easeoutElastic(t, b, c, d) {
        var s = 1.70158
        var p = 0
        var a = c
        if (t == 0) return b
        if ((t /= d) == 1) return b + c
        if (!p) p = d * 0.3
        if (a < Math.abs(c)) {
            a = c
            var s = p / 4
        } else var s = (p / (2 * Math.PI)) * Math.asin(c / a)
        return a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) + c + b
    }
    // ...
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
        const targetDeg = run(curTime, from, to, totalTime) // 根据步进策略计算当前时间预计的旋转角度
        const continueStep = curTime < totalTime 
        const nv = continueStep ? targetDeg : safe(targetDeg) // 如果是末位步骤则确保停在最大值 720deg
        this.rotateDeg = nv // 设置圆的旋转角度（Vue语法）

        if (continueStep) {
            this.animation = utils.requestAnimationFrame(step)
        } else {
            setTimeout(() => {
                this.rotate()
            }, 700)
        }
    }
    this.animation && utils.cancelAnimationFrame(this.animation)
    this.animation = utils.requestAnimationFrame(step)
}
```

在 JS 中，对象字面量是一种天然的容器，你可以往里面塞几乎任何东西，所以策略模式实现起来没有难处。碎碎念：什么时候才能在 JS 中写这种句子。

```js
let someType = 'A'
let result = match someType:
    | 'A': () => 'Get A'
    | 'B': () => 'Get B'
```

碎碎念x2：可以试试这个库，[zkat/pattycake](https://github.com/zkat/pattycake)。

## 观察者模式-发布订阅模式

想象一下，假设你有一只猫猫🐅。你不可能每五分钟就去看看猫有没有吃完猫粮（轮询）——大可不必——当主子没粮可吃的时候，它自然会用爪子扒你的脸（观察者）！如果你每次都要等到猫猫扒你脸时，才会去网上订购一袋猫粮，那这整套流程就是发布订阅模式。

发布订阅模式和观察者模式可以看成是一个模式，一些书会把两者等同对待。不过要说区别还是有的，观察者模式的观察者和被观察者中没有中间人，比如猫猫会扒你的脸而不是扒你邻居的脸，你也只会给你的猫猫而不是你邻居的电子羊🐏加粮。发布订阅则是描述猫猫和淘宝的关系，它饿了就会通知你，因为也许你知道哪里可以买粮食。为了方便起见，下文将两种模式都称作“发布订阅模式”。

基于回调函数使用事件驱动的 JS 天然支持发布订阅模式，可以想象，在实际代码中，发布订阅模式随处可见。确实如此，假使你在写页面上的图片懒加载，当页面滑动到一定的 Y 值，就要通知相应图片进行加载。更简单的例子是，DOM 模型中的 addEventListener，见下代码：

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
        (button.event[type] || [])
            .map(fn => fn())
    }
    click() {
        handleEvent('click')
    }
}
```

上面的例子只是在 button 对象中的发布订阅抽象。实际代码中，我们完全可以把发布订阅的“中间件”给抽离成一个独立的组件来维护，比方说，在 VueJS 中，我们会用一个 Vue 实例做事件侦听器：

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

## 装饰器模式-包装器模式

请再想象一下，你可以在你的大脑里植入芯片，而且这些芯片可以增强你的能力水平，比如你只要想到快排，相关代码就会浮现于脑海——**某个对象能力不足，但可以使用插件给它增强额外的能力，这就是装饰器模式**。

假设你有一个正在迁移至新版的库文件，某些原来的 API 你不想给其他人用，那么可以在调用该 API 时，console.warn 提示一句“你好，我将在下个版本被移除”。把这段提示的逻辑挪出来，可以用装饰器模式轻松重构：

```js
const MyModule = {
    @deprecate('WARN: oldAPI would be removed in next Main Version.')
    oldAPI() {}

    // This function will automatically debounced
    @debounce
    scroll() {}
}

// 相关项目
// https://github.com/jayphelps/core-decorators
// 附：很遗憾，目前 JS 不支持给字面量对象属性使用装饰器
```

再举个例子：业务代码中常常会要求客户端发生错误后要上报服务器进行统计。传统的错误捕获思路无非这几种：try/catch，window.onerror，window.addEventListener('error')，不过这几种方法无法都无法捕获 new Promise().catch 中的错误，需要使用一种额外的事件：window.addEventListener('unhandledrejection')。不过，我们可以使用一种带“上报错误”能力的函数来装饰 catch，以增强其功能。见下代码：

```js
/* Promise Error Handle */

// 缓存原 catch 函数
const _catch = Promise.prototype.catch 
Promise.prototype.catch = function PromiseCatch(errorFn, ...args) {
    // 增加错误上报能力
    console.trace('Upload error occur in promise...')
    // 执行原函数
    _catch.bind(this)(errorFn, ...args)
}

// 仿制一个错误
new Promise((resolve, reject) => {
    reject('bad')
}).catch(error => {
    console.log('catch: ', error)
})

// >>> Upload error occur in promise...
// >>> PromiseCatch @ VMXXX
// >>> (匿名) @ VMXXX
// >>> catch:  bad

// 额外叨叨一句，这段代码只是展示一种“可能”
// 不建议在业务代码中修改内置对象的原型对象
```

装饰器和包装器往往混在一起谈论，因为在JS中，它们常混在一起使用。如果装饰器是用芯片增强你的大脑，那么包装器就好比钢铁侠那身外套——就像我们刚刚对 Promise.prototype.catch 进行了升级，升级方式是用一个新的函数把原函数“包裹起来”。

那么装饰器模式和包装器模式有什么需要注意的特性呢？啊哈~ 我相信你已经知道答案了——钢铁侠不能套很多件铁甲，因为那样会变胖！

若不是装饰器提案的出现，我赌一块，社区里不会有太多讨论装饰器模式的文章。我们在编码中编写的高阶函数，常常就是装饰器/包装器模式的实现。若不留意，可能大家都不会察觉吧 hhh。**函数在 JS 中是一等公民**（最近政治正确的浪潮拍过来啦，说不准以后就得把“一等公民”换个词啦），可以通过相关语言特征及其方便地实现某些设计模式。比如，通过柯里化可以轻松写工厂模式：

```js
const Curry = (fn, ...args) => (...rest) => fn(...args, ...rest)

const Adder = (a, b) => a + b

const add5 = Curry(Adder, 5)
add5(5)  // >>> 10
add5(-5) // >>> 0

// 我知道你一定想说，工厂模式根本就不是这样写的...
```



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

## 模式与反模式

> 如果你想解决一个困难的问题，会有好几个因素同时发挥作用：<br />
> （a）使用一种强大的语言；<br />
> （b）为这个难题写一个真实世界中的解释器；或者...<br />
> （c）你自己变成这个难题的人肉编译器。



## 后记

叨叨了半天，讲了大约七种设计模式：

* 原型模式
* 模块模式
* 策略模式
* 观察者模式 / 发布订阅模式
* 装饰器模式 / 包装器模式 / 适配器模式 / 代理模式

**这些设计模式不外乎只分为三种作用：创建对象、组合对象以及处理对象的依赖**。不论我们讨论多少设计模式的概念，实际编码能力都不会提升，因为设计模式是问题导向的，需要打开你的记事本写上一些代码，才能理解的更深刻。了解这些概念之后，也许在将来的某一天，你发现自己能按照某种“不可说”的理念重构一段代码，使其更清晰时，你就掌握了设计模式——不仅仅是设计模式，我相信那时的你一定是熟知 JS 各语言特征乃至奇诡技巧的高手。（不过祝愿你永远不会有重构别人代码的机会 hhh）希望本文能对你有所帮助，如果文中出现了不流畅或理解错误的地方也麻烦各位评论指出。

<JJ><p>若有任何疑问，或想深入探讨，欢迎邮件给我：dGFuZ25hZEBxcS5jb20=</p></JJ>

## 阅读更多

所有的文章和源码都会汇总到我的[博客项目](https://github.com/Lionad-Morotar/blogs)，欢迎 Star & Follow，也请大家多来我的[线上博客逛逛](http://www.lionad.art)，排版绝佳 Nice 哦~

![仿生狮子的博客](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200704/msedge-1.jpg)

* [15年后 GoF 设计模式作者再谈模式](https://www.jdon.com/37356)
* [解密“设计模式”](http://www.yinwang.org/blog-cn/2013/03/07/design-patterns)
* [JavaScript 模块化入门Ⅰ：理解模块](https://zhuanlan.zhihu.com/p/22890374)
* [你本可以少写些 if-else](/articles/%E4%BD%A0%E6%9C%AC%E5%8F%AF%E4%BB%A5%E5%B0%91%E5%86%99%E4%BA%9Bif-else.html)
* [我的 if/else 代码纯净无暇，一个字也不能简化](https://www.sohu.com/a/285163368_129720)
* [tc39/proposal-pattern-matching](https://github.com/tc39/proposal-pattern-matching)
* [150 行代码带你实现小程序中的数据侦听](/articles/150%E8%A1%8C%E4%BB%A3%E7%A0%81%E5%B8%A6%E4%BD%A0%E5%AE%9E%E7%8E%B0%E5%B0%8F%E7%A8%8B%E5%BA%8F%E4%B8%AD%E7%9A%84%E6%95%B0%E6%8D%AE%E4%BE%A6%E5%90%AC.html)
* [V8 之旅：垃圾回收器](http://newhtml.net/v8-garbage-collection/)
* [前端代码错误上报](https://juejin.im/post/5c98cd63f265da611b1edcf2)
* [使用 ES decorators 构建一致性 API](https://developer.aliyun.com/article/272196)
* [tc39/proposal-decorators](https://github.com/tc39/proposal-decorators)
* [Proxy 的巧用](https://juejin.im/post/5d2e657ae51d4510b71da69d)
* [How to use JavaScript Proxies for Fun and Profit](https://medium.com/dailyjs/how-to-use-javascript-proxies-for-fun-and-profit-365579d4a9f8)
* [《建筑模式语言》](https://xueshu.baidu.com/usercenter/paper/show?paperid=a01307470bdb2aa61a587606c799878a)
* [《设计模式》](https://link.springer.com/chapter/10.1007/3-540-47910-4_21)