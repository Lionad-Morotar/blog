---
title: C++
description: C++ 是一种静态类型、编译式、通用、多范式编程语言，支持过程化编程、面向对象编程和泛型编程。
---

## Standard

* [Google C++ Standard](/maps/_cpp/google-cpp-standard)

## Code

* [KingDB](/maps/_cpp/king-db)

## Tool Chain

* [Makefile](/maps/_cpp/makefile)

## FAQ

#### [C++ 使用字符串一定要 #include \<string\> 吗](https://www.zhihu.com/question/270726509)

```cpp
#include <iostream>
// #include <string>
```

如果引入 iostream，会间接引用 string 头文件，所以就算注释掉第二行，程序也能正常编译运行。如果去掉注释，由于 C++ 头文件使用了 #ifnfef #define #endif 所以不会二次引入，程序同样能正常编译运行。

#### [为什么尽量不要使用 using namespace std](https://www.zhihu.com/question/26911239)

如果是在源码里面用则无所谓，但是如果放到了头文件里，被其它代码引入了，那很容易带来困惑。如果想在头文件里用，最好用自己的命名空间包一层，同时做最小暴露，如使用 vector 那就 using std::vector。

#### PInvoke 是什么？

PInvoke 既 Platform Invocation Services 平台调用服务，允许你使用 C# 之类的语言调用外部函数。比如，许多硬件中，其驱动是用 C/C++ 写的，而用 C# 在外面再套一层壳子来管理界面（WPF/Winform）。这时，可以使用 PInvoke 方法让 C# 去调用动态链接库中的函数。

#### <Link type="h5" to="https://mgear-file.oss-cn-shanghai.aliyuncs.com/%E6%89%8B%E6%8A%8A%E6%89%8B%E6%95%99%E4%BD%A0PInvoke_%E9%BB%84%E8%85%BE%E9%9C%84%E7%9A%84%E5%8D%9A%E5%AE%A2_CSDN%E5%8D%9A%E5%AE%A2.html" source="https://blog.csdn.net/htxhtx123/article/details/104323450" >《手把手教你 PInvoke》</Link>

可以在 C# 中使用 DLLImport 标记链接库并引入其中函数。

```csharp
public class Win32
{
    [DllImport("user32.dll")]
    public static extern IntPtr MessageBox(
      int hWnd,
      String text,
      String caption,
      uint type
    );
}
class Program
{
    static void Main(string[] args)
    {
        Win32.MessageBox(0, "Hello, World", "Hi~", 0);
        Console.ReadLine();
    }
}
```

如果不知道有什么方法可以用、方法对应哪个动态链接库以及参数是啥，都可以上官方文档中找，里面有函数作用及签名等详细的说明。也可以到 pinvoke.net 找到已经汇总好的代码。

* [Programming reference for the Win32 API](https://docs.microsoft.com/en-us/windows/win32/api/)
* [PInvoke.net](http://pinvoke.net/index.aspx)

#### <Link type="h5" to="https://mgear-file.oss-cn-shanghai.aliyuncs.com/%E4%BD%BF%E7%94%A8PInvoke%E4%BA%92%E6%93%8D%E4%BD%9C%EF%BC%8C%E8%AE%A9C%23%E5%92%8CC_%E6%84%89%E5%BF%AB%E7%9A%84%E4%BA%A4%E4%BA%92%E4%BC%98%E5%8A%BF%E4%BA%92%E8%A1%A5_%E6%85%95%E8%AF%BE%E6%89%8B%E8%AE%B0.html" source="https://www.imooc.com/article/305247" >《使用 PInvoke 互操作，让 C#和 C++愉快的交互优势互补》</Link>

介绍了如何使用 Visual Studio 创建一个 C++ 动态链接库并在 C# 中调用。

要了解托管代码和非托管代码的函数签名的类型转换，可以查阅官方文档。

* [类型封送](https://docs.microsoft.com/zh-cn/dotnet/standard/native-interop/type-marshaling)

如果碰到复杂类型，可以使用 PInvoke Interop Assistant 工具自动转换代码。

* [PInvoke Interop Assistant](https://github.com/jaredpar/pinvoke-interop-assistant)

此外，在 C++ 中，可以通过函数指针直接接受来自 C# 的委托函数，十分令人愉快。