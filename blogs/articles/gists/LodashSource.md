# ⚙ Lodash 源码学习

## String

### repeat

这是二分法思路，比如重复 4 次 'a'，等同于重复 2 次 'aa'。

```js
function repeat(s, n) {
    // # 不好意思，走错片场了
    // return s * n 

    if (!s || n < 1 || n === Infinity) {
        throw new Error('Args error')
    }

    let res = ''
    while (n) {
        if (n % 2) {
            res += s
        }
        s += s
        if (n === 1) break
        n = n >> 1
    }
    return res
}
```

使用递归也可以，貌似浏览器会自动对递归进行优化，所以速度很快。

```js
function repeat(s, n) {
    if (n === 1) {
        return s
    }
    let res = repeat(s, n >> 1)
    res += res
    if (n % 2) {
        res += s
    }
    return res
}
```

## Array