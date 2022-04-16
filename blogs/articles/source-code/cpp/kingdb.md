# KingDB

[TOC]

## 概述

源码分两部分，从相关的测试文件，到核心源码。参考 IKVS 系列文章给的架构图，核心源码的阅读顺序沿着 Put、Delete、Get 三个接口，由 Database 一路向 Buffer、Event Manager、Storage Engine、HSTable Manager、File System 相关、Index 前进。最好再看相关快照、迭代器、Multipart 等部分。期间如果遇到简单的帮助函数会先讲帮助函数。

本来想从第一个 Git Commit 开始看起的。但我 checkout 过去之后，碰到了一堆编译问题，根本跑不通，索性就直接回到 master 来看最新代码了。本文章的源码快照见 [KingDB@58994](https://github.com/goossaert/kingdb/tree/58994280e789fc7248d61371f03a6c04c844c197)。阅读源码前可以先看一下 KingDB 的 Readme：doc/kingdb.md 以及 doc/kingserver.md。

下文可能出现的缩写：

* KDB：KingDB，泛指，有时指 KingDB 程序，有时指 KingDB 源码。
* IKVS：作者相关 KingDB 做的一些调研及笔记的博客系列。这个系列从 13 年开始写，现在还没写完... 见 [IKVS](https://codecapsule.com/2012/11/07/ikvs-implementing-a-key-value-store-table-of-contents/)。

另，为了简便起见，下文给出的代码很可能并非原本的代码，而是截取或经过剔除后的部分代码。比如说，去除了某函数中的错误处理，使之代码更短，更容易展示。

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

## 接口层

接口的声明位于 interface/kingdb.h，实现则是 interface/kingdb.cc。KingDB 类给 Database 和 Snapshot 定义了要求实现的 Get、Put、Delete、NewIterater、Open、Close、Flush、Compact、NewMultipartReader 接口。KDB 有自己的数据传输格式 ByteArray，诸如 Get、Put 这些接口在 KingDB 类中对应方法得到了重载，以实现通过 std::string 来传递键、值或者两者，可视为为接受 ByteArray 的方法的包装。所有数据库操作方法都返回 Status 对象，相关异常部分的简介见[异常与日志](#异常与日志)小节。

重载方法的实现示例如下，即先把 std::string 转回 ByteArray 再调用子类（Database 或 Snapshot）的实现。

```cpp
virtual Status Put(WriteOptions& write_options, const std::string& key, const std::string& chunk) {
  ByteArray byte_array_key = NewDeepCopyByteArray(key.c_str(), key.size());
  ByteArray byte_array_chunk = NewDeepCopyByteArray(chunk.c_str(), chunk.size());
  return Put(write_options, byte_array_key, byte_array_chunk);
}
```

#### 数据库开关

数据库的开启与关闭，分别对应 Database 类的 Open 和 Close 方法。开启时，通过 stat 库函数找到数据库路径以及配置文件，使用 open 库函数获取其文件描述符。配置文件须先用 flock 锁住，使用 mmap 映射后再读取；如果没有那么分情况写入。之后，创建好 EventManager、WriteBuffer 和 StorageEngine 的实例，就完成了。关闭时过程类似，锁定住配置文件后再关闭，同时删除以上创建的实例。可以发现，资源申请全放在了 Open 中，而资源的销毁放在了 Close 中，而 Database 类析构时会自动调用 Close，所以这是一个类似 RAII 的资源管理过程。

```cpp
class Database: public KingDB {
  virtual ~Database() { Close(); }
  virtual Status Open() override {
    std::string filepath_dboptions = DatabaseOptions::GetPath(dbname_);
    fd_dboptions_ = open(filepath_dboptions.c_str(), O_RDONLY, 0644);
    flock(fd_dboptions_, LOCK_EX | LOCK_NB);
    Mmap mmap(filepath_dboptions, info.st_size);
    Status status_dboptions = DatabaseOptionEncoder::DecodeFrom(mmap.datafile(), mmap.filesize(), &db_options_candidate);
    // ...
    em_ = new EventManager();
    wb_ = new WriteBuffer(db_options_, em_);
    se_ = new StorageEngine(db_options_, em_, dbname_);
    return Status::OK(); 
  }
  virtual void Close() override {
    flock(fd_dboptions_, LOCK_UN);
    close(fd_dboptions_);
    wb_->Close();
    se_->Close();
    delete wb_;
    delete se_;
    delete em_;
  }
}
```

因为数据库不能同时关闭或是开启，所以 Open 以及 Close 中都使用了 std::unique_lock 进行锁定。

```cpp
virtual Status Open() override {
  std::unique_lock<std::mutex> lock(mutex_close_);
}
virtual void Close() override {
  std::unique_lock<std::mutex> lock(mutex_close_);
}
```



## 异常与日志

代码没有使用 C++ 风格的异常捕获，取而代之的是设计了状态类 Status。就像 kingdb_user 示例展示的，所有数据库操作都会返回一个状态实例，通过调用其 IsOK 方法，调用者可以判断处出操作有没有成功；如果失败了，可以使用 ToString 方法把出错原因输出。尽管这种设计会带来额外的内存开销，且使每次调用都带来轻微的性能消耗，不过这种消耗可以避免魔法数值，它将错误码和核心解耦，使代码有更佳的可读性。

```cpp
class Status {
  // ...
  static Status OK() { return Status(); }
  bool IsOK() const { return (code_ == kOK); }
  // ...
  enum Code {
    kOK = 0, 
    kNotFound = 1,
    kDeleteOrder = 2,
    kInvalidArgument = 3,
    kIOError = 4,
    kDone = 5,
    kMultipartRequired = 6
  };
  // ...
}
std::string Status::ToString() const {
  if (message1_ == "") {
    return "OK";
  } else {
    char tmp[30];
    const char* type;
    switch (code()) {
      case kOK:
        type = "OK";
        break;
      // ...
    }
    // ...
    return result;
  }
}
```

KDB 内部代码出现异常时会使用日志将其记录下来。如果没有日志，那么在排查代码问题时简直就是噩梦。KDB 有两套日志的输出目标，分别是系统输出和标准输出设备。日志类记录输出目标、日志级别、线程锁等成员，并通过静态方法 Logv 实现记录日志。锁的最大用处是保证记录顺序。仅有当出现最高级别的日志（kLogLevelEMERG）时，才会跳过锁直接写入。出现 kLogLevelEMERG 时意味着程序遇到了紧急问题，通常会直接退出或是返回 Status 异常，所以这个时候需要及时记录。

日志级别的划分参考了 Syslog：

* silent: all logging is turned off
* emerg: system is unusable, imminent crash
* alert: error event, immediate action required
* crit: error event, immediate action required
* error: error event, action is required but is not urgent
* warn: events that can be harmful if no action is taken
* notice: unusual events, but no immediate action required
* info: normal operation events, no action required
* debug: events used for debugging, no action required
* trace: fine-grained events used for debugging, no action required

#### 日志调用用宏还是函数

原先的提交中，日志调用被定义在了宏里，直接调用 Logger::Logv 去记录。日志宏中使用子宏 __VA_ARGS__ 来记录可变参数。__VA_ARGS__ 前面有标记黏贴运算符的原因是当日志宏的可变参数为空时，可以把末尾的逗号去掉。

```cpp
class log {
  static void emerg(const char* logname, const char* format, ...) {
    va_list args;
    va_start(args, format);
    Logger::Logv(false, Logger::kLogLevelEMERG, LOG_EMERG, logname, format, args);
    va_end(args);
  }
}
// ...
#define LOG_EMERG(logname, fmt, ...) \
        Logger::Logv(false, Logger::kLogLevelEMERG, logname, fmt, ##__VA_ARGS__)
```

尚不清楚为什么不用宏，而是使用运行时的方法调用（即 log 的 public 方法）。猜测可能是因为宏不能跨行？因为我看到了这种很长的调用。

```cpp
log::trace(
  "Database::PutPartValidSize()",
  "[%s] size_chunk:%" PRIu64 " offset_chunk:%" PRIu64,
  key.ToString().c_str(),
  chunk.size(),
  offset_chunk
);
```

#### 日志时间

使用系统输出（syslog）时不需要手动记录时间，但是把日志打印出来时却是要的。尤其是在调试时，精确时间非常有用。KDB 使用 Linux 的 timeval、tm 两个结构体，分别拿到精确时间及可读时间，再格式化输出。

```cpp
struct timeval now_tv;
gettimeofday(&now_tv, NULL);
const time_t seconds = now_tv.tv_sec;
struct tm t;
// 初始化 tm 时需要用到当前秒数，
// 所以需要提前初始化 now_tv
localtime_r(&seconds, &t);
p += snprintf(p, limit - p,
              "%04d/%02d/%02d-%02d:%02d:%02d.%06d %s %s ",
              t.tm_year + 1900,
              t.tm_mon + 1,
              t.tm_mday,
              t.tm_hour,
              t.tm_min,
              t.tm_sec,
              static_cast<int>(now_tv.tv_usec), // 毫秒
              ss.str().c_str(),
              logname);
```
