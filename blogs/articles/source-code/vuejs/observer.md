# VueJS | Observer

[TOC]

## 读源码前

- 从 GitHub 克隆一份 vue@2 在 dev 上的分支
- 使用 flow-remove-types 将 src 目录下的 flow 文件转换为普通的 JS
- 使用 PowerShell 的 tree 指令输出 src 目录的树形结构，以理解源码结构

## 目录结构

可以大致根据目录将源码拆分为几个部分：

```
├─compiler // 模板编译相关
│  ├─codegen  // 代码生成器
│  ├─directives // 指令解析器
│  └─parser // 模板解析器
├─core  // 核心代码
│  ├─components // component 相关 API
│  ├─global-api // 全局 API
│  ├─instance
│  │  └─render-helpers
│  ├─observer // 响应式属性
│  ├─util // 工具函数
│  └─vdom // 虚拟节点
│      ├─helpers
│      └─modules
├─platforms // 平台相关代码
├─server  // 服务端渲染相关代码
│  ├─bundle-renderer
│  ├─optimizing-compiler
│  ├─template-renderer
│  └─webpack-plugin
├─sfc // SFC 结构解析器
└─shared  // 工具函数
```

## 变化侦测

> 去年读变化侦测的时候，借着项目的机会，实现过一个轻量的状态管理：[state-vex](https://github.com/takecloud/state-vex)，用到了 VueJS 响应式绑定相关的一些内容。

### 侦测类

Vue 通过 Observer 把对象的所有属性转化为带有能收集依赖并触发依赖更新的 setter/getter。setter/getter 调用时，分别收集依赖、触发依赖更新。Observer 还能遍历数组元素。但是更新依赖的方法放在了数组原型方法中，比如 Array.prototype.splice，用包装器将其增强，就能在调用时同时调用更新依赖的函数。

简而言之，Observer 使对象“可观测”，即“变化侦测”中的“侦测”。通过 observe 函数，我们能命令式地侦测一个对象。

```js
function observe(value, asRootData) {
  ob = new Observer(value)
  return ob
}

class Observer {
  constructor(value) {
    this.value = value
    // 初始化依赖容器
    this.dep = new Dep()
    this.vmCount = 0
    // 将侦测实例实例挂载到对象上方便访问
    def(value, '__ob__', this)
    // 如果是数组，则给它挂载带有依赖收集及触发依赖更新增强的原型函数，并遍历元素设置响应式属性；
    // 如果是对象，则遍历对象的每一个值并递归遍历子对象，设置响应式属性
    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  walk(obj) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }

  observeArray(items) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}
```

### 监测数组变化

因为数组没有 setter/getter，所以使用数组时，没有办法做响应式更新。Vue 通过增强器，给会改变数组元素的一些原型方法做了增强，使得调用这些方法时，调用更新依赖。

```js
// 需要增强的方法
const methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']

methodsToPatch.forEach(function(method) {
  // cache original method
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator(...args) {
    // 先执行方法获取结果，而不是先通知依赖更新，这个顺序要注意
    const result = original.apply(this, args)
    // observer 在设置响应式属性时就被挂载在了对象的 \_\_ob\_\_ 属性中
    const ob = this.__ob__
    // inserted 用来保存数组中新增的元素，这些新增元素也需要遍历并设置响应式更新
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    // 通知依赖更新
    ob.dep.notify()
    return result
  })
})
```

### 响应式属性

设置响应式属性对应源码中的 definedProperty 这个函数，同时，还提供了 set、del 方法，分别用来给一个对象新增、删除属性及响应式属性。

```js
function defineReactive(obj, key, val, customSetter, shallow) {
  // 每个属性都保持了一个依赖容器，
  // 所有依赖都会存放在这个依赖容器实例中
  const dep = new Dep()

  // 不给属性描述符不可变的对象设置 setter/getter
  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) {
    return
  }

  // 保存属性原有的 setter/getter，不做破坏
  // cater for pre-defined getter/setters
  const getter = property && property.get
  const setter = property && property.set
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }

  // 侦测值的变化
  let childOb = !shallow && observe(val)

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      const value = getter ? getter.call(obj) : val
      // 收集依赖
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reactiveSetter(newVal) {
      const value = getter ? getter.call(obj) : val
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      // 非生产环境：自定义 setter 副作用
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) return
      // 使用原有的 setter 更新值或直接更新值
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      // 侦测子对象的变化
      childOb = !shallow && observe(newVal)
      // 通知依赖更新
      dep.notify()
    }
  })
}
```

### 依赖容器及依赖

接下来进入比较绕的部分。首先回答：依赖容器是什么？

刚刚看到了 dep.notify 的作用是“通知依赖更新”，所以 Dep 就是依赖容器。

我们上小节说到，每个属性都保持了一个依赖容器，所有依赖都会存放在这个依赖容器实例中。所以依赖容器还提供了统一更新依赖、删除依赖之类的方法。

```js
class Dep {
  constructor() {
    this.id = uid++
    this.subs = []
  }
  // 添加依赖
  addSub(sub) {
    this.subs.push(sub)
  }
  // 删除依赖
  removeSub(sub) {
    remove(this.subs, sub)
  }
  // 收集依赖
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }
  // 通知依赖更新
  notify() {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}
```

依赖容器和依赖之间是存在耦合的，所以我们看到收集依赖的这个地方，仅仅调用了依赖的 addDep 方法，没有调用 addSub 把添加依赖。其实，addSub 是在依赖的 addDep 方法中调用的。这个和观察者模式离不开关系，在观察者模式中，观察者直接观测目标，并相应目标做出的通知。Watcher 直接观测响应式数据，当数据发生变更时，就能收到通知。但由于数据和观察者是多对多的关系，所以需要 Dep 依赖容器这么一个东西用来保存 Watcher 与数据的关系。

![变化侦测](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20200810100326.png?w=70)

Dep.target 用来表示当前依赖，并且源码维护了一个依赖栈，通过提供的 pushTarget、popTarget 方法维护依赖栈及当前依赖（状态）。看以下代码：

```js
// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null
const targetStack = []
function pushTarget(target) {
  targetStack.push(target)
  Dep.target = target
}
function popTarget() {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}
```

既然 Dep 用来存放 Watcher，是依赖容器，那么，依赖就是 Watcher。

Watcher 通过调用我们刚才提到的 pushTarget、popTarget 以维护全局的当前依赖（Dep.target）。全局的当前依赖只会有一个，因为 JS 是同步的，顺序执行的代码。我们先来看看 Watcher 怎么样维护当前依赖。

```js
class Watcher {
  // 依赖实例通过 get 方法获取对象属性的值，以触发属性的 getter 以重收集依赖
  // 这里的“重收集”，意味着将当前依赖重新添加到不同对象的属性的依赖容器中
  // 所以在这里需要使用 pushTarget、popTarget 维护全局的当前依赖
  get() {
    pushTarget(this)
    let value
    // vm 即该依赖对应的 Vue 实例，这个后续会介绍
    const vm = this.vm
    // 触发 getter 更新
    try {
      value = this.getter.call(vm, vm)
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
      // 如果依赖设置了 deep 选项，那会触发对应 value 的所有键的依赖更新
      // traverse 即递归读取对象的每一个元素
      if (this.deep) {
        traverse(value)
      }
      popTarget()
      // 因为每次 get 之后都重收集了依赖，
      // 这里会把没有用的依赖给清除掉（调用依赖容器的 removeSub 移出依赖）
      this.cleanupDeps()
    }
    return value
  }
}
```

Vue 实例中，data 方法会返回一个新的对象，这个对象能将值的变化响应式更新到模板中。其实就是，新的对象返回来后，使用了 observe 方法观测其变化，而其每一个属性的依赖容器中，都会保存这个 Vue 实例的 watcher。这样一来，只要属性发生了变化，依赖容器就会通知 Vue 实例的 watcher 进行更新。至于要更新什么，那当然是“执行回调函数”啦。想象一下 Vue 实例中的 watch 的写法：

```js
new Vue({
  data() {
    return {
      b: null
    }
  },
  watch: {
    b() {
      console.log("I'm callback")
    }
  }
})
```

这个 watch 不就是（尝试）给 data.b 设置响应式属性么... 所以说依赖就是 Vue 实例与响应式属性之间的对应关系。Watcher 保存了这种关系，还保存了响应式数据、回调函数等一些额外信息。我们看 Watcher 的构造器：

```js
class Watcher {
  constructor(vm, expOrFn, cb, options, isRenderWatcher) {
    // vm 即 Vue 实例
    this.vm = vm
    if (isRenderWatcher) {
      vm._watcher = this
    }
    // Vue 实例可能对应多个 watcher，比如 vm.$data、vm.$watch
    vm._watchers.push(this)

    // options
    if (options) {
      this.deep = !!options.deep
      this.user = !!options.user
      this.lazy = !!options.lazy
      this.sync = !!options.sync
      this.before = options.before
    } else {
      this.deep = this.user = this.lazy = this.sync = false
    }
    this.cb = cb
    this.id = ++uid // uid for batching
    this.active = true
    this.dirty = this.lazy // for lazy watchers
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()

    /* expOrFn 可以是函数或形如 'data.a.b.c' 的字符串
     * 若是字符串，对应的 getter 即读取 data.a.b.c 的值
     */
    this.expression = process.env.NODE_ENV !== 'production' ? expOrFn.toString() : ''
    // parse expression for getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      // parsePath 即将 'data.a.b.c' 按照 '.' 拆分并依次读值
      this.getter = parsePath(expOrFn)
    }

    this.value = this.lazy ? undefined : this.get()
  }
}
```

Watcher 是组件级别的，如果状态发生了变化，只能通知到组件。再由组件对比内部的虚拟节点的变化。换句话说，Vue 对响应式状态变化侦测只通知到组件，这意味着只要某个属性变化了，相应的组件都会重渲染。

---

TODO

## 阅读更多

- [《深入浅出 VueJS》](https://book.douban.com/subject/32581281/)
- [江山父老能容我 不使人间造孽钱](http://hcysun.me/vue-design/zh/)
