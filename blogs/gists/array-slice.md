# 数组浅拷贝

[TOC]

Array.prototype.slice 是一个数组/类数组浅拷贝的方法，可以转化任何符合条件的伪数组宿主对象为数组，但是 IE<9 除外。

许多类库的数组拷贝方法都是通过 Array.prototype.slice 完成的，它们在一定程度上划分为两种阵营：

1. 拷贝数组时对 IE 浏览器特殊处理
2. 当位于 IE 浏览器时，对 Array.prototype.slice 做兼容

## 特殊处理方案

Mootools 属于第一种方案。

```js
function $A(iterable) {
    if (iterable.item) {
        var l = iterable.length, array = new Array(l)
        while (l--) {
            array[l] = iterable[l]
        }
        return array
    }
    return Array.prototype.slice.call(iterable)
}
```

Ext 也属于第一种方案。

```js
var toArray = function toArray() {
    return isIE
        ? function(a, i, j, res) {
            res = []
            Ext.each(a, function (v) {
                res.push(v)
            })
            return res.slice(i || 0, j || res.length)
        }
        : function(a, i, j) {
            return Array.prototype.slice.call(a, i || 0, j || a.length)
        }
}()
```

## 改进 Array.prototype.slice

第一种方案，使得浏览器兼容与框架本身耦合性很大，司徒正美在他的著作《JS框架设计》中提到了一种改善方案，即框架本身处理数组拷贝时，只依赖 Array.prototype.slice 函数：

```js
Array.prototype.slice.call(something)
```

不过框架外围，需要有一个补丁（概念），修补 Array.prototype.slice 函数。这样使得框架逻辑与浏览器兼容逻辑解耦，将来“框架升级时便能轻松抛弃这些历史包袱”。

这里重现一下思路：

```js
(function() {
    const _slice = Array.prototype.slice
    try {
        _slice.call(document.documentElement)
    } catch () {
        Array.prototype.slice = function (i, j) {
            i = i || 0
            j = j || this.length
            if (Object.prototype.toString.call(this) === '[object Array]') {
                return _slice.call(this, i, j)
            }
            const start = i > 0 ? i : i + this.length
            const end = j > 0 ? j : j + this.length
            let size = end - start, cloned
            if (size > 0) {
                cloned = new Array(size)
                let p = 0
                while (p++ < size) {
                    if (this.charAt) {
                        cloned[p] = this.charAt(p)
                    } else {
                        cloned[p] = this[p]
                    }
                }
            }
            return cloned
        }
    }
}())
```