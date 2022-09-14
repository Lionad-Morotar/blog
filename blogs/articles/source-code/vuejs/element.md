# ElementUI & ElementPlus

[TOC]

## 项目结构

#### element-ui 的项目结构是怎样的？

ElementUI 的项目结构按照功能划分，把源文件、主题样式、文档文件夹存放在项目一级目录下。

```
element
├── /.github        // GitHub 流程相关，包括贡献者列表、缺陷模板、PR 模板文件
├── /build          // 项目打包和部署相关脚本、Webpack 配置
├── /examples       // 代码示例（Element-UI 官网）
├── /packages       // Element-UI 模块源码
├── /src            // Element-UI 主要代码
├── /test           // 测试用例，主要分单元测试和 SSR 测试
├── /types          // 类型声明文件
├── components.json // 所有组件的名称对应路径的信息
├── package.json    // 携带有 NPM Scripts 任务信息
└── Makefile        // Make 的任务信息
```

#### element-plus 的包结构是怎样的？



## 项目工程化

### 如何创建新组件

**可以使用 `make new [component]` 创建新组件[^make]。创建组件会调用脚本自动创建模板文件并维护组件编译时相关配置。**

[^make]: 可以把 Make 理解为一种类似 Gulp 的项目工程化工具，用于编写一些供命令行调用执行的任务。运行 Make 指令需要安装特定软件。

make 脚本的具体逻辑需要看 Makefile 中的 new 任务的代码：

```makefile
new:
	node build/bin/new.js $(filter-out $@,$(MAKECMDGOALS))
```

可以看到，创建组件时会调用 `build/bin/new.js`。其中 filter-out 也就是过滤函数，从 MAKECMDGOALS 变量中过滤掉 $@ 变量内容，并把剩下的内容传给 node 脚本。以以下 Make 脚本举例：

```bash
make new button-dark
```

MAKECMDGOALS 变量指整个 make 脚本的参数字符串“new button-dark”，$@ 指调用的指令即“new”。从“new button-dark”中过滤掉“new”后，传给 node 脚本的参数也就只剩字符串“button-dark”了。

最终脚本执行，按照脚本逻辑，先用标准的模板内容创建对应文件。

```js
const Files = [
  {
    filename: 'index.js',
    content: '...'
  },
  // ... 省略其它模板文件信息
]
// 将模板内容写入对应文件中
Files.forEach(file => {
  fileSave(path.join(PackagePath, file.filename))
    .write(file.content, 'utf8')
    .end('\n')
})
```

创建的文件有以下类型：

* 组件入口（`/packages/[component]/index.js`）
* 组件文件（`/packages/[component]/src/main.vue`）
* 组件文档（`/examples/doc/[language]/[component].md`）
* 基础测试用例（`/test/unit/specs/[component].spec.js`）
* 默认样式（`/packages/theme-chalk/src/[component].scss`）
* 类型声明（`/types/[component].d.ts`）

以 Alert 组件文件为例，默认模板的文件内容比较简单，只提供了一个 install 方法用于注册。

```js
import Alert from './src/main'

Alert.install = function(Vue) { 
  Vue.component(Alert.name, Alert) 
}

export default Alert
```

除了创建模板文件，脚本还会修改组件编译相关配置信息，主要是要将组件路径添加到 components.json 文件中，用于打包时使用。文件内容形如：

```js
{
  "pagination": "./packages/pagination/index.js",
  "dialog": "./packages/dialog/index.js",
  // ... 省略80行组件路径信息
  "popconfirm": "./packages/popconfirm/index.js"
}
```

### 打包组件有哪些步骤

**组件打包涉及组件逻辑打包、组件样式打包、源码入口打包三个步骤**。

在 Element 中，所有的组件都存放在 packages 文件夹里，每个子文件夹各对应一个组件。打包组件会把 package 目录下所有组件 package/[component].js 编译生成到 lib/[component].js。由于 components.json 聚合了所有组件的路径信息，所以会在各打包任务中用到。

#### 组件逻辑打包

webpack.component.js 用于打包单个组件。为了解决打包时，组件依赖了其它组件产生的依赖问题，需要设置 externals。

```js
const Components = require('../components.json')
const externals = {}
// webpack externals
Object.keys(Components).forEach(function(key) {
  externals[`element-ui/packages/${key}`] = `element-ui/lib/${key}`;
})
// webpack config
const webpackConfig = {
  mode: 'production',
  entry: Components,
  output: {
    path: path.resolve(process.cwd(), './lib'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[id].js',
    libraryTarget: 'commonjs2'
  },
  externals: config.externals,
  // ... 省略其它配置
}
```

为了测试 webpack.component.js，可以使用以下指令：

```bash
npx webpack --config build/webpack.component.js
# 因为使用了 progress-bar-webpack-plugin 插件，
# 打包时会在控制台看到以下进度条：
# build [=========           ] 45%
```

#### 源代码入口打包

build-entry.js 用于生成项目源代码的入口文件，即 src/index.js。

如果你经常使用 Element，应该还记得有两种引入 Element 的方式：

```js
// 1. 直接引入单组件
import { Dialog } from 'element-ui'
// 2. 引入并注册所有组件
import element from 'element-ui'
Vue.use(element)
```

对应的逻辑，就全都在 src/index.js 中啦~

```js
// 导出 install 方法供 Vue.use 使用，
// 对应第二种方法
const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}
// 同时导出所有组件，
// 对应第一种方法
export default {
  install,
  Loading,
  Dialog,
  // ...
}
```

#### 组件样式打包

Element 提供了默认样式主题 theme-chalk，存放到了 packages/theme-chalk 中。文件结构大致如下：

```
element/packages/theme-chalk
├─lib // 编译 CSS 的中间目录
└─src // 样式源码，存放有 alert.scss、dialog.scss 等所有组件的样式
  ├─common  // SCSS 变量、过渡动画等
  ├─fonts   // 图表字体文件
  └─mixins  // SCSS Mixin
```

关于组件样式的打包逻辑可以在 package.json 找到，分为三个步骤。

```js
{
  "scripts": {
    "build:theme": `
      ${ /* 生成样式入口文件 */ }
      node build/bin/gen-cssfile &&
      ${ /* CSS 编译 */ }
      gulp build --gulpfile packages/theme-chalk/gulpfile.js &&
      ${ /* 移动编译结果 */ }
      cp-cli packages/theme-chalk/lib lib/theme-chalk
    `,
  }
}
```

样式入口文件也就是我们平时使用 Element 时引入的那个样式文件，见下代码。

```js
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
```

和通过 component.json 动态生成的 lib/index.js 类似，样式入口文件也是由各个组件样式简单的拼接。

```js
// 1. 引入基础样式，如图标和动画
var indexContent = '@import "./base.scss"\n'
// 2. 引入各组件的样式文件
Components.forEach(function(key) {
  var fileName = key + '.scss'
  indexContent += '@import "./' + fileName + '"\n'
})
// 3. 写入文件
fs.writeFileSync(path.resolve(basepath, theme, 'src', 'index.scss', indexContent)
```

为了减小引入样式的体积，组件样式也可以单独引入。在第二步 gulp build 时，会将 SCSS 样式统一编译为 CSS，并用第三步的 cp-cli[^cp-cli] 工具将编译结果复制到打包结果目录。

[^cp-cli]: 拷贝操作依赖了 cp-cli@npm，可以简单理解为拷贝指令的NodeJS 版。

```js
// 编译 SCSS，
// 应用了插件 autoprefixer、cssmin
function compile() {
  return src('./src/*.scss')
    .pipe(sass.sync())
    .pipe(autoprefixer({
      browsers: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(dest('./lib'));
}
// 将字体从 package/theme-chalk/src/fonts，
// 拷贝到 package/theme-chalk/lib/fonts
function copyfont() {
  return src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(dest('./lib/fonts'));
}
exports.build = series(compile, copyfont);
```

最后使用 cp-cli 指令将中间目录（package/theme-chalk/lib）拷贝到编译结果目录（lib/theme-chalk/lib），所有关于样式的工程化处理就结束了。

### 如何按需载入组件

按照官网的介绍，**想要按需载入组件以减小项目打包体积，可以使用 [babel-plugin-component](https://www.npmjs.com/package/babel-plugin-component)**[^babel-plugin-component]。使用方法很简单，仿照以下代码写就可以：

[^babel-plugin-component]: 见 Element 官网，quickstart 部分：[https://element.eleme.cn/#/zh-CN/component/quickstart#an-xu-yin-ru](https://element.eleme.cn/#/zh-CN/component/quickstart#an-xu-yin-ru)

```js
import { Button, Select } from 'element-ui'

Vue.use(Button)
Vue.use(Select)
```

babel-plugin-component 会自动把引入的内容作语法转换。


```js
// 比如下面这行：
import { Button } from '[libraryName]'
// 会转化为以下两行：
const button = require('[libraryName]/lib/button')
require('[libraryName]/lib/[styleLibraryName]/button.css')
```

[libraryName] 和 [styleLibraryName] 的值可以通过 .babelrc 文件指定。

```json
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

按照“打包组件有哪些步骤”那个小节的介绍，在组件逻辑打包和组件样式打包时，除了生成源代码入口、默认样式入口以外，还用 webpack.component.js 以及 gulp build theme-chalk/gulpfile.js 单独打包各组件及组件样式。这样一来，就能从 lib/[component] 及 lib/theme-chalk/[component].css 也就拿到组件独立的资源文件了。相比整个引入 Element，单独引入组件自然减小了资源体积。

相关阅读：

* [《组件库按需加载原理分析》](https://mp.weixin.qq.com/s/ty4IUtLlTgxdc8-7_UGyiQ)

## 组件实现

### 组件逻辑

#### [Alert](https://element.eleme.cn/#/zh-CN/component/alert)

#### [Avatar](https://element.eleme.cn/#/zh-CN/component/avatar)

想判断图片是否加载失败，以前我一直会这么写：

```js
const $image = new Image()
$image.onload = () => {}
$image.onerror = () => { /* ... */ }
$image.src = 'xxx'
```

在 Avatar 组件中发现了一种新的写法，配合 Vue 组件使用起来非常香：

```js
{
  render () {
    return <img
      src={src}
      onError={this.loadFailed}
    />
  },
  methods: {
    loadFailed () {
      // ...
    }
  }
}

```

### 帮助函数

#### Clickoutside

Clickoutside，顾名思义，用作点击非元素本身时触发回调函数。比方说在多选框输入状态时底部弹出的悬浮框，可以通过点击周边区域消除，效果见下图：

![点击外部关闭悬浮弹窗](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/p0xBBOijBB.gif)

Element 选择用指令去实现这个效果。在指令初始化时会把元素信息以及绑定的回调函数保存下来，并在 document 接收到点击事件时根据点击事件判断是否是在点击非元素本身。

先来看看指令部分：

```js
let id = 0
const nodeList = []
export default {
  // 指令初始化时
  bind(el, binding, vnode) {
    // 把元素推入 nodeList
    nodeList.push(el)
    // 给元素挂上标识符和回调函数
    el[ctx] = {
      // 保证标识符全局唯一
      id: id++,
      // 用来处理 document 接收到的点击事件，判断点击事件中点击的元素是否是自身（即 el）
      documentHandler: createDocumentHandler(el, binding, vnode),
      // 回调函数的名称
      methodName: binding.expression
    }
  },
  // 指令收到节点更新事件，需要重新绑定，
  // 以释放闭包中的旧的节点信息以防内存泄漏
  update(el, binding, vnode) {
    el[ctx].documentHandler = createDocumentHandler(el, binding, vnode)
    el[ctx].methodName = binding.expression
  },
  // 销毁绑定时，通过 ID 找到并删除 nodeList 中对应元素
  unbind(el) {
    let len = nodeList.length
    for (let i = 0 i < len i++) {
      if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1)
        break
      }
    }
    delete el[ctx]
  }
}
```

接下来是监听 document 的点击事件。使用点击事件的参数 event.target 可以找到点击事件到底是点地哪一个元素；我们把点击事件记录下来，并对比指令挂载的元素（即 nodeList）和点击元素是否是同一个元素，如果不是同一个元素，就可以触发回调函数了。

```js
let startClick = null
document.addEventListener('mousedown', e => (startClick = e))
document.addEventListener('mouseup', e => {
  nodeList.forEach(node => node[ctx].documentHandler(e, startClick))
})
```

最后来看看怎么判断点击元素和指令挂载的元素是否是同一个元素：

```js
function createDocumentHandler(el, binding, vnode) {
  return function(mouseup = {}, mousedown = {}) {
    if (!vnode ||
      !vnode.context ||
      !mouseup.target ||
      !mousedown.target ||
      // 使用 contains API 判断元素是否包含点击元素，
      // 也就是说如果点击事件中触发的元素既不是指令挂载元素的子元素或其本身，
      // 那就算“点击外部元素”，需要触发回调了
      el.contains(mouseup.target) ||
      el.contains(mousedown.target) ||
      el === mouseup.target) return;

    // 触发回调函数
    if (binding.expression &&
      el[ctx].methodName &&
      vnode.context[el[ctx].methodName]) {
      vnode.context[el[ctx].methodName]()
    }
  }
}
```

当然，不同指令也可以实现同样的效果。比方说，可以借助一个全屏的元素拦截点击事件，点击或滚动时自动隐藏模块。此方案的重点在 CSS，遮罩层需要使用固定定位，以占满全屏；同时给模块增加层级以覆盖掉页面上其它元素。

```html
<div class="fullscreen-mask" @mousedown="show=false" @scroll="show=false" />
<div class="my-components" v-if="show" />
<style>
  /* 遮罩层使用固定定位，占满全屏 */
  .fullscreen-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1;
  }
  /* 使层级覆盖掉页面上其它元素 */
  .fullscreen-mask + * {
    z-index: 9999;
  }
</style>
```

实现效果类似如下图。

![点击外部关闭选框](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/oZYZBMECXL.gif)

## 文档

### 图标样式处理

从以上流程还可以发现，图标样式并没有在 build:theme 时被处理。通过分析 package.json，可以发现，图表样式的处理放在了 build:file，也就是打包代码示例的任务中。可以把这个任务理解为打包 ElementUI 官网展示的[文档](https://element.eleme.cn/#/zh-CN/component/installation)。

```js
{
  "scripts": {
    "build:file": `
      ${ /* 生成图标信息 icon.json */ }
      node build/bin/iconInit.js & 
      ${ /* 生成代码示例项目的入口文件（还记得么在这一步会生成 components.json 么？） */ }
      node build/bin/build-entry.js & 
      ${ /* 维护项目多语言 */ }
      node build/bin/i18n.js &
      ${ /* 维护库版本 */ }
      node build/bin/version.js
    `
```

由于项目入口依赖了 `icon.json`，挂载到了 Vue 原型属性 $icon 上，供[图标列表页面](https://element.eleme.cn/#/zh-CN/component/icon)调用，所以生成图表信息这一步必须放在入口文件之前。

由于主题中的图标 CSS 格式比较固定，所以 iconInit.js 直接可以通过正则匹配出用到的图标名称：

```css
/* ... */
.el-icon-ice-cream-round:before {
  content: "\e6a0";
}
/* ... */
```

```js
// 读取图标 CSS 文件
var fontFile = fs.readFileSync(path.resolve(__dirname, '../../packages/theme-chalk/src/icon.scss'), 'utf8')
// 将 CSS 解析为可迭代的 CSSOM 节点列表
var nodes = postcss.parse(fontFile).nodes
// 用于保存匹配的结果
var classList = []

nodes.forEach((node) => {
  var selector = node.selector || ''
  // 比如类名 ".el-icon-ice-cream-round"，
  // 需要匹配其中的 "ice-cream-round"
  var reg = new RegExp(/\.el-icon-([^:]+):before/)
  var arr = selector.match(reg)

  if (arr && arr[1]) {
    classList.push(arr[1])
  }
})

// 这里把匹配出来的结果倒排了一下，
// 也就是新加到图标 CSS 尾部的图标，
// 反而会会展现到帮助文档的开头
classList.reverse()

// 最后写入文件
fs.writeFile(path.resolve(__dirname, '../../examples/icon.json'), JSON.stringify(classList), () => {})
```

## 阅读更多

* [Make 基础语法以及在 ElementUI 中的运用](https://juejin.im/post/6844903775912591368)