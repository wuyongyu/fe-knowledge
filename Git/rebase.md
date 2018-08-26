交互式rebase
===

  - git rebase -i
    - `--interactive` 列出将要被复制到目标分支的备选提交记录
    - git rebase -i HEAD~4
    - git rebase --abort
      - 对`rebase`的内容进行重置
    
> commit --amend 对`commit`进行修改  