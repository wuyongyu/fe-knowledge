Array Mutations with `concat()`,`slice()` and `...spread`
===

- 在HTML加上 `<script src="https://cdnjs.cloudflare.com/ajax/libs/es5-shim/2.0.8/es5-shim.min.js"></script>`
、`<script src="https://cdnjs.cloudflare.com/ajax/libs/expect/1.20.2/expect.js"></script>`
、`<script src="https://cdn.jsdelivr.net/npm/deep-freezer@2.0.4/index.min.js"></script>`

```javascript
// 初始版
const addCounter = (list) => {
  list.push(0)
  return list;
};

const removeCounter = (list, index) => {
  list.splice(index, 1);
  return list;
}

const incrementCounter = (list, index) => {
  list[index]++;
  return list;
}

const testAddCounter = () => {
  const listBefore = [];
  const listAfter = [0];
  expect(
    addCounter(listBefore)
  ).toEqual(listAfter);
};

const testRemoveCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];
  
  expect(
    removeCounter(listBefore, 1)
  ).toEqual(listAfter);
}

const testIncrementCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 11, 20];
  
  expect(
    incrementCounter(listBefore, 1)
  ).toEqual(listAfter);
}

testAddCounter();
testRemoveCounter();
testIncrementCounter();
console.log("All tests passed");

// 修改版
const addCounter = (list) => {
  // return list.concat([0]);
  return [...list, 0];
};

const removeCounter = (list, index) => {
  //return list
  //  .slice(0, index)
  //  .concat(list.slice(index + 1));
  return [
    ...list.slice(0, index),
    ...list.slice(index + 1)
  ]
}

const incrementCounter = (list, index) => {
  // return list
  //  .slice(0, index)
  //  .concat([list[index] + 1])
  //  .concat(list.slice(index + 1))
  return [
    ...list.slice(0, index),
    [list[index] + 1],
    ...list.slice(index + 1)
  ]
}

const testAddCounter = () => {
  const listBefore = [];
  const listAfter = [0];
  
  // 新增
  deepFreeze(listBefore);
  
  expect(
    addCounter(listBefore)
  ).toEqual(listAfter);
};

const testRemoveCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];
  
  // 新增
  deepFreeze(listBefore);
  
  expect(
    removeCounter(listBefore, 1)
  ).toEqual(listAfter);
}

const testIncrementCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 11, 20];
  
  // 新增
  deepFreeze(listBefore);
  
  expect(
    incrementCounter(listBefore, 1)
  ).toEqual(listAfter);
}

testAddCounter();
testRemoveCounter();
testIncrementCounter();
console.log("All tests passed");
```