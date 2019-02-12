高性能JavaScript
===

为什么优化是必要的
---

Why optimization is necessary?

- IE6的JavaScript引擎是采用“静态垃圾回收机制”，也就是该引擎只监视内存中固定数量的对象来确定何时进行垃圾回收。
- 解释性的代码都比编译性的代码慢。因为解释性的代码需要经历代码转化成计算机指令的过程，也就是解释器中的代码怎么写，就被怎么执行。而且编译器是基于词法分析去判断代码想实现什么，然后产生出能完成任务的运行代码最快的机器码来进行优化。

下一代JavaScript引擎
---

Next-Generation JavaScript Engines

- Chrome 的V8引擎，V8是一款为 JavaScript 打造的实时编译引擎（JIT），它把 JavaScript 代码转化为机器码来执行，所以给人的感觉是 JavaScript 执行速度特别快
- Safari 的Nitro引擎（SquirrelFish Extreme）[SquirrelFish 金鳞鱼]
- FireFox 的TraceMonkey引擎

第一章、加载和执行
---

Loading and Execution

- 减少 JavaScript 对性能的影响
  - `</body>`闭合标签之前，将所有的`<script>`标签放到页面底部。因为能保证在脚本执行前，页面已经完成渲染
  - 合并脚本。加载速度更快，响应速度也更快
  - 使用`<script>`脚本的defer属性
  - 使用动态创建的`<script>`元素来下载并执行代码
  - 使用 XHR 对象下载 JavaScript 代码并注入代码中

第二章、数据存取
---

Data Access

- JavaScript引擎存取的内部属性`[[scope]]`包含一个函数被创建时的作用域中对象的集合。这个内部属性也可以叫做作用域链，它可以决定哪些数据能被这个函数访问到

- 执行函数时，会创建一个执行环境（也可以叫执行上下文）的活动对象。【注意，函数每次执行时，对应的执行环境都是独一无二的，所以多次调用同一个函数就会导致创建多个执行环境。当函数执行完毕之后，执行环境就会被销毁】活动对象包含了所有`局部变量`、`命名参数`、`参数集合`以及`this`。==> 然后这个活动对象会被推入到作用域链的最前端，当执行环境被销毁，活动对象也随之被销毁

- 全局作用域总是存在于执行环境的作用域链的最末端，因此全局作用域的读写速度也是最慢的。因为在执行环境的作用域中，一个标识符所在的位置越深，它的读写速度就越慢。==> 综上所述，1、建议尽可能使用局部变量；2、如果某个跨作用域的值被引用超过一次以上，就把它存储到局部变量里面

- 闭包允许访问作用域以外的数据。「一句话的精髓」

- 在大部分浏览器中，通过点表示法（Object.name）操作和通过括号表示法（Object["name"]）操作并没有明显的区别。只有在Safari中，点表示法始终会更快一些而已。

- 通常来说，在一个函数中，如果要多次读取同一个对象属性，最佳的做法是将属性值保存到局部变量中。因为局部变量能用来替代属性，以避免多次查找带来的性能开销

第三章、DOM编程
---

DOM Scripting

```javascript
// 较慢
function collectionGlobal(){
  var coll = document.getElementsByTagName('div'),
    len = coll.length,
    name = '';
  for(var count = 0; count < len; count++){
    name = document.getElementsByTagName('div')[count].nodeName;
    name = document.getElementsByTagName('div')[count].nodeType;
    name =document.getElementsByTagName('div')[count].tagName;
  }
  return name;
}

// 较快
function collectionGlobal(){
  var coll = document.getElementsByTagName('div'),
    len = coll.length,
    name = '';
  for(var count = 0; count < len; count++){
    name = coll[count].nodeName;
    name = coll[count].nodeType;
    name = coll[count].tagName;
  }
  return name;
}

// 最快
function collectionGlobal(){
  var coll = document.getElementsByTagName('div'),
    len = coll.length,
    name = '',
    el = null;
  for(var count = 0; count < len; count++){
    el = coll[count];
    name = el.nodeName;
    name = el.nodeType;
    name = el.tagName;
  }
  return name;
}
```

- 在老版本IE中，`nextSibling` 比 `childNode`表现更优异，在 IE6 中，`nextSibling`快16倍，而 IE7 中，则是105倍，所以更推荐使用 `nextSibling` 方法来查找 DOM 节点。

- 帧（frames）
- 盒（boxes）
- 内边距（padding）
- 外边距（margins）
- 边框（border）
- 位置（position）
- 绘制（paint）
- 重绘（repaint）
- 重排（reflow）
- 文档片段（document fragment）
- 偏移量（offsets）
- 滚动位置（scroll values）
- 计算出的样式值（computedstyle values）

> 事件委托（Event Delegation）

```html
<ul id="menu">
  <li>
    <a href="menu.html">menu</a>
  </li>
</ul>
```

```javascript
document.getElementById('menu').onclick = function(e) {
  // 浏览器 target
  e = e || window.event;
  var target = e.target || e.srcElement;

  // 只关心 href，非链接点击则退出
  if (target.nodeName !== 'A') {
    return;
  }

  // 浏览器组织默认行为取消冒泡
  if (typeof e.preventDefault === 'function') {
    e.preventDefault();
    e.stopPropagation();
  } else {
    e.returnValue = false;
    e.cancelBubble = true;
  }
}
```

第四章、算法和流程控制
---

Algorithms and Flow Control

> 代码数量少并不意味着运行速度就快（之前一直以为代码越少越好，看来too young too simple），代码数量越多也不意味着运行速度就慢。`代码的组织结构`和`解决具体问题的思路`是影响代码性能的主要原因

- 循环性能（Loop Performance）

```javascript
const props = ["prop1", "prop2"],
      len = props.length;
let i = 0;
// 循环类型的选择应该基于需求而不是性能
while(i < len){
  process(object[props[i++]]);  // 一次函数调用（process(object["prop1"])）
}
```

- 达夫设备（Duff’ Device）

```javascript
// 迭代数超过1000，旧浏览器的执行效率会明显提升。了解就行
var iterations = Math.floor(items.length / 8),
    startAt = items.length % 8,
    i = 0;
do {
  switch(startAt){
    case 0: process(items[i++]);
    case 7: process(items[i++]);
    case 6: process(items[i++]);
    case 5: process(items[i++]);
    case 4: process(items[i++]);
    case 3: process(items[i++]);
    case 2: process(items[i++]);
    case 1: process(items[i++]);
  }
  startAt = 0;
} while (iterations--);  // 书中有误
```

- 查找表（Lookup Tables）

```javascript
// 将返回值集合存入数组
var results = [result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10];
// 返回当前结果
return results[value];
```

- 递归模式（Recursion Patterns）

```javascript
// 直接递归模式
function recurse(){
  recurse();
}

recurse();

// 隐伏模式
function first(){
  second();
}
function second(){
  first();
}

first();
```

第五章、字符串和正则表达式
---

String and Regular Expressions

> 将正则表达式赋给变量以避免对它们重新编译

```javascript
// 不好的写法
while(/regex1/.test(str1)){
  /regex2/.exec(str2);
  // ...
}
// 好的写法
var regex1 = /regex1/,
    regex2 = /regex2/;
while(regex1.test(str1)){
  regex2.exec(str2);
  // ...
}
```

- 使用正则表达式去除首尾空白（Trimming with Regular Expressions）
- [regular expressions 101 -- 好用！！！](https://regex101.com/)

```javascript
if(!String.prototype.trim){
  String.prototype.trim = function() {
    return this.replace(/^\s+/, "").replace(/\s+$/, "");
    // 第二种方式
    // return this.replace(/^\s+|\s+$/g, "");
    // 第三种方式
    // return this.replace(/^\s*([\s\S]*?)\s*$/, "$1");
    // 第四种方式
    // return this.replace(/^\s*([\s\S]*\S)?\s*$/, "$1");
    // 第五种方式
    // return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
  }
}
```