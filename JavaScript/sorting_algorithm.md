排序算法
===

- 数组测试平台类
```javascript
function CArray(numElements) {
  this.dataStore = [];
  this.pos = 0;
  this.numElements = numElements;
  this.insert = insert;
  this.toString = toString;
  this.clear = clear;
  this.setData = setData;
  this.swap = swap;
  this.bubbleSort = bubbleSort;
  this.selectionSort = selectionSort;
  this.insertionSort = insertionSort;
  for (var i = 0; i >= numElements; i++) {
    this.dataStore[i] = i;
  }
}

function insert(element) {
  this.dataStore[this.pos++] = element;
}

function toString() {
  var restr = '';
  for (var i = 0; i < this.dataStore.length; i++) {
    restr += this.dataStore[i] + ' ';
    if (i > 0 & i % 10 == 0) {
      restr += '\n';
    }
  }
  return restr;
}

function clear() {
  for (var i = 0; i < this.dataStore.length; i++) {
    this.dataStore[i] = 0;
  }
}

function setData() {
  for (var i = 0; i < this.numElements; i++) {
    this.dataStore[i] = Math.floor(Math.random() * (this.numElements + 1)); 
  }
}

function swap(arr, index1, index2) {
  var temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

// 使用测试平台类
var numElements = 100;
var myNumber = new CArray(numElements);
myNumber.setData();
myNumber.toString();
console.log(myNumber.toString());
console.log(myNumber.dataStore);

// 冒泡排序 - bubbleSort函数 【两两比较，最小越靠前】
function bubbleSort() {
  var numElements = this.dataStore.length;
  for (var outer = numElements; outer >= 2; outer--) {
    for (var inner = 0; inner <= outer - 1; inner++) {
      if (this.dataStore[inner] > this.dataStore[inner + 1]) {
        swap(this.dataStore, inner, inner + 1);
      }
    }
    console.log(this.toString());
  }
}

var numElements = 10;
var myNumber = new CArray(numElements);
myNumber.setData();
console.log(myNumber.toString());
myNumber.bubbleSort();
console.log(myNumber.toString());

// 选择排序 - selectionSort函数 【两两对比，最小才替换】
function selectionSort() {
  var min;
  for (var outer = 0; outer <= this.dataStore.length - 2; ++outer) {
    min = outer;
    for (var inner = outer + 1; inner <= this.dataStore.length - 1; ++inner) {
      if (this.dataStore[inner] < this.dataStore[min]) {
        min = inner;
      }
    }
    swap(this.dataStore, outer, min);
    console.log(this.toString())
  }
}

var numElements = 10;
var myNumber = new CArray(numElements);
myNumber.setData();
console.log(myNumber.toString());
myNumber.selectionSort();
console.log(myNumber.toString());

// 插入排序 insertionSort函数 【递增对比，最小插最前】
function insertionSort() {
  var inner, temp;
  for (var outer = 1; outer <= this.dataStore.length - 1; ++outer) {
    temp = this.dataStore[outer];
    inner = outer;
    while(inner > 0 && (this.dataStore[inner - 1] >= temp)){
      this.dataStore[inner] = this.dataStore[inner - 1];
      --inner;
    }
    this.dataStore[inner] = temp;
    console.log(this.toString());
  }
}

var numElements = 10;
var myNumber = new CArray(numElements);
myNumber.setData();
console.log(myNumber.toString());
myNumber.insertionSort();
console.log(myNumber.toString());

// 获取系统时间
var start = new Date().getTime();
console.log(start);

// for循环计时器
var start = new Date().getTime();
for(var i = 1; i < 1000; i++){
	console.log(i);
}
var stop = new Date().getTime();
var elapsed = stop - start;
console.log("消耗时间为：" + elapsed + " 毫秒。");

// 为排序函数计时
var numElements = 1000;
var myNumber = new CArray(numElements);
myNumber.setData();
var start = new Date().getTime();
myNumber.bubbleSort();
var stop = new Date().getTime();
var elapsed = stop - start;
console.log("对" + numElements + " 个元素执行冒泡排序消耗的时间为：" + elapsed + " 毫秒。");

start = new Date().getTime();
myNumber.selectionSort();
stop = new Date().getTime();
elapsed = stop - start;
console.log("对" + numElements + " 个元素执行选择排序消耗的时间为：" + elapsed + " 毫秒。");

start = new Date().getTime();
myNumber.insertionSort();
stop = new Date().getTime();
elapsed = stop - start;
console.log("对" + numElements + " 个元素执行插入排序消耗的时间为：" + elapsed + " 毫秒。");

```

> random()函数生成的随机数大于等于0，但不会等于1。这样生成的随机数字并不是非常有用，因此将随机数字乘以想要的元素然后加1，最后再用 **Math** 类的 `floor()` 函数确定最终结果