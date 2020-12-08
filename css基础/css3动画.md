## css3 动画

CSS3 中有三个关于动画的样式属性 transform、transition 和 animation

- transform：2d 或 3d 转换
- transition：过渡效果
- animation：动画

### transform 用法

通过 transform 属性可以对元素进行 2d 或者 3d 的转换

通过 transform-origin 属性设置变换的原点

- 用法： transform-origin: x-axis y-axis z-axis;
- 默认值：transform-origin：50% 50% 0

x,y 可以取值

- left
- center
- right
- length
- %

z 可以取值

- length

#### 2d 转换的方法

- translate(x,y) 元素从其当前位置移动，根据给定的 left（x 坐标） 和 top（y 坐标） 位置参数
- rotate(angle) 定义 2D 旋转的角度
- scale(x,y) 定义 2D 缩放转换，改变元素的宽度和高度，可分开使用 scaleX()/scaleY()
- skew(x-angle,y-angle) 定义 2D 的倾斜转换，沿 x 轴 y 轴,可分开使用 skewX()/skewY()
- matrix(a,b,c,d,e,f) ef 分别控制 xy 轴的位移，ad 控制在 xy 轴方向的缩放比。translate(30,30) = matrix(~~0,0,0,0~~,30,30)，scale(s1x,s2y) = matrix(s1,~~0,0~~,s2,~~0,0~~)

参考[理解 CSS3 transform 中的 Matrix(矩阵)](https://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-%E7%9F%A9%E9%98%B5/)

### transition 用法

CSS3 过渡是元素从一种样式逐渐改变为另一种的效果。

要实现这一点，必须规定两项内容：

- 规定您希望把效果添加到哪个 CSS 属性上
- 规定效果的时长

| 属性                       | 描述                                         | 取值                                                      |
| -------------------------- | -------------------------------------------- | --------------------------------------------------------- |
| transition                 | 简写属性，用于在一个属性中设置四个过渡属性。 |
| transition-property        | 规定应用过渡的 CSS 属性的名称。              | 默认 all，多个属性用逗号隔开                              |
| transition-duration        | 定义过渡效果花费的时间。默认是 0。           |
| transition-timing-function | 规定过渡效果的时间曲线。默认是 "ease"。      | liner，ease，ease-in，ease-in-out ，cubic-bezier(n,n,n,n) |
| transition-delay           | 规定过渡效果何时开始。默认是 0。             |

### 动画 animation

使用 @keyframes 中创建动画时，请把它捆绑到某个选择器，否则不会产生动画效果。

通过规定至少以下两项 CSS3 动画属性，即可将动画绑定到选择器：

- 规定动画的名称
- 规定动画的时长
