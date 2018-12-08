条件渲染
===

- 与运算符 `&&`
  - 在 `JavaScript` 中，`true && expression` 总是返回 `expression`，而 `false && expression` 总是返回 `false`

> 因为，如果条件是`true`，`&&`右侧的元素就会被渲染，如果是`false`，**React** 会忽略并跳过它