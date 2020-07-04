# 面试复习

## JavaScript

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
        MutationObserver、Promise、process.nextTick 的回调将会推入微任务队列。
        每执行一个宏任务及主体代码执行完毕后，将会立即执行所有微任务。
        <img class="db mauto mt1em b1" src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200621/20200704024238.png" />
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
        <img class="db mauto mt1em b1" src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200621/20200703192140.png" />
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
        <img class="db mauto mt1em b1" src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200621/20200704000843.png" />
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
        <img class="db mauto mt1em b1" src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200704/20200704033553.png" />
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
        还有一种相当有名的继承模式叫做“圣杯模式”。
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
    </p>
</details>

<details open>
    <summary>JS引擎的垃圾回收机制有了解吗？</summary>
    <p>
        V8 使用分代回收机制，将内存分为新生代和老生代空间，分别用不同的算法进行 GC。
        新生代空间通常较小，只有 1-8 MB。程序保持了一个指向内存区的指针，不断根据新对象的大小进行递增。当指针到达新生区末尾时，触发一次 ScavengeGC（小周期）。
        如果两个周期内都没被清除的变量则转移到老生代内存中。
        老生代空间则使用标记清除算法（和标记紧缩算法）进行清理。当然，实际上 GC 的过程相当复杂，这里只简要概括一个很浅显的流程。
        <ul>
            <li>
                新生代空间：被划分为两个等大的区域，出区和入区。操作在出区中进行，一旦出区耗尽则交换出区入区，并把入区的活跃对象复制回出区或者老生代内存中，并在此时对活跃对象进行紧缩。依次循环。
                <img class="db mauto mt1em b1" src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200704/20200704130952.png" />
            </li>
            <li>
                老生代空间：分标记和清除（或紧缩）两个阶段。标记算法在每次循环都会将一个对象从队列（初始为从根可达对象）中取出，将它及其邻接对象标记。
                清除阶段时，所有未被标记的对象都将被清除。如果选择紧缩，那么紧缩算法会尝试将零散的对象移成连续的整体，以解决内存的碎片化。<br />
                题外话，这里的图画错了，标记算法是深度搜索，图我画成了广搜...
                <img class="db mauto mt1em b1" src="https://cdn.jsdelivr.net/gh/Lionad-Morotar/blog-cdn/image/200704/20200704134710.png" />
            </li>
        </ul>
    </p>
</details>

<details open>
    <summary></summary>
    <p></p>
</details>

### doing

## 浏览器

## NodeJS

## 工程化

<details open>
    <summary>bable 之类的编译器有什么作用？</summary>
    <p>
        编译器主要的作用是转换与编译，能够将新标准中前沿的代码技术转换为相同（或类似）功能的代码，使其能够在旧的浏览器中运行。
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
        增强页面的可访问目的是使网页能够被更多的人使用，包括残障人士、使用处理性能底下、低网速的设备的人等。
    </p>
</details>

<details open>
    <summary>Cookie、Local Storage、Session Storage 的不同之处？</summary>
    <p>
        Cookie 主要用来标志用户的身份，并且始终会在同源的请求中携带，容量只有 4kb。
        Session Storage 储存是页面级别的，不在多个页面上共享，当页面关闭时销毁。
        Local Storage 和 Session Storage 容量都较大。单纯储存数据的话一般会选择 Local Storage。
    </p>
</details>

<details open>
    <summary>属性 SRC 和 HREF 的区别？</summary>
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

<details open>
    <summary>玩过哪些好玩的东西？</summary>
    <p>
        纯粹玩儿的话，以前喜欢画 Background Pattern，接触过 CSS Doodle，不过因为 CSS 是弱逻辑的，后来就改用 P5 了。
        还了解过一些 CSS 方法论，但是实践的机会比较有限。
    </p>
</details>

## 阅读更多

* [前端模块的历史沿革](https://www.cyj.me/programming/2018/05/22/about-module-i/)
* [JavaScript 模块化入门Ⅰ：理解模块](https://zhuanlan.zhihu.com/p/22890374)
* [理解 JavaScript 中的执行上下文和执行栈](https://juejin.im/post/5ba32171f265da0ab719a6d7)
* [这一次，彻底弄懂 JavaScript 执行机制](https://juejin.im/post/59e85eebf265da430d571f89#comment)
* [构造函数与 new 命令](https://javascript.ruanyifeng.com/oop/basic.html)
* [JS原型链与继承别再被问倒了](https://juejin.im/post/58f94c9bb123db411953691b)
* [V8 之旅：垃圾回收器](http://newhtml.net/v8-garbage-collection/)
* [ECMAScript 2016 Language Specification](http://www.ecma-international.org/ecma-262/7.0/#sec-execution-contexts)