# 正则表达式

正则表达式相关的内容将会收录到这份 Memo 中

## Memo Table

### Symbol

|     Symbol     |              Meaning               |
| :------------: | :--------------------------------: |
|       ^        |           Start of line            |
|       $        |            End of line             |
|       \b       |           Word Boundary            |
|       \B       |         None-word-Boundary         |
|       \s       |       White space character        |
|       \S       |     Non-white space character      |
|       \d       |          Digit character           |
|       \D       |        Non-digit character         |
|       \w       |                Word                |
|       \W       | Non-word(e.g. punctuation, spaces) |
|       *        |       Zero or more (greedy)        |
|       *?       |        Zero or more (lazy)         |
|       +        |        One or more (greedy)        |
|       +?       |         One or more (lazy)         |
|       ?        |        Zero or one (greedy)        |
|       ??       |         Zero or one (lazy)         |
|      {x}       |           Repeat x times           |
|      {x,}      |       Repeat x times or more       |
|     {x,y}      |    Repeat between x and y times    |
|       .        |   Any character (no end of line)   |
|      a\|b      |               a or b               |
|     (...)      |               Group                |
|    (?:...)     |         No reference group         |
|       \x       |          Group reference           |
| (?\<name\>...) |            Named group             |
|    \k\<x\>     |       Named group reference        |
|    (?=...)     |    正向先行断言 Followed by...     |
|    (?!...)     |  负向先行断言 Not followed by...   |
|    (?<=...)    |            正向后行断言            |
|    (?<!...)    |            负向后行断言            |
|      [ab]      |               a or b               |
|     [^ab]      |          Not a and not b           |
|     [a-b]      |          Between a and b           |

### Flag

| Flag  |                  Meaning                  |               Example                |
| :---: | :---------------------------------------: | :----------------------------------: |
|   s   |           使 `.` 能够匹配换行符           |       /./s.test("\n") // true        |
|   u   | Unicode Property Escapes 打开特殊过滤开关 | /\p{Number}+/u.test('㉛¹¼Ⅰ') // true |

## 常用正则

|                描述                 |               正则或函数                |
| :---------------------------------: | :-------------------------------------: |
|          Semantic Version           |             /\d+(\.\d+){2}/             |
|              包含中文               |            /[\u4E00-\u9FA5]/            |
| 密码校验（数字和大小写，最少 6 位） | /^.*(?=.{6,})(?=.*\d)(?=.*[a-zA-Z]).*$/ |
|             数字千分位              |        /\B(?=(?:\d{3})+(?!\d))/g        |
|            驼峰转连字符             |             /(?=\B)[A-Z]/g              |
|           字符串两端空格            |            /(^\s+)\|(\s+$)/g            |

## 正则诡计

|   描述   |                                    正则或函数                                     |
| :------: | :-------------------------------------------------------------------------------: |
| 数组去重 | ["a", "b", "c", "a", "b", "c"].sort().join().replace(/(\w),\1/g, '$1').split(',') |

## 正则工具

* [正则可视化](https://jex.im/regulex/)