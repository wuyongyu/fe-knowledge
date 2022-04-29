// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// You can return the answer in any order.

// Example 1:

// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
// Example 2:

// Input: nums = [3,2,4], target = 6
// Output: [1,2]
// Example 3:

// Input: nums = [3,3], target = 6
// Output: [0,1]

// Constraints:

// 2 <= nums.length <= 104
// -109 <= nums[i] <= 109
// -109 <= target <= 109
// Only one valid answer exists.

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  var result = [];
  nums.map((start, startIndex) => { // 暴力枚举
    nums.map((end, endIndex) => {
        if(start + end == target) {
          result = [startIndex, endIndex]
        }
    })
  })
  return result;
};

// anther method

var twoSum = function(nums, target) {
  for (var i = 0; i < nums.length; i++) {
    var check = target - nums[i]; // 求差值
    var res1 = i, res2 = nums.indexOf(check, i + 1); //从 i+1 位开始寻找后边有没有适合的值
    if (res2 !== -1) {
      return [res1,res2]
    }
  }
};

// another method

var twoSum = function(nums, target) {
  var map = new Map(); // 哈希表
  for (var i = 0, len = nums.length; i < len; i++) {
    if (map.has(target - nums[i])) { // 算出当前数字和目标数字的差
      return [map.get(target - nums[i]), i]; // 检查哈希表存在该差，返回结果
    } else {
      map.set(nums[i], i); // 不存在，当前数字作为key，索引作为 value 存入哈希表
    }
  }
};
