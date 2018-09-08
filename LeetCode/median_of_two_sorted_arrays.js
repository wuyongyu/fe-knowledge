// There are two sorted arrays nums1 and nums2 of size m and n respectively.
//
// Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).
//
// You may assume nums1 and nums2 cannot be both empty.
//
// Example 1:
//
// nums1 = [1, 3]
// nums2 = [2]
//
// The median is 2.0
// Example 2:
//
// nums1 = [1, 2]
// nums2 = [3, 4]
//
// The median is (2 + 3)/2 = 2.5

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */

var findMedianSortedArrays = function(nums1, nums2){
    var m = nums1.length;
    var n = nums2.length;
    var total = m + n;
    // 无符号移位运算符
    var half = total >>> 1;

    if(total & 1){
        return findKth(nums1, m, nums2, n, half + 1);
    } else {
        return (findKth(nums1, m, nums2, n, half) + findKth(nums1, m, nums2, n, half + 1)) / 2;
    }
}

function findKth(nums1, m, nums2, n, half) {
    if(m > n){
        return findKth(nums2, n, nums1, m, half);
    }
    if(m === 0){
        return nums2[half - 1];
    }
    if(half === 1){
        return Math.min(nums1[0], nums2[0]);
    }

    var partNums1 = Math.min(half >>> 1, m), partNums2 = half - partNums1;

    if(nums1[partNums1 - 1] < nums2[partNums2 - 1]){
        return findKth(nums1.slice(partNums1), m - partNums1, nums2, n, half - partNums1)
    } else if(nums1[partNums1 - 1] > nums2[partNums2 - 1]){
        return findKth(nums1, m, nums2.slice(partNums2), n - partNums2, half - partNums2)
    } else {
        return nums1[partNums1 - 1]
    }
}

// 其他人的写法

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    var a = [];
    for (var i = 0, j = 0; i < nums1.length && j < nums2.length;) {
        if (nums1[i] > nums2[j]) {
            a.push(nums2[j++]);
        }
        else {
            a.push(nums1[i++]);
        }
    }
    var left = nums1.length == i ? nums2.slice(j) : nums1.slice(i);
    a = a.concat(left);
    if (a.length % 2) {
        return a[Math.floor(a.length / 2)];
    }
    else {
        return (a[Math.floor(a.length / 2)] + a[Math.floor(a.length / 2 - 1)]) / 2;
    }
};