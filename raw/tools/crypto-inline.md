# 👓 Crapto

> 一款可以给代码中部分内容加密的 VSCode 插件

## 简介

[Crapto](https://github.com/Lionad-Morotar/crapto)，曾名为 file-text-crypto，以下简称 FTC，是一款可以给你的代码中部分内容或全文加密的插件。

假设你想在开源的博客系统写了一些带有隐私的内容，FTC 允许你在本地编辑时查看加密内容，而项目上传时隐私仍然保持加密。

比如，这是一段隐私内容：*U2FsdGVkX1+9tlp8UGxEcYpzalYpSLLh//b3GjwE4s0=*，只有当我使用 VSCode 本地编辑时才能看到其内容。

**FTC 会把文件的密钥存在本地目录，所以请务必把密钥文件所在的文件夹（默认为 .ftc）加入 .gitignore（密钥默认储存在 .ftc 文件夹）防止 Git 系统把密钥传到了远端。**

- 目前仅支持加密 markdown 文件中的特定标识文本。
- Issues and Pull Request are Welcome！

## 快捷键

- `alt+f,i`，输入一段文本，并将其加密
- `alt+f,d`，选中一段加密文本，将其解密，并在右下角弹窗显示原文

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

<style>

html .light .shiki span {color: var(--shiki-light);background: var(--shiki-light-bg);font-style: var(--shiki-light-font-style);font-weight: var(--shiki-light-font-weight);text-decoration: var(--shiki-light-text-decoration);}html.light .shiki span {color: var(--shiki-light);background: var(--shiki-light-bg);font-style: var(--shiki-light-font-style);font-weight: var(--shiki-light-font-weight);text-decoration: var(--shiki-light-text-decoration);}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .dark .shiki span {color: var(--shiki-dark);background: var(--shiki-dark-bg);font-style: var(--shiki-dark-font-style);font-weight: var(--shiki-dark-font-weight);text-decoration: var(--shiki-dark-text-decoration);}html.dark .shiki span {color: var(--shiki-dark);background: var(--shiki-dark-bg);font-style: var(--shiki-dark-font-style);font-weight: var(--shiki-dark-font-weight);text-decoration: var(--shiki-dark-text-decoration);}

</style>

---

- [crapto](https://github.com/Lionad-Morotar/crapto)
