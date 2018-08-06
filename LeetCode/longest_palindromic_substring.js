// Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.
//
// Example 1:
//
// Input: "babad"
// Output: "bab"
// Note: "aba" is also a valid answer.
//
// Example 2:
//
// Input: "cbbd"
// Output: "bb"

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s){

    var array = s.split(''),left, right,
        arraySize = array.length,
        max = 0,
        start = 0;

    for(var i = 0; i < arraySize; i = i + 0.5){
        left = Math.ceil(i - 1);
        right = Math.floor(i + 1);
        while(left >=0 && right < arraySize) {
            if (array[left] === array[right]){
                left--;
                right++;
            } else {
                break;
            }
        }

        if (right - left - 1 > max){
            max = right - left - 1;
            start = left + 1;
        }
    }

    return s.slice(start, start + max);
};