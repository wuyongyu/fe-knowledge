# 快速排序

快速排序的核心思想是：挑一个“基准数”，把比它小的放左边，比它大的放右边，然后对左右继续做同样的事。

理解：

假设你有一堆乱七八糟的数字，比如：[6, 3, 8, 5, 2]

步骤 1：选一个基准值（pivot）
一般选数组中间或第一个，比如选 6

步骤 2：分成两组
左边放比 6 小的：[3, 5, 2]

右边放比 6 大的：[8]

步骤 3：对这两组再分别做快速排序
对 [3, 5, 2] 再挑一个基准，如 3：

小的 [2]

大的 [5]

对 [8] 不用排了

步骤 4：把它们拼起来
[2, 3, 5] + [6] + [8] = [2, 3, 5, 6, 8]

```js
const arr = [1,3,2];
function quickSort(arr) {
    if(arr.length <= 1) return arr; // 递归出口：1个或0个元素就返回
    let left = [];  // 放比 pivot 小的
    let right = []; // 放比 pivot 大的
    let pivot = arr[0]; // 选第一个做基准值
    for(let i = 1; i < arr.length; i++) {
        if(arr[i] < pivot) {
            left.push(arr[i]);  // 小的放左边
        } else {
            right.push(arr[i]);  // 大的放右边
        }
    }
    return [...quickSort(left), pivot, ...quickSort(right)]; // 拆开元素，放进新数组
}
quickSort(arr) // [1,2,3]

// 上面的写法也有更简洁的
const arr = [1,3,2];
function quickSort(arr) {
    if(arr.length <= 1) return arr;
    let pivot = arr[0];
    let left = arr.slice(1).filter(x => x < pivot); // 取没有准基数的数组，进行比较，小的放左边
    let right = arr.slice(1).filter(x => x > pivot); // 取没有准基数的数组，进行比较，大的放右边
    return [...quickSort(left), pivot, ...quickSort(right)]
}
quickSort(arr) // [1,2,3]
```


辅助记忆：

pivot 是“守门员”：想办法把比自己小的放左边、大的放右边

i 从左边找大的，j 从右边找小的，找到就交换位置

最后把 pivot 放中间，“安家”