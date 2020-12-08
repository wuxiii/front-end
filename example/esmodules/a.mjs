let a = 1;
function add() {
  a++;
}

function getA() {
  return a;
}

function setA(params) {
  a = params;
}

// =========
function Foo() {
  this.port = 80;
  this.getPort = function () {
    return this.port;
  };
  this.setport = function (port) {
    this.port = port;
  };
}

function setFoo(params) {
  foo.port = params;
}

function getFoo(params) {
  return foo.port;
}

const foo = new Foo();
export { a, add, getA, setA, setFoo, getFoo, foo };
