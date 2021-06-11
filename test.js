// var readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   terminal: false,
// });

// rl.on("line", function (s) {
//   console.log(s);
// });

var length = 1;
function fn() {
  console.log(this.length);
}
var obj = {
  length: 4,
  test: function (t) {
    console.log(arguments);
    t(), arguments[0]();
  },
};
obj.test(fn, 6);
