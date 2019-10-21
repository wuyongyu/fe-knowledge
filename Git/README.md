Git
===

- [undo reset 重置错误](链接：https://learngitbranching.js.org/)

- 拉取远程所有分支：`git branch -r | grep -v '\->' | while read remote; do git branch --track "${remote#origin/}" "$remote"; done`

- [GUI Clients](https://www.git-scm.com/downloads/guis)
