ssh
===

- 生成ssh：`ssh-keygen -t rsa -b 4096 -C "user@host"`
- 复制ssh：`cat ~/.ssh/id_rsa.pub | clipcopy`
- 测试连接 gitlab：`ssh -T git@gitlab.com`
- 测试连接 github：`ssh -T git@github.com`