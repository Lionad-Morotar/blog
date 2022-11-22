# PowerShell

[TOC]

##### <Link type="h5" to="https://mgear-file.oss-cn-shanghai.aliyuncs.com/%E5%9C%A8cmd%E4%B8%AD%E7%9B%B4%E6%8E%A5%E8%BF%90%E8%A1%8CPowerShell%E8%84%9A%E6%9C%AC%E6%96%87%E4%BB%B6%E7%9A%84%E6%96%B9%E6%B3%95_PowerShell_%E8%84%9A%E6%9C%AC%E4%B9%8B%E5%AE%B6.html" source="http://www.zzvips.com/article/80048.html" >《在cmd中直接运行PowerShell脚本文件的方法》</Link>

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

##### [终端、Shell、tty 和控制台（console）有什么区别？](https://www.zhihu.com/question/21711307)

控制台直接和主机相连，终端可以接线远程连接，Shell 则是软件界面。而 tty 是打字机这种具体类型的终端，在带视频界面的终端之前很流行。

## 常见问题

#### 如何确定一个硬链、软链或符号链接的真实地址？

```powershell
cmd /c dir \/a .
```
