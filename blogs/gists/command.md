# Command

[TOC]

正在学习如何使用 PowerShell 写脚本。

如果碰到 Bash 和 PowerShell 中不兼容的语法部分，可以参考[《Bash 与 PowerShell 命令对照表》](https://www.pstips.net/bash-and-powershell-quick-reference.html)

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
