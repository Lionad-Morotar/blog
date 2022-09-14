# NPM

[TOC]

## package.json

参阅：

* [package.json document](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)

#### 常用字段有哪些？

```js
{
  // 用来标记当模块作为依赖时必要的文件范围，默认值是 '*'。
  files: ['*'],
}
```

#### main 和 module 字段有什么不同？

main 标记了程序的主入口。按约定惯例，main 标记了 ES5 语法的打包好的文件，以便其他库在引用时无需再对 main 标记的入口二次编译打包。module 标记了程序的 ES6 模块规范语法的主入口，以便支持 ES6 Module 的打包工具引入该模块时启用摇树优化。pkg.module 最早由 Rollup 使用，Webpack 现在也支持该属性，但它不是 package.json 的正式属性。

见：[聊聊 package.json 文件中的 module 字段](https://blog.csdn.net/sd19871122/article/details/122405592)

## 速记

#### 如何设置淘宝源？

```bash
npm set registry https://registry.npm.taobao.org
```