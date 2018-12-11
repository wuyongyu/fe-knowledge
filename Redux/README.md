Redux
===

- 数据流是什么？ 为什么使用数据流？
  - 数据流是我们的行为和响应的集合
  - 使用数据流帮助我们明确了行为对应的响应

- React与数据流的关系？
  - React是纯 `V` 层框架，需要数据流进行支撑

- 主流数据流框架？ 为什么使用Redux？
  - Flux、reFlux、Redux
  - 简单、单一状态树

- Redux概述
  - State (defines) => UI (triggers) => Action (sent to) => Reducer (updates) => Store (contains) => State

- React-Redux安装
  - 安装：`npm install react-redux redux`

- React-Redux项目结构
  - actions
    - 是行为的抽象

    ```javascript
    const addTodo = (text) => {
      return {
        type: "ADD_TODO",
        id: nextTodoId++,
        text
      }
    }
    ```

  - reducer
    - 是响应的抽象
    - 是纯方法
    - 传入旧状态和action
    - 返回新状态

      ```javascript
      const todo = (state, action) => {
        switch(action.type) {
          case "ADD_TODO" :
            return {
              id: action.id,
              text: action.text,
              completed: false
            }
          case "TOGGLE_TODO" :
            if(state.id !== action.id) {
              return false;
            }
            return Object.assign({}, state, {
              complete: !state.completed
            })
          default:
            return state
        }
      }
      ```
  - store
    - `action`作用于`store`
    - `reducer`根据`store`响应
    - `store`是唯一的
    - `store`包括了完整的`state`
    - `state`完全可预测

    ```javascript
    important { createStore } form "redux";
    important todoApp form "./reducers";

    let store = createStore(todoApp);
    ```

  - components
    - 目的：如何显示（样式、布局）
    - 是否在Redux数据留中：否
    - 读取数据：从 `props` 获取数据
    - 修改数据：从 `props` 调用回调函数
    - 实现方式：手写
  - container
    - 目的：如何工作（数据获取，状态更新）
    - 是否在Redux数据留中：是
    - 读取数据：从 `Redux` 获取`state`
    - 修改数据：向 `Redux` 派发`actions`
    - 实现方式：由 `React-Redux`生成
  - index.html
  - server.js

- 常用工具
  - react-redux
    - 除了 `React` 绑定，还有 `ng`，`ng2`，`backbone`，`deku`
  - redux-thunk
    - 实现异步`action`
  - redux-gen
    - 利用生成器，实现`middleware`
  - react-router-redux
  - react-redux-form

> `Function`优先于 `ES6 Class` 优先于 `React.createClass`

- 线上CDN文件
  - https://cdnjs.com/libraries/redux/