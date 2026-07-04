# 系统性能

> 计算机系统性能指标与延迟数字，帮助程序员理解各层级操作的时间量级差异

#### 程序员应该知道的延迟数字

理解计算机系统中各种操作的延迟数量级，是做出正确架构决策的基础。
Jeff Dean（Google 资深研究员）和 Peter Norvig 整理的这些数字展示了从 CPU 缓存到跨洋网络请求的惊人差异。

**核心延迟参考（按数量级分层）：**

<table>
<thead>
  <tr>
    <th>
      量级
    </th>
    
    <th>
      操作
    </th>
    
    <th>
      延迟
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      纳秒级
    </td>
    
    <td>
      L1 缓存引用
    </td>
    
    <td>
      ~1 ns
    </td>
  </tr>
  
  <tr>
    <td>
      
    </td>
    
    <td>
      分支预测失败
    </td>
    
    <td>
      ~3-10 ns
    </td>
  </tr>
  
  <tr>
    <td>
      
    </td>
    
    <td>
      L2 缓存引用
    </td>
    
    <td>
      ~4-13 ns
    </td>
  </tr>
  
  <tr>
    <td>
      
    </td>
    
    <td>
      互斥锁 lock/unlock
    </td>
    
    <td>
      ~25-50 ns
    </td>
  </tr>
  
  <tr>
    <td>
      百纳秒级
    </td>
    
    <td>
      主内存引用
    </td>
    
    <td>
      ~100 ns
    </td>
  </tr>
  
  <tr>
    <td>
      
    </td>
    
    <td>
      Zippy 压缩 1KB
    </td>
    
    <td>
      ~6,000 ns
    </td>
  </tr>
  
  <tr>
    <td>
      十微秒级
    </td>
    
    <td>
      网络传输 2KB
    </td>
    
    <td>
      ~10,000 ns
    </td>
  </tr>
  
  <tr>
    <td>
      
    </td>
    
    <td>
      SSD 随机读取
    </td>
    
    <td>
      ~16,000 ns
    </td>
  </tr>
  
  <tr>
    <td>
      
    </td>
    
    <td>
      内存顺序读取 1MB
    </td>
    
    <td>
      ~250,000 ns (0.25 ms)
    </td>
  </tr>
  
  <tr>
    <td>
      
    </td>
    
    <td>
      同数据中心往返
    </td>
    
    <td>
      ~500,000 ns (0.5 ms)
    </td>
  </tr>
  
  <tr>
    <td>
      毫秒级
    </td>
    
    <td>
      SSD 顺序读取 1MB
    </td>
    
    <td>
      ~1,000,000 ns (1 ms)
    </td>
  </tr>
  
  <tr>
    <td>
      
    </td>
    
    <td>
      机械磁盘寻道
    </td>
    
    <td>
      ~10,000,000 ns (10 ms)
    </td>
  </tr>
  
  <tr>
    <td>
      
    </td>
    
    <td>
      磁盘顺序读取 1MB
    </td>
    
    <td>
      ~20,000,000 ns (20 ms)
    </td>
  </tr>
  
  <tr>
    <td>
      
    </td>
    
    <td>
      加州↔荷兰网络往返
    </td>
    
    <td>
      ~150,000,000 ns (150 ms)
    </td>
  </tr>
</tbody>
</table>

**关键洞见：** 不同操作之间存在数个数量级的差异。
L1 缓存访问比主内存快约 100 倍，而内存又比磁盘随机访问快约 10 万倍。
这种**数量级思维**帮助工程师在存储介质选择、缓存策略、网络架构等方面做出合理权衡——
精确数值会随硬件演进变化，但数量级关系保持相对稳定。

见：[Numbers Every Programmer Should Know By Year](https://colin-scott.github.io/personal_website/research/interactive_latency.html)
