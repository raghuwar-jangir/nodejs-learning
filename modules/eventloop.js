const fs = require("fs");

console.log("start");

setTimeout(() => {
  console.log("timeout 1");
  Promise.resolve().then(() => console.log("promise in timeout 1"));
}, 0);

setTimeout(() => {
  console.log("ultimate >>>");
}, 20);

setImmediate(() => {
  console.log("immediate 1");
  Promise.resolve().then(() => console.log("promise in immediate 1"));
});

fs.readFile(__filename, () => {
  console.log("fs.readFile");
  setTimeout(() => console.log("timeout in fs"), 0);
  setImmediate(() => console.log("immediate in fs"));
  Promise.resolve().then(() => console.log("promise in fs"));
});

Promise.resolve().then(() => console.log("promise 1"));

console.log("end");

//test 1
