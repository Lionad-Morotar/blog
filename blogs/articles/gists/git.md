# Git

## 场景

#### 忽略特定提交

三种方法：

1. gitignore
  
设置好 `.gitignore` 文件后，所有匹配的文件都不会被继续追踪（已经追踪的不会被影响，除非先把它删掉）。

2. update-index

```js
git update-index --skip-worktree -- filename.js
```

3. git filter
