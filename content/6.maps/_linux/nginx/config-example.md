# Nginx Config Example

```text
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