# 拓展操作符

```ES6
return {
    ...state,
    [counterCaption]: state[counterCaption] + 1
};
```

> 上面的代码逻辑 👆 等同于下面的代码 👇

```javascript
const newState = Object.assign({}, state);

newState[counterCaption]++;

return newState;
```

- 上面这样写，创造了一个 `newState` 完全复制了 `state` ，通过对 `newState` 的修改避免了对 `state` 的修改，不过这样写显得冗长，使用拓展操作符看起来更清晰简洁
