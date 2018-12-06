数组方法
===

- join()

```javascript
var a = [1, 2, 3];
a.join(); // => "1, 2, 3"
a.join(""); // => "123"
a.join(" "); // => "1 2 3"
var b = new Array(10); // 长度为10的空数组
b.join("-"); // => "---------": 九个连字号组成的字符串
```

> Array.join()方法是String.split()方法的逆向操作，  
Array.join()方法将数组中所有的元素都转为字符串并连接在一起，返回最后生成的字符串。  
String.split()方法将字符串分割成若干块来创建一个数组

- sort()

```javascript
var a = new Array("banana", "cherry", "apple");
a.sort();
var s = a.join(); // s => "apple, cherry, banana"

var a = [];
a.sort(); // 字母表顺序: 1111, 222, 33, 4
a.sort(function(a, b){ // 数值顺序: 4, 33, 222, 1111
  return a - b; // 根据顺序，返回复数、0、正数
})
```