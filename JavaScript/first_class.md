一等公民的函数
===

- 函数没什么特殊的，应该像对待任何其他数据类型一样对待它们--把它们存在数组里，当作参数传递，赋值给变量...等等

- npm上的模块包例子

```javascript

// 不好的写法
var getServerStuff = function(callback) {
  return ajaxCall(function(json) {
    return callback(json);
  })
} 

// 这才像样
var getServerStuff = ajaxCall;
```

- 以下是上述两种写法等价的原因

```javascript
// 这段代码
return ajaxCall(function(json) {
  return callback(json);
})

// 等价于这行
return ajaxCall(callback);

// 那么，重构一下 getServerStuff
var getServerStuff = function(callback) {
  return ajaxCall(callback);
}

// ...就等价于
var getServerStuff = ajaxCall;  // <-- 看，没有括号

```
