---
meta:
  - name: keywords
    content: JavaScript,TypeScript,TS,排序库,网易云歌单排序,自定义排序,anysort
  - name: description
    content: 上一篇文章介绍了因网易云音乐的歌单排序功能较弱，我们自己实现的用来给歌单自定义排序的排序库的思路。这篇文章在排序库的基础上，介绍了其 TypeScript 类型实现。
---

# 🌐 Anysort 类型实现

[TOC]

## 从黑帮开始

去年一月的时候，因想对网易云歌单进行高级排序，写了一个多属性排序方法 Anysort。正好最近我在看其它语言的泛型，突然想起 TypeScript 里也有泛型这个东西，于是特意回到 TS 来看一下。结果这一看，惊住了我，TS 的泛型太特喵好玩了！

我估计 TS 正好能用来给 Anysort 实现一些高级类型约束，于是动手完成了。去年我写了一篇[《一文学会排序》](/articles/fold/2021-1/anysort-1th.html)的文章介绍了 Anysort 的实现原理。经过功能更替，代码更迭，那篇文章已不再适合阅读。这篇文章用作去年那篇的补充，主要会讲解高级类型的实现，不会涉及基础知识。如果看文章时有任何疑惑的地方，推荐看[《了不起的 TS 入门教程》](https://juejin.cn/post/6844904182843965453)查字典。

首先要简单了解 Anysort 的调用方式。假设我们在警察局关了一票黑帮，并且知道他们的姓名、年龄和做过的坏事这几个数据：

```js
const gangs = [
  {
    name: 'A',
    age: 33,
    badRecord: []
  },
  {
    name: 'B',
    age: 25,
    badRecord: ['X001']
  },
  {
    name: 'C',
    age: 25,
    badRecord: ['X888', 'X772']
  },
  {
    name: 'D',
    age: 25,
    badRecord: []
  },
  {
    name: 'E',
    age: 33,
    badRecord: ['X888', 'X772', 'X002']
  }
]
```

如果天下大赦，局长要把没做过坏事中的最年轻的那个黑帮释放，那需要对 badRecord 及 age 两个字段进行排序：

```js
anysort(gangs, 'badRecord.length', 'age')
```

排序之后，很明显，局长应该释放 D。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220513170945.png)

使用对象的点号访问方法，可以轻松访问到 badReocord 数组的长度。Anysort 还提供了“排序插件”，可以更改排序的结果，比方说使某个排序倒序显示。假如此刻局长想枪毙做过坏事最多的那个黑帮分子，他需要对 badRecord 进行倒序排序：

```js
anysort(gangs, 'badRecord.length-reverse()')
```

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220513171506.png)

所以结果出来了，局长应该枪毙 E。这帮黑帮分子的履历太简单了，只有姓名年龄等字段。Anysort 提供了丰富的内置插件以便于对复杂的数据进行排序，显然能做更多事情。比如，使用对象语法去调用 Anysort 而不是通过字符串传参：

```js
anysort(gangs).badRecords.length.reverse()
```

不过但问题是无论是使用对象语法还是字符串传参，**该如何保证类型是正确的**？假设局长在排序时输错了一个字母，那么得到错误排序结果后，他有可能枪毙一个本该释放的人。换句话来说，在编写代码时，错误调用代码应该报错。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220513181638.png)

让我们先看看 Anysort 的 JS 实现部分。

## 排序原理

### 多属性排序

Anysort 是在 Array.prototype.sort 基础上的封装。Array.prototype.sort 接受一个比较函数，利用内置算法比较各个元素，并根据比较函数给出的数字来决定其顺序。比如根据年龄排序可以这样来写比较函数：

```js
function sortByAge(gangsA, gangsB) {
  const ageA = gangsA.age
  const ageB = gangsB.age
  return ageA === ageB ? 0 : (ageA < ageB ? -1 : 1)
}
gangs.sort(sortByAge)
```

一但涉及多个属性的排序，我们就需要编写多个类似 sortByAge 的比较函数。由于多个属性的比较有先后关系，所以我们需要一个“漏斗”来筛选出最终的排序结果。比如在挑选无犯罪记录中最年轻的黑帮时，先按照其犯罪记录长度排序，如果某两个黑帮成员的犯罪记录长度相等，也就意味着需要在对其年龄继续排序。有了“漏斗”filter，有再多比较函数都没关系。多属性排序的核心就是这个 filter 方法。

```js
function sortByAge(gangsA, gangsB) {
  const ageA = gangsA.age
  const ageB = gangsB.age
  return ageA === ageB ? 0 : (ageA < ageB ? -1 : 1)
}
function sortByBadRecordLen(gangsA, gangsB) {
  const lenA = gangsA.badRecord.length
  const lenB = gangsB.badRecord.length
  return lenA === lenB ? 0 : (lenA < lenB ? -1 : 1)
}
const filter = (...fns) => (a, b) => fns.reduce((res, fn) => res || fn(a, b), 0)
gangs.sort(filter(sortByAge, sortByBadRecordLen))
```

### 插件，以walk为例

插件在 Anysort 除了可以像刚才提到的 reverse 那样改变排序的结果，也能改变排序数据。类似从数据 gangsA 到 gangsA.badRecord.length 的变幻，就是使用内置插件实现的。它就是一个简单的 walk 函数，可以用来获取对象中特性的键值对数据。

```js
/**
 * @example
 *  walk('a.b')({a:{b:3}}) === 3
 */
const walk = (pathsStr) => (x: any) => {
  const paths = pathsStr.split('.')
  let val = x
  let nextPath: string | null = null
  while (val && paths.length) {
    nextPath = paths.shift() as string
    if (!Object.prototype.hasOwnProperty.call(val, nextPath)) {
      warn(`cant find path`)
    }
    val = val[nextPath]
  }
  return val
}
```

walk 也是 Anysort 的字符串形式调用依赖的核心方法，结合 filter 函数，就可以走通 Anysort 的原理了。当读取到 'a.b-reverse()' 指令，根据中横线将指令划分为 walk('a.b') 和 reverse() 两个插件，分别生成比较函数。最后，这两个比较函数传入 filter，塌缩成一个可用于 Array.prototype.sort 使用的比较函数。

```js
anysort(arr, 'a.b-reverse()')
// 可以看作
arr.sort(filter([
  genPlugin(walk('a.b')),
  genPlugin(reverse())
]))
```

### 对象形式调用

Anysort 对象形式调用主要依赖了 Proxy。其核心的实现是需要保存对象的访问路径，比如说 gangs.a.b.reverse() 先后访问了三个属性：a、b、reverse，这三个属性都必须由同一个 Proxy 对象提供。

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

访问 proxy.a，把 'a' 放到 visited 中，返回 proxy；访问 proxy.b，把 'b' 放到 visited 中，返回 proxy... 这样就能无限层级访问对象路径了。直到访问到某个插件，这时就可以把已访问的路径 ['a', 'b'] 作为参数带入，返回排序结果（而非 proxy）。

## 类型实现

### 从对象获得可行路径

Anysort 可以接受任意格式数据，其目标是要根据传入数据的类型生成一个有限的字符串字面量集合，而这个字符串字面量集合类型应够对函数传入的字符串类型进行约束。假设以下 StringValidWith(ARR) 类型推断结果是 'a' | 'b'，那么很显然只有两种调用形式是正确的。一但 StringValidWith(ARR) 推断失败，返回 never，那么 'string' 不能作为 never 类型传入，调用就会失败。[代码示例](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAQzATwM5wE5QDwCCASkQHwAUy22AXIsUQDSIZS2IDKbMYA5gGrIANjAAmAdRhQAFoRKkAlIgDeiAPQAqRADpdiDWsQBfAFAmoaAA4BTTtz6CREqbIalEAXkQByZN8QAPj4ARt5maoYA8gDSJqiYOFDkANoAusy+3gomEYgxcehYuCnpIVk5hgDu2Ai8BQnFaRlwMtbY5WZAA)如下：

![[TS Playground Example](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAQzATwM5wE5QDwCCASkQHwAUy22AXIsUQDSIZS2IDKbMYA5gGrIANjAAmAdRhQAFoRKkAlIgDeiAPQAqRADpdiDWsQBfAFAmoaAA4BTTtz6CREqbIalEAXkQByZN8QAPj4ARt5maoYA8gDSJqiYOFDkANoAusy+3gomEYgxcehYuCnpIVk5hgDu2Ai8BQnFaRlwMtbY5WZAA)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220513201932.png)

那么目标就清晰了，StringValidWith 需要遍历 ARR，并返回所有可能的路径结果（以下简称可行路径）：

```js
const data = [{a:{b:{c:{d:1}}}}]

// 'a'|'a.b'|'a.b.c'|'a.b.c.d'
StringValidWith<typeof data[0]>
```

StringValidWith 的实现[见下 GetPath 类型](https://www.typescriptlang.org/play?#code/C4TwDgpgBA4hwAUCGwAWAeAUFKAVKEAHsBAHYAmAzlAPYBGAVhAMbAA02UA0gcWVVADWEEDQBmeKAF4hI8XkwA+aZx5ESFapWAAnAJakA5pwD8eANpcAurw0D6TVqagADACQBvLgF8XUAD6unj4AdJ5wiCgYuJZWir6cAFxBXgk4yQDkGZiYoJBQJNoA+gCM0rDwyGjoHkiJHnT1zPXkiaQArgC2dBA63v3eikA)，是一个简单的递归函数。它从对象中获取所有的键，返回这些键。一但对象中键对应的值还是对象，则进入值对象的递归。

![[TS Playground Example](https://www.typescriptlang.org/play?#code/C4TwDgpgBA4hwAUCGwAWAeAUFKAVKEAHsBAHYAmAzlAPYBGAVhAMbAA02UA0gcWVVADWEEDQBmeKAF4hI8XkwA+aZx5ESFapWAAnAJakA5pwD8eANpcAurw0D6TVqagADACQBvLgF8XUAD6unj4AdJ5wiCgYuJZWir6cAFxBXgk4yQDkGZiYoJBQJNoA+gCM0rDwyGjoHkiJHnT1zPXkiaQArgC2dBA63v3eikA)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220513203605.png)

为了支持访问数组和字符串的 length 属性，我们还要对 GetPath 进行一些改造，[见下代码](https://www.typescriptlang.org/play?#code/C4TwDgpgBA4hwAUCGwAWAeAUFKAVKEAHsBAHYAmAzlAPYBGAVhAMbAA02UA0gcWVVADWEEDQBmeKAF4hI8XkwA+aZx5ESFapWAAnAJakA5pwD8eANpcAurw0CAFElIhzNgD5Rt+owEpTUAAMAEgBvLgBfAKgPYLDwgDoAGzJDNADOAC4La1t+anomVn9YiKiY0Ij40LhEFAxcSytFSMzAipacLIByLsxMUEgoHSQAd1xwaBkQpAyQulnmWc5yLNIAVwBbOggdV04Ibohe8JPwvoHoEm1pWHhkNHRhsYnFIA)：

![[TS Playground Example](https://www.typescriptlang.org/play?#code/C4TwDgpgBA4hwAUCGwAWAeAUFKAVKEAHsBAHYAmAzlAPYBGAVhAMbAA02UA0gcWVVADWEEDQBmeKAF4hI8XkwA+aZx5ESFapWAAnAJakA5pwD8eANpcAurw0CAFElIhzNgD5Rt+owEpTUAAMAEgBvLgBfAKgPYLDwgDoAGzJDNADOAC4La1t+anomVn9YiKiY0Ij40LhEFAxcSytFSMzAipacLIByLsxMUEgoHSQAd1xwaBkQpAyQulnmWc5yLNIAVwBbOggdV04Ibohe8JPwvoHoEm1pWHhkNHRhsYnFIA)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220513204741.png)

### 从数组推断子元素类型

由于传入的是数组，数组内部的元素类型不一定是同一种，所以要先从数组中获取子元素类型，再把子元素类型传给 GetPath 以获得所有路径。[见下代码](https://www.typescriptlang.org/play?#code/C4TwDgpgBA4hwElgQLYBVwQDwA0DKUEAHsgHYAmAzlAK6kDWpA9gO6kDaAugHxQC8AKChR8hEhArUAFAEtSAMwgAnKElQZIASi5CoAflXJ0mXQC4opCADdlAgaEhQlAQxYbofKOwDeUZ+dIaFAAjZS4oAF8AGl9g80pgJTkAc3CIzjtMuwdoZASAJVd3flh4NWNILBc3TG4gA)，一个灵活的 infer 就可以把类数组中所有子元素类型以集合的形式推断出来。

![[TS Playground Example](https://www.typescriptlang.org/play?#code/C4TwDgpgBA4hwElgQLYBVwQDwA0DKUEAHsgHYAmAzlAK6kDWpA9gO6kDaAugHxQC8AKChR8hEhArUAFAEtSAMwgAnKElQZIASi5CoAflXJ0mXQC4opCADdlAgaEhQlAQxYbofKOwDeUZ+dIaFAAjZS4oAF8AGl9g80pgJTkAc3CIzjtMuwdoZASAJVd3flh4NWNILBc3TG4gA)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220515154134.png)

GetItemType 中的 infer 在这里是有坑的，把类数组或元组中的所有子元素类型以集合的形式推断出来，就以为着抹平了类数组的顺序性。无论传入数组还是元组，都是返回顺序无关的集合。[见下代码](https://www.typescriptlang.org/play?#code/C4TwDgpgBA4hwElgQLYBVwQDwA0DKUEAHsgHYAmAzlAK6kDWpA9gO6kDaAugHxQC8AKChR8hEhArUAFAEtSAMwgAnKElQZIASi5CoAflXJ0mXQC4opCADdlAgQBt4UZJWABGc+zcAaKACZOfigvXwC7Oxd3IPY-UM47AHoE-ygAHyg3AVBIZwhXNDyovlh4NWNILGyIJnlc1zduIA)，从元组类型的 test1 中推断除了 1 | 2 集合。

![[TS Playground Example](https://www.typescriptlang.org/play?#code/C4TwDgpgBA4hwElgQLYBVwQDwA0DKUEAHsgHYAmAzlAK6kDWpA9gO6kDaAugHxQC8AKChR8hEhArUAFAEtSAMwgAnKElQZIASi5CoAflXJ0mXQC4opCADdlAgQBt4UZJWABGc+zcAaKACZOfigvXwC7Oxd3IPY-UM47AHoE-ygAHyg3AVBIZwhXNDyovlh4NWNILGyIJnlc1zduIA)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220515154908.png)

不过排序数组和顺序无关，而且内部的元素类型大致是确定的，不会出现海量不一致的数据结构毁掉类型推断，所以并不需要关心这里的性能损耗。把数组子类型这个集合转为元组后，计算出所有对象的可行路径，按照步骤来，简单可行。

不过，集合转元组，算是 TypeScript 中一个相当有名的黑魔法了操作。Github 应该能搜到很多相关讨论，比如这个帖子，[<i>union to tuple</i>](https://github.com/microsoft/TypeScript/issues/13298)，详细讨论了集合转元组的可行性以及相关实践。这里直接把代码搬过来，[见下](https://www.typescriptlang.org/play?#code/C4TwDgpgBAqgdgSwPZwCpIJJ2BATgZwgGNhk4AeGAPigF4AoKKAChiggA8c4ATfWKAH4WzANYAuFh0kwAlHRoA3JAh7zaSlWqiS4ERXnmdufRiIlQEcAGZ4oGdZtXzhGHVD0Hc9eqEixEFAAZAEN8YEoaBiZ4MnQsHAJiUhRI9i4IXn5mZmlLGzsAJUcoZWcoM2FCs119PB8-aFiUdFQAVzAAGwhyVCizAG1UAF10k34BzzxhyqgBmaZJAYA6Vea0JHaunoBRDiJOtp4e1AAaALJQ8N6qW-P1q4i+mYbwaBxwuguWzY7u8gA5CEAVAAD5QAEAIxB4IBRABVCAA)，先用 UnionToIntersection 把集合 1|2 转换成对应的函数交集类型 ((x: 1) => void) & ((x: 2) => void)，再使用 UnionLast 把参数类型一个个推断出来就好[^union_to_tuple]。

[^union_to_tuple]: 有关集合转元组的详细中文解释见[《TypeScript 奇技淫巧 union to tuple》](https://zhuanlan.zhihu.com/p/58704376)。

![[TS Playground Example](https://www.typescriptlang.org/play?#code/C4TwDgpgBAqgdgSwPZwCpIJJ2BATgZwgGNhk4AeGAPigF4AoKKAChiggA8c4ATfWKAH4WzANYAuFh0kwAlHRoA3JAh7zaSlWqiS4ERXnmdufRiIlQEcAGZ4oGdZtXzhGHVD0Hc9eqEixEFAAZAEN8YEoaBiZ4MnQsHAJiUhRI9i4IXn5mZmlLGzsAJUcoZWcoM2FCs119PB8-aFiUdFQAVzAAGwhyVCizAG1UAF10k34BzzxhyqgBmaZJAYA6Vea0JHaunoBRDiJOtp4e1AAaALJQ8N6qW-P1q4i+mYbwaBxwuguWzY7u8gA5CEAVAAD5QAEAIxB4IBRABVCAA)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220515161832.png)

为什么要在 Anysort 中使用黑魔法，这不是这篇文章想要讨论的话题。我们回到正题，改造 GetPath 以枚举内置插件名称，然后使用递归版本的 GetPath 就能推断出所有可行路径。[见下代码](https://www.typescriptlang.org/play?#code/C4TwDgpgBAQgrgSwDYBMCSA7ACkuBzBDAZygF4oByAJwgDcIqiIKoAfSsXAjCgKF9CQoAcQjAsAQ2AALIgB4AGgGUoEAB7AIGFCTgYA1hgD2AdwwBtALoA+MryhRlqjVp1RzhAGYMoACQgSKAA0UAB04V4+AEoQRMCW9lAA-CJikjJy-oFQAGRQRgBGAFYQAMbAtuyi4lKycjFx1okAXFAYdAz8gtDVaJoAtgAq4BCKKuqa2roGxmZWtqSJThOuJAAUkVRQfRBDIwCUVokpO3uQLW0dVF0jUFQSJsNC5OYA3okSrRhw-QUMRwBfILvBwFVpxKiEPCAhICW6aOJRB5PaDkACqGAQRgwgyMgzgnFGvQGKLk90eI2sTX4NyECOAZFSNRk8npSIpkGpNO6TPS0jkiUGzkmbkKJXKQUSAGlhasoPoICAjJ4oELyAqlSrBrwFtLZVMoBCocdVeYpZZ9W41hIMCArGxDcBIRg8PsTQADAAkrylAPdDq9PoBoSQWjwMn97EDvoAtN74Mh0NguIQiH6A97fSGwzI468E6hMDh8Km-RdBmaLSsDWKysAPZn01HG6FvdU+XIK+brE2oNGAXmC0ni9w0+6Lv3xw5WhQ+HChBisTijJhNIw60u5GjdQ41mjLSR9yk1mt9K01mpWmj9mRbLQjAgUDfSHeH0+oF8rjfqzpEiez1AmzbM+r6PjeJwfpc9DXPO0CLtiAAyEhxFuO5QPBy6rgwTDlJu24HlAJ6XoBGDeFsUQgVA95gVAJpRBc7TQbScGYtiuL4oSnZoeYgxVi4BrmIxDAJA4KRHNO7jhKEGHsQSoZyAAomopS4CgoyDCEGFIShgxUtYmmsRg2nAFxlhAA)，假使我们有了插件 reverse 和 plugin，那么无论是传入 'a-reverse' 还是 'a.length-plugin' 都应该是正确的用法。

![[TS Playground Example](https://www.typescriptlang.org/play?#code/C4TwDgpgBAQgrgSwDYBMCSA7ACkuBzBDAZygF4oByAJwgDcIqiIKoAfSsXAjCgKF9CQoAcQjAsAQ2AALIgB4AGgGUoEAB7AIGFCTgYA1hgD2AdwwBtALoA+MryhRlqjVp1RzhAGYMoACQgSKAA0UAB04V4+AEoQRMCW9lAA-CJikjJy-oFQAGRQRgBGAFYQAMbAtuyi4lKycjFx1okAXFAYdAz8gtDVaJoAtgAq4BCKKuqa2roGxmZWtqSJThOuJAAUkVRQfRBDIwCUVokpO3uQLW0dVF0jUFQSJsNC5OYA3okSrRhw-QUMRwBfILvBwFVpxKiEPCAhICW6aOJRB5PaDkACqGAQRgwgyMgzgnFGvQGKLk90eI2sTX4NyECOAZFSNRk8npSIpkGpNO6TPS0jkiUGzkmbkKJXKQUSAGlhasoPoICAjJ4oELyAqlSrBrwFtLZVMoBCocdVeYpZZ9W41hIMCArGxDcBIRg8PsTQADAAkrylAPdDq9PoBoSQWjwMn97EDvoAtN74Mh0NguIQiH6A97fSGwzI468E6hMDh8Km-RdBmaLSsDWKysAPZn01HG6FvdU+XIK+brE2oNGAXmC0ni9w0+6Lv3xw5WhQ+HChBisTijJhNIw60u5GjdQ41mjLSR9yk1mt9K01mpWmj9mRbLQjAgUDfSHeH0+oF8rjfqzpEiez1AmzbM+r6PjeJwfpc9DXPO0CLtiAAyEhxFuO5QPBy6rgwTDlJu24HlAJ6XoBGDeFsUQgVA95gVAJpRBc7TQbScGYtiuL4oSnZoeYgxVi4BrmIxDAJA4KRHNO7jhKEGHsQSoZyAAomopS4CgoyDCEGFIShgxUtYmmsRg2nAFxlhAA)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220515163145.png)

### 代理的类型

最后讲一讲对象形式调用的类型实现。假如有子元素类型 {a:'a'}，希望得到 { a:{ reverse(), length:{reverse()} } }。有了 GetPath 的递归基础上，改造其实非常简单。[见下代码](https://www.typescriptlang.org/play?#code/C4TwDgpgBACgNgVwOYEsB2BhAhnOBnAHgEEAlEgPigF4oBvAKCigAsJcB7KACgEoAuKKRL0AvvXqhIUAOIRgMLMGYFGgslAgAPYBDQATPFARoA1mnYB3NAG0AugBpVAFWpqS1gAy36lGgybWANJQ6FAmECDsAGZQTrZ8qkxOQbYa2roGUOwARgBWEADGwIlQAPwycgpKxGT2sSmUAGSwiKiYOPg1FCUCyYGpzfDI6Ni4hELkolCDrSMd42ST9FHGRSjsaFBYaCB47ABOwF1pOvqGxmaWNrbkXJp4AkI8dKr7cgj7m-db56bmVj8KvJFMoJqJ6NtdgdgFxrLQsHwAORYREiWw8AB0WAxzCAA)，PluginsCalls 是一个根据现有插件返回固定的函数接口对象的类型，GetPath 只需要不断递归对象的键值对，并把值与 PluginsCalls 的交集返回即可。这样一来，我们有了在任意属性调用任意插件的类型能力。

![[TS Playground Example](https://www.typescriptlang.org/play?#code/C4TwDgpgBACgNgVwOYEsB2BhAhnOBnAHgEEAlEgPigF4oBvAKCigAsJcB7KACgEoAuKKRL0AvvXqhIUAOIRgMLMGYFGgslAgAPYBDQATPFARoA1mnYB3NAG0AugBpVAFWpqS1gAy36lGgybWANJQ6FAmECDsAGZQTrZ8qkxOQbYa2roGUOwARgBWEADGwIlQAPwycgpKxGT2sSmUAGSwiKiYOPg1FCUCyYGpzfDI6Ni4hELkolCDrSMd42ST9FHGRSjsaFBYaCB47ABOwF1pOvqGxmaWNrbkXJp4AkI8dKr7cgj7m-db56bmVj8KvJFMoJqJ6NtdgdgFxrLQsHwAORYREiWw8AB0WAxzCAA)](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220515170506.png)

## 阅读更多

总结一下，无论是字符串形式的调用还是对象形式的调用，在 Anysort 的类型中的实现都主要依赖了递归类型。在文章前两部分，简述了其原理。

文章中的代码只是一种最简的形式，不是原始代码。比如，文中代码没有任何容错，也不支持扩展。Anysort 不仅有内置插件，它还支持插件扩展。这些插件的调用有些需要传参，另一些则不需要... 如何约束诸如之类的调用方式，或仅确保其不会出错，就需要引入一堆不相关代码。在 Anysort 完成时，我惊讶地发现，光是类型代码就占用了 10KB 体积。这是不可接受的。

另一方面，排除类型体操的可玩性，TS 在我看来是非常不适合前端来写的，至少是不适合普及的。JavaScript 是一种简单的脚本语言，我尽可能希望在保证一定代码质量下，更快速地完成项目，而不是要花上额外一半的时间来设计类型。类型系统只会越来越复杂，TS 使许多程序员陷入了“即时编写简单的页面也需要用类型来保证质量，或是给维护者带来好处”的误区。

到这打住，如果哪怕你还对 Anysort 有一丝兴趣，欢迎参观 [Anysort@Github](https://github.com/Lionad-Morotar/anysort)。项目是半个玩具，还有很多待完善的地方，欢迎 PR。

<JJ>**希望本文能对你有所帮助，我是仿生狮子，各位下期见咯~**</JJ>
