// Write a function that takes a string as input and returns the string reversed.

// Example:
// Given s = "hello", return "olleh".

/**
 * @param {string} s
 * @return {string}
 */
let reverseString = function(s) {
  let result = s.split("").reverse().join("");
  return result;
};