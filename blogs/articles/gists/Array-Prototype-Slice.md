# Array.prototype.slice

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