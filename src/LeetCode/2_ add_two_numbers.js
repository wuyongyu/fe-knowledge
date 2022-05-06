// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
// You may assume the two numbers do not contain any leading zero, except the number 0 itself.


// Example 1:


// Input: l1 = [2,4,3], l2 = [5,6,4]
// Output: [7,0,8]
// Explanation: 342 + 465 = 807.
// Example 2:

// Input: l1 = [0], l2 = [0]
// Output: [0]
// Example 3:

// Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// Output: [8,9,9,9,0,0,0,1] 

// Constraints:

// The number of nodes in each linked list is in the range [1, 100].
// 0 <= Node.val <= 9
// It is guaranteed that the list represents a number that does not have leading zeros.

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

// just an idea，won't pass，because l1 is listNode

 var addTwoNumbers = function(l1, l2) {
  var value1 = l1.reverse().join('');
  var value2 = l2.reverse().join('');
  var sum = Number(value1) + Number(value2);
  var result = sum.toString().split('').reverse();
  return result;
};

// anther method

var addTwoNumbers = function (l1, l2) {
  // 创建虚拟头节点
  var dummyHead = new ListNode(-1);
  // 将虚拟头结点赋值被cur 之后这个cur会不断地向后移动
  var cur = dummyHead;
  // 总和
  var sum = 0;
  // 进位
  var carry = 0;
  // 这里使用或运算符, 因为两个链表的长度可能会不一样
  while (l1 || l2) {
    // 首先sum就是两个节点的值添加上进制
    sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry;
    // 进位 很显然 如果sum 大于10 说明进制为1 否则为 0
    carry = sum >= 10 ? 1 : 0
    // 新的链表的下一个节点: 和对10取余
    cur.next = new ListNode(sum % 10);
    // 将cur移动到下一个节点
    cur = cur.next;
    // l1 和 l2 都存在的情况下 也都往后面移动
    l1 && (l1 = l1.next);
    l2 && (l2 = l2.next);
  }
  // 如果最后两个数相加完毕之后还有可能
  carry && (cur.next = new ListNode(carry));
  // 最后将新链表的头结点返回出去就行
  return dummyHead.next;
};

function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
