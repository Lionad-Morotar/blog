# Gitflow

## 从 PR 开始说起

PR（Pull Request）是一种使用 Gitlab 或其它版本管理系统附带的一种工作流程。

最直观的感受是，PR 可以作为一种告知团队其它成员当前分支功能已经完成的提醒。除了消息通知，每个 PR 还附带有代码变更内容和讨论区，团队成员可以通过 PR 进行 Code Review，讨论方案，或者评论某行代码。可以使开发人员很方便地从邮件或者即时通讯软件中解脱出来。

![](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/www.atlassian.com_git_tutorials_making-a-pull-request.png)

当然，PR 不是任何工作流的替代品，而是可以用来适配 Feature Branch Workflow、Gitflow Workflow 或是 Forking Workflow，使协作更方便的的一个功能。带有 PR 的典型工作流程如下：

* 开发在本地仓库新建一个功能分支
* 开发提交变更并且推送到了远端仓库
* 开发请求 PR
* 团队成员评审代码、讨论或修改它
* 远端仓库管理员将提交变更合并，并关闭 PR

## 不同的工作流

工作流并不是完全“独立”的，工作流更像是“指南”而不是手册，所以在实行工作流时需要灵活根据项目情况采用或弃用部分选项。采用其种工作流前，你可以先问自己以下几个问题：

* 工作流是否可以随着团队人数变更而扩展？
* 工作流是否容错，或是可以避免犯错？
* 工作流是否带来了不必要的认知负担？

如果你是从其他版本管理工具过渡到 Git，那么 Centralized Workflow 是学习成本最小的方案。在 Centrialized Workflow 中，团队成员是需围绕 main 分支开发：拉取最新代码、开发，然后提交，就这么简单。因为没有额外的分支，所以 main 分支的历史记录开起来像是一条干净的线，这种感觉就像是传统的 SVN 工作流一样。

Feature Branch Workflow 是在 Centraolized Workflow 之上的扩展。开发在单独的 feature 分支开发新功能，然后通过 PR 请求将变更提交到 main 分支。在需要其他人帮助时，也可以提前请求 PR，告知团队成员正在进行的功能在哪一个分支，邀请他们代码审阅或是提交修复。这种流程隐含的约定是：main 分支上的代码一定是可用的（至少测试通过，能跑），这对持续集成环境来说是一个巨大的优势。

Gitflow Workflow 最早在 Vincent Driessen 2010 年写的一篇博客中被提出。作为 Feature Branch Workflow 的补充，它没有带来任何新的概念，仅仅是规范分支的行为。不同分支都有不同的作用，比方说 release 分支用来测试，main 分支用来发布，hotfix-* 分支用来提交热修复；它还规定了分支与分支应该如何合并，这里就要提到那张著名的 Gitflow 图。

Forking Workflow：开发使用单独的仓库来开发一个完整的功能，一旦功能开发完毕，再通过 PR 合并回主仓库 main 分支。开发没有主仓库的写入权限，Code Review 也不用在主仓库进行，因为主仓库管理员并不关心代码的具体实现。

总之，没有一种工作流程是能解决所有问题而没有显著副作用的，你应该根据团队规模、业务流程（如需求大小、需求频次）选用更适合团队的工作流。  

## 关于 Gitflow 的坏处

> We firmly belive that long-lived version-control branches harm valuable engineering practieces such as CI, and this belief underlies our dislike for Gitflow.（Thoughtworks）

Thoughtworks 认为短生命周期的分支策略给实施 CI/CD 带来更小的伤害，反之类似 Gitflow 中经常用到的长生命周期分治策略反而是在鼓励后期集成（late integration）。

## 相关资源

* [A successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model/)
* [Github flow](https://guides.github.com/introduction/flow/)
* [Gitflow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
* [Trunk Based Development](https://trunkbaseddevelopment.com/)
* [Patterns for Managing Source Code Branches](https://martinfowler.com/articles/branching-patterns.html)
* [Gitflow long-lived-branch on Tech Radar](https://www.thoughtworks.com/cn/radar/techniques/long-lived-branches-with-gitflow)