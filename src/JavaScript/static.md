# static

- static 关键词为一个类定义了一个静态方法。静态方法不会在类的实例上被调用。相反，会被类本身调用

```javascript
class ClassWithStaticMethod {
  static staticMethod() {
    return "static method has been called";
  }
}
console.log(ClassWithStaticMethod.staticMethod);
```
