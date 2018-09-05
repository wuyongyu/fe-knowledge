// Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.
//
// Note: For the purpose of this problem, we define empty string as valid palindrome.
//
// Example 1:
//
// Input: "A man, a plan, a canal: Panama"
// Output: true
// Example 2:
//
// Input: "race a car"
// Output: false

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
  s = s.toLowerCase();
  s = s.replace(/[^a-z0-9]/ig, "");
  var rev = s.split("").reverse().join("");
  return s.indexOf(rev) === 0;
};

// 另外的写法

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
  s = s.toLowerCase().replace(/\W|\s+/g,"");
  for (let i = 0; i < Math.ceil(s.length/2); i++) {
    if (s[i] !== s[s.length-i-1]) {
      return false;
    }
  }
  return true;
};