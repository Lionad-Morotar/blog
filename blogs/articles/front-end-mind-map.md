# 🎉 Front End Mind Map

[TOC]

## JavaScript

### 代码实践

<details open>
    <summary>在 JS 种，'1'+1 以及 1+'1' 的结果分别是什么？</summary>
    <p>
        加法运算符任意操作数为 String 类型，那么会将另一侧用 ToString 转换后，再相加。所以答案是，都为 '11'。
        这主要涉及到 JS 中的隐式类型转换问题。JS 是弱类型语言，一般而言，不同类型数据之间可以互相转换。
        进一步了解可以看看这篇：<a href="./gists/interview-prepare/corceion.html">隐式转换</a>
    </p>
</details>

<details open>
    <summary>在 `const obj = { /* ____ */ b: '2', a: '3' }` 空缺部分填什么才能使 obj 在控制台的输出为 `{ a: '3', b: '2' }`？</summary>
    <p>
        填写带任意值的 a 属性都可以，如 `a: 1,`，因为如果后定义的属性与先定义的属性冲突，则会替换掉先定义属性的值，但是值顺序不变。
    </p>
</details>

<details open>
    <summary>能不能说说为什么 0.1 + 0.2 !== 0.3 ？</summary>
    <p>
        JS 使用 IEEE-754 标准的双精度浮点数表示数字，0.1 和 0.2 转换为双精度浮点数之后，小数部分不能被精确表示，导致精度丢失。
        进一步了解可以看看这篇：<a href="./gists/interview-prepare/number-in-js.html">JS中的数值</a>
    </p>
</details>

<details open>
    <summary>Object.seal 和 Object.freeze 有什么不同？</summary>
    <p>
        Seal 阻止对一个对象添加或删除属性；Freeze 在 Seal 的基础上，还使属性的值不可修改。
    </p>
</details>

<details open>
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

<details open>
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

<details open>
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

<details open>
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

### 代码原理

<details open>
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

<details open>
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

<details open>
    <summary>说一说什么是原型/原型链？</summary>
    <p>
        原型（prototype）是一个用来实现对象的属性继承的普通对象。每一个对象都会有一个内部属性 __proto__ 指向它的原型，在寻找对象的某个属性时，如果对象内部找不到，则会去它的原型上找。
        内部属性 __proto__ 将 JS 中的对象依次连接起来，这种链式的关系就称作原型链。
    </p>
</details>

<details open>
    <summary>原型，构造函数之间有什么联系？</summary>
    <p>
        通过构造函数使用 new 运算符可以新建一个实例。实例的 __proto__ 指向构造函数的原型，实例的构造器属性和构造函数原型的构造器属性都指向构造函数。
        <img class="db mauto mt1em b1" src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200703192140.png" />
    </p>
</details>

<details open>
    <summary>说一说你对执行上下文的理解？</summary>
    <p>
        执行上下文是执行环境用来追踪代码运行情况的一种机制，不能通过代码直接观测到这种机制，JS 代码总是在某个执行上下文中运行。<br />
        JS 总共包含三种执行上下文：全局执行上下文、函数执行上下文、Eval 执行上下文。
        执行环境维护了一个执行栈（Execution Context Stack，同其他语言的 Calling Stack）用来储存代码运行时的执行上下文。
        它是一种 FILO 数据结构，每当有新创建一种执行上下文，便推入栈，作为运行时执行上下文（Running Execution Context）。
    </p>
</details>

<details open>
    <summary>关于 this 绑定的机制能简要概括一下吗？</summary>
    <p>
        this 绑定的概念源于执行上下文的创建。
        在全局执行上下文中，this 的值指向全局对象；
        在函数执行上下文，this 取决于函数如何被调用。如果被引用对象调用，那么指向引用对象，要么指向全局对象或为 undefined（严格模式）；
        Eval 执行上下文中，取决于 Eval 如何被调用。如果被直接调用，那么指向当前词法环境的 this，如果被间接调用，那么指向全局对象。
        <img class="db mauto mt1em b1" src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200704000843.png" />
    </p>
</details>

<details open>
    <summary>暂时性死区是怎么形成的？</summary>
    <p>
        暂时性死区和词法环境机制有关。
        在执行上下文被创建时，除了绑定 this，还会初始化词法环境和变量环境组件。
        词法环境组件拥有对外部环境的引用，和一个用来记录变量和函数声明位置的环境记录器。
        当解析到 let、const 之类的声明时，引擎会将变量添加到环境记录器里但不进行值得关联，所以若在执行到声明语句前读取此变量，则报错。
    </p>
</details>

<details open>
    <summary>能不能简单概括一下闭包机制？</summary>
    <p>
        闭包是一种特殊的作用域。
        一般来说，当代码中的某个函数执行完毕后，会销毁掉他的执行上下文及其中的词法环境、变量环境，但在一些特殊情况下则不会。
        如以函数作为返回值时，此函数能获得当前运行环境的变量引用，使得外部代码能通过此函数操作这个运行环境的变量。这就是闭包。
        <img class="db mauto mt1em b1" src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200704/20200704033553.png" />
    </p>
</details>

<details open>
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

<details open>
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

<details open>
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

### 手写代码

<details open>
    <summary>先来点简单的内容吧，试着实现一个 instanceof ？</summary>
    <p>instanceof 操作符本质上是检测右值的原型对象在不在左值对象的原型链上。代码见：<a href="https://github.com/Lionad-Morotar/read-source-code/blob/master/polyfill/instanceof.js" target="_blank" rel="nofollow">InstanceOf Polyfill</a></p>
</details>

<details open>
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

<details open>
    <summary>还是必考题... 手写 bind、apply、call？</summary>
    <p>见代码：<a href="https://github.com/Lionad-Morotar/read-source-code/blob/master/polyfill/bind.js" target="_blank" rel="nofollow">手写 bind</a>、<a href="https://github.com/Lionad-Morotar/read-source-code/blob/master/polyfill/call.js" target="_blank" rel="nofollow">手写 call</a>、<a href="https://github.com/Lionad-Morotar/read-source-code/blob/master/polyfill/apply.js" target="_blank" rel="nofollow">手写 apply</a></p>
</details>

<details open>
    <summary>试着手动 polyfill Promise 函数？</summary>
    <p>Promise 本质上是一个状态只能向 fulfilled 或 rejected 变动的状态机。见代码：<a href="https://github.com/Lionad-Morotar/read-source-code/blob/master/polyfill/promise.js" target="_blank" rel="nofollow">手写 Promise</a></p>
</details>

<details open>
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

<details open>
    <summary>试着手动 polyfill Generator 函数？</summary>
    <p>Generator 使用了新的关键字和新的语法，所以运行代码前必须将 Generator 代码转译。不过... 倒也有办法实现假的 polyfill，见代码：<a href="https://github.com/Lionad-Morotar/read-source-code/blob/master/polyfill/generator.js" target="_blank" rel="nofollow">手写 Generator</a></p>
</details>

<details open>
    <summary>试着手写一下 Webpack 的原理？</summary>
    <p>Webpack 使用 acorn 将 JS 代码转换为 AST，从 AST 中读取到该文件的依赖关系并将所有文件的依赖关系组成一个图结构，输入到 Webpack Require Wrapper 函数中。见代码：<a href="https://github.com/Lionad-Morotar/read-source-code/tree/master/webpack" target="_blank" rel="nofollow">Webpack 打包原理</a></p>
</details>

### 框架相关

- [VueJS 相关问题](/gists/interview-prepare/vuejs.html)

## 浏览器

<details open>
    <summary>从输入 URL 按下回车开始，到用户看到完整的页面，经历了哪些流程？</summary>
    <ol>
        <li>通过 Expired、Cache-Control 查看缓存是否已经过期，未过期则直接使用内存或硬盘中的资源，跳转到解码步骤；如已过期则携带 If-Modified-Since、If-Match 字段尝试向服务器请求新资源。</li>
        <li>获取 URL 中主机的 IP 位置。分别追溯浏览器缓存、操作系统缓存、HOSTS、路由器缓存、ISP DNS缓存、递归查询。</li>
        <ul>
            <li>
                <details>
                    <summary>什么是递归查询？</summary>
                    <p>当一个 DNS 服务器不知道被查询的地址对应的 IP 时，会以 DNS 客户的身份，代替客户端向其它服务器继续查询。</p>
                </details>
            </li>
            <li>
                <details>
                    <summary>一个超大型的网站通常拥有许多物理机来处理服务，那么请求它们顶级域名的 DNS 会被怎样处理？</summary>
                    <p>一般会使用 DNS 负载均衡技术，通过轮拨、任拨、连接数均衡、地理位置映射、主机哈希映射等方法，向客户端返回对应的 DNS 地址。所以 DNS 地址有可能发生变动。</p>
                </details>
            </li>
        </ul>
        <li>浏览器与目标地址对应端口建立 TCP 连接，成功后发送请求报文。</li>
        <ul>
            <li>
                <details>
                    <summary>说一说 TCP 三次握手？</summary>
                    <img class="mt1em" src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20200731162450.png" alt="TCP Three-way Handshake" />
                </details>
            </li>
        </ul>
        <li>服务器收到请求后，检查 If-Modified-Since、If-Match 字段。如果缓存新鲜，则返回 304 状态码。否则通过 TCP 返回相应资源的 HTTP 报文。</li>
        <li>浏览器接受到响应之后，可选则关闭 TCP 连接或将其保留重用。</li>
        <ul>
            <li>
                <details>
                    <summary>说一说 TCP 四次挥手？</summary>
                    <img class="mt1em" src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20200731165331.png" alt="TCP Four-way Wavehand" />
                </details>
            </li>
        </ul>
        <li>根据响应码，浏览器继续执行指定动作。如果响应码为 200，HTTP 头部携带 Etag、Cache-Control 等字段，则对资源进行缓存。</li>
        <li>浏览器解析 HTML 文档，并请求文档内的其它资源。</li>
        <ul>
            <li>浏览器会便解析边显示页面。这些步骤没有具体的先后顺序。</li>
            <li>构建 DOM Tree：将字符流解析为标记（Tokenizing），将标记转换为带有属性的对象（Lexing）。最后根据节点关系将对象组成 DOM Tree（DOM Construct）。</li>
            <li>构建 CSSOM Tree：过程和构建 DOM Tree 类似。</li>
            <li>构建 Render Tree：从根节点开始遍历每一个可见节点，从 CSSOM Tree 中找到相应规则并应用。</li>
            <li>解析 JS：同步脚本的下载和解析将阻塞 DOM Tree 和 CSSOM Tree 的构建。异步脚本带有 async 或 defer 标签。</li>
            <li>所有同步脚本执行完之后，触发 Document.DOMContentLoaded 事件。</li>
            <li>浏览器继续等图片下载以及异步脚本的下载和执行。这一切结束之后，触发 Window.onload 事件。</li>
        </ul>
    </ol>
</details>

<details open>
    <summary>简要说说浏览器的重绘与回流及如何避免？</summary>
    <p>
        浏览器解析 HTML 文档，生成 DOM Tree；解析 CSS 文档，生成 CSSOM Tree。将两者合二为一得到 Render Tree。根据 Render Tree 进行布局浏览器可以得到节点的几何信息（位置、大小），还可以在内存中绘制，得到节点以像素形式展示的具体样式。最后，将相关信息发送至 GPU 展示在页面上。<br />
        如果在这个过程之外，更改了节点的几何样式属性，如宽度、高度，就会导致页面需要重新布局，即回流。如果仅改变了背景颜色等属性，则只需要重绘获取单个节点的像素信息。<br />
        现代浏览器会用一个队列缓存频繁的重绘和回流相关操作。但是使用 getComputedStyle()、getBoundingRect() 等接口时，会立即清空队列。
    </p>
</details>

<details open>
    <summary>简要说说事件循环机制？</summary>
    <p>
        JS 是单线程语言，但是代码执行分为同步任务和异步任务。
        主线程将持续处理同步任务直到完成。异步任务会在完成时将回调推入任务队列。主线程空闲时，将向任务队列请求任务并执行。这个过程反复循环。
    </p>
</details>

<details open>
    <summary>异步任务还能再细分吗？</summary>
    <p>
        刚刚没有提到，异步任务还可以细分为宏任务（Macro Task）和微任务（Micro Task）。
        addEventListener、setTimeout、setInterval 的回调将会推入宏任务队列。
        QueueMicrotask、MutationObserver、Promise、process.nextTick 的回调将会推入微任务队列。
        每执行一个宏任务及主体代码执行完毕后，将会立即执行所有微任务。
        <img class="db mauto mt1em b1" src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200704024238.png" />
    </p>
</details>

<details open>
    <summary>先简单介绍一下浏览器的事件捕获机制？</summary>
    <p>
        浏览器的事件传播分为三个阶段：Capturing、Targeting、Bubbling，顺序上来说是先从根元素一直向目标元素传播，然后再由目标元素向根元素传播。
        事件捕获发生在 Bubble 阶段，但是可以在事件监听时使用 useCapture 参数指定某回调函数在 Capture 阶段触发。
        <img class="db mauto mt1em w68" src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/event-capture.svg" style="filter: grayscale(.7)" />
    </p>
</details>

<details open>
    <summary>跨标签页通讯有哪些方案？</summary>
    <ul>
        <li>Broadcast Channel：可以建立同源窗口下所有监听了该频道的对象，IE 和 Safari 没有实现。 </li>
        <li>iframe：使用 postMessage 进行通讯，兼容性很好。</li>
        <li>Web Worker：通过 Shared Worker 可以也可以实现。</li>
        <li>Local Storage：轻量的数据可以使用 window.onstorage 监听 LocalStorage 的设置，缺点是设置相同的字符串值时监听不到。</li>
        <li>Web Socket：让后台中转页面发送的请求。</li>
    </ul>
</details>

<details open>
    <summary>浏览器中有哪些常见的安全问题？</summary>
    <ul>
        <li>XSS：Cross-site Scripting Attack，即通过把未经转义的脚本字符植入页面，使得解析 HTML 时自动执行相应脚本。解决方法，简单来说，写个 ecape 工具函数就好了。</li>
        <li>CSRF：Cross-site Request Forgery，跨站请求伪造，即利用用户已登录的状态发送一些恶意请求。</li>
        <li>代码安全：代码压缩；关键代码进行加密于混淆；机密代码需要做成接口的形式让后端提供服务。</li>
        <li>爬虫安全：可以通过联合前后端一起做反爬虫操作。有很多高级操作，像高级验证码、蜜罐、机器人侦测、提供假数据甚至综合检测等...</li>
        <li>明文泄漏：密码之类的数据不能存在前端；部分敏感数据存放时需要进行脱敏操作；HTTPS 防止中间人攻击</li>
        <li>隐私泄漏：如用户空闲检测、地理位置、内存信息、电池信息等 API，可能被滥用。详情见：<a href="https://www.zdnet.com/article/apple-declined-to-implement-16-web-apis-in-safari-due-to-privacy-concerns/" target="_blank" rel="nofollow">Apple declined to implement 16 Web APIs in Safari due to privacy concerns</a>。</li>
        <li>服务器安全：NodeJS 有许多安全相关的 API，如 VM.runInNewContext；若和 HTTP 相关的话可以参考 Helmet ：<a href="/articles/source-code/module/helmet.html">Helmet</a>。</li>
    </ul>
</details>

<details open>
    <summary>了解浏览器的内容安全策略（CSP）吗？</summary>
    <p>见：<a href="/gists/network.html#CSP">计算机网络</a></p>
</details>

<details open>
    <summary>浏览器原理概述？</summary>
    <p>见博客：<a href="/gists/browser.html">浏览器原理概述</a></p>
</details>

## NodeJS

<details open>
    <summary>NodeJS 的事件循环机制和浏览器中有什么不同？</summary>
    <p>
        类似但稍有区别。具体不清楚。
    </p>
</details>

<details open>
    <summary>引擎的垃圾回收机制有了解吗？</summary>
    <p>
        V8 使用分代回收机制，将内存分为新生代和老生代空间，分别用不同的算法进行 GC。
        新生代空间通常较小，只有 1-8 MB。程序保持了一个指向内存区的指针，不断根据新对象的大小进行递增。当指针到达新生区末尾时，触发一次 ScavengeGC（小周期）。
        如果两个周期内都没被清除的变量则转移到老生代内存中。
        老生代空间则使用标记清除算法（和标记紧缩算法）进行清理。当然，实际上 GC 的过程相当复杂，这里只简要概括一个很浅显的流程。
        <ul>
            <li>
                新生代空间：被划分为两个等大的区域，出区和入区。操作在出区中进行，一旦出区耗尽则交换出区入区，并把入区的活跃对象复制回出区或者老生代内存中，并在此时对活跃对象进行紧缩。依次循环。
                <img class="db mauto mt1em b1" src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200704/20200704130952.png" />
            </li>
            <li>
                老生代空间：分标记和清除（或紧缩）两个阶段。标记算法在每次循环都会将一个对象从队列（初始为从根可达对象）中取出，将它及其邻接对象标记。
                清除阶段时，所有未被标记的对象都将被清除。如果选择紧缩，那么紧缩算法会尝试将零散的对象移成连续的整体，以解决内存的碎片化。<br />
                题外话，这里的图画错了，标记算法是深度搜索，图我画成了广搜...
                <img class="db mauto mt1em b1" src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200704/20200704134710.png" />
            </li>
        </ul>
        由于 JS 是单线程的，一旦执行垃圾回收算法，正在执行的脚本需要暂停下来，这叫作“全停顿”。为了优化这种间歇性停顿，JS 将老生代空间的标记过程拆分为了小个的子步骤，这样就可以将标记算法穿插在其它任务过程中执行了。
    </p>
</details>

## 网络

更详细的资料看：<a href="/gists/network.html">计算机网络</a>

<details open>
    <summary>HTTP 1.1 对 HTTP 1.0 做出了哪些改进？</summary>
    <ul>
        <li>长连接(默认 keep-alive)，复用</li>
        <li>断点续传</li>
        <li>Cache 缓存</li>
        <ul>
            <li>Cache-Control</li>
            <li>Expires</li>
            <li>Last-Modified</li>
            <li>Etag</li>
        </ul>
    </ul>
</details>

<details open>
    <summary>HTTP 2.0 做出了哪些改进呢？</summary>
    <ul>
        <li>多路复用</li>
        <li>二进制分帧层: 应用层和传输层之间</li>
        <li>首部压缩</li>
        <li>服务端推送</li>
    </ul>
</details>

<details open>
    <summary>Get 和 Post 请求有哪些区别？</summary>
    <p>
        Get 请求会被浏览器缓存，会被浏览器保存在历史记录中，此外，Get 请求的参数是拼接在 URL 中的明文，且长度也有限制，适合做一些资源翻页之类的场景；
        Post 请求不会被缓存，对数据类型没有限制，几乎所有场景都可以使用。<br />
    </p>
</details>

<details open>
    <summary>说说 HTTP 的缓存机制吧？</summary>
    <p>
        缓存主要分两种，强缓存和协商缓存。强缓存即浏览器直接使用本地资源。协商缓存指允许使用本地资源，但是需要发送一个请求向服务端进行验证。
        <ul>
            <li>Expired：强缓存。Expires 返回资源过期的绝对时间。不过因为这个绝对时间是以服务器为准的，所以可能和客户端不一致。</li>
            <li>Cache-Control：强缓存。内容是一段字符串，有不同的作用。
                <ul>
                    <li>public：指资源可以被沿途的代理服务器（如 CDN），和客户端缓存。</li>
                    <li>private：指资源可以被客户端缓存，但不能被代理服务器缓存。（这只是约定，所以代理服务器可能不一定理你。）</li>
                    <li>max-age：指缓存将在多少秒之后失效。</li>
                    <li>no-cache：禁止强缓存。(注意，仍走协商缓存，并不是不缓存。)</li>
                    <li>no-store：禁止缓存。</li>
                </ul>
            </li>
            <li>Last-Modified / IF-Modified-Since：服务端在返回资源时，携带上 Last-Modified 字段，表明资源的最后修改时间。浏览器请求资源时，带上 IF-Modified-Since，询问资源是否有修改，有则返回新资源，否则服务器返回 304 Not Modified。</li>
            <li>Etag / IF-Match：服务器返回资源时携带一个根据资源内容计算出的值的字段，表明内容的独一无二。浏览器请求资源是，IF-Match 携带上 Etag 字段，就方便服务器比对资源是否有修改了。</li>
        </ul>
        实际应用时，并不是每种资源都需要缓存。根据资源内容变动的情况，结合项目使用的打包工具，可以更灵活的配置项目资源缓存场景。
        比如说，Webpack 打包之后，JS 文件通常会更具内容生成一个 8 位哈希文件指纹作为文件名，只要文件内容不变动，文件指纹就不会变动，所以这类资源可以使用强缓存。
        而项目入口 HTML 文件，每次打包都会变动，所以应使用协商缓存。
    </p>
</details>

<details open>
    <summary>CDN 对前端来说有哪些好处？</summary>
    <p>
        CDN 是一种必要的冗余。普遍而说，CDN 能通过快速响应速度、突破浏览器的同域名请求并发数、节约 Cookie 带宽等手段加快页面加载速度。
    </p>
</details>

<details open>
    <summary>同源策略限制了哪些内容？</summary>
    <p>
        同源策略是一种浏览器遵守的规范，要求页面发送的请求的协议、HOST、端口号必须与脚本来源相同。这是一种最基础的安全策略。绕过同源策略的方法即跨域。
    </p>
</details>

<details open>
    <summary>你是怎么做跨域的？</summary>
    <p>
        有几种常见的解决办法，使用代理、CORS、iframe、WebSocket。
        <ul>
            <li>使用代理：可以通过架设一个用于中转请求的服务器实现跨域，因为服务器发送请求是不遵循同源策略的。Webpack 中的 ProxyTable 或者有些有网络隔离的项目通常会使用这种方案。</li>
            <li>CORS：全称叫跨域资源共享，是一种新的标准，需要浏览器和服务器端的支持。</li>
            <li>WebSocket：WebSocket 不适用于同源策略，和 CORS 一样，只要浏览器以及服务器端支持就可以。</li>
            <li>iframe：在页面请求一个跨域的文档，然后通过 postMessage 的方式从父页面将数据传到 iframe 中，让其中脚本代替发送请求。不过 postMessage 的兼容性不是很好，可以通过监听哈希等方法优雅降级。</li>
        </ul>
    </p>
</details>

<details open>
    <summary>这里打断一下，正向代理和反向代理的区别是？</summary>
    <p>
        正向代理为用户服务，内容服务器无法区分用户或是代理，常见于“能访问谷歌的那种代理”；反向代理为服务器服务，用户无法区分访问的是代理还是服务器，常用于过滤请求及负载均衡。
    </p>
</details>

<details open>
    <summary>再详细说说 CORS？</summary>
    <p>
        CORS 即跨域资源共享机制。通过给 HTTP Header 增加一些额外的字段，让源服务器（通常指浏览器）可以请求不同服务器上的资源。
        <ul>
            <li>浏览器会在请求头添加 Origin 字段，表明请求来源。</li>
            <li>服务器需设置 Access-Control-Allow-Methods、Access-Control-Allow-Headers、Access-Control-Allow-Origin，分别指定允许的跨域请求方法、Header 字段即请求来源。</li>
            <li>一般情况下，浏览器会先发送一个 Option 方法的请求用来预检，服务器则返回 Allow 字段表示允许的请求方法。</li>
        </ul>
    </p>
</details>

<details open>
    <summary>详细说说你怎么做的 WebSocket？</summary>
    <p>
        WebSocket 是一种基于 HTTP 的应用层协议。浏览器实现的兼容性不错，可看作长轮询的升级版本。主要有两个特征，是持久化连接以及服务端可以给客户端发送通知。
        基于这两个特征，在编写代码时可以使用心跳机制、重连机制和回调池两种模式对 WebSocket 进行优化。<br />
        使用心跳机制定时向服务端发送心跳数据，告诉服务端此页面还在响应，如果超时则服务端可以主动断开连接节约资源。
        重连机制是如果服务器端没有主动断开连接，客户端因异常状况断开连接时，需要主动重新与服务端建立连接，保证业务正常进行。
        回调池则是客户端发送数据时，将回调事件注册在一个容器里，超时则删除回调，防止内存泄漏。
    </p>
</details>

## HTML

<details open>
    <summary>HTML5 带来了哪些改进？</summary>
    <p>
        首先是增强了语义化：新增了一些语义化标签，Main、Nav、Sidebar、Header、Footer 之类的，还删除了一些纯表现元素，如 Font、Center 等。
        再是新增了一些 API：拖拽、音视频、Canvas、Local Storage、Session Storage、WebWorker、WebSocket。
    </p>
</details>

<details open>
    <summary>如何理解语义化标签？</summary>
    <p>
        单纯按照 HTML5 规范就应该这么做；
        从增强页面的可访问性开始可以考虑两方面：一是方便搜索引擎或屏幕阅读器等机器对页面的解析；二是方面使开发人员理解页面的内容结构。
    </p>
</details>

<details open>
    <summary>为什么要增强页面的可访问性？</summary>
    <p>
        增强页面的可访问目的是使网页能够被更多的人使用，包括残障人士、使用处理性能底下或带宽低的设备的人等。
    </p>
</details>

<details open>
    <summary>可访问性和 SEO 的区别是？</summary>
    <p>
        SEO 提高搜索引擎的体验，可访问性是提高人的体验。SEO 有几个比较重要的点，TDK、语义化 HTML、页面速度。
    </p>
</details>

<details open>
    <summary>Cookie、Local Storage、Session Storage 的不同之处？</summary>
    <p>
        Cookie 主要用来标志用户的身份，并且始终会在同源的请求中携带，容量只有 4kb。
        Session Storage 储存是页面级别的，不在多个页面上共享，当页面关闭时销毁（页面并非指浏览器窗口，而是指 Tab 页面）。
        Local Storage 和 Session Storage 容量都较大。单纯储存数据的话一般会选择 Local Storage。
    </p>
</details>

<details open>
    <summary>HTML 属性 SRC 和 HREF 的区别？</summary>
    <p>
        SRC 即 Source，指使用外部对象替换当前元素；HREF 即 Hypertext Reference，指元素与外部的链接关系。
    </p>
</details>

<details open>
    <summary>iframe 有哪些缺点？</summary>
    <p>
        iframe 有几个特性：会阻塞父页面的 onload 事件，它还和父页面共享请求数量上限。
        一般可以等页面加载完毕后，动态地设置 SRC 属性，就可以规避以上问题。
    </p>
</details>

## CSS

<details open>
    <summary>聊一聊选择器的优先级？</summary>
    <p>
        这个都比较熟悉了，重要性声明 > 内联样式 > ID 选择器 > 类选择器、伪类选择器 > 标签选择器、元素选择器。
        有一点很多人都会忽略的是，通配符虽然不增加优先级，但是通配符的优先级要高于继承。随意增改通配符容易污染同事的代码。
    </p>
</details>

<details open>
    <summary>什么是盒模型？</summary>
    <p>
        盒模型是页面布局过程中将元素转换为盒子时应用的布局模型。
        理论上有四种盒模型，Margin Box、Border Box、Padding Box 和 Content Box，但目前只能通过 Box Sizing 属性设置 Content Box 和 Border Box，分别指 W3C 标准盒模型和 IE 盒模型。
    </p>
</details>

<details open>
    <summary>什么是 BFC？</summary>
    <p>
        块级格式化上下文，是页面上的一个独立渲染、不影响外界元素的区域。
        有三个比较重要的特性是：BFC 不会影响外界，所以不和外界的 Float 及元素的 Margin 重叠。在 BFC 内部，相邻块级元素的垂直 Margin 会重叠。计算 BFC 的高度时，内容的浮动元素也会参与计算；
        所以可以应用到：清除浮动、自适应布局、防止和外界 Margin 重叠、防止被 Float 遮盖。
        触发条件有：绝对定位、固定定位、Display 为 InlineBlock 的元素、浮动元素、Overflow 为 Hidden 或 Scroll；CSS 3 中还新增了一种 Display：FlowRoot 也可以触发。
    </p>
</details>

<details open>
    <summary>怎样清除浮动？</summary>
    <p>
        一般有两种思路：通过新增标签或者伪元素，并应用 Clear 属性；触发父元素 BFC，就比如设置 Overflow，设置 Display InlineBlock，绝对定位，固定定位，浮动之类的方法。
    </p>
</details>

<details open>
    <summary>关于层叠上下文，你大致了解什么？</summary>
    <p>
        层叠上下文是指元素在一定条件下提升为一个特殊的图层，在 Z 轴的方向上比普通元素靠近用户，并且在同一个图层内会由 ZIndex 属性在 Z 轴方向进行排序。
        触发条件有：根元素、Position、Transform、Opacity、Filter 等。
        同一图层的层叠等级以越靠近用户排序有：Background，-ZIndex，块级元素，浮动元素，内联元素，ZIndex 0，ZIndex 正值越大越靠近。
    </p>
</details>

<details open>
    <summary>聊一聊 CSS 预处理器？</summary>
    <p>
        预处理是指通过编译工具将特定语言转为 CSS 文件。预处理器不能给 CSS 本身带来更高级的特性，但是可以增强语法。
        一般会用到嵌套、变量、Mixin、函数、内置函数之类的功能。
        结合后处理器，可以做 Tree Shaking、Code Zip、单位换算、浏览器兼容补全等用处。
    </p>
</details>

## 项目&工程化

<details open>
    <summary>Bable 之类的编译器有什么作用？</summary>
    <p>
        编译器主要的作用是转换与编译，能够将新标准中前沿的代码技术转换为相同（或类似）功能的代码，使其能够在旧的浏览器中运行。
    </p>
</details>

<details open>
    <summary>Bable 工作原理了解一些吗？</summary>
    <p>
        Bable 使用 Babylon（Babel-parser） 将代码解析为 AST，使用 Bable-traverse 维护 AST 的状态，做一些源码级别的转换，最后使用 Bable-generator 读取 AST 并生成代码。
    </p>
</details>

<details open>
    <summary>刚刚说到 AST，你对 AST 有什么其它的认识吗？</summary>
    <p>
        AST 即抽象语法树，是源代码的抽象树状语法结构。对于普通的字符串处理，使用正则完全足够。
        但一旦涉及字符串上下文，或是要在高可维护性项目中处理源码这种场景，就需要用到 AST。
        虽然前端离“计算机科学”这个名词好像隔着很远的距离，但是 AST 在前端实践中无处不在。
        我们通过“代码生成 AST”、“遍历与更新”、“重生成代码”三个标准流程，能构建出一整套代码工程化方案，比如包括代码高亮补全压缩混淆、模块构建、语法糖、语言转换等功能都离不开 AST。
    </p>
</details>

<details open>
    <summary>Prettier 和 ESLint 的区别是？</summary>
    <p>Prettier 是代码格式化工具，而 ESLint 则是 JS/TS 等代码的校验工具，只不过也有格式化这个功能。通过安装 ESLint 插件，可以使项目中的 ESLint 兼容 Prettier 的规则。再配置好 husky，就可以很方便的给暂存区代码进行格式化校验了。</p>
</details>

<details open>
    <summary>怎么在编码时预防内存泄漏？</summary>
    <p>
        JS 使用了标记清除法进行 GC，这意味着如果对象访问不到，则会自动被回收，我们要避免在编码时保存不必要的引用。<br />
        <ul>
            <li>闭包：闭包的错误的使用会导致对象一直被标记而不能被释放。这个要求我们写代码的时候要时刻注意对象引用关系的分配。也听说过有些团队禁止使用闭包，不过我觉得这在大部分情况下不合理。</li>
            <li>全局对象：函数中的 this 指向常常会带来问题，解决方案是在构造器中通过 new.target 判断是否是通过 new 运算符调用的构造器；此外，未声明的变量在赋值时会自动挂载到全局对象，解决方案是使用严格模式，或通过项目工程化（比如加语法校验和提交钩子)解决。</li>
            <li>还有一些常见的编程场景也容易导致内存泄漏，比如移除节点并不能清除某个变量对 DOM 的引用，销毁组件时没销毁监听器等。</li>
            <Highlight>
                /* 这里展示一下未经过考虑的闭包造成的内存泄漏场景。可以试试打开一个新窗口，然后在控制台运行此函数，应该不出十秒，页面就会崩溃 */
                const holder = null
                const unClearedRef = function () {
                    // closure 保持了 holder 的引用
                    const closure = holder
                    // 某个函数
                    const unused = function () {
                        // 由于 unused 函数的存在，closure 引用的值一直不会被释放
                        if (closure) console.log("")
                    }
                    /* 创建一个大对象 */
                    const test = {}
                    Array(1000000).fill('').map((x, i) => test[i] = new Array(200000000).join('*'))
                    holder = { ...test }
                }
                setInterval(unClearedRef, 500)
            </Highlight>
        </ul>
    </p>
</details>

<details open>
    <summary>移动端适配有了解么？</summary>
    <p>
        因为不同设备的像素大小及 DPR 不同，所以 CSS 像素和浏览器渲染视口的像素不一致，导致我们看到的页面和设计稿不一致。以往的做法是使用 REM 来写 CSS，把设计稿的尺寸代入计算，得到代码中的值，如 75px 的图片在 750px 的设计稿中，对应到 CSS 代码便是 7.5rem。当然，还得通过 JS 将根元素的字体大小设置为 10px，REM 方案才能正常运作。<br />
        现在来说，REM 方案已经被舍弃了。通常会使用 CSS VW 单位或 Meta.Viewport 这两种方案作为替代。CSS VW 单位需结合 Webpack CSS 后处理插件使用，才能提升开发体验。而 Meta.Viewport 可以指定浏览器视口大小等于设备宽度并禁用缩放，总的来说体验更高。<br />
        <Highlight lang="html">
             &lt;meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0"&gt;
             &lt;!-- width=device-width，指定视口大小等于设备宽度 --&gt;
             &lt;!-- user-scalable=no，禁止用户手动缩放视口 --&gt;
        </Highlight>
    </p>
</details>

<details open>
    <summary>首屏优化方案你了解过么？</summary>
    <p>
        以前在项目中接触过一点。首屏优化主要从两个方面考虑，第一是提高加载体验使加载状态用户无感，第二是提高页面性能，减少加载速度。<br />
        提高加载体验的话可以让 UI 设计一些加载动画或者加载时的交互，防止用户等待的时候注意力分散。也可以使用骨架屏，不过骨架屏整个结构蛮重的，除非项目原本的 UI 框架就支持骨架屏，否则自己假设一套的话，对项目有较强的侵入性，成本很高。比方说，项目首页因为内容结构经常会发生变化，所以骨架的图片（或 CSS）不太好维护，一般会在打包时利用无头浏览器渲染出相应 DOM 节点计算出宽高然后自定义骨架内容。<br />
        如果没有特殊要求的话，首屏优化优先选择第二种方案，也就是提高页面性能，减少加载速度。这个角度考虑的话，优化点非常多，但整体可以概括为：预加载、预渲染。<br />
        预加载可以使用 Prefetch、Preload 等技术，在我的博客中还使用了 Instant.page 技术。还有一种预加载技术，比方说小程序的离线包——它先下载好一整块内容，后期直接从里面取就好了。
        然后是预渲染。如果首页的部分数据不常变动，可以先将此页面的数据内嵌到 HTML 中，减少请求数。若将预渲染再展开一些，比方说将项目所有页面预渲染为 HTML，这样就是静态页面的思路。
        项目中这几种优化方案可以交叉实施，比方说 VasSonic 框架，可以流式拦截请求，边加载边渲染，还能做到增量更新。这种方案要比静态页面好上不少。还有一种性能较高的方案是，通过一个用户无感的 Webview 页面，预先请求数据并渲染 HTML，点击时直接切换 Webview 就好了，这种方案可以达到秒出效果。
    </p>
</details>

## 数据结构、算法及应用

大学的时候看过一些简单的算法书，但现在应该是全忘了。现在的话只能依稀能记起一些常用算法（的名字 TOT）。说实话，由于准备面试的时间较短，这方面还真没办法系统性的复习。所以只重看了一些以前项目中实践过的内容，都是比较简单的数据结构和算法... 害，期待面试的时候不要碰到靠算法刷人的公司吧...

- [数据结构](https://github.com/Lionad-Morotar/read-source-code/blob/master/data-structure/)

## 面试题/编程题

<details open>
    <summary>如何获取页面中所有用到的标签？</summary>
    <p>简单处理的话，可以在控制台直接用 document.querySelector('*') 选中所有元素并取 tagName，最后做一下去重就好了。更加工程化的手段则是使用 HTML Parser 解析 HTML，并用一个数组（Set）来保存用到标签。后面这种方案可以通过一个变量 offset 记录解析位置，方便任务中断。</p>
</details>

## 阅读更多

- [前端模块的历史沿革](https://www.cyj.me/programming/2018/05/22/about-module-i/)
- [JavaScript 模块化入门 Ⅰ：理解模块](https://zhuanlan.zhihu.com/p/22890374)
- [理解 JavaScript 中的执行上下文和执行栈](https://juejin.im/post/5ba32171f265da0ab719a6d7)
- [这一次，彻底弄懂 JavaScript 执行机制](https://juejin.im/post/59e85eebf265da430d571f89)
- [构造函数与 new 命令](https://javascript.ruanyifeng.com/oop/basic.html)
- [JS 原型链与继承别再被问倒了](https://juejin.im/post/58f94c9bb123db411953691b)
- [V8 之旅：垃圾回收器](http://newhtml.net/v8-garbage-collection/)
- [Concurrent marking in V8](https://v8.dev/blog/concurrent-marking)
- [内存分析与内存泄漏定位](https://juejin.im/post/59fbdb46f265da4321536565)
- [浏览器同源政策及其规避方法](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)
- [What really happens when you navigate to a URL](http://igoro.com/archive/what-really-happens-when-you-navigate-to-a-url/)
- [TCP 序列號 (Sequence Number, SEQ)](https://notfalse.net/26/tcp-seq)
- [Viewport 移动端适配](https://juejin.im/post/6844903721697017864)
- [ECMAScript 2016 Language Specification](http://www.ecma-international.org/ecma-262/7.0/#sec-execution-contexts)
- [中高级前端大厂面试秘籍，为你保驾护航金三银四，直通大厂(上)](https://juejin.im/post/5c64d15d6fb9a049d37f9c20)
- [中高级前端大厂面试秘籍，寒冬中为您保驾护航，直通大厂(下)](https://juejin.im/post/5cc26dfef265da037b611738)
- [JavaScript 开发者应懂的 33 个概念](https://github.com/stephentian/33-js-concepts)
