#!/bin/bash
#应用依赖的本地开发环境 包括redis mysql
#redis直接使用官方源
#mysql在官方源基础上需要执行一些初始化脚本

#redis
docker run -it --name redis-local \
 -p 6379:6379 \
 -v /c/Users/zhanghaoxu/Desktop/project/moon/devDocker/redis-mount-dir/data:/data \
 -d redis \
 redis-server --appendonly yes

# docker 中下载 mysql
#启动
docker run -it --name mysql-local  \
-p 3306:3306  \
-v /c/Users/zhanghaoxu/Desktop/project/moon/devDocker/mysql-mount-dir:/var/lib/mysql  \
-e MYSQL_ROOT_PASSWORD=123456  \
-d zhanghaoxu/mysql-local

# windows 进入容器
#winpty docker exec -it mysql-local mysql -uroot -p 

#授权
#GRANT ALL ON *.* TO 'root'@'%';
#ALTER USER 'root'@'%' IDENTIFIED BY '123456' PASSWORD EXPIRE NEVER;
#ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'Xuxuxu321'; 
#flush privileges;


