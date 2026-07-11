---
title: 选择算法与中位数
description: 顺序统计量（第 k 小元素与中位数）的选择算法演化、偶数长度与 NaN 下的数值语义，以及崩溃点与截尾均值等稳健统计根因
---

#### 选择算法：从快速选择到内省选择

找第 k 小元素不必先全排序。quickselect（快速选择）复用快排的 partition（分区）：
选 pivot 把小的放左、大的放右，看 pivot 落点 p——p==k 即命中，
k<p 递归左半，k>p 递归右半（目标改成第 k-p-1 小）。
关键是只递归含目标的一侧、另一侧直接丢弃，
于是平均复杂度从 O(n log n) 降到 O(n)：n + n/2 + n/4 + … 收敛到 2n。

它的阿喀琉斯之踵是 pivot：已排序却总选首尾、元素全相等、或刻意构造的序列，
都会让每轮只排除一个元素，退化成 O(n²)。
随机 pivot 把最坏概率压到极低，但理论上仍然存在。

median-of-medians（中位数的中位数，MoM）给出确定性解法：
按 5 个一组分组取中位数，再递归求这些中位数的中位数当 pivot。
这个 pivot 至少比 3n/10 个元素大、比 3n/10 个元素小，每轮至少排除 30%，
递归规模 T(n) ≤ T(n/5) + T(7n/10) + O(n)，解出严格的 O(n) 最坏。

代价是常数因子（constant factor，被大 O 抹掉的系数 c）很大——
分组排序、递归求 pivot、两遍 partition 的开销远高于随机挑 pivot，
所以 MoM 最坏线性却实战偏慢。

工程上因此用 introselect（内省选择）缝合两者：先跑 quickselect 拿好平均性能，
监测到递归深度异常再回退 MoM 兜底，日常快、坏情况也不崩。

见：[a software engineering interview question I like: computing the median](https://krisshamloo.com/blog/007)

#### 各语言内置“取第 k 个”与内省算法对照

先分清两个同名异物：introsort（内省排序）用于 sort，是 quicksort + heapsort 回退；
introselect（内省选择）用于取第 k 个，是 quickselect + MoM 回退。
许多语言的“内省”只体现在排序，而非选择。

真正内置 O(n) 选择且用 introselect 的是少数：
C++ 的 std::nth_element（C++11 起标准强制最坏线性，libstdc++/libc++ 用 introselect）、
Rust 的 slice::select_nth_unstable（introselect + MoM 用 Tukey's Ninther 选 pivot 兜底）、
NumPy 的 np.partition（文档明示 kind='introselect'）。

Go（sort 用 pdqsort）、Java（基本类型 dual-pivot quicksort、对象 TimSort）、
.NET（Array.Sort 是 introsort，LINQ 的 OrderBy().ElementAt(k) 全排序）、
Python（heapq.nsmallest 对 k≪n 用堆 O(n log k)，statistics.median 全排序）、
JavaScript（引擎相关）都没有内置线性选择。

佐证案例：Rust 的 select_nth_unstable 早期其实是二次最坏的（issue #102451），
后来改成 introselect + MoM 兜底才守住线性保证——
这正是“为什么必须回退 MoM”的真实注脚。

见：[a software engineering interview question I like: computing the median](https://krisshamloo.com/blog/007)

#### 偶数长度中位数有三种口径

奇数长度中位数唯一；偶数长度中间有两个数，于是有三种约定：
平均口径（mid-average，如 statistics.median）取两数均值，
低口径（median_low）取较小者，高口径（median_high）取较大者。

当元素是离散量——满意度 1–5 分、成绩等级、价格档、年龄段编号——
平均口径会产生原数据集里根本不存在的值：
[10, 20, 30, 40] 得到 25，而 25 元档并不存在；
此时 low/high 才能保住“中位数仍是真实样本”。

口径问题本质是“分位数落在两点之间如何插值”：中位数即 50% 分位数，
R 的 quantile 为此提供 9 种插值方法（type 1–9），
它直接影响四分位数与箱线图须线位置。

库之间并不一致：NumPy 的 np.median 内部就是对中间切片调 mean，只有平均一种口径；
SQL 里 PERCENTILE_CONT（连续插值≈平均）与 PERCENTILE_DISC（离散，取真实样本）结果也不同。
跨库对账时这是常见差异源，合规指标有时还明确指定 low 或 high。

见：[a software engineering interview question I like: computing the median](https://krisshamloo.com/blog/007)

#### NaN 会让依赖排序的中位数失效

先排序再取中位的实现都隐含一个前提：元素两两可比较。
IEEE 754 的 NaN 与任何值比较都返回 false（包括 NaN == NaN），
于是含 NaN 的数据排序结果不可预期，中位数随之变成未定义行为——
这是 Python 官方文档对 statistics 排序型统计函数（median 系列、quantiles 等）的显式警告。
NumPy 的同题表现是静默传播：np.median 对含 NaN 数组直接返回 NaN，
要忽略缺失值必须改用 np.nanmedian。

这个坑与语言无关，因为 NaN 的比较语义来自 IEEE 754 而非某门语言：
Python、JavaScript、Java、C/C++、Rust、Go、C# 的 float/double/f32/f64 全都遵循。

边界要分清：整数没有 NaN；
十进制类型（Python decimal、Java BigDecimal、C# decimal、SQL NUMERIC）不走 IEEE 754，
但有各自的空值语义（SQL NULL 三值逻辑、Decimal 的 sNaN/NaN）。

更隐蔽的是特例：PostgreSQL 特意把 NaN 视为“大于所有非 NaN”以让排序确定，
结果含 NaN 的 median 会给出“看似合理”的值，把问题掩盖掉，比直接报错更难查。

见：[a software engineering interview question I like: computing the median](https://krisshamloo.com/blog/007)

#### 中位数稳健的量化根因

“中位数比均值更抗异常值”的精确说法是崩溃点（breakdown point）：
均值的崩溃点是 0%，只要一个足够极端的值就能把均值拉到任意远；
中位数的崩溃点是 50%，要污染将近一半数据才能让中位数失控。

这把“多数场景优先中位数”的经验判断落实成可量化边界，也顺带给出反例——
当异常值比例可能接近半数时，连中位数都靠不住，
得换截尾均值（trimmed mean）或其他稳健估计量。

见：[a software engineering interview question I like: computing the median](https://krisshamloo.com/blog/007)

#### 截尾均值与缩尾均值

截尾均值（trimmed mean）先排序，对称地去掉最高和最低各 α 比例，
再对剩下中间部分取算术平均，常见 α=10%、20%。

α 是一条连续光谱：α=0 退化为普通均值，α→50% 退化为中位数，
所以截尾均值介于两者之间——比中位数用了更多数据（信息量大），又比均值抗异常值。
体操、跳水打分“去掉一个最高分、一个最低分再平均”就是它的日常版（去头尾各一个）。

要区分缩尾均值（winsorized mean）：截尾是丢弃极端值，
缩尾是把极端值替换为第 α/(1−α) 分位数的值（不丢，而是压回去）；
两者都抗异常值，但缩尾保留了样本量。
对称截尾用于估计对称分布的中心，分布偏斜时也可单侧截尾，但含义不同。

见：[a software engineering interview question I like: computing the median](https://krisshamloo.com/blog/007)
