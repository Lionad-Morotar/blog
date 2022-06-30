# Front End Mind Map

[TOC]

## 浏览器

<details>
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

<details>
    <summary>简要说说浏览器的重绘与回流及如何避免？</summary>
    <p>
        浏览器解析 HTML 文档，生成 DOM Tree；解析 CSS 文档，生成 CSSOM Tree。将两者合二为一得到 Render Tree。根据 Render Tree 进行布局浏览器可以得到节点的几何信息（位置、大小），还可以在内存中绘制，得到节点以像素形式展示的具体样式。最后，将相关信息发送至 GPU 展示在页面上。<br />
        如果在这个过程之外，更改了节点的几何样式属性，如宽度、高度，就会导致页面需要重新布局，即回流。如果仅改变了背景颜色等属性，则只需要重绘获取单个节点的像素信息。<br />
        现代浏览器会用一个队列缓存频繁的重绘和回流相关操作。但是使用 getComputedStyle()、getBoundingRect() 等接口时，会立即清空队列。
    </p>
</details>

<details>
    <summary>简要说说事件循环机制？</summary>
    <p>
        JS 是单线程语言，但是代码执行分为同步任务和异步任务。
        主线程将持续处理同步任务直到完成。异步任务会在完成时将回调推入任务队列。主线程空闲时，将向任务队列请求任务并执行。这个过程反复循环。
    </p>
</details>

<details>
    <summary>异步任务还能再细分吗？</summary>
    <p>
        刚刚没有提到，异步任务还可以细分为宏任务（Macro Task）和微任务（Micro Task）。
        addEventListener、setTimeout、setInterval 的回调将会推入宏任务队列。
        QueueMicrotask、MutationObserver、Promise、process.nextTick 的回调将会推入微任务队列。
        每执行一个宏任务及主体代码执行完毕后，将会立即执行所有微任务。
        <img class="db mauto mt1em b1" src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/200621/20200704024238.png" />
    </p>
</details>

<details>
    <summary>先简单介绍一下浏览器的事件捕获机制？</summary>
    <p>
        浏览器的事件传播分为三个阶段：Capturing、Targeting、Bubbling，顺序上来说是先从根元素一直向目标元素传播，然后再由目标元素向根元素传播。
        事件捕获发生在 Bubble 阶段，但是可以在事件监听时使用 useCapture 参数指定某回调函数在 Capture 阶段触发。
        <img class="db mauto mt1em w68" src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/event-capture.svg" style="filter: grayscale(.7)" />
    </p>
</details>

<details>
    <summary>跨标签页通讯有哪些方案？</summary>
    <ul>
        <li>Broadcast Channel：可以建立同源窗口下所有监听了该频道的对象，IE 和 Safari 没有实现。 </li>
        <li>iframe：使用 postMessage 进行通讯，兼容性很好。</li>
        <li>Web Worker：通过 Shared Worker 可以也可以实现。</li>
        <li>Local Storage：轻量的数据可以使用 window.onstorage 监听 LocalStorage 的设置，缺点是设置相同的字符串值时监听不到。</li>
        <li>Web Socket：让后台中转页面发送的请求。</li>
    </ul>
</details>

<details>
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

<details>
    <summary>了解浏览器的内容安全策略（CSP）吗？</summary>
    <p>见：<a href="/gists/network.html#CSP">计算机网络</a></p>
</details>

<details>
    <summary>浏览器原理概述？</summary>
    <p>见博客：<a href="/gists/browser.html">浏览器原理概述</a></p>
</details>

## 网络

更详细的资料看：<a href="/gists/network.html">计算机网络</a>

<details>
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

<details>
    <summary>HTTP 2.0 做出了哪些改进呢？</summary>
    <ul>
        <li>多路复用</li>
        <li>二进制分帧层: 应用层和传输层之间</li>
        <li>首部压缩</li>
        <li>服务端推送</li>
    </ul>
</details>

<details>
    <summary>Get 和 Post 请求有哪些区别？</summary>
    <p>
        Get 请求会被浏览器缓存，会被浏览器保存在历史记录中，此外，Get 请求的参数是拼接在 URL 中的明文，且长度也有限制，适合做一些资源翻页之类的场景；
        Post 请求不会被缓存，对数据类型没有限制，几乎所有场景都可以使用。<br />
    </p>
</details>

<details>
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

<details>
    <summary>CDN 对前端来说有哪些好处？</summary>
    <p>
        CDN 是一种必要的冗余。普遍而说，CDN 能通过快速响应速度、突破浏览器的同域名请求并发数、节约 Cookie 带宽等手段加快页面加载速度。
    </p>
</details>

<details>
    <summary>同源策略限制了哪些内容？</summary>
    <p>
        同源策略是一种浏览器遵守的规范，要求页面发送的请求的协议、HOST、端口号必须与脚本来源相同。这是一种最基础的安全策略。绕过同源策略的方法即跨域。
    </p>
</details>

<details>
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

<details>
    <summary>这里打断一下，正向代理和反向代理的区别是？</summary>
    <p>
        正向代理为用户服务，内容服务器无法区分用户或是代理，常见于“能访问谷歌的那种代理”；反向代理为服务器服务，用户无法区分访问的是代理还是服务器，常用于过滤请求及负载均衡。
    </p>
</details>

<details>
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

<details>
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

<details>
    <summary>HTML5 带来了哪些改进？</summary>
    <p>
        首先是增强了语义化：新增了一些语义化标签，Main、Nav、Sidebar、Header、Footer 之类的，还删除了一些纯表现元素，如 Font、Center 等。
        再是新增了一些 API：拖拽、音视频、Canvas、Local Storage、Session Storage、WebWorker、WebSocket。
    </p>
</details>

<details>
    <summary>如何理解语义化标签？</summary>
    <p>
        单纯按照 HTML5 规范就应该这么做；
        从增强页面的可访问性开始可以考虑两方面：一是方便搜索引擎或屏幕阅读器等机器对页面的解析；二是方面使开发人员理解页面的内容结构。
    </p>
</details>

<details>
    <summary>为什么要增强页面的可访问性？</summary>
    <p>
        增强页面的可访问目的是使网页能够被更多的人使用，包括残障人士、使用处理性能底下或带宽低的设备的人等。
    </p>
</details>

<details>
    <summary>可访问性和 SEO 的区别是？</summary>
    <p>
        SEO 提高搜索引擎的体验，可访问性是提高人的体验。SEO 有几个比较重要的点，TDK、语义化 HTML、页面速度。
    </p>
</details>

<details>
    <summary>Cookie、Local Storage、Session Storage 的不同之处？</summary>
    <p>
        Cookie 主要用来标志用户的身份，并且始终会在同源的请求中携带，容量只有 4kb。
        Session Storage 储存是页面级别的，不在多个页面上共享，当页面关闭时销毁（页面并非指浏览器窗口，而是指 Tab 页面）。
        Local Storage 和 Session Storage 容量都较大。单纯储存数据的话一般会选择 Local Storage。
    </p>
</details>

<details>
    <summary>HTML 属性 SRC 和 HREF 的区别？</summary>
    <p>
        SRC 即 Source，指使用外部对象替换当前元素；HREF 即 Hypertext Reference，指元素与外部的链接关系。
    </p>
</details>

<details>
    <summary>iframe 有哪些缺点？</summary>
    <p>
        iframe 有几个特性：会阻塞父页面的 onload 事件，它还和父页面共享请求数量上限。
        一般可以等页面加载完毕后，动态地设置 SRC 属性，就可以规避以上问题。
    </p>
</details>

## CSS

<details>
    <summary>聊一聊选择器的优先级？</summary>
    <p>
        这个都比较熟悉了，重要性声明 > 内联样式 > ID 选择器 > 类选择器、伪类选择器 > 标签选择器、元素选择器。
        有一点很多人都会忽略的是，通配符虽然不增加优先级，但是通配符的优先级要高于继承。随意增改通配符容易污染同事的代码。
    </p>
</details>

<details>
    <summary>什么是盒模型？</summary>
    <p>
        盒模型是页面布局过程中将元素转换为盒子时应用的布局模型。
        理论上有四种盒模型，Margin Box、Border Box、Padding Box 和 Content Box，但目前只能通过 Box Sizing 属性设置 Content Box 和 Border Box，分别指 W3C 标准盒模型和 IE 盒模型。
    </p>
</details>

<details>
    <summary>什么是 BFC？</summary>
    <p>
        块级格式化上下文，是页面上的一个独立渲染、不影响外界元素的区域。
        有三个比较重要的特性是：BFC 不会影响外界，所以不和外界的 Float 及元素的 Margin 重叠。在 BFC 内部，相邻块级元素的垂直 Margin 会重叠。计算 BFC 的高度时，内容的浮动元素也会参与计算；
        所以可以应用到：清除浮动、自适应布局、防止和外界 Margin 重叠、防止被 Float 遮盖。
        触发条件有：绝对定位、固定定位、Display 为 InlineBlock 的元素、浮动元素、Overflow 为 Hidden 或 Scroll；CSS 3 中还新增了一种 Display：FlowRoot 也可以触发。
    </p>
</details>

<details>
    <summary>怎样清除浮动？</summary>
    <p>
        一般有两种思路：通过新增标签或者伪元素，并应用 Clear 属性；触发父元素 BFC，就比如设置 Overflow，设置 Display InlineBlock，绝对定位，固定定位，浮动之类的方法。
    </p>
</details>

<details>
    <summary>关于层叠上下文，你大致了解什么？</summary>
    <p>
        层叠上下文是指元素在一定条件下提升为一个特殊的图层，在 Z 轴的方向上比普通元素靠近用户，并且在同一个图层内会由 ZIndex 属性在 Z 轴方向进行排序。
        触发条件有：根元素、Position、Transform、Opacity、Filter 等。
        同一图层的层叠等级以越靠近用户排序有：Background，-ZIndex，块级元素，浮动元素，内联元素，ZIndex 0，ZIndex 正值越大越靠近。
    </p>
</details>

<details>
    <summary>聊一聊 CSS 预处理器？</summary>
    <p>
        预处理是指通过编译工具将特定语言转为 CSS 文件。预处理器不能给 CSS 本身带来更高级的特性，但是可以增强语法。
        一般会用到嵌套、变量、Mixin、函数、内置函数之类的功能。
        结合后处理器，可以做 Tree Shaking、Code Zip、单位换算、浏览器兼容补全等用处。
    </p>
</details>

## 项目&工程化

<details>
    <summary>Bable 之类的编译器有什么作用？</summary>
    <p>
        编译器主要的作用是转换与编译，能够将新标准中前沿的代码技术转换为相同（或类似）功能的代码，使其能够在旧的浏览器中运行。
    </p>
</details>

<details>
    <summary>Bable 工作原理了解一些吗？</summary>
    <p>
        Bable 使用 Babylon（Babel-parser） 将代码解析为 AST，使用 Bable-traverse 维护 AST 的状态，做一些源码级别的转换，最后使用 Bable-generator 读取 AST 并生成代码。
    </p>
</details>

<details>
    <summary>刚刚说到 AST，你对 AST 有什么其它的认识吗？</summary>
    <p>
        AST 即抽象语法树，是源代码的抽象树状语法结构。对于普通的字符串处理，使用正则完全足够。
        但一旦涉及字符串上下文，或是要在高可维护性项目中处理源码这种场景，就需要用到 AST。
        虽然前端离“计算机科学”这个名词好像隔着很远的距离，但是 AST 在前端实践中无处不在。
        我们通过“代码生成 AST”、“遍历与更新”、“重生成代码”三个标准流程，能构建出一整套代码工程化方案，比如包括代码高亮补全压缩混淆、模块构建、语法糖、语言转换等功能都离不开 AST。
    </p>
</details>

<details>
    <summary>Prettier 和 ESLint 的区别是？</summary>
    <p>Prettier 是代码格式化工具，而 ESLint 则是 JS/TS 等代码的校验工具，只不过也有格式化这个功能。通过安装 ESLint 插件，可以使项目中的 ESLint 兼容 Prettier 的规则。再配置好 husky，就可以很方便的给暂存区代码进行格式化校验了。</p>
</details>

<details>
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

<details>
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

<details>
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

<details>
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
- [前端面试之道](https://juejin.cn/book/6844733763675488269)
- [JavaScript 语言精髓和编程实践](https://read.douban.com/ebook/160113393/?dcs=subject-buylink&dcm=douban&dct=35085910)