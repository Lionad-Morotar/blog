---
title: 命令行
description: 命令行工具使用指南，包含 PowerShell 常用命令及文件操作示例。
---

## 兼容性

如果碰到 Bash 和 PowerShell 中不兼容的语法部分，可以参考 [《Bash 与 PowerShell 命令对照表》](https://www.pstips.net/bash-and-powershell-quick-reference.html)

#### [终端、Shell、tty 和控制台（console）有什么区别？](https://www.zhihu.com/question/21711307)

控制台直接和主机相连，终端可以接线远程连接，Shell 则是软件界面。而 tty 是打字机这种具体类型的终端，在带视频界面的终端之前很流行。

## 语法手册

比较判定：

* -eq # equal
* -ne # not equal
* -gt # greater than
* -ge # greater or equal
* -lt # little than
* -le # little or equal
* -contains
* -notcontains

逻辑判定：

* -and
* -or
* -xor
* -not

#### 使用 ftype 设置文件的默认打开方式

```bash
# 查看所有
ftype

# 设置
ftype x="path" "%1"

# 查询单个
ftype x

# 删除单个
ftype x=
```

#### <Link type="h5" to="https://mgear-file.oss-cn-shanghai.aliyuncs.com/%E6%89%8B%E6%8A%8A%E6%89%8B%E6%95%99%E4%BD%A0PInvoke_%E9%BB%84%E8%85%BE%E9%9C%84%E7%9A%84%E5%8D%9A%E5%AE%A2_CSDN%E5%8D%9A%E5%AE%A2.html" source="https://blog.csdn.net/htxhtx123/article/details/104323450" ><i>Creating a Symbolic Link using PowerShell</i></Link>

在 cmd.exe 中可以直接调用 mklink.exe，但在某些情况下你想和 cmd 撇清关系，一种取巧的办法是在 powershell 中先调用 cmd.exe。

```powershell
cmd /c mklink
```

cmd /c 和 cmd /k 的区别在于 Close 和 Keep，前者执行完后会退出 cmd 窗口而后者不会，所以在这里 /c 和 /k 看你的具体需要使用了。

除了 cmd，你还可以使用 PInvoke 技术。

* 在 C# 函数调用 Win32 API 中的 CreateSymbolicLink 函数；
* 在 powershell 中使用 Add-Type 声明这段 C# 代码；
* 调用（就是这么简单）；

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

## CMD

### 初始化

CMD 在启动时会调用注册表中 AutoRun 项对应的脚本文件，你可以修改此项的值，该为自己编写的脚本所在的地址，就能在启动 CMD 时自动执行代码。

Windows 的注册表可以使用 `.reg` 后缀的文件去修改，见下代码，使用时，先将代码保存为 `.reg` 文件，然后直接运行就好。

```shell
Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\Software\Microsoft\Command Processor]
"AutoRun"="%OneDrive%\\@Run\\@cmd\\@store\\autorun.cmd"
```

需要注意的问题是，`.reg` 文件的语法比较严格，路径的分隔符不能是单反斜线。

#### 如何确定一个硬链、软链或符号链接的真实地址？

```powershell
cmd /c dir \/a .
```

#### <Link type="h5" to="https://mgear-file.oss-cn-shanghai.aliyuncs.com/%E5%9C%A8cmd%E4%B8%AD%E7%9B%B4%E6%8E%A5%E8%BF%90%E8%A1%8CPowerShell%E8%84%9A%E6%9C%AC%E6%96%87%E4%BB%B6%E7%9A%84%E6%96%B9%E6%B3%95_PowerShell_%E8%84%9A%E6%9C%AC%E4%B9%8B%E5%AE%B6.html" source="http://www.zzvips.com/article/80048.html" >《在 cmd 中直接运行 PowerShell 脚本文件的方法》</Link>

第一种方法是直接使用 cmd 调用 PowerShell.exe。

```powershell
powershell.exe -file task.ps1
```

第二种方法是在 cmd 中直接调用 ps 文件，前提是 ps 脚本文件的默认打开程序已经是 PowerShell.exe 了。

```powershell
task.ps1
```

如果还没设置 ps 脚本的默认打开方式，可以使用 ftype 指令。

```bash
ftype Microsoft.Powershellscript.1="%SystemRoot%\system32\windowspowershell\v1.0\powershell.exe" "%1"
```

## PowerShell

### 初始化

PowerShell 启动时，会加载当前用户的 Profile 文件，一般地址在 `Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1`，如果没有可以自己创建一个，然后重新打开 PowerShell 窗口就会自动加载了。

启动脚本中可以放一些个性化的东西，比如说引入模块、设置函数或 Alias 等。参考我的部分公共函数：

```powershell
# 配合 Set-Alias 快速返回上级目录
function GoBack { Set-Location .. }
Set-Alias .. GoBack

# 快速查看电脑外网 IP
function MyIP { Start-Process -FilePath www.tool.lu/ip }

# 设置快捷方式的函数（默认使用软连接）
function MKLink ($link, $target) { New-Item -Path $link -ItemType SymbolicLink -Value $target }

# 更清晰的 git log
function GitLog  { git log --graph --pretty='%Cred%h%Creset -%C(auto)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --all }

# 使用记事本修改 profile 文件
function EditProfile {
    $path = $env:onedrive + '\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1' 
    notepad $path
}
```

### 增删改查

递归删除文件夹中非 index.html 文件

```bash
Remove-Item ./* -Recurse -Exclude index.html
```
