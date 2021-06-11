# js 实现队列操作

队列数据结构

- 先入先出（FIFO）
- 有两个指针:头和尾
- 两个主要操作:入队 enqueue 和出队 dequeue
- 两个属性查看头部的值 peek 和 队列的长度 length
- 时间复杂度 O(1)

```js
class Queue {
  constructor() {
    this.items = {};
    this.headIndex = 0;
    this.tailIndex = 0;
  }

  enqueue(item) {
    this.items[this.tailIndex] = item;
    this.tailIndex++;
  }

  dequeue() {
    const item = this.items[this.headIndex];
    delete this.items[this.headIndex];
    this.headIndex++;
    return item;
  }

  get peek() {
    return this.items[this.headIndex];
  }

  get length() {
    return this.tailIndex - this.headIndex;
  }
}

const queue = new Queue();

queue.enqueue(7);
queue.enqueue(2);
queue.enqueue(6);
queue.enqueue(4);

queue.dequeue(); // => 7

queue.peek; // => 2

queue.length; // => 3
```
