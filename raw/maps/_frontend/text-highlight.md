# 浏览器文本高亮标注

> 使用 Selection API 和 Range API 实现类似笔记软件的文本马克笔标注功能

#### 浏览器如何实现文本高亮标注？

文本高亮（Text Highlighting）是阅读软件、笔记工具的核心功能。另与代码语法高亮不同，文本标注是通过 Selection API 和 Range API 动态包裹 DOM 节点实现的。

核心流程：

1. **获取选区**：通过 `window.getSelection()` 获取用户选中的文本范围
2. **创建 Range**：`getRangeAt(0)` 返回包含起止节点和偏移量的 Range 对象
3. **包裹高亮**：使用 `surroundContents()` 或 `extractContents()` + span 包裹选区
4. **持久化存储**：将位置信息转为 XPath + 偏移量存储，页面刷新后可恢复

```javascript
// 获取选区
const selection = window.getSelection()
const range = selection.getRangeAt(0)

// 创建高亮元素
const span = document.createElement('span')
span.style.backgroundColor = '#ffeb3b'

// 包裹选区
range.surroundContents(span)
```

持久化难点在于 DOM 结构可能动态变化，现代方案可使用 **CSS Custom Highlight API**（Chrome 105+）实现无 DOM 污染的高亮。

见：[MDN Selection API](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection)

#### 如何实现持久化存储？

由于 DOM 结构可能变化，不能直接保存 HTML。需要将高亮位置转换为可定位的数据结构：

```javascript
// 存储位置信息
const highlightData = {
  startXPath: getXPath(range.startContainer),  // 起点元素路径
  startOffset: range.startOffset,               // 起点字符偏移
  endXPath: getXPath(range.endContainer),       // 终点元素路径
  endOffset: range.endOffset,                   // 终点字符偏移
  text: selection.toString(),                   // 用于校验
  color: 'yellow'                               // 高亮颜色
}

// 通过 XPath 恢复
function getXPath(node) {
  const paths = []
  for (; node && node.nodeType === Node.ELEMENT_NODE; node = node.parentNode) {
    let index = 1
    for (let sibling = node.previousSibling; sibling; sibling = sibling.previousSibling) {
      if (sibling.nodeType === Node.ELEMENT_NODE && sibling.nodeName === node.nodeName) {
        index++
      }
    }
    paths.unshift(`${node.nodeName.toLowerCase()}[${index}]`)
  }
  return '/' + paths.join('/')
}
```

见：[电子书阅读器之笔记高亮](https://juejin.cn/post/7509894533640765474)

#### 如何处理跨元素选择？

当用户选中跨越多个段落或元素的文本时，`surroundContents()` 会抛出错误。需要手动分割处理：

```javascript
function highlightRange(range, color) {
  const span = document.createElement('span')
  span.className = `highlight highlight-${color}`

  if (range.startContainer === range.endContainer) {
    // 同节点，直接包裹
    range.surroundContents(span)
  } else {
    // 跨节点，提取内容后包裹
    const contents = range.extractContents()
    wrapContents(contents, span)
    range.insertNode(span)
  }
}
```

#### 有哪些成熟的开源方案？

<table>
<thead>
  <tr>
    <th>
      方案
    </th>
    
    <th>
      特点
    </th>
    
    <th>
      适用场景
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <strong>
        <a href="https://github.com/timdown/rangy" rel="nofollow">
          Rangy
        </a>
      </strong>
    </td>
    
    <td>
      跨浏览器 Range API 封装
    </td>
    
    <td>
      兼容性要求高
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        <a href="https://github.com/alienzhou/web-highlighter" rel="nofollow">
          web-highlighter
        </a>
      </strong>
    </td>
    
    <td>
      轻量级，支持多种存储后端
    </td>
    
    <td>
      快速集成
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        <a href="https://github.com/hypothesis/hypothesis" rel="nofollow">
          Hypothesis
        </a>
      </strong>
    </td>
    
    <td>
      完整的网页标注系统
    </td>
    
    <td>
      复杂标注需求
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        CSS Custom Highlight API
      </strong>
    </td>
    
    <td>
      原生无 DOM 污染
    </td>
    
    <td>
      Chrome 105+
    </td>
  </tr>
</tbody>
</table>
