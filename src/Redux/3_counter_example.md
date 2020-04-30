# React Counter Example

- 在 HTML 文件中引用 `<script src="https://cdnjs.cloudflare.com/ajax/libs/redux/3.0.4/redux.js"></script>`
  、`<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.0/react.js"></script>`、`<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.0/react-dom.js"></script>`

```javascript
const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

const Counter = ({ value, onIncrement, onDecrement }) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);

const { createStore } = Redux;
// var createStore = Redux.createStore;
// import { createStore } from 'redux';
const store = createStore(counter);

const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() =>
        store.dispatch({
          type: "INCREMENT",
        })
      }
      onDecrement={() =>
        store.dispatch({
          type: "DECREMENT",
        })
      }
    />,
    document.getElementById("root")
  );
};

store.subscribe(render);
render();
```
