# ssh

- 生成 ssh：`ssh-keygen -t rsa -b 4096 -C "email@example.com"`
- 复制 ssh：`cat ~/.ssh/id_rsa.pub | clipcopy`
- 测试连接 gitlab：`ssh -T git@gitlab.com`
- 测试连接 github：`ssh -T git@github.com`

> window 密钥和公钥路径：C:\Users\Administrator\.ssh
