call 和 apply 的区别
===

- apply()
  
  apply方法传入两个参数：一个是作为函数上下文的对象，另一个是作为函数参数所组成的数组

```javascript
  var obj = {
   name : 'yongyu'
  }
  function func(firstName, lastName){
    console.log(firstName + '' + this.name + '' + lastName);
  }
  func.apply(obj, ['A','B']);  // AyongyuB
```

  可以看出，`obj` 是作为函数上下文的对象，函数 `func` 中的 `this` 是指向了 `obj` 对象。参数 `A` 和 `B` 是放在数组中传入 `func` 函数，分别对应 func 参数的列表元素
  
- call()
  
  call方法传入两个参数：一个是作为函数上下文的对象，另一个参数列表，而不是一个数组

```javascript
  var obj = {
    name : 'yongyu'
  }
  
  function func(firstName, lastName){
    console.log(firstName + '' + this.name + '' + lastName);
  }
  func.call(obj, 'C', 'D'); // CyongyuD
```

  对比`apply`，我们可以看到区别，`C` 和 `D` 是作为单独的参数传给 `func` 函数，而不是放到数组中
  
  ---
  
- call 和 apply 用法
  - 改变`this`的指向

    ```javascript
    var obj = {
      name : 'yongyu'
    }
    function func(){
      console.log(this.name);
    }
    func.call(obj);  // yongyu
    ```

    - call方法的第一个参数是作为函数上下文的对象，这里把 `obj` 作为参数传给 `func` ，此时函数中的 `this` 便指向了 `obj` 对象
  - 借用别的对象的方法

    ```javascript
    var Person1 = function(){
      this.name = 'yongyu'
    }
    var Person2 = function(){
      this.getName = function(){
        console.log(this.name);
      }
      Person1.call(this);
    }
    var person = new Person2();
    person.getName();  // yongyu
    ```

    - `Person2`实例化出来的对象 `person` 通过 `getName` 方法拿到了 `Person1` 中的`name`。因为在`Person2`中，`Person1.call(this)`的作用就是使用`Person1对象`代替`this所指向的对象`，那么`Person2对象`里面就有`Person1对象`中的所有属性和方法，相当于`Person2对象`继承了`Person1对象`所有的属性和方法
  - 调用函数

    ```javascript
    function func(){
      console.log('yongyu');
    }
    func.call(); // yongyu
    ```

    - `call`和`apply`都会使函数立即执行，因此它们也可以用来调用函数

---

- 在比较新的浏览器里（Chrome 50+），`call`比`apply`快上一倍。旧一点的JS引擎中`call`甚至能比`apply`快10倍以上
- `apply`在运行前要对作为参数的数组进行一系列检验和深拷贝，`call`则没有这些步骤。具体可以参考[ECMA 5.1 标准](http://www.ecma-international.org/ecma-262/5.1/#sec-15.3.4.3)
