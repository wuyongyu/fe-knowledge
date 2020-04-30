# 操作符

- -> 是插入式解引用操作符，调用由引用传递参数的子程序的方法。
- => 操作符常用于数组操作中， -> 操作符常用于类、对象的操作中
- 例子：

```php
$user -> friend_count  // 取对象的friend_count
$t -> homeTimelint($p) // 调用对象的homeTimeline方法，方法传入一个参数$p
```
