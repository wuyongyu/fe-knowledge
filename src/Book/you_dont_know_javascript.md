# [你不知道的 JavaScript](https://github.com/getify/You-Dont-Know-JS/tree/1ed-zh-CN)

> 第一部分 作用域和闭包

## 第一章、作用域是什么

What is Scope

- 编译原理（Compiler Theory）

  - 编译的三个步骤
    - 分词/词法分析（Tokenizing/Lexing）
      - 将一连串字符打断成有意义的片段，称为 `token`（记号）
    - 解析/语法分析（Parsing）
      - 将一个 `token` 的流（数组），转换为一个嵌套元素的树，它综合地表示程序的语法结构。
      - 这棵树称为抽象语法树（`AST`，Abstract Syntax Tree）
    - 代码生成（Code-generation）
      - 将抽象语法树转换为可以执行的代码

- 理解作用域（Understand Scope）

  - 对于一个变量赋值，发生两个不同的动作：第一、`编译器`声明一个变量（如果先前没有在当前`作用域`中声明过），第二、当执行时，`引擎`在`作用域`中查询这个变量并给它赋值，如果找到的话。
    - **引擎（Engine）**：负责所有的编译和执行 JavaScript 程序
    - **编译器（Compiler）**：处理所有的解析和代码生成的重活儿
    - **作用域（Scope）**：收集并维护一张所有被声明的标识符（变量）的列表，并对当前执行中的代码如何访问这些变量强制实施一组严格的规则

- 编译器术语（Complier Speak）

  - 赋值操作的目标是谁（LHS，Left-Hand Side）和谁是赋值操作的源头（RHS，Right-Hand Side）

  ```javascript
  function foo(a) {
    var b = a;
    return a + b;
  }

  var c = foo(2);
  ```

  1. 所有 LHS 查询有 3 处  
     **`c = ..`、 `a = 2（隐含的参数赋值）` 和 `b = ..`**
  2. 所有 RHS 查询 4 处  
     **`foo(2..`、 `= a`、 `a + ..` 和 `.. + b`**

## 第二章、词法作用域

Lexical Scope

- `eval(..)`，在（运行时）修改已经存在的词法作用域
- `with`，在（运行时）创建一个新的词法作用域

## 第三章、函数作用域和块作用域

Function vs Block Scope

- IIFE（Immediately Invoked Function Expression，立即被调用的函数表达式）
  - `(function(){ .. })()`和`(function(){ .. }())`在功能上是一样的，取决于自己的偏好的风格选择
- 从 ES3 开始，`try/catch` 结构在 `catch`子句上拥有块作用域

## 第四章、提升

Hosting

```js
foo(); // typeError
bar(); // ReferenceError

var foo = function bar() {
  // ...
};
```

- 使用提升，可以解释为：

```js
var foo;

foo(); // TypeError
bar(); // ReferenceError

foo = function() {
  var bar = ...self...
  // ...
}
```

## 第五章、作用域闭包

> 第二部分 this 和对象原型

## 第六章、关于 this

## 第七章、this 全面解析

## 第八章、对象

## 第九章、原型

## 第十章、行为委托
