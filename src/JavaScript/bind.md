# bind

- 有时看到另一种 `bind` 函数的方法，类似下面的语句：

`this.foo = ::this.foo;`

> 上面的语句 👆 等同于下面的语句 👇：

`this.foo = this.foo.bind(this);`

- 这里所使用的两个冒号的`::`操作符叫做 `bind` 操作符，虽然有 `babel` 插件支持这种写法，但是 `bind` 操作符可能不会成为 ES 标准语法的一部分，这里留意一下
