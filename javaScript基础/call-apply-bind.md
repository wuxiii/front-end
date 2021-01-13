# 实现 call,apply,bind

call,apply,bind 三者都可以改变 this 的指向

下面分别自己实现三个方法

## call 和 apply 的实现

call 和 apply 做了两件事情

- 改变了 this 的指向，指向到传入的第一个参数
- 执行函数

实现思路

- 将函数设为对象的属性
- 执行该函数
- 删除该函数
- 返回结果

两者的不同点

- call 方法第一个参数是要绑定给 this 的值，后面传入的是一个参数列表。当第一个参数为 null、undefined 的时候，默认指向 window
- apply 接受两个参数，第一个参数是要绑定给 this 的值，第二个参数是一个数组。当第一个参数为 null、undefined 的时候，默认指向 window

```js
//es6的实现方式
Function.prototype.call = function () {
  let [thisArg, ...restArgs] = arguments;
  if (!thisArg) {
    // 区分node环境和浏览器环境
    thisArg = typeof window === "undefined" ? global : window;
  }
  thisArg.func = this;
  let result = thisArg.func(...restArgs);
  delete thisArg.func;
  return result;
};

Function.prototype.apply = function () {
  let [thisArg, argsArr] = arguments;
  if (!thisArg) {
    thisArg = typeof window === "undefined" ? global : window;
  }
  thisArg.func = this;
  let result = argsArr ? thisArg.func(...argsArr) : thisArg.func();
  delete thisArg.func;
  return result;
};

// 不使用es6的特性
Function.prototype.call2 = function () {
  var context = arguments[0];
  if (!context) {
    context = typeof window === "undefined" ? global : window;
  }
  context.fn = this;
  var args = [];
  // 此时的循环从下标1开始的
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push("arguments[" + i + "]");
  }
  var result = eval("context.fn(" + args + ")");
  delete context.fn;
  return result;
};
```

## bind 的实现方式
