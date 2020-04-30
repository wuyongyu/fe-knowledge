# 常量

- ES5 中常量的写法

  ```javascript
  Object.defineProperty(window, "PI", {
    value: 3.1415926,
    writable: false,
  });
  ```

- ES6 中常量的写法

  `const PI = '3.1415926';`
