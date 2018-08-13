### 作用域

  - ES5 中的作用域
  ```javascript
  const callback = [];
  for(var i = 0; i <= 2; i++){
    callback[i] = function(){
      return i * 2
    }
  }
  
  console.table([
    callback[0](),
    callback[1](),
    callback[2]()
  ]) 
  ```