# Makefile

[TOC]

之前看 ElementUI 的时候有了解一点 Makefile 的语法，现在正在看 C++，恰好是更细致学习一下的好机会。

## 概述

Make（GNU Make）是一个自动化工具，它的特色在于有基本逻辑能力，可以跟踪特定文件。这样一来，诸如按需编译这种任务就可以高效完成。

它最主要的语法结构如下代码所示。

```makefile
target: dependencies
        commands
```

这意味着：构建目标（target） = 依赖（dependencies） + 执行命令（commands）。

就语法来说，依赖可以不存在，这就表示某个目标意味着直接执行对应的指令。这有点像是定义了一个命令名，或者是一个快捷入口之类的。比如，你可以定义一个 help 目标，以便执行 make help 时，在控制台输出一串帮助文本。

执行时，直接使用 make &lt;target&gt; 就可以了。如果构建目标的修改日期比依赖更新的话，显而易见就不需要再执行对应的指令；如果依赖不存在，那么会自动回溯执行依赖作为目标时的指令，如此一层一层递归下去，直到所有的 target 及 dependencies 的关系被确认。

由于 Make 不会像解析编程语言一样去细致解析 Makefile，所以其语法能力还是稍弱。不会鉴于其隐含的终极目标只是说明各个文件的依赖关系时顺带执行指令，所以也就可以理解为什么 Makefile 中变量只是类似 C 语言中宏一样的字符串替换了。

```makefile
# define my variable
var = strings
target: $(var)
```

Make 和 C/C++ 确实是一对儿。Make 在识别 .o 文件时，能自动把 .c 添加为依赖关系。这功能叫做自动推导（或隐私推导）。除了隐私推导，他还支持类似 C 的 Include，把别的 Makefile 整个包含进来。

```makefile
include foo.make a.mk b.mk
```

可以发现，Make 和字符串要打非常多交道，所以它支持各种通配符也就不令人意外了。如同 SHELL 中的通配符，* 和 ⁓ 分别代表任意长度字符串和用户主目录。不知道你用过正则没有，通配符就用作匹配及确认，再返回 true 或 false。这时候有人要问了，既然 Makefile 和字符串打交道，通配符返回布尔有啥用啊，它没办法表示列表哇！

这就要说到 Makefile 的关键字了，wildcard，它是扩展关键字，可以把通配符匹配到的所有东西“扩展”为“列表”。列表当然是想象中的列表，其实际产物还是字符串的啦。不过为了更方便操作列表，还有辅助用的其它关键字，比如 patsubst，它是类似正则中的 replaceAll 那种效果。

下面用一个例子来说明吧，把目录下所有 C 文件找出来，替换为 .o 后缀，这样一来，就可以用 gcc 全部编译了。

```makefile
cfiles := $(wildcard *.c)
ofiles := $(patsubst %.c, %.o, %(cfiles))
compile: $(ofiles)
         gcc -o $(ofiles)
```

[TODO continue](https://seisman.github.io/how-to-write-makefile/rules.html#id5)

## 相关

- [跟我一起写 Makefile](https://github.com/seisman/how-to-write-makefile)，陈皓老师在 2004 年写的博客。非常易读，适合入门学习。
- [Makefile 中的 wildcard 用法](https://blog.csdn.net/qq_31811537/article/details/82892128)
- [如何调试 MAKEFILE 变量](https://coolshell.cn/articles/3790.html)