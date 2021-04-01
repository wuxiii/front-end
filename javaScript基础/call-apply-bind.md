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

bind 函数的特点

1. 返回一个函数
2. 可以传入参数
3. bind 可以传入部分参数，返回的函数可以传入剩余的参数

```js
var foo = {
  value: 1,
};

function bar(name, age) {
  console.log(this.value);
  console.log(name);
  console.log(age);
}

var bindFoo = bar.bind(foo, "daisy");
bindFoo("18");
// 1
// daisy
// 18
```

实现代码：

```js
// funcA.bind(thisArg, args)
Function.prototype.bind = function () {
  // this指向funcA
  const self = this;
  // thatArg 为thisArg 传入的第一个产参数
  const thatArg = arguments[0];
  //处理bind参数
  const bindArgs = Array.prototype.slice.call(arguments, 1);
  const result = function () {
    const restArgs = Array.prototype.slice.call(arguments);
    return self.apply(thatArg, args.concat(bindArgs));
  };
  const FNop = function () {};
  fnop.prototype = this.prototype;
  result.prototype = new FNop();

  return result;
};
```

```js
const obj = {
  name: "en?",
  getName: function (age) {
    console.log(`${this.name}今年${age}岁了！`);
  },
};
const otherObj = { name: "hahaha" };
Function.prototype.myBind = function (bindThis, ...args) {
  // 保存当前调用的函数
  const self = this,
    // 用于维护返回的 bindFn 的原型链
    NilFn = function () {},
    // 定义bind之后维护的函数，该函数可传参
    bindFn = function (...bindArgs) {
      return self.apply(
        // 构造函数 this 绑定优先
        this instanceof bindFn ? this : bindThis,
        args.concat(bindArgs)
      );
    };
  // 维护原型关系，被绑定的函数存在自己的原型则继承它，否则直接继承自空函数的原型
  if (this.prototype) {
    NilFn.prototype = this.prototype;
  }
  bindFn.prototype = new NilFn();
  return bindFn;
};

const res = obj.getName.myBind(otherObj);
res(3); // hahaha今年3岁了！
```

```js
 Function.prototype.call=function(){
  let [thisArg, argsArr] = arguments;
   thisArg.fuc = this
   const result =  thisArg.fuc(..argArr)
   delete thisArg.fuc
   return result
 }


Function.prototype.bind = function(){
let [_this,..arg] = argument
const self = this

}
```
