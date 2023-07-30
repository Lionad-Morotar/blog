# 正则表达式

[TOC]

## Memo Table

### Symbol

|  Symbol  |              Meaning               |
| :------: | :--------------------------------: |
|    ^     |           Start of line            |
|    $     |            End of line             |
|    \b    |           Word Boundary            |
|    \B    |         None-word-Boundary         |
|    \s    |       White space character        |
|    \S    |     Non-white space character      |
|    \d    |          Digit character           |
|    \D    |        Non-digit character         |
|    \w    |                Word                |
|    \W    | Non-word(e.g. punctuation, spaces) |
|    *     |       Zero or more (greedy)        |
|    *?    |        Zero or more (lazy)         |
|    +     |        One or more (greedy)        |
|    +?    |         One or more (lazy)         |
|    ?     |        Zero or one (greedy)        |
|    ??    |         Zero or one (lazy)         |
|   {x}    |           Repeat x times           |
|   {x,}   |       Repeat x times or more       |
|  {x,y}   |    Repeat between x and y times    |
|    .     |   Any character (no end of line)   |
|   a\|b   |               a or b               |
|  (...)   |               Group                |
| (?:...)  |         No reference group         |
| \k\<x\>  |       Named group reference        |
| (?=...)  |    正向先行断言 Followed by...     |
| (?!...)  |  负向先行断言 Not followed by...   |
| (?<=...) |            正向后行断言            |
| (?<!...) |            负向后行断言            |
|   [ab]   |               a or b               |
|  [^ab]   |          Not a and not b           |
|  [a-b]   |          Between a and b           |

### Flag

| Flag  |                  Meaning                  |               Example                |
| :---: | :---------------------------------------: | :----------------------------------: |
|   s   |           使 `.` 能够匹配换行符           |       /./s.test("\n") // true        |
|   u   | 使用 Unicode 字符集 | /\p{Number}+/u.test('㉛¹¼Ⅰ') // true |
|   m   | 匹配多行文本（此时 ^ 和 $ 用于匹配单行的首尾） |  |
|   g   | 全局匹配 |  |
|   i   | 忽略字符大小写 |  |
|   y   | 仅匹配正则表达式的 lastIndex 属性只是的索引，此时 ^ 会动态改变位置 |  |

### Operator precedence

|        Operator         | Precedence |
| :---------------------: | :--------: |
|           \\            |     1      |
|          (),[]          |     2      |
|        {},?,*,+         |     3      |
| ^,$,\d,Normal character |     4      |
|           \|            |     5      |

### Reference

|     Symbol     |        Meaning         |
| :------------: | :--------------------: |
|       \x       |    Group reference     |
| (?\<name\>...) |      Named group       |
|       $x       |        匹配的组        |
|       $&       |      匹配的字符串      |
|       $`       | 匹配的子串的左侧字符串 |
|       $'       | 匹配的子串的右侧字符串 |


## 常用正则

|                描述                 |               正则或函数                |
| :---------------------------------: | :-------------------------------------: |
|          Semantic Version           |             /\d+(\.\d+){2}/             |
|              包含中文               |            /[\u4E00-\u9FA5]/            |
| 密码校验（数字和大小写，最少 6 位） | /^.*(?=.{6,})(?=.*\d)(?=.*[a-zA-Z]).*$/ |
|             数字千分位              |        /\B(?=(?:\d{3})+(?!\d))/g        |
|            驼峰转连字符             |             /(?=\B)[A-Z]/g              |
|           字符串两端空格            |            /(^\s+)\|(\s+$)/g            |

## 进阶思考

### 优化思路

主要分为两大类，降低内存占用和减少回溯次数（也许有专门针对正则的缺陷应用的攻击手段）

* 使用非捕获分组降低内存占用
* 能使用确定字符，就不要使用通配符
* 提取分支的公共部分

### 实践思路

#### 拆分和组合

如密码校验这个正则 `/^.*(?=.{6,})(?=.*\d)(?=.*[a-zA-Z]).*$/`，实际开发时，为了可读性可以拆分为多个正则。

匹配浮点数，如 `10`，`-10.0`，`-.2` 这三个数字，可以分别列出三种数字的匹配模式，`/\d+/`，`[+-]\d+\.\d+`，`[+-]\.\d+`，列出之后，再统一合并为 `/[+-]?(?:\d+|\.\d+|\d+\.\d+)/`

## 正则诡计

一些诡计的探索，拓展思路，不适合用于开发环境。

|   描述   |                                    正则或函数                                     |
| :------: | :-------------------------------------------------------------------------------: |
| 数组去重 | ["a", "b", "c", "a", "b", "c"].sort().join().replace(/(\w),\1/g, '$1').split(',') |

## 正则工具

* [正则可视化](https://jex.im/regulex/)