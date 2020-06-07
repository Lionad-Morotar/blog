# 正则表达式

正则表达式相关的内容将会收录到这份 Memo 中

## Memo Table

### Symbol

|     Symbol     |              Meaning               |
| :------------: | :--------------------------------: |
|       ^        |           Start of line            |
|       $        |            End of line             |
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
|       \x       |          Group reference           |
| (?\<name\>...) |            Named group             |
|    \k\<x\>     |       Named group reference        |
|    (?=...)     |            正向先行断言            |
|    (?!...)     |            负向先行断言            |
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