---
meta:
  - name: keywords
    content: JavaScript,策略模式,if-else,switch-case,配置逻辑分离
  - name: description
    content: 本文介绍了使用Map、双数组等结构仿制类似策略模式的写法以达成简化逻辑判断的效果，探讨了配置数据与业务逻辑分离这种写法的优势。
---

# 📝 你本可以少写些 if-else

[TOC]

> 他觉得 Blub 语言已经够用了，这时，他的思维就已被 Blub 同化了。
> <name>Paul Graham</name>

## 前言

我不喜欢业务代码中航天飞机式`if/else`语句, 它复杂而臃肿, 至少从美感而言, `switch`就比`if/else`优雅很多. 如果跨语言比较的话, 私以为 ReasonML 的模式匹配比起寻常的`switch`语句又要强上太多. JS 中对复杂判断的不同写法, 带来的感觉是很不同的, 这篇文章里, 我将简单介绍几种用于替代 if/else 的写法. 只有熟悉更多代码思路, 才能开阔我们的思维, **如果不能学习写代码的更多可能性, 也许我们就成了被代码控制住的人**.

## if/else

我们以一个售后流程为例. 用户购买商品后, 可能会因为错件漏件/质量问题/描述不符等原因联系商家进行售后服务, 其中可能会涉及退款/退货/换货/补发等售后支持服务, 商家对此次售后的服务情况也会影响用户对商家的喜好. 在这样的场景下, 我们假设以下伪代码:

```js
/* 买家根据不同的售后原因, 去寻求不同的售后支持 */
if (serviceReason === '错件漏件') {
  const action = randomIn(['退款', '补发'])

  if (action === '退款') {
    if (store.checked) {
      store.refund(somemoney)
      user.love(1) // 用户更喜欢这家店了
    } else {
      user.love(-1)
    }
  } else if (action === '补发') {
    if (store.checked) {
      store.mail(goods.AlphaStrike)
      user.love(2)
    } else {
      user.love(-2)
    }
  }
} else if (serviceReason === '质量问题') {
  const action = randomIn(['退款', '退货', '换货'])

  if (action === '退款') {
    if (store.checked) {
      store.refund(somemoney)
      user.love(3)
    } else {
      user.love(-3)
    }
  } else if (action === '退货') {
    if (store.checked) {
      user.mail(recievedGoods)
      store.refund(somemoney)
      user.love(4)
    } else {
      user.love(-4)
    }
  } else if (action === '换货') {
    if (store.checked) {
      user.mail(recievedGoods)
      store.mail(goods.AlphaStrike)
      user.love(5)
    } else {
      user.love(-5)
    }
  } else if (action === '描述不符') {
    // do ...
  } else if (action === '其它原因') {
    // do ...
  }
}
```

在这个场景下, 每一种售后原因导向的售后支持服务内容是不同的, 比如错件漏件时用户不能选择换货服务. 如此一来, 我们的判断条件也就成了一个`[售后原因 * 售后支持服务]`的二维列表. 此时再加上根据售后原因以及售后支持服务的不同, 判断条件妥妥地升为三维: `[售后原因 * 售后支持服务 * 用户喜好]`

显然, 在这种重业务逻辑的地方 if/else 语句显得力不从心, 主要原因如下:

1. **判断条件后置**. 也就是说, 在`} else if (serviceReason === '质量问题') {`一句中, 我们通常要在行末才能找到判断条件, 而些内容并没有高亮支持, 所以经常与下一行的普通代码混在一起, 让人眼花缭乱无法辨识.
2. **代码缩进不清晰**, 当判断层数增加, 或是花括号中的内容加长, 那么阅读代码的时候, 寻找 if 语句对应的结束位置总是给人带来负担.
3. **奢侈的换行**, 当 if/else 语句中的逻辑很短, 像`else { user.love(-5 }`这段代码, 占用了 3 行的位置显得过于奢侈.

## 三目运算符/短路表达式

在一些简单的表达式中, 可以使用三目运算符或短路表达式去简化判断, 如`user.love`这个函数的调用就可以抽成单独的一句, 所以下面这种判断完全可以进行简化:

```js
// 未经简化
if (store.checked) {
  store.refund(somemoney)
  user.love(1)
} else {
  user.love(-1)
}

// 简化后
store.checked && store.refund(somemoney)
user.love(store.checked ? 1 : -1)
```

## 逗号运算符

通过括号和逗号运算符, 我们可以把语句变成表达式去执行. 灵活运用逗号运算符可以使三目或短路支持一些更复杂的情况:

```js
if (action === '换货') {
  store.checked && (user.mail(recievedGoods), store.mail(goods.AlphaStrike))
  user.love(store.checked ? 5 : -5)
}
```

不过上述代码, 在 Standard 规范中是不被推荐的. ESLint 会警告你要求将这行内容转化为 if/else 写法. 当然, 你也可以修改 ESLint 规范以关闭警告, 前提是你(及团队成员)喜欢这种写法.

## switch/case

处理复杂的多分支判断时, 大部分人会选择使用 switch 作为长 if/else 的替代品, 你觉得下面这种写法如何呢?

```js
/* 买家根据不同的售后原因, 去获取不同的售后支持 */
switch (serviceReason) {
  case '错件漏件':
    const action = randomIn(['退款', '补发'])
    switch (action) {
      case '退款':
        store.checked && store.refund(somemoney)
        user.love(store.checked ? 1 : -1)
        break
      case '补发':
        store.checked && store.mail(goods.AlphaStrike)
        user.love(store.checked ? 2 : -2)
        break
    }
    break
  case '质量问题':
    const action = randomIn(['退款', '退货', '换货'])
    switch (action) {
      case '退款':
        store.checked && store.refund(somemoney)
        user.love(store.checked ? 3 : -3)
        break
      case '退货':
        store.checked && (user.mail(recievedGoods), store.refund(somemoney))
        user.love(store.checked ? 4 : -4)
        break
      case '退货':
        store.checked &&
          (user.mail(recievedGoods), store.mail(goods.AlphaStrike))
        user.love(store.checked ? 5 : -5)
        break
    }
    break
}
```

很遗憾, 看来 switch 语句并没有比 if/else 要好多少. 只是有一点我要强调, 在上面这个例子中, 所有有关判断的关键字的地方(如 switch, case, &&, 这些都属于代码高亮区域), 几乎都存在与每一行开头的前两个语元内. 所以目前为止, 单纯就搜寻判断条件的难度而言, switch 是要比 if/else 好上一些, 尽管这种好处会随着判断分支的增加而逐渐被消磨(这算是一种遗憾吧).

其实还有一个令我觉得遗憾的地方, switch 语句不能和短路运算符一并使用, 下面是一种错误的示范:

```js
switch (serviceReason) {
  case '质量问题':
    const action = randomIn(['退款', '退货', '换货'])

    store.checked && switch (action) { // 这是不合法的写法
      case '退款': // ...
      case '退货': // ...
      case '退货': // ...
    }

    if (store.checked) { // 这是合法的写法
      switch (action) {
        case '退款': // ...
        case '退货': // ...
        case '退货': // ...
      }
    }
}
```

稍微有些难受, 毕竟使用 if 判断会增加缩进. 现在让我们来看一种更加简洁的思路.

## 配置数据与业务逻辑分离

配置数据与业务逻辑分离(下简称配置逻辑分离)没有先决条件, 和三目短路表达式一样, 你随时都可以开始在代码中使用它. 使用配置逻辑分离, 通常需要定义一个用来存放数据配置的对象, 同时要定义一个`flag`作为配置的键, 配置的值则可以是函数, 数组等任意类型的值. 在执行逻辑的地方, 只需要将判断条件与`flag`进行比对, 就可以获取到当前判断条件下的业务逻辑方法:

```js
// 业务数据配置
const serviceHandler = {
  '错件漏件': {
    '退款': () => (store.checked && store.refund(somemoney), 1),
    '补发': () => (store.checked && store.mail(goods.AlphaStrike), 2)
  },
  '质量问题': {
    '退款': () => (store.checked && store.refund(somemoney), 3),
    '退货': () => (store.checked && (user.mail(recievedGoods), store.refund(somemoney)), 4)
    '退货': () => (store.checked && (user.mail(recievedGoods), store.mail(goods.AlphaStrike)), 5)
  }
}
// 业务逻辑执行
const handler = serviceHandler[serviceReason] || {} // 对搜寻结果进行'兜底'
const executor = handler[randomIn(Object.keys(handler))] || _ => _

const loveScore = executor() || 0
user.love(store.checked ? loveScore : -loveScore)
```

<ruby>有没有眼前一亮的感觉呢?<rt>暗示点赞</rt></ruby>

在上面的代码片段中, 我们将每一种状态的数据配置和执行业务逻辑的代码进行了一定层度的分离, 使得代码长度短了不少. 通过逗号运算符, 我们可以同时执行业务逻辑函数, 并且返回用户对店家的映像分数.

如果你不想这么激进, 也许下面的代码是一种好的实践:

```js
const serviceHandler = {
  '错件漏件': {
    '退款': () => ({ score: 1, cb: () => store.refund(somemoney) }),
    '补发': () => ({ score: 2, cb: () => store.mail(goods.AlphaStrike) })
  },
  '质量问题': {
    '退款': () => ({ score: 3, cb: () => store.refund(somemoney) }),
    '退货': () => ({ score: 4, cb: () => (user.mail(recievedGoods), store.refund(somemoney) }),
    '退货': () => ({ score: 5, cb: () => (user.mail(recievedGoods), store.mail(goods.AlphaStrike)) })
  }
}
const handler = serviceHandler[serviceReason] || {}
const executor = handler[randomIn(Object.keys(handler))] || _ => _
const handleRes = executor()

handleRes.cb()
user.love(store.checked ? handleRes.score : -handleRes.score)
```

## 更加灵活的数据配置

上一节使用了对象进行数据配置, 如果说有那么一点遗憾的地方, 那就是尽管属性的值可以为任意类型, 但是属性本身却只能是字符串类型, 这使得某些场景下我们不能很好的发挥配置逻辑分离的作用. 想象以下场景: 每个月末, 商家会挑选出狂热粉丝(喜爱程度大于等于 100)发送留言“感谢你”并赠送 10 元优惠券, 普通粉丝(分数 0-100)发送留言“感谢”, 黑粉(分数小于 0)发送“抱歉”并赠送 10 元优惠券.

等等, 喜爱程度分数是不定的!

显然我们不能用对象去处理这样的数据(只要我还没疯掉), 如下:

```js
const scoreMap = {
  '0'() {
    /* ... */
  },
  '1'() {
    /* ... */
  },
  '2'() {
    /* ... */
  },
  '3'() {
    /* ... */
  },
  '4'() {
    /* ... */
  },
  // ...
  '99'() {
    /* ... */
  },
  '100'() {
    sendMsg('thank u')
    sendCoupon(10)
  }
}
```

令人头大, 难到我们要用回 if/else? 坏消息是: 也许是的.

不过, 我必须强调, **假使判断条件足够复杂**——比如商家不仅赠送优惠券, 商家还根据粉丝分数高低不同, 送出 QQ 红钻/绿钻/黄钻/...一堆需要判断的礼品——使用 if/else 依旧会面临我们在第一小节提到的代码混乱等问题.

所以好消息是, 使用配置逻辑分离能够处理更复杂的更混乱的场景(而且你也应当这么使用). 你还记得我们刚刚提到的“属性本身却只能是字符串”这种略微的遗憾吗? 现在我们将要要解决这个问题! 请看以下代码:

```js
// 使用Map进行数据配置
const scoreHandler = new Map([
  [
    /^score_-[0-9]{1,2}$/,
    () => sendGift(['绿钻', '蓝钻', '红钻', '黄钻', '紫钻'])
  ],
  [/^score_[0-9]{1}$/, () => sendGift(['蓝钻'])],
  [/^score_1[0-9]{1}$/, () => sendGift(['蓝钻', '红钻'])],
  [/^score_2[0-9]{1}$/, () => sendGift(['蓝钻', '红钻', '黄钻'])],
  [/^score_3[0-9]{1}$/, () => sendGift(['蓝钻', '红钻', '黄钻', '紫钻'])]
  // ...
])

const userScore = 15
const validScore = `score_${userScore}`
let handle,
  entriess = scoreHandler.entries()
while ((({ value: handle, done } = entriess.next()), !done)) {
  const [scoreReg, handler] = handle
  if (scoreReg.test(validScore)) {
    handler() // 输出结果“蓝钻”
    entriess = { next: () => ({ value: null, done: true }) } // 终止循环
  }
}
```

**使用 Map 进行数据配置是非常棒的一种写法**, 但是如果你必须兼容 IE 浏览器的话, 你必须考虑使用其它的数据结构用于替代 Map:

```js
// 双数组进行数据配置
const validator = [
  [/^score_-[0-9]{1,2}$/],
  [/^score_1[0-9]{1}$/],
  [/^score_2[0-9]{1}$/]
]
const handler = [
  () => sendGift(['绿钻', '蓝钻', '红钻', '黄钻', '紫钻']),
  () => sendGift('蓝钻'),
  () => sendGift('红钻')
]
// 执行逻辑省略
// 从validator中找到校验通过的元素的下标, 然后执行handler数组中对应下标的回调函数

// ... 或者其它数据结构 ...
```

我们在上述两小节中提到的几种不同的代码风格, 都遵循着将'配置'发挥到领先判断一步的理念. 在实际业务中, 你也可以试试尝试混合配置逻辑分离以及常规判断条件式写法, 其中主要考量的点应该是**是配置领先判断, 还是判断领先配置**.

## 后语

本文主要介绍了几种用于替代普遍场景中 if/else 的写法, 如三目+逗号运算符, 使用对象/Map/双数组进行配置数据与业务逻辑分离, 虽然处理业务逻辑的思路是一样的, 但是每种方法写起来的实际感觉却不一样, 孰优孰劣, 还请各位看官仔细品味一番.

最后, 如果本文能给大家带来一些代码上的遐想及思考, <ruby>那是再好不过<rt>暗示点赞\*2.jpg</rt></ruby>, 如文中有不当之处, 欢迎各位在评论中指出及补充.

### 代码性能

我没有实际考察过各种写法的性能代价, 有兴趣的掘友可以尝试一下 👍

### 阅读更多

- [JavaScript 复杂判断的更优雅写法](https://juejin.im/post/5bdfef86e51d453bf8051bf8)
- [[浅析]特定场景下取代 if-else 和 switch 的方案](https://juejin.im/post/5b4b73e7f265da0f96287f0a)
- [[探索]在开发中尽量提高代码的复用性](https://segmentfault.com/a/1190000016604728)
- [MDN: Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)


