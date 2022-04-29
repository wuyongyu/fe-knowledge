// Given two strings s and t, determine if they are isomorphic.
//
// Two strings are isomorphic if the characters in s can be replaced to get t.
//
// All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character but a character may map to itself.
//
// Example 1:
//
// Input: s = "egg", t = "add"
// Output: true
//
// Example 2:
//
// Input: s = "foo", t = "bar"
// Output: false
//
// Example 3:
//
// Input: s = "paper", t = "title"
// Output: true
// Note: You may assume both s and t have the same length.

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
  // 用来记录s、t的对应关系
  var mapS = {};
  var mapT = {};

  for (var i in s) {
    var valueS = s[i];
    var valueT = t[i];

    // 如果这个字符没出现，则加到 mapS 中
    if (!mapS[valueS]) {
      mapS[valueS] = valueT;
    } else if (mapS[valueS] !== valueT) {
      // 如果 s 的字符出现过，对比 t 的字符是否与 mapS 中存储的一样
      return false;
    }

    if (!mapT[valueT]) {
      mapT[valueT] = valueS;
    } else if (mapT[valueT] !== valueS) {
      return false;
    }
  }

  return true;
};
