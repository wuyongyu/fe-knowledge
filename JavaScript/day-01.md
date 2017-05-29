#### 1.JS中为什么有的()中需要引号，有的却不需要引号？

答：document.createElement("input")这段可以这样理解，document是文档对象，createElement()是文档对象的一个方法，而这是input这个方法传递的参数，是一个字符串。还有body.appendChild(input)里面的input提前定义好的一个变量，变量是个容器，里面可以装字符串、数字、对象等等。

例子：
```javascript
var input="hello word!";
document.write(input); // 这个表示输出input这个变量，结果：hello word!
document.write("input"); // 这个表示输出input这个字符串，结果：input
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

答：indexOf()方法可返回某个指定的字符串值在字符串中首次出现的位置。
> 如果没有找到匹配的字符串则返回-1。

`string.indexOf(searchvalue,start)`

    1.参数searchvalue：必需。规定需检索的字符串值。
    2.参数start：可选的整数参数。规定在字符串中开始检索的位置。它的合法取值是0到string Object.length - 1。如省略该参数，则将从字符串的首字符开始检索。
    3.返回值Number：查找指定字符串第一次出现的位置，如果没找到匹配的字符串则返回 -1。

例子：
```javascript
var str = "Hello world, welcome to the universe";
str.indexOf('e',5); // 返回值：14
```
说明：在字符串第五个位置开始查找字符 "e" 第一次出现的位置

#### 9.JS中String对象的search()方法有什么用？
答：search() 方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。
> 如果没有找到任何匹配的子串，则返回-1。

`string.search(searchvalue)`

    1.参数searchvalue：必须。查找的字符串或者正则表达式。
    2.返回值Number：与指定查找的字符串或者正则表达式相匹配的 String 对象起始位置。

例子：
```javascript
var str = "Hello world, welcome to the universe";
str.search(/we/i); // 返回值：13
```
说明：执行一次忽略大小写的检索。

#### 10.JS中String对象的indexOf()方法与search()方法的区别?

答：首先要明确search()的参数必须是正则表达式，而indexOf()的参数只是普通字符串。indexOf()是比search()更加底层的方法。

> 如果只是对一个具体字符串来查找，那么使用indexOf()的系统资源消耗更小，效率更高；如果是查找具有某些特征的字符串（比如查找以a开头，后面是数字的字符串），那么indexOf()就无能为力，必须要使用正则表达式和search()方法了。

很多时候用indexOf()不是为了真的想知道子字符串的位置，而是想知道长字符串中没有包含这个子字符串。如果返回索引值是-1，那么说明没有，否则就说明有。

总的来说，一般情况下indexOf比search更省资源。

#### 11.JS中的slice()方法有什么用？

答：slice()方法可提取字符串的某个部分，并以新的字符串返回被提取的部分。
> slice()方法不会改变原始数组。

1.在Array对象中

`array.slice(start, end)`
    
    1.参数start：必需。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2指倒数第二个元素，以此类推。
    2.参数end：可选。规定从何处结束选取。该参数是数组片断结束处的数组下标。如果没有指定该参数，那么切分的数组包含从 start到数组结束的所有元素。如果这个参数是负数，那么它规定的是从数组尾部开始算起的元素。
    3.返回值Array：返回一个新的数组，包含从start到end（不包括该元素）的arrayObject中的元素。

例子：
```javascript
var arr = ['appe', 'origin', 'banana', 'mango', 'lemon'];
arr.slice(1,3); // 返回值： ["origin", "banana"]
```
2.在String对象中

`string.slice(start,end)`

    1.参数start：必须。要抽取的片断的起始下标。第一个字符位置为 0。
    2.参数end：可选。紧接着要抽取的片段的结尾的下标。若未指定此参数，则要提取的子串包括start到原字符串结尾的字符串。如果该参数是负数，那么它规定的是从字符串的尾部开始算起的位置。
    3.返回值String：提取的字符串。

slice(start, end)方法可提取字符串的某个部分，并以新的字符串返回被提取的部分。

使用start（包含）和end（不包含）参数来指定字符串提取的部分。

字符串中第一个字符位置为0, 第二个字符位置为1, 以此类推。

提示：如果是负数，则该参数规定的是从字符串的尾部开始算起的位置。也就是说，-1指字符串的最后一个字符，-2指倒数第二个字符，以此类推。

例子：
```javascript
var str="www.baidu.com";
str.slice(4,9); // 返回值："baidu"
```

#### 12.JS中Array对象的splice()方法有什么用？

答：splice()方法用于插入、删除或替换数组的元素。

`arr.splice(index, howmany, item1,…, itemX)`

    1.参数index：整数，规定了添加/删除元素的位置，使用负数可从数组结尾处规定位置。
    2.参数howmany：整数，要删除的元素的数量。如果设置为0，则不会删除元素。如果添加元素则这里应该设置为0。
    3.参数itemX：整数，向数组添加的新项目。在添加的时候用。
    4.返回值Array：如果从 arrayObject 中删除了元素，则返回的是含有被删除的元素的数组。

> splice()方法会改变原始数组。

例子：
```javascript
var arr = ["apple", "orange", "pear", "lemon"];
arr.splice(2,1,"banana","mango"); // 返回值：["pear"]
console.log(arr); // 结果：["apple", "orange", "banana", "mango", "lemon"]
```
说明：移除数组的第三个元素，并在数组第三个位置添加新元素

#### 13.JS中String对象的split()方法有什么用？

答：split()方法用于把一个字符串分割成字符串数组。

`string.split(separator,limit)`

    1.参数separator：可选。字符串或正则表达式，从该参数指定的地方分割 string Object。
    2.参数limit：可选。该参数可指定返回的数组的最大长度。如果设置了该参数，返回的子串不会多于这个参数指定的数组。如果没有设置该参数，整个字符串都会被分割，不考虑它的长度。
    3.返回值Array：一个字符串数组。该数组是通过在 separator 指定的边界处将字符串 string Object 分割成子串创建的。返回的数组中的字串不包括 separator 自身。   
提示：如果把空字符串 ("") 用作 separator，那么 stringObject 中的每个字符之间都会被分割。

> split() 方法不改变原始字符串。

例子：
```javascript
var str="Hello world";
str.split(" ",2); // 返回值：["Hello", "world"]
```
说明：使用limit参数，将输出2个数组的值。

#### 14.JS中的Array对象中的slice、splice、和String对象的split的区别？

答：slice()方法可提取字符串的某个部分，并以新的字符串返回被提取的部分（不改变原数组）。

splice()方法用于插入、删除或替换数组的元素（改变原数组）。

split()方法用于把一个字符串分割成字符串数组（不改变原字符串）。

#### 15.JS中String对象的substr()方法有什么用？

答：substr()方法可在字符串中抽取从start下标开始的指定数目的字符。
> substr()方法不会改变源字符串。

提示：substr()的参数指定的是子串的开始位置和长度，因此它可以替代slice()和substring()来使用。

在IE4中，参数start的值无效。在这个BUG中，start规定的是第0个字符的位置。在之后的版本中，此BUG已被修正。

ECMAscript没有对该方法进行标准化，**因此反对使用它**。

`string.substr(start,length)`

    1.参数start：必需。要抽取的子串的起始下标。必须是数值。如果是负数，那么该参数声明从字符串的尾部开始算起的位置。也就是说，-1指字符串中最后一个字符，-2指倒数第二个字符，以此类推。
    2.参数length：可选。子串中的字符数。必须是数值。如果省略了该参数，那么返回从stringObject的开始位置到结尾的字串。
    3.返回值String：一个新的字符串，包含从stringObject的 start（包括start所指的字符）处开始的length个字符。如果没有指定length，那么返回的字符串包含从start到stringObject的结尾的字符。

例子：
```javascript
var str = "Hello world"
str.substr(6,5); // 返回值："world"
```

#### 16.JS中String对象的substring()方法有什么用？

答：substring()方法用于提取字符串中介于两个指定下标之间的字符。
  
substring()方法返回的子串包括`开始`处的字符，但不包括`结束`处的字符。

> 重要事项：与slice()和substr()方法不同的是，substring() 不接受负的参数。

`string.substring(from, to)`
    
    1.参数from：必需。一个非负的整数，规定要提取的子串的第一个字符在stringObject中的位置。
    2.参数to：可选。一个非负的整数，比要提取的子串的最后一个字符在stringObject中的位置多1。如果省略该参数，那么返回的子串会一直到字符串的结尾。
    3.返回值String：一个新的字符串，包含从stringObject的 start（包括start所指的字符）处开始的length个字符。如果没有指定length，那么返回的字符串包含从start到stringObject的结尾的字符。  

例子：
```javascript
var str = "Hello world"
str.substring(6,11); // 返回值："world"    
```
#### 17.JS中String对象的slice()方法，substr()和substring()的区别

答：首先，他们都接收两个参数，slice()方法和substring()方法接收的是起始位置和结束位置(不包括结束位置)，而substr()方法接收的则是起始位置和所要返回的字符串长度。

然后，当接收的参数是负数时，slice()方法的start如果为负数，会从尾部算起，-1表示倒数第一个，-2表示倒数第2个，此时end必须为负数，并且是大于start的负数，否则返回空字符串；substr()方法的end参数表示要截取的长度,若该参数为负数或0，都将返回空字符串；substring()则干脆将负参数都直接转换为0。

> 注意：IE对substr()方法接收负值的处理有错，它会返回原始字符串。

例子：
```javascript
var str = "Hello world";
str.slice(-5); // 返回值："world"
str.substr(-5); // 返回值："world"
str.substring(-5); // 返回值："Hello world"

str.slice(0,-6); // 返回值："Hello"
str.substr(0,-6); // 返回值：""
str.substring(5,-6); // 返回值："Hello"
```

#### 18.JS中String对象的replace()方法有什么用？

答：replace()方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。

> 该方法不会改变原始字符串。

`string.replace(searchvalue,newvalue)`

    1.参数searchvalue：必须。规定子字符串或要替换的模式的RegExp对象。
    2.参数newvalue：必需。一个字符串值。规定了替换文本或生成替换文本的函数。
    3.返回值String：一个新的字符串，是用replacement替换了regexp的第一次匹配或所有匹配之后得到的。
    
例子：
```javascript
var str = "Hello world";
str.replace(/world/gi,'yori'); // 返回值："Hello yori"
```
说明：执行一个全局替换，当"world"被找到，它就被替换为"yori"。

