// // *****  test 1 basic concept  ******
// const fs = require("fs");

// console.log("start");

// setTimeout(() => {
//   console.log("timeout 1");
//   Promise.resolve().then(() => console.log("promise in timeout 1"));
// }, 0);

// setTimeout(() => {
//   console.log("ultimate >>>");
// }, 20);

// setImmediate(() => {
//   console.log("immediate 1");
//   Promise.resolve().then(() => console.log("promise in immediate 1"));
// });

// fs.readFile(__filename, () => {
//   console.log("fs.readFile");
//   setTimeout(() => console.log("timeout in fs"), 0);
//   setImmediate(() => console.log("immediate in fs"));
//   Promise.resolve().then(() => console.log("promise in fs"));
// });

// Promise.resolve().then(() => console.log("promise 1"));

// console.log("end");

// ******************************************
// ****** test 2 important running microtask b/w two macrotask ******
// console.log("Start");

// setTimeout(() => {
//   console.log("Timeout 1");
//   Promise.resolve().then(() => console.log("Promise inside Timeout"));
// }, 0);

// setTimeout(() => console.log("Timeout 2"), 0);

// Promise.resolve().then(() => console.log("Promise 1"));

// console.log("End");

// // *****************************************
// // **** test 3 The async / await Illusion *****
// async function async1() {
//   console.log("async1 start");
//   await async2();
//   console.log("async1 end");
// }

// async function async2() {
//   console.log("async2");
// }

// console.log("script start");

// setTimeout(() => console.log("setTimeout"), 0);

// async1();

// new Promise((resolve) => {
//   console.log("promise1");
//   resolve();
// }).then(() => console.log("promise2"));

// console.log("script end");
