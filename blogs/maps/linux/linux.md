# Linux

[TOC]

## 系统原理

#### 什么是零拷贝技术？

TODO review

传统的文件传输需要经历四次拷贝以及四次内核态用户态切换：磁盘数据 -> dmacopy() -> 内核缓存区 -> read() -> 用户缓存区 -> write() -> 套接字缓存区 -> dmacopy() -> 网卡。read 或 write 时，系统先从用户态切换到内核态，等内核完成任务再切换回去。由于每次切换都需要消耗 50ns~100ns 的时间，所以在并发量大的情况下，会多很多不必要的开销。

使用 mmap 替代 read 可以把内核区中的文件直接映射到用户缓冲区，这可以减少一次 CPU 拷贝带来的消耗。

从 Linux 2.1 可以使用 sendFile 替代 read，数据根本不经过用户态，可以在调用 write 时，直接把数据从内核缓冲区进入到 Socket 缓存区，减少了一次 CPU 拷贝和上下文切换。

Linux 2.4 又进行了一些修改。在 sendFile 的基础上，如果网卡支持 SG-DMA 技术，在从用 DMA 拷贝把磁盘数据拷贝到内核缓冲区后，可以直接把内核缓存区的数据拷贝到网卡。这样一来就只有 3 次上下文切换和 2 次拷贝。为什么还有两次拷贝也能叫零拷贝呢？实际上，零拷贝应该叫零冗余拷贝，因为磁盘到内核，内核到网卡这两次拷贝并没有像 Linux 2.1 的 sendFile 一样在内核与内核之间多一次冗余拷贝（内核缓存区到 Socket 缓存区），内核只保有一份数据。

见：[<i>Zero copy : mmap and sendfile in detail</i>](https://trashcode.io/post/d/Zero-copy-mmap-and-sendfile-in-detail)

## 系统编程

#### signal.h 中常见系统信号有哪些？

* SIGTERM：终止请求，发送到程序
* SIGSEGV：无效的内存访问（分段故障）
* SIGINT：外部中断，通常由用户发起
* SIGILL：无效的程序映像，如无效指令
* SIGABRT：异常终止条件，如例如由 abort() 触发
* SIGFPE：错误的算术运算，如除以零

## 脚本

#### 文件的权限怎么设定？

使用 chmod xxx 分别给文件所有者、所属组和其他人设定权限，x 对应 rwx 三位二进制的十进制值。如 chmod 777 中的 7 表示 rwx，有 read、write、execute 的权限。

#### 怎么给文件重命名？

```bash
rename -v 'oldname' 'newname' file
```

今天装了 WLS，用的 Debian，但是它居然没有自带的 rename 工具，所以只好使用 apt install rename 重新安装了一个。令我诧异的是，这个 rename 的用法和上面提到的完全不一样。

```bash
rename "s/oldstr/newstr"
```

## 应用

#### 怎么给用户添加管理员权限？

```js
# 打开权限文件
sudo vim /etc/sudoers
# 在 `# User privilege specification` 下面添加权限
userxxx ALL=(ALL) ALL
# 保存退出就好了
```

#### 如何添加快捷键？

```sh
alias ..='cd ..'
```

#### 文件的增删改查怎么做？

```sh
# 创建文件夹
mkdir xxx
# 删除文件/文件夹
rm -rf xxx
# 查找指令所在的目录
whereis xxx
# 定位当前位置
pwd
```

#### 如何使用 SFTP 传输文件？

在 VS Code 中添加 [SFTP 插件](https://marketplace.visualstudio.com/items?itemName=liximomo.sftp)，用来和服务器同步文件。配置可参考：

```js
{
  "name": "Upload Blog",
  "host": "xx.xxx.xx.xxx",
  "protocol": "sftp",
  "port": 22,
  "username": "root",
  "remotePath": "/home/lionad/blog",
  "uploadOnSave": false
}
```

## 软件

#### 如何安装 NodeJS？

```sh
# 删除本机自带的 NodeJS
yum remove nodejs npm npx -y

# 删除软连接
sudo rm /usr/local/bin/node
sudo rm /usr/local/bin/npm 
sudo rm /usr/local/bin/npx

# 下载指定版本的 NodeJS 包
# https://nodejs.org/dist/
# Ubuntu 安装 NodeJS 见：https://github.com/nodesource/distributions
wget https://nodejs.org/dist/v10.15.3/node-v10.15.3-linux-x64.tar.gz

# 解压下载的包
tar -xf node-v10.15.3-linux-x64.tar.gz

# 创建软连接
ln -s /home/data/lionad/apps/node-v10.15.3-linux-x64/bin/node /usr/local/bin/node
ln -s /home/data/lionad/apps/node-v10.15.3-linux-x64/bin/npm /usr/local/bin/npm
ln -s /home/data/lionad/apps/node-v10.15.3-linux-x64/bin/npx /usr/local/bin/npx
```

#### 怎样配置 Nginx？

以下是使用 Nginx 部署网站的基本步骤。

```sh
# 修改 nginx 配置文件
vim /etc/nginx/nginx.conf
# 最后重启 nginx
nginx -s reload
# 如果遇到权限问题，可以尝试按照以下方法调试
# 查看 nginx 错误日志，在 configure file 中有错误日志的地址
vim /etc/nginx/nginx.conf
# 查看 nginx 的程序启动者
ps aux | grep 'nginx'
# 更改文件夹权限
chmod 777 xxx
```

见：[Nginx 配置文件示例](/maps/linux/nginx/config-example.html)

#### 如何安装 ImageMagick？

1. 准备开发环境

```bash
sudo yum groupinstall 'Development Tools'
sudo yum -y install bzip2-devel freetype-devel libjpeg-devel libpng-devel libtiff-devel giflib-devel zlib-devel ghostscript-devel djvulibre-devel libwmf-devel jasper-devel libtool-ltdl-devel libX11-devel libXext-devel libXt-devel lcms-devel libxml2-devel librsvg2-devel OpenEXR-devel php-devel
```

2. 下载源码，解压安装

```bash
wget https://www.imagemagick.org/download/ImageMagick.tar.gz
tar xvzf ImageMagick.tar.gz
cd ImageMagick*
./configure
make
make install
```

3. 验证是否安装完成

```bash
magick -version
```

## Links

TODO review

##### <Link type='h5' to='https://mgear-file.oss-cn-shanghai.aliyuncs.com/The%20History%20of%20Pandemics%2C%20by%20Death%20Toll%20-%20%E5%A4%A7%E6%B5%81%E8%A1%8C%E7%97%85%E5%8E%86%E5%8F%B2.html' source='https://github.com/nodejs/node-v0.x-archive/issues/2479' >《EMFILE error when using fs.watch on many items》</Link>

Linux 单个进程只能操作有限个文件数量。可以使用 ulimit -n xxxx 突破这个限制。
