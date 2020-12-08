import { a, add, getA, setA, setFoo, getFoo, foo } from "./a.mjs";

// console.log("modules b", getFoo());

// add();
// setA(10);
// setFoo(90);

// console.log("modules b", getFoo());

foo.setport(888);
console.log("modules b", foo.port);
