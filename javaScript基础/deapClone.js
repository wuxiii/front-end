function deepclone(obj, hash = new WeakMap()) {
  // 1,如果是 RegExp 或者 Date 类型，返回对应类型
  // 2,如果是基本数据类型，直接返回
  // 3,如果是复杂数据类型，递归。
  // 4,考虑循环引用的问题

  if (obj instanceof RegExp) {
    return new RegExp(obj)
  }
  if (obj instanceof Date) {
    return new Date(obj)
  }
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  // 解决循环引用的问题
  if (hash.has(obj)) {
    return hash.get(obj)
  }

  let t = new obj.constructor()
  hash.set(obj, t)
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      t[key] = deepclone(obj[key], hash)
    }
  }
  return t
}

function dedpClone(obj, hash = new WeakMap()) {
  if (obj instanceof RegExp) {
    return new RegExp(obj)
  }
  if (obj instanceof Date) {
    return new Date(obj)
  }
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  if (hash.has(obj)) {
    return hash.get(obj)
  }

  let t = new obj.constructor()
  hash.set(obj, t)
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      t[key] = dedpClone(obj[key], hash)
    }
  }
  return t
}

const a = {
  aa: {aaa: 'ni', bbb: {cccc: 'dnaj'}},
  bb: {bbb: 'hao'},
}

const b = deepclone(a)

console.log(JSON.stringify(b))

function name(arr, sum) {
  let index1, index2
  for (let i = arr.length; i > 0; i--) {
    for (let j = i - 2; j > 0; j--) {
      console.log(i, j)
      if (arr[i - 1] + arr[j] === sum) {
        index1 = i - 1
        index2 = j
        return
      }
    }
  }
  return [index1, index2]
}
