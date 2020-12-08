// eslint-disable-next-line no-extend-native
Function.prototype.call = function() {
  let [thisArg, ...restArgs] = arguments
  if (!thisArg) {
    thisArg = typeof window === 'undefined' ? global : window
  }
  thisArg.func = this
  let result = thisArg.func(...restArgs)
  delete thisArg.func
  return result
}

// eslint-disable-next-line no-extend-native
Function.prototype.apply = function() {
  let [thisArg, argsArr] = arguments
  if (!thisArg) {
    thisArg = typeof window === 'undefined' ? global : window
  }
  thisArg.func = this
  let result = argsArr ? thisArg.func(...argsArr) : thisArg.func()
  delete thisArg.func
  return result
}
