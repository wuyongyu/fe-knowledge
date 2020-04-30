# 立即调用函数表达式

```javascript
(function IIFE() {
  console.log("hello");
})();
```

- `(function IIFE(){...})` 函数表达式外面的`(..)`就是 `JavaScript` 语法能够防止其成为普通函数声明的部分

- 表达式后面的`()` 实际上就是表示立即执行前面给出的函数表达式
