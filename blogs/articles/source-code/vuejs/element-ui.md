# ElementUI

## 项目架构

#### 目录结构

首先是目录结构，相比一般的项目而言差异较大。

```
D:/@github/element
├── /.github        // Github 流程相关，包括贡献者列表、缺陷模板、PR 模板文件
├── /build          // 项目打包和部署相关脚本、Webpack 配置
├── /examples       // 代码示例（Element-UI 官网）
├── /packages       // Element-UI 模块源码
├── /src            // Element-UI 主要代码
├── /test           // 测试用例，主要分单元测试和 SSR 测试
├── /types          // 类型声明文件
└── components.json // 所有组件的名称对应路径的信息
```

#### 组件信息

所有的组件的路径信息都保存在 components.json 中，形如：

#### 处理样式

再看单个组件的文件结构。我们刚才提到 packages 文件夹中装有所有的 Elements 组件的源码，其内部每一个文件夹正好对应一个组件，如 packages/alert：

```
D:\@github\element\packages\alert
├── index.js
└── src
   └── main.vue
```

alert/index.js 对应组件的入口，它导出 install 函数用于组件注册：

```js
import Alert from './src/main'

Alert.install = function(Vue) {
  Vue.component(Alert.name, Alert)
}

export default Alert
```

样式对应 ElementUI 库其实是组件主题的概念。打包样式和打包 JS 是分开进行的，可以在 package.json 的脚本中找到用于打包样式文件的命令：

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

gen-cssfile 给所有的主题都生成一个带组件样式的入口文件（index.scss）。

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

给主题生成的样式入口文件形如以下代码：

```scss
@import './base.scss';
@import './alert.scss';
/* ...所有组件样式... */
@import './upload.scss';
```

生成的样式文件经过 Gulp 处理后，先暂存到样式文件的 lib 目录下：

```js
// 处理兼容性、转换、压缩后复制到 ./lib
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

最后使用 cp-cli（也就是 NodeJS 版拷贝命令）命令将主题目录 lib 下的文件整合到打包后的库文件代码中。

既然已经生成了带引入所有主题样式的入口文件，为啥还要 Gulp 要单独处理所有组件样式（`./src/*.scss`）呢？这是为了方便外部项目打包时的摇树优化，配合 babel-plugin-component 可以在引入组件时按需引入样式，减小项目打包体积。

babel-plugin-component 可以把 import 语法进行自动转换：

```js
// 源代码
import { Button } from 'components'
```

```js
// 转化后
const button = require('components/lib/button')
require('components/lib/button/style.css')
```
