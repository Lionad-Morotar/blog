# 计算机组成原理

## 原码 反码 补码

为了在计算机中表示正负数，人们使用最高位作为符号位表示正负号，其余为数值位，表示数值，这便是原码[^原码]。

但CPU 中只有加法电路，使用原码计算，没有办法把对负数的运算转换为加法，所以有了反码[^反码]。使用反码计算的好处是，无论是正负数，只要将数值位相加就能得到最终结果。
以四位整形举例如下，计算表达式 $5 - 2$：

1. 将减法用加法表示为 $5 + (-2)$。
2. $5$ 是正数，直接得反码 $0101$。
3. $-2$ 的原码是 $1010$，数值位取反得反码 $1101$。
4. 反码相加，$0101 + 1101$，得反码 $0010$，换算为原码得 $0101$，换算回十进制，答案是 $3$。

反码的缺陷在零有两种表现形式，即 $0000$ 和 $1000$。而补码[^补码]，使得符号位也可以代入运算，使得计算机只需要通过加法就可以实现加减法，而无需关系符号位，是一种更好的运算方式。以四位整形举例如下，计算表达式 $5 - 2$：

1. 将减法用加法表示为 $5 + (-2)$。
2. $5$ 是正数，直接得补码 $0101$。
3. $-2$ 的原码是 $1010$，数值位取反得 $1101$，最后数值位加一得补码 $1110$。
4. 补码相加，$0101 + 1110$，得 $0011$，换算回十进制，答案是 $3$。

可以发现，反码 $1000$ 作为补码使用，换算回十进制可以表示 $-8$，所以补码可以表示的范围要比反码多一位数。

<table style="width:100%;" cellspacing="0">
    <tbody>
        <tr>
            <td align="center" colspan="10">8位补码极值</td>
        </tr>
        <tr>
            <td align="center">符号位</td>
            <td align="center" colspan="7">数值位</td>
            <td align="center" colspan="2">结果</td>
        </tr>
        <tr>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>1</b>
            </td>
            <td align="center" style="width:2em;">
                <b>1</b>
            </td>
            <td align="center" style="width:2em;">
                <b>1</b>
            </td>
            <td align="center" style="width:2em;">
                <b>1</b>
            </td>
            <td align="center" style="width:2em;">
                <b>1</b>
            </td>
            <td align="center" style="width:2em;">
                <b>1</b>
            </td>
            <td align="center" style="width:2em;">
                <b>1</b>
            </td>
            <td align="center" style="width:2em;"><b>=</b></td>
            <td align="right" style="width:2em;"><b>127</b>
            </td>
        </tr>
        <tr>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>1</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;"><b>=</b></td>
            <td align="right" style="width:2em;"><b>2</b>
            </td>
        </tr>
        <tr>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>1</b>
            </td>
            <td align="center" style="width:2em;"><b>=</b></td>
            <td align="right" style="width:2em;"><b>1</b>
            </td>
        </tr>
        <tr>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;"><b>=</b></td>
            <td align="right" style="width:2em;"><b>0</b>
            </td>
        </tr>
        <tr>
            <td align="center" style="width:2em;">
                <b>1</b>
            </td>
            <td align="center" style="width:2em;">
                <b>1</b>
            </td>
            <td align="center" style="width:2em;">
                <b>1</b>
            </td>
            <td align="center" style="width:2em;">
                <b>1</b>
            </td>
            <td align="center" style="width:2em;">
                <b>1</b>
            </td>
            <td align="center" style="width:2em;">
                <b>1</b>
            </td>
            <td align="center" style="width:2em;">
                <b>1</b>
            </td>
            <td align="center" style="width:2em;">
                <b>1</b>
            </td>
            <td align="center" style="width:2em;"><b>=</b></td>
            <td align="right" style="width:2em;"><b>−1</b>
            </td>
        </tr>
        <tr>
            <td align="center" style="width:2em;">
                <b>1</b>
            </td>
            <td align="center" style="width:2em;">
                <b>1</b>
            </td>
            <td align="center" style="width:2em;">
                <b>1</b>
            </td>
            <td align="center" style="width:2em;">
                <b>1</b>
            </td>
            <td align="center" style="width:2em;">
                <b>1</b>
            </td>
            <td align="center" style="width:2em;">
                <b>1</b>
            </td>
            <td align="center" style="width:2em;">
                <b>1</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;"><b>=</b></td>
            <td align="right" style="width:2em;"><b>−2</b>
            </td>
        </tr>
        <tr>
            <td align="center" style="width:2em;">
                <b>1</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>1</b>
            </td>
            <td align="center" style="width:2em;"><b>=</b></td>
            <td align="right" style="width:2em;"><b>−127</b>
            </td>
        </tr>
        <tr>
            <td align="center" style="width:2em;">
                <b>1</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;">
                <b>0</b>
            </td>
            <td align="center" style="width:2em;"><b>=</b></td>
            <td align="right" style="width:2em;"><b>−128</b>
            </td>
        </tr>
    </tbody>
</table>

## 阅读更多

* [补码@Wiki](https://www.wikiwand.com/zh-cn/%E4%BA%8C%E8%A3%9C%E6%95%B8)
* [己有原码, 为何还有反码和补码？](https://blog.csdn.net/weixin_30954607/article/details/98083529?utm_medium=distribute.pc_relevant.none-task-blog-baidujs-4)
* [原码, 反码, 补码详解](https://www.cnblogs.com/zhangziqiu/archive/2011/03/30/ComputerCode.html)

[^原码]: 最高位表示数的符号，其他位表示数值。
[^反码]: 正数的反码和原码相同；负数的反码是原码的数值位按位取反。
[^补码]: 正数的补码和原码相同；负数的反码是原码的数值位按位取反，再加一。
[^mathjax]: 我的 Mathjax 解析不了上划线，所以不能用标准的数学符号表示无限循环小数。所以这里用一种假的表示方式替代。