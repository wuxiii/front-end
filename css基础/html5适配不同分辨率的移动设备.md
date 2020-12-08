## 关于 html5 要适应各种分辨率的移动设备

### 方法一

通过媒体查询设置根 HTML 的 font-size

缺点：计算太过麻烦，机型太多找到合适的值不太容易

```css
html {
  font-size: 10px;
}
@media screen and (min-width: 321px) and (max-width: 375px) {
  html {
    font-size: 11px;
  }
}
@media screen and (min-width: 376px) and (max-width: 414px) {
  html {
    font-size: 12px;
  }
}
@media screen and (min-width: 415px) and (max-width: 639px) {
  html {
    font-size: 15px;
  }
}
@media screen and (min-width: 640px) and (max-width: 719px) {
  html {
    font-size: 20px;
  }
}
@media screen and (min-width: 720px) and (max-width: 749px) {
  html {
    font-size: 22.5px;
  }
}
@media screen and (min-width: 750px) and (max-width: 799px) {
  html {
    font-size: 23.5px;
  }
}
@media screen and (min-width: 800px) {
  html {
    font-size: 25px;
  }
}
```

### 方法二

rem 计算法

如设计稿使用的是 iphone6 宽度为 750px，假设设计稿的 html font-size 为 100px，那么设计稿的宽度就是 7.5rem，设计稿有个 div 的宽度是 200px，此时转换之后成 2rem。那么在代码中 使用 document.documentElement.clientWidth 获取设备的宽度，此时真实的 html 的 font-size = document.documentElement.clientWidth/7.5 px,div 的宽度还是 2rem

如果要采用这个做法还需设置

```html
<meta
  name="viewport"
  content="initial-scale=1,maximum-scale=1, minimum-scale=1"
/>
```

参考[从网易与淘宝的 font-size 思考前端设计稿与工作流](https://www.cnblogs.com/lyzg/p/4877277.html)
