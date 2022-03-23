# KVStore

[TOC]

## [<i>IKVA Series</i>](https://codecapsule.com/2012/11/07/ikvs-implementing-a-key-value-store-table-of-contents/)

在看过《C++ 新经典》后，被其繁杂的特性及语法小小的震撼到了，想进一步深入学习一下（C++ 以及相关知识）。并不是像 Anysort 一样想做出点什么有用的东西，只是一个小小的练习。据《Implement...》博主所说，选择做一个简单的关系型数据库可能是一个做为练习的合适选择，它能提供以下方面的挑战：

* C++
* 面向对象编程
* 经典数据结构及算法
* 内存管理
* 多线程及多进程并发控制
* C/S 网络通讯模型
* IO 操作以及与文件系统打交道

##### [<i>IKVA Part 1: What are key-value stores, and why implement one?</i>](https://codecapsule.com/2012/11/07/implementing-a-key-value-store-part-1-what-are-key-value-stores-and-why-implement-one/)

一般来说，KV 数据库具有以下几个接口：Get(key)、Set(key)、Delete(key)，一般基于哈希表或某种自平衡树（B-Tree、红黑树）来实现。其中“key”就是数据于其位置的映射，根据 key，KV 数据库能高效查找到对应的数据。另一方面，由于 KV 数据库不知道它到底存了哪种的数据，所以如果你想想 SQL 一样使用 WHERE 语句的话，那就只能把所有数据都遍历一遍了。

网上太多 KV 数据库半成品了（还没算上玩具），很多人只是简单的实现了一个数据库，并用一个速度图表来展现它的优势。其实，数据库的速度和许多东西挂钩，所以通常的数据并不能展现什么过人之处。如果你想在 KV 数据库上有什么创新的话，可以试试以下思路：

* 适配特定类型的数据（比如图、地理数据等）
* 适配特定操作（如写入很快或读取很快等）
* 自动参数调整（？）
* 提供更多数据访问方法（比如 LevelDB 可以遍历排序好的数据）
* 给使用他的人提供方便（如提供完整的文档以及代码示例）
* 适配特定应用程序（比如许多爬虫都会使用到大量的 URL 地址）

##### [<i>IKVA Part 2: Using existing key-value stores as models</i>](http://codecapsule.com/2012/12/03/implementing-a-key-value-store-part-2-using-existing-key-value-stores-as-models/)

遵从高尔定律，我们应该从一个简单的、能验证的模型入手，一步一步实现并完善新的 KV 数据库。为了避免重复造轮子，需要考察一下现有的经过时间检验过的 KV 数据库。经过挑选，Emmanuel 决定选用 Berkeley DB、Kyoto Cabinet（下简称 KC） 和 LevelDB。

> A complex system that works is invariably found to have evolved from a simple system that worked. The inverse proposition also appears to be true: A complex system designed from scratch never works and cannot be made to work. You have to start over, beginning with a working simple system.
> <name>Gall’s law</name>

##### [<i>IKVA Part 3: Comparative Analysis of the Architectures of Kyoto Cabinet and LevelDB</i>](https://codecapsule.com/2012/12/30/implementing-a-key-value-store-part-3-comparative-analysis-of-the-architectures-of-kyoto-cabinet-and-leveldb/)

忽略这些知名数据库不同的架构，大部分 KV 数据库都包含以下几个组件：

* Interface：向客户端提供用于操作的 API
* Parametrization：系统参数设置
* Data Storage：数据存储
* Data Structure：管理数据使用的数据结构
* Memory Management：内存管理
* Iteration：迭代器以及游标
* String：字符串相关算法
* Lock Management：用于控制锁、并发和多线程操作
* Error Management：错误管理
* Logging：事件记录
* Transaction Management：事务管理
* Compression：数据压缩
* Comparators：比较器
* Checksum：用于确保和校验数据完整性的方法
* Snapshot：给数据提供一个只读的视图
* Partitioning：数据分片
* Replication：数据备份机制
* Testing Framework：测试套件

Emmanuel 对比了 KC 和 LevelDB 的架构图，粗略分析了一下两者的不同。

![Kyoto Cabinet v1.2.76](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220321121058.png?w=60)
![LevelDB v1.7.0](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220321121216.png?w=60)

LevelDB 和核心（Core/Interface）更小，API 设计更紧凑。比方说，LevelDB 把参数也对象化，并通过 ReadOptions 和 WriteOptions 暴露读写操作，使得这些接口没必要与数据库的核心耦合起来。

Emmanuel 认为单独设计字符串的操作类 String 是有必要的，比如说 LevelDB 使用“Slice”来存储字符串可以把获取字符串长度降低到 O(1)（对比 strlen 在 C 中是 O(n) 的性能）。“Slice” 在拷贝时使用浅拷贝而不是深拷贝，使得它和 C++ 中 std::string 的表现不一致。总的来说，LevelDB 的 String 可以节约拷贝和分配内存的时间。而 KC 完全依赖 std::string。

KC 使用 C 风格的错误处理，在任何出错的地方返回数值异常值；LevelDB 没有使用异常捕获，而是使用了一个 Status 对象来标记程序运行正常或否（手动破折号）由于每个方法都有从返回值中判断错误情况，所以每个方法的调用都会多消耗一些内存。不过这种消耗是有意义的，它避免了魔法数值，并且将错误码和核心解耦。

在内存管理上两者有很大区别：KC 持续跟踪由 mmap() 映射的空闲内存块，并将数据储存到足够大小的块中。LevelDB 使用 LSM 树进行数据管理，一旦其大小超过一定阈值，便开始压缩。这两个数据库都是用文件系统储存数据。

##### [<i>IKVA Part 4: API Design</i>](https://codecapsule.com/2013/04/03/implementing-a-key-value-store-part-4-api-design/)

Emmanuel 决定把自己的 KV Store 叫做 KingDB。在设计 API 时，他建议遵循 Joshua Bloch 的原则（以及 <i>Effective C++</i>）：

* 存疑则不留：不知道一个 API 是否应该暴露给用户时，不要暴露；
* 能做则做：如果客户端需要连续调用好几个函数来完成操作，那么将其包含进 API 中会使客户端更省事儿；
* 遵循传统：使 API 看起来像经典的应用，这能使客户端看一眼就知道怎么调用；

好的 API 应该对称：如果我调用了“open”，那应该还可以调用“close”，而不是像 LevelDB 一样使用 delete 来关闭数据库。同样，基于对称性的理由，Emmanuel 认为 API 中的 Get()/Put() 会比 Get()/Set() 更更易读一些；使用迭代器而不是游标来获取数据也是依此为据。

```cpp
/* LevelDB */
leveldb::DB* db;
leveldb::DB::Open(leveldb::Options, "/tmp/testdb", &db);

leveldb::Iterator* it = db->NewIterator(leveldb::ReadOptions());
for (it->SeekToFirst(); it->Valid(); it->Next()) {
  cout << it->key().ToString() << ": "  << it->value().ToString() << endl;
}
delete it;

delete db;
```

KC 和 LevelDB 使用了两种完全不同的设定方法（见架构图）。给 KC 数据库实例设置参数时可以直接调用其方法；而 LevelDB 在设定参数时，需要创建新的参数对象，这样可以方便地在多个数据库之间共享对象。不过 LevelDB 每次 Get 或 Put 时都需要将参数对象作为第一个参数传入，Emmanuel 认为这样做也许有其理由，但是使用重载或是将参数对象作为最后一项可选参数要更“C++-style”一些。

##### [<i>IKVA Part 5: Hash table implementations</i>](https://codecapsule.com/2013/05/13/implementing-a-key-value-store-part-5-hash-table-implementations/)

哈希表可以高效存取数据，但是在实际使用时，需要考虑许多值哈希后可能会得到一个结果，这时需要如何存储。为了解决哈希碰撞，常常使用链表或自平衡树来储存值，或使用线性或平分寻址技术。好的哈希算法应该使结果尽可能均匀地分布在索引数据范围内，比如 MurmurHash3、CityHash。

libstdc 中的 unordered_map 哈希算法使用链表实现了存储，它定义了“Node”结构用来保存当前节点的值以及下一个节点的地址。

![unordered_map from GCC 4.8.0](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220321205051.png?w=60)

dence_hash_map 使用平分寻址技术来检测是否有空位。这种技术能较高效利用缓存以快速寻址，且能避免线性寻址容易造成的集群现象。

![dence_hash_map from SparseHash v2.0.2](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220321210944.png?w=60)

KC 使用了自己实现的哈希表 HashDB，它使用二分搜索树来储存数据。HashDB 分为四块，见下图，Header 用来存放数据库元信息，FreeBlock Pool 用来标记是否磁盘剩余的空间，Bucket Array 是索引数组，Records 则用来存放数据。由于 KC 的桶大小不能进行变更，所以一但其大小设置地比实际需要的更小，那么当桶快满时，KC 的性能就会开始急剧下降。

![HashDB from Kyoto Cabinet v1.2.76](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220321214250.png?w=60)

每个 Record 都需要记录以下信息。

![Record](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220321222250.png)

* psiz：填充的空白的大小
* left：搜索树的左节点偏离量
* right：搜索树的右节点偏离量
* ksiz：键的大小
* vsiz：值的大小
* key：键
* value：值
* padding：空白

可以发现，每个 Record 都是搜索树的一个节点。将树的节点和键值对用同一个结构储存下来是非常方便的做法，它使得储存不定长的数据成为可能，并且相比将两者分开存放能减少读盘次数。既然要用到搜索树，那么比较算法也是少不了的。KC 简单折叠了哈希值用于节点的排序：

```cpp
/* from kyotocabinet-1.2.76/kchashdb.h */ 
uint32_t fold_hash(uint64_t hash) {
  return (((hash & 0xffff000000000000ULL) >> 48) | ((hash & 0x0000ffff00000000ULL) >> 16)) ^
    (((hash & 0x000000000000ffffULL) << 16) | ((hash & 0x00000000ffff0000ULL) >> 16));
}
```

##### [<i>IKVA Part 6: Open-Addressing Hash Tables</i>](https://codecapsule.com/2014/05/07/implementing-a-key-value-store-part-6-open-addressing-hash-tables/)

Emmanuel 使用 DIP、DFB、DMB、DSB 等多个指标，重新对比了线性寻址、跳房子哈希和罗宾汉哈希的性能。

* DIB：Distance to Initial Bucket，指储存一个条目的位置到其键最初被散列到的位置的距离。
* DFB：Distance to Free Bucket，从给定入口到扫描到空位所跳过的数量。
* DMB：Distance to Missing Bucket，从给定入口扫描直到判断出该键不属于当前索引的扫描次数。
* DSB：Distance to Shift Bucket，？？？
* Number of bucket swaps：罗宾汉哈希和跳房子哈希在插入后会重排序，会带来读写操作，所以需要考虑这个指标。

![Metrics](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220322225431.png)

## Hash Collisions

<Frame src="/gists/hash-collision.html" />