#### 1.JS中为什么有的()中需要引号，有的却不需要引号？

答：document.createElement("input")这段可以这样理解，document是文档对象，createElement()是文档对象的一个方法，而这是input这个方法传递的参数，是一个字符串。还有body.appendChild(input)里面的input提前定义好的一个变量，变量是个容器，里面可以装字符串、数字、对象等等。

例子：
```javascript
var input="hello word!";
document.write(input); // 这个表示输出input这个变量，结果是：hello word!
document.write("input"); // 这个表示输出input这个字符串，结果是：input
```
#### 2.函数重载是什么？在JS中会怎么样？

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
#### 3.什么是形参，什么是实参？

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

#### 4.参数的传递方式有哪些？

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

#### 5.说说你对arguments的理解？

答：arguments是在函数体内，标识符arguments是指向实参对象的引用。arguments并不是真正的数组，它是一个实参对象。

每个实参对象都包含以数字为索引的一组元素以及length属性，但它毕竟不是真正的数组。可以理解它是对象，只是碰巧具有以数字为索引的属性。

实参对象的数组元素是函数形参所对应实参的别名，实参对象中以数字索引，并且形参名称可以认为是相同变量的不同命名。
 
> 在非严格模式中，函数里的arguments仅仅是一个标识符，在严格模式中，它变成了一个保留字。
  
#### 6.JS的标志符(名字)是什么，有哪些？保留字(关键字)是什么，有哪些？

答：标识符就是给变量、函数和对象等指定的名字。构成标识符的字母是有一定的规范，JavaScript语言中标识符的命名规则是区分大小写，Myname与myname是两个不同的标识符。

例子：  
`identifier`，`userName`，`User_Name`，`_sys_val`，`$change`等为合法的标识符，而`2mail`，`room#`，`class`为非法的标识符。

保留字是语言中定义具有特殊含义的标识符，保留字不能作为标识符使用。JavaScript语言中定义了一些具有专门的意义和用途的保留字，这些保留字称为关键字

例子：
`break`、`delete`、`function`、`return`、`typeof`、`case`、`do`、`if`、`switch`、`var`、`catch`、`else`、`in`、`this`、`void`、`continue`、`false`、`instanceof`、`throw`、`while`、`debugger`、`finally`、`new`、`true`、`const`、`with`、`default`、`for`、`null`和`try`。
> 未来JavaScript版本使用的

`class`、`enum`、`export`、`extends`、`import`和`super`。

> 要记住的是在JavaScript中关键字大小写敏感的，因此class和Class是不同的，Class也当然不是JavaScript的保留字。

#### 7. jQuery中click和HTML DOM事件对象中onclick的区别?
答：其中click是方法，而onclick是事件，两者是不同的概念。

1.click()方法的主要作用是触发调用click方法元素onclick事件，实际上是模拟了鼠标的点击动作。此外，如果在click括号内定义了其他可执行语句，则click方法会在执行完onclick事件之后执行括号内部的语句。

2.onclick是绑定事件，告诉浏览器在鼠标点击时候要做什么。

> click方法中的function代码会在onclick事件执行完后执行，此时click方法起到追加事件的作用。

例子：
```html
    <button type="button" id="test" onclick="change()">测试</button>

```

```javascript
    $(function() {
        $('#test').click(function() {
            alert('world')
        });
    });
    function change() {
        alert('hello')
    }
```
说明：弹出框的弹出顺序先是'hello'，然后是'world'。

#### 8.JS中String对象的indexOf()方法有什么用？
答：

`string.indexOf(searchvalue,start)`

    1.参数searchvalue：必需。规定需检索的字符串值。
    2.参数start：可选的整数参数。规定在字符串中开始检索的位置。它的合法取值是0到string Object.length - 1。如省略该参数，则将从字符串的首字符开始检索。
> indexOf()方法可返回某个指定的字符串值在字符串中首次出现的位置。  
如果没有找到匹配的字符串则返回-1。

例子：
```javascript
    var str = "Hello world, welcome to the universe";
    str.indexOf('e',5); // 结果：14
```
说明：在字符串第五个位置开始查找字符 "e" 第一次出现的位置

#### 9.JS中String对象的search()方法有什么用？
答：

`string.search(searchvalue)`

    1.参数searchvalue：必须。查找的字符串或者正则表达式。
> search() 方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。  
如果没有找到任何匹配的子串，则返回-1。

例子：
```javascript
    var str = "Hello world, welcome to the universe";
    str.search(/we/i); // 结果：13
```
说明：执行一次忽略大小写的检索。

#### 10.JS中String对象的indexOf()方法与search()方法的区别?
答：首先要明确search()的参数必须是正则表达式，而indexOf()的参数只是普通字符串。indexOf()是比search()更加底层的方法。

> 如果只是对一个具体字符串来查找，那么使用indexOf()的系统资源消耗更小，效率更高；如果是查找具有某些特征的字符串（比如查找以a开头，后面是数字的字符串），那么indexOf()就无能为力，必须要使用正则表达式和search()方法了。

很多时候用indexOf()不是为了真的想知道子字符串的位置，而是想知道长字符串中没有包含这个子字符串。如果返回索引值是-1，那么说明没有，否则就说明有。

总的来说，一般情况下indexOf比search更省资源。

#### 11.JS中的slice()方法有什么用？
答：  
1.在Array对象中

`array.slice(start, end)`
    
    1.参数start：必需。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2指倒数第二个元素，以此类推。
    2.参数end：可选。规定从何处结束选取。该参数是数组片断结束处的数组下标。如果没有指定该参数，那么切分的数组包含从 start 到数组结束的所有元素。如果这个参数是负数，那么它规定的是从数组尾部开始算起的元素。

slice()方法可提取字符串的某个部分，并以新的字符串返回被提取的部分。

> slice() 方法不会改变原始数组。

例子：
```javascript
    var arr = ['appe', 'origin', 'banana', 'mango', 'lemon'];
    arr.slice(1,3); // 结果： ["origin", "banana"]
```
2.在String对象中

`string.slice(start,end)`

    1.参数start：必须. 要抽取的片断的起始下标。第一个字符位置为 0。
    2.参数end：可选。 紧接着要抽取的片段的结尾的下标。若未指定此参数，则要提取的子串包括 start 到原字符串结尾的字符串。如果该参数是负数，那么它规定的是从字符串的尾部开始算起的位置。

slice(start, end)方法可提取字符串的某个部分，并以新的字符串返回被提取的部分。

使用start（包含）和end（不包含）参数来指定字符串提取的部分。

字符串中第一个字符位置为0, 第二个字符位置为1, 以此类推。

提示：如果是负数，则该参数规定的是从字符串的尾部开始算起的位置。也就是说，-1指字符串的最后一个字符，-2指倒数第二个字符，以此类推。

例子：
```javascript
    var str="www.baidu.com";
    str.slice(4,9); // 结果："baidu"
```

#### 12.JS中Array对象的splice()方法有什么用？
答：splice()方法用于插入、删除或替换数组的元素。

`arr.splice(index, howmany, item1,…, itemX)`

    1.参数index：整数，规定了添加/删除元素的位置，使用负数可从数组结尾处规定位置。
    
    2.参数howmany：整数，要删除的元素的数量。如果设置为0，则不会删除元素。如果添加元素则这里应该设置为0。
    
    3.参数itemX：整数，向数组添加的新项目。在添加的时候用。

> splice()方法会改变原始数组。

例子：
```javascript
    var arr = ["apple", "orange", "pear", "lemon"];
    arr.splice(2,1,"banana","mango"); // 结果：["pear"]
    console.log(arr); // 结果：["apple", "orange", "banana", "mango", "lemon"]
```
说明：移除数组的第三个元素，并在数组第三个位置添加新元素

