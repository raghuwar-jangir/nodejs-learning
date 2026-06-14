let initialMemory = process.memoryUsage().heapUsed;

let arr = [];

for (let i = 0; i < 10000; i++) {
  arr.push("hellow");
}

console.log("memory used", process.memoryUsage().heapUsed - initialMemory)

console.log(process.env.PWD)