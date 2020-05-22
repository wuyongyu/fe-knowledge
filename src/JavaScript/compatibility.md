# 兼容性

- 全局变量 `DEBUG` 作为调试模式的开关，需要先检查 `DEBUG` 是否已被声明。顶层的全局变量声明 `var DEBUG = true` 只在 `debug.js` 文件中才有，因此要避免出现 `ReferenceError` 错误。

```javascript
// 这样会抛出错误
if (DEBUG) {
  // Todo
}

// 这样是安全的
// if (typeof DEBUG !== 'undefined) {
//   // Todo
// }
```
