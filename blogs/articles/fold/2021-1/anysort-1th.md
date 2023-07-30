---
meta:
  - name: keywords
    content: JavaScript,函数式,排序库,歌单排序,网易云歌单排序,自定义排序,网易云音乐接口,anysort
  - name: description
    content: 网易云音乐的歌单排序功能比较弱，本文介绍了使用函数式JS代码搭建一个自定义排序库的思路，以支持对歌单进行任意排序。
---

# 🌐 Anysort：灵活、优雅、无依赖的排序库

[TOC]

<JJ><p>求求了，救救孩子吧，已经几个月都没过百赞的博客了呜呜呜 ┭┮﹏┭┮</p></JJ>


## 歌单排序

网易云音乐的歌单排序功能十分鸡肋，只能按照歌曲名、歌手名、专辑名排序。别说处理一些复杂的规则了，他连从 Z-A 这种简单的倒序逻辑都搞不定。这对像我这种红星单动不动就几千首曲子或是喜欢给曲子分类、制作歌单的朋友来说简直就是灾难。

![鸡肋的网易云歌单排序功能](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210110192313.png?w=30)

于是，我写了一个专门用来给歌单中的歌曲排序的爬虫脚本，能够实现各种有意思的排序功能。

比方说，[这个歌单](https://music.163.com/#/playlist?id=5445763637)的歌曲排序按照以下规则排序：

1. 按专辑名称排序
2. 再按专辑发布日期排序。
2. 再按歌曲时长排序。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210110194331.png?w=70)

再举个例子，[这个歌单](https://music.163.com/#/playlist?id=5447666595)的曲子按照以下规则排序：

1. 按专辑作者名称排序，由于专辑可能有多个作者，优先选择其中有歌手名为“CLOCKWORKS TRACER”的专辑。
2. 再按专辑发布日期排序。
3. 再按歌曲在对应专辑中的顺序排序。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210110194551.png?w=70)

哇哈，这个排序功能比网易云默认的歌单排序强哈，这才真有点意思~ 接下来，我们一步一步来把它实现吧。名称和标语我都想好了，就叫做 **Anysort：灵活、优雅、无依赖的排序库**。

## 简单解决

### 确定问题

首先，得确定要解决什么问题。

在 JavaScript 中，排序其实是一个非常好写的功能。通过给 Array.prototype.sort 传入自定义排序方法，就能得到按期望顺序排好了的数组。

```js
const nums = [1, 30, 4, 21, 100000]

function customCompare(a, b) {
  if (a < b) return -1
  if (a > b) return 1
  else return 0
}

nums.sort(customCompare)

// 排序结果：[1, 4, 21, 30, 100000]
```

可以看到，给 Array.prototype.sort 传入的排序方法 customCompare，最终的返回值要么是 0，要么是 1 或 -1，这个返回值直接的指代了 a 和 b 的排序顺序。也就是说，无需关心 Array.prototype.sort 的具体实现到底是快速排序还是冒泡排序，只需要写一个比较两个值的大小的函数，返回它们的顺序到底是相等（0），还是 a 比 b 靠前（-1），或是 a 在 b 之后（1）就行了。

我们通常会使用 JSON 对象去描述一首曲子，比如[《海阔天空》](https://music.163.com/#/song?id=347230)可能描述如下：

```js
const song = {
  name: '海阔天空',
  authro: 'Beyond',
  // 专辑信息
  album: {
    name: '海阔天空',
    time: '1993-09-09',
    brief: '《海阔天空》是黄家驹为BEYOND成立十周年而作的，刻画着他们十年来的心路历程。'
  },
  // 评论信息
  comments: [
    {
      name: '冰凍七音',
      content: '有些人死了，他还活着',
      approve: '150283',
      hot: true,
    },
    {
      name: '独坐凭栏',
      content: '钢铁锅，含着泪喊修瓢锅。。。',
      approve: '77739'
    }
  ]
}
```

给歌曲排序可要比给数字排序复杂。两个数字之间固然只有大于小于等于三种关系，但是同一首专辑的歌曲之间，也许我们还想继续按歌曲名、歌曲时间或其它属性排序。讲到这里，写排序函数时碰到的第一个问题就出来了：如何给多属性进行排序？

### 简单方案

先简单来写几个基础排序函数，尝试解决以下问题：

1. 先按曲子的专辑名称的长度排序。
2. 再按曲子的名称的字典顺序排序。

```js
function sortByAlbumNameLen(songA, songB) {
  const lenA = songA.album.name.length
  const lenB = songB.album.name.length
  // 专辑名称相同，则不改变顺序（0），名称不相同时，则按照专辑名称的长度由短到长排列。
  return lenA === lenB ? 0 : (lenA < lenB ? -1 : 1)
}
const songs = [
  { name: 'songB', album: { name: 'wow' } },
  { name: 'songC', album: { name: 'other' } },
  { name: 'songA', album: { name: 'wow' } },
]
songs.sort(sortByAlbumNameLen)
// 得到结果：songB、songA、songC
```

然后再来处理专辑名称相同的情况。

```js
function sortBySongName(songA, songB) {
  const nameA = songA.name
  const nameB = songB.name
  // 根据曲子的名称的字典顺序排序，如 'abort' 排在 'bank' 前面。
  return nameA === nameB ? 0 : (nameA < nameB ? -1 : 1)
}
```

由于 Array.prototype.sort 方法只接受一个函数，所以，需要把 sortByAlbumNameLen 和 sortBySongName 两个函数合二为一。

```js
function sortByAlbumLenThenSongName(songA, songB) {
  const firstRes = sortByAlbumNameLen(songA, songB)
  // 先以 sortByAlbumNameLen 的结果为准，
  // 如果 sortByAlbumNameLen 没能得出顺序，
  // 返回了 0，
  // 那么继续排序，以 sortBySongName 的结果为准
  if (firstRes !== 0) return firstRes
  else return sortBySongName(songA, songB)
}
const songs = [
  { name: 'songB', album: { name: 'wow' } },
  { name: 'songC', album: { name: 'other' } },
  { name: 'songA', album: { name: 'wow' } },
]
songs.sort(sortByAlbumNameLen)
// 得到结果：
// [
//   { name: 'songA', album: { name: 'wow' } },
//   { name: 'songB', album: { name: 'wow' } },
//   { name: 'songC', album: { name: 'other' } },
// ]
```

搞定。目前为止，先按曲子的专辑名称的长度排序，再按曲子的名称的字典顺序排序这个小功能就写好了。

### 问题抽象

有一个问题比较烦人，就是 Array.prototype.sort 只接受一个参数用作排序函数，还不能是数组。所以只要更改了排序的规则，那么传进去的参数（即上面的 sortByAlbumLenThenSongName）的逻辑就得跟着改。

这个小麻烦可以通过抽象解决。仔细观察，sortByAlbumLenThenSongName 的逻辑是：先按 sortByAlbumNameLen 的规则排序，如果 sortByAlbumNameLen 没能给出现后顺序（即返回 0），那么再按 sortBySongName 的顺序排序。这种现后顺序，不就是一个循环嘛！

```js
function sortBy(...sortFns) {
  return function fn(obj1, obj2) {
    var fnsLen = sortFns.length,
      result = 0,
      i = 0
    while(result === 0 && i < fnsLen) {
      result = sort(sortFns[i], map)(obj1, obj2)
      i++
    }
    return result
  }
}
songs.sort(sortBy(
  sortByAlbumNameLen, 
  sortBySongName
))
```

以后，就算我们继续更改排序规则，也不需要写新的函数去重构传入 Array.prototype.sort 的那个方法。假设替换一条排序规则：

1. 先按曲子的专辑名称的长度排序。
2. <del>再按曲子的名称的字典顺序排序。</del>
3. 再按曲子的时长排序。

只需要改动以下几行代码：

```js
// ...
function sortBySongTime(a, b) {
  return a.time === b.time ? 0 : (a.time < b.time ? -1 : 1)
}
// ...
songs.sort(sortBy(
  sortByAlbumNameLen,
  sortBySongTime
))
```

妙哉妙哉~

## 逐步改进

上一小节，我们简单完成了一个具有多属性排序功能。接下来需进一步完善这个排序函数，使其功能完整，更加强大。

### API 优化

程序员都是懒惰的。其实我甚至连基础的排序函数都不想写，要是能直接传入待排序的属性名那多好哇：

```js
const songs = [
  { name: 'songB', album: { name: 'wow' } },
  { name: 'songC', album: { name: 'other' } },
  { name: 'songA', album: { name: 'wow' } },
]
// 先按专辑名称、再按曲子名正序排列
songs.sort(
  sortBy('album.name', 'name')
)
// Results：songA、songB、songC
```

也就是说，需要写一个读取对象的属性值的方法。既然是涉及属性存取符号（也就是点运算符），那我们就用 eval('song.album.name') 就能读到属性啦。咳咳，划掉，动态语言不意味着就要用 eval 解决问题。当然了，new Function 也不行。以下继续写一个 while 循环吧。

```js
const getVal = name => {
  const pathsStore = name.split('.')
  return x => {
    const paths = [...pathsStore]
    let val = x
    while (val && paths.length) {
      next = paths.shift()
      val = val[next]
    }
    return val
  }
}
getVal('b.c')(
  { b: { c: 'test' } }
)
// Results：'test'
```

再接下来只要重构 sortBy 函数，把 getVal 的逻辑添加进去，就完成传入字符串属性的改造啦。

### 自定义排序函数

现在可以传入字符串了，我们再加一种 API：自定义排序函数，以支持某些特殊排序逻辑。比如以下代码：

```js
songs.sort(sortBy(
  // 优先选择 2020 年发布的曲子，并按时间倒序排列
  (a, b) => {
    const year2019 = +new Date('2019-12-31 23:59:59')
    const year2020 = +new Date('2020-12-31 23:59:59')
    const timeA = Math.min(year2019, Math.max(a.pubTime, year2020))
    const timeB = Math.min(year2019, Math.max(b.pubTime, year2020))
    return timeA === timeB ? 0 : ( timeA < timeB ? 1 : -1)
  },
  // 再按专辑名称排序
  'album.name',
))
```

这个改造其实并不难，判断一下传入参数的类型就好了。

```js
// 由于 sortBy 函数返回一个排序函数，
// 所以在这儿改名为 factory（函数工厂）
function factory(...cmd) {
  // 如果没有排序参数，那么返回 undefined，
  // 告诉 Array.prototype.sort 不需要排序
  if (cmd.length < 1) return undefined

  // 兼容字符串或自定义函数
  const sortFns = cmd.map((x, i) => 
    x === 'function' ? x : generate(x)
  )

  return (obj1, obj2) => {
    var fnsLen = sortFns.length,
      result = 0,
      i = 0
    while(result === 0 && i < fnsLen) {
      result = sort(sortFns[i], map)(obj1, obj2)
      i++
    }
    return result
  }
}

// 从字符串指令（如 album.name）中得到排序函数
function generate(s) {
  // 指定排序是正序还是倒序，稍后会用到
  const sortOrder = 1
  return function fn(a,b) {
    var result
    var am = getVal(s)(a)
    var bm = getVal(s)(b)
    if (am === bm) result = 0
    if (am < bm) result = -1
    if (am > bm) result = 1
    return result * sortOrder
  }
}
```

### 增加倒序逻辑

在 generate 函数里，我们还遗留了一个字段 sortOrder 用来指定排序是正序还是倒序。当然，如果传入自定义排序函数，根本不会走 generate，只有字符串参数，才会走到这一步。这里可以改进一下 API，如传入 '-album.name'，前面加了一个负号，用来代表按倒序排序。

```js
function generate(s) {
  const sortOrder = 1
  // 如果第一个字符为负号，则将排序结果取反
  if (s[0] === '-') {
    sortOrder = -1
    s = s.substr(1)
  }
  return function fn(a,b) {
    var result
    var am = getVal(s)(a)
    var bm = getVal(s)(b)
    if (am === bm) result = 0
    if (am < bm) result = -1
    if (am > bm) result = 1
    return result * sortOrder
  }
}
```

奈斯哇，经过这两次迭代，终于支持了自定义排序函数，也支持通过负号得到倒序的逻辑。

不过，这可远远没有结束，第三小节才是“真正的 Coding”。

## 层层抽象

坐稳啦，🚀 开始加速了！

### 优化循环逻辑

还记得我们怎么使用循环来解决两个不同的排序方法之间的顺序问题吗？按顺序传入排序函数，然后依次调用这些排序函数，如果没有得到两个值的现后顺序，那么就以下一个排序函数的结果为准：

```js
function sortBy(...sortFns) {
  return function fn(obj1, obj2) {
    var fnsLen = sortFns.length,
      result = 0,
      i = 0
    // 注意停止条件
    while(result === 0 && i < fnsLen) {
      result = sort(sortFns[i], map)(obj1, obj2)
      i++
    }
    return result
  }
}
```

这里可以用一行 Reduce 函数直接搞定整整一片代码逻辑。

```js
function sortBy(...sortFns) {
  // 非常耐人寻味
  return (a, b) => sortFns.reduce(
    (result, fn) => result || fn(a, b), 0
  )
}
```

### 完善排序逻辑

我们在 generate 函数中写死了值的比较方法。

```js
if (am === bm) result = 0
if (am < bm) result = -1
if (am > bm) result = 1
```

大于、小于、等于三种逻辑虽然完备，但那是针对“数值”的比较而言的。如果比较的值不是数字，你就会发现，使用关系运算符会出现一些奇怪的情况。

```js
songs = [
  { id: '9' },
  { id: '10' }
]
'10' < '9' // true
'9' < '10' // false
```

如果 songs 结构中有字符串的比较，那事情不好办。因为字符串的比较可能不是按照你期望的逻辑进行的，它按字典顺序，所以字符串 9 会大于字符串 10。如果不想写自定义函数的话，需要改进 API，指定属性比较前先强制转换为数字而不是直接使用字符串进行比较。

再看一个例子。

```js
songs = [
  { id: '0' },
  {         },
  { id: null },
  { id: '2' },
  { id: '3' },
]
undefined === 'value' // false
undefined < 'value' // false
undefined > 'value' // false
```

如果某首曲子没有专辑名称这个字段，会从 song.album.name 得到空值。空值和任何非空值比较都返回 false，于是，没有 id 的曲子会被排到最上面。所以改进 API 指定空值的排序顺序非常迫切呀。

以下，需要将排序逻辑，也就是比较值的算法单独抽出来。

```js
// 判断 null 和 undefined
const isVoid = x => x == undefined
// 获取一个数的类型，如 'function'、'object' 等
const getType = x => isVoid(x) 
  ? 'void' 
  : Object.prototype.toString
    .call(x)
    .slice(8, -1)
    .toLowerCase()

const by = {
  // 默认逻辑排序
  default: (a, b) => {
    const typeA = getType(a)
    const typeB = getType(b)
    // 如果两个数中有一个是空值，则把空值放到后面
    if (typeA === 'void' || typeB === 'void') {
      return by.void(a, b, typeA, typeB)
    } else {
      // 某些不能进行比较的类型（如 '{}' 和 '{}'），
      // 需要报警告，并忽略此次比较的顺序
      // constructor 的作用稍后介绍
      const canSort = constructor[typeA] && typeA === typeB
      !canSort && console.warn(`[TIP] 不能排序对 ${a} 和 ${b} 排序，忽略此次比较。你可以传入自定义排序函数对对象进行排序。`)
      return canSort
        // 正常比较
        ? by.type(typeA)(a, b)
        // 跳过比较
        : undefined
    }
  },
  // 空值的比较函数比较好理解，
  // 两个都是空值则没有先后顺序
  // 如果只有一个空值，那么将空值放到后面
  void: (a, b, ta, tb) => {
    if (ta === tb) return 0
    if (a) return -1
    if (b) return 1
  },
  // 正常比较以值的类型为准
  // 为了防止属性中出现不同的值类型的情况，
  // 需要将值做一次转换（强制转换）
  // 假设我们需要比较 Symbol 的值，那就需要将其先转成字符串，
  // constructor 的作用正是类似于强制转换函数，
  // 比如 symbol 的强制转换，
  // 等同于将 Symbol('x') 进行 Symbol('x').toString() 处理
  type: type => (a, b) => {
    const Type = isFn(type) ? type : constructor[type]
    if (!Type) throw new Error(`Error occured when compare value ${a} with value ${b}`)
    const va = Type(a), vb = Type(b)
    return va === vb ? 0 : (va < vb ? -1 : 1)
  },
}

var constructor = {
  date: x => +x,
  string: String,
  number: Number,
  boolean: Boolean,
  symbol: x => x.toString()
}
```

完善排序逻辑后，我们的比较函数终于能支持各种特殊值的比较啦。对于不能比较的值，也会报警提醒我们比较过程可能出了问题。

![不能比较的值也会报警告](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210110234658.png)

### 抽象排序过程

在开始最难的部分之前，先完整过一遍排序的主要流程。

工厂函数支持传入字符串或是自定义函数。传入的字符串形如：album.name。如果是字符串的话，会通过 generate 函数生成一个新的排序函数。如果字符串是 -album.name，那么还会调用特殊逻辑，将排序结果反转。总之，工厂函数会按字参数返回新的排序函数。

**请你想象，在此之上的抽象是什么？**

传入字符串，无非是为了支持“命令式”排序。字符转可以看成“指令”。每一个指令，都对应一种特定的排序方法。比如说，负号指代“将排序顺序反转的方法”，album.name 指代“从对象中取出 album.name 的值的方法”。

当然，我还可以列出更多：

* 正序：原样返回排序结果的方法
* 倒序：将排序顺序反转的方法
* 随机排序：返回随机结果的方法
* 空值排序：将空值的顺序放到非空值后面的方法
* 字典排序：按照字典顺序返回排序结果的方法
* 属性长度：获取字段的值长度的方法
* 属性包含：获取判断字段的值是否包含某值的方法
* 属性判断：获取判断字段的值是否等于某值的方法
* ...

无论列举多少种新的方法，都可以归类为两种形式：

* 解构形式：处理排序参数的函数
* 插件形式：处理排序结果的函数

其实，两种形式都对应了一种特殊的代码结构。

解构好理解，解构是一种能接受排序函数，再接受排序参数，然后返回使用排序函数处理解构函数处理过的参数的结果的形式。

```js
// 以获取歌曲名称插件举例
const mapFn = song => song.name
const getNameMap = sortFn => (...args) => sortFn(...args.mapFn(x => mapFn(x)))
```

插件的定义则稍微有点绕：插件是一种能接受排序函数，再接受排序参数，然后返回使用插件逻辑处理排序函数处理的排序参数的结果的形式。

```js
// 以倒序插件举例
const plugFn = fn => (a, b) => -fn(a, b)
const descendSort = sortFn => (...args) => plugFn(sortFn(...args))
```

理解以上定义后，我们会得到“用来创建插件的函数”和“用来创建解构的函数”：

```js
const plugin = 
  plugFn => 
  sortFn => (...args) => plugFn(sortFn(...args))
const mapping = 
  mapFn => 
  sortFn => (...args) => sortFn(...args.mapFn(x => mapFn(x)))
```

我将“插件（形式）”和“解构（形式）”统称为：插件。

也就是说，传入的字符串，最终都会经过 generate 函数处理以得到某种插件。所以，按照这种逻辑，字符串 API，也就是指令，能实现形式上的统一：

* album.name：解构插件，即 song => song.album.name
* name-dec()：解构插件+倒序插件，即 song => song.name 加上 sortFn => (...args) => -sortFn(...args)
* name-is(Lionad)：解构插件+属性判断插件，即 song => song.name 加上 name => name === 'Lionad'

题外话：希望到这里我还能讲得清楚。如果大家已经晕了的话，可以直接拉到文末看源码，也许源码的结构看起来要比我讲得反而更清楚些。

我们先改造 generate 函数，使其支持同一类型的 API，也就是，中横线将作为指令间插件的分割，不再是指代将结果取反。

首先，每一个指令都需要一个数组去存储插件。

```js
// 指令中的插件作为数组元素存放在 Sort 实例中的 pipeline（流水线）字段中。
function Sort() {
  this.pipeline = []
}
// 给指令添加一个解构插件
Sort.prototype.map = function (_value) {
  this.pipeline.push({ _value, _type: 'map' })
  // 返回 this 以支持链式调用
  return this
}
// 给指令添加一个插件
Sort.prototype.plugin = function (_value) {
  this.pipeline.push({ _value, _type: 'plugin' })
  return this
}
```

接下来改造 generate。

```js
// 从字符串指令中得到排序函数
function generate(s) {
  // 创造一个新的排序指令实例
  const sort = new Sort()
  let [...actions] = s.split('-')
  actions = actions.filter(x => x)
    .map(action => {
      // 使用这个方法，匹配出插件名和插件参数
      // 如 album.name 的名称为 album.name，参数为空
      // 又如 is(Lionad) 的名称为 is，参数为 Lionad
      const [all, name, argsWithQuote, args] = action.match(/([^(]+)(\(([^)]*)\))?/)
      // 所有没有带括号的插件，都会被当成属性解构插件
      // 如 name-is 是 song => song.name 和 song => song.is 的结合，
      // 是没有意义的，这样写还不如拆分成两个指令，
      // name 指令和 is 指令，再依次排序
      const plugin = argsWithQuote
        ? defaultPlugin[name]
        // defaultPlugin 接下来会说明
        : defaultPlugin.default(name)

      plugin(sort, args || undefined)
    })
  return sort
}
```

defaultPlugin 也就是内置的插件，来看看它的实现：

```js
const plugins = {
  // 倒序插件
  dec: sort => sort.plugin(fn => (...args) => -fn(...args)),
  // 属性判断插件
  is: (sort, args = '') => sort.map(x => x === args).sortby('boolean'),
  // 解构插件，处理对象的属性如 'a.b.c' 的值
  default: name => {
    const pathsStore = name.split('.')
    const getVal = x => {
      const paths = [...pathsStore]
      let val = x
      while (val && paths.length) {
        next = paths.shift()
        val = val[next]
      }
      return val
    }
    return sort => sort.map(getVal)
  }
}
// 指令实例使用 compare 字段保存排序逻辑
// 比如 sortBy('number') 表示，
// 结果将按 a === b ? 0 : (a < b -1 : 1) 的形式排序
Sort.prototype.sortby = function (fn) {
  this.compare = isFn(fn) ? fn : by.type(fn.toLowerCase())
}
```

现在，假设有以下数据进行排序。

```js
const songs = [
  { name: 'shanghai' },
  { name: 'beijing' },
  { name: 'home' }
]
songs.sort(factory('name-is(home)'))
// Results：
// [ 
//   { name: 'shanghai' },
//   { name: 'beijing' },
//   { name: 'home' } // !?
// ]
```

因为 true 总是大于 false，所以虽然我们的语义上是希望 true 排在 false 前面，但是不能得所愿。

所以 constructor 需要改进一下：

```js
const constructor = {
  date: x => +x,
  string: String,
  number: Number,
  // 看这里！
  // 布尔值在比较前需取反处理
  // 这样才能得到语义上正确的结果
  boolean: x => !x,
  symbol: x => x.toString()
}
```

抽象排序过程的最后一步，我们需要把指令中所有的插件融合成一个新的排序函数，就像主函数 factory 做的那样。这个函数叫做 seal 封装。

对 factory 来说，传入字符串指令和自定义排序函数是等价的，可以把插件返回的最终函数也等价于一个自定义排序函数，也就是封装函数的返回值等价于 (a, b) => a - b 这种形式。等等，这正是 this.compare！那逻辑就清晰了，seal 把流水线中的所有插件打包成一个，能接受排序函数，再接受排序参数，然后返回排序函数处理排序参数的结果的函数。

“能接受排序函数，再接受排序参数，然后返回排序函数处理排序参数的结果的函数”，用代码表示就是：

```js
const pass = sortFn => (...args) => sortFn(...args)
```

接下来，继续完善 seal 函数。

```js
Sort.prototype.seal = function (fn) {
  // 如果一个指令没有定义排序逻辑，那么走默认排序逻辑，
  // 即先获取参数类型，再判断能不能比较、要不要 console.warn 那段逻辑
  this.compare = this.compare || by.default

  const pass = sortFn => (a, b) => sortFn(a, b)

  return this.pipeline
    // 处理流水线，返回 pass 形式的函数
    .reduce(() => { /* whatever */ }, initValue)
    // 再传入排序函数
    // 最终返回形如 (a, b) => this.compare(a, b) 的函数
    (this.compare)
}
```

额，**(⊙﹏⊙)**，所以 seal 中的 reduce 到底怎么写？

你还记得之前是怎么定义的向流水线中添加插件的函数吗。也就是 Sort.prototype.map 和 Sort.prototype.plugin：

```js
Sort.prototype.map = function (_value) {
  this.pipeline.push({ _value, _type: 'map' })
}
Sort.prototype.plugin = function (_value) {
  this.pipeline.push({ _value, _type: 'plugin' })
}
```

流水线中每一个值，都有元属性 _type 去指代它到底是解构还是插件，所以需要在 seal 中有针对性地处理这两种情况。

```js
Sort.prototype.seal = function () {
  this.compare = this.compare || by.default

  const pass = sortFn => (...args) => sortFn(...args)
  const plugin = plug => sortFn => (...args) => plug(sortFn(...args))
  const mapping = map => sortFn => (...args) => sortFn(...args.map(x => map(x)))

  return this.pipeline.reduce((lastSortFn, current) => {
    const { _type, _value } = current
    if (_type === 'map') return mapping(lastSortFn(_value))
    if (_type === 'plugin') return plugin(_value)(lastSortFn)
  }, pass)(this.compare)
}
```

先以 song => song.name 这个插件举例：mapping 接受一个解构，返回 pass 形式函数，所以只需要将插件的值 _value 传给 mapping 就好了，即 mapping(_value)。

再以倒序插件，也就是 fn => (a, b) => -fn(a, b) 举例：plugin 接受一个插件，并返回 pass 形式函数，所以只需要将插件的值 _value 传给 plugin 就好了，即 plugin(_value)。

！Σ(っ °Д °;)っ 既然 mapping(_value) 和 plugin(_value) 就好了，那么 mapping(lastSortFn(_value)) 以及 plugin(_value)(lastSortFn) 是什么鬼？

这其实是将 pass 函数调用一次，像剥洋葱一样，去掉了一层结构，使得 pipeline 中存在多个插件时，排序的逻辑能一直传递下去（也就是为什么它叫 pass，跳过函数）。这里玩一个小小的游戏：

```js
// 定义一个打印函数
const log = info => console.log(info)
// 定义 pass 函数
const pass = fn => (...args) => fn(...args)
// 无论我们将 anotherLog 封多少层 pass...
const anotherLog = pass(pass(pass(pass(log))))
// 最终，anotherLog 作用和原打印函数都是一致的
anotherLog('test')
// 'test'
```

最后，简单提及一下为什么 Reduce 最终要返回 pass 形式函数，因为需要一个 pass 去接受 this.compare。

好吧，终于把 Anysort 写完了，可以任意跑、任意排序了。

题外话：也许在函数式编程的概念中，pass 是已知的一种模式。（也就是说如此一来，pass 就成了某种模式的拙劣模仿。）还请各大佬批评斧正...

## 完整代码

Anysort 本来是写在我的网易云爬虫脚本里面的，不过总感觉这种绕来绕去的代码太有意思了，于是我单独把它抽出来做成了一个独立项目。因为十分灵活，所以才叫做“Anysort”。

以下展示其灵活、强大的配置功能。就算不懂代码的人也能轻松看懂和配置。

```js
const posts = [
  { tag: ['mp3'], status: '', date: new Date('2015-01-02'), comments: { length: 5 } },
  { tag: ['mp3'], status: '', date: new Date('2015-01-02'), comments: { length: 6 } } ,
  { tag: ['mp4'], status: '', date: new Date('2014-06-01'), comments: { length: 7 } },
  { tag: ['blog'], status: 'editing', date: new Date('2012-01-02'), comments: { length: 3 } },
  { tag: ['blog'], status: 'done', date: new Date('2013-05-06'), comments: { length: 1 } },
  { tag: ['blog'], status: 'editing', date: new Date('2012-01-02'), comments: { length: 2 } },
  { tag: ['blog'], status: 'editing', date: new Date('2014-01-02'), comments: { length: 3 } },
  { tag: ['blog'], status: 'done', date: new Date('2014-02-02'), comments: { length: 4 } },
];

// 选择正在写的博客，根据评论数倒序、时间倒序展示
posts.sort(
  anysort(
    'tag-has(blog)',
    'status-is(editing)',
    'comments-len()-dec()',
    'date-dec()'
  )
)

// Results in:
//  { "tag": ["blog"], "status": "editing", "date": "2014-01-02", "comments": { "length": 3 } },
//  { "tag": ["blog"], "status": "editing", "date": "2012-01-02", "comments": { "length": 3 } },
//  { "tag": ["blog"], "status": "editing", "date": "2012-01-02", "comments": { "length": 2 } },
//  { "tag": ["blog"], "status": "done", "date": "2014-02-02", "comments": { "length": 4 } },
//  { "tag": ["blog"], "status": "done", "date": "2013-05-06", "comments": { "length": 1 } },
//  { "tag": ["mp4"], "status": "", "date": "2014-06-01", "comments": { "length": 7 } },
//  { "tag": ["mp3"], "status": "", "date": "2015-01-02", "comments": { "length": 6 } },
//  { "tag": ["mp3"], "status": "", "date": "2015-01-02", "comments": { "length": 5 } },

```

最后是完整的源码。

```js
const isVoid = x => x == undefined
const getType = x => isVoid(x) ? 'void' : Object.prototype.toString.call(x).slice(8, -1).toLowerCase()
const isFn = x => getType(x) === 'function'

const constructor = {
  date: x => +x,
  string: String,
  number: Number,
  // The priority of true is greater than false
  boolean: x => !x,
  symbol: x => x.toString()
}

const by = {
  default: (a, b) => {
    const typeA = getType(a)
    const typeB = getType(b)
    if (typeA === 'void' || typeB === 'void') {
      return by.void(a, b, typeA, typeB)
    } else {
      const canSort = constructor[typeA] && typeA === typeB
      !canSort && console.warn(`[TIP] 不能排序对 ${a} 和 ${b} 排序，忽略此次比较。你可以传入自定义排序函数对对象进行排序。`)
      return canSort
        ? by.type(typeA)(a, b)
        : undefined
    }
  },
  type: type => (a, b) => {
    const Type = isFn(type) ? type : constructor[type]
    if (!Type) throw new Error(`Error occured when compare value ${a} with value ${b}`)
    const va = Type(a), vb = Type(b)
    return va === vb ? 0 : (va < vb ? -1 : 1)
  },
  void: (a, b, ta, tb) => {
    if (ta === tb) return 0
    if (a) return -1
    if (b) return 1
  }
}

function Sort() {
  this.compare = null
  this.pipeline = []
}
Sort.prototype.map = function (_value) {
  this.pipeline.push({ _value, _type: 'map' })
  return this
}
Sort.prototype.plugin = function (_value) {
  this.pipeline.push({ _value, _type: 'plugin' })
  return this
}
Sort.prototype.sortby = function (fn) {
  this.compare = isFn(fn) ? fn : by.type(fn.toLowerCase())
}
const pass = sortFn => (...args) => sortFn(...args)
Sort.prototype.seal = function () {
  this.compare = this.compare || by.default

  const plugin = plug => sortFn => (...args) => plug(sortFn(...args))
  const mapping = map => sortFn => (...args) => sortFn(...args.map(x => map(x)))

  return this.pipeline.reduce((lastSortFn, current) => {
    const { _type, _value } = current
    if (_type === 'map') return mapping(lastSortFn(_value))
    if (_type === 'plugin') return plugin(_value)(lastSortFn)
  }, pass)(this.compare)
}

// 加了许多默认插件，挺有意思的~~
// 如果有更多好玩的，欢迎 PR~~
const plugins = {
  by: (sort, args) => sort.sortby(args),
  asc: sort => sort.plugin(pass),
  dec: sort => sort.plugin(fn => (...args) => -fn(...args)),
  rand: sort => sort.plugin(() => () => Math.random() < .5 ? -1 : 1),
  is: (sort, args = '') => sort.map(x => x === args).sortby('boolean'),
  all: (sort, args = '') => sort.map(x => x.every(y => y === args)).sortby('boolean'),
  has: (sort, args) => sort.map(x => x.includes(args)).sortby('boolean'),
  not: (sort, args = '') => sort.map(x => args ? (x !== args) : !x).sortby('boolean'),
  len: (sort, args = null) => isVoid(args)
    ? sort.map(x => x.length).sortby('number')
    : sort.map(x => x.length === args).sortby('boolean'),

  default: name => {
    const pathsStore = name.split('.')
    const getVal = x => {
      const paths = [...pathsStore]
      let val = x
      while (val && paths.length) {
        next = paths.shift()
        val = val[next]
      }
      return val
    }
    return sort => sort.map(getVal)
  }
}

function generate(s) {
  const sort = new Sort()
  let [...actions] = s.split('-')
  actions = actions.filter(x => x)
    .map(action => {
      const [all, name, argsWithQuote, args] = action.match(/([^(]+)(\(([^)]*)\))?/)
      const plugin = argsWithQuote
        ? plugins[name]
        : plugins.default(name)
      plugin(sort, args || undefined)
    })
  return sort.seal()
}

function factory(...cmd) {
  cmd = cmd.reduce((h, c) => (h.concat(c)), [])
  if (cmd.length < 1) return undefined

  const sortFns = cmd.map((x, i) => {
    try {
      return isFn(x) ? x : generate(x)
    } catch (error) {
      throw new Error(`Error on generate sort function, Index ${i + 1}th: ${x}.`)
    }
  })

  const flat = fns => (a, b) => fns.reduce((sortResult, fn) => sortResult || fn(a, b), 0)
  return flat(sortFns)
}

module.exports = factory
```

## 阅读更多

都看到这儿了，不点个赞，三连一下再走嘛呜呜呜 ┭┮﹏┭┮

你可以在这儿找到源码地址和测试文件：[Lionad-Morotar/any-sort](https://github.com/Lionad-Morotar/any-sort)，如果有什么好玩儿的想法，欢迎 Fork 及 PR~

啊对了，差点忘了文章开头还说到我是在给歌单排序来着。

这个是歌单爬虫的地址，大家可以随意参观：[Lionad-Morotar/checheyun](https://github.com/Lionad-Morotar/checheyun)，不过项目比较乱，没啥规范，别期待能从里面找到啥有用的东西... 如果大家想给自己的歌单排序又看不懂这玩意儿的话，那就来我的博客留言好了，留下歌单地址和排序方式，我帮你排序，你再把排序好的歌单复制黏贴回去就行儿。