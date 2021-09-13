# Object.assign

[TOC]

## 描述

`Object.assign()` 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

1. 如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖
2. 只会拷贝源对象自身的并且可枚举的属性到目标对象
3. 不会在那些源对象为 null 或 undefined 的时候抛出错误
4. 如果属性不可写，会引发 TypeError

## 用例

```js
var a, b
// example-1
a = { a: 1 }
b = { a: 2, b: 2 }
console.log('1: ', Object.assign(a, b))
// example-2
a = { a: 1 }
b = { b: 2 }
Object.defineProperties(b, {
    c: {
        value: 'hello',
        enumerable: false
    }
})
console.log('2: ', Object.assign(a, b))
// example-3
a = { a: 1 }
console.log('3: ', Object.assign(a, null))
// example-4
a = {}
b = { a: 2 }
Object.defineProperties(a, {
    a: {
        value: 'hello',
        writable: false,
        enumerable: true
    }
})
console.log('4: ', Object.assign(a, b))
```

## 细节

最有意思的是第四条规则，查阅 MDN 后发现，不仅源对象为 Null 或者 Undefined，为其它的原始类型，也会被包装成对象。

```js
console.log(
    Object.assign(
        {}, 
        null, 
        undefined, 
        'abc',
        true, 
        999, 
        Symbol('foo')
    )
)

```

其实 Object.assign 不仅仅能拷贝属性，它也能拷贝访问器，如下：

```js
console.log(
    Object.assign(
        {},
        {
            get bar() {
                return 2
            }
        }
    )
)

```

## 实现

```js
function ObjectAssignPolyfill(target, ...args) {
    if (!target) {
        throw TypeError('Target should be an object')
    }
    let i = 0
    while (i++ < args.length) {
        if (args[i]) {
            for (let key in args[i]) {
                target[key] = args[i][key]
            }
        }
    }
    return target
}
```

## Lodash

观察 Lodash 中实现 Object.assign 相关源码，可以发现几个细节之处：

* While 循环前，length 属性就被保存下来了，这是为了提高性能而作
* 把源对象的值赋给目标对象时，会做一次值的比较，只有两个值不相等，或根本不存在此键，才会继续赋值

和 MDN 的描述不同，Lodash 实现的这个函数不接受目标对象的类型错误。

```JS
/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 */
function baseAssign(object, source) {
    return object && copyObject(source, keys(source), object)
}

/**
 * Copies properties of `source` to `object`.
 */
function copyObject(source, props, object, customizer) {
    var isNew = !object
    object || (object = {})

    var index = -1,
        length = props.length

    while (++index < length) {
        var key = props[index]

        var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined

        if (newValue === undefined) {
            newValue = source[key]
        }
        if (isNew) {
            baseAssignValue(object, key, newValue)
        } else {
            assignValue(object, key, newValue)
        }
    }
    return object
}

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 */
function baseAssignValue(object, key, value) {
    if (key == '__proto__' && defineProperty) {
        defineProperty(object, key, {
            configurable: true,
            enumerable: true,
            value: value,
            writable: true
        })
    } else {
        object[key] = value
    }
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 */
function assignValue(object, key, value) {
    var objValue = object[key]
    if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || (value === undefined && !(key in object))) {
        baseAssignValue(object, key, value)
    }
}

```

## jQuery

jQuery 中的 extend 函数功能和 Object.assign 相仿，默认是浅拷贝，但是也可以通过设定参数实现深拷贝。

有几处需要注意的地方：

* 只要第一个参数是布尔值，就代表它是设定是否进行深拷贝的参数
* 没有兼容目标对象的类型错误，如果类型不对，会新定义一个对象
* 只有一个参数，意味着只有源对象，此时函数会对 jQuery 自身进行扩展
* 拷贝会跳过 '__proto__' 属性，也会跳过蛇环对象
* 会忽略值为 undefined 的键

可见，jQuery 是实用主义风格，实现确实优雅。

```js
jQuery.extend = jQuery.fn.extend = function() {
    var options,
        name,
        src,
        copy,
        copyIsArray,
        clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false

    // Handle a deep copy situation
    // 第一个参数如果是布尔值，则用于判断是否要进行深拷贝
    if (typeof target === 'boolean') {
        deep = target
        target = arguments[i++] || {}
    }

    // Handle case when target is a string or something (possible in deep copy)
    // 如果 target 不是对象，则需要定义并赋值一个新的对象
    if (typeof target !== 'object' && !isFunction(target)) {
        target = {}
    }

    // Extend jQuery itself if only one argument is passed
    // 如果只传了一个参数（不包括判断深拷贝的参数），说明将对 jQuery 自身进行扩展
    if (i === length) {
        target = this
        i--
    }

    for (; i < length; i++) {
        // Only deal with non-null/undefined values
        if ((options = arguments[i]) != null) {
            // Extend the base object
            for (name in options) {
                copy = options[name]

                // Prevent Object.prototype pollution
                // jQuery 不会拷贝 '__proto__' 属性
                // Prevent never-ending loop
                // 跳过蛇环对象
                if (name === '__proto__' || target === copy) {
                    continue
                }

                // Recurse if we're merging plain objects or arrays
                if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                    src = target[name]

                    // Ensure proper type for the source value
                    if (copyIsArray && !Array.isArray(src)) {
                        clone = []
                    } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
                        clone = {}
                    } else {
                        clone = src
                    }
                    copyIsArray = false

                    // Never move original objects, clone them
                    target[name] = jQuery.extend(deep, clone, copy)

                    // Don't bring in undefined values
                    // 会忽略 undefined 值
                } else if (copy !== undefined) {
                    target[name] = copy
                }
            }
        }
    }

    // Return the modified object
    return target
}
```