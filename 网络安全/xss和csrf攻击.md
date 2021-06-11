# xss 和 csrf 攻击

## xss 攻击

Cross-Site Scripting(跨站脚本攻击),简称 xss ,是一种代码注入攻击,攻击者通过在目标网站上注入恶意脚本,使之在用户的浏览器上运行,利用这个些恶意脚本获取用户敏感信息如 cookie,sessionid 等,从而危害网络安全

### xss 攻击原理

恶意代码未经过滤,被注入到正常的网站中,路蓝旗无法分辨哪些脚本是可靠的,导致恶意脚本被执行
必要条件: 1.构造恶意脚本 2.脚本内容在浏览器中展示

### xss 攻击的分类

- 反射型 通过 url 浏览器 -> 后端 -> 浏览器
- 存储型 数据存储在数据库中 浏览器 -> 后端 -> 数据库 -> 后端 -> 浏览器
- Dom 型 前端输入 URL -> 浏览器

  现代框架像 vue,react,angula 等纯前端渲染框架有已经很少见 xss 攻击了

#### 反射型

1. 攻击者构造特殊的 url,包含恶业代码
2. 用户打开恶意代码的 url,网站服务端中引用 url 的数据拼接返回给浏览器
3. 浏览器接到后,解析,并执行恶意代码
4. 恶意代码被执行后窃取用户敏感信息

例如,现有 http://localhost:8080/#/?content=<img src="xxx" onerror="alert(123)">,当用户点击后数据传给后台服务器,服务器响应后将 content 的内容拼接后返回给浏览器,解析后浏览器会自动执行里面的脚本代码,从而形成攻击.

#### 存储型

一般多见于评论输入

1. 用户输入包含恶意代码的评论,并提交服务器
2. 服务器数据库存储数据
3. 浏览器回显当前的评论,就执行了恶意代码

#### Dom

1. 攻击者构造出特殊的 URL，其中包含恶意代码。
2. 用户打开带有恶意代码的 URL。
3. 用户浏览器接收到响应后解析执行，前端 JavaScript 取出 URL 中的恶意代码并执行。
4. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

### 预防存储型和反射型 XSS 攻击

- 改成纯前端渲染，把代码和数据分隔开,如现代的框架 vue,react。
- 对 HTML 做充分转义

### 预防 DOM XSS 攻击

DOM 型 XSS 攻击，实际上就是网站前端 JavaScript 代码本身不够严谨，把不可信的数据当作代码执行了。

在使用 .innerHTML、.outerHTML、document.write() 时要特别小心，不要把不可信的数据作为 HTML 插到页面上，而应尽量使用 .textContent、.setAttribute() 等。

如果用 Vue/React 技术栈，并且不使用 v-html/dangerouslySetInnerHTML 功能，就在前端 render 阶段避免 innerHTML、outerHTML 的 XSS 隐患。

DOM 中的内联事件监听器，如 location、onclick、onerror、onload、onmouseover 等，<a> 标签的 href 属性，JavaScript 的 eval()、setTimeout()、setInterval() 等，都能把字符串作为代码运行。如果不可信的数据拼接到字符串中传递给这些 API，很容易产生安全隐患，请务必避免。

## csrf 攻击

CSRF（Cross-site request forgery 跨站请求伪造，也被称为“One Click Attack”或者 Session Riding，通常缩写为 CSRF 或者 XSRF，是一种对网站的恶意利用。

### csrf 攻击原理

攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。

1. 受害者登录 a.com，并保留了登录凭证（Cookie）。
2. 攻击者引诱受害者访问了 b.com。
3. b.com 向 a.com 发送了一个请求：a.com/act=xx。浏览器会…
4. a.com 接收到请求后，对请求进行验证，并确认是受害者的凭证，误以为是受害者自己发送的请求。
5. a.com 以受害者的名义执行了 act=xx。
6. 攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让 a.com 执行了自己定义的操作。

必要条件: 被攻击的网站必须是登录状态保留了登录凭证（Cookie)

### csrf 攻击的分类

- get 类型 发送 get 请求
- post 类型 发送 gpost 请求
- 连接类型 用户主动点击链接才会触发
