# 正则表达式

> 正则表达式是一种用来匹配字符串的强有力的工具，它的灵活性、表达力和功能都非常强大。

## Memo Table

### Symbol

<table>
<thead>
  <tr>
    <th align="center">
      Symbol
    </th>
    
    <th align="center">
      Meaning
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td align="center">
      ^
    </td>
    
    <td align="center">
      Start of line
    </td>
  </tr>
  
  <tr>
    <td align="center">
      $
    </td>
    
    <td align="center">
      End of line
    </td>
  </tr>
  
  <tr>
    <td align="center">
      \b
    </td>
    
    <td align="center">
      Word Boundary
    </td>
  </tr>
  
  <tr>
    <td align="center">
      \B
    </td>
    
    <td align="center">
      None-word-Boundary
    </td>
  </tr>
  
  <tr>
    <td align="center">
      \s
    </td>
    
    <td align="center">
      White space character
    </td>
  </tr>
  
  <tr>
    <td align="center">
      \S
    </td>
    
    <td align="center">
      Non-white space character
    </td>
  </tr>
  
  <tr>
    <td align="center">
      \d
    </td>
    
    <td align="center">
      Digit character
    </td>
  </tr>
  
  <tr>
    <td align="center">
      \D
    </td>
    
    <td align="center">
      Non-digit character
    </td>
  </tr>
  
  <tr>
    <td align="center">
      \w
    </td>
    
    <td align="center">
      Word
    </td>
  </tr>
  
  <tr>
    <td align="center">
      \W
    </td>
    
    <td align="center">
      Non-word(e.g. punctuation, spaces)
    </td>
  </tr>
  
  <tr>
    <td align="center">
      *
    </td>
    
    <td align="center">
      Zero or more (greedy)
    </td>
  </tr>
  
  <tr>
    <td align="center">
      *?
    </td>
    
    <td align="center">
      Zero or more (lazy)
    </td>
  </tr>
  
  <tr>
    <td align="center">
      +
    </td>
    
    <td align="center">
      One or more (greedy)
    </td>
  </tr>
  
  <tr>
    <td align="center">
      +?
    </td>
    
    <td align="center">
      One or more (lazy)
    </td>
  </tr>
  
  <tr>
    <td align="center">
      ?
    </td>
    
    <td align="center">
      Zero or one (greedy)
    </td>
  </tr>
  
  <tr>
    <td align="center">
      ??
    </td>
    
    <td align="center">
      Zero or one (lazy)
    </td>
  </tr>
  
  <tr>
    <td align="center">
      {x}
    </td>
    
    <td align="center">
      Repeat x times
    </td>
  </tr>
  
  <tr>
    <td align="center">
      {x,}
    </td>
    
    <td align="center">
      Repeat x times or more
    </td>
  </tr>
  
  <tr>
    <td align="center">
      {x,y}
    </td>
    
    <td align="center">
      Repeat between x and y times
    </td>
  </tr>
  
  <tr>
    <td align="center">
      .
    </td>
    
    <td align="center">
      Any character (no end of line)
    </td>
  </tr>
  
  <tr>
    <td align="center">
      a|b
    </td>
    
    <td align="center">
      a or b
    </td>
  </tr>
  
  <tr>
    <td align="center">
      (...)
    </td>
    
    <td align="center">
      Group
    </td>
  </tr>
  
  <tr>
    <td align="center">
      (?:...)
    </td>
    
    <td align="center">
      No reference group
    </td>
  </tr>
  
  <tr>
    <td align="center">
      \k<x>
    </td>
    
    <td align="center">
      Named group reference
    </td>
  </tr>
  
  <tr>
    <td align="center">
      (?=...)
    </td>
    
    <td align="center">
      正向先行断言 Followed by...
    </td>
  </tr>
  
  <tr>
    <td align="center">
      (?!...)
    </td>
    
    <td align="center">
      负向先行断言 Not followed by...
    </td>
  </tr>
  
  <tr>
    <td align="center">
      (?<=...)
    </td>
    
    <td align="center">
      正向后行断言
    </td>
  </tr>
  
  <tr>
    <td align="center">
      (?<!...)
    </td>
    
    <td align="center">
      负向后行断言
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <span>
        ab
      </span>
    </td>
    
    <td align="center">
      a or b
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <span>
        ^ab
      </span>
    </td>
    
    <td align="center">
      Not a and not b
    </td>
  </tr>
  
  <tr>
    <td align="center">
      <span>
        a-b
      </span>
    </td>
    
    <td align="center">
      Between a and b
    </td>
  </tr>
</tbody>
</table>

### Flag

<table>
<thead>
  <tr>
    <th align="center">
      Flag
    </th>
    
    <th align="center">
      Meaning
    </th>
    
    <th align="center">
      Example
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td align="center">
      s
    </td>
    
    <td align="center">
      使 <code>
        .
      </code>
      
       能够匹配换行符
    </td>
    
    <td align="center">
      /./s.test("\n") // true
    </td>
  </tr>
  
  <tr>
    <td align="center">
      u
    </td>
    
    <td align="center">
      使用 Unicode 字符集
    </td>
    
    <td align="center">
      /\p{Number}+/u.test('㉛¹¼Ⅰ') // true
    </td>
  </tr>
  
  <tr>
    <td align="center">
      m
    </td>
    
    <td align="center">
      匹配多行文本（此时 ^ 和 $ 用于匹配单行的首尾）
    </td>
    
    <td align="center">
      
    </td>
  </tr>
  
  <tr>
    <td align="center">
      g
    </td>
    
    <td align="center">
      全局匹配
    </td>
    
    <td align="center">
      
    </td>
  </tr>
  
  <tr>
    <td align="center">
      i
    </td>
    
    <td align="center">
      忽略字符大小写
    </td>
    
    <td align="center">
      
    </td>
  </tr>
  
  <tr>
    <td align="center">
      y
    </td>
    
    <td align="center">
      仅匹配正则表达式的 lastIndex 属性只是的索引，此时 ^ 会动态改变位置
    </td>
    
    <td align="center">
      
    </td>
  </tr>
</tbody>
</table>

### Operator precedence

<table>
<thead>
  <tr>
    <th align="center">
      Operator
    </th>
    
    <th align="center">
      Precedence
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td align="center">
      \
    </td>
    
    <td align="center">
      1
    </td>
  </tr>
  
  <tr>
    <td align="center">
      (),<span>
        
      </span>
    </td>
    
    <td align="center">
      2
    </td>
  </tr>
  
  <tr>
    <td align="center">
      {},?,*,+
    </td>
    
    <td align="center">
      3
    </td>
  </tr>
  
  <tr>
    <td align="center">
      ^,$,\d,Normal character
    </td>
    
    <td align="center">
      4
    </td>
  </tr>
  
  <tr>
    <td align="center">
      |
    </td>
    
    <td align="center">
      5
    </td>
  </tr>
</tbody>
</table>

### Reference

<table>
<thead>
  <tr>
    <th align="center">
      Symbol
    </th>
    
    <th align="center">
      Meaning
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td align="center">
      \x
    </td>
    
    <td align="center">
      Group reference
    </td>
  </tr>
  
  <tr>
    <td align="center">
      (?<name>...)
    </td>
    
    <td align="center">
      Named group
    </td>
  </tr>
  
  <tr>
    <td align="center">
      $x
    </td>
    
    <td align="center">
      匹配的组
    </td>
  </tr>
  
  <tr>
    <td align="center">
      $&
    </td>
    
    <td align="center">
      匹配的字符串
    </td>
  </tr>
  
  <tr>
    <td align="center">
      $`
    </td>
    
    <td align="center">
      匹配的子串的左侧字符串
    </td>
  </tr>
  
  <tr>
    <td align="center">
      $'
    </td>
    
    <td align="center">
      匹配的子串的右侧字符串
    </td>
  </tr>
</tbody>
</table>

## 常用正则

<table>
<thead>
  <tr>
    <th align="center">
      描述
    </th>
    
    <th align="center">
      正则或函数
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td align="center">
      Semantic Version
    </td>
    
    <td align="center">
      /\d+(.\d+){2}/
    </td>
  </tr>
  
  <tr>
    <td align="center">
      包含中文
    </td>
    
    <td align="center">
      /<span>
        \u4E00-\u9FA5
      </span>
      
      /
    </td>
  </tr>
  
  <tr>
    <td align="center">
      密码校验（数字和大小写，最少 6 位）
    </td>
    
    <td align="center">
      /^.<em>
        (?=.{6,})(?=.
      </em>
      
      \d)(?=.<em>
        <span>
          a-zA-Z
        </span>
        
        ).
      </em>
      
      $/
    </td>
  </tr>
  
  <tr>
    <td align="center">
      数字千分位
    </td>
    
    <td align="center">
      /\B(?=(?:\d{3})+(?!\d))/g
    </td>
  </tr>
  
  <tr>
    <td align="center">
      驼峰转连字符
    </td>
    
    <td align="center">
      /(?=\B)<span>
        A-Z
      </span>
      
      /g
    </td>
  </tr>
  
  <tr>
    <td align="center">
      字符串两端空格
    </td>
    
    <td align="center">
      /(^\s+)|(\s+$)/g
    </td>
  </tr>
</tbody>
</table>

## 进阶思考

### 优化思路

主要分为两大类，降低内存占用和减少回溯次数（也许有专门针对正则的缺陷应用的攻击手段）

- 使用非捕获分组降低内存占用
- 能使用确定字符，就不要使用通配符
- 提取分支的公共部分

### 实践思路

#### 拆分和组合

如密码校验这个正则 `/^.*(?=.{6,})(?=.*\d)(?=.*[a-zA-Z]).*$/`，实际开发时，为了可读性可以拆分为多个正则。

匹配浮点数，如 `10`，`-10.0`，`-.2` 这三个数字，可以分别列出三种数字的匹配模式，`/\d+/`，`[+-]\d+\.\d+`，`[+-]\.\d+`，列出之后，
再统一合并为 `/[+-]?(?:\d+|\.\d+|\d+\.\d+)/`

## 正则诡计

一些诡计的探索，拓展思路，不适合用于开发环境。

<table>
<thead>
  <tr>
    <th align="center">
      描述
    </th>
    
    <th align="center">
      正则或函数
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td align="center">
      数组去重
    </td>
    
    <td align="center">
      <span>
        "a", "b", "c", "a", "b", "c"
      </span>
      
      .sort().join().replace(/(\w),\1/g, '$1').split(',')
    </td>
  </tr>
</tbody>
</table>

## 正则工具

- [正则可视化 @regexr](https://regexr.com/)

![regexr](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202503232355279.png)

- [正则可视化 @regulex](https://jex.im/regulex/)

![regulex](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/202503232356127.png)
