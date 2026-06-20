// const prom = () =>
//   new Promise((res) => {
//     setTimeout(() => {
//       res("scusc");
//     }, 4000);
//   });
// const prom2 = () =>
//   new Promise((res) => {
//     setTimeout(() => {
//       res("scusc");
//     }, 4000);
//   });

// const func = async () => {
//   const res1 = prom(); //starts immediately
//   const res2 = prom2(); //starts immediately

//   const result = [await res1, await res2];

//   console.log(result); //only take 4 seconnds not 8
// };

// func();

// ****************************  await in forloop

const prom = new Promise((res, rej) => {
  setTimeout(() => res(), 2000);
});
const prom2 = new Promise((res, rej) => {
  setTimeout(() => res(), 4000);
});

// const run = async () => {
//   const promArr = [prom, prom2];
//   promArr.forEach((promise) => {
//     // await promise // can't do that
//   });
// };

// const runLopp = async () => {
//   const promArr = [prom, prom2];
//   for (const p of promArr) {
//     await p; // waits
//   }

//   console.log("run"); //prints after 4 seconds
// };

// runLopp();
