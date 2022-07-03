# Promise

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
