# JavaScript 语言精粹与编程实践

## 语法

### 语法综述

语言中的标识符大致分为两类，用于绑定语义逻辑的语法关键字，和用于绑定数据及其存储位置的变量。两者分别限定了逻辑的作用域以及变量的生存周期，所以所谓“声明”，即约定了数据的生存周期以及逻辑的作用域；编程也就被解释成了“说明数据和逻辑”的过程。

可以使用 --check 指令检测语法错误：

```bash
echo '"hello world"' | node -c
```

### 声明语法

JS “识别的” 7 种数据类型叫做基本数据类型（第一类类型），识别是以 typeof 运算符为准的。早期的 JS 语言中，正则是可执行的（实现了 [[call]] 内部方法），所以 typeof 会返回 function，这一 bug 后来被修正。

撇开 OO 不论，JS 中有以下几种类型系统可以讨论：

* 基本数据类型：undefined、string、number、object[^oo]、function、boolean、symbol、bigint
* 值类型和引用类型[^string]

如果算上规范，可以再增加两种类型系统：

* ECMAScript 语言类型：Null、Undefined、String、Symbol、Number、BigInt、Object
* ECMAScript 规范类型：List、Record、Relation、Set、Completion Record、Reference、Property Description、Lexical Environment、Environtment Record，为叙述语言类型提供帮助

[^oo]: 在 ES6 之前，JS 被称为“基于对象语言”，而当其支持 class、super 等关键字后，被称为“支持类继承的面向对象系统”。
[^string]: 在赋值语句中字符串是个例外，按照引用类型处理。

变量声明一共两种形式：显式声明和隐式声明。隐式声明即赋值语句中出现了未声明的变量的情况，这种声明方式不可靠；其余的声明，包括 try...catch 子句中的异常变量都是显式声明。

let 和 var 声明一个不同的地方在于 let 声明不会在全局对象上挂新的属性。

需要注意的是尽管规范确定了常量声明不能再绑定，但是在 ES5 兼容环境或是 ES6 模拟环境中（如使用只读属性模拟常量），修改常量不会抛出异常。

相关字符串字面量的一些冷知识：

* 大于 U+FFFF 的字符的长度在 UTF8 文件夹的长度是 2，但是过换编码，结果不同，试了下 GBK 下的结果为 1。
* 空字符串也能作为对象的键。
* 字符串模板本质上是一个字面量的引用，在 JS 内部表达为一个带 raw 属性的类数组对象，这点可通过 String.raw 函数间接验证。题外话，String.raw 搭配 new RegExp 非常好用哦。

### 表达式运算

运算符不仅是各类标点，还有许多单词，如 typeof、void、new、in、delete、instanceof、yield、await 这些都算。

在规范中经常看到基本表达式（Primary Expression）的概念，它主要由两部分组成：

* 单值表达式：表达式的结果既该值，如 this、super、new.target、arguments 以及各种变量引用以及原始值、正则的字面量
* 非原始值字面量（数组、对象、函数）以及表达式分组运算（()）

可以发现，除了单值表达式外，表达式的结果应该是运算后得到的值（应该至少有一个运算符）。运算符得到的结果类型不外乎值类型、引用类型或 undefined 三种。

ES5 规范了将字符串作为类数组对象，也就是说可以通过下标存取取得字符串的值，但是不能改变它。从 ES6 开始，字符串添加了 Symbol.iterator 属性，可通过展开操作符、yield* 或 for...of 语句操作。

在位运算操作中，运算目标将强制为一个有符号的 32 位整数：非数值转化为数值、浮点数先向零取整，所以常见到“1.1 | 0”这种取证操作并不是位运算有什么魔法，而是在“|0”前，1.1 就被取整了，而任何数按位或 0 会得到其本身。

等值检测的一个缺陷是它不会区分 +0 和 -0，而这两者在数学运算中被认为是两个不同的数；它也不能区分 NaN，所以 ES6 新增了 Object.is 方法来判断 +0、-0 以及 NaN。

```js
Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

在比较判定中，JS 总是倾向将操作数转换为数字进行比较，因为字符串比较性能更差。比较运算同理，当字符串和非字符串进行比较时，会尝试将字符串转换为数字。

有一个特例，符号虽然能转化为布尔值，但是不在等值判定算法其中，也就不等值于 true：

```js
Boolean(Symbol()) // true
Symbol() == true // false
```

赋值也是运算符，所以左右两侧都是操作数。按照表达式的概念，操作数可以是值也可以是引用，所以类似“1 = 1”的表达式是可以通过语法检测的，不过只是在其他阶段会抛出引用错误。

```bash
echo "1 = 1" | node -c
```

函数调用也有“隐式调用”这一概念：

* 使用 new 运算符
* 模板处理函数 + 模板字符串调用
* 函数作为属性存取器且发生了属性存取操作时
* 函数作为符号属性（如 Symbol.hasInstance）并触发了对应操作时
* 使用 Proxy 创建了源函数的代理对象后，调用代理对象会隐式调用源函数
* 使用 bind 将源函数绑定为目标函数后，调用目标函数会隐式调用源函数

一直以为使用 bind 时是“创造”了新函数，啊，这里好迷。更迷的是，使用 new 运算符时虽然能见到函数名后面紧跟的小括号，但那不是调用运算符，而是 new 运算符的参数传入表，起调用作用的是 new 运算符，所以是隐式调用。

typeof 在运算符中是一个很特殊的存在，一般变量在表达式中都是以值参与运算，而 typeof 是求值的类型，可以无视标识符是否声明过，比如：

```js
typeof x // undefined
```

但有一个很疑惑的地方是，由于暂时性死区的存在，typeof 运算符也并不总是这么安全。

```js
typeof x // ReferenceError
let x
```

完整的运算符优先级列表如下：

|运算符|描述|
|---|---|
|()|成组运算|
|.、[]、new ()|对象成员存取、数组下标、带传参列表的 new 运算符|
|()、new|函数调用、new 运算符|
|++、--|后置递增、后置递减|
|+、-、++、--、~、!、delete、typeof、void|前置加、前置减、前置递增、前置递减、按位取反、逻辑非、delete、typeof、void|
|*、/、%|乘法、除法、取模|
|+、-、+|加法、减法、字符串连接|
|<<、>>、>>>|移位运算符|
|<、<=、>=、>、in、instanceof|关系运算符、in、instanceof|
|==、!=、===、!==|等值检测|
|&|按位与|
|^|按位异或|
|\||按位或|
|&&|逻辑与|
|\|\||逻辑或|
|?:|三木运算|
|=、oP=|赋值、运算赋值|
|yield、yield*|yield 表达式|
|...|展开运算符|
|，|逗号运算符、多重求值|

### 语句

按照类型，JS 中的语句可分为：声明语句、表达式语句、分支语句、循环语句、控制结构（continue、break 等）、其他（空语句、妇科语句、调式语句）、标签化语句。

需要注意的点：

* 调试语句（debugger;）用于开启宿主环境的调试器
* 除了分号外，EOF 也可以作为语句的结束标志（我没有试验成功）
* 大括号并不是 for...in 等语句的语法元素，但却是 try...catch 中的语法元素

解释一下为什么声明函数后没有办法直接加上小括号调用该函数，由于花括号是函数声明语句的语法成分（而不是理解为复合语句）所以解释器会自动在大括号结束后插入空格。

```js
function log(arg) {
  console.log(arg)
}(2)
```

在 for...in 等语句中声明的变量，如果是 var 声明，那么变量作用域将等同于当前所在函数级别，let 及 const 声明则等同于当前语句的块级作用域级别。try...catch 子句中显式声明的变量虽然没有 let、var 等声明关键字，但是经过测试发现其等同于 var 声明。

```js
try { throw 'test' } catch (e) {
  console.log(e); // test
  var e = 1;
}
```

标签不能作用与注释语句，因为注释会被解释器忽略，所以标签作用会渗透到下一个语句；同时他不能作用域导入导出、函数或类声明语句，因为这些语句没有可执行的意义。

continue 子句不允许跳转到“当前/外层的单个循环语句起始”之外的地方，所以在循环语句外面加上花括号是会报语法错误的：

```js
// it works !
test: for (i = 1; i < 3; i++) {
  for (j = 5; j < 8; j++) {
    if (j === 6) continue test;
    else console.log(i, j)
  }
}
// SyntaxError !
test: {
  for (i = 1; i < 3; i++) {
    for (j = 5; j < 8; j++) {
      if (j === 6) continue test;
      else console.log(i, j)
    }
  }
} 
```

ES2019 后，try...catch 允许省略 catch 中的 exception 声明部分。

try...finnally 中的结束处理的执行顺序需要注意，它会在 try 中的 return 后以及 try 中的 break 前执行。

### 模块

模块有几种导入方式：默认导入、名字导入、命名空间导入，其中默认导入能和另外两种组合使用，但是后两者不能混用。

```js
import defaultExport, { toolA } from 'test.mjs'
import defaultExport, * as namespace from 'test.mjs'
```

其中，名字导入中声明的标识符是本地的名字，但他是通过不可变间接绑定（immutable indirect binding）绑定到了源模块中的名字，所以不能够被修改，修改时会发生类型错误（修改时和常量类似）。

模块载入发生在执行之前装载模块的阶段。JS 使用深度遍历分析模块的依赖关系并递归装载，语法分析阶段只会在导出表建立对应名字的项，而名字与值的绑定要等到执行阶段才能完成，这和 var 声明类似，同时也能说明为什么允许导出值，比如：export default 1+2。

为什么处于严格模式时，用户代码没有办法动态地在模块顶层的命名空间中新增名字或标识符？

### 严格模式

严格模式使用一段字面量字符串“use strict”开启，它是一种“指示前缀”，当然，带上分号后也可以被称为“字面量表达式语句”。除了指示前缀这种方法，使用宿主的运行参数也可以开启，如“node --use_strict”。此外，ESModule 中的代码默认是以严格模式运行的，所以要小心顶层的 this 了！

“use strict”的位置非常严格，它必须是“第一个”语句，就算它前面有空语句或者其本身在标签语句中也不行。

总的来说，严格模式一共有七条限制：

* 对象字面量中不能有相同的属性声明
* 函数实参列表中不能有同名参数
* 不能声明、重写或删除 eval、arguments 标识符
* 不允许使用八进制数字字面量
* 不能删除显式声明的标识符、名字或具名函数
* 新增了 implements、interface、let、package、private、protected、public、static、yield 这些关键字
* 禁用 with 语句
* 禁用隐式声明
* 禁止扩展不可扩展对象、禁止删除封装对象或冻结对象的属性、禁止删除不可配置的属性或写只读属性
* 禁止访问 fn.caller 以及 arguments.callee 属性

有两种方法可以在严格模式中以非严格模式运行代码：

* 间接调用 eval 函数
* 使用 new Function 构造的新函数

### 运算符的二义性

某些标点符号的二义性（比如加号和连接运算符）使得引擎无法在语法分析阶段就确定符号的具体作用。

由于加法是值运算，所以涉及到对象加法，那么结果类型便变得不那么可控，这是 JS 中的类型系统饱受诟病的原因之一。这个问题的根源在于 JS 是动态语言，它具有动态类型绑定的特征。

某些语句或在特定语义下会发生类型转换，比如 if、while 语句的括号内的表达式会被隐式转换为布尔值，with 语句内括号中的表达式会被隐式转为对象。

一些语法结构被称为“Cover...”，因为在语法分析时，它包含了两种可能的推断，比如 async() 可以理解为调用 async 函数或是匿名同步函数的开头部分，因此 async () 也被称为 “Cover CallExpression And AsyncArrowHead”。

## 面向对象语言特性

### 语法综述

for...in 和 for...of 分别用来遍历对象的成员名和成员值，其中 for...of 不仅仅是用来设计为遍历数组的，所有实现了迭代器接口的对象都可以使用它，Array、Map、Set、String、TypedArray、arguments 等，这些对象也叫做集合（collections）。

从技术上来说，只有在内存中连续布局的才是多维数组，所以把 JS 种这种可以使数组分量指向其它数组的数组叫做“数组的数组”或“交错数组”。

正则中八进制和分组引用是冲突的（\ddd 和 \nn），当发生歧义时，优先理解为分组引用，若找到对应引用才理解为八进制字符匹配。

ES5 严格模式下，字面量中不允出现许同一个属性的名字声明和存取器声明，但这个限制在 ES6 被取消了。为什么要取消，没搞懂。

```js
var obj={
  set test(x){
    c='other';
  },
  get test(){
    return c
  },
  // 经过测试发现，声明按照只有最后一个生效，
  // 比如下面这行会覆盖上面两个属性存取器
  test: 'test'
}
```

ES6 的 class 本质上是声明构造器的一种方式，因而所谓类继承，其实也是传统原型继承模式的一种表现方式。extends 类似以下代码。

```js
// class A extends B { constructor() { super(/* 传入参数 */) } }
A.prototype = new B(/* 传入参数 */)
A.prototype.constructor = A
```

使用 class 声明的代码是处于严格模式的，这意味这 extends 声明中的代码也同样会处于严格模式，当然，必须是 extends 字面量声明（正常代码几乎不会这么做）。

类的静态成员方法也可以使用 super.x() 的方式调用，只是 this 会绑定到类的 constructor 上。

使用 Object.getOwnPropertyNames 可以列举对象的内置属性，但是规范只是推荐性质地约定了其中部分属性名，所以具体实现依赖引擎。使用 for...in 可以列举对象的成员名，但是顺序不可控，而使用 for...of 列举对象的成员值其顺序是可控的，只是它是调用对象内置的迭代器。严谨一点可以说 for...of 是列举“集合成员”而不是“对象成员”，假设你给数组对象新增了 'test' 名字的属性，那么 for...of 是不会遍历其值的。

总结一下遍历对象成员的方法：

| 键名 | 显隐式 | 语法 | 描述 |
|---|---|---|---|
| 一般键名 | 显式 | for...in | 可列举的成员名（包含原型链） |
| 一般键名 | 显式 | Object.prototype.map、Object.prototype.entries、... | ... |
| 一般键名 | 显式 & 隐式 | Object.getOwnPropertyNames() | 所有非符号的自由属性名 |
| 符号键名键名 | 显式 & 隐式 | Object.getOwnPropertySymbols() | 所有符号键名的自有属性名 |

非常老的引擎中可能不支持 in 运算符，一种比 obj[prop] 更好的替代方案是 typeof(obj[prop]) !== 'undefined'，因为前者会因隐式转换检测不出来某些假值。

delete 运算符有些特殊的地方：
* 可以删除某些全局属性，比如 window.isNaN，但是如果全局属性是通过 var 声明然后挂载到 window 上那就无法删除了
* 只在尝试删除不能被删除的属性才返回 false，其他时候，删除一个不存在的属性（删除继承得来的属性）都会返回 true

### 原型继承

一个对象的继承特性有三种实现方案，基于类、基于原型或是基于元类。JS 使用原型继承实现对象系统，并基于原型继承实现了具备类继承特征的对象系统。

对象的构造过程可以简单地理解为“对原型的复制”，但是复制的时机是一个问题，可以在构造时就完整复制一个新对象，但这样内存消耗过大；类似操作系统动态链接库，它采用了写时复制，也就是在对象发生读操作时直接读原型，发生写操作时再完整复制出一个新对象来，以减轻内存消耗；JS 采用了更细粒度的方法，在每个对象中维护了一个成员表，表中只维护对象的“自有属性”。所以在 JS 的原型继承实现中必须保证：

* 读对象的属性时优先读取对象的自有属性表
* 如果没有在自有属性表上找到指定属性，则尝试遍历对象原型，以及原型的原型，直到访问为空或是找到该属性。

也由于自有属性表的存在，在实现原型继承中的属性继承时，子类的属性的元属性如读写性不会继承父类，而是在自有属性表中进行维护。

函数与构造器之间没有明显的界限，唯一的区别只在于原型的 prototype 属性是不是一个有意义的值。ES6 之后的对象方法没有该属性，所以说对象方法也就不能被作为构造器调用。但是很遗憾，没复现，可能哪里理解有偏差：

```js
function test () {}
var a = { testb () {} }
a.testb.prototype = test.prototype
new a.testb() // TypeError
```

在[规范](https://262.ecma-international.org/12.0/#table-additional-essential-internal-methods-of-function-objects)里只中找到函数对象对内部方法 [[constructor]] 的描述：没有实现内部构造器方法的函数对象不能作为构造器。

最简单和直观的实现继承的方法是修改构造器的 prototype 属性以维护一个显式的原型链，这种方法也被称为“构造器原型链”。

```js
function Parent () {}
function Child () {}
Child.prototype = new Parent()
```

不过，由于原型上的 constructor 属性会回指构造函数，所以这种方法暗示 Child 的实例是由 Parent 构造的，显然是错误的，需要进行修改。

```js
// 这种方法动态地修改了原型（有点“野马脱缰”了）
Child.prototype.constructor = Child
```

```js
// 这种方法叫做圣杯模式
function Parent () {}
function Child () {
  this.constructor = Child
}
Child.prototype = new Parent()
```

修改原型是一种动态语言独有的特性，代表了继承层次可以“从无到有”的过程，理论上我们可以先构建一个没有任何成员的类属关系的继承系统，然后通过不断地修改原型，从而获得一个完整的对象系统。7

### 类继承

JS 中的类继承本质上还是通过原型继承实现的。使用类继承时，不仅会维护类和类之间的层级关系，也会维护对象（类也是对象）原型之间的继承关系，后者是 JS 自带的语义。使用原型继承仿制类继承关系的代码类似：

```js
/* 类声明 */
class Parent {}
class Child extends Parent {}
/* 仿制代码 */
function Parent() {}
function Child() {}
Object.setPrototypeOf(Child, Parent)
Object.setPrototypeOf(Child.prototype, Parent.prototype)
```

类是静态声明，其内部的成员或方法也是声明，也因此不能直接在声明的方法内部直接引用其名字。

super 并不是一个运算符，在规范中其只被称为关键字。另外，new 算然是运算符，但是 new.target 的出现打破了这个认知。

super 有效地解决了调用父类方法的问题，如果不使用 super 关键字，那么只能：

```js
object.prototype.method = function () {
  const thisClass = this.constructor
  const parentClass = thisClass.prototype.constructor
  const parentMethod = parentClass.method
  parentMethod()
}
```

super 的指向由几个规则所限制：

* 在类构造器中，super 指向父类构造器，this 指向 new 新创建的实例
* 在类构造器中，super.xxx 指向父类原型方法 xxx，this 指向 new 新创建的实例
* 在类方法中，super.xxx 指向父类原型方法 xxx，this 指向调用此方法的实例
* 在静态类方法中，super.xxx 指向父类方法 xxx，this 指向调用此方法的类
* 在字面量的方法中，super.xxx 指向字面量的原型方法 xxx，this 指向调用此方法时的 this

总结可以得出规律：

* super 和 super.xxx 都可以类构造器中使用，但其余情况只能使用 super.xxx
* 调用 super.xxx 时，this 绑定的为调用方法时的 this 对象

super 也是基于声明时所在的对象来进行计算的，就算把对象方法赋值给了其他方法，其绑定的语义也不会随着调用方不同而转移：

```js
proto = {data: 'test'}
obj = { test() { console.log(super.data) } }
Object.setPrototypeOf(obj, proto)

obj2 = Object.create(null)
obj2.test = obj.test
obj2.test() // 'test'
```

此外，super 在不同的语义下可能指向父类也可能指向父类原型，是为了在语义上同时支持类和原型继承，这也会带来一些困惑，比如想要在类方法中调用父类静态属性时，使用 super 还是做不到（只能使用 Object.getPrototypeOf(thisClass).constructor.xxx 替代），所以对象方法中缺乏一个重要的语法词汇“parent”来指示当前对象在它类继承链上的父类这种关系。

类继承和原型继承还有一个很不一样的区别：实例生成的时机不一样。原型继承中，实例是由 new 运算符生成的，构造逻辑直接由 new 调用的构造器掌握，而在类继承中，this 实例由 Object 构造，再沿着继承链上的构造器自顶向下执行完成构造过程。所以这引出一条著名的限制：在构造器调用 super 之前，都不能访问 this 实例。

类如果继承了 null，那么语义上来说，没有办法调用 super、super.xxx。如果不更改默认构造器，那么它就是一个“纯静态类”。

```js
class StaticClass extends null {
  static pow () {}
}
```

P196，这个 new.target.prototype 没看懂。

### 对象系统





## 勘误？

* P71，属性读取器
* P77，逻辑与、按位非
* P107，catch 子句隐式声明
* P134，第二段代码，computedName 括号
* P148，ES8
* P179，MyObject() 有没有必要用括号

