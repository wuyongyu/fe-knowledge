状态
===

- 不要直接更新state

  ```javascript
  // wrong
  this.state.comment = 'hello';
  ```

  ```javascript
  // correct
  this.setState({
    comment: 'hello'
  });
  ```

- 状态更新可能是异步的

  ```javascript
  // wrong
  this.setState({
    counter: this.state.counter + this.props.increment
  });
  ```

  ```javascript
  // correct
  this.setState((prevState, props) => ({
    counter: prevState.counter + props.increment
  }));
  ```

- 数据自顶向下流动