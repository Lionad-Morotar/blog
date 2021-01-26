# Linux 操作备忘

## 全新开始

### 给用户添加管理员权限

```js
# 打开权限文件
sudo vim /etc/sudoers
# 在 `# User privilege specification` 下面添加权限
userxxx ALL=(ALL) ALL
# 保存退出就好了
```

### 添加快捷键

```sh
alias ..='cd ..'
```

### 基本操作

文件操作的增删改查。

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

### SFTP

在 VSCode 中添加 [SFTP 插件](https://marketplace.visualstudio.com/items?itemName=liximomo.sftp)，用来和服务器同步文件。

配置可参考：

```js
{
  "name": "Upload Blog",
  "host": "47.100.27.221",
  "protocol": "sftp",
  "port": 22,
  "username": "root",
  "remotePath": "/home/lionad/blog",
  "uploadOnSave": false
}
```

### 安装 NodeJS

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

### 部署网站

以下是使用 Nginx 部署网站的基本步骤：

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

放一个 Nginx 配置文件示例：

```sh
user lionad;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;
include /usr/share/nginx/modules/*.conf;
events {
  worker_connections 1024;
}
http {
  log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
  access_log  /var/log/nginx/access.log  main;
  sendfile            on;
  tcp_nopush          on;
  tcp_nodelay         on;
  keepalive_timeout   65;
  types_hash_max_size 2048;
  include             /etc/nginx/mime.types;
  default_type        application/octet-stream;
  include /etc/nginx/conf.d/*.conf;
  server {
    listen       80 default_server;
    server_name  lionad.art;
    rewrite ^(.*)$ https://$host$1;

    location / {
      index index.html index.htm;
    }
  }
  server {
    listen 443 ssl http2;
    server_name lionad.art;
    index index.html index.htm;
    ssl_certificate "/etc/nginx/cert/xxx.pem";
    ssl_certificate_key "/etc/nginx/cert/xxx.key";
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1.2;
    ssl_prefer_server_ciphers on;

    root /home/lionad/blog;
    include /etc/nginx/default.d/*.conf;
    location / {
    }
    error_page 404 /404.html;
      location = /404.html {
    }
    error_page 500 502 503 504 /50x.html;
      location = /50x.html {
    }
  }
}
```