# 选择排序

选择排序(Selection-sort)是一种简单直观的排序算法。它的工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。 

算法描述

比较相邻的元素。如果第一个比第二个大，就交换它们两个；
对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
针对所有的元素重复以上的步骤，除了最后一个；
重复步骤1~3，直到排序完成。

```js
function selectionSort(arr) {
    const len = arr.length;
    let temp, minIndex; // 存储最小值的指针
    for(let i = 0; i < len - 1; i++) {// 最后一个值不需要比对
        minIndex = i;
        for(let j = i + 1; j < len; j++) {// 第二层不需要那么多比较，所以从 i + 1 开始
            if(arr[j] < arr[minIndex]) {
                minIndex = j; // 把最小的值取出来
            }
        }
        temp = arr[minIndex];
        arr[minIndex] = arr[i];
        arr[i] = temp; 
    }
    return arr
}
```