# mklink

##### 在 PS 中调用 mklink

在 cmd.exe 中可以直接调用 mklink.exe，但在某些情况下你想和 cmd 撇清关系，一种取巧的办法是在 powershell 中先调用 cmd.exe。

```powershell
cmd /c mklink
```

cmd /c 和 cmd /k 的区别在于 Close 和 Keep，前者执行完后会退出 cmd 窗口而后者不会，所以在这里 /c 和 /k 看你的具体需要使用了。