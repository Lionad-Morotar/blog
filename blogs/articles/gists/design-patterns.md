# 🍲 浅见 | 设计模式与魔法锅

[[TOC]]

## 魔法锅传奇

在爱尔兰一个隐秘的角落，住着一个精通智慧与魔法的巫师，凯丽杜恩（Ceridwen）。她能力超凡，偏偏却生了一个丑陋的儿子。所以这位母亲竭尽所能想将智慧传授给他以弥补外表的丑陋，便求助各种巫术与秘仪，最后，终于在魔书中找到了灵感。

~[炼金术 | 维基百科](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200704/20200713074400.png)

魔书将秘密告诉凯丽杜恩：她需要使用一口大的魔法锅，填满红山花、小麦、火盐、精灵耳、直立根和灵尘，用大火熬制上一年零一天。最终会生成一锅致命毒物，但溅出的前三滴汁液却将是充满“预言之灵”的智慧灵药。

很快，熬制魔法锅的工作在凯丽杜恩的安排下有条不紊地进行，一个名字未知的盲人被派来搅拌大锅，而年轻人巴赫则负责烧它下面的火。星象在天空中咯咯响地平移着，太阳和月亮绕着地球转了一轮又一轮... 随着时间推移，锅中的草药效力变得越来越强。看着咕嘟嘟冒着气泡的大锅，凯丽杜恩觉得很是满意，她便躺在温暖的锅边睡着了。

就在此时，意外发生了。翻腾着热气的大锅，意外地溅出了几点液体在巴赫的手指上，而巴赫这个年轻人居然不假思索地将手指吮吸地干干净净。和魔书的预言一样——巴赫立马就获得了智慧——他瞬间通晓了火焰的舞蹈和水的诉说，山的话语和风的呢喃，他知晓了无数秘密，以及... **凯丽杜恩肯定会杀了他！**

慌乱中，巴赫变成一只野兔夺路而逃，而凯丽杜恩惊醒后赶忙变成猎犬追踪过去... 巴赫变成天空中的鸽子，她就变成一只鹰；他变成一头奔跑的鹿，她就变成一只草原上的狼；他化身为谷仓中的一粒麦粒，她就变成一只啄个不停老母鸡... 

总之，这两人也许一直较量着，直到今天。

<hr />

我发现，好像程序员都有某种程度的“信仰”——从《人月神话》到《大教堂与集市》——相当一部分闻名遐迩于业界的作品往往“低代码、高文化[^文化]”；各种文化运动也可以看成“造神”的传奇故事。我们希望能从信仰的魔法锅中创造出解决难题的灵药，这让我想起我之前提过的“程序员相信任何问题都能被解决的”之类的话，这种思想简直就可以看作巫师凯丽杜恩思想的翻版了！hhh~

[^文化]: 这里的“文化”并不指“学术”或“个人素质”。

依我看，“信仰”确实存在，业界希望用“文化”手段，哲学思想或是艺术内涵，来统一代码与人的关系。不过，这种跨界的思想太抽象了，思想传播要落地到实处时，最终只能被简要概括为“规范”或“标准”，展开以文章形式讨论便成了议论性的、充满观点与预言的杂文集。[^膜拜跨界大佬们]

[^膜拜跨界大佬们]: 大佬定律：大佬之所以大佬，是因为他跨界之后仍是大佬。

从传播的角度来看，文化的流行与衰亡和传播媒介，网络，是强绑定的。前有历史的车轮驱动互联网时代从电话连线向万物互联逐步演进；后有代码文化几经“开源与商业”到“博客与社区”的荣枯史。媒介往往也反向作用于其中个体，从特定角度而言：网络迫使开发人员讨论的事物的上下文越发趋同，这时，文化的圈子缩小并统一就成了必然。文化以各种“标准”的形式落地，黑客道德准则锋芒初露；文化可以像宗教般传播，开源运动当属典型；也可以像语言一样深植人心，这便是我们即将讨论的“设计模式”。

**为什么我把设计模式类比为一种语言？因为它是技术人员之间特定的“交流方式”。** 

即使追溯到设计模式诞生之初，它也无关一种“技术”。设计模式把使用面向对象思想解决问题的方式概括为一种“可谈论的”名词，使经验各不相同的人也能快速理解代码意图——它是一种强而有力的、经过一代人验证的表达方式——这正是“良好的设计能够经受住时间的考验，适应不同的技术形态”的体现。

1994 年，GoF 借用建筑师亚历山大著作《建筑模式语言》中关乎“人文关怀”的“模式”的概念，创造了最初版本的《设计模式》。两种“模式”所在领域不同，但有内在联系，它们都想解决“物”与“人”的关系的问题。

**设计模式是一种“思想”，它是掌握面向对象的程序员们解决问题的通用方式。** 

等等... 我知道 **JS是面向对象语言**。只是为什么大学的 C++ / JAVA 课程有提及设计模式，而 Web 开发课程就没有呢？难道说，谈论设计模式，要根据语言的不同区别对待？

若简单而论，可以认为这和推动设计模式发展的小组成员的技术偏好有关。本文余下所有内容，会围绕讨论第二种原理，即“设计模式”和语言特征的相关性。

就让我们从被“区别对待”的 JS 开始说起吧。

## 从JS说起

编程语言并不是万能的。**特定语言天然适合特定类型的问题**。就像使用只有“特殊性”、“继承”和“层叠”概念的 CSS 去写游戏，你会非常痛苦。同理，尽管 JS 拥有许多特征，但当我们提及其优点时，也许可以只谈论“对象”、“函数”和“原型”。狭隘地说，使用 JS 快速解决问题的方式往往就基于这几点“JS 精粹”；更进一步可以说，想要解决其它问题，必须使用一些基本的语言特征去仿制其它语言特征[^module]。

[^module]: 使用立即执行函数创造块级作用域以“仿制”模块模式便是一例。

~[https://www.reddit.com/r/ProgrammerHumor/comments/gfh862/javascript_the_good_parts/](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200704/20200709104930.png)

谈论 JS，离不开原型、闭包、作用域，现逐年扩增的语言规范更是给 JS 带来了各路新奇玩意儿。依据新特征，我们开始接触“元编程”、“函数范式”等“高级”概念[^高级]。编程的复杂性逐渐从语言学习转移到框架，再转移到语言底层。此时，设计模式的地位堪忧——当语言的表达能力足够强时，设计模式的概念便淡化了。以下，我以原型模式举例。

[^高级]: 说“高级”是因为，不懂“一个单子不过就是自函子范畴上的一个幺半群而已”这种概念的人不配谈论函数式编程。（哇谁关下空调？好冷...

### 原型模式

社区里有太多关于原型和原型链的讨论，这里不再重复。

你应该了解“若在对象查找不到某种属性，则会自动追溯至其构造器的原型对象上继续查找，以此类推，直到没有原型对象可以追溯为止”这种基本的语言特征。这是 JS 的天赋。如果使用其它语言（比如 JAVA）实现这种对象之间通过原型进行属性查找委托的关系，通常需要将属性从源对象上拷贝一份存放至目标对象，这称作“原型模式”。在某种特殊场景下，比如为了节约从构造器创建新实例的消耗时，原型模式能带来卓越效果。不过在 JS 中，对象通过内部属性 \_\_proto\_\_ 链接万物，这是路人皆知的概念。以至于，在 JS 中说起原型模式，便不是“原型模式”这种高深莫测的词汇，它就是依据语言特征形成地一种自然而然的编程方式。

~[JS原型模式](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200704/20200709004104.png?w=70)

至此，相信我们都可以理解许多人所支持的“设计模式是对语言不足的补充”这种观点了。设计模式建立在语言特征之上，是以问题解决为导向的抽象概念。熟悉某种模式之后，也许我们再也不显式地讨论它。

不过这种观点也有偏颇之处。需要强调的是，设计模式和面向对象是强绑定在一起的。对于非面向对象语言，传统的“设计模式”的概念不是必要。使用非面向对象语言解决问题的过程中，也许有特定范式可遵循，但至少“设计模式”可以用另外一种词等价替换。请想象一下 CSS 中的设计模式。嗯？CSS 有设计模式么？私以为有，特殊性、继承和层叠作为 CSS 基础特征，就是隐式的设计模式。

**那么，从 JS 开始讨论设计模式，我们到底在讨论什么？**

**语言特征，以及通过语言特征组合形成的表达性更强的编程方式**。这种方式是使用 JS 的开发者在某种场景下的问题解决时用以“交流”的方式。这种“方式”和“设计模式”是概念重叠的。它们又无处不在，以至于，在没接触“设计模式”概念之前，所有人都觉得这个词高深莫测；而接触后则会惊呼，“嗷呜~ 😋 原来这就是设计模式！”

### 模块模式

上一小节我们说到原型模式是 JS 依托语言特征实现的、不需要显式讨论的一种设计模式。这里我迫不及待想谈谈“模块模式”。

**传统面向对象语言以“类”封装模块、保护变量、向外暴露 API，这和模块模式的目标一致，所以不需要显式提及**。然而在 JS 中却不同。至少在 CommonJS 之前，JS 都没有使用模块组织代码的规范。我们只能使用一些取巧的办法来“HACK”模块。

见下代码，使用 IIFE 创造的 MyModule：

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

可能是由于被“禁锢”地太久，社区中相关 JS 模块化讨论的热度总是居高不下。毕竟直到 2015 年，ES Module 的出现才给模块化带来一种规范的思路。我们讨论的内容从“如何创造块级作用域”转变为“如何写 jQuery 插件”，再转变为“如何导入导出变量”，现如今则是... [“JS 模块化发展史”](https://zhuanlan.zhihu.com/p/22890374)。

对比一下原型模式在 JS 从无到有的发展过程，相信你能对“设计模式和语言特征的相关性”有更深刻地体会。接下来，我们再着眼于几种常见的设计模式，看看它们和语言特征的关系。

### 策略模式

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

策略模式可以形容为：**定义一系列的算法，将其封装成具有共同目标的的函数**。直观而言，策略模式对消除大量 if/else 嵌套有巨大帮助。不是所有情况都需要使用策略模式消除 if/else 代码，因为两种模式的思维结构不一样。[if/else 强调并尽可能维护同种逻辑的所有状态，确保每一种分支都被清楚地考虑](https://www.sohu.com/a/285163368_129720)；[策略模式则是封装变化，维护了开放封闭原则](/articles/%E4%BD%A0%E6%9C%AC%E5%8F%AF%E4%BB%A5%E5%B0%91%E5%86%99%E4%BA%9Bif-else.html)。

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

在 JS 中，对象字面量是一种天然的容器，你可以往里面塞几乎任何东西。我们把策略用函数封装好，再塞到字面量中直接调用就好了。使用对象字面量实现策略模式没有任何难处，也易于理解。可以想象当你再 CodeReview 时，别人绝对不会显式地提及：“这是策略模式”。

碎碎念：什么时候才能在 JS 中写[这种表达式](https://github.com/tc39/proposal-pattern-matching)。

```js
let someType = 'A'
let result = match someType:
    | 'A': () => 'Get A'
    | 'B': () => 'Get B'
```

碎碎念x2：可以试试这个库，[zkat/pattycake](https://github.com/zkat/pattycake)。

### 观察者模式-发布订阅模式

想象一下，假设你有一只猫猫🐅。你不可能每五分钟就去看看猫有没有吃完猫粮（轮询）——大可不必——当主子没粮可吃的时候，它自然会用爪子扒你的脸（观察者）！如果你每次都要等到猫猫扒你脸时，才会去网上订购一袋猫粮，那这整套流程就是发布订阅模式。

发布订阅模式和观察者模式可以看成是一个模式，一些书会把两者等同对待。不过稍有区别，**观察者模式中的观察者和被观察者之间没有中间人**。就好比猫猫会扒**你的脸**而不是扒你邻居的脸，你也只会给你的猫猫而不是你邻居的电子羊🐏加粮。发布订阅则是描述猫猫和天猫的关系，它饿了就会通知你，因为它不会操作手机，而你会。为了方便起见，下文将两种模式都称作“发布订阅模式”。

基于回调函数使用事件驱动的 JS 天然支持发布订阅模式，可以想象，在实际代码中，发布订阅模式随处可见。确实如此，假使你在写页面上的图片懒加载，你会先保存页面上所有图片的位置到一个数组中，然后监听页面滚动，当页面滑动到一定的 Y 值，就通知相应图片进行加载，这便是一种发布订阅。

更简单的例子是 DOM 模型中的 addEventListener，见下代码：

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

用原生 JS 写其实也很简单，社区有很多类似的实现，这里就不赘述了。这种简单的模式似乎“概念上”要比原型模式、策略模式和策略模式要重，所以尽管它也是使用对象+函数的实现，但我们会显式将它说出来，或者写到注释中。比如，《深入浅出 VueJS》一书就明确指出 Vue 2 中的变化侦测，“属于推模型（的观察者模式）”。

### 装饰器模式-包装器模式

请再想象一下，你可以在你的大脑里植入芯片，而且这些芯片可以增强你的能力水平，使你敲代码时只要一想到“排序”，各种排序代码就会浮现于脑海供你抄写——**某个对象能力不足，但可以使用插件增强它，这就是装饰器模式**。

假设你有一个正在迁移至新版的库文件，某些原来的 API 你不想给其他人用，那么可以在调用该 API 时，console.warn 提示一句“你好，此 API 将在下个版本被移除”。把这段提示的逻辑挪出来用装饰器模式重构，便可以轻松重用：

```js
const MyModule = {
    @deprecate('WARN: oldAPI would be removed in next Main Version.')
    oldAPI() {}

    // This function will automatically debounced
    @debounce
    scroll() {}
}

// 很遗憾，目前 JS 不支持给对象属性使用装饰器，所以这是一段伪代码
```

再举个例子：业务代码中常常会要求客户端发生错误后要上报服务器进行统计。传统的错误捕获思路无非这几种：try/catch，window.onerror，window.addEventListener('error')，不过这几种方法无法都无法捕获 Promise.prototype.catch 中的错误，需要使用一种额外的事件：window.addEventListener('unhandledrejection')[^catch]。不过，我们可以使用一种带“上报错误”能力的函数来装饰 catch，以增强其功能。见下代码：

[^catch]: [前端代码错误上报](https://juejin.im/post/5c98cd63f265da611b1edcf2)

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

装饰器和包装器往往混在一起谈论，因为它们常混在一起使用。如果装饰器是用芯片增强你的大脑，那么包装器就好比钢铁侠那身外套——就像我们刚刚对 Promise.prototype.catch 进行了升级，升级方式是用一个新的函数把原函数“包裹起来”。

那么装饰器模式和包装器模式有什么需要注意的特性呢？啊哈~ 我相信你已经知道答案了——钢铁侠不能套很多件铁甲，因为那样会变胖！

若不是[装饰器提案](https://github.com/tc39/proposal-decorators)的出现，我赌五毛，社区里不会有太多讨论装饰器模式的文章。不过若留意上一段代码，大家肯定会感觉我们常常谈论的“高阶函数”，常常就是某种装饰器模式的实现。对，就是这样的！函数在 JS 中是一等公民，可以通过相关语言特征极其方便地实现某些设计模式。比如，通过“局部应用”可以轻松写一个工厂模式：

```js
const Partial = (fn, ...args) => (...rest) => fn(...args, ...rest)

const Adder = (a, b) => a + b

const add5 = Partial(Adder, 5)
add5(5)  // >>> 10
add5(-5) // >>> 0Adder
```

我知道你一定想说，工厂模式根本就不是这样写的... 这个问题会在下一小节讨论到。我们暂且先接着往下看下一种，适配器模式。

### 适配器模式

适配器，顾名思义，它能使两个接口不兼容的软件能互相兼容并正常运作。USB 转接头、Type-C 转耳机接口之类的东西就是那种玩意儿。

![Type-C 转 3.5mm | 小米官网](https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200704/20200708102158.png)

假设你在一家版本管理混乱的公司上班，后端接口版本随时可能更新迭代，但是不一定上线。如果我们在中国区上线了 V1 版本，在美国区上线了 V2 版本，那么同一套前端代码就会收到两份字段不一样的数据。我们可以通过适配器模式来对数据进行兼容，简单演示如下：

```js
// 获取一份随机版本的数据
const getRandomData = () => {
    const v1Data = { 
        version: 1, 
        name: 'name',
        nickname: 'nickname'
    }
    const v2Data = { 
        version: 2, 
        title: 'name',
        nickName: 'nickname'
    }
    const v3Data = { 
        version: 3, 
        header: 'name',
        __NickName: 'nickname'
    }
    return [v1Data, v2Data, v3Data][Math.floor(Math.random() * 3)]
}

/* 业务代码中 */
ajax('xxxurl', {
    onSuccess (data = getRandomData()) {
        const washedData = {
            ...data,
            name: data.name || data.title || data.header,
            nickname: data.nickname || data.nickName || data.__NickName
        }

        // >>> { version: '1|2|3', name: 'name', nickname: 'nickname', /* ... */ }
    }
})
```

哎等等，不好意思，放错代码了...

```js
/* 业务代码中 */
ajax('xxxurl', {
    onSuccess(data = getRandomData()) {
        let nameAdaptor = 
            genAttrAdaptor('name', 'name', 'title', 'header')
        let nicknameAdaptor = 
            genAttrAdaptor('nickname', 'nickname', 'nickName', '__NickName')
        
        // 给 data 应用两种属性适配器
        let washedData = wash(data, [nameAdaptor, nicknameAdaptor])

        // >>> { version: '1|2|3', name: 'name', nickname: 'nickname' }
    }
})

/* 工具函数中 */

// 属性适配器工厂
function genAttrAdaptor (targetKey, ...keys) {
    return obj => {
        const res = keys.map(key => obj[key]).find(x => x)
        keys.map(key => delete obj[key])

        return { ...obj, [targetKey]: res }
    }
}
// 清洗函数
function wash (obj, handlers) {
    return handlers.reduce((data, handler) => handler(data), data)
}
```

这个适配器看起来阔以，Nice~ 结束。

我们在这段代码中，又看到这种类似上一小节提到的“工厂模式”的写法：genAttrAdaptor = function ... ，我猜你会觉得这个例子中的“工厂 genAttrAdaptor”要比上一小节的“Adder”更好理解一些——它是“函数工厂”，是“生成器”，“产出”了一些东西。

<details>
    <summary>我用到了类吗？</summary>
    <p>没有。</p>
</details>

<details>
    <summary>用到了原型吗？</summary>
    <p>没有。</p>
</details>

<details>
    <summary>那我在写什么？</summary>
    <p>函数。</p>
</details>

函数，函数而已！使用函数是因为在 JS 中，**“函数是一等公民”**，请记住这句话。因为诸如“闭包”、“回调”等概念都和函数有关[^Function]，若谈论设计模式脱离不开语言特征的话，那扯上函数也没问题。当清楚“设计模式是一种思想”后，设计模式自然而然就内化了。

[^Function]: 我原本想把这个举例举得老长了... 但仔细考虑后发现，并不能。

碎碎念：最近政治正确的浪潮拍过来啦，说不定以后就听不到“一等公民”这种叫法啦。

### 代理模式

最后再叨叨最后一种设计模式，代理模式。

你肯定知道“代理”这个概念（我没说“GFW”没说没说），它是代理模式的一种，叫做“动态代理”——我们请求访问谷歌主页时，代理将把我们的请求自动转接到某台可靠的主机上。如果访问某个对象的代理，代理把访问拒绝了，那么该代理称为“保护代理”（就像你的同桌拒绝了你向她提出帮忙向老师请假的要求）。另一种常用的代理是“虚拟代理”，它会对高性能消耗的操作进行延迟处理。比方说，给图片设置 SRC 时，常常先使用 Loading 占位，同时异步请求图片，请求完成后再将 SRC 回填至标签，这样就不会有加载图片时导致的页面闪烁现象。同时，还有无数种代理的概念，它们都为对象提供一层概念上的“包装”，控制外部对源对象的访问。

ES6 原生支持代理模式。对，就是 Vue3 里的那个“Proxy”，直译为“代理器”。社区有很多讲 Vue3 原理分析的文章，肯定绕不开 Proxy，这里不再赘述了。以下展示两个使用 Proxy 拦截对象操作的小例子。

其一，禁止访问对象的下划线开头的属性：

```js
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

function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`)
  }
}

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

// 源码来自 https://medium.com/dailyjs/how-to-use-javascript-proxies-for-fun-and-profit-365579d4a9f8
```

若脱离 ES 6，代理模式会变成什么？也许是 Github 上一个额外的库，亦或是社区里新增的几篇“JS 中的代理模式”之类的博客... 无所谓了，反正通过刚刚提及的这几种设计模式，我觉得已经很好的说明了“设计模式与语言特征”之间的关系，它们是概念重叠的。

## JS 魔法锅

我很庆幸当我确定要做一名前端工程师时，我直接学习了 ES 6 ——现在回想起来可真是后怕——尽管充满设计缺陷和前向兼容，但它的可用性相当强，是一门很可靠的语言[^JS]。

[^JS]: 咳咳... 也许只有研究编程语言的人才有资格说这些话...

技术类自媒体火起来那一年（也许是前年），到处都能听到前端将失业的言论。不过，现实反而表明，学习 JS 的人日益增多，前端社区[逐年活跃](https://githut.info/)。最值得提及的一点是，HTML / CSS / JS 三剑客的语言规范在逐年推进——小步快跑要比“沉默十年再扔炸弹”强多了~

ESNeeext 已经往魔法锅中加了许多新材料，但我期待它直接把锅塞满，这种期待正好与对仅使用 GOTO 语句编程的讨厌是一致的。新的语言特征能带来了更多的可能性，目前而言，大概率能增强语言的表达力、降低开发人员的思维负担。

Paul Graham 在他的《黑客与画家》中对“强大语言”的赤裸裸的崇拜太令人映像深刻了：

> 如果你想解决一个困难的问题，会有好几个因素同时发挥作用：<br />
> （a）使用一种强大的语言；<br />
> （b）为这个难题写一个真实世界中的解释器；<br />
> （c）或者... 你把自己变成这个难题的人肉编译器。

Paul Graham 觉得设计模式就是一种对语言能力不足的妥协。他甚至认为，“语言的编程能力越强大，写出来的程序就越短”。这当然是不可全取的观点。尽管关于语言的表达能力强弱的争论永远不会停止，但脱离场景谈语言一定是错误的，就像你不会指望用汇编来编写 Web 程序。软件工程没有银弹。

新的语言特征、新的模式也并不总是银弹。我们听过太多这方面的抱怨了：抱怨 Class 关键字是如何地反模式；抱怨 Vuex 等重概念框架如何给开发带来沉重的编码体验... （最可怕的是，为什么语言更强了，但我们的工作时间并未缩短。hhh~ 谁再关下空调？

不过，我倒是挺相信开篇提及的“信仰”问题来着的，我期待能在 JS 身上有越来越多的语言特征的增补，直到... 也许有一天“学习基础库”的复杂度要强大到迫使新手们直接放弃这门语言。等到那时，既然有新语言可以玩儿，又为何紧抓 JS 不放呢？

## 补充及脚注

希望本文能对你有所帮助，如果文中出现了不流畅或理解错误的地方也麻烦各位批评及指出。

<JJ><p>若有任何疑问，或想探讨相关问题，欢迎邮件给我：dGFuZ25hZEBxcS5jb20=</p></JJ>

想看看这篇文章是如何被创造的？你能从我的[博客项目](https://github.com/Lionad-Morotar/blogs)中找到答案~ 欢迎 Star & Follow~ 也请大家多来我的[线上博客逛逛](http://www.lionad.art)，排版绝佳 Nice 哦~

@ 本文可随意转载，但要求正文内容无修改，同时需标明来源[“仿生狮子的博客”](http://www.lionad.art/)。

### 阅读更多

* [15年后 GoF 设计模式作者再谈模式](https://www.jdon.com/37356)
* [V8 之旅：垃圾回收器](http://newhtml.net/v8-garbage-collection/)
* [使用 ES decorators 构建一致性 API](https://developer.aliyun.com/article/272196)
* [塔列辛](https://www.wikiwand.com/zh-hans/%E5%A1%94%E5%88%A9%E5%9F%83%E8%BE%9B)