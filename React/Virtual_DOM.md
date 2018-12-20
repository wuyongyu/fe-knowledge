Virtual DOM
===

```javascript
// 构造虚拟DOM树
function Element(tagName, props, children){
  this.tagName = tagName;
  this.props = props;
  this.children = children;
}

// 虚拟DOM结构
var tagName = 'ul';
var props = {
  d: 'list'
};
var children = [
  new Element('li', {class: 'item'}, ['item 1']),
  new Element('li', {class: 'item'}, ['item 2']),
  new Element('li', {class: 'item'}, ['item 3']),
]
var ul = new Element(tagName, props, children);

// 生成真正DOM结构
Element.prototype.render = function(){
  var el = document.createElement(this.tagName);
  var props = this.props;

  for(var propName in props){
    var propValue = props[propName]
    el.setAttribute(propName, propValue)
  }

  var children = this.children || []

  children.forEach(function(child){
    var childEl = (child instanceof Element)
      // 如果子节点也是虚拟DOM，就递归构建DOM节点
      ? child.render()
      : document.createTextNode(child)
    el.appendChild(childEl)
  })
  return el;
}

// 插入原生DOM到文档
var ulRoot = ul.render();
document.body.appendChild(ulRoot);
```