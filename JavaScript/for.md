for
===

- for语句的语法

```markdown
for(initialize; expression; increment)
    statement
```

- 等价于while循环

```javascript
initialize;
while(expression){
    statement;
    increment
}
```

- for-in语句

`for(property in expression) statement`

---

- 数组遍历

```javascript
var o = {
  // "属性名": "值"
};
var keys = Object.keys(o); // 获取o对象属性名组成的数组
var values = []; // 在数组中存储匹配属性的值
for(var i = 0, len = keys.length; i < len; i++){
  
  if(!keys[i]) continue; // 跳过null、undefined和不存在的元素
  if(keys[i] === undefined) continue; // 跳过undefined + 不存在的元素
  if(!(i in keys)) continue; // 跳过不存在的元素
  
  values[i] = o[keys[i]]; // 在values数组中保持属性值
}

// 可以使用 for/in 循环处理稀疏数组，不存在的索引将不会遍历到
var sparseArray = [1,,3];
for(var index in sparseArray){
  
  if(!sparseArray.hasOwnProperty(index)) continue; // 跳过继承的属性
  if(String(Math.floor(Math.abs(Number(index)))) !== index) continue; // 跳过不是非负整数的index
  
  console.log("索引值：",index, "数组值：", sparseArray[index]);
}
```