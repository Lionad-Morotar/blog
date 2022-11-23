# NPM

[TOC]

## package.json

参阅：

* [package.json document](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)
* [package.json 完全解读](https://juejin.cn/post/7145001740696289317)

#### 常用字段有哪些？

```js
{
  // 用来标记当模块作为依赖时必要的文件范围，默认值是 '*'。
  files: ['*'],
  // 条件导出，node 版本必须大于 14.13
  exports: {
    ".": {
      "require": "./index.js",
      "import": "./index.mjs"
    }
  }
  // 覆盖依赖的子依赖版本，yarn 需使用 resolution 字段
  overrides: {
    "A": {
      "foo": "1.1.0-patch",
    }
  },
  // 副作用字段标记了代打包工具一但引入便没法再使用摇树手段把它去掉的文件
  sideEffects: [
    "styles/*.js",
  ],
}
```

#### main 和 module 字段有什么不同？

main 标记了程序的主入口。按约定惯例，main 标记了 ES5 语法的打包好的文件，以便其他库在引用时无需再对 main 标记的入口二次编译打包。module 标记了程序的 ES6 模块规范语法的主入口，以便支持 ES6 Module 的打包工具引入该模块时启用摇树优化。pkg.module 最早由 Rollup 使用，Webpack 现在也支持该属性，但它不是 package.json 的正式属性。

见：[聊聊 package.json 文件中的 module 字段](https://blog.csdn.net/sd19871122/article/details/122405592)

## 配置

#### 不同 npmrc 的优先级？

项目内的 > 用户目录下的 > 全局配置文件 > 包管理器自带的

## 镜像源

#### 如何设置淘宝源？

```bash
# 淘宝源更换过地址，所以`https://registry.npm.taobao.org`已失效
npm set registry https://registry.npmmirror.com
```

#### 如何对比不同源的速度？

```bash
npx nrm test
```

见：[NRM Document@GitHub](https://github.com/Pana/nrm#usage)

#### 如何安装不同来源的依赖？

* 在域下发布私有包，并给域配置 registry
* 安装包时指定 registry（如 npm install vue --registry=xxx） 

见：[pnpm 不能安装不同来源的包](https://github.com/pnpm/pnpm/issues/5581)
