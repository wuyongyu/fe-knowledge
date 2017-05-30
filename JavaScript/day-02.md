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