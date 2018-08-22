### 用 keys 提取组件

  - key 是正确使用
  ```React JSX
  function ListItem(props) {
    // 这里不需要指定 key
    return <li>{props.value}</li>
  }
  function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) => {
      // 这里需要 key，在数组的上下文指定
      <ListItem key={number.toString()} 
        value={number}
      />
    });
    return (
      <ul>
        {listItems}
      </ul>
    )
  }
  const number = [1, 2, 3, 4, 5];
  ReactDOM.render(
    <NumberList number={numbers} />,
    document.getElementById('root');
  )
  ```