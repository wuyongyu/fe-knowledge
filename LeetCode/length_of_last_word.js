// Given a string s consists of upper/lower-case alphabets and empty space characters ' ', return the length of last word in the string.
//
// If the last word does not exist, return 0.
//
// Note: A word is defined as a character sequence consists of non-space characters only.
//
// Example:
//
// Input: "Hello World"
// Output: 5

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
  var array = s.split(/\s/);

  if(s.length === 0){
    return 0;
  }

  if(array.length === 0){
    return 0;
  }

  while(array.length > 0){
    var LastWord = array.pop();
    if(LastWord.length > 0){
      return LastWord.length;
    }
  }

  return 0;
};

// 更好的写法

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
  var str = s.split(' ')
  var len = 0
  for (var i=str.length-1;i>-1;i--) {
    if (str[i]!='') {
      len = str[i].length
      break
    }
  }
  return len
};