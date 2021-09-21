# node-watch

[TOC]

## 简介

node-watch 是一个用来监听文件变化的库，它在 fs.watch 的基础上提供了更加更强的功能以及合理的 API 以适配后者在不同系统上的差异。

## 考虑的点

如果需要自己设计一个 fs.watch 可能需要考虑的点，以下列出。

* 如果路径中带有符号链接，会怎么处理？
* Windows，删除正在监听的文件夹，[会发生什么事情？](https://github.com/nodejs/node/issues/31702)
* Linux，单个进程能操作的文件数量有上限，[该怎么解决？](https://github.com/nodejs/node-v0.x-archive/issues/2479)

## 实现

从提交历史来看，最初的提交的代码非常简单，旨在提供一个能对文件夹内部进行递归监听的 watch 接口。

```js
//  https://github.com/yuanchuan/node-watch/commit/d2d8e2db4b771f918d67d261708752d8eb5c17b3
function watch(dir, cb) {
  if (is.File(dir)) {
    fs.watchFile(dir, function(err) {
      normalizeCall(cb, dir)
    })
    return
  }
  if (is.Directory(dir)) {
    fs.watch(dir, function(err, fname) {
      normalizeCall(cb,  
        path.join(dir, fname)
      )
    })
    fs.readdir(dir, function(err, files) {
      if (err) throw err
      files.forEach(function(n) { 
        var file = path.join(dir, n)
        if ( is.Directory(file) ) {
          watch(file, cb)
        }
      })
    })     
  }
} 
```

normalizeCall 使用延迟函数，把真实的回调往后延迟了 100ms，防止短暂时间内同一个文件多次修改（比方说某些编辑器保存文件时会先生成一个临时文件）。

**这样会有问题吗？**

如果目录中带有符号链接，node-watch 会默认跟踪，同时使用一个默认的 maxSymbolLevel 数字配置项，设置最大跟踪层数，防止性能问题以及死循环。

```js
function watch(fpath, options, cb) {
  if (is.symbolic(fpath) 
    && !(options.followSymLinks 
      && options.maxSymLevel--)) {
    return
  }
}
```