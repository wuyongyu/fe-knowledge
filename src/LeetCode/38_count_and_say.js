// The count-and-say sequence is the sequence of integers with the first five terms as following:
//
// 1.     1
// 2.     11
// 3.     21
// 4.     1211
// 5.     111221
// 1 is read off as "one 1" or 11.
// 11 is read off as "two 1s" or 21.
// 21 is read off as "one 2, then one 1" or 1211.
// Given an integer n, generate the nth term of the count-and-say sequence.
//
// Note: Each term of the sequence of integers will be represented as a string.
//
// Example 1:
//
// Input: 1
// Output: "1"
//
// Example 2:
//
// Input: 4
// Output: "1211"

/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n) {
  if (n <= 1) {
    return "1";
  }

  var countSay = "1";

  for (var i = 2; i <= n; i++) {
    var num = countSay.charAt(0);
    var temp = countSay;

    var count = 1;
    countSay = "";

    for (var j = 1, len = temp.length; j < len; j++) {
      // 数字相同
      if (temp.charAt(j) == num) {
        count++;
      } else {
        // 数字不同
        countSay += count;
        countSay += num;
        num = temp.charAt(j);
        count = 1;
      }
    }

    countSay += count;
    countSay += num;
  }
  return countSay;
};
