# 数据库索引优化

> 关系型数据库索引的工作原理、查询优化策略与常见性能陷阱。

#### B-Tree 索引的有序查找边界

B-Tree（平衡多路查找树）的核心特性是数据有序存储。查找时从根节点开始，通过比较键值大小决定分支走向，时间复杂度为 `O(log N)`。这一机制的前提是查找必须知道**精确的起始边界**——只有确定了从哪里开始，
才能在树中定位到对应节点并向后遍历。

> 关联知识：[Data Structure / 彻底理解 B 树和 B+树](/maps/_software/data-structure/data-structure)

#### LIKE 查询的前导通配符陷阱

`LIKE` 模式匹配中，通配符 `%` 的位置直接决定索引是否可用：

<table>
<thead>
  <tr>
    <th>
      模式
    </th>
    
    <th>
      是否命中索引
    </th>
    
    <th>
      原因
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        'Mark%'
      </code>
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      前缀确定，有明确的起始边界 <code>
        "Mark"
      </code>
      
      ，B-Tree 可快速定位
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        'Mar_k'
      </code>
    </td>
    
    <td>
      ✅
    </td>
    
    <td>
      前缀确定，<code>
        _
      </code>
      
       仅匹配单个字符
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        '%mark'
      </code>
    </td>
    
    <td>
      ❌
    </td>
    
    <td>
      后缀匹配，前缀字符不固定，无起始边界
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        '%mark%'
      </code>
    </td>
    
    <td>
      ❌
    </td>
    
    <td>
      前后均不定，无法确定起始边界
    </td>
  </tr>
</tbody>
</table>

前导 `%` 导致索引失效的本质是：**B-Tree 无法确定从树的哪个节点开始搜索**，优化器只能退化为全表顺序扫描（`O(N)`），数据量增大时性能差距从毫秒级扩展到秒级甚至分钟级。

#### 前导通配符的优化策略

**前缀匹配改写（L2）**：若业务允许，将 `%keyword%` 改写为 `keyword%`，利用现有 B-Tree 索引。

**反向索引（L2）**：针对后缀匹配 `%mark`，可创建反向索引。PostgreSQL 示例：

```sql
CREATE INDEX idx_name_reverse ON users (reverse(name));
WHERE reverse(name) LIKE reverse('%mark');  -- 等价于 'kram%'
```

**全文检索（L2）**：对于复杂文本搜索，使用数据库内置全文检索而非 `LIKE`：

```sql
-- PostgreSQL
WHERE to_tsvector('chinese', content) @@ to_tsquery('keyword');
```

**Trigram 索引（L1）**：PostgreSQL 的 `pg_trgm` 扩展将文本切分为三字符组合建 GIN 倒排索引，可使 `LIKE '%keyword%'` 命中索引：

```sql
CREATE EXTENSION pg_trgm;
CREATE INDEX idx_name_trgm ON users USING gin (name gin_trgm_ops);
```

**专用搜索引擎（L3）**：当搜索复杂度超出数据库索引能力时，应考虑 Elasticsearch、Meilisearch 等专用方案，而非在数据库层强行优化。
