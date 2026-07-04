# 调试技术

> 系统化 Bug 修复方法与调试技术

#### 系统化 Bug 修复方法

React 核心开发者 Dan Abramov 提出的 Bug 修复方法论，强调通过**可复现测试用例（Repro）**逐步缩小问题范围。

<table>
<thead>
  <tr>
    <th>
      步骤
    </th>
    
    <th>
      行动
    </th>
    
    <th>
      关键原则
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <strong>
        0
      </strong>
    </td>
    
    <td>
      Just Fix It
    </td>
    
    <td>
      先尝试直接修复，但要有验证手段
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        1
      </strong>
    </td>
    
    <td>
      Find a Repro
    </td>
    
    <td>
      找到可复现的测试用例，明确定义"预期"与"实际"行为
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        2
      </strong>
    </td>
    
    <td>
      Narrow the Repro
    </td>
    
    <td>
      缩小复现范围，用更简单的方式暴露相同问题
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        3
      </strong>
    </td>
    
    <td>
      Remove Everything Else
    </td>
    
    <td>
      逐步删除代码，确保每一步 bug 仍存在（基线保护）
    </td>
  </tr>
  
  <tr>
    <td>
      <strong>
        4
      </strong>
    </td>
    
    <td>
      Find the Root Cause
    </td>
    
    <td>
      最终定位根本原因
    </td>
  </tr>
</tbody>
</table>

Repro 是一切的基础；没有可验证的复现步骤，任何"修复"都是盲目的。

见：[How to Fix Any Bug — overreacted](https://overreacted.io/how-to-fix-any-bug/)
