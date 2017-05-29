####1.JS中为什么有的()中需要引号，有的却不需要引号？

答：document.createElement("input")这段可以这样理解，document是文档对象，createElement()是文档对象的一个方法，而这是input这个方法传递的参数，是一个字符串。还有body.appendChild(input)里面的input提前定义好的一个变量，变量是个容器，里面可以装字符串、数字、对象等等。

例子：
```javascript
var input="hello word!";
document.write(input); // 这个表示输出input这个变量，结果是：hello word!
document.write("input"); // 这个表示输出input这个字符串，结果是：input
```
####2.函数重载是什么？在JS中会怎么样？

答：函数重载是相同函数名根据参数的不同，匹配特定函数，从而执行函数的过程。然而在JS中，JS函数不再排斥"异形"函数，缺失了辨别相同函数名的不同函数的过程，相同函数名的情况下，JS调用时，只会执行最后一个所调函数。

例子：
```javascript
function box(a,b,c) {
    console.log('执行第一个函数: ' + a + '+' + b + '=' + (a + b));
}
function box(a,b,c) {
    console.log('执行第二个函数: ' + a + '+' + b + '=' + (a + b));
}
box(1,2,3)  // 结果：执行第二个函数1+2=3
````
####3.什么是形参，什么是实参？

答：形参是定义参数，定义函数参数的名称、类型（当然JS里是弱类型的）等。实参是实际参数，就是在运行时真正传入函数中的参数。

例子：
```javascript
var num_1 = 10;
var arr_1 = ['a','b','c'];
function foo(num, arr) {
   num = 20;
   arr[1] = 'd'
   console.log(num); // 结果：20
}
foo(num_1,arr_1);
console.log(num_1); // 结果：10
console.log(arr_1); // 结果：['a','d','c']
```
说明：

形参：`num`

实参：`num_1`

> 调用函数时传递的实参数目可以大于形参数目，但是最好不要小于形参数目。

例子：
```javascript
var demo = function(m,n) {
    m = m || '1';
    n = n || 2; 
    var sum = m + n;
    console.log(sum);
}
demo(); // 结果：12
```

####4.参数的传递方式有哪些？

答：函数参数的传递有按值传递和引用传递。

例子：
```javascript
var num_1 = 10;
var arr_1 = ['a','b','c'];
function foo(num, arr) {
   num = 20;
   arr[1] = 'd'
   console.log(num); // 结果：20
}
foo(num_1,arr_1);
console.log(num_1); // 结果：10
console.log(arr_1); // 结果：['a','d','c']
```
说明：
按值传递：num_1将数值本身传递给了形参num ，在函数内部修改num，不影响num_1的值。
引用传递：arr_1将对数组的引用（即地址）传递给了形参arr，arr与arr_1指向的是同一个代码块，在函数内部修改arr时，实际上修改的是arr所指向的代码块，必然会影响arr_1。

####5.说说你对arguments的理解？

答：arguments是在函数体内，标识符arguments是指向实参对象的引用。arguments并不是真正的数组，它是一个实参对象。

每个实参对象都包含以数字为索引的一组元素以及length属性，但它毕竟不是真正的数组。可以理解它是对象，只是碰巧具有以数字为索引的属性。

实参对象的数组元素是函数形参所对应实参的别名，实参对象中以数字索引，并且形参名称可以认为是相同变量的不同命名。
 
> 在非严格模式中，函数里的arguments仅仅是一个标识符，在严格模式中，它变成了一个保留字。
  
####6.JS的标志符(名字)是什么，有哪些？保留字(关键字)是什么，有哪些？

答：标识符就是给变量、函数和对象等指定的名字。构成标识符的字母是有一定的规范，JavaScript语言中标识符的命名规则是区分大小写，Myname与myname是两个不同的标识符。

例子：  
`identifier`，`userName`，`User_Name`，`_sys_val`，`$change`等为合法的标识符，而`2mail`，`room#`，`class`为非法的标识符。

保留字是语言中定义具有特殊含义的标识符，保留字不能作为标识符使用。JavaScript语言中定义了一些具有专门的意义和用途的保留字，这些保留字称为关键字

例子：
`break`、`delete`、`function`、`return`、`typeof`、`case`、`do`、`if`、`switch`、`var`、`catch`、`else`、`in`、`this`、`void`、`continue`、`false`、`instanceof`、`throw`、`while`、`debugger`、`finally`、`new`、`true`、`const`、`with`、`default`、`for`、`null`和`try`。
> 未来JavaScript版本使用的

`class`、`enum`、`export`、`extends`、`import`和`super`。

> 要记住的是在JavaScript中关键字大小写敏感的，因此class和Class是不同的，Class也当然不是JavaScript的保留字。



