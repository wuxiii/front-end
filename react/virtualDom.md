# virtualDom

## 创建 virtualDom

jsx 经过 bable 编译后会转换成`React.createElement`方法

```jsx
<div className="container">
  <h3>Hello React</h3>
  <p>React is great </p>
</div>
```

```jsx
React.createElement(
  "div",
  {
    className: "container",
  },
  React.createElement("h3", null, "Hello React"),
  React.createElement("p", null, "React is great")
);
```

createElement 接收多个参数，第一个为 dom 的 type，第二个为 dom 的 props，后面的为 dom 的 children，返回值就是一个虚拟 dom 对象

## 将 virtualDom 转换成真实 dom

通过调用 render 方法可以将 Virtual DOM 对象更新为真实 DOM 对象

render 方法接受三个参数，第一个为 virtualDom，第二个为挂载 virtualdom 的节点，第三个为渲染完成之后的回调函数
