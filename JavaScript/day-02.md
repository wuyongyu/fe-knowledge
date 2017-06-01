#### 1.JS中的内置对象arguments对象有什么用？

答：argument对象包含了函数调用的参数数组。

> 通过arguments对象可以很方便的找到最大的一个参数的值。

例子：
```javascript
function findMax(){
    var i,max = arguments[0],len = arguments.length;
    if(len < 2){
         return max;
    }
    for(i = 0; i < len; i++){
        if(arguments[i] > max){
            max = arguments[i];
        }
    }
    return max;
}
findMax(11111,2222,333,44444,5555,666666,7777); // 返回值：666666
```
> 通过arguments对象可以创建一个函数用来统计所有数值的和。

例子：
```javascript
function sumAll(){
    var i,sum = 0,len = arguments.length;
    for(i = 0; i < len; i++){
        sum += arguments[i];
    }
    return sum;
}
sumAll(11111,2222,333,44444,5555,666666,7777); // 返回值：738108
```

#### 2.JS中offsetTop和scrollTop的区别是什么？
答：1.offsetTop：当前对象到其上级层顶部的距离，不能对其进行赋值。【此属性是只读的】

> 设置对象到页面顶部的距离请用`style.top`属性

2.scrollTop：对象的最顶部到对象在当前窗口显示的范围内的顶边的距离。【此属性是可读写的】

> 即是在出现了纵向滚动条的情况下，滚动条拉动的距离。

#### 3.JS中全局函数parseInt()函数、parseFloat()函数和Number()函数的区别？
答：

1.parseInt()函数可解析一个字符串，并返回一个整数。

> 只有字符串中的第一个数字会被返回。

> 注意： 开头和结尾的空格是允许的。

`parseInt(string, radix)`
    
    1.参数string：必需。要被解析的字符串。
    2.参数radix：可选。表示要解析的数字的基数。该值介于 2 ~ 36 之间。
    
例子：
```javascript
parseInt('3.14'); // 返回值：3
parseFloat('30 40 50'); // 返回值：30
parseInt(' 40 '); // 返回值：40
parseInt('40 years'); // 返回值：40
parseInt('He was 40'); // 返回值：NaN
parseInt('0xb',16); // 返回值：11
```
2.parseFloat()函数可解析一个字符串，并返回一个浮点数。

> 该函数指定字符串中的首个字符是否是数字。如果是，则对字符串进行解析，直到到达数字的末端为止，然后以数字返回该数字，而不是作为字符串。

`parseFloat(string)`

    1.参数string：必需。要被解析的字符串。
    
例子：
```javascript
parseFloat('3.14'); // 返回值：3.14
parseFloat('30 40 50'); // 返回值：30
parseFloat(' 40 '); // 返回值：40
parseFloat('40 years'); // 返回值：40
parseFloat('He was 40'); // 返回值：NaN
parseFloat('0xb'); // 返回值：0
````

3.Number() 函数把对象的值转换为数字。
> 如果对象的值无法转换为数字，那么 Number() 函数返回 NaN。

`Number(object)`

    1.参数object：可选。一个JavaScript对象。如果没有提供参数，则返回0。
    
例子：
```javascript
Number('3.14'); // 返回值：3.14
Number('30 40 50'); // 返回值：NaN
Number('40 years'); // 返回值： NaN
Number(new Date()); // 返回值：1496299576164
Number(true); // 返回值：1
````
总结：

1.由于Number()函数在转换字符串时比较复杂而且不够合理，因此在处理整数的时候更常用的是parseInt()函数。
    
2.与parseInt()函数类似，parseFloat()也是从第一个字符（位置0）解析每个字符，而且也是一直解析到字符串末尾，或者解析到遇见一个无效的浮点数字字符为止。也就是说，字符串中的第一个小数点是有效的，而第二个小数点就是无效的了，因此它后面的字符串将被忽略。例如："3.14.15"将会转换为3.14。

3.parseFloat()与parseInt()的第二个区别在于它始终都会忽略前导的零。parseFloat()可以识别前面讨论过的所有的浮点数值格式，也包括十进制整数格式。但十六进制格式的字符串则始终会被转换成0。由于parseFloat()只解析十进制值，因此它没有用第二个参数指定基数的用法。
```