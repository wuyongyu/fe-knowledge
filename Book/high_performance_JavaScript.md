高性能JavaScript
===

为什么优化是必要的
---

Why optimization is necessary?

- IE6的JavaScript引擎是采用“静态垃圾回收机制”，也就是该引擎只监视内存中固定数量的对象来确定何时进行垃圾回收。
- 解释性的代码都比编译性的代码慢。因为解释性的代码需要经历代码转化成计算机指令的过程，也就是解释器中的代码怎么写，就被怎么执行。而且编译器是基于词法分析去判断代码想实现什么，然后产生出能完成任务的运行代码最快的机器码来进行优化。

下一代JavaScript引擎
---

Next-Generation JavaScript Engines

- Chrome 的V8引擎，V8是一款为 JavaScript 打造的实时编译引擎（JIT），它把 JavaScript 代码转化为机器码来执行，所以给人的感觉是 JavaScript 执行速度特别快
- Safari 的Nitro引擎（SquirrelFish Extreme）
- FireFox 的TraceMonkey引擎
