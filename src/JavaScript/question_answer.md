# 1.JS 中的内置对象`arguments`对象有什么用？

答：argument 对象包含了函数调用的参数数组。

> 通过 arguments 对象可以很方便的找到最大的一个参数的值。

例子：

```javascript
function findMax() {
  var i,
    max = arguments[0],
    len = arguments.length;
  if (len < 2) {
    return max;
  }
  for (i = 0; i < len; i++) {
    if (arguments[i] > max) {
      max = arguments[i];
    }
  }
  return max;
}
findMax(11111, 2222, 333, 44444, 5555, 666666, 7777); // 返回值：666666
```

> 通过 arguments 对象可以创建一个函数用来统计所有数值的和。

例子：

```javascript
function sumAll() {
  var i,
    sum = 0,
    len = arguments.length;
  for (i = 0; i < len; i++) {
    sum += arguments[i];
  }
  return sum;
}
sumAll(11111, 2222, 333, 44444, 5555, 666666, 7777); // 返回值：738108
```

## 2.JS 中 offsetTop 和 scrollTop 的区别是什么？

答：1.offsetTop：当前对象到其上级层顶部的距离，不能对其进行赋值。【此属性是只读的】

> 设置对象到页面顶部的距离请用`style.top`属性

2.scrollTop：对象的最顶部到对象在当前窗口显示的范围内的顶边的距离。【此属性是可读写的】

> 即是在出现了纵向滚动条的情况下，滚动条拉动的距离。

## 3.JS 中全局函数`parseInt()`函数、`parseFloat()`函数和 Number()函数的区别？

答：

1.parseInt()函数可解析一个字符串，并返回一个整数。

> 只有字符串中的第一个数字会被返回。

---

> 注意： 开头和结尾的空格是允许的。

`parseInt(string, radix)`

    1.参数string：必需。要被解析的字符串。
    2.参数radix：可选。表示要解析的数字的基数。该值介于 2 ~ 36 之间。

例子：

```javascript
parseInt("3.14"); // 返回值：3
parseFloat("30 40 50"); // 返回值：30
parseInt(" 40 "); // 返回值：40
parseInt("40 years"); // 返回值：40
parseInt("He was 40"); // 返回值：NaN
parseInt("0xb", 16); // 返回值：11
```

2.parseFloat()函数可解析一个字符串，并返回一个浮点数。

> 该函数指定字符串中的首个字符是否是数字。如果是，则对字符串进行解析，直到到达数字的末端为止，然后以数字返回该数字，而不是作为字符串。

`parseFloat(string)`

    1.参数string：必需。要被解析的字符串。

例子：

```javascript
parseFloat("3.14"); // 返回值：3.14
parseFloat("30 40 50"); // 返回值：30
parseFloat(" 40 "); // 返回值：40
parseFloat("40 years"); // 返回值：40
parseFloat("He was 40"); // 返回值：NaN
parseFloat("0xb"); // 返回值：0
```

3.Number() 函数把对象的值转换为数字。

> 如果对象的值无法转换为数字，那么 Number() 函数返回 NaN。

`Number(object)`

    1.参数object：可选。一个JavaScript对象。如果没有提供参数，则返回0。

例子：

```javascript
Number("3.14"); // 返回值：3.14
Number("30 40 50"); // 返回值：NaN
Number("40 years"); // 返回值： NaN
Number(new Date()); // 返回值：1496299576164
Number(true); // 返回值：1
```

总结：

    1.由于Number()函数在转换字符串时比较复杂而且不够合理，因此在处理整数的时候更常用的是parseInt()函数。

    2.与parseInt()函数类似，parseFloat()也是从第一个字符（位置0）解析每个字符，而且也是一直解析到字符串末尾，或者解析到遇见一个无效的浮点数字字符为止。也就是说，字符串中的第一个小数点是有效的，而第二个小数点就是无效的了，因此它后面的字符串将被忽略。例如："3.14.15"将会转换为3.14。

    3.parseFloat()与parseInt()的第二个区别在于它始终都会忽略前导的零。parseFloat()可以识别前面讨论过的所有的浮点数值格式，也包括十进制整数格式。但十六进制格式的字符串则始终会被转换成0。由于parseFloat()只解析十进制值，因此它没有用第二个参数指定基数的用法。

## 4.JS 中表达式和语句的区别

答：

> 表达式会产生一个值，它可以放在任何需要一个值的地方。

---

> 语句可以理解成一个行为，循环语句和 if 语句就是典型的语句。

一个程序是由一系列语句组成的，JavaScript 中某些需要语句的地方，可以使用一个表达式来代替。这样的语句称之为表达式语句，但反过来不可以在一个需要表达式的地方放一个语句。

比如，一个 if 语句不能作为一个函数的参数。

例子：

表达式的定义基本分为：

    1.运算符 表达式(一元，比如!true)
    2.表达式 运算符 表达式(二元，比如1+2)
    3.表达式1 ？表达式2 ：表达式3(三元，比如a>b?a:b)
    4.左括号 表达式 右括号（括号，比如(1+2)）
    5.表达式(参数列表)(函数调用)等

语句的定义基本分为：

    1.for语句
    2.if语句
    3.while语句
    4.switch语句
    5.return
    6.try catch。

总结：

    1.表达式是由运算符构成，并运算产生结果的语法结构。

    2.程序是由语句构成，语句则是由“；（分号）”分隔的句子或命令。

    3.如果在表达式后面加上一个“；”分隔符，这就被称为“表达式语句”。它表明“只有表达式，而没有其他语法元素的语句”。

粗略说法：表达式仅仅算出一个值（不作任何操作），并不改变程序的运行状态。语句并不包含一个值（或者说它所包含的值不用去关心），会改变程序的运行状态。

## 5.JS 中函数表达式和函数声明的区别

答：

> 函数表达式就是将一段匿名函数表达式存储在一个变量中。

---

> 函数声明是使用 function 关键字声明一个函数。

区别：

    1.函数声明之前或声明之后都可以被脚本引用；而函数表达式只能在创建之后才能被引用，且必须按照代码编写的顺序。
    2.函数表达式可以作为另一些函数或方法的参数。
    3.函数表达式和函数语句的内存管理和垃圾回收方面不同
      (a)函数表达式不能像函数声明那样独立存在，它必须赋给一个变量，假如该函数所附加的变量不再可用，那么就无法再访问到这个函数表达式了，它所使用的内存将被回收
      (b)函数声明是以对象的形式独立存在的，无法删除，假如把它赋给一个变量，然后又让该变量等于null，此时只是变量不可再用来调用函数而已，但该函数还是存在的，它所分配的内存并不会被回收。

## 6.JS 中怎么进行手机号码验证？

答：

```javascript
function checkPhone() {
  var phone = document.getElementById("phone").value;
  if (!/^1[34578]\d{9}$/.test(phone)) {
    alert("手机号码有误，请重填");
    return false;
  }
}
```

或者

```javascript
function checkPhone() {
  var phone = document.getElementById("phone").value;
  if (!/^1(3|4|5|7|8)\d{9}$/.test(phone)) {
    alert("手机号码有误，请重填");
    return false;
  }
}
```

说明：

> 我查了一下了解了“小括号就是括号内看成一个整体 ,中括号就是匹配括号内的其中一个”

---

> 正则里面的中括号[]只能匹配其中一个，如果要匹配特定几组字符串的话，那就必须使用小括号()加或|

我还以为在中括号中也能使用或|符号，原来|在中括号里面也是一个字符，并不代表或。

`[34578]`匹配 3 或者 4 或者 5 或者 7 或者 8，而`(34578)`只匹配 34578，若要跟前面一样可以加或`(3|4|5|7|8)`。

`[34|57]`匹配 3 或者 4 或者|或者 5 或者 7，而`(34|57)`能匹配 34 或者 57。

补充：

但也想过，也许这个第二位代码可能随时增加一个，比如以 16 开头呢？19 开头呢？所以还可以不验证第二位规则：

```javascript
var reg = /^1[0-9]{10}$/;
```

## 7.JS 中其他的正则表达式验证有哪些？

答：

> 提取信息中的网络链接:`(h|H)(r|R)(e|E)(f|F) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)?`

---

> 提取信息中的邮件地址:`\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*`

---

> 提取信息中的图片链接:`(s|S)(r|R)(c|C) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)?`

---

> 提取信息中的 IP 地址:`(\d+)\.(\d+)\.(\d+)\.(\d+)`

---

> 提取信息中的中国电话号码（包括移动和固定电话）:`(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}`

---

> 提取信息中的中国邮政编码:`[1-9]{1}(\d+){5}`

---

> 提取信息中的中国身份证号码:`\d{18}|\d{15}`

---

> 提取信息中的整数:`\d+`

---

> 提取信息中的浮点数（即小数）:`(-?\d*)\.?\d+`

---

> 提取信息中的任何数字:`(-?\d*)(\.\d+)?`

---

> 提取信息中的中文字符串:`[\u4e00-\u9fa5]*`

---

> 提取信息中的双字节字符串 (汉字):`[^\x00-\xff]*`

## 8、怎么通过 js 改变样式?

答：

1、第一种方式(`较差`)：

```javascript
var el = document.getElementById("myDiv");
el.style.borderLeft = "1px";
el.style.borderRight = "2px";
el.style.padding = "1px";
```

2、第二种方式(`较好`)：

```javascript
var el = document.getElementById("myDiv");
el.style.cssText = "border-left: 1px; border-right: 2px; padding: 1px;";
```

3、第三种方式(`更好`)：

```javascript
var el = document.getElementById("myDiv");
el.className = "active";
```

> 虽然大部分浏览器对此进行优化，只触发一次重拍，但在旧版本的浏览器仍然效率低下。 第二种方式还可以在`cssText`后面加上字符串，例如：

```javascript
var el = document.getElementById("myDiv");
el.style.cssText = "border-left: 1px; border-right: 2px; padding: 1px;";
el.style.cssText += "; border-left: 2px;";
```

> 第三种方式是修改`CSS`的`class`名称，而不是修改内联样式，更清晰、更易于维护，虽然可能带来轻微的性能影响，因为改变类时需要检查级联样式。

## 9、如果以 0 毫秒的超时时间调用 setTimeout()，会发生什么？

答：1、首先 setTimeout()可以用来注册指定的时间之后单次或者重复调用的函数。它是客户端的全局函数，所以被定义为 window 对象的方法，但作为通用函数，其实它不会对窗口做什么事情。

    例子：setTimeout(f, 0);

2、如果以 0 毫秒的超时时间调用 setTimeout()，那么指定的函数 f 不会立刻执行。相反，会把它放到队列中，等前面处于等待状态的事件处理程序全部执行完成后，再"`立即`"调用它

## 10、如何提取 URL 的搜索字符串中的参数？

答：1、`Location`对象的`search`属性，(search 属性)它返回的是问号之后的 URL，这部分通常是某种类型的查询字符串。

2、使用一个通用函数 urlArgs()进行封装，代码如下：

    /*
     * 这个函数用来解析来自`URL`的查询字符串中name=value参数对
     * 它将name=value对存储在一个对象的属性中，并返回该对象
     *
     * let args = urlArgs();    // 从URL中解析参数
     * args.name = args.name || "";     // 如果参数中定义了的话就使用参数，否则使用一个默认值
     * args.number = parseInt(args.number) || 10;
     */

```javascript
function urlArgs() {
  let args = {}; // 定义一个空对象
  let query = location.search.substring(1); // 查找到查询串，并去掉"？"
  console.log("query:" + query);
  let paris = query.split("&"); // 根据"&"符号查询字符串分隔开
  console.log("paris:" + paris);
  for (let i = 0, len = paris.length; i < len; i++) {
    // 对于每个片段
    let pos = paris[i].indexOf("="); // 查找"name=value"
    if (pos === -1) {
      // 如果没有找到的话，就跳过
      continue;
    }
    let name = paris[i].substring(0, pos); // 提取name
    console.log("name:" + name);
    let value = paris[i].substring(pos + 1); // 提取value
    console.log("value:" + value);
    value = decodeURIComponent(value); // 对value进行解码
    args[name] = value; // 存储为属性
    console.dir(args);
  }
  return args; // 返回解析后的参数
}

let args = urlArgs();
```

## 11、说一说你对 addEventListener()的理解？

答：1、首先`Window`对象、`Document`对象和所有文档元素--都定义了一个名叫`addEventListener()`的方法，使用这个方法可以为`事件目标`**注册**`事件处理程序`。

2、addEventListener 接受三个参数。

    第一个参数：是要注册处理程序的事件类型。
    【注意事项：
        1.这个事件类型(或者名字)是字符串。
        2.它不应该包括用于设置事件处理程序属性的前缀"on"】

    第二个参数：是当指定类型的事件发生时应该调用的函数。

    第三个参数：是布尔值。
    【注意事项：
        1.通常情况下的默认值是false。
        2.如果传递了true，那么函数将注册为捕获事件处理程序，
        并在事件不同的调度阶段调用。
        3.忽略第三个参数会在某些浏览器中出错。
    】

3、相对 addEventListener()的是 removeEventListener()方法，它同样有三个参数，`从对象中删除事件处理程序函数而非添加`，它常用于临时注册事件处理程序，然后不久就删除它

4、例子如下：

```javascript

function handler() {
    console.log("hello world");
}

document.addEventListener"click"', handler, false);

document.removeEventListener"click"', handler, false);
```
