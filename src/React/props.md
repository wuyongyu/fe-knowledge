# 属性 props

- 组件必须以大写字母开头
- 最好从组件自身进行命名 props，而不是根据使用组件的上下文命名
- 所有`React`组件必须像纯函数那样使用它们的 props

- 避免拷贝属性（props）到状态
  - 一是不必要（可以使用 this.props.color 来代替）
  - 二是产生 bug（新属性不会反应到状态中）

> 在这种情况下，比较合理的是重命名属性为 `initialColor` 或 `defaultColor`

```javascript
  constructor(props) {
    super(props);
    // Don't do this
    this.state = {
      color: props.color
    };
  }
```
