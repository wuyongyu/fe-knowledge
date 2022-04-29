// Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.

// Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

//  

// Example 1:

// Input: x = 123
// Output: 321
// Example 2:

// Input: x = -123
// Output: -321
// Example 3:

// Input: x = 120
// Output: 21
//  

// Constraints:

// -231 <= x <= 231 - 1

/**
 * @param {number} x
 * @return {number}
 */
 var reverse = function(x) {

  var isSign = Math.sign(x); // 获取数字符号
  var absNumber = Math.abs(x); // 获取绝对值

  var reverseNumber = absNumber.toString().split("").reverse().join(""); // 绝对值 -> 字符串 -> 数组 -> 反转 -> 数组 -> 字符串
  var result = isSign * reverseNumber; // 添加正负号

  var start = -Math.pow(2, 31); // 左端点
  var end = Math.pow(2, 31) -1; // 右端点

  if(result > start && result < end) {
      return result;
  }
  return 0;
};
