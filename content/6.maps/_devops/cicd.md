---
title: CI/CD
description: 持续集成和持续部署（Continuous Integration & Continuous Deployment）
---

## CI/CD 是什么？

CI/CD 是 DevOps 理论的一种实践，专注于自动化流水线，通常要借助特定服务实现，比如 GitHub Action、Gitlab CI/CD。

* CI 可以概括为项目自动构建、自动测试等操作的持续性
* CD 则包括为自动构建、测试以及部署

## Read | Continuous delivery vs. continuous deployment: What should be the default?

持续交付与持续部署，默认值应当是什么？

Source：[Continuous delivery vs. continuous deployment: What should be the default?](https://www.thoughtworks.com/en-gb/insights/podcasts/technology-podcasts/continuous-delivery-vs-continuous-deployment-what-default)
                
> We're going to talk today about CD versus CD. Continuous delivery versus continuous deployment. This came about because last year, I think early last year, we had a round of revisions and improvements for our Thoughtworks sensible default practices, which is like a set of practices that we maintain inside of Thoughtworks, for software consultancy.

Thoughtworks 内部维护了一套软件咨询的实践方法，其中包含了一些默认设施。

#### 什么是持续交付？

> Continuous Delivery is the ability to get changes of all types—including new features, configuration changes, bug fixes and experiments—into production, or into the hands of users, safely and quickly in a sustainable way ... continuous delivery is not magic. It’s about continuous, daily improvement—the constant discipline of pursuing higher performance by following the heuristic “if it hurts, do it more often, and bring the pain forward.” [@continuousdelivery.com](https://continuousdelivery.com/)

持续交付是指以可持续的方式将所有类型的更改（包括新功能、配置更改、错误修复和实验）安全、快速地投入生产或交到用户手中的能力。

> ... I make a change, it gets committed to my main line, trunk, or whatever you want to call it. We actually were recording a podcast yesterday, about pull requests, and is that CI?

按定义的话确实是 CI，尽管这个流水线不是自动的，PR 流程不仅繁琐还许多时候需要人工。

> To quickly summarize my understanding, what you're saying is continuous integration is a prerequisite for continuous delivery and maybe continuous deployment as well ... I've also worked in teams that were claiming that they do, for example, continuous delivery, but also had very, very long feature branches, and they only claimed that they did continuous delivery because they had an automated pipeline that would deploy on demand.

CI/CD 在概念上有些时候是混合的，从 DevOps 图我们确实能看到一个清晰的流程，但在实践的现实世界，情况要复杂。

> Just to clarify, you mean the DORA metrics, right? In Thoughtworks, we sometimes call them four key metrics... I think there's a fifth one... It's availability.

#### 什么是 DORA 指标？

DORA 指标，全称 DevOps 研究与评估指标 (DevOps Research and Assessment Metrics)，是一套用于衡量软件开发和交付效能的指标体系，包含：

* **部署频率 (Deployment Frequency, DF):**  指一个团队在一定时间范围内（通常是一周或一个月）将代码部署到生产环境的次数。
* **变更交付周期 (Lead Time for Changes, LT):**  指代码从提交到成功部署到生产环境所需的时间。
* **服务恢复时间 (Mean Time to Restore Service, MTTR):**  指从生产环境发生故障到服务恢复正常运行所需的时间。
* **变更失败率 (Change Failure Rate, CFR):**  指部署到生产环境的变更中导致服务中断或需要回滚的比例。

> "Oh, wait, if I deploy to production all the time, doesn't that guarantee that things will go wrong really often?" The answer is actually the opposite

因为错误足够独立（比如说“某个按钮交互的改变导致了用户点击率下降”），是可以被快速响应的。

> Now, microservice is different architectures, but if you give me a new version of PhotoShop 10 times a day, I'm going to be very angry. Part of that is the architecture question, I guess ... I think that the continuous delivery already, but especially deployment, it forces you to introduce some mechanisms that separate the concept of deployment and release.

按照实践，持续交付的产物可以是测试好的镜像，而用户感知到的部署并不是镜像的部署，而是功能的发布（换句话说，产品发布），所以持续部署和持续交付的区别可以在这里区分。

> Hey, for whatever reasons, for our go-to market or whatever, maybe we're a regulated industry, that Prem has to push a button to make it happen. Prem pushing that button runs exactly the same step as a continuous deployment pipeline would have.

同样打趣地说，持续推送代码到 main line 何尝不是一种 CID（Continuous Integration Delivery）呢？


