# toString 详解

## Function.prototype.toString()

toString() 方法返回一个表示当前函数源代码的字符串。Function 对象覆盖了从 Object 继承来的 toString 方法。对于用户定义的 Function 对象，toString 方法返回一个**字符串**，其中包含用于定义函数的源文本段。

在 Function 需要转换为字符串时，通常会自动调用函数的 toString 方法。

规则如下：

1. 普通的方法调用 toString 方法，返回当前函数源代码的字符串
2. 若使用 call 或者 apply 传入的 this 不是 Function 对象则抛出 TypeError 异常
3. 如果是在内置函数或由 Function.prototype.bind 返回的函数上调用 toString()，则 toString() 返回原生代码字符串.
4. 若是在由 Function 构造器生成的函数上调用 toString() ，则 toString() 返回创建后的函数源码，包括形参和函数体，函数名为 "anonymous"

```js
function f() {}
// 普通方法toString() result:'function f(){}'

class A {
  a() {}
}
//  普通类方法 toString() result:
// 'class A {
//  a() {}
//  }'

Function.prototype.toString.call('foo');
// TypeError 若使用 call 或者 apply 传入的 this 不是 Function 对象则抛出 TypeError 异常

Function.prototype.toString;
// 内置函数 toString result: function toString() { [native code] }

function f() {}.bind(0)
// bind的返回函数 toString result: function { [native code] }

Function("a", "b")
//构造器函函数 toString result："function anonymous(a\n) {\nb\n}"
```

```js
先定义一个当前页面全局的一个变量接受 table
var table = layui.tabel

然后请求数据
ajax(url,function(){
  //回调函数中调用 table.render
  if(data){
  table.render
  }
})
// 此时第一个过程就完成了
// 第二个过程，提交的完成后重新获取数据，这里使用ajax去提交时的流程
ajax(uri,function(){
  // 提交成功后
  if(data){
    //这个ajax是获取table的数据，要区别这两个请求
    ajax(uri,function(){
        //再调用tabel.reload()

    })
  }
})
```
