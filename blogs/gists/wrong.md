# 查缺补漏

[TOC]

## Variable

<details>
    <summary>Hoist | 调用这两个函数分别输出什么？如果第一行的注释打开，又会输出什么？</summary>
    <p>
        由于变量提升，check_1 会返回 undefined，check_2 中的 const 不提升，会报错；
        如果打开注释，check_1 的逻辑不变，check_2 中会返回 window.message 的值 'hello'。
    </p>
</details>

```js
// var message = 'hello'

function check_1(age) {
  if (age < 18) {
    var message = 1
  } else {
    var message = 2
  }
  return message;
}

function check_2(age) {
  if (age < 18) {
    const message = 3
  } else {
    const message = 4
  }
  return message;
}

console.log(check_1())
console.log(check_2())
```

<details>
    <summary>Hoist | 以下代码能正常运行吗？</summary>
    <p>因为调用 callMe 之前，defaultName 已经初始化完成了，所以 `name = defaultName` 不会报错。代码可以正常运行。</p>
</details>

```js
function callMe(name = defaultName) {
    console.log(name)
}
const defaultName = 'Lionad'
callMe()
```

<details>
    <summary>Declaration | 以下代码会输出什么？</summary>
    <p>1 和 Error。注意，y 会被声明为全局变量，如果你想避免这种情况发生，那就使用严格模式吧。</p>
</details>


```js
(function(){
  var x = y = 1
})()

console.log(y)
console.log(x)
```

## Number

<details>
    <summary>Operator | 以下代码会输出什么？</summary>
    <p>答案是 2；注意符号之间有空格，所以别误认为出现了自增符号。</p>
</details>

```js
console.log(1 + - + + + - + 1)
```

<details>
    <summary>Number | 以下代码会输出什么？</summary>
    <p>Number.MIN_VALUE 意味着在 JS 中最接近 0 的数，它大于 0。</p>
</details>

```js
console.log(Number.MIN_VALUE > 0)
```

<details>
    <summary>Number.parseInt | 以下代码会输出什么？</summary>
    <p>parseInt 意味着将某个数字转换为 10 进制数显示，第二个参数需传入该数字的原本进制。第一条语句输出 NaN，因为 3 非二进制；第二条语句输出 3，因为传入错误的进制数会导致回退回十进制；第三条语句输出“1 NaN 3”，因为 replace 会给其回调函数传入不止一个参数。实际上可看作 parseInt 调用了 [[1, 0], [2, 2], [3, 4]]</p>
</details>

```js
console.log(parseInt(3, 2))
console.log(parseInt(3, 0))
console.log("1 2 3".replace(/\d/g, parseInt))
```

## String

<details>
    <summary>Unicode | 以下代码会输出什么？</summary>
    <p>见：https://cjting.me/2018/07/22/js-and-unicode/</p>
</details>

```js
[..."mañana"].reverse().join("")
```

## Array

<details>
    <summary>Array | 以下表达式的值是多少？</summary>
    <p>“[,,]”。尽管 map 函数会跳过数组空项，但是 join 不会。同时，因为 JS 允许数组末尾空格，所以 [,,,] 只包含 3 个空项。</p>
</details>

```js
[,,,].join(", ")
```

## Object

<details>
    <summary>Setter / Getter | 以下代码会输出什么？</summary>
    <p>会报错。字面量定义 Setter 和 Getter 必须成双成对，不然没定义则回退为 undefined，所以在 splice 方法调用时，该段代码会报错。</p>
</details>

```js
const config = {
  languages: [],
  set language(lang) {
    return this.languages.push(lang)
  },
}
config.language.splice(0, 1, '1')
console.log(config.language)
```

## Function

<details>
    <summary>String.raw | 以下代码将输出什么？</summary>
    <p>“Hello\nworld”。String.raw 返回一段不对特殊字符转移的字符串。它可以作为函数调用，但是要传特定格式的参数，比较麻烦，所以一般作为模板字符串的标记使用。</p>
</details>

```js
console.log(String.raw`Hello\nworld`)
```

<details>
    <summary>Fn.prototype | 以下代码将输出什么？</summary>
    <p>会报错。箭头函数没有 prototype。</p>
</details>

```js
const say = () => "Hello"
say.prototype.sayAgain = () => "Hello"

say.sayAgain()
```

## Async & Await

<details>
    <summary>Async & Await | 以下代码将输出什么？</summary>
    <p>Promise {&lt;pending&gt;}。Await 会等待 Promise 的执行，但是仍然返回 Promise，所以 getData 需要调用 then 方法才能拿到结果。</p>
</details>

```js
const getData = async () => 
    await Promise.resolve('I made it!')

console.log(getData())
```

## Module

<details>
    <summary>Import & Require | 以下代码将输出什么？</summary>
    <p>关键字 Import 引入模块时，会对模块进行预检与解析，所以模块中的代码会先执行；如果是 Require 的话，由于是动态引入，所以模块中的代码不会先执行。</p>
</details>

```js
// index.js
console.log('running index.js');
import { sum } from './sum.js';
console.log(sum(1, 2));

// sum.js
console.log('running sum.js');
export const sum = (a, b) => a + b;
```

## 阅读更多

* [JavaScript Questions](https://github.com/lydiahallie/javascript-questions)
* [JavaScript Puzzlers!](http://javascript-puzzlers.herokuapp.com/)