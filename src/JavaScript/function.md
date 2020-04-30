# 函数

```markdown
function functionName(arg0, arg1, ..., argN){
statements
}
```

---

```javascript
function sum(num1, num2) {
  return num1 + num2;
  console.log("hello world"); // 永远不会执行
}

sum(1, 2); // 3
```

---

```javascript
function displayObject(o) {
  // 如果参数是`null`或者`undefined`则立刻返回
  if (!o) return;
  //其他逻辑
}
```
