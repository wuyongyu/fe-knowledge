NaN理解
===

- 判断一个值是否是NaN，标准的库函数isNaN也不可靠

比如：

```javascript
isNaN(NaN); // true
isNaN(undefined); // true
isNaN({}); // true
```

- 可以通过下面的函数进行判断

```javascript
function isReallyNaN(x){
  return x !== x;
}
```