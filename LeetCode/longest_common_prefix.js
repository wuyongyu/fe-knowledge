// Write a function to find the longest common prefix string amongst an array of strings.
//
// If there is no common prefix, return an empty string "".
//
// Example 1:
//
// Input: ["flower","flow","flight"]
// Output: "fl"
// Example 2:
//
// Input: ["dog","racecar","car"]
// Output: ""
// Explanation: There is no common prefix among the input strings.
// Note:
//
// All given inputs are in lowercase letters a-z.

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {

  if(strs === null || strs.length === 0){
    return "";
  }

  var same = strs[0];

  for(let i = 1; i < strs.length; i++){
    var str = strs[i];
    for(let j = 0; j < same.length; j++){
      if(same[j] != str.charAt(j)){
        break;
      }
    }
    same = same.slice(0, j);
  }
  return same;
};

// 更简洁的写法

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  //先找到最短的字符串
  let shortest = "";
  var len = strs.length;
  if(len === 0){
    return shortest;
  }
  let min = strs[0].length;
  let index_min = 0;
  strs.forEach((val,index) => {
    if(min > val.length){
    min = val.length;
    index_min = index;
  }
});

  shortest = strs[index_min];
  var common_pr = "";
  //再开始遍历寻找公共前缀
  for(var i = min; i >= 0; i--){
    var flag = false;
    common_pr = shortest.slice(0, i);
    for(var j = 0; j < len; j++){
      let item = strs[j];
      if(item.indexOf(common_pr ) === 0){
        flag = true;
      }else{
        flag = false;
        break;
      }
    }

    if(flag){
      break;
    }else{
      common_pr = "";
    }

  }
  return common_pr;
};