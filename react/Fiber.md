# Fiber

在认识 fiber 之前先了解下面的这个方法

## requestIdleCallback

[requestIdleCallback](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback) 是 window 下面的一个方法，接受一个函数作为参数，这个函数被传入一个默认的参数 [IdleDeadline](https://developer.mozilla.org/zh-CN/docs/Web/API/IdleDeadline)

利用浏览器的空余时间执行任务，如果有更高优先级的任务要执行时，当前执行的任务可以被终止，优先执行高级别任务。

```javascript
requestIdleCallback(function(deadline) {
  deadline.timeRemaining() 获取浏览器的空余时间
})
```

## 什么是浏览器的空余时间？

页面是一帧一帧绘制出来的，当每秒绘制的帧数达到 60 时，页面是流畅的，小于这个值时， 用户会感觉到卡顿

1s 60 帧，每一帧分到的时间是 1000/60 ≈ 16 ms，如果每一帧执行的时间小于 16ms，就说明浏览器有空余时间

如果任务在剩余的时间内没有完成则会停止任务执行，继续优先执行主任务，也就是说 requestIdleCallback 总是利用浏览器的空余时间执行任务

## 为什么要使用 fiber

### React 16 渲染虚拟 dom 问题

React 16 之前的版本比对更新 VirtualDOM 的过程是采用循环加递归实现的，这种比对方式有一个问题，就是一旦任务开始进行就无法中断，如果应用中组件数量庞大，主线程被长期占用，直到整棵 VirtualDOM 树比对更新完成之后主线程才能被释放，主线程才能执行其他任务。这就会导致一些用户交互，动画等任务无法立即得到执行，页面就会产生卡顿, 非常的影响用户体验。

核心问题：递归无法中断，执行重任务耗时长。 JavaScript 又是单线程，无法同时执行其他任务，导致任务延迟页面卡顿，用户体验差。

### 如何去优化

- 利用浏览器空闲时间执行任务，拒绝长时间占用主线程
- 放弃递归只采用循环，因为循环可以被中断
- 任务拆分，将任务拆分成一个个的小任务

### fiber 的解决方案

在 Fiber 方案中，为了实现任务的终止再继续，DOM 比对算法被分成了两部分：

构建 Fiber (可中断)

提交 Commit (不可中断)

DOM 初始渲染: virtualDOM -> Fiber -> Fiber[] -> DOM

DOM 更新操作: newFiber vs oldFiber -> Fiber[] -> DOM

下面是一个 fiber 对象具有的属性

```
{
  type         节点类型 (元素, 文本, 组件)(具体的类型)
  props        节点属性
  stateNode    节点 DOM 对象 | 组件实例对象
  tag          节点标记 (对具体类型的分类 hostRoot || hostComponent || classComponent || functionComponent)
  effects      数组, 存储需要更改的 fiber 对象
  effectTag    当前 Fiber 要被执行的操作 (新增, 删除, 修改)
  parent       当前 Fiber 的父级 Fiber
  child        当前 Fiber 的子级 Fiber
  sibling      当前 Fiber 的下一个兄弟 Fiber
  alternate    Fiber 备份 fiber 比对时使用
}
```

## fiber 实现过程

### 创建任务队列并添加任务

1. jsx 被 bable 转换成 createElement 创建虚拟 dom 对象
2. render 方法中传入虚拟 dom 和挂载根节点
3. 在 render 方法中调用 createTaskQueue() 方法，向任务队列添加任务，这个任务包含虚拟 dom 的父级与子集，并为每个虚拟 dom 构建 fiber 对象

```js
// render 方法 ，对应上述第二步
const taskQueue = createTaskQueue();
const render = (el, dom) => {
  taskQueue.push({
    dom,
    props: { children: el },
  });
  // 在最后调用requestIdleCallback 去执行fiber任务
  requestIdleCallback(performTask);
};
// 创建任务队列方法，push方法添加任务，pop返回要执行的任务，遵循队列的先见先出原则
const createTaskQueue = () => {
  const taskQueue = [];
  return {
    push: (item) => taskQueue.push(item),
    pop: () => taskQueue.shift(),
    isEmpty: () => taskQueue.length === 0,
  };
};
```

### 任务调度逻辑

在上面的 render 方法的最后调用 `requestIdleCallback(performTask)`开启 fiber 任务的执行，任务调度的逻辑主要在传入的回调函数 performTask 中,在这个方法中去执行 workLoop 方法，也就是开始调度任务

```js
const performTask = (deadline) => {
  /**
   * 执行任务
   */
  workLoop(deadline);
  /**
   * 判断任务是否存在
   * 判断任务队列中是否还有任务没有执行
   * 再一次告诉浏览器在空闲的时间执行任务
   */
  if (subTask || !taskQueue.isEmpty()) {
    requestIdleCallback(performTask);
  }
};
```

在 workLoop 做的事情就是获取子任务 subTask（也就是 fiber 任务）并执行（`executeTask(subTask)`），通过循环对 subTask 赋值，当赋值为 null 时再从任务队列里面去获取最前面的任务

```js
const workLoop = (deadline) => {
  /**
   * 如果子任务不存在 就去获取子任务，通过taskQueue.pop()拿到
   * 任务队列的最前的一个任务，返回一个fiber对象，所以subTask就是
   * fiber对象
   */
  if (!subTask) {
    subTask = getFirstTask();
  }
  /**
   * 如果任务存在并且浏览器有空余时间就调用
   * executeTask 方法执行任务 接受任务 返回新的任务
   */
  while (subTask && deadline.timeRemaining() > 1) {
    subTask = executeTask(subTask);
  }
  //提交fiber任务
  if (pendingCommit) {
    commitAllWork(pendingCommit);
  }
};
```

在 executeTask 中，构建子集的 fiber 对象，采用的是深度优先遍历的方法，即先构建子集左的 fiber 对象，若子集左有 child 就将这子集返回，返回的结果通过 workLoop 中可以知道是赋值给 subTask 了 ，这样就不断的去循环，当所有的子集左循环完毕后，再从最底下向上找父节点是否有兄弟节点，如有就将兄弟节点返回，这样又赋值给 subTask，通过这样的循环完成整个 fiber 的创建

### 渲染

在执行任务时（executeTask 方法中），构建 fiber 的同时还会讲所有的 fiber 对象收集合并到最顶层的 effects 对象中，收集完毕后就会提交所有的 fiber 任务，这个方法是在 workLoop 方法中通过一个变量控制执行的，开始循环 effect 数组构建 dom 节点，然后就会被渲染到界面上了
