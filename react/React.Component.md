# React.Component

在 react 中定义 class 组件需要继承 React.Component ，这个子类中必须有一个 render 函数。

官方强烈建议你不要创建自己的组件基类。 在 React 组件中，代码重用的主要方式是组合而不是继承。

## 生命周期

### 挂载

<!-- prettier-ignore -->
- [construct()](#construct) 
- [componentDidUpdate()](#componentdidupdate) 
- [shouldComponentUpdate()](#shouldcomponentupdate) 
- [static getDerivedStateFromProps()](#static-getderivedstatefromprops)

> UNSAFE_componentWillMount()已被标记为过期

### 更新

- static getDerivedStateFromProps()
- [shouldComponentUpdate](#shouldcomponentupdate)
- render()
- getSnapshotBeforeUpdate()
- [componentDidUpdate()](#componentdidupdate)

> UNSAFE_componentWillUpdate()
> UNSAFE_componentWillReceiveProps()
> 已被标记为过期

### 卸载

- componentWillUnmount

## 两个用于更新组件的 api

- setState()
- forceUpdate()

## 两个 class 属性

- defaultProps
- displayName

## 两个实例属性

- props
- state

## construct()

通常在 react 中构造函数仅用于以下两种情况

- 通过给 this.state 赋值，初始化内部的 state
- 为事件添加绑定实例

```js
constructor(props) {
  super(props);
  // 不要在这里调用 this.setState()
  //初始化内部的 state
  this.state = { counter: 0 };
  //为事件添加绑定实例
  this.handleClick = this.handleClick.bind(this);
}
```

应在其他语句之前前调用 super(props)。否则，this.props 在构造函数中可能会出现未定义的 bug。

## componentDidUpdate()

```js
componentDidUpdate(prevProps, prevState, snapshot);
```

## shouldComponentUpdate()

```js
shouldComponentUpdate(nextProps, nextState){
    if(...){
        // 返回false时跳过更新。但不会阻止子组件的重新渲染
        return false
    }else{
         // 默认返回true
        return true
    }
};
```

## static getDerivedStateFromProps()

getDerivedStateFromProps 会在调用 render 方法之前调用，它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。此方法用于 state 的值在任何时候都取决于 props

```js
static getDerivedStateFromProps(props, state)

```

## getSnapshotBeforeUpdate()

```js
getSnapshotBeforeUpdate(prevProps, prevState){
    // 返回snapshot 的值（或 null）这个返回值讲会传给componentDidUpdate的第三个参数
    return
};
```

## Error boundaries

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  // 此生命周期会在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state
  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染可以显示降级 UI
    return { hasError: true };
  }

  // componentDidCatch() 会在“提交”阶段被调用，因此允许执行副作用。 它应该用于记录错误之类的情况：
  componentDidCatch(error, info) {
    // "组件堆栈" 例子:
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    logComponentStackToMyService(info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // 你可以渲染任何自定义的降级 UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```
