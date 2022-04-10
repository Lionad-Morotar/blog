# KingDB

[TOC]

## 概述

源码分两部分，从相关的测试文件，到核心源码。参考 IKVS 系列文章给的架构图，核心源码的阅读顺序沿着 Put、Delete、Get 三个接口，由 Database 一路向 Buffer、Event Manager、Storage Engine、HSTable Manager、File System 相关、Index 前进。最好再看相关快照、迭代器、Multipart 等部分。期间如果遇到简单的帮助函数会先讲帮助函数。

本来想从第一个 Git Commit 开始看起的。但我 checkout 过去之后，碰到了一堆编译问题，根本跑不通，索性就直接回到 master 来看最新代码了。本文章的源码快照见 [KingDB@58994](https://github.com/goossaert/kingdb/tree/58994280e789fc7248d61371f03a6c04c844c197)。

下文可能出现的缩写：

* KDB：KingDB，泛指，有时指 KingDB 程序，有时指 KingDB 源码。
* IKVS：作者相关 KingDB 做的一些调研及笔记的博客系列。这个系列从 13 年开始写，现在还没写完... 见 [IKVS](https://codecapsule.com/2012/11/07/ikvs-implementing-a-key-value-store-table-of-contents/)。

## 从测试开始

Emmanuel 给了一个典型的 KDB 用户使用示例，见 unit-tests/kingdb_user.cc。通过此示例，能大概了解 KDB 的接口及如何使用该接口。创建数据库、存入、读取前都需要创建对应的参数配置 Options；这些动作通过 Status 对象来回传操作成功与否。

```cpp
#include <kingdb/kdb.h>

int main() {
  kdb::Status s;
  kdb::DatabaseOptions db_options;
  kdb::Database db(db_options, "mylocaldb");
  s = db.Open();
  if (!s.IsOK()) {
    fprintf(stderr, "Could not open the database: %s\n", s.ToString().c_str());
    exit(1);
  }

  std::string key1("key1");
  std::string value1("value1");

  kdb::WriteOptions write_options;
  s = db.Put(write_options, key1, value1);

  kdb::ReadOptions read_options;
  std::string out_str;
  s = db.Get(read_options, key1, &out_str);
  if (s.IsOK() && out_str == "value1") {
    printf("Data successfully stored and retrieved\n"); 
  } else {
    printf("An error occurred\n"); 
  }

  return 0;
}
```

测试的入口文件是 unit-tests/test_db.cc。以我看过的 JS 库来看，这是一个基本的功能测试。编译好 KDB 之后，运行编译出的二进制文件 test_db 可以开始测试。测试结果输出到控制台，如下代码所示。

```
==== Test DBTest.CloseAndReopen
==== Test DBTest.RepairInvalidDatabaseOptionFile
==== Test DBTest.KeysWithNullBytes
==== Test DBTest.TestStringInterface
Database Options: Stage 0 - Incompressible data with LZ4 compression enabled
Database Options: Stage 1 - Compressible data with LZ4 compression enabled
Database Options: Stage 2 - Compression disabled
Database Options: Stage 3 - 64-bit MurmurHash3
Database Options: Stage 4 - Checksum verification with incompressible data
Database Options: Stage 5 - Checksum verification with compressible data
Database Options: Stage 6 - Checksum verification with compression disabled
Database Options: Stage 7 - Synced writes
Database Options: Stage 8 - Small-sized HSTables with compression disabled
Database Options: Stage 9 - Small-sized HSTables with incompressible data and LZ4 compression
Database Options: Stage 10 - Small-sized HSTables with compressible data and LZ4 compression
Database Options: Stage 11 - Direct mode for Write Buffer (incompressible data with LZ4 compression enabled)
Database Options: Stage 12 - Direct mode for Write Buffer (compressible data with LZ4 compression enabled)
==== Test DBTest.MultipartReader
// the same with last stages
==== Test DBTest.SingleThreadSmallEntries
// the same with last stages
==== Test DBTest.SingleThreadSnapshot
// the same with last stages
==== Test DBTest.SingleThreadSmallEntriesCompaction
// the same with last stages
==== Test DBTest.SequentialIterator
// the same with last stages
==== Test DBTest.SingleThreadSingleLargeEntry
// the same with last stages
==== Test DBTest.FileUtil
mysize: 268435456
OK
89 ms
Free size: 944 GB
==== PASSED 11 tests
```

每个功能点如数据库初始化和关闭 CloseAndReopen、存入带结束符的键 KeysWithNullBytes 都使用对应继承了 DBTest 的测试类进行测试。涉及到与数据库交互的功能部分如 TestStringInterface 使用循环，遍历了所有数据库 Options 可以设置的情况（但是只是二维循环，没有测试参数间的组合）。即对应上文的 Stage 1、Stage 2...

在 test_db 创建相应的测试类时，会自动调用测试套件（unit-tests/testharness.cc）中的 RegisterTest 把测试函数储存起来。以便运行测试时，通过读取环境变量来判断是否要跳过某类测试。

测试代码的实现还有一些有意思的地方，以下提及。

#### 信号处理

和数据库核心的入口函数一样，使用 signal 挂载了对 SIGSEGV、SIGABRT 信号的处理。这两个信号分别指代系统内存错误和系统中断。而处理函数非常简单，就是 IKVS 中提到的“let it die”风格：输出调用栈，立马结束程序。

```cpp
void handler(int sig) {
  int depth_max = 20;
  void *array[depth_max];
  size_t depth;
  // backtrace 将前 depth_max 层栈帧记录到 array 数组中，
  // 再通过 backtrace_symbols_fd 输出到 stderr。
  // 文档见：https://man7.org/linux/man-pages/man3/backtrace.3.html
  depth = backtrace(array, depth_max);
  fprintf(stderr, "Error: signal %d:\n", sig);
  backtrace_symbols_fd(array, depth, STDERR_FILENO);
  exit(1);
}
int main() {
  signal(SIGSEGV, handler);
  signal(SIGABRT, handler);
  return kdb::test::RunAllTests();
}
```

#### 使用宏创建测试类

test_db 中的类是使用宏定义的。如下代码，TEST 展开的新类，继承了 DBTest，实现了 _RunIt 接口以便调用测试函数。TCONCAT 宏顾名思义就是连接，使用标记黏贴运算符把两个字符串或实参连接在一起并视为一个新的标记。\_Test\_ 和 name 连接在一起后，就是新类的名称，如 _Test_CloseAndReopen。

```cpp
TEST(DBTest, CloseAndReopen) {
  // ...
}
#define TEST(base,name)                                                 \
class TCONCAT(_Test_,name) : public base {                              \
 public:                                                                \
  void _Run();                                                          \
  static void _RunIt() {                                                \
    TCONCAT(_Test_,name) t;                                             \
    t._Run();                                                           \
  }                                                                     \
};                                                                      \
bool TCONCAT(_Test_ignored_,name) =                                     \
  ::kdb::test::RegisterTest(#base, #name, &TCONCAT(_Test_,name)::_RunIt); \
```

可是，既然有 TCONCAT，为什么还要定义一个 TCONCAT1 宏呢？

```cpp
#define TCONCAT(a,b) TCONCAT1(a,b)
#define TCONCAT1(a,b) a##b
```

这就要提到宏的一个特殊规则了，如果宏参数使用了字符串化运算符（#）或标记黏贴运算符（##），那么即便参数是宏也不会展开。所以需要一个间接宏 TCONCAT1，以达到先展开参数（如果参数是宏的化），再调用标记黏贴运算符的目的。从 test_db 可以看到，测试类的名词都不是宏，所以这里本不需要 TCONCAT1 这个间接宏。但是考虑到程序的健壮性，加上更好。

#### 断言宏

测试代码中的断言也是使用的宏来定义的。相比 TCONCAT 简单很多了，但其特点是可以记录抛错的文件以及行号。以下代码实现了 ASSERT_EQ 的定义。Tester 用于记录宏展开时所在的文件 \_\_FILE\_\_、行号 \_\_LINE\_\_ 以及断言结果。一但断言失败，记录到 ok_ 成员变量中。在 Tester 析构时，会把相关信息一并打印出来。

```cpp
class Tester {
#define BINARY_OP(name,op)                              \
  template <class X, class Y>                           \
  Tester& name(const X& x, const Y& y) {                \
    if (! (x op y)) {                                   \
      ss_ << " failed: " << x << (" " #op " ") << y;    \
      ok_ = false;                                      \
    }                                                   \
    return *this;                                       \
  }
  BINARY_OP(IsEq, ==)
#undef BINARY_OP
}
#define ASSERT_EQ(a,b) ::kdb::test::Tester(__FILE__, __LINE__).IsEq((a),(b))
```

#### string.repeat(ntimes)

写 JavaScript 时经常用到 String 的原型方法 repeat，用来把 n 个内容重复的字符串拼接为一个新字符串。也许是 C++ 标准库没有提供相应的算法，KDB 使用了一种和 repeat 完全不一样的处理思路。KDB 使用 StringStream 填充一定位数内容，还可以不用考虑值的长度。

```cpp
std::stringstream ss;
ss << std::setfill ('0') << std::setw (16);
ss << 1;
ss.str(); // result is: "0000000000000001"
ss << std::setfill ('0') << std::setw (16);
ss << 1123;
ss.str(); // result is: "0000000000001123"
```

#### C++ 风格的随机数

一个有意思的地方时，KDB 代码中随处可见 C 编程风格的源码。但是测试用例中生成随机数确实 C++ 风格的。

```cpp
std::mt19937 generator = std::mt19937();
std::uniform_int_distribution<int> random_dist(0,255);
// ...
for (int i = 0; i < size; i++) {
  str[i] = static_cast<char>(random_dist(generator));
}
```
