# CSS

> 1、空格的格式

```css
/* not good */
.element {
  color: red !important;
  background-color: rgba(0, 0, 0, 0.5);
}

/* good */
.element {
  color: red !important;
  background-color: rgba(0, 0, 0, 0.5);
}
```

---

```css
/* not good */
.element,
.dialog {
  ...;
}

/* good */
.element,
.dialog {
  ...;
}
```

---

```css
/* not good */
.element {
  ...;
}

/* good */
.element {
  ...;
}
```

---

```css
/* not good */
@if{
  ...;
} @else {
  ...;
}

/* good */
@if{
  ...;
} @else {
  ...;
}
```

> 2、换行的格式

```css
/* not good */
.element {
  color: red;
  background-color: black;
}

/* good */
.element {
  color: red;
  background-color: black;
}

/* not good */
.element,
.dialog {
  ...;
}

/* good */
.element,
.dialog {
  ...;
}
```

> 3、注释的格式

```css
/* Modal header */
.modal-header {
  ...;
}

/*
 * Modal header
 */
.modal-header {
  ...;
}

.modal-header {
  /* 50px */
  width: 50px;

  color: red; /* color red */
}
```

> 4、命名的格式

```css
/* class */
.element-content {
  ...;
}

/* id */
#myDialog {
  ...;
}

/* 变量 */
$colorBlack: #000;

/* 函数 */
@function pxToRem($px) {
  ...;
}

/* 混合 */
@mixin centerBlock {
  ...;
}

/* placeholder */
%myDialog {
  ...;
}
```

5、颜色的格式

```css
/* not good */
.element {
  color: #abcdef;
  background-color: #001122;
}

/* good */
.element {
  color: #abcdef;
  background-color: #012;
}
```
