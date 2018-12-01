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
```

> random()函数生成的随机数大于等于0，但不会等于1。这样生成的随机数字并不是非常有用，因此将随机数字乘以想要的元素然后加1，最后再用 **Math** 类的 `floor()` 函数确定最终结果