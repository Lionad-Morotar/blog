---
title: get-intrinsic
description: JavaScript Intrinsics 缓存与防御性编程，ljharb 的 es-shims 生态系统核心库
---

# get-intrinsic

#### get-intrinsic 是什么？

get-intrinsic 是 ljharb 开发的一个 JavaScript 工具库，用于在首次 require 时获取并稳健地缓存所有 JavaScript 语言级内置方法（intrinsics）。它的核心用途是在运行时安全地获取 JavaScript 内置对象和方法的引用，即使这些方法在运行时被篡改或删除。

见：[get-intrinsic](https://github.com/ljharb/get-intrinsic)

#### 为什么需要 get-intrinsic？

在 JavaScript 中，全局对象和其方法可能被恶意代码篡改（如原型污染攻击）。get-intrinsic 提供了一种防御性编程方式：

- **缓存机制**：在首次加载时缓存内置方法的原始引用
- **防篡改**：即使全局对象的方法被删除或修改，仍能通过缓存使用原始功能
- **规范支持**：支持 JavaScript 规范中定义的所有 intrinsics 语法（如 `%Array.prototype.push%`）

#### 如何使用 get-intrinsic？

```js
var GetIntrinsic = require('get-intrinsic');

// 获取静态方法
GetIntrinsic('%Math.pow%'); // Math.pow 的缓存引用

// 获取实例方法
GetIntrinsic('%Array.prototype.push%'); // Array.prototype.push 的缓存引用

// 即使原方法被删除，缓存的方法仍可工作
delete Array.prototype.push;
GetIntrinsic('%Array.prototype.push%').call(arr, 4); // 仍然有效
```

## 同类工具对比

| 工具/方案 | 类型 | 功能特点 | 使用场景 |
|-----------|------|----------|----------|
| **get-intrinsic** | npm 库 | 缓存并暴露所有 ES Intrinsics，支持 `%Array.prototype.push%` 语法 | 需要安全使用内置方法的场景 |
| **es5-shim / es6-shim** | polyfill | 为旧环境提供新 API 实现，内部缓存原始方法引用 | 兼容旧浏览器的 polyfill 方案 |
| **core-js** | polyfill 库 | 提供标准库 polyfill，可检测原生方法是否被篡改（`.sham` 属性） | Babel 转译后的 polyfill 环境 |
| **SES (Secure ECMAScript)** | 安全库 | Agoric 开发的 `lockdown()` 和 `harden()`，冻结全局环境并创建不可变对象 | 高安全性要求场景（如区块链钱包） |
| **ShadowRealm** | 原生 API | TC39 提案，创建独立的全局环境沙箱 | 需要完全隔离的执行环境 |
| **NodeJS VM 模块** | Node 内置 | `vm.createContext()` 创建独立的 V8 上下文 | Node.js 环境隔离 |
| **iframe + Proxy** | 浏览器技巧 | 通过 iframe 获取干净全局对象，配合 Proxy 拦截 | 浏览器端隔离 |
| **Object.freeze** | 原生方法 | 冻结全局对象原型，防止被篡改 | 简单防护（但会破坏如 Vue2 等依赖原型修改的框架） |
| **手动缓存引用** | 编程技巧 | 在代码最上层缓存原型方法引用 | 轻量级项目自我防护 |

## 核心差异

**get-intrinsic 的独特之处：**
- 专门设计用于 **获取和缓存 intrinsics**，而非检测或 polyfill
- 支持 **规范的 intrinsics 语法**（如 `%Array.prototype.push%`，参见 [ECMAScript 规范 6.1.7.4 Well-Known Intrinsic Objects](https://tc39.es/ecma262/#sec-well-known-intrinsic-objects)）
- 即使全局方法被 `delete` 也能通过缓存继续使用
- 被 es-shims 组织广泛用作基础依赖（如 `side-channel`、`has-symbols` 等）

**其他方案的定位：**
- **SES/ShadowRealm/VM**：强调**环境隔离**，而非方法缓存
- **es5-shim/core-js**：强调**API 兼容**，缓存是内部实现细节
- **isNative**：强调**检测原生性**，而非提供安全引用

## es-shims 生态系统

get-intrinsic 是 ljharb 维护的 es-shims 生态系统的核心库之一。该生态系统由一系列细粒度的 JavaScript 基础库组成，每个库专注于提供特定的 ECMAScript 规范功能。

### get-intrinsic 的依赖关系

```
get-intrinsic
├── function-bind@^1.1.2          # Function.prototype.bind 的 polyfill
├── hasown@^2.0.2                 # Object.prototype.hasOwnProperty 的封装
├── has-symbols@^1.1.0            # Symbol 支持检测
├── es-errors@^1.3.0              # JS Error 构造函数的缓存
├── es-object-atoms@^1.1.1        # Object 相关原子操作
│   └── es-errors@^1.3.0
├── es-define-property@^1.0.1     # Object.defineProperty 的封装
│   └── get-intrinsic@^1.2.4
├── gopd@^1.2.0                   # Object.getOwnPropertyDescriptor 的封装
│   └── es-errors@^1.3.0
├── get-proto@^1.0.1              # Object.getPrototypeOf 的封装
│   └── es-errors@^1.3.0
├── call-bind-apply-helpers@^1.0.2 # call/apply 的辅助函数
│   ├── es-errors@^1.3.0
│   └── function-bind@^1.1.2
├── math-intrinsics@^1.1.0        # Math 相关内置函数
├── async-function@^1.0.0         # AsyncFunction 构造函数检测
├── async-generator-function@^1.0.0 # AsyncGeneratorFunction 检测
└── generator-function@^2.0.0     # GeneratorFunction 构造函数检测
```

### 核心依赖库详解

| 库名 | 功能 | 设计目的 |
|------|------|----------|
| **es-object-atoms** | 提供 `Object`、`ToObject`、`RequireObjectCoercible` | ES 规范中 Object 相关的核心原子操作 |
| **es-errors** | 缓存 `Error`、`TypeError`、`RangeError` 等 | 防御 Error 构造函数被篡改 |
| **math-intrinsics** | 提供 Math 对象的内置函数 | 数学运算函数的防篡改版本 |
| **gopd** | `Object.getOwnPropertyDescriptor` 的封装 | 安全获取属性描述符 |
| **es-define-property** | `Object.defineProperty` 的封装 | 安全定义对象属性 |
| **has-symbols** | 检测环境是否支持 Symbol | 特性检测而非 polyfill |
| **get-proto** | `Object.getPrototypeOf` 的封装 | 安全获取对象原型 |
| **call-bind-apply-helpers** | call/apply/bind 的辅助函数 | 函数调用的基础工具 |
| **hasown** | `Object.prototype.hasOwnProperty` 的快捷调用 | 避免原型链查找 |
| **function-bind** | `Function.prototype.bind` 的 polyfill | 旧环境兼容性支持 |

### 设计哲学

**细粒度模块化**
每个库只做一件事，遵循 UNIX 哲学。这种设计使得：
- **按需引入**：只需要 `has-symbols` 时不必引入整个 `get-intrinsic`
- **独立维护**：每个库可以独立版本迭代，减少 breaking change 的影响范围
- **清晰依赖关系**：依赖树扁平化，避免循环依赖

**防御性编程**
所有库都采用相同的防御策略：
- 在模块加载时缓存原始引用
- 不依赖可能被篡改的全局对象
- 优先使用原生实现，必要时回退到 polyfill

**规范一致性**
- 严格遵循 ECMAScript 规范命名（如 `es-object-atoms` 对应规范中的 "Object-related atoms"）
- 支持不同 ES 版本的抽象操作（通过 `es-abstract` 库）
- 为 babel-plugin-polyfill-es-shims 等转译工具提供基础支持

### 实际应用

这些基础库被广泛应用于 npm 生态的核心项目：
- **qs**：查询字符串解析库（超过 7000 万周下载）
- **side-channel**：构建安全侧信道通信
- **es-abstract**：ECMAScript 规范抽象操作的完整实现
- **object-inspect**：对象序列化工具
- **deep-equal**：深度相等比较

见：[ljharb GitHub](https://github.com/ljharb)

## 核心代码模式

### 1. Intrinsics 缓存表（get-intrinsic）

get-intrinsic 的核心是一个巨大的 INTRINSICS 对象，在模块加载时缓存所有内置方法：

```js
// 简化版核心结构
'use strict';

// 1. 首先缓存所有基础依赖
var $Object = require('es-object-atoms');      // Object 基础操作
var $Error = require('es-errors');             // Error 构造函数
var $TypeError = require('es-errors/type');    // TypeError 构造函数
var hasSymbols = require('has-symbols')();     // Symbol 支持检测
var getProto = require('get-proto');           // getPrototypeOf

// 2. 核心：Intrinsics 缓存表
var INTRINSICS = {
  // 基础构造函数
  '%Array%': Array,
  '%Object%': $Object,
  '%Function%': Function,
  '%Error%': $Error,
  '%TypeError%': $TypeError,

  // 实例方法（使用 % 语法）
  '%Array.prototype.push%': Array.prototype.push,
  '%Object.prototype.toString%': Object.prototype.toString,

  // 条件性存在的特性（typeof 检测）
  '%Map%': typeof Map === 'undefined' ? undefined : Map,
  '%Symbol%': hasSymbols ? Symbol : undefined,

  // 需要延迟求值的（如 GeneratorFunction）
  '%GeneratorFunction%': needsEval,
};

// 3. 路径解析器：将 %Array.prototype.push% 解析为路径数组
function stringToPath(string) {
  // 解析类似 "Array.prototype.push" 的路径
  // 处理引号、转义字符等
}

// 4. 核心导出函数
module.exports = function GetIntrinsic(name, allowMissing) {
  var parts = stringToPath(name);
  var value = INTRINSICS['%' + parts[0] + '%'];

  // 逐层深入对象属性
  for (var i = 1; i < parts.length; i++) {
    value = value[parts[i]];
  }

  return value;
};
```

**关键模式**：
- **模块级缓存**：在 require 时一次性缓存，之后只读
- **条件缓存**：对可能不存在的特性使用 `typeof` 检测
- **延迟求值**：对 `GeneratorFunction` 等使用 `needsEval` 标记，首次访问时动态获取

### 2. Error 构造函数的缓存（es-errors）

极简的缓存模式，直接将全局 Error 构造函数导出：

```js
// es-errors/index.js - 极简缓存模式
'use strict';

module.exports = Error;

// es-errors/type.js
'use strict';
module.exports = TypeError;

// es-errors/range.js
'use strict';
module.exports = RangeError;

// 其他：eval.js, ref.js, syntax.js, uri.js...
```

### 3. Object 原子操作（es-object-atoms）

实现 ES 规范中的 Object 相关抽象操作：

```js
// es-object-atoms/index.js
'use strict';

module.exports = Object;

// es-object-atoms/ToObject.js
'use strict';
var $Object = require('./');

// ES 规范: ToObject 抽象操作
module.exports = function ToObject(value) {
  if (value == null) {  // null 或 undefined
    throw new TypeError('Cannot convert undefined or null to object');
  }
  return $Object(value);
};

// es-object-atoms/RequireObjectCoercible.js
'use strict';

// ES 规范: RequireObjectCoercible 抽象操作
module.exports = function RequireObjectCoercible(value) {
  if (value == null) {
    throw new TypeError('Cannot call method on ' + value);
  }
  return value;
};

// es-object-atoms/isObject.js
'use strict';

module.exports = function isObject(value) {
  return typeof value === 'object' && value !== null;
};
```

**规范映射**：
| 模块 | ECMAScript 规范术语 | 用途 |
|------|-------------------|------|
| `ToObject` | ToObject(argument) | 将值转换为对象 |
| `RequireObjectCoercible` | RequireObjectCoercible(argument) | 确保值可强制转换为对象 |
| `isObject` | Type(x) is Object | 类型检测 |

### 4. Symbol 支持检测（has-symbols）

特性检测而非 polyfill 的典范：

```js
// has-symbols/index.js
'use strict';

var origSymbol = typeof Symbol !== 'undefined' && Symbol;

module.exports = function hasNativeSymbols() {
  if (typeof origSymbol !== 'function') { return false; }

  // 检测 Symbol 是否为原生实现（非 polyfill）
  // 通过检测 Symbol 的特性来判断
  return true; // 简化版，实际有更多检测逻辑
};

// has-symbols/shams.js
// 检测是否存在 sham/polyfill 实现（非原生）
```

### 5. 通用的防御性缓存模式

这些库共同遵循的代码模式：

```js
'use strict'; // 所有文件都使用严格模式

// 1. 立即缓存全局引用（在模块顶部）
var $Object = Object;
var $Array = Array;

// 2. 使用本地变量引用原型方法
var $call = Function.prototype.call;
var $apply = Function.prototype.apply;

// 3. 导出一个纯函数，操作缓存的引用
module.exports = function safeOperation(obj, ...args) {
  // 使用缓存的 $call 而非 obj.method.call
  return $call.call($Array.prototype.push, obj, ...args);
};
```

**为什么有效**：
- 攻击者污染 `Array.prototype.push` 时，缓存的 `$Array.prototype.push` 仍指向原始函数
- `Function.prototype.call` 本身也可能被污染，所以也需要缓存

### 6. 延迟求值模式（Lazy Evaluation）

对于无法在模块加载时确定值的 intrinsics：

```js
// get-intrinsic 中的延迟求值
var needsEval = {}; // 标记需要延迟求值的 intrinsics

var INTRINSICS = {
  '%GeneratorFunction%': needsEval,  // 无法直接获取
};

function doEval(name) {
  var value;
  if (name === '%GeneratorFunction%') {
    // 通过创建一个 generator 函数来获取其构造函数
    value = function*(){}.constructor;
  }
  INTRINSICS[name] = value; // 缓存结果
  return value;
}

// 使用时
if (value === needsEval) {
  value = doEval(intrinsicName);
}
```

**应用场景**：
- `GeneratorFunction`、`AsyncFunction` 等没有全局名称的构造函数
- 浏览器/Node 环境差异导致的条件性存在
- 避免在模块加载时执行可能抛出错误的代码

### 7. 路径解析与别名映射

get-intrinsic 支持两种语法：`%Array.prototype.push%` 和 `%ArrayProto_push%`：

```js
// 别名映射表
var LEGACY_ALIASES = {
  '%ArrayPrototype%': ['Array', 'prototype'],
  '%ArrayProto_push%': ['Array', 'prototype', 'push'],
  '%ObjProto_toString%': ['Object', 'prototype', 'toString'],
};

// 路径字符串解析（处理引号和转义）
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;

function stringToPath(string) {
  var result = [];
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(/\\(\)?/g, '$1') : (number || match));
  });
  return result;
}
```
