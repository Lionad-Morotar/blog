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

## 速记

#### 如何设置淘宝源？

```bash
npm set registry https://registry.npm.taobao.org
```