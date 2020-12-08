## line-height

行高指文字的高度，具体来讲就是指两行文字间基线之间的距离。vertical-aligin 属性中的 top，middle，baseline，bottom 与之关联的。

- 一个没有高度的 div 包裹文字，撑开这个容器的不是文字的大小，而是 line-height，而这个 line-height 在 inLine box 模型中就是这个 box 的高度，**而 line boxes 的高度取决于它的下属职员的最高高度**
- line-height 有垂直居中的特性
- 多行文字居中实现方法：

```HTML
<p class="mulit_line">
    <span style="font-size:12px;">这里是高度为150像素的标签内的多行文字，文字大小为12像素。
    <br />这里是第二行，用来测试多行的显示效果。
    </span><i>&nbsp;</i>
</p>
```

```css
.mulit_line {
  line-height: 150px;
  border: 1px dashed #cccccc;
  padding-left: 5px;
}
.mulit_line span {
  display: -moz-inline-stack;
  display: inline-block;
  line-height: 1.4em;
  vertical-align: middle;
}
.mulit_line i {
  width: 0;
  display: -moz-inline-stack;
  display: inline-block;
  vertical-align: middle;
  font-size: 0;
}
```

参考[https://www.zhangxinxu.com/wordpress/2009/11/css%E8%A1%8C%E9%AB%98line-height%E7%9A%84%E4%B8%80%E4%BA%9B%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%E5%8F%8A%E5%BA%94%E7%94%A8/]
