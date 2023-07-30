---
meta:
  - name: keywords
    content: JavaScript,TypeScript,TS,排序库,网易云歌单排序,自定义排序,anysort
  - name: description
    content: 上一篇文章介绍了因网易云音乐的歌单排序功能较弱，我们自己实现的用来给歌单自定义排序的排序库的思路。这篇文章在排序库的基础上，介绍了其 TypeScript 类型实现。
---

# 🌐 Anysort：灵活、优雅的多属性排序

[TOC]

## 前言

去年一月的时候，我写了一个多属性排序库 Anysort，给网易云歌单用作自定义排序。正好最近在看其它语言，突然想起 TypeScript 里也有泛型这个东西，我估摸着 TS 正好能给 Anysort 补上一些高级类型约束，于是动手完成了。我特意回到 TS 来玩玩，结果这下惊住了我，TS 的泛型太特喵好玩了！

那会儿我写了一篇文章介绍了 Anysort 的实现原理[^anysort-1th]，但经过功能更替，代码更迭，早就不再适合阅读。此文章用作去年那篇的补充，额外会讲 Anysort 中一些高级类型的实现方法，但不会涉及基础知识。如果看文章时有任何疑惑的地方，推荐查字典[^dict]。

[^anysort-1th]: [《一文学会排序》](/articles/fold/2021-1/anysort-1th.html)

[^dict]: [《一份不可多得的 TS 学习指南》](https://juejin.cn/post/6872111128135073806)

## 排序示例

首先我用例子简单说明一下 Anysort 的调用方式。现在回到二十世纪黑帮时代，警长在警察局关了一票黑帮，知道他们的姓名、年龄和做过的坏事这几个数据，想做一些排序。

```js
const gangs = [
  {
    name: 'A',
    age: 33,
    bads: []
  },
  {
    name: 'B',
    age: 25,
    bads: ['X001']
  },
  {
    name: 'C',
    age: 25,
    bads: ['X888', 'X772']
  },
  {
    name: 'D',
    age: 25,
    bads: []
  },
  {
    name: 'E',
    age: 33,
    bads: ['X888', 'X772', 'X002']
  }
]
```

恰逢天下大赦，局长要把没做过坏事中的最年轻的那个黑帮释放，这时要对 bads 及 age 两个字段进行排序。

```js
anysort(gangs, 'bads.length', 'age')
```

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220513170945.png)

结果很明显：应该释放 D。使用对象的点号访问方法，可以轻松访问到 bads 的长度。这是一个内置的“排序插件”，用来更改排序数据，把 bads 映射到 bads.length。除此之外，插件还可以更改排序的结果，比方说 reverse 插件，可以使某个排序倒序显示。如果局长想枪毙掉某个做过坏事最多的黑帮分子，他需要根据 bads 的长度倒序排序。

```js
anysort(gangs, 'bads.length-reverse()')
```

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220513171506.png)

结果很明显：应该枪毙 E。这帮黑帮分子的履历太简单了，只有姓名年龄等字段。Anysort 提供了其它的内置插件以便于对复杂的数据进行排序，还可以进行扩展，它显然能处理更复杂的排序情况。就调用方式而言，除了字符串传参，还可以使用对象语法调用。如下所示。

```js
anysort(gangs).badsa.length.reverse()
```

呀，恭喜你发现我打错了 bads 这个单词！不过该如何让编辑器也知道这行代码是错误的？假设局长在排序时输错了一个字母，那么得到错误排序结果后，他就有可能枪毙一个本该释放的人。不论是字符串传参，还是对象语法调用，**该如何保证类型是正确的**？编写代码时，错误调用应该报错。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220513181638.png)

探讨 Anysort 的类型前，让我们先简单看看 Anysort 的实现。当然，实现和类型没有强关联，所以你也可以直接跳到下一小节。

## 排序原理

### 多属性排序

Anysort 是在 Array.prototype.sort 基础上的封装。Array.prototype.sort 接受一个比较函数，利用内置算法比较各个元素，并根据比较函数给出的结果来决定元素的排序前后顺序。比如根据年龄排序，可以这样编写：

```js
function sortByAge(gangsA, gangsB) {
  const ageA = gangsA.age
  const ageB = gangsB.age
  return ageA === ageB ? 0 : (ageA < ageB ? -1 : 1)
}
gangs.sort(sortByAge)
```

一但涉及多个属性的排序，我们就需要编写多个类似 sortByAge 的比较函数。由于多个属性的比较有先后关系，所以我们需要一个“漏斗”来筛选出最终的排序结果。比如，在挑选无犯罪记录中最年轻的黑帮时，先按照其犯罪记录长度排序，如果某两个黑帮成员的犯罪记录长度相等，也就意味着需要在对其年龄继续排序。有了“漏斗”filter，有再多比较函数都没关系。Anysort 的多属性排序的核心就是这个 filter 方法。

```js
const sortByAge = ({age:a}, {age:b}) => a === b ? 0 : a < b ? -1 : 1
const sortBybadsLen = ({bads:a}, {bads:b}) => a.length === b.length ? 0 : a.length < b.length ? -1 : 1

const filter = (...fns) => (a, b) => fns.reduce((res, fn) => res || fn(a, b), 0)
gangs.sort(filter(sortByAge, sortBybadsLen))
```

### 对象的点号访问

刚才提到，插件可以改变排序的结果，也能改变排序数据。类似从数据 gangsA 到 gangsA.bads.length 的变幻，就是使用内置插件 walk 实现的。它是一个简单递归函数。

```js
/**
 * @example
 *  walk('a.b')({a:{b:3}}) === 3
 */
const walk = pathsStr => x => {
  const paths = pathsStr.split('.')
  let val = x
  let nextPath = null
  while (val && paths.length) {
    nextPath = paths.shift()
    val = val[nextPath]
  }
  return val
}
```

当读取到 'a.b-reverse()'，首先根据中横线将指令划分为 walk('a.b') 和 reverse() 两个插件，分别生成比较函数；之后，把这两个比较函数传入 filter，返回可用于 Array.prototype.sort 的最终结果（一个新的比较函数）。这就是 Anysort 的整个流程。可以看作以下代码：

```js
anysort(arr, 'a.b-reverse()')

// 可以看作
arr.sort(filter([
  generatePlugin(walk('a.b')),
  generatePlugin(reverse())
]))
```

### 对象形式调用

gangs.a.b.reverse() 这种对象形式调用的核心实现是 Proxy 的链式调用：gangs.a.b.reverse() 先后访问了三个属性：a、b、reverse，这三个属性都由同一个 Proxy 对象提供。

```js
const anysort => xs => wrapped(xs)

const wrapped = xs => {
  let proxy = null
  const visited = []
  return (proxy = new Proxy(arr, {
    get (target, prop) {
      if (prop === 'reverse') {
        return // ...
      }
      visited.push(prop)
      return proxy
    }
  }))
}
```

访问 proxy.a，把 'a' 放到 visited 中，返回 proxy；访问 proxy.b，把 'b' 放到 visited 中，返回 proxy... 这样就能无限层级访问对象路径了。直到访问到某个插件，这时就可以把已访问的路径 ['a', 'b'] 作为参数带入，这时就不再返回 proxy，而是返回排序结果。

## 类型实现

### 从对象获得可行路径

显然，你可以给排序函数传任意格式数据，而极端情况只有两个：在 [1,2,3] 排序时使用 'length' 排序是错误的；给 [[1],2,3] 排序使用 'length' 确情有可原（正确的）。

根据这两个极端情况，我们设定的目标是，根据传入数据的类型生成一个有限的字符串字面量集合，这个集合包含所有可能的正确输入。只要传入的字符串字面量参数不在这个集合中，编辑器自然会报错。假设有[以下代码](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAQzATwM5wE5QDwCCASkQHwAUy22AXIsUQDSIZS2IDKbMYA5gGrIANjAAmAdRhQAFoRKkAlIgDeiAPQAqRADpdiDWsQBfAFAmoaAA4BTTtz6CREqbIalEAXkQByZN8QAPj4ARt5maoYA8gDSJqiYOFDkANoAusy+3gomEYgxcehYuCnpIVk5hgDu2Ai8BQnFaRlwMtbY5WZAA)，StringValidWith(ARR) 类型为 'a' | 'b'，那么只有 'a' 或 'b' 两种调用是正确的，其它调用都应该报红。

![[TS Playground Example](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAQzATwM5wE5QDwCCASkQHwAUy22AXIsUQDSIZS2IDKbMYA5gGrIANjAAmAdRhQAFoRKkAlIgDeiAPQAqRADpdiDWsQBfAFAmoaAA4BTTtz6CREqbIalEAXkQByZN8QAPj4ARt5maoYA8gDSJqiYOFDkANoAusy+3gomEYgxcehYuCnpIVk5hgDu2Ai8BQnFaRlwMtbY5WZAA)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220513201932.png)

所以，StringValidWith 需要遍历 ARR，并返回所有可行路径：

```js
const data = [{a:{b:{c:{d:1}}}}]

// 'a'|'a.b'|'a.b.c'|'a.b.c.d'
StringValidWith<typeof data[0]>
```

实现[见下 GetPath 类型](https://www.typescriptlang.org/play?#code/C4TwDgpgBA4hwAUCGwAWAeAUFKAVKEAHsBAHYAmAzlAPYBGAVhAMbAA02UA0gcWVVADWEEDQBmeKAF4hI8XkwA+aZx5ESFapWAAnAJakA5pwD8eANpcAurw0D6TVqagADACQBvLgF8XUAD6unj4AdJ5wiCgYuJZWir6cAFxBXgk4yQDkGZiYoJBQJNoA+gCM0rDwyGjoHkiJHnT1zPXkiaQArgC2dBA63v3eikA)，它也是一个简单的递归函数。它从对象中获取所有的键，返回这些键。一但键对应的值还是对象，则进入值对象的递归。

![[TS Playground Example](https://www.typescriptlang.org/play?#code/C4TwDgpgBA4hwAUCGwAWAeAUFKAVKEAHsBAHYAmAzlAPYBGAVhAMbAA02UA0gcWVVADWEEDQBmeKAF4hI8XkwA+aZx5ESFapWAAnAJakA5pwD8eANpcAurw0D6TVqagADACQBvLgF8XUAD6unj4AdJ5wiCgYuJZWir6cAFxBXgk4yQDkGZiYoJBQJNoA+gCM0rDwyGjoHkiJHnT1zPXkiaQArgC2dBA63v3eikA)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220513203605.png)

为了支持访问数组和字符串的 length 属性，我们对 GetPath 进行一些改造，[见下](https://www.typescriptlang.org/play?#code/C4TwDgpgBA4hwAUCGwAWAeAUFKAVKEAHsBAHYAmAzlAPYBGAVhAMbAA02UA0gcWVVADWEEDQBmeKAF4hI8XkwA+aZx5ESFapWAAnAJakA5pwD8eANpcAurw0CAFElIhzNgD5Rt+owEpTUAAMAEgBvLgBfAKgPYLDwgDoAGzJDNADOAC4La1t+anomVn9YiKiY0Ij40LhEFAxcSytFSMzAipacLIByLsxMUEgoHSQAd1xwaBkQpAyQulnmWc5yLNIAVwBbOggdV04Ibohe8JPwvoHoEm1pWHhkNHRhsYnFIA)。

![[TS Playground Example](https://www.typescriptlang.org/play?#code/C4TwDgpgBA4hwAUCGwAWAeAUFKAVKEAHsBAHYAmAzlAPYBGAVhAMbAA02UA0gcWVVADWEEDQBmeKAF4hI8XkwA+aZx5ESFapWAAnAJakA5pwD8eANpcAurw0CAFElIhzNgD5Rt+owEpTUAAMAEgBvLgBfAKgPYLDwgDoAGzJDNADOAC4La1t+anomVn9YiKiY0Ij40LhEFAxcSytFSMzAipacLIByLsxMUEgoHSQAd1xwaBkQpAyQulnmWc5yLNIAVwBbOggdV04Ibohe8JPwvoHoEm1pWHhkNHRhsYnFIA)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220513204741.png)

### 从数组推断子元素类型

由于传入的是数组，数组内部的元素类型不一定是同一种，所以要先从数组中获取子元素类型，再把子元素类型传给 GetPath 以获得所有路径。[见下](https://www.typescriptlang.org/play?#code/C4TwDgpgBA4hwElgQLYBVwQDwA0DKUEAHsgHYAmAzlAK6kDWpA9gO6kDaAugHxQC8AKChR8hEhArUAFAEtSAMwgAnKElQZIASi5CoAflXJ0mXQC4opCADdlAgaEhQlAQxYbofKOwDeUZ+dIaFAAjZS4oAF8AGl9g80pgJTkAc3CIzjtMuwdoZASAJVd3flh4NWNILBc3TG4gA)，一个灵活的 infer 就可以把类数组中所有子元素类型以集合的形式推断出来。

![[TS Playground Example](https://www.typescriptlang.org/play?#code/C4TwDgpgBA4hwElgQLYBVwQDwA0DKUEAHsgHYAmAzlAK6kDWpA9gO6kDaAugHxQC8AKChR8hEhArUAFAEtSAMwgAnKElQZIASi5CoAflXJ0mXQC4opCADdlAgaEhQlAQxYbofKOwDeUZ+dIaFAAjZS4oAF8AGl9g80pgJTkAc3CIzjtMuwdoZASAJVd3flh4NWNILBc3TG4gA)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220515154134.png)

GetItemType 中的 infer 在这里是有坑的，把子元素类型以集合的形式推断出来，也就意味着抹平顺序差异。传入的元组可以是顺序相关的，但返回的集合却顺序无关。[见下代码](https://www.typescriptlang.org/play?#code/C4TwDgpgBA4hwElgQLYBVwQDwA0DKUEAHsgHYAmAzlAK6kDWpA9gO6kDaAugHxQC8AKChR8hEhArUAFAEtSAMwgAnKElQZIASi5CoAflXJ0mXQC4opCADdlAgQBt4UZJWABGc+zcAaKACZOfigvXwC7Oxd3IPY-UM47AHoE-ygAHyg3AVBIZwhXNDyovlh4NWNILGyIJnlc1zduIA)，从元组类型的 test1 中推断出子元素类型为 1 | 2 集合。

![[TS Playground Example](https://www.typescriptlang.org/play?#code/C4TwDgpgBA4hwElgQLYBVwQDwA0DKUEAHsgHYAmAzlAK6kDWpA9gO6kDaAugHxQC8AKChR8hEhArUAFAEtSAMwgAnKElQZIASi5CoAflXJ0mXQC4opCADdlAgQBt4UZJWABGc+zcAaKACZOfigvXwC7Oxd3IPY-UM47AHoE-ygAHyg3AVBIZwhXNDyovlh4NWNILGyIJnlc1zduIA)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220515154908.png)

不过在排序中，待排序数组和顺序不相关，所以我们可以使用这个 infer。由于待排序数组的内部的元素类型大致是一致的，所以也并不需要过分关心这里及之后的性能损耗。把数组子类型这个集合转为元组后，计算出所有对象的可行路径，按照步骤，简单可行。

集合转元组，应算是 TypeScript 中一个有名的黑魔法操作。Github 能搜到很多相关讨论，比如 [<i>union to tuple</i>](https://github.com/microsoft/TypeScript/issues/13298)，详细讨论了集合转元组的可行性以及相关实践建议。这里我直接把代码搬过来，[如下](https://www.typescriptlang.org/play?#code/C4TwDgpgBAqgdgSwPZwCpIJJ2BATgZwgGNhk4AeGAPigF4AoKKAChiggA8c4ATfWKAH4WzANYAuFh0kwAlHRoA3JAh7zaSlWqiS4ERXnmdufRiIlQEcAGZ4oGdZtXzhGHVD0Hc9eqEixEFAAZAEN8YEoaBiZ4MnQsHAJiUhRI9i4IXn5mZmlLGzsAJUcoZWcoM2FCs119PB8-aFiUdFQAVzAAGwhyVCizAG1UAF10k34BzzxhyqgBmaZJAYA6Vea0JHaunoBRDiJOtp4e1AAaALJQ8N6qW-P1q4i+mYbwaBxwuguWzY7u8gA5CEAVAAD5QAEAIxB4IBRABVCAA)，先用 UnionToIntersection 把集合 1|2 转换成对应的函数交集类型 ((x: 1) => void) & ((x: 2) => void)，再使用 UnionLast 把参数类型逐个推断出来就好[^union_to_tuple]。

[^union_to_tuple]: 有关集合转元组的详细中文解释见[《TypeScript 奇技淫巧 union to tuple》](https://zhuanlan.zhihu.com/p/58704376)。

![[TS Playground Example](https://www.typescriptlang.org/play?#code/C4TwDgpgBAqgdgSwPZwCpIJJ2BATgZwgGNhk4AeGAPigF4AoKKAChiggA8c4ATfWKAH4WzANYAuFh0kwAlHRoA3JAh7zaSlWqiS4ERXnmdufRiIlQEcAGZ4oGdZtXzhGHVD0Hc9eqEixEFAAZAEN8YEoaBiZ4MnQsHAJiUhRI9i4IXn5mZmlLGzsAJUcoZWcoM2FCs119PB8-aFiUdFQAVzAAGwhyVCizAG1UAF10k34BzzxhyqgBmaZJAYA6Vea0JHaunoBRDiJOtp4e1AAaALJQ8N6qW-P1q4i+mYbwaBxwuguWzY7u8gA5CEAVAAD5QAEAIxB4IBRABVCAA)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220515161832.png)

为什么要在 Anysort 中使用黑魔法，这不是这篇文章想要讨论的话题。我们回到正题，改造 GetPath，添加内置插件类型，然后添加类型 GetPaths 便于处理元组。[见下](https://www.typescriptlang.org/play?#code/C4TwDgpgBAQgrgSwDYBMCSA7ACkuBzBDAZygF4oByAJwgDcIqiIKoAfSsXAjCgKF9CQoAcQjAsAQ2AALIgB4AGgGUoEAB7AIGFCTgYA1hgD2AdwwBtALoA+MryhRlqjVp1RzhAGYMoACQgSKAA0UAB04V4+AEoQRMCW9lAA-CJikjJy-oFQAGRQRgBGAFYQAMbAtuyi4lKycjFx1okAXFAYdAz8gtDVaJoAtgAq4BCKKuqa2roGxmZWtqSJThOuJAAUkVRQfRBDIwCUVokpO3uQLW0dVF0jUFQSJsNC5OYA3okSrRhw-QUMRwBfILvBwFVpxKiEPCAhICW6aOJRB5PaDkACqGAQRgwgyMgzgnFGvQGKLk90eI2sTX4NyECOAZFSNRk8npSIpkGpNO6TPS0jkiUGzkmbkKJXKQUSAGlhasoPoICAjJ4oELyAqlSrBrwFtLZVMoBCocdVeYpZZ9W41hIMCArGxDcBIRg8PsTQADAAkrylAPdDq9PoBoSQWjwMn97EDvoAtN74Mh0NguIQiH6A97fSGwzI468E6hMDh8Km-RdBmaLSsDWKysAPZn01HG6FvdU+XIK+brE2oNGAXmC0ni9w0+6Lv3xw5WhQ+HChBisTijJhNIw60u5GjdQ41mjLSR9yk1mt9K01mpWmj9mRbLQjAgUDfSHeH0+oF8rjfqzpEiez1AmzbM+r6PjeJwfpc9DXPO0CLtiAAyEhxFuO5QPBy6rgwTDlJu24HlAJ6XoBGDeFsUQgVA95gVAJpRBc7TQbScGYtiuL4oSnZoeYgxVi4BrmIxDAJA4KRHNO7jhKEGHsQSoZyAAomopS4CgoyDCEGFIShgxUtYmmsRg2nAFxlhAA)，假使我们有了插件 reverse 和 plugin，那么无论是传入 'a-reverse' 还是 'a.length-plugin' 都应该是正确的调用。

![[TS Playground Example](https://www.typescriptlang.org/play?#code/C4TwDgpgBAQgrgSwDYBMCSA7ACkuBzBDAZygF4oByAJwgDcIqiIKoAfSsXAjCgKF9CQoAcQjAsAQ2AALIgB4AGgGUoEAB7AIGFCTgYA1hgD2AdwwBtALoA+MryhRlqjVp1RzhAGYMoACQgSKAA0UAB04V4+AEoQRMCW9lAA-CJikjJy-oFQAGRQRgBGAFYQAMbAtuyi4lKycjFx1okAXFAYdAz8gtDVaJoAtgAq4BCKKuqa2roGxmZWtqSJThOuJAAUkVRQfRBDIwCUVokpO3uQLW0dVF0jUFQSJsNC5OYA3okSrRhw-QUMRwBfILvBwFVpxKiEPCAhICW6aOJRB5PaDkACqGAQRgwgyMgzgnFGvQGKLk90eI2sTX4NyECOAZFSNRk8npSIpkGpNO6TPS0jkiUGzkmbkKJXKQUSAGlhasoPoICAjJ4oELyAqlSrBrwFtLZVMoBCocdVeYpZZ9W41hIMCArGxDcBIRg8PsTQADAAkrylAPdDq9PoBoSQWjwMn97EDvoAtN74Mh0NguIQiH6A97fSGwzI468E6hMDh8Km-RdBmaLSsDWKysAPZn01HG6FvdU+XIK+brE2oNGAXmC0ni9w0+6Lv3xw5WhQ+HChBisTijJhNIw60u5GjdQ41mjLSR9yk1mt9K01mpWmj9mRbLQjAgUDfSHeH0+oF8rjfqzpEiez1AmzbM+r6PjeJwfpc9DXPO0CLtiAAyEhxFuO5QPBy6rgwTDlJu24HlAJ6XoBGDeFsUQgVA95gVAJpRBc7TQbScGYtiuL4oSnZoeYgxVi4BrmIxDAJA4KRHNO7jhKEGHsQSoZyAAomopS4CgoyDCEGFIShgxUtYmmsRg2nAFxlhAA)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220515163145.png)

### 代理的类型

最后讲一讲对象形式调用的类型实现。假如有子元素类型 {a:1}，希望得到 { a:{ reverse() } }。有了 GetPath 的递归基础上，改造其实非常简单。[见下代码](https://www.typescriptlang.org/play?#code/C4TwDgpgBACgNgVwOYEsB2BhAhnOBnAHgEEAlEgPigF4oBvAKCigAsJcB7KACgEoAuKKRL0AvvXqhIUAOIRgMLMGYFGgslAgAPYBDQATPFARoA1mnYB3NAG0AugBpVAFWpqS1gAy36lGgybWANJQ6FAmECDsAGZQTrZ8qkxOQbYa2roGUOwARgBWEADGwIlQAPwycgpKxGT2sSmUAGSwiKiYOPg1FCUCyYGpzfDI6Ni4hELkolCDrSMd42ST9FHGRSjsaFBYaCB47ABOwF1pOvqGxmaWNrbkXJp4AkI8dKr7cgj7m-db56bmVj8KvJFMoJqJ6NtdgdgFxrLQsHwAORYREiWw8AB0WAxzCAA)，PluginsCalls 是一个根据现有插件返回固定的函数接口对象的类型，GetPath 只需要不断递归对象的键值对，并把值与函数接口的交集返回即可。这样一来，就有了在任意属性调用任意插件的类型能力。

![[TS Playground Example](https://www.typescriptlang.org/play?#code/C4TwDgpgBACgNgVwOYEsB2BhAhnOBnAHgEEAlEgPigF4oBvAKCigAsJcB7KACgEoAuKKRL0AvvXqhIUAOIRgMLMGYFGgslAgAPYBDQATPFARoA1mnYB3NAG0AugBpVAFWpqS1gAy36lGgybWANJQ6FAmECDsAGZQTrZ8qkxOQbYa2roGUOwARgBWEADGwIlQAPwycgpKxGT2sSmUAGSwiKiYOPg1FCUCyYGpzfDI6Ni4hELkolCDrSMd42ST9FHGRSjsaFBYaCB47ABOwF1pOvqGxmaWNrbkXJp4AkI8dKr7cgj7m-db56bmVj8KvJFMoJqJ6NtdgdgFxrLQsHwAORYREiWw8AB0WAxzCAA)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220515170506.png)

## 阅读更多

总结一下，无论是字符串形式的调用还是对象形式的调用，在 Anysort 的类型中的实现都主要依赖了递归类型。文章前两部分简述了其原理。但文章中的代码只是一种最简的还原。比如，没有任何容错，也不支持扩展。Anysort 不仅有内置插件，它还支持插件扩展。这些插件的调用有些需要传参，另一些则不需要... 如何约束诸如之类的调用方式，或仅确保其不会出错，就需要引入一堆不相关代码。在 Anysort 完成时，我惊讶地发现，光是类型代码就占用了 10KB 体积。我的第一感觉就是“这是不可接受的”。

排除类型体操的可玩性，TS 在我看来是非常不适合前端来写的，至少是不适合在项目中普及的。JavaScript 是一种简单有效的脚本语言，使用 JS 意味着我尽可能希望在保证代码质量底线的情况下，更快速地完成项目，而不是每天写代码却要花上一半的时间来设计类型。类型系统，包括项目中的代码类型以及类型系统本身都只会越来越复杂，TS 使许多程序员陷入了“即使是编写简单的页面，也需要用类型来保证质量，或是它可以给维护者带来好处”的误区。这可能是一种有效的自我安慰或管理手段。

更多吐槽 TS 的话就不说了。但如果你对类型体操有兴趣，可以去 [type-challenges](https://github.com/type-challenges/type-challenges) 这个项目看看。它搜罗了百来道 TS 类型编程的题目，从易到难都有，而且大部分题目都有很好的解答。这是提高 TS 泛型能力非常有效的一条路子。

最后，哪怕你对 Anysort 有一丝兴趣，欢迎参观 [Anysort@GitHub](https://github.com/Lionad-Morotar/anysort)。项目是半个玩具，还有很多不完善的地方，欢迎 PR。

<JJ>**希望本文能对你有所帮助，我是仿生狮子，各位下期见咯~**</JJ>
