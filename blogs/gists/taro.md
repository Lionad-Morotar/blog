# Taro

[TOC]

##### [官方博客汇总](https://taro-docs.jd.com/taro/blog/2018-06-07-Taro)

<q>而对于微信小程序而言，使用 React 完全没有办法进行开发——直到我们从 codemod 得到灵感：“在一个优秀且严格的规范限制下，从更高抽象的视角（语法树）来看，每个人写的代码都差不多”。</q>

Codemod 就是一段正则脚本。其实在乘云的时候我好像也在某个项目迁移到百度小程序时干过这事儿。

```shell
codemod -m -d /home/jrosenstein/www --extensions php,html \
    '<font *color="?(.*?)"?>(.*?)</font>' \
    '<span style="color: \1;">\2</span>'
```

<q>从开发的角度来说，小程序的开发体验就非常值得商榷了，不仅语法上显得有些不伦不类，而且有些莫名其妙的坑也经常让人不经意间感叹一下和谐社会，从市面上层出不穷的小程序开发框架就可见一斑。</q>

依赖管理混乱；不能用 CSS 预处理器或 CSS Module；ES6 支持度低... 这些其实是小程序 IDE 的问题，如果小程序的开发一开始就是确定一套规范，使用 JS 开发，然后围绕代码产出一套 IDE 插件（类似 Vue + Vue SFC + VS Code 插件），那会少很多麻烦。最要命的是，所有人都知道微信的这个“独特的” DSL 中间层其实就是开发的性能瓶颈所在。虽然说 Taro 博客从写从数百个 Nerv 组件编译到微信只要几十秒，但这背后的成本其实是 Taro 团队，甚至整个社区要为微信小程序填坑投入人力资源。如果按照“不符合直觉的坑才是真坑”的原则来说，上面提到的微信小程序的这些缺陷还不算坑，但它确实浪费了许多人的时间。

<q>每调用一次 setData，小程序内部都会将该部分数据在逻辑层（运行环境 JSCore）进行类似序列化的操作，将数据转换成字符串形式传递给视图层（运行环境 WebView），视图层通过反序列化拿到数据后再进行页面渲染</q>

![WebView & JSCore in mini-program](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220616093203.png)

Taro 会自动把多次 setData 合并，并且剔出只发生了改变的部分，即数据 diff。这个算法有意思，TODO。

<q>Template 模板方案是一个失败的组件化方案，Taro 开源初期的 Bug 主要来源于此。因为这一方案将 JS 逻辑与模板拆分开了，需要手工来保证 JS 与模板中数据一致，这样在循环组件渲染、组件多重嵌套的情况下，要保证组件正确渲染与 props 正确传递的难度非常大，实现的成本也非常高。</q>

其实吧，还是 IDE 的锅。同样是 string-based 的 Vuex 就不会用这种问题，如果说 Vuex 太轻无法和 Template 作为一个量级的比较的话，那么 HTML 和 CSS 脱离了 IDE 也是 string-based 的。

![Taro UI](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220616094000.png)

Taro UI 这个组件划分思路可以给 Lego Editor 做参考。

<q>模态框等组件无法遮挡 input、textarea等原生组件，造成穿透效果。 可喜的是，微信官方团队已经在改善该问题，对小程序原生组件引入了同层渲染模式。</q>

这个好像是说 cover-view 吧？

<q>事实上，@tarojs/components 的源码本身是使用 ESM 规范的，所以只要让 webpack 直接解析组件库的源码，我们立即就可以享受到 webpack 自带 treeshaking 带来的好处了。</q>

![Taro UI ESM](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220616100229.png)
![Taro UI package.json](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220616100235.png)

记得没错的话，ElementUI 的按需引入依赖插件 babel-plugin-component，把 import { A } from 'element' 转换为类似 import A from 'element/a' 的形式。

Taro 的 API 的摇树优化，也是通过 babel 插件实现的，但和 ElementUI 不一样。插件会把把 Taro.xxx 这种属性调用单独提取并转换。这些属性是 Taro 编译时通过 Rollup 导出的。呐呐，复杂度开始变大了。不过感觉也很有意思。

```js
// 编译前
import Taro from '@tarojs/taro-h5';
Taro.initPxTransform({});
Taro.setStorage()
Taro['getStorage']()

// 编译后
import Taro, { setStorage as _setStorage, getStorage as _getStorage } from '@tarojs/taro-h5';
Taro.initPxTransform({});
_setStorage();
_getStorage();
```

<q>Taro 会默认将 clickHandler 的作用域绑定为当前组件实例，但是这并不符合 React 中的实际情况，所以，在 1.3 版本中，我们对这一问题进行了修复，现在 JSX 中的事件监听函数必须绑定作用域，否则就会报错。</q>

说前端是魔法，也就是说，你正在写的这些稀奇古怪的好用的东西居然是通过插件完成的，一但其中某个插件设计思路发生了变动，你就只能死熬过痛苦的应变期。

---

###### [小程序多端框架全面测评](https://developers.weixin.qq.com/community/develop/article/doc/000eaadb944de06374485c3ed51813)

<Frame src="/gists/multy-end-app.html" />

---

<q>最开始小程序就是为了微型创新型业务打造的一个框架，最多只能运行 1m 的包。可是后来发现很多厂商把越来越多的业务搬到了小程序上，小程序的能力也在不断地开放，变得越来越强大。于是后来打包限制上升到了 2m，然后引入了分包，现在已经已经可以上传 8m 的小程序。其实这个体积已经可以实现非常巨型非常复杂的业务了。就从 Taro 的用户来看，例如京东购物小程序和 58 同城小程序不管从代码的数量还是复杂度都不亚于 PC 端业务，所以我们可以说前端开发的复杂度正在向小程序端转移。</q>

这应该是让人感到不安的事实。

<q>Dan Abramov 在 2018 年的 ReactConf 向大家首次介绍了 React Hooks：“很多新手应该会被 Class 组件绑定事件的 this 迷惑过，绑定事件可以用 bind，可以直接写箭头函数，也可以写类属性函数，但到底哪种方法才是最好的呢？而到了 ES 2018，class 还有多种语法，例如装饰器，例如 private fileds 这些奇奇怪怪的语法也为新手增加了更多的困惑。”</q>

说“新手”意味着“熟练的开发需要对糟糕的设计保持容忍，当他习以为常的时候就变成老手了”。把“新手”替换成“开发者”可能是更正确的价值观。

<q>熟悉小程序原生开发的同学可能会知道，所有 props 的传递都会被小程序序列化掉，如果传递了一个复杂的对象最终会变成一个 JSON。</q>

用 Taro 的 context 则没有这层限制。Context 可以支持传递复杂对象，很好奇是怎么实现的，TODO。

![VueConf China 2019 - Why Hooks](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220616104055.png)

有点类似继承多个类、多重继承和类组合。

<q>简单来说，Hooks 就是一组在 React 组件中运行的函数，让你在不编写 Class 的情况下使用 state 及其它特性。</q>

原来 Taro 1.3 就支持 Hooks 了，那时候好像正好准备离职了，没看到这东西。Taro 的文档简单介绍了 Hooks 的原理：Hooks 是一个全局维护的状态栈，每次新运行的 useState 会新增一个 Hook，并返回 initialState 和 changeInitialState 组成的元组，而后者会把新增 Hook 时所依赖的函数（也就是组件）CurrentOwner 记录到下一次需要更新的队列中。

```js
function getHook (): Hook {
  if (CurrentOwner.current === null) {
    throw new Error(`invalid hooks call: hooks can only be called in a taro component.`)
  }
  const index = CurrentOwner.index++ // hook 在该 Taro 函数中的 ID
  const hooks: Hook[] = CurrentOwner.current.hooks // 所有的 hooks
  if (index >= hooks.length) { // 如果 hook 还没有创建
    hooks.push({} as Hook) // 对象就是 hook 的内部状态
  }
  return hooks[index] // 返回正在执行的 hook 状态
}
```

```js
function useState<S> (initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>] {
  if (isFunction(initialState)) { // 如果 initialState 是函数
    initialState = initialState() // 就直接执行
  }
  const hook = getHook() as HookState<S> // 找到该函数中对应的 hook
  if (isUndefined(hook.state)) { // 如果 hook 还没有状态
    hook.component = Current.current! // 正在执行的 Taro 函数，缓存起来
    hook.state = [ // hook.state 就是我们要返回的元组
      initialState,
      (action) => {
        hook.state[0] = isFunction(action) ? action(hook.state[0]) : action
        enqueueRender(hook.component) // 加入更新队列
      }
    ]
  }
  return hook.state // 已经创建 hook 就直接返回
}
```

<q>在 2018 年 Ember.js 的作者提出过一个观点，Compilers are the New Frameworks，编译器即框架。什么意思呢？就拿 React 来举例，单单一个 React 其实没什么用，你还需要配合 create-react-app, eslint-plugin-react-hooks, prettier 等等编译相关的工具最终才能构成一个框架。而到了 2019 年，我想提出一个新概念，叫框架即生态。就拿 Taro 来说，使用 Taro 你可以复用 React 生态的东西，同时 Taro 还有 taro doctor，Taro 开发者社区，Taro 物料市场，还有腾讯小程序·云开发等等多个合作伙伴一起构成了 Taro 生态，而整个 Taro 生态才是框架。</q>

前端是魔法的第二证据。

---

###### [小程序跨框架开发的探索与实践](https://taro-docs.jd.com/taro/blog/2020-01-02-gmtc)

这篇文章也存放在 Taro 的博客中，不过因为太好了，所以单独列标题标注。

<q>微信小程序主要分为 逻辑层 和 视图层，以及在他们之下的原生部分。逻辑层主要负责 JS 运行，视图层主要负责页面的渲染，它们之间主要通过 Event 和 Data 进行通信，同时通过 JSBridge 调用原生的 API。</q>

![mini-program architecture](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220616180504.png)

Taro 架构划分为：编译时、运行时两个步骤。早期 Taro（v1.3）编译时主要是将 Taro 代码转换成小程序代码，运行时则是进行生命周期、事件、data 等数据对接。

<q>Taro 的编译时使用 babel-parser 将 Taro 代码解析成抽象语法树，然后通过 babel-types 对抽象语法树进行一系列修改、转换操作，最后再通过 babel-generate 生成对应的目标代码。</q>

![BABEL](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220616122609.png)

<q>整个 Taro 当前架构的特点是：重编译时，轻运行时、编译后代码与 React 无关、直接使用 Babel 编译。</q>

<q>mpvue 和 Taro 在编译时最大的区别是， Taro 将 JSX 编译成 小程序模版，而 mpvue 是将 Vue 模版编译成 小程序模版。由于 Vue 模版和 小程序模版的相似性，mpvue 在这一块的工作量比 Taro 少得多。</q>

![mpvue template vs Vue template](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220616182544.png)

实话说，这个区别好比微信小程序 vs xxx小程序。

运行时原理都好鸡贼！Taro 编译后会在 React 的 createComponent 中对接事件和生命周期，砍了 render 函数；mpvue 在 new Vue 时会同步创建小程序页面 new Page；patch 方法也被拦截了，不再更改 DOM，而是调用 setData 更改数据。

![mpvue runtime architecture](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220616123350.png)

新的 Taro 架构实现了 taro-runtime 包，用来模拟了一套最简的 DOM/BOM API（1000 loc）。再配合 taro-react，重写 render（其实是用作 ReactDOM.render 的补充），以连接 react-reconciler 到 taro-runtime。所有的 JSX Node 都会在 render 时调用 taro-runtime 的 createReactPage 方法在创建 Page 时渲染为微信的 template。这样就走通了 React 在小程序端的运行环境。Vue 类似，区别只是 taro-runtime 中的 createVuePage。

![JSX Node -> MiniProgram Template](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220616183851.png)

![Taro React Runtime](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220616183924.png)

<q>Taro Next 事件本质上是基于 Taro DOM 实现了一套自己的事件机制，这样做的好处之一是，无论小程序是否支持事件的冒泡与捕获，Taro 都能支持。</q>

![Taro Next Event](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220616184753.png)

实现了一套颗粒度到 DOM 级别的更新策略。后面说它要比 Data 级别的更新效率更高，但是没 get，TODO。

![Taro Next DOM Update](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220616184935.png)

这个性能对比图启发了我怎么分析代码性能瓶颈。

<q>编译时做的工作越多，也就意味着运行时做的工作越少，性能会更好。</q>

![Data Flow in mini-program & Taro Next](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220616185201.png)

---

<q>Taro 2.0 的 CLI 将会变得非常轻量，只会做区分编译平台、处理不同平台编译入参等操作，随后再调用对应平台的 runner 编译器 做代码编译操作，而原来大量的 AST 语法操作将会改造成 webpack Plugin 以及 Loader，交给 webpack 来处理。</q>

![Taro CLI](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220616190556.png)

终于从魔法 2.0 回归到 webpack 魔法 1.0 了。

<q>表面上来看 Taro （Taro Next）从一个编译型框架变成了一个运行时框架。但究其内核是整体的设计思路出现了变化：从前是「模拟（mock）」，现在是「实现（implements）」。</q>

<q>为了解决初始化性能问题，Taro 从服务端渲染受到启发，在 Taro CLI 将页面初始化的状态直接渲染为无状态的 wxml，在框架和业务逻辑运行之前执行渲染流程。我们将这一技术称之为预渲染（Prerender），经过 Prerender 的页面初始渲染速度通常会和原生小程序一致甚至更快。</q>

这是说先渲染一次模板，再 setData，要比直接渲染带 Data 的模板要快？

---

###### [Taro Next H5 跨框架组件库实践](https://taro-docs.jd.com/taro/blog/2020-4-13-taro-components)

TODO

<q>当我们希望创建一些不拘泥于框架的组件时，Web Components 会是一个不错的选择。文章简单介绍了 Taro Next、Web Components、Stencil 以及基于 Stencil 的组件库改造历程。</q>

---

Taro 对小程序的性能优化体现在：

* setData：data diff
* 跳转前预加载：componentWillPreload 时就可以发请求，要比 onLoad 快数百毫秒
* shouldComponentUpdate & Taro.PureComponent & Taro.memo：PureComponent 可以通过组件 state 的浅对比，避免不必要的更新

<q>Taro 性能真的优于原生吗？其实并不然，针对每个场景，我们都可以用原生写出性能最佳的代码。但是这样做工作量太大，实际项目开发中需要掌握效率与优化之间的平衡。</q>

---

##### [Taro 版本升级权威指南](https://taro-docs.jd.com/taro/blog/2020-09-01-taro-versions)

TODO

TODO

https://www.w3.org/TR/mini-app-white-paper/

---

...

https://taro-docs.jd.com/taro/blog/2019-07-10-taro-hooks

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/}]H8}MG}A0]99R0HY$]U]20.png)

https://taro-docs.jd.com/taro/blog/2020-01-02-gmtc#taro-%E8%BF%90%E8%A1%8C%E6%97%B6

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/V~CO7GR6GA9%3HMJ2`FWK@O.png)