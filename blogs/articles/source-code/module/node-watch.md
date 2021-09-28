# node-watch

[TOC]

## 简介

node-watch 是一个用来监听文件变化的库，它封装了 fs.watch，带来更强的功能以及提供了更合理的 API。

## 实现

从提交历史来看，最初的提交的代码非常简单，几乎是只多了一个递归监听功能。在 normalizeCall 函数中使用计时函数，把回调往后延迟了 100ms，防止短暂时间内同一个文件多次修改（比方说某些编辑器保存文件时会先生成一个临时文件）。

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

由于 fs.watchFile 可能导致[高 CPU 负载等问题](https://nodejs.org/api/fs.html#fs_fs_watchfile_filename_options_listener)，watch 文件时使用 watch 其父目录作替代，并通过匹配事件参数是否和此文件同名来判断是否要触发回调函数。

```js
if (is.file(fpath)) {
  var parent = path.resolve(fpath, '..')
  fs.watch(parent, function(evt, fname) {
    if (path.basename(fpath) === fname) {
      normalizeCall(fpath, options, cb)
    }
  })
} 
```

如果目录中带有符号链接，node-watch 会默认跟踪下去，同时使用一个默认的 maxSymbolLevel 数字配置项，设置最大跟踪层数，防止死循环或性能问题。

```js
function watch(fpath, options, cb) {
  if (is.symbolic(fpath) 
    && !(options.followSymLinks 
      && options.maxSymLevel--)) {
    return
  }
}
```

NodeJS 文档提到，fs.watch 的 recursive 选项在 Linux 中是无效的，因为 fs.watch 的实现依赖具体操作系统底层 API。所以到底要不要用原生的 recursive 选项需要提前判断一下，node-watch 的实现挺粗暴，直接使用 IO 操作去检测：先到系统临时文件目录创建一些文件夹，然后监听它们并删除里面的内容，如果超时了还没有触发 watcher 的 change 事件，那就说明不是原生支持 recursive 选项。

```js
var IS_SUPPORT

try {
  watcher = fs.watch(parent, options)
} catch (e) {
  if (e.code == 'ERR_FEATURE_UNAVAILABLE_ON_PLATFORM') {
    return fn(IS_SUPPORT = false)
  } else {
    throw e
  }
}

var timer = setTimeout(function() {
  watcher.close()
  stack.cleanup(function() {
    fn(IS_SUPPORT = false)
  })
}, 200)

watcher.on('change', function(evt, name) {
  if (path.basename(file) === path.basename(name)) {
    watcher.close()
    clearTimeout(timer)
    stack.cleanup(function() {
      fn(IS_SUPPORT = true)
    })
  }
})
```

Watcher 向外暴露对象这里有个小细节。由于 Watcher 的原型是 events.EventEmitter，所想向外暴露时需要走代理，仅暴露指定方法的使用。

```js
Watcher.prototype.expose = function() {
  var expose = {}
  var self = this
  var methods = [
    'on', 'emit', 'once',
    'close', 'isClosed',
    'listeners', 'setMaxListeners', 'getMaxListeners',
    'getWatchedPaths'
  ]
  methods.forEach(function(name) {
    expose[name] = function() {
      return self[name].apply(self, arguments)
    }
  })
  return expose
}
```

监听路径支持传数组，我们当然希望就算是数组，也是由同一个 EventEmitter 来管理事件的，传入的是既然是数组，那么自然会生成多个 watcher 实例，只不过代码中使用了 composeWatcher 函数，把这些事件整合并向外发送。

```js
function composeWatcher(watchers) {
  // 使用一个新的 watcher 整合事件列表
  var watcher = new Watcher()
  var filterDups = createDupsFilter()
  var counter = watchers.length

  watchers.forEach(function(w) {
    w.on('change', filterDups(function(evt, name) {
      watcher.emit('change', evt, name)
    }))
    w.on('error', function(err) {
      watcher.emit('error', err)
    })
    w.on('ready', function() {
      if (!(--counter)) {
        emitReady(watcher)
      }
    })
  })

  watcher.close = function() {
    watchers.forEach(function(w) {
      w.close()
    })
    process.nextTick(emitClose, watcher)
  }

  watcher.getWatchedPaths = function(fn) {
    if (is.func(fn)) {
      var promises = watchers.map(function(w) {
        return new Promise(function(resolve) {
          w.getWatchedPaths(resolve)
        })
      })
      Promise.all(promises).then(function(result) {
        var ret = unique(flat1(result))
        fn(ret)
      })
    }
  }

  return watcher.expose()
}
```

## 测试

TODO

## 工具函数

从库中还能整理出几个工具函数来。

通过索引快速去重。

```js
function unique(arr) {
  return arr.filter(function(v, i, self) {
    return self.indexOf(v) === i
  })
}
```

获取 UUID。

```js
const getUUID = () => Math.random().toString(16).substr(2)
```

## 考虑的点

最后总结一下一些框架设计相关的小细节，如果需要自己设计一个 fs.watch，可能要做以下考虑：

* 使用原生依赖吗？使用原生依赖会带来更高的性能，但是也会增加代码难度以及测试的复杂度
* 支持本地符号路径吗？支持网络路径吗？
* 如何控制包的大小？
* 由于不同系统的底层依赖不同，那么 API 要怎么设计，屏蔽底层，才能便于使用？

也注意到一些有意思的问题：

* Windows，删除正在监听的文件夹，[会发生什么事情？](https://github.com/nodejs/node/issues/31702)
* Linux，单个进程能操作的文件数量有上限，[该怎么解决？](https://github.com/nodejs/node-v0.x-archive/issues/2479)
* 碰到操作系统或应用层面的问题，导致文件在短时间内多次触发更新，[怎么处理呢？](https://github.com/yuanchuan/node-watch/blob/4cac915ab7cb5cc6a95263712e9def1004c35f78/lib/watch.js#L68)

## 题外话

##### <Link type='h5' to='https://mgear-file.oss-cn-shanghai.aliyuncs.com/Recursive%20Node.js%20fs.watch%20on%20Linux%20-%20Stack%20Overflow.html' source='https://stackoverflow.com/questions/43112227/recursive-node-js-fs-watch-on-linux' >《Recursive Node.js fs.watch on Linux》</Link>

这个回答中的 node-watch 为啥会被踩，我没看很懂。

## 其它资料

相关类库：

* [watcher](https://www.npmjs.com/package/watcher)
* [chokidar](https://github.com/paulmillr/chokidar)
* [nsfw](https://github.com/Axosoft/nsfw)

推荐阅读：

* [《node-watch、Chokidar封装思路解析》](https://juejin.cn/post/7000262974430511117)
* [《如何利用 Nodejs 监听文件夹》](https://www.jianshu.com/p/09dae09457fa)
