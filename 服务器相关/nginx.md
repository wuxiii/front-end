# nginx

ubuntu 安装 nginx

```bash
 apt-get update
 apt-get install nginx
```

查看 nginx 的运行状态

```bash
root@iZuf61ja8b4ci10y92jc51Z:~# systemctl status nginx
● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Tue 2021-01-12 16:37:40 CST; 16h ago
 Main PID: 17834 (nginx)
   CGroup: /system.slice/nginx.service
           ├─17834 nginx: master process /usr/sbin/nginx -g daemon on; master_process on
           └─17835 nginx: worker process

Jan 12 16:37:39 iZuf61ja8b4ci10y92jc51Z systemd[1]: Starting A high performance web server and a reverse proxy server...
Jan 12 16:37:40 iZuf61ja8b4ci10y92jc51Z systemd[1]: nginx.service: Failed to parse PID from file /run/nginx.pid: Invalid argument
Jan 12 16:37:40 iZuf61ja8b4ci10y92jc51Z systemd[1]: Started A high performance web server and a reverse proxy server.
```

启动 nginx

```bash
systemctl start nginx
```

关闭 nginx

```bash
systemctl stop nginx
```

重启 nginx

```bash
systemctl restart nginx
```

重载 nginx，改完配置文件可以使用

```bash
systemctl reload nginx
// 或者
nginx -s reload
```

开机自启

```bash
systemctl enable nginx
```

关闭开机自启

```bash
systemctl disable nginx
```

查看服务器中存在的 nginx.conf 文件的位置

```bash
root@iZuf61ja8b4ci10:~# locate nginx.conf
/etc/init/nginx.conf
/etc/nginx/nginx.conf
```

查看 nginx 实际调用的配置文件

```bash
root@iZuf61ja8b4ci10:~# ps aux|grep nginx
root     17834  0.0  0.0 124976  1420 ?        Ss   Jan12   0:00 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
www-data 17835  0.0  0.1 125336  3192 ?        S    Jan12   0:00 nginx: worker process
root     19537  0.0  0.0  14220   920 pts/0    S+   08:41   0:00 grep --color=auto nginx
```

使用 nginx 的 -t 参数进行配置检查，即可知道实际调用的配置文件路径及是否调用有效

```bash
root@iZuf61ja8b4ci10:~# /usr/sbin/nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

nginx 配置步骤

通过 nginx -t 找到实际调用的配置文件路径，打开文件发现有如下配置,
如无可以自行添加

```bash
server{
    ...
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
```

## location 中 root 和 alias 的区别

root 和 alias 的主要区别是：

- 使用 root，实际的路径就是：root 值 + location 值。
- 使用 alias，实际的路径就是：alias 值。
- alias 只能位于 location 块中，root 可以不放在 location 中，root 会自动往上查找。

如：`http://47.116.134.xxx/static/a.jpg`

它在服务器的路径是：/var/www/app/static/a.jpg

那么用 root 的配置是：

```
location /static/ {
  root /var/www/app/;
}
```

用 alias 的配置就是：

```
location /static/ {
  alias /var/www/app/static/;
}
```
