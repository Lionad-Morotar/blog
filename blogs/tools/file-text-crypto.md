# file-text-crypto

[TOC]

## 简介

file-text-crypto，以下简称 FTC，是一款可以给你的代码中部分内容或全文加密的插件。想象你有这么一个情景：在你的开源博客系统中，你写了一些带有隐式的日记，使用 FTC 可以让你在本地编辑时自由编辑，而编辑时生成的文本内容是加密后的信息，这样一来，就算上传到 GitHub 后，别人也无法查看到你的隐私原文。

**FTC 会把文件的密钥存在本地目录，所以请务必把密钥文件所在的文件夹加入 .gitignore（密钥默认储存在 .ftc 文件夹）防止 Git 系统把密钥传到了远端。**

由于我的业余时间有限，所以目前仅支持加密 markdown 文件中的特定标识文本。如果你有其它更好的想法，欢迎 Pin Issues 或者 Pull Request ！

## 原理

FTC 根据文件的特定注释内容来判断该文件是否开启了加密，比方说，你可以使用指令 ftc.gists-on 在文件头部快速加入这段特定注释（当然，手动也完全可以）。

```markdown
<!-- FTC:on -->
```

FTC 在文件中开启之后，FTC 会寻找在 FTC:on 以下一直到 FTC:off 的文本内容中特定的标识，并将其进行加密。比如以下文本 `_*_secrets_*_` 中的 `_*_` 就是加密标识，`secrets` 则是加密内容。

```markdown
Normal text...
<!-- FTC:on -->
Normal text，_*_secrets_*_，Normal text
<!-- FTC:off -->
Normal text...
```

<!-- 加密标识总是开头结尾对应的。如果你想加密整个文件，你可以使用指令 ftc.crypto-entire-file 快速加入以下注释：

```markdown
<!-- FTC:entire -->
