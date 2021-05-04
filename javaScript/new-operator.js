function _new() {
  let [constructor, ...rest] = arguments;
  //关系: instance.constructor.prototype = instance.__proto__
  // 1，创建一个空的简单JavaScript对象（即{}）；
  // 2，链接该对象（设置该对象的constructor）到另一个对象 ；可以理解为继承对象的父属性方法
  // 3，执行构造函数方法，将步骤1新创建的对象作为this的上下文 ； 可以理解为继承对象的属性和方法
  // 4，如果该函数没有返回对象，则返回this，否则，返回构造函数中返回的对象
  let target = {};
  Object.setPrototypeOf(target, constructor.prototype);

  // 此处可以1，2过程 可使用Object.create()达到相同的目的
  //   let target = Object.create(constructor.prototype)
  let result = constructor.apply(target, rest);

  if ((result && typeof result === "object") || typeof result === "function") {
    return result;
  }
  return target;
}

// 测试用例
const Person = function (name, age) {
  this.name = name;
  this.age = age;
};

Person.prototype.sayprofile = function () {
  return `I am ${this.name}, i am ${this.age}`;
};
// 测试
it("new function test", () => {
  const xiaoming = _new(Person, "xiaoming", 30);

  expect(xiaoming.name).toBe("xiaoming");
  expect(xiaoming.age).toBe(30);
  expect(xiaoming.sayprofile()).toBe("I am xiaoming, i am 30");
});
