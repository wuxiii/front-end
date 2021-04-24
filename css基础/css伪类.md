# 伪类

CSS 伪类 是添加到选择器的关键字，指定要选择的元素的特殊状态。例如，:hover 可被用于在用户将鼠标悬停在按钮上时改变按钮的颜色。

## 常见的伪类

```css
/* 未访问链接 */
a:link {
  color: blue;
}
/* 已访问链接 */
a:visited {
  color: purple;
}
/* 用户鼠标悬停 */
a:hover {
  background: yellow;
}
/* 激活链接 */
a:active {
  color: red;
}
/* 激活段落 */
p:active {
  background: #eee;
}
```

:nth-child(an+b)

:nth-child(an+b) 这个 CSS 伪类首先找到所有当前元素的兄弟元素，然后按照位置先后顺序从 1 开始排序，选择的结果为 CSS 伪类:nth-child 括号中表达式（an+b）匹配到的元素集合（n=0，1，2，3...）。示例：

```html
<!-- html 1,3,5,7 背景色为黄色 -->
<div class="first">
  <span>Span 1!</span>
  <span>Span 2</span>
  <span>Span 3!</span>
  <span>Span 4</span>
  <span>Span 5!</span>
  <span>Span 6</span>
  <span>Span 7!</span>
</div>

<!-- css -->
.first span:nth-child(2n+1){ background-color: yellow; }
```
