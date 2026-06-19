// const promise = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("hello");
//       if (true) {
//         resolve("Sucess");
//       } else {
//         reject("Failure");
//       }
//     }, 2000);
//   });
// };

// // promise()
// //   .then()
// //   .then((value) => {
// //     console.log("value", value);
// //   });
// // value.catch();

// const value = promise(); // Promise { 'Sucess' } because promise resolve immediatly
// const value2 = promise().then(); // Promise { <pending>} because promise doesn't got settled immediatly, it is sent to microtask que
// console.log("🚀 ~ value >>>", value);

// // ****************************
// //manuall way of doing util.promisify
// const fs = require("fs");

// const promiseWrapper = () => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(__filename, (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// };

// promiseWrapper().then((data) => {
//   console.log("then", data);
// });

// ***************************
// const prom = new Promise((res, rej) => {
//   if (Math.random() > 0.5) {
//     res("success");
//   } else {
//     rej("failure");
//   }
// });

// prom
//   .then(
//     (data) => {
//       console.log("success handler", data);
//       throw Error("erro");
//       //error thrown inside success handler remain unhandled,
//       //so we would need .catch handler at last
//     },
//     (error) => {
//       console.log("error hadnler", error);
//     },
//   )
//   .catch((finalErr) => {
//     console.log(".catch error", finalErr);
//     return "Beer";
//   })
//   .then((afterparty) => console.log("afterParty", afterparty)); // yes .then() after .catch() also works

// // ************************ proimise.all concept
// const p1 = new Promise((res, rej) => {
//   if (Math.random() > 0.5) {
//     res("success");
//   } else {
//     rej("failure");
//   }
// });

// const p2 = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("hello");
//       if (true) {
//         resolve("Sucess");
//       } else {
//         reject("Failure");
//       }
//     }, 2000);
//   });
// };

// Promise.all([p1, p2()])
//   .then((result) => {
//     //runs when both p1, p2 resolves
//     console.log("🚀 ----------------------🚀");
//     console.log("🚀 ~ result >>>", result);
//     console.log("🚀 ----------------------🚀");
//   })
//   .catch((err) => console.log("error in one of them", err)); // runs when any of them rejects

// // ************************ proimise.allSettled() concept
// const ps1 = new Promise((res, rej) => {
//   if (false) {
//     res("success");
//   } else {
//     rej("failure");
//   }
// });
// const ps2 = new Promise((res, rej) => {
//   if (false) {
//     res("success");
//   } else {
//     rej("failure");
//   }
// });

// Promise.allSettled([ps1, ps2]).then((result) => {
//   console.log("all settled results", result);
// });
// // promise.allSettled doesn't need catch block

// // ************************ finally block
// new Promise((res, rej) => {
//   if (true) {
//     res("sucess");
//   } else {
//     rej("failure");
//   }
// })
//   .then((value) => console.log(value))
//   .catch((reason) => console.log(reason))
//   .finally(() =>
//     //It takes no arguments:
//     // It passes the original result right through
//     console.log(
//       "finaly this will run anyway whether the proimse resloves or rejects",
//     ),
//   );

// // ******************************* reject promise in b/w the handlers
// const prom = new Promise((res, rej) => {
//   setTimeout(() => {
//     res("sucess");
//   }, 1000);
// });

// prom
//   .then((value) => {
//     console.log("original value", value);
//     // return Promise.resolve("new Value");// propogate promise with new value
//     return Promise.reject("new reject reason"); // propogate promise with new error
//   })
//   .then((newValue) => console.log("value", newValue)) //skipped
//   .catch((reason) => console.log("reason", reason)); //caught here
