打标签
===

  - 显示标签
    - `git tag`
  - 含批注的标签
    - `git tag -a v1.4 -m 'my version v1.4'`
  - 分享标签
    - `git push origin v1.4`
  - 推送本地所有新增标签
    - `git push origin --tags`
    
--- 

  - 建立标签
    - `git tag v1 C1`
    - 如果不指定提交记录，Git会用 `HEAD` 所指向的位置