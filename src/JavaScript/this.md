# this

```javascript
var fn = function (one, two) {
  console.log(one, two);
};
var r = {},
  g = {},
  b = {};
fn(g, b);

// 结果：{},{}
```

```javascript
var fn = function (one, two) {
  console.log(this, one, two);
};
var r = {},
  g = {},
  b = {};
fn(g, b);

// 结果：{}<global>,{},{}
```

```javascript
var fn = function (one, two) {
  console.log(this, one, two);
};
var r = {},
  g = {},
  b = {};
setTimeout(fn, 1000);

// 结果：{}<global>,undefined, undefined
```

> this 绑定值的规则：找到函数调用的那一行代码，查找点符号，并查看这个点符号的左侧

总结：

1. 由`new`调用？ --> 绑定到新创建的对象
2. 由`call`或者`apply`（或者`bind`）调用？ --> 绑定到指定的对象
3. 由上下文对象调用？ --> 绑定到那个上下文对象上
4. 默认：在严格模式下绑定到`undefined`，否则绑定到全局对象

> ES6 中的箭头函数并不会使用上面的绑定规则，而是根据当前的词法作用域来决定 this，
> 也就是说，箭头函数会继承外层函数调用的 this 绑定，
> 更通俗的说，这其实和 ES6 之前代码中的`self = this`机制是一样的
