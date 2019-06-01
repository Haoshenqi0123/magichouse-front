#!/usr/bin/expect
set timeout 10
set password =Root123...
spawn sudo tar zcf dist.tar.gz dist/
spawn scp dist.tar.gz root@47.104.2.163:/opt/html/biaoqingbao 
 expect {
 "(yes/no)?"
  {
    send "yes\n"
    expect "*assword:" { send "$password\n"}
  }
 "*assword:"
  {
    send "$password\n"
  }
}
expect "100%"
expect eof



 # sshpass -p 5)tKAgg(F!qC5z2p scp dist.tar.gz root@66.42.55.111:/opt/html 
