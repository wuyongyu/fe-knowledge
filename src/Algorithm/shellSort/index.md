# 希尔排序

1959年Shell发明，第一个突破O(n2)的排序算法，是简单插入排序的改进版。它与插入排序的不同之处在于，它会优先比较距离较远的元素。希尔排序又叫缩小增量排序。

算法描述
先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，具体算法描述：

选择一个增量序列t1，t2，…，tk，其中ti>tj，tk=1；
按增量序列个数k，对序列进行k 趟排序；
每趟排序，根据对应的增量ti，将待排序列分割成若干长度为m 的子序列，分别对各子表进行直接插入排序。仅增量因子为1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。

```js
function shellSort(arr) {
    const len = arr.length;
    let temp;
    let gap = Math.floor(len / 2); // 取对半的路径
    while(gap > 0) {// 路径不断缩小，一直到0
        for(let i = gap; i < len; i++) { // 对半分割，逐个递增排序，插入排序
            temp = arr[i];// 待插入元素
            let j = i;
            while(j > gap && arr[j - gap] > arr[j]) {
                arr[j] = arr[j - gap]; // 右移
                j -= gap;
            }
            arr[j] = temp; // 插入
        }
        gap = Math.floor(gap / 2); // 缩小增量
    }
    return arr;
}
shellSort([1,3,2]) // 1,2,3
```