tmux
===

- tmux的系统级配置文件为`/etc/tmux.conf`，用户级配置文件为`~/.tmux.conf`，如果没有配置文件的话先创建: `touch ~/.tmux.conf`
- 先按`Control + b`，然后输入`：`，进入命令行模式，在命令行模式下输入`source-file ~/.tmux.conf` 【注意要在英文模式下输入，中文模式下是没效果滴】