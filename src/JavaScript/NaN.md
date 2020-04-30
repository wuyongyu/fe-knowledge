# NaN 理解

- 判断一个值是否是 NaN，标准的库函数 isNaN 也不可靠

比如：

```javascript
isNaN(NaN); // true
isNaN(undefined); // true
isNaN({}); // true
```

- 可以通过下面的函数进行判断

```javascript
function isReallyNaN(x) {
  return x !== x;
}
```

---

- `NaN`其实是属于 `Number` 类型，`Object.prototype.toString.call(NaN)` 返回的是 "[object Number]"
