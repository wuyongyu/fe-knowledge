栈
===

- 实现栈

  ```javascript
  function Stack(){
  
    var items = [];

    this.push = function(element){
      return items.push(element);
    };

    this.pop = function(){
      return items.pop();
    };

    this.peek = function(){
      return items[items.length - 1];
    };

    this.isEmpty = function(){
      return items.length === 0
    };

    this.size = function(){
      return items.length;
    };

    this.clear = function(){
      items = [];
    };

    this.print = function(){
      console.log(items.toString());
    };
  }
  ```

- 从十进制到二进制
    ```javascript
    function divideBy2(decNumber){

      var remStack = new Stack(),
          rem,
          binaryString = '';

      while(decNumber > 0){
        rem = Math.floor(decNumber % 2);
        remStack.push(rem);
        decNumber = Math.floor(decNumber / 2);
      }

      while(!remStack.isEmpty()){
        binaryString += remStack.pop().toString();
      }

      return binaryString;
    }
    ```

- 从十进制到二进制（单独写法）

  ```javascript
  function divideBy2(inputNumber){

    var remainder,
        binaryString = '',
        items = [];

    while(inputNumber > 0){
      remainder = Math.floor(inputNumber % 2);
      items.push(remainder);
      inputNumber = Math.floor(inputNumber / 2);
    }

    while(items.length !== 0){
      binaryString += items.pop().toString();
    }

    return binaryString;
  }
  ```

- 从十进制到二进制、八进制、十六进制

  ```javascript
    function divideByBase(inputNumber, base){
      var remainder,
          binaryString = '',
          items = []
          digits = '0123456789ABCDEF';
      while(inputNumber > 0){
        remainder = Math.floor(inputNumber % base);
        items.push(remainder);
        inputNumber = Math.floor(inputNumber / base);
      }
  
      while(items.length !== 0){
        binaryString += digits[items.pop()];
      }
  
      return binaryString;
    }
  ```

- 简洁写法

  ```javascript
    function divideByBase(inputNumber, base){

      var items = [], 
          digits = '0123456789ABCDEF', 
          binaryString = '';

      while(inputNumber > 0){
        items.push(Math.floor(inputNumber % base));
        inputNumber = Math.floor(inputNumber / base);
      }

      while(items.length !== 0){
        binaryString += digits[items.pop()];
      }
  
      return binaryString;
    }
  ```

- 喜欢的写法

  ```javascript
  function a(b,c){
    var d = [], e = '', f = '0123456789ABCDEF';

    while(b > 0){
        d.push(Math.floor(b % c));
        b = Math.floor(b / c);
    }
    while(d.length !== 0){
      e += f[d.pop()];
    }
    return e;
  }
  ```