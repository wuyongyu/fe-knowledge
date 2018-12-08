队列
===

- 实现队列

```javascript
function Queue(){

    let items = [];

    this.enqueue = function(element){
        items.push(element);
    }

    this.dequeue = function(){
        return items.shift();
    }

    this.front = function(){
        return items[0];
    }

    this.isEmpty = function(){
        return items.length === 0;
    }

    this.clear = function(){
        items = [];
    }

    this.size = function(){
        return items.length;
    }

    this.print = function(){
        console.log(items.toString());
    }
}
```

- 优先队列

```javascript
function PriorityQueue(){

    let items = [];

    function QueueElement(element, priority){
        this.element = element;
        this.priority = priority;
    }

    this.enqueue= function(element, priority){
        let queueElement = new QueueElement(element, priority);
        if(this.isEmpty()){
            items.push(queueElement);
        } else {
            let added = false;
            for(let i = 0; i < items.length; i++){
                if(queueElement.priority < items[i].priority){
                    items.splice(i, 0, queueElement);
                    added = true;
                    break;
                }
            }
            if(!added){
                items.push(queueElement)
            }
        }
    }

    this.isEmpty = function(){
        return items.length === 0;
    }

    this.print = function(){
        console.dir(items);
    }
}
```

- 击鼓传花

```javascript
function hotPhoto(nameList, num){
    let queue = new Queue();
    for(let i = 0; i < nameList.length; i++){
        queue.enqueue(nameList[i]);
    }
    let eliminated = '';
    while(queue.size() > 1){
        for(var i = 0; i < num; i++){
            queue.enqueue(queue.dequeue());
        }
        eliminated = queue.dequeue();
        console.log(eliminated + '在击鼓传花游戏中被淘汰')
    }
    return queue.dequeue();
}
```