# Docker

[TOC]

## 简介

#### Docker 是什么？

Docker 本身不是容器，而是容器的一种实现以及容器管理工具。

#### 容器是什么？

容器是一种软件打包的技术。通过对系统资源的控制与隔离，把软件、软件运行时、系统工具、系统库和配置打包到一个镜像中，运行在有有独立命名空间的容器进程内，可以使软件的所有依赖都标准化。所以使用容器技术能方便地将软件打包成标准单元。

TODO

## 原理

Docker 和虚拟机都希望能提供一个虚拟、完整、独立的运行时环境，通过提高虚拟环境的隔离型，以便管理。一般来说，虚拟机的原理是模拟硬件环境，所以需要安装客户端操作系统[^模拟硬件]，而 Docker 并不需要这层客户端操作系统，所以 Docker 更加轻量，硬件利用率也更高。

[^模拟硬件]: 虚拟机一般有三种模拟方式，裸机型（硬件 + 虚拟 OS + 虚拟 APP）、托管型（OS + Hypervisor + 虚拟 OS + 虚拟 APP）和操作系统虚拟化（OS + 容器 + 虚拟 APP）。

虚拟机使用 Hypervisor 实现操作系统级别的模拟，而 Docker 通过操作系统的文件系统、命名空间、控制组实现进程级别的模拟。

命名空间：所有 Linux 的进程都从 init 进程 fork 派生。Linux 容器的一个主要组件是新的命名空间下的一个 init 进程，所以我们有能力去创建一个不影响外界的进程树出来。

控制组：通过控制组，我们能限制进程对 CPU、磁盘、内存的使用。

## 概念

1. 隔离环境：虚拟文件系统；POSIX API；文件的只读和屏蔽；命名空间、环境变量等；
2. 生命周期：created、running、pausing、paused、stopped；可以通过 update 动态调整硬件资源使用率
3. 数据卷：数据卷由自己的独立的生命周期
4. 网络：独立的网络命名空间、共享其他实例的网络命名空间、共享主机的网络命名空间

## 架构

Docker 引擎实际上由 Dockerd、Containerd、RunC 等组件构成

Dockerd：容器管理 -> 编排管理和集群管理。它接受来自外部的 HTTP 请求并作为 API 调用执行，对内与 Containerd 进行通讯。

Containerd：对镜像、容器的管理提供了一个更进一步的抽象，提供了内容、快照、差异、容器、镜像、任务等更加细粒度的概念。

Container 包含 Containerd-shim，用于正确处理由操作系统发送过来的信号。

RunC：Containerd 提供的容器管理等 API 的执行者是 RunC。

## 常见指令

- Build：打包镜像，如 docker build -t test . -f Dockerfile；
- Exec：执行容器指令，如 docker exec -it xxx bash；
- Run：运行镜像，如 docker run -it test；
- Ps：列表，如 docker ps；
- Copy：复制文件到 Docker 中，如 docker cp d://test dockerID:dockerPath

## 调试流程

1. 拉远端镜像：docker pull registry.gitlab.baixing.cn/fenlei/midway-fe:75150
2. 启动容器：docker run -p 8081:7001 -it 5d0c03824600 sleep 999m
3. 进入并调试：docker exec -it name /bin/bash

`-p 8081:7001`，把本机的 8081 端口绑定到 Container 的 7001 端口。

## 常见问题

关闭 Hyper-V：`bcdedit /set hypervisorlaunchtype off`
