---
title: BuildKit
description: Docker 的下一代构建引擎，负责把 Dockerfile 转换为 LLB 并执行，支持多平台构建、挂载语义与高级缓存策略。
---

## 简介

#### BuildKit 是什么

BuildKit 是 Docker 的下一代构建引擎，设计目标是把源代码高效、可表达且可重复地转换为构建产物。它引入了并发的依赖图求解器、内容寻址缓存、可插拔的 frontend
机制以及多种输出格式。从 Docker Engine 23.0 和 Docker Desktop 开始，Linux 镜像构建默认使用 BuildKit。

见：[BuildKit documentation](https://docs.docker.com/build/buildkit/)

#### BuildKit 与 BuildX 的关系

BuildKit 是后端执行引擎，BuildX 是前端的 CLI 插件。`docker buildx build` 把用户参数翻译成构建请求发给 BuildKit；`docker build` 在较新版本下也会调用
BuildX。BuildX 除了发起构建，还能创建和管理多个 builder、并发跑多个构建、处理镜像仓库相关操作。

见：[Docker build overview](https://docs.docker.com/build/concepts/overview/)

#### BuildKit 的 client-server 架构

一次构建的典型数据流是：

1. BuildX 作为 client 接收命令；
2. Dockerfile frontend 把 Dockerfile 转成 LLB（Lightweight Build Language）有向无环图；
3. BuildKit solver 调度 LLB 节点并行执行；
4. worker 在容器或沙箱中执行具体操作；
5. 输出产物到本地镜像库、registry 或 OCI layout。

这套架构让 BuildKit 可以支持 Dockerfile 以外的构建描述语言，只要它们能生成 LLB。

见：[BuildKit request lifecycle](https://github.com/moby/buildkit/blob/master/docs/dev/request-lifecycle.md)

## Builder 与 Driver

#### 默认 docker driver 的能力与限制

默认 builder 使用 `docker` driver，它直接复用 Docker daemon 内置的 BuildKit。优点是零配置、构建完成后镜像自动进入本地镜像库；缺点是功能受限：不支持多平台构建、不支持高级缓存后端（如
Azure Blob、S3）、输出格式和配置项有限。如果只需要在本地为当前架构构建单平台镜像，默认 driver 足够。

见：[Docker driver](https://docs.docker.com/build/builders/drivers/docker/)

#### docker-container driver 与多平台构建

`docker-container` driver 会单独启动一个 BuildKit 容器作为后端。它支持多平台构建、外部缓存、镜像推送、OCI 目录导出等高级特性。缺点是默认不会把结果加载到本地 Docker 镜像库，需要显式加
`--load`；而多平台镜像即使加 `--load` 也无法进入本地库，通常需要 `--push`。

```bash
docker buildx create --name mybuilder --driver docker-container --bootstrap --use
docker buildx build --platform linux/amd64,linux/arm64 --push -t app:latest .
```

见：[docker-container driver](https://docs.docker.com/build/builders/drivers/docker-container/)

#### kubernetes 与 remote driver

`kubernetes` driver 在 Kubernetes 集群中创建 BuildKit Pod，适合团队共享或弹性扩展；`remote` driver 直接连接一台手动部署的 BuildKit daemon，常用于云端构建服务或自建
CI。它们的能力与 `docker-container` 相近，但引入了网络、TLS 和权限配置成本。

见：[Build drivers](https://docs.docker.com/build/builders/drivers/)

#### 多平台构建的限制

多平台构建依赖 QEMU user-mode 模拟或原生 builder。跨架构模拟可以工作，但显著慢于原生构建，且某些指令或系统调用无法正确模拟。另外，多平台构建结果不能通过 `--load` 导入单一本地 Docker
daemon，必须推送到 registry 或导出为 OCI layout。

见：[Multi-platform builds](https://docs.docker.com/build/building/multi-platform/)

## Dockerfile 前端与 LLB

#### syntax parser directive 的作用

`# syntax=docker/dockerfile:1` 放在 Dockerfile 第一行时，指定了本次构建使用的 Dockerfile frontend 镜像版本。它的作用是解耦 Dockerfile 语法与 Docker
Engine/BuildKit 版本：即使不升级 Docker，也能使用最新的稳定语法；`docker/dockerfile:1-labs` 则用于实验性功能。

见：[Dockerfile syntax](https://docs.docker.com/reference/dockerfile/#syntax)

#### LLB 图的节点类型

LLB 是 BuildKit 内部的二进制中间表示，每个节点称为 Op，常见类型包括：

- `SourceOp`：从镜像、Git、HTTP 等来源拉取数据；
- `ExecOp`：执行命令，如 `RUN`；
- `FileOp`：文件操作，如 `COPY`、`ADD`；
- `BuildOp`：嵌套构建；
- `MergeOp` / `DiffOp`：层合并与差分；
- `PassthroughOp`：把依赖收敛为最终输出。

节点之间通过 digest 引用，BuildKit solver 据此实现并行执行与缓存复用。

见：[Dockerfile to LLB](https://github.com/moby/buildkit/blob/master/docs/dev/dockerfile-llb.md)

## 挂载语义

#### cache mount 与普通层缓存的区别

普通层缓存以整个 `RUN` 层为粒度：只要 `COPY package.json` 的输入变了，`npm ci` 就要完整重跑。`RUN --mount=type=cache,target=/root/.npm`
则把一个持久目录挂载进构建容器，包管理器下载的 tarball 可以跨构建复用，且不会进入最终镜像层。

```dockerfile
RUN --mount=type=cache,target=/root/.npm \
    npm ci
```

见：[Cache mounts](https://docs.docker.com/build/cache/optimize/)

#### secret mount 与 ENV/COPY 传密文

传统方式用 `ARG`/`ENV` 或 `COPY` 把 secret 放进镜像，结果会泄露到镜像层和 `docker history` 中。`RUN --mount=type=secret,id=npmrc` 会在构建期间把 secret
挂载为 `/run/secrets/npmrc`，构建结束后不提交到镜像。也可以指定 `env=NPM_TOKEN` 让它作为环境变量出现。

```dockerfile
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc \
    npm ci
```

构建时传入：`docker buildx build --secret id=npmrc,src=$HOME/.npmrc .`

见：[Build secrets](https://docs.docker.com/build/building/secrets/)

#### ssh mount 与私有仓库访问

`RUN --mount=type=ssh` 把宿主机的 SSH agent socket 转发进构建容器，使构建过程可以 `git clone` 私有仓库或 `go mod download`
私有模块，而无需把私钥复制到镜像里。支持带密码的 key，因为实际签名由 host agent 完成。

```dockerfile
RUN --mount=type=ssh \
    git clone git@github.com:org/private-repo.git
```

构建时传入：`docker buildx build --ssh default .`

见：[SSH mounts](https://docs.docker.com/build/building/secrets/#ssh-mounts)

#### bind mount 与 COPY 的区别

`RUN --mount=type=bind,target=.` 把构建上下文或上游 stage 以只读方式挂载到构建容器，供当前 RUN 使用。与 `COPY` 不同，bind mount
不会创建新的镜像层，也不会把源码永久写入镜像；默认只读，即使可写，RUN 结束后修改也会被丢弃。适合编译场景。

```dockerfile
RUN --mount=type=bind,target=. \
    go build -o app .
```

见：[Bind mounts](https://docs.docker.com/reference/dockerfile/#run---mounttypebind)

## 缓存机制

#### 内部缓存为什么不跨 builder 共享

BuildKit 的层缓存和 `RUN --mount=type=cache` 的缓存卷默认都存储在当前 builder 实例内部。`docker` driver 用 Docker daemon
的缓存空间，`docker-container` driver 用自己的容器存储。切换到另一个 builder 后，之前的缓存不会自动出现，因此本地 builder 和 CI 临时 builder 之间不会共享缓存。

见：[External cache](https://docs.docker.com/build/cache/optimize/)

#### 外部缓存 backend 与 --cache-to/--cache-from

外部缓存通过 `--cache-to` 导出、`--cache-from` 导入，常用 backend 包括：

- `inline`：把缓存嵌入镜像 manifest，简单但容量有限；
- `registry`：把缓存推送到指定镜像 tag，团队共享最常用；
- `local`：导出到本地目录；
- `gha`：GitHub Actions 缓存；
- `s3` / `azblob`：云对象存储。

```bash
docker buildx build \
  --cache-to type=registry,ref=myrepo/app:cache,mode=max \
  --cache-from type=registry,ref=myrepo/app:cache \
  --push -t myrepo/app:latest .
```

`mode=max` 会缓存所有可达层，`mode=min` 只缓存最终镜像层。

见：[Cache backends](https://docs.docker.com/build/cache/backends/)

## 与 Legacy Builder 的差异

#### 多阶段 target 执行顺序

Legacy builder 处理 `--target stage2` 时，会按顺序构建从第一阶段到目标阶段之间的所有 stage，即使某些 stage 与目标无依赖关系。BuildKit 只构建目标 stage 实际依赖的
stage。如果某个 stage 设计为“有副作用、必须执行”，在 BuildKit 下可能不再运行。

见：[Multi-stage builds](https://docs.docker.com/build/building/multi-stage/)

#### VOLUME 语义差异

```dockerfile
FROM alpine
VOLUME /data
RUN echo hello > /data/file
```

Legacy builder 会丢弃 `VOLUME /data` 之后对该目录的修改，最终镜像里没有 `/data/file`；BuildKit 会保留这些修改。迁移旧 Dockerfile 时需要特别注意。

见：[Dockerfile VOLUME reference](https://docs.docker.com/reference/dockerfile/#volume)

#### docker history 中间层差异

BuildKit 不再为每个中间步骤创建中间镜像，而是使用自己的内容寻址缓存。因此 `docker image history` 中会出现 `<missing>` 的 IMAGE 列；Legacy builder 则会显示一串完整的中间镜像
ID。

见：[Docker image history](https://docs.docker.com/engine/reference/commandline/image_history/)

#### COPY/ADD 新 flag 的可用性

以下 flag 需要 BuildKit，Legacy builder 不支持或会忽略：

- `COPY --chmod=755` / `--chmod=+x`
- `COPY --link`
- `COPY --parents`
- `COPY --exclude=*.txt`

使用这些 flag 时建议显式声明 `# syntax=docker/dockerfile:1`，以确保 frontend 版本足够新。

见：[Dockerfile COPY reference](https://docs.docker.com/reference/dockerfile/#copy)

## 限制与注意事项

#### 多平台镜像无法 --load 到本地

`docker buildx build --platform linux/amd64,linux/arm64 --load` 会失败，因为单一本地 Docker daemon 的镜像库通常只能存放当前主机的平台
manifest。多平台构建应使用 `--push`，或导出为 OCI layout 后再用其他工具导入。

见：[Multi-platform builds](https://docs.docker.com/build/building/multi-platform/)

#### 默认 docker driver 不支持外部缓存后端

Azure Blob Storage、S3 等外部缓存 backend 要求使用 `docker-container`、`kubernetes` 或 `remote` driver。默认 `docker` driver
只支持内联缓存，无法满足 CI  ephemeral builder 的缓存共享需求。

见：[Azure Blob cache backend](https://docs.docker.com/build/cache/backends/azblob/)

#### 构建沙箱与特权操作限制

BuildKit 默认在受限沙箱中执行构建步骤，禁止构建容器进行特权系统调用、加载内核模块或访问宿主机文件系统。外部设备访问需要通过 CDI 等机制显式声明。如果构建过程需要“几乎等同于宿主机”的权限，BuildKit
可能不是正确选择。

见：[BuildKit project scope](https://github.com/moby/buildkit/blob/master/PROJECT.md)

## 常用命令速查

#### 日常命令

```bash
# 查看 builder 列表
docker buildx ls

# 创建 docker-container builder
docker buildx create --name mybuilder --driver docker-container --bootstrap --use

# 单平台构建并加载到本地
docker buildx build --load -t app:latest .

# 多平台构建并推送
docker buildx build --platform linux/amd64,linux/arm64 --push -t app:latest .

# 使用 registry 缓存
docker buildx build \
  --cache-to type=registry,ref=myrepo/app:cache,mode=max \
  --cache-from type=registry,ref=myrepo/app:cache \
  --push -t myrepo/app:latest .
```

见：[docker buildx build reference](https://docs.docker.com/reference/cli/docker/buildx/build/)
