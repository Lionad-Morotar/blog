# Kubernetes

[TOC]

Kubernetes，K8s，是一个基于容器的集群管理平台，主要用于控制容器

* 可集群：容器的移动或删除，服务对外暴露的静态 IP 不变
* 扩缩容：根据资源负载，自动调整容器副本数
* 自修复：自动重启容器，或选择新的工作节点
* 零或限制：通过亲缘性控制容器运行在指定机器

## 整体架构

一个 K8s 系统，常常包括一个 Master 节点，用于管理和控制多个 Node 计算节点。

Master 节点大体包括：

- API Server：系统对外接口，比如用于处理外部的命令行交互
- Scheduler：调度器，用于分配 Pod
- Controller Manager：控制器，跟踪节点状态，复制 Pod
- [ETCD](https://zhuanlan.zhihu.com/p/96428375)：分布式数据存储，存集群配置文件；可用于服务发现（保证一个集群中的不同进程可以互相找到并建立链接），并通过 Raft 协议使各个节点的状态保持一致。

Node 节点由许多的 Pod 组成，每一个 Pod 都是集群中的一个进程。Node 通过以下几个组件管理 Pod：

- Docker：容器运行时，用于拉取、创建、启动镜像
- Kubelet：用于中转 API Server 和 Docker 的交互行为，以进行 Pod 的创建、删除、修改、监控
- Kube-proxy：用于 Pod 的代理（？）
- Fluentd：用于日志收集、储存和查询
- Service：一组相同功能的 Pod 可以通过 Service 提供对外的接口

Pod 写入磁盘的数据可能随时会丢失，它自身也随时可能被重启，如内存耗尽，进程崩溃，或存活指针返回失败。Pod 重启的时间以指数时间避退，直到满 5 分钟。

## 常用子指令

- Apply：从配置文件更新对象，如 kubectl apply -f x.yaml；
- Delete：删除对象，如 kubectl delete deploy x；
- Describe：获取对象信息，如 kubectl describe pod x；
- Exec：执行容器的指令，如 kubectl exec -it pod x bash；
- Get：获取对象状态，如 kubectl get pods（获取所有 pods 状态）、kubectl get svc（获取所有服务及其状态，如端口和所在集群 IP）；
