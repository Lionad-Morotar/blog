(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{859:function(e,t,v){"use strict";v.r(t);var l=v(0),_=Object(l.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"kubernetes"}},[e._v("Kubernetes")]),e._v(" "),t("nav",{staticClass:"table-of-contents"},[t("ol",[t("li",[t("a",{attrs:{href:"#kubernetes"}},[e._v("Kubernetes")]),t("ol",[t("li",[t("a",{attrs:{href:"#整体架构"}},[e._v("整体架构")])]),t("li",[t("a",{attrs:{href:"#常用子指令"}},[e._v("常用子指令")])])])])])]),t("p",[e._v("Kubernetes，K8s，是一个基于容器的集群管理平台，主要用于控制容器")]),e._v(" "),t("ul",[t("li",[e._v("可集群：容器的移动或删除，服务对外暴露的静态 IP 不变")]),e._v(" "),t("li",[e._v("扩缩容：根据资源负载，自动调整容器副本数")]),e._v(" "),t("li",[e._v("自修复：自动重启容器，或选择新的工作节点")]),e._v(" "),t("li",[e._v("零或限制：通过亲缘性控制容器运行在指定机器")])]),e._v(" "),t("h2",{attrs:{id:"整体架构"}},[e._v("整体架构")]),e._v(" "),t("p",[e._v("一个 K8s 系统，常常包括一个 Master 节点，用于管理和控制多个 Node 计算节点。")]),e._v(" "),t("p",[e._v("Master 节点大体包括：")]),e._v(" "),t("ul",[t("li",[e._v("API Server：系统对外接口，比如用于处理外部的命令行交互")]),e._v(" "),t("li",[e._v("Scheduler：调度器，用于分配 Pod")]),e._v(" "),t("li",[e._v("Controller Manager：控制器，跟踪节点状态，复制 Pod")]),e._v(" "),t("li",[t("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/96428375",target:"_blank",rel:"noopener noreferrer"}},[e._v("ETCD")]),e._v("：分布式数据存储，存集群配置文件；可用于服务发现（保证一个集群中的不同进程可以互相找到并建立链接），并通过 Raft 协议使各个节点的状态保持一致。")])]),e._v(" "),t("p",[e._v("Node 节点由许多的 Pod 组成，每一个 Pod 都是集群中的一个进程。Node 通过以下几个组件管理 Pod：")]),e._v(" "),t("ul",[t("li",[e._v("Docker：容器运行时，用于拉取、创建、启动镜像")]),e._v(" "),t("li",[e._v("Kubelet：用于中转 API Server 和 Docker 的交互行为，以进行 Pod 的创建、删除、修改、监控")]),e._v(" "),t("li",[e._v("Kube-proxy：用于 Pod 的代理（？）")]),e._v(" "),t("li",[e._v("Fluentd：用于日志收集、储存和查询")]),e._v(" "),t("li",[e._v("Service：一组相同功能的 Pod 可以通过 Service 提供对外的接口")])]),e._v(" "),t("p",[e._v("Pod 写入磁盘的数据可能随时会丢失，它自身也随时可能被重启，如内存耗尽，进程崩溃，或存活指针返回失败。Pod 重启的时间以指数时间避退，直到满 5 分钟。")]),e._v(" "),t("h2",{attrs:{id:"常用子指令"}},[e._v("常用子指令")]),e._v(" "),t("ul",[t("li",[e._v("Apply：从配置文件更新对象，如 kubectl apply -f x.yaml；")]),e._v(" "),t("li",[e._v("Delete：删除对象，如 kubectl delete deploy x；")]),e._v(" "),t("li",[e._v("Describe：获取对象信息，如 kubectl describe pod x；")]),e._v(" "),t("li",[e._v("Exec：执行容器的指令，如 kubectl exec -it pod x bash；")]),e._v(" "),t("li",[e._v("Get：获取对象状态，如 kubectl get pods（获取所有 pods 状态）、kubectl get svc（获取所有服务及其状态，如端口和所在集群 IP）；")])])])}),[],!1,null,null,null);t.default=_.exports}}]);