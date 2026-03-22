---
title: Python
---

#### Python 3 标准库

**数据类型与结构**

| 模块 | 作用 | 文档 |
|------|------|------|
| `array` | 紧凑的数组存储，提供基本数值类型的高效存储 | [array](https://docs.python.org/zh-cn/3/library/array.html) |
| `collections` | 高级数据容器，包含 Counter、deque、defaultdict、OrderedDict 等 | [collections](https://docs.python.org/zh-cn/3/library/collections.html) |
| `enum` | 枚举类型支持，用于定义命名常量集合 | [enum](https://docs.python.org/zh-cn/3/library/enum.html) |
| `dataclasses` | 数据类装饰器，自动生成特殊方法简化类定义 | [dataclasses](https://docs.python.org/zh-cn/3/library/dataclasses.html) |
| `copy` | 浅拷贝与深拷贝操作 | [copy](https://docs.python.org/zh-cn/3/library/copy.html) |
| `typing` | 类型提示支持，用于静态类型检查 | [typing](https://docs.python.org/zh-cn/3/library/typing.html) |
| `types` | 动态类型创建和内置类型的名称 | [types](https://docs.python.org/zh-cn/3/library/types.html) |

**字符串与文本处理**

| 模块 | 作用 | 文档 |
|------|------|------|
| `string` | 字符串常量和模板类 | [string](https://docs.python.org/zh-cn/3/library/string.html) |
| `re` | 正则表达式操作 | [re](https://docs.python.org/zh-cn/3/library/re.html) |
| `textwrap` | 文本填充、折叠和截断 | [textwrap](https://docs.python.org/zh-cn/3/library/textwrap.html) |
| `unicodedata` | Unicode 字符数据库访问 | [unicodedata](https://docs.python.org/zh-cn/3/library/unicodedata.html) |
| `stringprep` | 互联网字符串预处理 | [stringprep](https://docs.python.org/zh-cn/3/library/stringprep.html) |
| `readline` | GNU readline 接口 | [readline](https://docs.python.org/zh-cn/3/library/readline.html) |
| `rlcompleter` | Python 标识符补全 | [rlcompleter](https://docs.python.org/zh-cn/3/library/rlcompleter.html) |

**数学与数字**

| 模块 | 作用 | 文档 |
|------|------|------|
| `math` | 数学函数（浮点数运算） | [math](https://docs.python.org/zh-cn/3/library/math.html) |
| `cmath` | 复数数学函数 | [cmath](https://docs.python.org/zh-cn/3/library/cmath.html) |
| `decimal` | 十进制浮点运算（高精度） | [decimal](https://docs.python.org/zh-cn/3/library/decimal.html) |
| `fractions` | 有理数运算 | [fractions](https://docs.python.org/zh-cn/3/library/fractions.html) |
| `random` | 伪随机数生成 | [random](https://docs.python.org/zh-cn/3/library/random.html) |
| `statistics` | 数学统计函数 | [statistics](https://docs.python.org/zh-cn/3/library/statistics.html) |
| `numbers` | 数字抽象基类 | [numbers](https://docs.python.org/zh-cn/3/library/numbers.html) |
| `itertools` | 迭代器生成工具 | [itertools](https://docs.python.org/zh-cn/3/library/itertools.html) |
| `functools` | 高阶函数和可调用对象操作 | [functools](https://docs.python.org/zh-cn/3/library/functools.html) |
| `operator` | 标准运算符函数 | [operator](https://docs.python.org/zh-cn/3/library/operator.html) |
| `hashlib` | 安全哈希和消息摘要 | [hashlib](https://docs.python.org/zh-cn/3/library/hashlib.html) |
| `hmac` | 基于哈希的消息认证 | [hmac](https://docs.python.org/zh-cn/3/library/hmac.html) |
| `secrets` | 安全随机数生成（密码学安全） | [secrets](https://docs.python.org/zh-cn/3/library/secrets.html) |
| `bisect` | 数组二分查找算法 | [bisect](https://docs.python.org/zh-cn/3/library/bisect.html) |
| `heapq` | 堆队列算法 | [heapq](https://docs.python.org/zh-cn/3/library/heapq.html) |
| `graphlib` | 图拓扑排序 | [graphlib](https://docs.python.org/zh-cn/3/library/graphlib.html) |

**日期与时间**

| 模块 | 作用 | 文档 |
|------|------|------|
| `datetime` | 日期和时间处理 | [datetime](https://docs.python.org/zh-cn/3/library/datetime.html) |
| `calendar` | 日历相关函数 | [calendar](https://docs.python.org/zh-cn/3/library/calendar.html) |
| `time` | 时间访问和转换 | [time](https://docs.python.org/zh-cn/3/library/time.html) |
| `timeit` | 小段代码执行时间测量 | [timeit](https://docs.python.org/zh-cn/3/library/timeit.html) |
| `sched` | 事件调度器 | [sched](https://docs.python.org/zh-cn/3/library/sched.html) |
| `zoneinfo` | IANA 时区支持 | [zoneinfo](https://docs.python.org/zh-cn/3/library/zoneinfo.html) |

**文件与I/O**

| 模块 | 作用 | 文档 |
|------|------|------|
| `os` | 操作系统接口 | [os](https://docs.python.org/zh-cn/3/library/os.html) |
| `io` | 流处理工具 | [io](https://docs.python.org/zh-cn/3/library/io.html) |
| `pathlib` | 面向对象的文件系统路径 | [pathlib](https://docs.python.org/zh-cn/3/library/pathlib.html) |
| `glob` | Unix 风格路径模式匹配 | [glob](https://docs.python.org/zh-cn/3/library/glob.html) |
| `fnmatch` | Unix 文件名模式匹配 | [fnmatch](https://docs.python.org/zh-cn/3/library/fnmatch.html) |
| `shutil` | 高级文件操作 | [shutil](https://docs.python.org/zh-cn/3/library/shutil.html) |
| `filecmp` | 文件和目录比较 | [filecmp](https://docs.python.org/zh-cn/3/library/filecmp.html) |
| `linecache` | 文本行随机访问 | [linecache](https://docs.python.org/zh-cn/3/library/linecache.html) |
| `tempfile` | 临时文件和目录 | [tempfile](https://docs.python.org/zh-cn/3/library/tempfile.html) |
| `fileinput` | 从多个输入流中迭代行 | [fileinput](https://docs.python.org/zh-cn/3/library/fileinput.html) |

**数据持久化**

| 模块 | 作用 | 文档 |
|------|------|------|
| `pickle` | Python 对象序列化 | [pickle](https://docs.python.org/zh-cn/3/library/pickle.html) |
| `pickletools` | pickle 开发者工具 | [pickletools](https://docs.python.org/zh-cn/3/library/pickletools.html) |
| `shelve` | Python 对象持久化 | [shelve](https://docs.python.org/zh-cn/3/library/shelve.html) |
| `marshal` | 内部 Python 对象序列化 | [marshal](https://docs.python.org/zh-cn/3/library/marshal.html) |
| `dbm` | Unix 数据库接口 | [dbm](https://docs.python.org/zh-cn/3/library/dbm.html) |
| `sqlite3` | SQLite 数据库接口 | [sqlite3](https://docs.python.org/zh-cn/3/library/sqlite3.html) |
| `csv` | CSV 文件读写 | [csv](https://docs.python.org/zh-cn/3/library/csv.html) |
| `configparser` | 配置文件解析器 | [configparser](https://docs.python.org/zh-cn/3/library/configparser.html) |
| `netrc` | netrc 文件解析 | [netrc](https://docs.python.org/zh-cn/3/library/netrc.html) |

**压缩与归档**

| 模块 | 作用 | 文档 |
|------|------|------|
| `gzip` | gzip 文件读写 | [gzip](https://docs.python.org/zh-cn/3/library/gzip.html) |
| `bz2` | bzip2 压缩和解压 | [bz2](https://docs.python.org/zh-cn/3/library/bz2.html) |
| `lzma` | LZMA 压缩算法 | [lzma](https://docs.python.org/zh-cn/3/library/lzma.html) |
| `zipfile` | ZIP 归档处理 | [zipfile](https://docs.python.org/zh-cn/3/library/zipfile.html) |
| `tarfile` | tar 归档文件读写 | [tarfile](https://docs.python.org/zh-cn/3/library/tarfile.html) |
| `zipapp` | 可执行的 zip 文件管理 | [zipapp](https://docs.python.org/zh-cn/3/library/zipapp.html) |
| `zlib` | zlib 压缩库接口 | [zlib](https://docs.python.org/zh-cn/3/library/zlib.html) |

**编码与二进制数据处理**

| 模块 | 作用 | 文档 |
|------|------|------|
| `codecs` | 编解码器注册和相关基类 | [codecs](https://docs.python.org/zh-cn/3/library/codecs.html) |
| `base64` | Base16/32/64/85 编码 | [base64](https://docs.python.org/zh-cn/3/library/base64.html) |
| `binascii` | 二进制和 ASCII 互转 | [binascii](https://docs.python.org/zh-cn/3/library/binascii.html) |
| `struct` | 字节串解析为打包的二进制数据 | [struct](https://docs.python.org/zh-cn/3/library/struct.html) |
| `quopri` | MIME quoted-printable 编解码 | [quopri](https://docs.python.org/zh-cn/3/library/quopri.html) |
| `uu` | uuencode 编解码 | [uu](https://docs.python.org/zh-cn/3/library/uu.html) |
| `binhex` | Binhex 编码和解码 | [binhex](https://docs.python.org/zh-cn/3/library/binhex.html) |
| `xdrlib` | XDR 数据编码解码 | [xdrlib](https://docs.python.org/zh-cn/3/library/xdrlib.html) |

**网络与通信**

| 模块 | 作用 | 文档 |
|------|------|------|
| `socket` | 底层网络接口 | [socket](https://docs.python.org/zh-cn/3/library/socket.html) |
| `socketserver` | 网络服务器框架 | [socketserver](https://docs.python.org/zh-cn/3/library/socketserver.html) |
| `http` | HTTP 协议模块 | [http](https://docs.python.org/zh-cn/3/library/http.html) |
| `urllib` | URL 处理模块 | [urllib](https://docs.python.org/zh-cn/3/library/urllib.html) |
| `ftplib` | FTP 协议客户端 | [ftplib](https://docs.python.org/zh-cn/3/library/ftplib.html) |
| `poplib` | POP3 协议客户端 | [poplib](https://docs.python.org/zh-cn/3/library/poplib.html) |
| `imaplib` | IMAP4 协议客户端 | [imaplib](https://docs.python.org/zh-cn/3/library/imaplib.html) |
| `smtplib` | SMTP 协议客户端 | [smtplib](https://docs.python.org/zh-cn/3/library/smtplib.html) |
| `smtpd` | SMTP 服务器（已弃用） | [smtpd](https://docs.python.org/zh-cn/3/library/smtpd.html) |
| `email` | 电子邮件和 MIME 处理 | [email](https://docs.python.org/zh-cn/3/library/email.html) |
| `mailbox` | 各种邮箱格式操作 | [mailbox](https://docs.python.org/zh-cn/3/library/mailbox.html) |
| `mailcap` | mailcap 文件处理 | [mailcap](https://docs.python.org/zh-cn/3/library/mailcap.html) |
| `nntplib` | NNTP 协议客户端 | [nntplib](https://docs.python.org/zh-cn/3/library/nntplib.html) |
| `telnetlib` | Telnet 客户端（已弃用） | [telnetlib](https://docs.python.org/zh-cn/3/library/telnetlib.html) |
| `cgi` | CGI 支持（已弃用） | [cgi](https://docs.python.org/zh-cn/3/library/cgi.html) |
| `cgitb` | CGI 脚本回溯管理器（已弃用） | [cgitb](https://docs.python.org/zh-cn/3/library/cgitb.html) |
| `ssl` | TLS/SSL 包装器 | [ssl](https://docs.python.org/zh-cn/3/library/ssl.html) |
| `wsgiref` | WSGI 工具和参考实现 | [wsgiref](https://docs.python.org/zh-cn/3/library/wsgiref.html) |
| `uuid` | UUID 生成 | [uuid](https://docs.python.org/zh-cn/3/library/uuid.html) |

**Web 相关**

| 模块 | 作用 | 文档 |
|------|------|------|
| `html` | HTML 支持 | [html](https://docs.python.org/zh-cn/3/library/html.html) |
| `webbrowser` | Web 浏览器控制器 | [webbrowser](https://docs.python.org/zh-cn/3/library/webbrowser.html) |
| `json` | JSON 编码和解码 | [json](https://docs.python.org/zh-cn/3/library/json.html) |
| `xml` | XML 处理 | [xml](https://docs.python.org/zh-cn/3/library/xml.html) |
| `xmlrpc` | XML-RPC 服务器和客户端 | [xmlrpc](https://docs.python.org/zh-cn/3/library/xmlrpc.html) |

**多线程与并发**

| 模块 | 作用 | 文档 |
|------|------|------|
| `threading` | 线程并行 | [threading](https://docs.python.org/zh-cn/3/library/threading.html) |
| `multiprocessing` | 进程并行 | [multiprocessing](https://docs.python.org/zh-cn/3/library/multiprocessing.html) |
| `concurrent` | 并发执行包 | [concurrent](https://docs.python.org/zh-cn/3/library/concurrent.html) |
| `asyncio` | 异步 I/O | [asyncio](https://docs.python.org/zh-cn/3/library/asyncio.html) |
| `asyncore` | 异步套接字处理器（已弃用） | [asyncore](https://docs.python.org/zh-cn/3/library/asyncore.html) |
| `asynchat` | 异步套接字命令/响应处理器（已弃用） | [asynchat](https://docs.python.org/zh-cn/3/library/asynchat.html) |
| `queue` | 同步队列类 | [queue](https://docs.python.org/zh-cn/3/library/queue.html) |
| `select` | I/O 多路复用 | [select](https://docs.python.org/zh-cn/3/library/select.html) |
| `selectors` | 高级 I/O 多路复用 | [selectors](https://docs.python.org/zh-cn/3/library/selectors.html) |
| `subprocess` | 子进程管理 | [subprocess](https://docs.python.org/zh-cn/3/library/subprocess.html) |
| `signal` | 异步事件处理 | [signal](https://docs.python.org/zh-cn/3/library/signal.html) |
| `contextvars` | 上下文变量 | [contextvars](https://docs.python.org/zh-cn/3/library/contextvars.html) |

**运行时与解释器**

| 模块 | 作用 | 文档 |
|------|------|------|
| `sys` | 系统相关参数和函数 | [sys](https://docs.python.org/zh-cn/3/library/sys.html) |
| `sysconfig` | Python 配置信息 | [sysconfig](https://docs.python.org/zh-cn/3/library/sysconfig.html) |
| `builtins` | 内置对象 | [builtins](https://docs.python.org/zh-cn/3/library/builtins.html) |
| `gc` | 垃圾回收接口 | [gc](https://docs.python.org/zh-cn/3/library/gc.html) |
| `inspect` | 检查活动对象 | [inspect](https://docs.python.org/zh-cn/3/library/inspect.html) |
| `site` | 站点相关配置钩子 | [site](https://docs.python.org/zh-cn/3/library/site.html) |
| `atexit` | 退出处理器 | [atexit](https://docs.python.org/zh-cn/3/library/atexit.html) |
| `contextlib` | with 语句上下文工具 | [contextlib](https://docs.python.org/zh-cn/3/library/contextlib.html) |
| `faulthandler` | Python 回溯的故障转储 | [faulthandler](https://docs.python.org/zh-cn/3/library/faulthandler.html) |
| `tracemalloc` | 内存分配跟踪 | [tracemalloc](https://docs.python.org/zh-cn/3/library/tracemalloc.html) |
| `warnings` | 警告控制 | [warnings](https://docs.python.org/zh-cn/3/library/warnings.html) |
| `weakref` | 弱引用 | [weakref](https://docs.python.org/zh-cn/3/library/weakref.html) |

**导入系统**

| 模块 | 作用 | 文档 |
|------|------|------|
| `importlib` | import 实现 | [importlib](https://docs.python.org/zh-cn/3/library/importlib.html) |
| `imp` | import 内部访问（已弃用） | [imp](https://docs.python.org/zh-cn/3/library/imp.html) |
| `zipimport` | 从 Zip 归档导入模块 | [zipimport](https://docs.python.org/zh-cn/3/library/zipimport.html) |
| `pkgutil` | 包扩展工具 | [pkgutil](https://docs.python.org/zh-cn/3/library/pkgutil.html) |
| `modulefinder` | 查找脚本使用的模块 | [modulefinder](https://docs.python.org/zh-cn/3/library/modulefinder.html) |
| `runpy` | 定位和执行 Python 模块 | [runpy](https://docs.python.org/zh-cn/3/library/runpy.html) |
| `py_compile` | 编译 Python 源文件 | [py_compile](https://docs.python.org/zh-cn/3/library/py_compile.html) |
| `compileall` | 字节编译 Python 库 | [compileall](https://docs.python.org/zh-cn/3/library/compileall.html) |
| `lib2to3` | Python 2 到 3 自动转换 | [lib2to3](https://docs.python.org/zh-cn/3/library/lib2to3.html) |

**调试与开发**

| 模块 | 作用 | 文档 |
|------|------|------|
| `pdb` | Python 调试器 | [pdb](https://docs.python.org/zh-cn/3/library/pdb.html) |
| `bdb` | 调试器框架 | [bdb](https://docs.python.org/zh-cn/3/library/bdb.html) |
| `pstats` | 统计分析器 | [pstats](https://docs.python.org/zh-cn/3/library/pstats.html) |
| `cProfile` | C 实现的性能分析器 | [cProfile](https://docs.python.org/zh-cn/3/library/profile.html) |
| `profile` | Python 性能分析器 | [profile](https://docs.python.org/zh-cn/3/library/profile.html) |
| `trace` | 跟踪语句执行 | [trace](https://docs.python.org/zh-cn/3/library/trace.html) |
| `traceback` | 打印或提取堆栈回溯 | [traceback](https://docs.python.org/zh-cn/3/library/traceback.html) |
| `pydoc` | 文档生成和在线帮助系统 | [pydoc](https://docs.python.org/zh-cn/3/library/pydoc.html) |
| `doctest` | 测试交互式 Python 示例 | [doctest](https://docs.python.org/zh-cn/3/library/doctest.html) |
| `unittest` | 单元测试框架 | [unittest](https://docs.python.org/zh-cn/3/library/unittest.html) |
| `test` | Python 回归测试包 | [test](https://docs.python.org/zh-cn/3/library/test.html) |
| `dis` | Python 字节码反汇编器 | [dis](https://docs.python.org/zh-cn/3/library/dis.html) |
| `pickletools` | pickle 开发工具 | [pickletools](https://docs.python.org/zh-cn/3/library/pickletools.html) |
| `code` | 解释器基类 | [code](https://docs.python.org/zh-cn/3/library/code.html) |
| `codeop` | 编译 Python 代码 | [codeop](https://docs.python.org/zh-cn/3/library/codeop.html) |
| `opcode` | Python 字节码操作码 | [opcode](https://docs.python.org/zh-cn/3/library/opcode.html) |
| `symbol` | Python 解析树常量 | [symbol](https://docs.python.org/zh-cn/3/library/symbol.html) |
| `token` | Token 常量 | [token](https://docs.python.org/zh-cn/3/library/token.html) |
| `tokenize` | Python 源文件 Tokenizer | [tokenize](https://docs.python.org/zh-cn/3/library/tokenize.html) |
| `tabnanny` | 缩进检测 | [tabnanny](https://docs.python.org/zh-cn/3/library/tabnanny.html) |
| `pyclbr` | Python 类浏览器支持 | [pyclbr](https://docs.python.org/zh-cn/3/library/pyclbr.html) |
| `ast` | 抽象语法树 | [ast](https://docs.python.org/zh-cn/3/library/ast.html) |
| `symtable` | 编译器符号表访问 | [symtable](https://docs.python.org/zh-cn/3/library/symtable.html) |
| `parser` | 访问 Python 解析树（已移除） | [parser](https://docs.python.org/zh-cn/3/library/parser.html) |

**日志与输出**

| 模块 | 作用 | 文档 |
|------|------|------|
| `logging` | Python 日志工具 | [logging](https://docs.python.org/zh-cn/3/library/logging.html) |
| `pprint` | 数据漂亮打印 | [pprint](https://docs.python.org/zh-cn/3/library/pprint.html) |
| `reprlib` | 替代的 repr 实现 | [reprlib](https://docs.python.org/zh-cn/3/library/reprlib.html) |
| `colorsys` | 颜色系统间转换 | [colorsys](https://docs.python.org/zh-cn/3/library/colorsys.html) |

**国际化与本地化**

| 模块 | 作用 | 文档 |
|------|------|------|
| `gettext` | 多语言国际化服务 | [gettext](https://docs.python.org/zh-cn/3/library/gettext.html) |
| `locale` | 国际化服务 | [locale](https://docs.python.org/zh-cn/3/library/locale.html) |
| `codecs` | 编解码器注册 | [codecs](https://docs.python.org/zh-cn/3/library/codecs.html) |

**操作系统服务**

| 模块 | 作用 | 文档 |
|------|------|------|
| `platform` | 底层平台识别 | [platform](https://docs.python.org/zh-cn/3/library/platform.html) |
| `errno` | 标准 errno 系统符号 | [errno](https://docs.python.org/zh-cn/3/library/errno.html) |
| `pwd` | 密码数据库（Unix） | [pwd](https://docs.python.org/zh-cn/3/library/pwd.html) |
| `grp` | 组数据库（Unix） | [grp](https://docs.python.org/zh-cn/3/library/grp.html) |
| `spwd` | 影子密码数据库（Unix） | [spwd](https://docs.python.org/zh-cn/3/library/spwd.html) |
| `crypt` | 密码验证（Unix） | [crypt](https://docs.python.org/zh-cn/3/library/crypt.html) |
| `termios` | POSIX 终端控制 | [termios](https://docs.python.org/zh-cn/3/library/termios.html) |
| `tty` | 终端控制工具 | [tty](https://docs.python.org/zh-cn/3/library/tty.html) |
| `pty` | 伪终端工具 | [pty](https://docs.python.org/zh-cn/3/library/pty.html) |
| `fcntl` | 系统调用 fcntl 和 ioctl | [fcntl](https://docs.python.org/zh-cn/3/library/fcntl.html) |
| `resource` | 资源使用信息 | [resource](https://docs.python.org/zh-cn/3/library/resource.html) |
| `syslog` | Unix syslog 库例程 | [syslog](https://docs.python.org/zh-cn/3/library/syslog.html) |
| `posix` | 最常见的 POSIX 系统调用 | [posix](https://docs.python.org/zh-cn/3/library/posix.html) |
| `posixpath` | POSIX 路径名操作 | [posixpath](https://docs.python.org/zh-cn/3/library/posixpath.html) |
| `ntpath` | Windows 路径名操作 | [ntpath](https://docs.python.org/zh-cn/3/library/ntpath.html) |
| `nturl2path` | URL 转换为 Windows 路径 | [nturl2path](https://docs.python.org/zh-cn/3/library/nturl2path.html) |
| `genericpath` | 路径名操作的通用工具 | [genericpath](https://docs.python.org/zh-cn/3/library/genericpath.html) |
| `msvcrt` | Microsoft VC++ 运行时 | [msvcrt](https://docs.python.org/zh-cn/3/library/msvcrt.html) |
| `winreg` | Windows 注册表访问 | [winreg](https://docs.python.org/zh-cn/3/library/winreg.html) |
| `winsound` | Windows 声音播放接口 | [winsound](https://docs.python.org/zh-cn/3/library/winsound.html) |
| `msilib` | Microsoft Installer 文件 | [msilib](https://docs.python.org/zh-cn/3/library/msilib.html) |

**多媒体**

| 模块 | 作用 | 文档 |
|------|------|------|
| `wave` | WAV 文件读写 | [wave](https://docs.python.org/zh-cn/3/library/wave.html) |
| `aifc` | AIFF 和 AIFC 文件读写 | [aifc](https://docs.python.org/zh-cn/3/library/aifc.html) |
| `sunau` | Sun AU 文件读写 | [sunau](https://docs.python.org/zh-cn/3/library/sunau.html) |
| `chunk` | IFF chunked 数据格式 | [chunk](https://docs.python.org/zh-cn/3/library/chunk.html) |
| `audioop` | 原始音频数据处理 | [audioop](https://docs.python.org/zh-cn/3/library/audioop.html) |
| `sndhdr` | 声音文件类型检测 | [sndhdr](https://docs.python.org/zh-cn/3/library/sndhdr.html) |
| `imghdr` | 图像类型检测 | [imghdr](https://docs.python.org/zh-cn/3/library/imghdr.html) |
| `ossaudiodev` | OSS 音频设备访问 | [ossaudiodev](https://docs.python.org/zh-cn/3/library/ossaudiodev.html) |

**图形界面**

| 模块 | 作用 | 文档 |
|------|------|------|
| `tkinter` | Tcl/Tk Python 接口 | [tkinter](https://docs.python.org/zh-cn/3/library/tkinter.html) |
| `turtle` | 海龟绘图 | [turtle](https://docs.python.org/zh-cn/3/library/turtle.html) |
| `turtledemo` | 海龟绘图演示 | [turtledemo](https://docs.python.org/zh-cn/3/library/turtledemo.html) |

**杂项**

| 模块 | 作用 | 文档 |
|------|------|------|
| `argparse` | 命令行选项解析 | [argparse](https://docs.python.org/zh-cn/3/library/argparse.html) |
| `getopt` | C 风格命令行选项解析 | [getopt](https://docs.python.org/zh-cn/3/library/getopt.html) |
| `optparse` | 已弃用的命令行解析 | [optparse](https://docs.python.org/zh-cn/3/library/optparse.html) |
| `getpass` | 便携式密码输入 | [getpass](https://docs.python.org/zh-cn/3/library/getpass.html) |
| `shlex` | 简单词法分析 | [shlex](https://docs.python.org/zh-cn/3/library/shlex.html) |
| `cmd` | 面向行的命令解释器 | [cmd](https://docs.python.org/zh-cn/3/library/cmd.html) |
| `pipes` | shell 管道接口 | [pipes](https://docs.python.org/zh-cn/3/library/pipes.html) |
| `plistlib` | Apple plist 文件生成解析 | [plistlib](https://docs.python.org/zh-cn/3/library/plistlib.html) |
| `ipaddress` | IPv4/IPv6 操作 | [ipaddress](https://docs.python.org/zh-cn/3/library/ipaddress.html) |
| `mimetypes` | 文件名到 MIME 类型映射 | [mimetypes](https://docs.python.org/zh-cn/3/library/mimetypes.html) |
| `mailcap` | mailcap 文件处理 | [mailcap](https://docs.python.org/zh-cn/3/library/mailcap.html) |
| `antigravity` | 打开 xkcd 漫画网页 | [antigravity](https://docs.python.org/zh-cn/3/library/antigravity.html) |
| `this` | Python 之禅 | [this](https://docs.python.org/zh-cn/3/library/this.html) |
| `formatter` | 通用输出格式化（已弃用） | [formatter](https://docs.python.org/zh-cn/3/library/formatter.html) |
| `distutils` | 构建和安装 Python 模块（已弃用） | [distutils](https://docs.python.org/zh-cn/3/library/distutils.html) |
| `ensurepip` | 引导 pip 安装器 | [ensurepip](https://docs.python.org/zh-cn/3/library/ensurepip.html) |
| `venv` | 虚拟环境创建 | [venv](https://docs.python.org/zh-cn/3/library/venv.html) |
| `difflib` | 差异计算助手 | [difflib](https://docs.python.org/zh-cn/3/library/difflib.html) |
| `encodings` | 标准编码包 | [encodings](https://docs.python.org/zh-cn/3/library/encodings.html) |
| `copyreg` | 注册 pickle 支持函数 | [copyreg](https://docs.python.org/zh-cn/3/library/copyreg.html) |
| `keyword` | Python 关键字检查 | [keyword](https://docs.python.org/zh-cn/3/library/keyword.html) |
| `mmap` | 内存映射文件支持 | [mmap](https://docs.python.org/zh-cn/3/library/mmap.html) |
| `nis` | Sun NIS 接口（已弃用） | [nis](https://docs.python.org/zh-cn/3/library/nis.html) |
| `pydoc_data` | pydoc 数据包 | [pydoc_data](https://docs.python.org/zh-cn/3/library/pydoc_data.html) |
| `sre_compile` | 正则表达式编译器 | [sre_compile](https://docs.python.org/zh-cn/3/library/sre_compile.html) |
| `sre_constants` | 正则表达式常量 | [sre_constants](https://docs.python.org/zh-cn/3/library/sre_constants.html) |
| `sre_parse` | 正则表达式解析器 | [sre_parse](https://docs.python.org/zh-cn/3/library/sre_parse.html) |
| `xxsubtype` | C 类型子类化测试 | [xxsubtype](https://docs.python.org/zh-cn/3/library/xxsubtype.html) |

**黑名单模块**

以下模块在 Coze 等平台被限制使用（通常涉及系统级操作或安全敏感功能）：

| 模块 | 原因 |
|------|------|
| `curses` | Unix 终端控制 |
| `dbm` | 数据库文件操作 |
| `ensurepip` | pip 安装器 |
| `fcntl` | 系统调用 |
| `grp` | Unix 组数据库 |
| `idlelib` | IDLE 编辑器 |
| `lib2to3` | 代码转换工具 |
| `msvcrt` | Windows C 运行时 |
| `pwd` | Unix 密码数据库 |
| `resource` | 系统资源限制 |
| `syslog` | Unix 系统日志 |
| `termios` | POSIX 终端控制 |
| `tkinter` | GUI 库 |
| `turtle` | 图形绘制 |
| `turtledemo` | 演示程序 |
| `venv` | 虚拟环境 |
| `winreg` | Windows 注册表 |
| `winsound` | Windows 声音接口 |
| `multiprocessing` | 多进程 |
| `threading` | 多线程 |
| `socket` | 网络套接字 |
| `pty` | 伪终端 |
| `tty` | 终端控制 |
