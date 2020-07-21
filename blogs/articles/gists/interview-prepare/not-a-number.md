# Number.isNaN VS isNaN

Number.isNaN 算法如下：

1. If Type(number) is not Number, return false.
2. If number is NaN, return true.
3. Otherwise, return false.

isNaN 唯一一点不同是，对参数进行了 toNumber 转换：

1. Let num be ToNumber(number).
2. ReturnIfAbrupt(num).
3. If num is NaN, return true.
4. Otherwise, return false.

所以 `isNaN('string')`，等同于 `isNaN(NaN)`，返回真值。