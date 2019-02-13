PureComponent
===

- `React.PureComponent` 类似于 `React.Component`。它们的不同之处在于 `React.Component` 没有实现 `shouldComponentUpdate()`, 但是 `React.PureComponent`实现了它，采用对属性和状态用浅比较的方式。
- `React.PureComponent` 的 `shouldComponentUpdate()` 会略过为整个组件的子树更新属性，因此要确保所有子级组件也是 “纯” 的
- 若 `shouldComponentUpdate()` 返回false，`render()`函数将不会被调用