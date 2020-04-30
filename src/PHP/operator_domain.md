# 域运算符

- :: 是范围解析操作符，也叫 域运算符

- 【两个冒号就是对类中的方法的静态引用】
- 例子：

```php
class A
{
    static $count = 0;
    static function a()
    {
        // code
    }
    function f()
    {
        self::a();
        self::$count;
    }
}
```
