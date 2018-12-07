高阶组件（High Order Component, HOC）
===

- 高阶组件就是接受一个组件作为参数并返回一个新组件的函数
- 高阶组件时一个函数，并不是组件

高阶函数基本概念
===

- 函数可以作为参数被传递
- 函数可以作为返回值输出

---

为什么需要高阶组件?

- 多个组件都需要某个相同的功能，使用高阶组件减少重复实现

> 重复是优秀系统设计的大敌 -- Robert C.Martin

---

高阶组件示例

- react-redux中的connect

`export default connect(mapStateToprops, mapDispatchToProps)(Header)`

---

使用高阶组件

1. higherOrderComponent(WrappedComponent);

2. @ higherOrderComponent
   - 在 **create-react-app** 中使用装饰器
     - `npm run eject`
   - 安装相关插件
     - `npm install babel-proset-stage-2 --save-dev`
     - `npm install babel-proset-react-native-stage-0 --save-dev`
   - 在根目录下创建 `.babelrc`
     ```
     {
        "presets": ["react-native-stage-0/decorator-support"]
     }
     ```
