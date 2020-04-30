# 链表

- 实现链表

```javascript
function LinkedList() {
  // Node辅助类
  var Node = function (element) {
    this.element = element;
    this.next = null;
  };

  // 内部/私有变量
  var length = 0;

  // 存储第一个节点的引用
  var head = null;

  // 向列表尾部添加一个新的项
  this.append = function (element) {
    var node = new Node(element),
      current;

    // 列表中的第一个节点
    if (head === null) {
      head = node;
    } else {
      current = head;

      // 循环列表，直到找到最后一项
      while (current.next) {
        current = current.next;
      }

      // 找到最后一项，将其 next 赋为 node，建立链接
      current.next = node;
    }

    // 更新列表的长度
    length++;
  };

  // 向列表的特定位置插入一个新的项
  this.insert = function (position, element) {
    // 检查越界值
    if (position >= 0 && position <= length) {
      var node = new Node(element),
        // current变量是对列表中第一个元素的引用
        current = head,
        previous,
        index = 0;

      // 在第一个位置添加
      if (position === 0) {
        // head的引用改为 node，这样列表中就有一个新元素
        node.next = current;
        head = node;
      } else {
        // 循环访问列表，找到目标位置
        while (index++ < position) {
          previous = current;
          current = current.next;
        }

        // current变量是对想要插入新元素的位置之后一个元素的引用
        // 新项{ node }
        // previous变量是对想要插入新元素的位置之前一个元素的引用
        node.next = current;
        previous.next = node;
      }

      // 更新列表的长度
      length++;

      return true;
    } else {
      // 如果越界了，就返回 false 值，表示没有添加项到列表中
      return false;
    }
  };

  // 从列表的特定位置移除一项
  this.removeAt = function (position) {
    // 检查越界值
    if (position > -1 && position < length) {
      // current变量就是对列表中第一个元素的引用
      var current = head,
        previous,
        index = 0;

      // 移除第一个元素
      if (position === 0) {
        head = current.next;
      } else {
        // 内部控制和递增的 index 变量
        while (index++ < position) {
          // 对当前元素的前一个元素的引用
          previous = current;

          // current变量总是为对所循环列表的当前元素的引用
          current = current.next;
        }

        // 将 previous 与 current 的下一项链接起来：跳过 current，从而移除它
        previous.next = current.next;
      }

      length--;

      return current.element;
    } else {
      // 如果不是有效的位置，就返回null（即没有从列表中移除元素）
      return null;
    }
  };

  // 从列表中移除一项
  this.remove = function (element) {
    var index = this.indexOf(element);
    return this.removeAt(index);
  };

  // 返回元素在列表中的索引。如果列表中没有该元素则返回 -1
  this.indexof = function (element) {
    // current变量来帮助循环访问列表
    var current = head,
      index = 0;
    while (current) {
      if (element === current.element) {
        return index;
      }
      index;
      current = current.next;
    }

    return -1;
  };

  // 如果链表中不包含任何元素，返回 true ，如果链表长度大于0则返回 false
  this.isEmpty = function () {
    return length === 0;
  };

  // 返回链表包含的元素个数
  this.size = function () {
    return length;
  };

  // `head`变量是`LinkedList`类的私有变量
  this.getHead = function () {
    return head;
  };

  // 输出元素的值
  this.toString = function () {
    var current = head,
      string = "";

    while (current) {
      string += "," + current.element;
      current = current.next;
    }
    return string.slice(1);
  };
}
```
