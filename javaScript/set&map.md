# es6 新增的 Set 和 Map 两种数据结构

Set 是一种叫集合的数据结构,是由一堆无序的,相关联的,且不重复的内存结构组成的组合

Map 是一种叫字典的数据结构,是由键值对元素组成的集合

## Set

Set 是 es6 新增的数据结构,类似于数组,成员唯一没有重复.Set 是一个构造函数,所以使用 new 来创建一个 Set 数据.

```js
const s = new Set();
```

### 方法和属性

修稿集合方法

- add() 往集合里添加一个元素,返回 Set 结构本身,可链式调用
- delete() 删除一个元素,返回布尔值,表示是否删除成功
- has() 判断集合中是否有目标元素,返回布尔值
- clear() 清除集合,无返回值

遍历集合的方法

- keys() 返回所有键名的遍历器
- values() 返回所有键值的遍历器
- entries() 返回所有键值对的遍历器
- forEach() 使用回调函数遍历每个元素

属性

- size 表示集合里面元素的个数

## Map

Map 类型是键值对的有序列表，而键和值都可以是任意类型
Map 本身是一个构造函数，用来生成 Map 数据结构

```js
const m = new Map();
```

修稿集合方法

- set() 设置键名 key 对应的键值为 value，然后返回整个 Map 结构,如果 key 已经有值，则键值会被更新，否则就新生成该键,同时返回的是当前 Map 对象，可采用链式写法
- get() 方法读取 key 对应的键值，如果找不到 key，返回 undefined

- delete() delete 方法删除某个键,返回布尔值,表示是否删除成功
- has() has 方法返回一个布尔值，表示某个键是否在当前 Map 对象之中
- clear() 方法清除所有成员，没有返回值

遍历集合的方法

- keys() 返回所有键名的遍历器
- values() 返回所有键值的遍历器
- entries() 返回所有键值对的遍历器
- forEach() 使用回调函数遍历每个元素

属性

- size 表示集合里面元素的个数

## WeakSet 和 WeakMap

### WeakSet

和 Set 类似,创建实例,可以接受一个具有 Iterable 接口的对象作为参

```js
const a = [
  [1, 2],
  [3, 4],
];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}
```

WeakSet 与 Set 的区别

- 没有遍历操作的 API
- 没有 size 属性

WeakSet 记住以下两点

- WeackSet 只能成员只能是引用类型，而不能是其他类型的值,否则报错
- WeakSet 里面的引用只要在外部消失，它在 WeakSet 里面的引用就会自动消失

### WeakMap

WeakMap 结构与 Map 结构类似，也是用于生成键值对的集合

```js
const wm1 = new WeakMap();
const key = { foo: 1 };
wm1.set(key, 2);
wm1.get(key); // 2
```

WeakMap 与 Map 有两个区别：

- 没有遍历操作的 API
- 没有 clear 清空方法

WeakMap 记住以下两点

- WeakMap 只接受对象作为键名（null 除外），不接受其他类型的值作为键名，而不能是其他类型的值,否则报错
- WeakMap 键名所指向的对象，一旦不再需要，里面的键名对象和所对应的键值对会自动消失，不用手动删除引用
