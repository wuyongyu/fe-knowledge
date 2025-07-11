# 为什么会出现Margin塌陷

根本原因是 CSS 盒模型的设计者希望简化垂直距离的计算，让文档排版更直观。 如果父、子或相邻元素的上下外边距总是累加，开发者很难掌握真实的间距；合并后只需关心最大的那个 margin 即可。

横向 margin（left/right）永远不会塌陷，只发生在 垂直方向。

# Margin塌陷问题如何解决

比如两个div，上面的div的 margin-bottom 为200px，下面的div的 margin-top 为 100px，那么他们之间的间距是200px，取重叠部分的最大值。如果想要间距 300px，则需要给两个div 触发BFC

# BFC是什么

BFC 是 块级格式上下文（Block Formatting Context），一个独立的渲染区域，有自己的渲染规则，与外部元素互不影响

# 怎么触发BFC

1、设置 float 属性（值不为none）
2、设置 overflow 属性（值不为visible）
3、设置 position 为 absolute 或者 fixed
4、设置 display 为 inline-block

