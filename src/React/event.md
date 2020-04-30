# 事件处理

- React 绑定属性的命名采用驼峰式写法，而不是小写
- React 中不能使用返回 `false` 的方式阻止默认行为，必须明确的使用 `preventDefault`，其中 `e` 是合成事件
- 必须谨慎对待 JSX 回调函数中的 `this`，类的方法默认是不绑定 `this` 的，如果忘记绑定 `this.handleClick` 并把它传入 `onclick`，当你调用这个函数的时候 `this` 的值会是 `undefined`。
- 向事件处理程序传递参数

  ```jsx harmony
  <Button onClick={(e) => {this.deleteRow(id, e)}}>Delete Row<Button>
  // 等价于
  <Button onClick={this.deleteRow.bind(this, id)}>Delete Row</Button>
  ```

- 参数 `e` 作为 `React` 事件对象将会被作为第二个参数进行传递。
  - 通过箭头函数的方式 - 事件对象必须显示的进行传递
  - 通过`bind`的方式 - 事件对象以及更对的参数将会被隐式的进行传递，而且需要注意的是：通过`bind`向监听函数传参，在类组件中定义的监听函数，事件对象`e`要排在所传递参数的后面
