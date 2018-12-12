Avoiding Object Mutations with `Object.assign()` and `...spread`
===

- 在HTML加上
  - `<script src="https://cdnjs.cloudflare.com/ajax/libs/expect/1.20.2/expect.js"></script>`
  - `<script src="https://cdn.jsdelivr.net/npm/deep-freezer@2.0.4/index.min.js"></script>`

```javascript
// 修改前
const toggleTodo = (todo) => {
  todo.completed = !todo.completed;
  return todo;
}

const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    text: "Learn Redux",
    completed: false
  };
  const todoAfter = {
    id: 0,
    text: "Learn Redux",
    completed: true
  }
  
  expect(
    toggleTodo(todoBefore)
  ).toEqual(todoAfter);
};

testToggleTodo();
console.log("All tests passed.");

// 修改后
const toggleTodo = (todo) => {
  // return {
  //   id: todo.id,
  //   text: todo.text,
  //   completed: !todo.completed
  // }
  // return Object.assign({}, todo, {
  //   completed: !todo.completed
  // });
  return {
    ...todo,
    completed: !todo.completed
  }
}

const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    text: "Learn Redux",
    completed: false
  };
  const todoAfter = {
    id: 0,
    text: "Learn Redux",
    completed: true
  }
  
  deepFreeze(todoBefore);
  
  expect(
    toggleTodo(todoBefore)
  ).toEqual(todoAfter);
};

testToggleTodo();
console.log("All tests passed.");
```