# Windows

> 记录一些使用 Windows 碰到的问题

## 操作系统

### 硬链接、软链接、符号链接

🔗 硬链接使得一个一个文件有多个访问入口。当所有入口被删除时，文件才真正被删除。

👍：兼容性好、不受盘符影响
<br />


👎：不支持文件夹、只支持本地驱动器的相同分区

🔗 软链接（如 Junction）将对文件夹进行重定向。类似于环境变量，外部程序并不会知道自己在处理一个软链接。

👍：兼容性不错、支持文件夹和文件（Junction 支持文件夹）、支持跨分区
<br />


👎：不支持相对路径、受盘符影响、某些系统的核心文件夹不支持软链接

🔗 符号链接是软链接的升级版。

👍：支持任意路径，甚至是不存在的路径
<br />


👎：兼容性较差、需要管理员权限

#### 如何获得链接的真实地址？

```powershell
dir <parentPath> | format-table | findstr <childPath>
```

## 环境变量

#### <link type="h5" to="https://mgear-file.oss-cn-shanghai.aliyuncs.com/%E6%80%8E%E6%A0%B7%E6%89%8D%E8%83%BD%E7%9B%B4%E6%8E%A5%E8%BF%90%E8%A1%8C%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8FPath%E4%B8%AD%E7%9B%AE%E5%BD%95%E7%9A%84%E5%AD%90%E7%9B%AE%E5%BD%95%E4%B8%AD%E7%9A%84%E7%A8%8B%E5%BA%8F_CSDN%E7%A4%BE%E5%8C%BA.html" source="https://bbs.csdn.net/topics/390354388" />《怎样才能直接运行环境变量 Path 中目录的子目录中的程序》

怎么样在 cmd 中直接访问某文件夹及其子文件夹下所有程序呢？当然是把它们添加到环境变量里面啦~

文中有一段简单的 cmd 脚本用来递归查找文件夹下所有目录，这之后可以把这些目录添加的 Path 中，这样，目录下的程序就可以直接访问了。

**自动设置环境变量脚本**：我的需求和文章描述的不太一样。首先我在 OneDrive 里有一个 Code 的文件夹，装了诸如 Python2、Python3、NodeJS 等许许多多的依赖文件，
我想通过脚本一次性全部将他们加入 CodeBin 变量下。以下是我的代码，十分简陋，仅供参考思路。

![C:\Users\lionad\OneDrive\Code](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210917151711.png?type=win11)

首先，在“文档、WindowsPowerShell”目录下新建“Custom\Set-Env.ps1”脚本，写好设置环境变量的函数。

```powershell
param(
  $name = $(throw '全局变量键名必填'),
  $path = $(throw '路径必填'),
  # 是否覆盖源键值对
  $overwrite = $False
)

"name=$name"
"path=$path"
"overwrite=$overwrite"

# 获取所有子文件夹
$values = if (test-path $path) {
  Get-ChildItem $path | 
    Where-Object { $_.getType().name -ne 'FileInfo' } | 
    ForEach-Object { $_.FullName }
} else {
  $path
}

# 是否合并原有数据
$old = [environment]::GetEnvironmentVariable($name, 'Machine')
$val = If ($overwrite) { $values -join ';' } Else { $old + ($values -join ';') }

# 去除重复
$washed = ($val.split(';') | Sort-Object -unique) -join ';'

Write-Output ("[Set-Env] " + $washed)

# 设置环境变量
[environment]::SetEnvironmentVariable($name, $washed, 'Machine')
```

然后，修改“文档、WindowsPowerShell\Microsoft.PowerShell_profile.ps1”文件。这个文件会在打开 PowerShell 时自动执行，我把它理解为用户的全局配置。

```powershell
# 执行脚本并等待结果
function Execution ($scripts = @()) {
  $jobs = @()
  foreach ($script in $scripts) {
    $jobs += Start-Job -FilePath $script.path -ArgumentList $script.args
  }
  Wait-Job $jobs
  foreach ($job in $jobs) {
    " "
    "*" * 60
    " "
    "Receive Job Script output:"
    Receive-Job $job
  }
}

# 设置环境变量
function Set-Env (
  [String]$name = $(throw "Args Error, env keyname should be an String"),
  [String]$value= $(throw "Args Error, path should be an String"),
  [Boolean]$overwrite = $False
) {
  $customdir = Join-Path -Path $profiledir -ChildPath 'Custom/'
  $script = @{
    path = (Join-Path -Path $customdir -ChildPath 'Set-Env.ps1');
    args = @($name,$value,$overwrite)
  }
  Execution($script)
}
```

这之后，保存并重启 PowerShell，就可以愉快的调用 set-env 函数了。

测试一下我们的脚本能不能跑通。

```js
set-env "test" "C:\\Users\\18062\\OneDrive\\WebSaver"
```

脚本返回了内容，再查看一下环境变量，也没啥问题~

![test](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210917152840.png?type=win11-square)

**防止单个环境变量过于臃肿**：我没记错的话，单个环境变量的值长度是有限的，很容易就超过了。所以一半不会直接把一段常常的文本记录到 Path 变量下，而是在 Path 下再引用一个新的环境变量。

我在 Path 变量下引用了 CodeBin 变量：

![Path](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210917150802.png?type=win11)

在 CodeBin 变量里面塞满其它路径，不至于撑爆 Path 变量：

![CodeBin](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20210917150717.png?type=win11)
