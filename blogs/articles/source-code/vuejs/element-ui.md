# ElementUI

[TOC]

## 项目架构

ElementUI 的项目结构是按照功能划分的，如源文件、主题样式、文档文件夹都直接存放在项目一级目录下，而管理内部的文件，如“把 JS 文件压缩后移动到 Dist 目录”，则是通过项目内部依赖的多种任务管理工具，如 Make、Gulp 和 NPM Script（package.json）。

```
D:/@github/element
├── /.github        // Github 流程相关，包括贡献者列表、缺陷模板、PR 模板文件
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

#### 组件管理

所有的 Elements 组件都存放在 packages 文件夹中，其内部每一个文件夹对应一个组件。组件的路径信息则保存在 components.json 中，形如：

```js
{
  "pagination": "./packages/pagination/index.js",
  "dialog": "./packages/dialog/index.js",
  // ...省略80行
  "popconfirm": "./packages/popconfirm/index.js"
}
```

`components.json` 是通过 Make 脚本维护的，见项目目录下的 `Makefile`[^make]。使用 `make new [component]` 创建新的组件时，会调用 `build/bin/new.js`，对项目配置文件进行修补：

[^make]: Make 可以理解为一种类似 Gulp 的项目工程化工具，用于编写一些供命令行调用执行的任务。

* 添加组件到 `components.json`
* 添加组件到主题入口 `index.scss`
* 添加组件到 `elements-ui` 类型声明
* 添加组件到示例网站的导航栏

除了更改配置，脚本也会自动创建一些新的入口文件：

* 组件入口（`/packages/[component]/index.js`）
* 组件文件（`/packages/[component]/src/main.vue`）
* 组件文档（`/examples/doc/[language]/[component].md`）
* 基础测试用例（`/test/unit/specs/[component].spec.js`）
* 默认样式（`/packages/theme-chalk/src/[component].scss`）
* 类型声明（`/types/[component].d.ts`）

默认入口文件的结构与内容比较简单，以 Alert 组件为例，`alert/index.js` 引入组件后，简单添加一个 install 方法用于 VueJS 注册：

```js
import Alert from './src/main'

Alert.install = function(Vue) { 
  Vue.component(Alert.name, Alert) 
}

export default Alert
```

文件结构如下：

```
D:\@github\element\packages\alert
├── index.js
└── /src
   └── main.vue
```

#### 样式打包

从文件夹结构可以发现，组件的样式并不是在文件夹内部维护的。因为，在 Element 中，样式的“概念”对应“组件主题”，所以打包样式和打包 JS 是分开进行的。

可以在 `package.json` 的脚本中找到用于打包样式文件的命令：

```js
{
  "scripts": {
    "build:theme": `
      node build/bin/gen-cssfile &&
      gulp build --gulpfile packages/theme-chalk/gulpfile.js &&
      cp-cli packages/theme-chalk/lib lib/theme-chalk
    `,
  }
}
```

拆分为后，做了大致如下工作：

* `node build/bin/gen-cssfile`：生成主题的入口文件
* `gulp build --gulpfile packages/theme-chalk/gulpfile.js`：样式清洗及文件移动任务
* `cp-cli packages/theme-chalk/lib lib/theme-chalk`：最后拷贝到库目录

每种主题都依赖有变量、动画、字体等基础的样式设置，生成主题的入口文件意味着将基础样式与组件样式整合到一起：

```js
var fs = require('fs')
var path = require('path')
var Components = Object.keys(require('../../components.json'))
var themes = [ 'theme-chalk' ]

var basepath = path.resolve(__dirname, '../../packages/')

themes.forEach((theme) => {
  var isSCSS = theme !== 'theme-default'

  // 引入基础样式，如图标和动画
  var indexContent = isSCSS ? '@import "./base.scss"\n' : '@import "./base.css"\n'

  // 引入每个组件的样式文件
  Components.forEach(function(key) {
    if (['icon', 'option', 'option-group'].indexOf(key) > -1) return
    var fileName = key + (isSCSS ? '.scss' : '.css')
    indexContent += '@import "./' + fileName + '"\n'
    var filePath = path.resolve(basepath, theme, 'src', fileName)
    if (!fileExists(filePath)) {
      fs.writeFileSync(filePath, '', 'utf8')
      console.log(theme, ' 创建遗漏的 ', fileName, ' 文件')
    }
  })

  // 写入入口文件的内容
  fs.writeFileSync(path.resolve(basepath, theme, 'src', isSCSS ? 'index.scss' : 'index.css'), indexContent)
})
```

生成的入口文件如下：

```scss
@import './base.scss';

@import './alert.scss';
/* ...所有组件样式... */
@import './upload.scss';
```

清洗样式和我们在其它项目中常对 CSS 做的 PostCSS 处理差不多，即格式化 CSS，搞定兼容性问题。这之后，将格式化后的 CSS 和所依赖的资源，拷贝到待转移目录：

```js
// 处理兼容性，转换、压缩后复制到 ./lib
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

// 字体文件也需要拷贝过去
function copyfont() {
  return src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(dest('./lib/fonts'));
}

exports.build = series(compile, copyfont);
```

最后使用 cp-cli[^cp-cli] 指令将待转移目录中的所有资源拷贝到库文件夹下，这样就完成了样式文件从自动生成，预处理，到导出整个流程。

[^cp-cli]: 拷贝操作依赖了 cp-cli@npm，可以简单理解为拷贝指令的NodeJS 版。

#### 摇树优化

有一点值得注意的是，在使用 Gulp 处理样式文件时，compile 函数通过 `src('./src/*.scss')` 选择了 packages 目录下所有的样式（不仅包括样式入口文件，还包括所有的组件样式文件，如 alert.scss）。既然已经在第一步生成了带引入所有主题样式的入口文件，为啥还要 Gulp 要单独处理所有组件样式呢？这是为了方便外部项目引入 ElementUI 后单独引入某个组件时可选的摇树优化。配合 babel-plugin-component，可以减小项目打包体积。

babel-plugin-component 会把 import 语法进行转换[^babel-plugin-component]：

[^babel-plugin-component]: [https://www.npmjs.com/package/babel-plugin-component](https://www.npmjs.com/package/babel-plugin-component)

```js
// 源代码
import { Button } from 'components'
```

```js
// 转化后
const button = require('components/lib/button')
require('components/lib/button/style.css')
```

可以看到，转换后的代码，单独依赖了组件样式。

#### 图标样式处理

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

## 帮助函数

## 组件逻辑

### Clickble

## 阅读更多

* [Make 基础语法以及在 ElementUI 中的运用](https://juejin.im/post/6844903775912591368)