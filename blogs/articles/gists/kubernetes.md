# Kubernetes

Kubernetes，K8s，是一个基于容器的集群管理平台。

一个 K8s 系统，常常包括一个 Master 节点，用于管理和控制多个 Node 计算节点。

Master 节点大体包括：

- API Server：系统对外接口
- Scheduler：调度器
- Controller Manager：管理控制器
- [ETCD](https://zhuanlan.zhihu.com/p/96428375)：主要用于服务发现（保证一个集群中的不同进程可以互相找到并建立链接），并通过 Raft 协议使各个节点的状态保持一致。

Node 节点由许多的 Pod 组成，每一个 Pod 都是集群中的一个进程。Node 通过以下几个组件管理 Pod：

- Docker：创建容器
- Kubelet：用于 Pod 的创建、删除、修改、监控
- Kube-proxy：用于 Pod 的代理（？）
- Fluentd：用于日志收集、储存和查询
- Service：一组相同功能的 Pod 可以通过 Service 提供对外的接口
