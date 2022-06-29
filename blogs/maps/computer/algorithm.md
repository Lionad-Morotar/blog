# 算法

[TOC]

## 经典算法

#### 快速排序是什么？

快速排序是冒泡的一种改进，其基本原理是在数组中随机取一个哨兵，然后拣选出比哨兵小和比哨兵大两拨数组，继续对这两拨数组快速排序，是一个分治算法。

最简单的实现是递归，常用的性能更好的实现使用了快慢指针。

见：[QuickSort @read-source-code](https://github.com/Lionad-Morotar/read-source-code/blob/master/algorithm/quicksort.js)
