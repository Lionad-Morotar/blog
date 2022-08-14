# 面试题题库

[TOC]

<style>
  h4 a {
    text-decoration: underline !important;
    text-decoration-color: #b2b2b2 !important;
  }
  h4 a:hover {
    text-decoration-color: #c62222 !important;
  }
</style>

## 算法题

#### [简单-斐波那契数列](https://leetcode.cn/problems/fibonacci-number/)

斐波那契数列指以 0、1、1、2、3、5、8... 之后每一项都是前面两项数字之和这种规律排列的数组。给定 n，计算数列第 n 项的值。

后续提问方向：

* [简单-非递归解法（递推）](https://leetcode.cn/problems/fibonacci-number/solution/fei-bo-na-qi-shu-by-leetcode-solution-o4ze/#%E6%96%B9%E6%B3%95%E4%B8%80%EF%BC%9A%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92)
* 简单-时间复杂度最小的解法（枚举）

#### [简单-合并有序链表](https://leetcode.cn/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof/)

输入两个有序的链表的头节点，返回合并好的链表的头节点。如输入 1->2->4 和 1->3->4，输出 1->1->2->3->4->4

后续提问方向：

* [简单-空间复杂度最小的解法（迭代）](https://leetcode.cn/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof/solution/he-bing-liang-ge-pai-xu-de-lian-biao-by-g3z6g/#%E6%96%B9%E6%B3%95%E4%BA%8C%EF%BC%9A%E8%BF%AD%E4%BB%A3)

#### [简单-反转链表](https://leetcode.cn/problems/fan-zhuan-lian-biao-lcof/submissions/)

输入一个链表的头节点，输出该链表反转后的头节点。如输入 1->2->3，输出 3->2->1

后续提问方向：

* [简单-空间复杂度最小的解法（迭代）](https://leetcode.cn/problems/fan-zhuan-lian-biao-lcof/solution/fan-zhuan-lian-biao-by-leetcode-solution-jvs5/#%E6%96%B9%E6%B3%95%E4%B8%80%EF%BC%9A%E8%BF%AD%E4%BB%A3)
* 中等-环形链表或包含环的链表的反转

#### [中等-有效的括号字符串](https://leetcode.cn/problems/valid-parenthesis-string/)

给定由 '('、')'、两种字符的字符串，验证左右括号是否配对。

* ")(()))"          =>  false
* "(())((()())())"  =>  true

后续提问方向：

* 困难-增加星号字符，"*"，可作为单个左括号或单个右括号或空字符串使用，测试用例“(((((())\*)))()))(()((\*()\*(\*)))(\*)()”

#### [中等-数组第K个最大元素](https://leetcode.cn/problems/kth-largest-element-in-an-array/)

给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。

后续提问方向：

* 困难-使用时间复杂度为 O(n) 的解法。

#### [中等-二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/)

给定二叉树的根节点 root，返回树的层序遍历的结果。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220812013637.png)

输入：如上图所示。输出：[[3],[9,20],[15,7]]

## 编程题

#### 简单-bind

<details>
  <summary>用例</summary>
  <Highlight>
    const a = {
      name: 'a',
      say() {
        console.log(this.name)
      },
    }
    const c = {
      name: 'c',
    }
    a.say.bind(c)() // "c"
  </Highlight>
</details>

<details>
  <summary>参考实现</summary>
  <Highlight>
    Function.prototype.bind = function bind(context = globalThis) {
      const fn = this
      context.fn = fn
      return (...args) => {
        const res = context.fn(...args)
        delete context.fn
        return res
      }
    }
  </Highlight>
</details>

#### 中等-instanceof

instanceof 运算符先通过检测类的 Symbol.hasInstance 来判断对象是否是类实例，如果没有相应方法则检测构造器的原型在不在对象的原型链上。

<details>
  <summary>参考实现</summary>
  <Highlight>
    function _instanceof (val, fn) {
      const hasInstance = fn[Symbol.hasInstance]
      if (hasInstance) {
        return fn[Symbol.hasInstance](val)
      }
      const proto = fn.prototype
      while ((val = Object.getPrototypeOf(val))) {
        if (val === proto) {
          return true
        }
      }
      return false
    }
  </Highlight>
</details>

后续提问方向：

* 困难-有哪些判断类型的方法？各有什么优缺点？
* 偏门-创造一个类 God 使得 `null instanceof God` 为真

#### 中等-深拷贝函数

<details>
  <summary>参考实现</summary>
  <Highlight>
    function cloneDeep (obj) {
      if (typeof obj !== 'object') {
        return obj
      }
      if (obj instanceof Array) {
        return obj.map(cloneDeep)
      }
      return Object.entries(obj).reduce((h, [k, v]) => {
        h[k] = cloneDeep(v)
        return h
      }, {})
    }
  </Highlight>
</details>

后续提问方向：

* 中等-如何支持多种类型，如 Function、Symbol、Undefined、RegExp、Math
* 中等-如何处理对象间循环引用

#### 中等-柯里化函数

<details>
  <summary>用例</summary>
  <Highlight>
    const add = curry(function (a, b) {  return a + b })
    const add5 = add(5)
    add5(6) // 11
  </Highlight>
</details>

<details>
  <summary>参考实现</summary>
  <Highlight>
    const curry = (fn, ...args) => {
      if (args.length >= fn.length) {
        return fn.apply(null, args)
      } else {
        const newFn = (...extraArgs) => curry(fn, ...args, ...extraArgs)
        Object.defineProperty(newFn, 'length', { value: fn.length - args.length })
        return newFn
      }
    }
  </Highlight>
</details>

#### 中等-列表数据转树结构

<details>
  <summary>用例</summary>
  <Highlight>
    // 输入
    [
      {
        id: "1",
        name: "page",
      },
      {
        name: "page-name",
        id: "2",
        parent: "1",
      },
      {
        name: "text",
        id: "3",
        parent: "2",
      },
      {
        name: "text",
        id: "4",
        parent: "2",
      }
    ]
    // 输出
    [
      {
        "id": "1",
        "name": "page",
        "components": [
          {
            "name": "page-name",
            "id": "2",
            "parent": "1",
            "components": [
              {
                "name": "text",
                "id": "3",
                "parent": "2",
              },
              {
                "name": "text",
                "id": "4",
                "parent": "2",
              }
            ]
          }
        ]
      }
    ]
  </Highlight>
</details>

<details>
  <summary>参考实现</summary>
  <Highlight>
    function toTree (data) {
      data = data || []
      const map = {}
      const roots = []
      data.map(x => map[x.id] = x)
      data.map(x => {
        if (map[x.parent]) {
          map[x.parent].components = map[x.parent].components || []
          map[x.parent].components.push(x)
        } else {
          roots.push(x)
        }
      })
      return roots
    }
  </Highlight>
</details>

#### [中等-Promise.mapSeries](http://bluebirdjs.com/docs/api/promise.mapseries.html)

<details>
  <summary>用例</summary>
  <Highlight>
  const fileNames = ["1.txt", Promise.resolve("2.txt"), "3.txt"]
  Promise.mapSeries(fileNames, function(fileName, index, arrayLength) {
      return fs.readFileAsync(fileName).then(function() {
          return fileName + "!"
      });
  }).then(function(result) {
      console.log(result)
      // ["1.txt!", "2.txt!", "3.txt!"]
  })
  </Highlight>
</details>

<details>
  <summary>参考实现</summary>
  <Highlight>
    Promise.mapSeries = (arr, fn) => {
      if (!Array.isArray(arr)) {
        throw new TypeError(`Promise.mapSeries requires array, but got ${typeof arr}`)
      }
      return new Promise(async (resolve) => {
        const results = []
        for (let i = 0; i < arr.length; i++) {
          const val = await Promise.resolve(arr[i])
          results[i] = await fn(val, i, arr.length)
        }
        resolve(results)
      })
    }
  </Highlight>
</details>

后续提问方向：

* 困难-给实现加上类型（TypeScript）

## 综合题

#### 简单-统计当前页面用到的所有HTML标签的种类

<details>
  <summary>参考实现</summary>
  <Highlight>
    [...new Set([...document.querySelectorAll('*')].map(x => x.tagName))]
    // ['HTML', 'DIV', 'SPAN', ...]
  </Highlight>
</details>

#### 中等-商品排序

设计一个支持扩展的排序函数。使得给定的食物列表按照价格升序、评分降序的顺序排列。

<details>
  <summary>用例</summary>
  <Highlight>
    const food = [
      { name: "Suger", price: 1, rating: 3 },
      { name: "Chocolate", price: 3, rating: 4 },
      { name: "Burger", price: 3, rating: 2 },
      { name: "Cola", price: 1, rating: 5 },
      { name: "Pizza", price: 5, rating: 3 },
    ]
    food.sort(yourSortFunction)
    // [{"name": "Cola","price": 1,"rating": 5},
    //  {"name": "Suger","price": 1,"rating": 3},
    //  {"name": "Chocolate","price": 3,"rating": 4},
    //  {"name": "Burger","price": 3,"rating": 2},
    //  {"name": "Pizza","price": 5,"rating": 3}]
  </Highlight>
</details>

<details>
  <summary>参考实现</summary>
  <Highlight>
    const sort = map => compareFn => (a, b) => compareFn(map(a), map(b))
    const flipComparison = fn => (a, b) => -fn(a, b)
    const byValue = (a, b) => a - b
    const byPrice = sort(e => e.price)(byValue)
    const byRating = sort(e => e.rating)(flipComparison(byValue))
    const sortFlattend = sortFns => (a, b) => sortFns.reduce((sortResult, fn) => sortResult || fn(a,b), 0)
    const byPriceThenRating = sortFlattend([byPrice, byRating])
    // food.sort(byPriceThenRating)
  </Highlight>
</details>

#### 困难-给定以下递归函数提问

```js
function recur(n) {
    if (n === 0) console.log(n)
    else recur(n - 1)
}
recur(500000)
// >>> RangeError: Maximum call stack size exceeded
```

* 简单-将该函数转换为循环的写法避免栈溢出
* 困难-使用任意循环以外的方法改写函数避免栈溢出

<details>
  <summary>参考实现</summary>
  <Highlight>
    function recur(n) {
      if (n === 0) console.log(n)
      else return () => recur(n - 1)
    }
    function trampoline(fn) {
      let res = () => fn()
      while (res instanceof Function) {
          res = res()
      }
      return res
    }
    trampoline(recur(50000000)) // 0
  </Highlight>
</details>

#### 困难-商品全排列

任意技术栈。给定商品的规格信息以及库存列表，实现商品的全排列表格。表格行首有 checkbox，表格能多选，但如果库存中没有此行的商品规格则此行不能被选中。

<details>
  <summary>基础代码及用例</summary>
  <p>
    <img src="https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220812105700.png" />
    代码地址：<a href="https://element-plus.run/#eyJBcHAudnVlIjoiPHRlbXBsYXRlPlxuICA8ZWwtdGFibGUgOmRhdGE9XCJ0YWJsZURhdGFcIiBzdHlsZT1cIndpZHRoOiAxMDAlXCI+XG4gICAgPGVsLXRhYmxlLWNvbHVtbiB0eXBlPVwic2VsZWN0aW9uXCIgd2lkdGg9XCI1NVwiIC8+XG4gICAgPGVsLXRhYmxlLWNvbHVtbiBwcm9wPVwibmFtZVwiIGxhYmVsPVwi5ZCN56ewXCIgd2lkdGg9XCIxODBcIiAvPlxuICAgIDxlbC10YWJsZS1jb2x1bW4gcHJvcD1cImNvbG9yXCIgbGFiZWw9XCLpopzoibJcIiAvPlxuICAgIDxlbC10YWJsZS1jb2x1bW4gcHJvcD1cInNhbGVzZXRcIiBsYWJlbD1cIuWll+mkkFwiIC8+XG4gICAgPGVsLXRhYmxlLWNvbHVtbiBwcm9wPVwic2l6ZVwiIGxhYmVsPVwi5YaF5a2YXCIgLz5cbiAgPC9lbC10YWJsZT5cbjwvdGVtcGxhdGU+XG48c2NyaXB0IGxhbmc9XCJ0c1wiIHNldHVwPlxuICAvLyDllYblk4HlsZ7mgKfmmI7nu4ZcbiAgY29uc3Qgc3BlY0xpc3QgPSBbXG4gICAgeyB0aXRsZTogXCLpopzoibJcIiwga2V5OiAnY29sb3InLCBsaXN0OiBbXCLnuqLoibJcIiwgXCLntKvoibJcIiwgXCLnmb3oibJcIiwgXCLpu5HoibJcIl0gfSxcbiAgICB7IHRpdGxlOiBcIuWll+mkkFwiLCBrZXk6ICdzYWxlc2V0JywgbGlzdDogW1wi5aWX6aSQ5LiAXCIsIFwi5aWX6aSQ5LqMXCIsIFwi5aWX6aSQ5LiJXCJdIH0sXG4gICAgeyB0aXRsZTogXCLlhoXlrZhcIiwga2V5OiAnc2l6ZScsIGxpc3Q6IFtcIjY0R1wiLCBcIjEyOEdcIiwgXCIyNTZHXCJdIH1cbiAgXVxuICAvLyDliankvZnlupPlrZjliJfooahcbiAgY29uc3Qgc3RvcmFnZSA9IFtcbiAgICB7IGlkOiBcIjFcIiwgc3BlY3M6IFtcIue0q+iJslwiLCBcIuWll+mkkOS4gFwiLCBcIjY0R1wiXSB9LFxuICAgIHsgaWQ6IFwiMlwiLCBzcGVjczogW1wi57Sr6ImyXCIsIFwi5aWX6aSQ5LiAXCIsIFwiMTI4R1wiXSB9LFxuICAgIHsgaWQ6IFwiM1wiLCBzcGVjczogW1wi57Sr6ImyXCIsIFwi5aWX6aSQ5LqMXCIsIFwiMTI4R1wiXSB9LFxuICAgIHsgaWQ6IFwiNFwiLCBzcGVjczogW1wi6buR6ImyXCIsIFwi5aWX6aSQ5LiJXCIsIFwiMjU2R1wiXSB9XG4gIF1cbiAgY29uc3QgdGFibGVEYXRhID0gW11cbjwvc2NyaXB0PlxuIiwiaW1wb3J0X21hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge31cbn0iLCJfbyI6e319" rel="noopener noreferrer" target="_blank">Element Plus Playground</a>
  </p>
</details>

## 类型编程

#### 简单-Omit

<details>
  <summary>用例</summary>
  <Highlight>
    interface Todo {
      title: string
      description: string
      completed: boolean
    }
    type TodoPreview = MyOmit&lt;Todo, 'description' | 'title'&gt;
    const todo: TodoPreview = {
      completed: false,
    }
  </Highlight>
</details>

<details>
  <summary>参考实现</summary>
  <Highlight>
    type MyOmit&lt;T, K extends keyof T&gt; = {
      [P in Exclude&lt;keyof T, K&gt;]: T[P]
    }
  </Highlight>
</details>

#### 简单-Trim

<details>
  <summary>用例</summary>
  <Highlight>
    // trimed expected to be 'Hello World'
    type trimed = Trim<'  Hello World  '>
  </Highlight>
</details>

<details>
  <summary>参考实现</summary>
  <Highlight>
    type Trim&lt;S extends string&gt; = S extends
      | `${' ' | '\t' | '\n'}${infer Rest}`
      | `${infer Rest}${' ' | '\t' | '\n'}`
      ? Trim&lt;Rest&gt;
      : S
  </Highlight>
</details>

#### 中等-DeepReadonly

<details>
  <summary>用例</summary>
  <Highlight>
    type X = { 
      x: { 
        a: 1
        b: 'hi'
      }
      y: 'hey'
    }
    type Expected = { 
      readonly x: { 
        readonly a: 1
        readonly b: 'hi'
      }
      readonly y: 'hey' 
    }
    type Todo = DeepReadonly&lt;X&gt; // should be same as `Expected`
  </Highlight>
</details>

<details>
  <summary>参考实现</summary>
  <Highlight>
    type DeepReadonly&lt;T extends any&gt; = {
      readonly [P in keyof T]: T[P] extends (...args: any[]) => any
        ? T[P]
        : DeepReadonly&lt;T[P]&gt;
    }
  </Highlight>
</details>
