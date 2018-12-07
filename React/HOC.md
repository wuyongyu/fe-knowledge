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
---

高阶组件的应用

- 代理方式的高阶组件

  - 操纵`prop`
  - 抽取状态
  - 访问`ref`
  - 包装组件
  ```React
  export default () => WrappedComponent => class A extends Component {
    render(){
      const { ...otherProps } = this.props;
      return <WrappedComponent {...otherProps} />
    }
  }
  ```
> 返回的新组件类直接继承自 **React.Component** 类，新组件扮演的角色传入参数组件的一个代理，在新组件的 **render** 函数中，将被包裹组件渲染出来，除了高阶组件自己要做的工作，其余功能全部转手给了被包裹的组件

- 继承方式的高阶组件
  - 操纵prop
  - 操纵生命周期函数
  ```react
  export default () => WrappedComponent => class A extends WrappedComponent {
    render(){
      const { user, ...otherProps } = this.props;
      this.props = otherProps;
      return super.render()
    }
  }
  ```

> 采用继承关联作为参数的组件和返回的组件，假如传入的组件参数是 **WrappedComponent**，那么返回的组件就直接继承自 **WrappedComponent**
