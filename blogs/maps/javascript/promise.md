# Promise

## TODO

* [How can I synchronously determine a JavaScript Promise's state?](https://stackoverflow.com/questions/30564053/how-can-i-synchronously-determine-a-javascript-promises-state/52790734#52790734)
* [Promise 被玩出 48 种“花样”，深度解析10个常用模块](https://juejin.cn/post/6999804617320038408)
* [[译] 如何取消你的 Promise？](https://juejin.cn/post/6844903533393772557#comment)

## Promise A+

#### Promise.resolve(1).then(2).then(log)

then 方法中如果不是函数，那么会被忽略。

```js
Promise.resolve(1)
  .then(2)
  .then(data => console.log(data + 1))
  // -> 2
```

见：[Promise/A+ #point-23](https://promisesaplus.com/#point-23)

#### Promise.resolve(1).then(() => 2)

Promise.then 以及 catch 和 finally 方法都返回一个新 Promise。如果 then 方法中 return 了值 x，x 会进入 Promise.then 的 PRP 过程（Promise Resolution Procedure），可比作：Promise.then.resolve(x)。

```js
Promise.resolve(1).then(() => 2)
// -> Promise {<fulfilled>: 2}
Promise.reject(1).then(() => 2, () => 3)
// -> Promise {<fulfilled>: 3}
```

见：[Promise/A+ #point-41](https://promisesaplus.com/#point-41)

#### 多次执行 resolve 会发生什么？

多次执行 resolve 只有第一次有效。已经确定状态的 Promise 不能再改变状态，所以再次执行 resolve 或 reject 都不会发生任何事（为什么不抛错，真是奇怪的设计）。

```js
new Promise(resolve => (resolve(1), resolve(2)))
  .then(data => console.log(data))
  // -> 1
```


见：[Promise/A+ #point-59](https://promisesaplus.com/#point-59)

#### 使用 Promise 设计一个可以取消请求的请求函数？

```js
function request (url) {
    return new Promise(resolve => {
        setTimeout(() => resolve(url), 1000)
    })
}
let abort
let abortController = new Promise(resolve => abort = resolve)
Promise
  .race([request('123'), abortController])
  .then(data => console.log(data))
abort()
```

注意，Promise.race 以及 Promise.all 等函数尽管可以通过提前调用 then、catch 方法以达到特定目的，但是不会影响其它作为入参的 Promise 的正常执行。

#### 一些关于 Promise 的综合问题？

```js
// 考察事件循环
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('resolve3');
    console.log('timer1')
    new Promise(r => r('promise1')).then(console.log)
  }, 0)
  resolve('resovle1');
  resolve('resolve2');
}).then(res => {
  console.log(res)
  setTimeout(() => {
    console.log(p1)
    new Promise(r => r('promise2')).then(console.log)
  }, 1000)
}).finally(res => {
  console.log('finally1', res)
  throw new Error('error1')
}).catch(err => {
  console.log(err)
  throw new Error('error2')
}).catch(err => {
  console.log(err)
}).then(res => {
  console.log(res)
}).finally(res => {
  console.log('finally2', res)
})
```

```js
// 考察 Promise 原理
const promise = Promise.resolve(1)
  .then()
  .then(data => {
    return Promise.reject('error')
      .then(_ => console.log('result is ' + data))
      .catch(err => console.log(err))
      .then(_ => console.log('result is not ' + data))
  })
promise.then(() => {
  console.log(promise)
})
```

### Links

[TODO，Promise A+](https://promisesaplus.com/#point-23)

## Bluebird

#### mapSeries 和 each 的区别？

mapSeries 类似 async 版本的 .map 方法，each 类似 map(asycn => {})；each 语义上用来执行有副作用的函数，函数的 return 对 each 的返回值无影响，each 将返回它接收到的值（fulfilled promise）。

见：[Promise.each](http://bluebirdjs.com/docs/api/promise.each.html)、[Promise.mapSeries](http://bluebirdjs.com/docs/api/promise.mapseries.html)、[Promise.each testcase](https://github.com/doodlewind/nativebird/blob/e55c3164dcaf33493d31f9eabbe50b3962219660/test/each.mjs)

#### try 有什么用？

Promise.try 将操作包含在 try 内，可以返回与 Promise 一致的实现形式的 Promise，以及带来了更好的错误处理和可读性。

```js
Bluebird.try(() => {
  // return Bluebird Promise,
  // and throwed error will be catch
  return database.getUser('lionad')
}).then(lionad => {
  // ...
}).catch(error => {
  // ...
})
```

见：[什么是 Promise.try，为什么它这么重要？](https://segmentfault.com/a/1190000018586947)

#### 为 map 的并发参数设计测试用例？

拿到 promise 的 resolve 函数，手动控制 promise fulfilled 的时机，并判断执行的队列和结果队列的长度。

```js
const tasks = []
const createTask = val => {
  let resolve
  const promise = new Promise(_resolve => resolve = _resolve)
  tasks.push(() => resolve(val))
  return promise
}
const results = []
Promise.all([
  // Run Tasks
  Promise.map([0,1,2], val => {
    return createTask(val).then(res => results.push(res))
  }, { concurrency: 2 }),
  // Check the length of tasks and results
  Promise.delay(100).then(() => {
    tasks.map(fn => fn())
    assert(tasks.length === 2)
    assert(results.length === 0)
  }).then(() => {
    assert(tasks.length === 2)
    assert(results.length === 2)
  }).delay(100).then(() => {
    tasks.map(fn => fn())
    assert(tasks.length === 3)
    assert(results.length === 2)
  }).then(() => {
    assert(tasks.length === 3)
    assert(results.length === 3)
  })
])
```

见：[Promise.map testcase](https://github.com/doodlewind/nativebird/blob/e55c3164dcaf33493d31f9eabbe50b3962219660/test/map.mjs#L247)
