# 作用域

- 作用域（严格说是词法作用域）

  - 在`Javascript`中，每个函数都有自己的作用域
  - 作用域基本上是变量的一个集合以及如何通过名称访问这些变量的规则
  - 只有函数内部的代码才能访问这个函数作用域中的变量

> 作用域的规则表明，一个作用域内的代码可以访问这个作用域内以及任何包围在它之外的作用域中的变量

- ES5 中的作用域

```javascript
const callback = [];
for (var i = 0; i <= 2; i++) {
  callback[i] = function () {
    return i * 2;
  };
}

console.table([callback[0](), callback[1](), callback[2]()]);
```
