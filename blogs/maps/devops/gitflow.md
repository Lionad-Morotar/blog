# Gitflow

[TOC]

## 工作流

#### Gitflow 是什么？

Gitflow 是一种使用 Git 合作时使用的工作流程。与之类似的概念有 Centralized Workflow、Feature Branch Workflow、Forking Workflow 等。

#### 选用工作流前需要注意什么？

工作流应该是“指南”，而不是手册，没有一种工作流程是能解决所有问题而没有显著副作用的，所以应该根据团队规模、业务流程（如需求大小、需求频次）选用更适合团队的工作流。  

* 工作流能否**容错**，或是可以避免犯错？
* 工作流能否可以随着团队人数变更而**扩展**？
* 工作流能否带来了不必要的**认知负担**？

见：[常见的代码分支模型和比较](http://fresky.github.io/2020/03/10/common-branching-models/)

#### Centralized Workflow 是怎么运作的？

如果其他版本管理工具过渡到 Git，那么 Centralized Workflow 是学习成本最小的方案。在此工作流中，团队成员围绕 main 分支开发：拉取代码、开发，然后提交，就这么简单。因为没有额外的分支，所以 main 分支的历史记录开起来像是一条干净的线，这种感觉就像是传统的 SVN 工作流一样。

见：[Trunk Based Development](https://trunkbaseddevelopment.com/)

#### Feature Branch Workflow 是怎么运作的？

Feature Branch Workflow 是在 Centraolized Workflow 之上的扩展。开发人员在单独的 feature 分支开发新功能，然后通过 PR 请求提交回 main 分支。在需要帮助时，可以提前请求 PR，邀请他们代码审阅或是提交修复。这种流程隐含的约定是：main 分支上的代码一定是可用的（至少测试通过，能跑），这种小步快跑的模式对持续集成环境来说是一个巨大的优势。

#### PR 是什么？

Pull Request（PR）是一种使用 GitLab 或其它版本管理系统附带的一种工作流程。PR 可以作为一种告知团队其它成员当前分支功能已经完成的提醒。每个 PR 还附带有代码变更内容和讨论区，团队成员可以通过 PR 进行 Code Review，讨论方案，或者评论代码。使开发人员从邮件或者即时通讯软件中解脱出来。

见：[GitHub flow](https://guides.github.com/introduction/flow/)

#### Forking Workflow 是怎么运作的？

在 Forking Workflow 流程中，开发使用单独的仓库来开发一个完整的功能，一旦功能开发完毕，再通过 PR 合并回主仓库 main 分支。因为主仓库管理员并不关心代码的具体实现，所以开发没有主仓库的写入权限，Code Review 也不用在主仓库进行。

#### Gitflow Workflow 是怎么运作的？

Gitflow Workflow 最早在 Vincent Driessen 2010 年写的一篇博客中被提出。作为 Feature Branch Workflow 的补充，它仅仅是规范各分支的行为。不同分支有不同的作用，比方说 release 分支用来测试，main 分支用来发布，hotfix 分支用来提交热修复，等等。Gitflow 还规定了分支与分支应该如何合并。

![Gitflow](https://mgear-image.oss-cn-shanghai.aliyuncs.com/image/other/20220627173845.png?w=40)

见：[Gitflow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)、[A successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model/)

## 评价

#### Gitflow 的负面影响？

Thoughtworks 认为短生命周期的分支策略给实施 CI/CD 带来更小的伤害，反之类似 Gitflow 中经常用到的长生命周期分治策略反而是在鼓励后期集成（late integration）。

<q>We firmly belive that long-lived version-control branches harm valuable engineering practieces such as CI, and this belief underlies our dislike for Gitflow.</q>

见：[Gitflow long-lived-branch on Tech Radar](https://www.thoughtworks.com/cn/radar/techniques/long-lived-branches-with-gitflow)

## 相关资源

* [Stop cherry-picking, start merging](https://devblogs.microsoft.com/oldnewthing/20180323-01/?p=98325)
* [Patterns for Managing Source Code Branches](https://martinfowler.com/articles/branching-patterns.html)
