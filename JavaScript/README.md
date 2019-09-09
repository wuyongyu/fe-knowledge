JavaScript
===

> 1、空格格式

```javascript
// not good
var a = {
    b :1
};

// good
var a = {
    b: 1
};

```

---

```javascript
// not good
++ x;
y ++;
z = x?1:2;

// good
++x;
y++;
z = x ? 1 : 2;
```

---

```javascript
// not good
var a = [ 1, 2 ];

// good
var a = [1, 2];
```

---

```javascript
// not good
var a = ( 1+2 )*3;

// good
var a = (1 + 2) * 3;
```

---

```javascript
// not good
for(i=0;i<6;i++){
    x++;
}

// good
for (i = 0; i < 6; i++) {
    x++;
}
```

> 2、换行格式

```javascript
// not good
var a = {
    b: 1
    , c: 2
};

x = y
    ? 1 : 2;

// good
var a = {
    b: 1,
    c: 2
};

x = y ? 1 : 2;
x = y ?
    1 : 2;
```

> 3、函数声明

```javascript
// not good
[1, 2].forEach(function x() {
    ...
});

// good
[1, 2].forEach(function() {
    ...
});
```

---

```javascript

// not good
var a = [1, 2, function a() {
    ...
}];

// good
var a = [1, 2, function() {
    ...
}];
```

> 4、判断undefined

```javascript
// not good
if (person === undefined) {
    ...
}

// good
if (typeof person === 'undefined') {
    ...
}
```
