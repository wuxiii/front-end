```js
// 将数组切割成指定的长度的数组
// array 为处理的数组，size为长度
// 下面为一个例子
// arr = [1,2,3,4,5,6,7,8]
// chunk（arr,2）返回值：[[1,2],[3,4],[5,6],[7,8]]
function chunk(array, size = 1) {
  const length = array == null ? 0 : array.length;
  if (!length || size < 1) {
    return [];
  }
  let index = 0;
  let resIndex = 0;
  const result = new Array(Math.ceil(length / size));

  while (index < length) {
    result[resIndex++] = slice(array, index, (index += size));
  }
  return result;
}
```
