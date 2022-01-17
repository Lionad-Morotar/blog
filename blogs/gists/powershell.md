# Powershell

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