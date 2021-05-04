# ajax

## 什么是 ajax

AJAX 是异步的 JavaScript 和 XML（Asynchronous JavaScript And XML）。简单点说，就是使用 XMLHttpRequest 对象与服务器通信。 它可以使用 JSON，XML，HTML 和 text 文本等格式发送和接收数据。

## 使用方法

```js
//
var xhr = new XMLHttpRequest();

xhr.open(get, url, true);
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) {
    if (xhr.status == 200) {
      success(xhr.responseText);
    } else {
      /** false **/
      fail && fail(xhr.status);
    }
  }
};
xhr.send();
```

## 原理

- ajax 的原理简单是在用户和服务器之间加了一个中间层（ajax 引擎），通过 XMLHttpRequest 对象向服务器发送异步请求,从服务器获取数据，通过 js 的 dom 操作局部更新页面内容
- ajax 的过程只涉及 js，XMLHttpRequest 和 dom。XMLHTTPRequest 是 ajax 的核心
