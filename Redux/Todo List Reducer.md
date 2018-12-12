Todo List Reducer
===

- 在HTML加上
  - `<script src="https://cdnjs.cloudflare.com/ajax/libs/expect/1.20.2/expect.js"></script>`
  - `<script src="https://cdn.jsdelivr.net/npm/deep-freezer@2.0.4/index.min.js"></script>`

```javascript
const todo = (state, action) => {
  switch (action.type){
    case: "ADD_TODO":
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case "TOGGLE_TODO":
      if(state.id !== action.id){
          return state;
        }
      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
}

const todos = (state = [], action) => {
  switch(action.type){
    case "ADD_TODO":
      return [
        ...state,
        // {
        //   id: action.id,
        //   text: action.text,
        //   completed: false
        // }
        // 重构
        todo(undefined, action);
      ];
    case "TOGGLE_TODO":
      // return state.map(todo => {
      //   if(todo.id !== action.id){
      //     return todo;
      //   }
      //   return {
      //     ...todo,
      //     completed: !todo.completed
      //   };
      // })
      // 重构
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: "ADD_TODO",
    id: 0,
    text: "Learn Redux"
  };
  const stateAfter = [
    {
      id: 0,
      text: "Learn Redux",
      completed: false
    }
  ];
  
  deepFreeze(stateBefore);
  deepFreeze(stateAfter);
  
  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
}

const testToggleTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: "Learn Redux",
      completed: false
    },
    {
      id: 1,
      text: "Go Shopping",
      completed: false
    }
  ];
  const action = {
    type: "TOGGLE_TODO",
    id: 1
  };
  const stateAfter = [
    {
      id: 0,
      text: "Learn Redux",
      completed: false
    },
    {
      id: 1,
      text: "Go Shopping",
      completed: true
    }
  ];
  
  deepFreeze(stateBefore);
  deepFreeze(stateAfter);
  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
}

testAddTodo();
testToggleTodo();
console.log("All tests passed.")
```