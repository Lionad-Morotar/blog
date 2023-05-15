# Linter

[TOC]

## ESLint

TODO

https://github.com/sudongyuer/learn-eslint

#### Prettier 和 ESLint 的区别是？

Prettier 是代码格式化工具，而 ESLint 则是 JS/TS 等代码的校验工具，只不过也有格式化这个功能。通过安装 ESLint 插件，可以使项目中的 ESLint 兼容 Prettier 的规则。再配置好 husky，就可以很方便的给暂存区代码进行格式化校验了。

## Prettier

* 在线格式化工具：[Prettier Online](https://prettier.io/playground/#N4Igxg9gdgLgprEAuc0DOMAEBXNcBOamAvJgNoA6UmmwOe+AkgCZKYCMANPQVAIYBbOGwogAggBsAZgEs4mAMJ98QiTJh9RmAL6cqNOrgIs2AJm5H8-ISJABxGf0wAlCGgAWfKFt37aPJlZMAGYLBmthTFEAZXdsAHNMADk+ACNsHz1qf0sTTAAWMN5BSNFnPncBL0wAMXw+Bky-QwY8gFYiqxLbABU3d3kAGQBPbFSEJuyW4yCANk6I22iCeJkIZJkJCCllSYBdAG4qEE4QCAAHGDWoNGRQZXwIAHcABWUEW5Q+CSe+YdvTql6mAANZwGDREqDRxwZAwfDYOCA4FgiHnPhgRzxOEIpEgOACcbMZhwZiDLzxbB8eJwGoQFR8GBXKDYr7YGAQE4gdwwAQSADq7nUcDQ6LAcGWN3UMgAbuphsgQBh8DIwDAuY4GDAXvV4lVkDsJHhTgArNAAD2iWIkcAAitgIPADd9jSB0YQCIrUmk4BIuecVbB+TJmDB3Mh8qE3Y88Pz6udFQGRQQZbDTgBHB3wHUXT4gBoAWigcFJpK5+DgmZkFZ11P1SENrrwAhkzqNeLQ1rgYiZKvS2YI0OLOMRp07LJt9sdsKQ8NHIA0qWDofDSHMC-qmyxCggAnr+LQbS5Rh6aU+jbxMsRjCgJNg0TAKsuYlv0Rgwxtbbw2m0QA)

#### 为什么 antfu 不使用 Prettier ？

Prettier 的自动换行策略使代码 diff 变得难以阅读，并且没有选项可以用来关闭 print-width 配置的换行策略。尽管可以通过 ESLint 来纠正 Prettier 的行为，但是这更加麻烦，且降低了性能。所以 antfu 的策略是使用自己配置的整套 ESLint 规则包。

见：[为什么我不使用 Prettier | antfu](https://antfu.me/posts/why-not-prettier-zh)
