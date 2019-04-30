
# 一 环境配置

# 1-1.git 安装  

    git --version 查看git版本 如果识别不到git命令即没有安装git
    yum -y install git

# 1-2.maven 安装

    mvn -v  
    yum -y install maven

    如果使用了私服，需要上传settings.xml
    mvn -v (找到mavenhome  eg: Maven home: /usr/share/maven)
    cd /usr/share/maven/conf (发现settings.xml  是一个链接，指向 /etc/maven/settings.xml)
    cd /etc/maven/
    mv settings.xml settings.xml.bak (备份settings.xml)
    rz (或者其他工具上传settings.xml)

# 2-1.git hooks设置

    cd /XXX/.git/hooks (XXX代表你的git项目所在目录)
    vim post-receive
    #!/bin/sh
    unset GIT_DIR
    cd /XXX/
    git pull
    mv /XXX/ /YYYY/ (YYYY代表你要部署的位置)