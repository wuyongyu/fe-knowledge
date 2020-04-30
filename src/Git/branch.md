# 分支

- 本地分支重命名（未推送到远程）
  - `git branch -m oldName newName`
  - `git branch -D oldName`
- 远程分支重命名（已推送到远程）
  - `git branch -m oldName newName`
  - `git push --delete origin oldName`
  - `git push origin newName`
  - `git branch --set-upstream-to origin/newName`
