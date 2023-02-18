---
meta:
  - name: keywords
    content: JavaScript,defineProperty,响应式,reactive,状态管理,观察者,发布订阅,小程序,小程序刷新页面
  - name: description
    content: 本文介绍了在150行代码内使用defineProperty实现一个简单的拥有事件发布订阅能力的状态管理库的思路。
---

# 🚀 150 行代码带你实现小程序中的数据侦听

[TOC]

## 前言

在小程序项目中, 我们的通常会使用到使用到一个全局对象作为各个页面通用的数据存储容器, 将它绑定到 app 对象后, 就能在每一个页面都自由的操纵这个对象. 然而在实践中, 由于这个对象及其属性不具备响应式条件, 它不能直接参与业务逻辑的编写, 能力仅仅局限于数据储存. 若是在 VueJS 项目中, 我们可能经常使用到`Vue.$watch`去侦听某个数据是否发生变化, 小程序却缺乏这种能力.

在这篇文章中, 我将用 150 行代码, 手把手带你打造一个小程序也可以使用的侦听器(下简称 VX):

```JS
// 一个快速赋值的语法糖函数, 可以创建结构为 { value: a { b: { val: ''} } } 的对象
vx.set('value.a.d', { val: '' })
// 对某个属性进行侦听, 如果发生改变, 则执行相应函数(可多次watch以执行多个函数)
vx.watch('value.a.d.val', newVal => {
  console.log(`val改变为 : `, newVal)
})
value.a.d.val = 3 // val改编为 : 3
```

使用 VX 侦听器, 我们可以更加方便的管理各个页面的状态. 同时, 我们凭借`watch`语法, 可以更优雅地编写业务逻辑.

坐稳了, 三轮车准备启动了~ 各位评论见~ 😋

## 稍微理一理思路

在全局对象中, 我们不一定要对每一个属性都进行侦听, 所以 VX 主要的功能就是通过 set 去设置某个具体属性的 setter/getter, 同时通过 watch 向添加该属性添加需要订阅的回调函数.

## 依赖对象的实现

首先我们需要造一个通用的**依赖对象**, 依赖对象携带一个订阅数组用于存放一组回调函数, 同时它还应该包括一些操作订阅数组能力(如添加订阅, 清空订阅)的函数

```JS
class Dep {
  constructor () {
    this.subs = []
  }
  // 将回调添加到数组中
  addSub (fn) { /*...*/ }
  delSub (fn) { /*...*/ }
  // 执行数组中每一项函数
  notify (newVal, oldVal) {
    this.subs.forEach(func => func(newVal, oldVal))
  }
}
```

全局对象中每一个响应式属性(及其每一个子属性), 都应该和一个新的 Dep 实例保持一一对应的关系, 这样我们进行侦听变化, 执行订阅的回调函数时, 只需要找到对应的实例执行`notify`通知更新即可.

## 设置响应式属性

### defineProperty

可能是因为接触 DefineProperty 要比接触 Proxy 早一些的缘故, 代码使用了前者进行响应式的实现, Object.defineProperty 方法会直接在一个对象上定义一个新属性, 这里快速过一遍`defineProperty`具体配置:

```JS
// @param obj 要在其上定义属性的对象
// @param key 要定义或修改的属性的名称
Object.defineProperty(obj, key, {
  // 该属性是否能被枚举
  enumerable: true,
  // 该属性能否被删除
  configurable: true,
  // 访问该属性则会执行此方法
  get: () => {
    return val
  },
  // 修改该属性时会执行此方法
  set: newVal => {
    val = newVal
  },
  // value & writeble 不能和 getter/setter 同时出现
})
```

通过对 defineProperty 进行上层封装, 我们可以轻松的实现在全局对象上设置响应式属性功能, 在此, 我们结合刚才定义的 Dep 对象, 将一个新的 dep 实例绑定到新增属性的 setter 中:

```JS
set (key, val, options = {}, obj = this.store) {
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: () => {
      return val
    },
    set: newVal => {
      if (newVal === val) {
        return
      }
      dep.notify(newVal, val)
      val = newVal
    }
  })
}
```

每当对应属性被赋值, 就会执行依赖数组中的回调函数.

不过这样还不够, 我们还得想办法获取到这个 dep 实例, 才能给它的依赖数组填充函数.

这边提供一个很简单的思路, 并不推荐实践中这么做:

```js
set (key, val, options = {}, obj = this.store) {
  const dep = new Dep()
  Object.defineProperty(obj, key, {})
  return dep
}
```

```JS
const valueDep = set('value', b, {})
valueDep.addSub(() => { console.log('value changed!') })
```

虽然代码能使用了, 就是是看起来怪怪的~ 😋 我们的三轮车开进了岔路~

## 通过 watch 添加订阅

### 喝口水我们继续

《黑客与画家》中曾经提到这样一个观点, 我深有体会:

> 如果你觉得你的代码奇怪, 那么往往它是错的

上面的那一串代码仅仅是能跑通的水平, 我们需要加入更多的细节和思考, 有时候只需要坐下来稍微看一下代码, 就会有各种想法蹦出来:

> 构思这种东西有一个特点，那就是它会导致更多的构思。你有没有注意过，坐下来写东西的时候，一半的构思是写作时产生的？

### 隐藏 Dep

这些内容应和外部是解耦的. 首先一点, 我们创建一个侦听器类, 用于封装我们侦听所用到的所有方法, 它包含了我们想要的全局对象以及操作它的方法(如 watch,set):

```JS
class VX {
  constructor () {
    this.store = Object.create(null)
  }
  watch (key, fn, obj = this.store) {}
  set (key, val, options = {}, obj = this.store) {}
}
const vx = new VX()
```

我们可以在 watch 中给对象某个属性添加回调, 就不用去直接操作 Dep 依赖数组了. 只是, 我们在业务代码中调用 watch, 要怎么去获取 obj.key 对应的 dep 呢?

我们设置一个全局的 depHandler, 在 obj.key 的 getter 中主动将 depHandler 设置为当前 obj.key 的 dep 实例, 那么我们在 watch 函数里, 只要用任意操作触发 obj.key 的 getter, 就能通过 depHandler 得到它的 dep 实例了, 代码形如:

```js
  // 一开始没有持有dep实例
  let handleDep = null
  class VX {
    watch (key, fn, obj = this.store) {
      console.log(obj.key) // 使用任意操作触发obj.key的getter, 那么handleDep将自动引用obj.key的dep实例
      handleDep.addSub(fn)
    }
    set (key, val, options = {}, obj = this.store) {
      const dep = new Dep()
      Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: () => {
          handleDep = dep
          return val
        },
        set: newVal => {}
      })
    }
  }
```

### 主动收集依赖

我们增加`handleDep.addSub(fn)`添加回调函数的逻辑, 其实可以直接放到 getter 中, 首先在 Dep 类中封装一个'主动'收集依赖的`collect`方法, 他会将全局`handleFn`存放到订阅数组中, 这样一来, 在 watch 函数中, 我们只要触发 obj.key 的 getter, 就可以主动收集依赖了:

```JS
let handleFn = null
class Dep {
  addSub (fn) {}
  delSub (fn) {}
  clear () {}
  collect (fn = handleFn) {
    if (fn && !this.subs.find(x => x === fn)) {
      this.addSub(fn)
    }
  }
  notify (newVal, oldVal) {}
}

let handleDep = null
class VX {
  watch (key, fn, obj = this.store) {
    handleFn = fn
    console.log(obj.key)
  }
  set (key, val, options = {}, obj = this.store) {
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: () => {
        handleDep = dep
        handleDep.collect()
        return val
      },
      set: newVal => {}
    })
  }
}
```

## 处理 key 值为对象链的情况

在先前的 watch 函数中, 我们使用 console.log(obj.key)去触发对应属性的 getter, 如果我们调用方式是`watch('a.b.c')`就无能为力了. 这里我们封装一个通用方法, 用于处理对象链字符串的形式:

```JS
// 通过将字符串'a.b'分割为['a', 'b'], 再使用一个while循环就可以走完这个对象链
function walkChains (key, obj) {
  const segments = key.split('.')
  let deepObj = obj
  while (segments.length) {
    deepObj = deepObj[segments.shift()]
  }
}
class VX {
  watch (key, fn, obj = this.store) {
    handleFn = fn
    walkChains(key, obj)
  }
}
```

在 set 方法中处理对象链字符串稍微有些不同, 因为如果`set('a.b')`时, 没有在我们全局对象中找到 a 属性, 这里应该抛错.

实际的处理中, 需要推断'obj.a'以及'obj.a.b'是否存在. 假设没有'obj.a', 那么我们应该创建一个新的对象, 并且给新的对象添加属性'b', 所以代码类似`walkChains`函数, 只是稍作一层判断:

```JS
set (key, val, obj) {
  const segments = key.split('.')
  // 这里需要注意, 我们只处理到倒数第二个属性
  while (segments.length > 1) {
    const handleKey = segments.shift()
    const handleVal = obj[handleKey]
    // 存在'obj.a'的情况
    if (typeof handleVal === 'object') {
      obj = handleVal
    // 不存在'obj.a'则给a属性赋一个非响应式的对象
    } else if (!handleVal) {
      obj = (
        key = handleKey,
        obj[handleKey] = {},
        obj[handleKey]
      )
    } else {
      console.trace('already has val')
    }
  }
  // 最后一个属性要手动赋值
  key = segments[0]
}
```

## 业务场景应用

### 小程序跨页面刷新数据

我们经常碰到在小程序中由 A 页面跳转到 B 页面, 如果 B 页面进行了一些操作, 希望 A 页面自动刷新数据的情况. 但是由于 A 页面跳转到 B 页面不同(也许是 redirect,也许是 navigate), 处理方法也不尽相同.

使用 navigate 方式跳转后, A 页面不会被注销, 所以我们一般会通过全局对象去贮存 A 页面实例(也就是 A 页面的 this 对象), 然后在 B 页面直接调用相应的方法(如 A.refreshList())进行刷新操作.

引入 VX 后, 我们可以在`onload`生命周期直接调用 watch 方法添加订阅:

```JS
// app.js
import VX from '@/utils/suites/vx'
const vx = new VX()
app.vx = vx
app.store = vx.store
app.vx.set('userType', '商户')

// page a
onLoad () {
  app.vx.watch('userType', userType => {
    if (userType === '商户') {
      // ...
    } else if (userType === '管理员') {
      // ...
    }
  }, {
    immediate: true
  })
}

// page b
switchUserType () {
  app.store.userType = '管理员'
}
```

## 可能遇到的问题

### 给 watch 方法添加的函数设置立即执行

有的时候我们希望通过 watch 添加函数的同时还立即执行该函数一次, 这个时候我们需要再定义额外的参数传递到 watch 中. 问题是这个函数不一定是同步函数.

简单处理如下:

```JS
class VX {
  async watch (key, fn, options = { immediately: false }, obj = this.store) {
    handleDep = fn
    walkChains(key, obj)
    options.immediately && await fn(options.defaultParams)
  }
}
```

### this 绑定丢失问题

在我在对 VX 进行删除属性方法的扩展时, 我往 walkChain 函数中添加了一个执行回调函数的机制, 并且在删除属性这个方法直接调用了 walkChain:

```js
  function walkChains (key, obj, fn) {
    const segments = key.split('.')
    let deepObj = obj
    while (segments.length) {
      deepObj = deepObj[segments.shift()]
      fn && fn()
    }
  }
```

```JS
del (key, obj = this.store) {
  walkChains(key, obj, handleDep.clear)
  delete obj[key]
}
```

因为 handleDep.clear 当成参数传递进 walkChains 中会**丢失 this 绑定**, 所以上面那段代码其实是有问题的, 不过稍作修改就好了:

```js
  del (key, obj = this.store) {
    walkChains(key, obj, () => handleDep.clear())
    delete obj[key]
  }
```

## 后语

在这篇文章中, 我们通过对 defineProperty 进行封装, 实现了一个简单的对象属性侦听器的功能, 以弥补小程序所没有的\$watch 能力. 在此基础上, 各位可以再对 VX 进行扩展, 更方便地去书写业务代码.

完整代码 [GitHub 直达](https://github.com/Lionad-Morotar/media-gear/blob/master/src/renderer/utils/suites/vx/index.js)


