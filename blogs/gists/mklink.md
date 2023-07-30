# mklink

[TOC]

##### <Link type="h5" to="https://mgear-file.oss-cn-shanghai.aliyuncs.com/%E6%89%8B%E6%8A%8A%E6%89%8B%E6%95%99%E4%BD%A0PInvoke_%E9%BB%84%E8%85%BE%E9%9C%84%E7%9A%84%E5%8D%9A%E5%AE%A2_CSDN%E5%8D%9A%E5%AE%A2.html" source="https://blog.csdn.net/htxhtx123/article/details/104323450" ><i>Creating a Symbolic Link using PowerShell</i></Link>

在 cmd.exe 中可以直接调用 mklink.exe，但在某些情况下你想和 cmd 撇清关系，一种取巧的办法是在 powershell 中先调用 cmd.exe。

```powershell
cmd /c mklink
```

cmd /c 和 cmd /k 的区别在于 Close 和 Keep，前者执行完后会退出 cmd 窗口而后者不会，所以在这里 /c 和 /k 看你的具体需要使用了。

除了 cmd，你还可以使用 PInvoke 技术。

* 在 C# 函数调用 Win32 API 中的 CreateSymbolicLink 函数；
* 在 powershell 中使用 Add-Type 声明这段 C# 代码；
* 调用，就是这么简单；

```powershell
Add-Type @"
using System;
using System.Runtime.InteropServices;
 
namespace mklink
{
    public class symlink
    {
        [DllImport("kernel32.dll")]
        public static extern bool CreateSymbolicLink(string lpSymlinkFileName, string lpTargetFileName, int dwFlags);
    }
}
"@

[mklink.symlink]::CreateSymbolicLink('source-path', "target path", 1)
```

文章还封装了一个完整的 New-SymLink 函数，校验并清洗了参数，更方便调用了。

```powershell
New-SymLink -Path "C:\Users" -SymName "C:\Another" -Directory -Verbose
```