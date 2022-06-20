# JavaScript Mind Map

[TOC]

## 语言规范

<details>
    <summary>语言类型和规范类型的关系是怎么样的？</summary>
    <p>
        按照规范，JS 中应有 Null、Undefined、Object、String、Symbol、Number、BigInt、Boolean 总计共8种<a href="https://262.ecma-international.org/12.0/#sec-ecmascript-language-types" target="_blank" rel="nofollow">语言类型</a>。
        规范类型是为了更好的表述语言类型而存在的，仅存在于规范中，不能在 JS 中与规范类型直接交互。
        在 JS 中能操作的类型被称为基础类型，可以按照原始值和引用类型进行划分，可以通多 typeof 运算符确定变量的具体类型（null 和 function 除外）。
    </p>
</details>

<details>
    <summary>JavaScript 模块化发展历程有了解过吗？</summary>
    <p>
        模块化主要解决了命名空间冲突和代码抽象的问题，提高了项目的可维护性、可拓展性和可协作性。
        常用的模块化规范就三大类，CommonJS、AMD（CMD/UMD）、ES6 Module。<br />
        CommonJS 最早叫 ServerJS，在 NodeJS 环境下取得了不错的效果。进一步推广是分裂出 CommonJS 和 AMD 规范。
        玉伯认为 AMD 规范不够完善，实现了 SeaJS 模块加载器并产出 CMD 规范。
        UMD 规范则是 CommonJS 和 AMD 规范的统一，以实现代码可在浏览器和 NodeJS 中运行。
        我最常用的是 ES6 Module，因为它是“语言标准层面上的模块化”。
    </p>
    <p>更详细的内容可以看这篇：<a href="/articles/fold/2020-5/js-module-history.html">JS 模块化简史</a>。</p>
</details>

<details>
    <summary>Require 和 Import 的不同之处？</summary>
    <p>
        Require 和 Import 分别是 CommonJS 和 ES6 Module 规范下的导入模块方式。
        主要区别有：
        <ul>
            <li>Require 是同步导入，Import 是异步导入</li>
            <li>Require 是动态导入，Import 的动态导入暂且还是提案状态</li>
            <li>Require 是值拷贝，Import 指向内存地址</li>
        </ul>
    </p>
</details>

<details>
    <summary>说一说什么是原型/原型链？</summary>
    <p>
        原型（prototype）是一个用来实现对象的属性继承的普通对象。每一个对象都会有一个内部属性 __proto__ 指向它的原型，在寻找对象的某个属性时，如果对象内部找不到，则会去它的原型上找。
        内部属性 __proto__ 将 JS 中的对象依次连接起来，这种链式的关系就称作原型链。
    </p>
</details>

<details>
    <summary>原型，构造函数之间有什么联系？</summary>
    <p>
        通过构造函数使用 new 运算符可以新建一个实例。实例的 __proto__ 指向构造函数的原型，实例的构造器属性和构造函数原型的构造器属性都指向构造函数。
        <img class="db mauto mt1em b1" src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200703192140.png" />
    </p>
</details>

<details>
    <summary>说一说你对执行上下文的理解？</summary>
    <p>
        执行上下文是执行环境用来追踪代码运行情况的一种机制，不能通过代码直接观测到这种机制，JS 代码总是在某个执行上下文中运行。<br />
        JS 总共包含三种执行上下文：全局执行上下文、函数执行上下文、Eval 执行上下文。
        执行环境维护了一个执行栈（Execution Context Stack，同其他语言的 Calling Stack）用来储存代码运行时的执行上下文。
        它是一种 FILO 数据结构，每当有新创建一种执行上下文，便推入栈，作为运行时执行上下文（Running Execution Context）。
    </p>
</details>

<details>
    <summary>关于 this 绑定的机制能简要概括一下吗？</summary>
    <p>
        this 绑定的概念源于执行上下文的创建。
        在全局执行上下文中，this 的值指向全局对象；
        在函数执行上下文，this 取决于函数如何被调用。如果被引用对象调用，那么指向引用对象，要么指向全局对象或为 undefined（严格模式）；
        Eval 执行上下文中，取决于 Eval 如何被调用。如果被直接调用，那么指向当前词法环境的 this，如果被间接调用，那么指向全局对象。
        <img class="db mauto mt1em b1" src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200704000843.png" />
    </p>
</details>

<details>
    <summary>暂时性死区是怎么形成的？</summary>
    <p>
        暂时性死区和词法环境机制有关。
        在执行上下文被创建时，除了绑定 this，还会初始化词法环境和变量环境组件。
        词法环境组件拥有对外部环境的引用，和一个用来记录变量和函数声明位置的环境记录器。
        当解析到 let、const 之类的声明时，引擎会将变量添加到环境记录器里但不进行值得关联，所以若在执行到声明语句前读取此变量，则报错。
    </p>
</details>

<details>
    <summary>能不能简单概括一下闭包机制？</summary>
    <p>
        闭包是一种特殊的作用域。
        一般来说，当代码中的某个函数执行完毕后，会销毁掉他的执行上下文及其中的词法环境、变量环境，但在一些特殊情况下则不会。
        如以函数作为返回值时，此函数能获得当前运行环境的变量引用，使得外部代码能通过此函数操作这个运行环境的变量。这就是闭包。
        <img class="db mauto mt1em b1" src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200704/20200704033553.png" />
    </p>
</details>

<details>
    <summary>刚才没有提到使用 new 运算符时 this 的指向，能不能详细说一说？</summary>
    <p>
        使用 new 运算符的过程中，构造器的 this 会指向实例。
        new 运算符有几个步骤：
        <ol>
            <li>创建一个新对象；</li>
            <li>将构造器的 this 绑定到这个新对象并执行构造器函数；</li>
            <li>将新对象的内部属性 __proto__ 指向构造器的原型；</li>
            <li>返回这个新对象。</li>
        </ol>
    </p>
</details>

<details>
    <summary>我们提到了原型和构造器，能不能详细聊聊通过原型链和构造器实现的继承及其缺陷所在，以及应该怎么改进？</summary>
    <p>
        使用原型链，创建子类型时，不能给超类型传递参数进行个性化定制，在某些场景会有些局限，比方说“所有人都拥有朋友这个属性”这个场景，修改某人的朋友属性，其他人的朋友属性也会跟着变。<br />
        使用构造器能实现经典继承，这建立在 Constructor Stealing 技术的基础上，即通过在子类型中调用超类函数创建实例，同时还能传递参数。
        <Highlight>
            function Parent(){ // some codes }
            function Child(){ Parent.call(this) }
        </Highlight>
        不过，如果构造器中要创建函数，那么每创建一个实例都要创建一个新的函数，这样不好。
        <Highlight>
            function Child(){
                this.method = function newMethod() {}
            }
        </Highlight>
        虽然说可以把函数挪到外部，但是尽管可以通过特殊处理防止非实例调用此函数，这种方法从代码结构来看，就没有封装性可言了，仍然不好用。
        所以一般会在经典继承的基础上进行改进，把函数放到构造器的原型上，这种做法称作“组合继承”。
        <Highlight>
            function Parent(){ // some codes }
            Child.prototype.hello = function hello() {}
            function Child(){ Parent.call(this) }
            Child.prototype = new Parent()
            Child.prototype.world = function world() {}
        </Highlight>
        还有一种相当有名的继承模式叫做“圣杯模式”，即寄生组合继承。
        <Highlight>
            const inherit = function(c,p){
                const F = function(){}
                F.prototype = p.prototype
                c.prototype = new F()
                c.prototype.constructor = c
            }
        </Highlight>
    </p>
</details>

<details>
    <summary>你一般怎么做变量类型判断的？</summary>
    <p>
        三种最常用的方法是：typeof、instanceof、Object.prototype.toString()，不过三种方法的使用场景不同。<br />
        我一般不用 typeof，因为 typeof 容易陷入 'typeof null === "object"' 的陷阱。
        相比 typeof，我觉得 instanceof 要实用一些，它是判断某个构造器的原型是否存在于某对象的原型链上。不过当跨 iframe 运算时，也有陷阱。
        Object.prototype.toString.call 是最稳妥的办法，不过如果没有封装好的函数我不会使用它，对，就是因为太长了，懒得打字...
        <Highlight>
            const type = (function () {
                const buildInTag = 'Array Date RegExp Error Object'
                    .split(' ')
                    .reduce((h, c) => (h['[object ' + c + ']'] = c.toLowerCase(), h), {})
                return item => {
                    if (item == null) return 'null'
                    return typeof item === 'object'
                        ? buildInTag[Object.prototype.toString.call(item)] || 'object'
                        : typeof item
                }
            })()
        </Highlight>
        更详细的内容可以看这篇：<a href="/articles/fold/2020-5/type-check.html">常用类型判断方法的优势及缺陷</a>。
    </p>
</details>

## 代码实践

<details>
    <summary>在 JS 种，'1'+1 以及 1+'1' 的结果分别是什么？</summary>
    <p>
        加法运算符任意操作数为 String 类型，那么会将另一侧用 ToString 转换后，再相加。所以答案是，都为 '11'。
        这主要涉及到 JS 中的隐式类型转换问题。JS 是弱类型语言，一般而言，不同类型数据之间可以互相转换。
        进一步了解可以看看这篇：<a href="./gists/interview-prepare/corceion.html">隐式转换</a>
    </p>
</details>

<details>
    <summary>在 `const obj = { /* ____ */ b: '2', a: '3' }` 空缺部分填什么才能使 obj 在控制台的输出为 `{ a: '3', b: '2' }`？</summary>
    <p>
        填写带任意值的 a 属性都可以，如 `a: 1,`，因为如果后定义的属性与先定义的属性冲突，则会替换掉先定义属性的值，但是值顺序不变。
    </p>
</details>

<details>
    <summary>能不能说说为什么 0.1 + 0.2 !== 0.3 ？</summary>
    <p>
        JS 使用 IEEE-754 标准的双精度浮点数表示数字，0.1 和 0.2 转换为双精度浮点数之后，小数部分不能被精确表示，导致精度丢失。
        进一步了解可以看看这篇：<a href="./gists/interview-prepare/number-in-js.html">JS中的数值</a>
    </p>
</details>

<details>
    <summary>Object.seal 和 Object.freeze 有什么不同？</summary>
    <p>
        Seal 阻止对一个对象添加或删除属性；Freeze 在 Seal 的基础上，还使属性的值不可修改。
    </p>
</details>

<details>
    <summary>试试手写一个 new 函数吧？</summary>
    <Highlight>
        function _new(constructor, ...params) {
            const context = Object.create(constructor.prototype)
            const result = constructor.call(context, params)
            return (result && typeof result === 'object')
                ? result
                : context
        }
    </Highlight>
</details>

<details>
    <summary>如何解决 JSON.stringify 的循环引用问题？</summary>
    <Highlight>
        // create a circular object
        var circ = {}
        circ.circ = circ
        // use cache to store values in the circular object
        var cache = []
        function check(key, value) {
            if (typeof value === 'object' && value !== null) {
                // Duplicate reference found, discard key
                if (cache.includes(value)) return;
                // Store value in our collection
                cache.push(value);
            }
            return value
        }
        JSON.stringify(circ, check)
        // enable gc
        cache = null
    </Highlight>
</details>

<details>
    <summary>手写一些常见的数组操作，比如乱序、降维？</summary>
    <ul>
        <li>数组乱序</li>
        <Highlight>
            [1, 2, 3, 4, 5].sort((a, b) => Math.random() - .5)
        </Highlight>
        <li>数组降维：[1,[2,[3,[4]]]] --> [1,2,3,4]</li>
        <Highlight>
            function flat(arr = []) {
                return arr.reduce((h, c) => {
                    return h.concat(
                        c instanceof Array ? flat(c) : c
                    )
                }, [])
            }
            // >>> flat([1,[2,[3,[4]]]]) 
            // >>> [1,2,3,4]
        </Highlight>
    </ul>
</details>

<details>
    <summary>从 JS 的角度考虑，你能想到哪些提高代码性能的办法？</summary>
    <p>
        <ul>
            <li>设计数据尽量扁平，减少人和机器解析数据的时间。</li>
            <li>代码性能问题会在循环中加倍放大，设计循环的地方需要好好设计，看看能不能找高性能通用算法解决问题。</li>
            <li>熟记常见的设计模式，可以在编写复杂代码时极大减少与其他人的沟通成本，降低出错率。（嘛... 这也算一种吧。）</li>
            <li>缓存！一般情况下，对前端而言，内存要比 CPU 廉价许多许多许多倍。所以可以选择常用的空间换时间的操作。</li>
            <li>使用多线程技术，如在 WebWorker 上运行一些计算量大的代码。WebWorker 线程的阻塞不会影响浏览器的渲染。</li>
            <li>任务切片，即将大的任务切成小块。在小块任务之间给其它代码和浏览器渲染预留一些时间。</li>
            <li>使用任务队列，将任务分为轻重缓急执行。比如 requestIdelCallBack 方法，当引擎空闲时执行低优先级回调，但若超过指定时间仍未调用回调，回调则会被强制执行。</li>
            <li>由任务队列还可以引申出 Vue.nextTick 和 React Fiber。</li>
            <li>预执行。比如数据预取、对象预实例化等。</li>
            <li>WebAssembly... 没有实践过...</li>
        </ul>
    </p>
</details>

## 手写代码

<details>
    <summary>先来点简单的内容吧，试着实现一个 instanceof ？</summary>
    <p>instanceof 运算符本质上是检测右值的原型对象在不在左值对象的原型链上。代码见：<a href="https://github.com/Lionad-Morotar/read-source-code/blob/master/polyfill/instanceof.js" target="_blank" rel="nofollow">InstanceOf Polyfill</a></p>
</details>

<details>
    <summary>必考题，节流及防抖的区别及应用？</summary>
    <p>节流指一定时间内只触发一次函数执行，可以用于削减一些高频函数调用的消耗，如浏览器滚动，窗口缩放和鼠标移动等 API 就会调用非常多次回调函数，这时候可以用节流函数限制一下。</p>
    <Highlight>
        // 获取当前浏览器的刷新频率
        const frameDelta = getFrameTime()
        // frameDelta * 2 是指以刷新频率一半的速率执行回调
        function throttle(fn, time = frameDelta * 2) {
            let running = false
            return function (...args) {
                !running && setTimeout(() => {
                    running = true
                    fn.bind(this)(...args)
                    running = false
                }, time)
            }
        }
    </Highlight>
    <p>防抖是指将触发回调前将等待一定时间，并且这段时间会被再次触发回调所推迟。比方说搜索框中的键盘键入后自动弹出的搜索建议，通常会用防抖做。</p>
    <Highlight>
        function debounce(fn, time = 100) {
            let tick = null
            return function (...args) {
                tick && window.clearTimeout(tick)
                tick = setTimeout(() => {
                    fn.bind(this)(...args)
                    tick = null
                })
            }
        }
    </Highlight>
</details>

<details>
    <summary>还是必考题... 手写 bind、apply、call？</summary>
    <p>见代码：<a href="https://github.com/Lionad-Morotar/read-source-code/blob/master/polyfill/bind.js" target="_blank" rel="nofollow">手写 bind</a>、<a href="https://github.com/Lionad-Morotar/read-source-code/blob/master/polyfill/call.js" target="_blank" rel="nofollow">手写 call</a>、<a href="https://github.com/Lionad-Morotar/read-source-code/blob/master/polyfill/apply.js" target="_blank" rel="nofollow">手写 apply</a></p>
</details>

<details>
    <summary>试着手动 polyfill Promise 函数？</summary>
    <p>Promise 本质上是一个状态只能向 fulfilled 或 rejected 变动的状态机。见代码：<a href="https://github.com/Lionad-Morotar/read-source-code/blob/master/polyfill/promise.js" target="_blank" rel="nofollow">手写 Promise</a></p>
</details>

<details>
    <summary>该如何设计一个可以取消请求的请求函数？</summary>
    <p>
        浏览器发送请求时经过一定时间后，将自动断开连接。如果想主动取消请求的话，可以调用 XMLHttpRequest.abort() 方法。<br />
        在项目中，一般我们会使用 Promise 封装请求函数。Promise 是一个内部状态只能向 fulfilled、rejected 流动的状态机，没有办法取消。如果想要主动取消，可以在 Promise.resolve 前通过闭包依赖一个外部的变量。我们修改这个外部变量，就能达到一种“控制请求”的结果。
        <Highlight>
            function Post(url) {
                const self = this
                this.handleResult = true
                let resolveTick
                const tick = new Promise(resolve => { resolveTick = resolve })
                // 这个函数依赖的是 this.handleResult
                this.request = fetch(url).then(response => {
                    return this.handleResult && resolveTick(response)
                })
                return new Proxy(this, {
                    get (target, prop) {
                        console.log('prop: ', prop)
                        return prop === 'abort'
                            ? () => self.handleResult = false
                            : Reflect.get(tick, prop).bind(tick)
                    }
                })
            }
            // 调用 post.abort() 后，以下 console.log 不会输出请求结果
            var post = new Post('url')
            post.then(res => console.log(res))
            post.abort()
        </Highlight>
    </p>
</details>

<details>
    <summary>试着手动 polyfill Generator 函数？</summary>
    <p>Generator 使用了新的关键字和新的语法，所以运行代码前必须将 Generator 代码转译。不过... 倒也有办法实现假的 polyfill，见代码：<a href="https://github.com/Lionad-Morotar/read-source-code/blob/master/polyfill/generator.js" target="_blank" rel="nofollow">手写 Generator</a></p>
</details>

<details>
    <summary>试着手写一下 Webpack 的原理？</summary>
    <p>Webpack 使用 acorn 将 JS 代码转换为 AST，从 AST 中读取到该文件的依赖关系并将所有文件的依赖关系组成一个图结构，输入到 Webpack Require Wrapper 函数中。见代码：<a href="https://github.com/Lionad-Morotar/read-source-code/tree/master/webpack" target="_blank" rel="nofollow">Webpack 打包原理</a></p>
</details>
