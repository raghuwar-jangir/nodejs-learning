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
//     // return Promise.reject("new reject reason"); // propogate promise with new error
//   })
//   .then((newValue) => console.log("value", newValue)) //skipped
//   .catch((reason) => console.log("reason", reason)); //caught here

// // ***************************     proimse.race()
// const pr1 = new Promise((res, rej) => {
//   setTimeout(() => {
//     res("sucess 1");
//   }, 2000);
// });

// const pr2 = new Promise((res, rej) => {
//   setTimeout(() => {
//     rej("sucess 2");
//   }, 2000);
// });

// //Settles as soon as the first promise finishes (wins or loses).

// // If the fastest promise resolves, the whole race resolves with that value.

// // If the fastest promise rejects, the whole race rejects with that error.

// Promise.race([pr1, pr2])
//   .then((result) => {
//     console.log("result", result); //whoever resolves first
//   })
//   .catch((reason) => console.log("reson", reason));

// // ***********************************  promise.any()

// const pa1 = new Promise((res, rej) => {
//   setTimeout(() => {
//     rej("sucess 1");
//   }, 3000);
// });

// const pa2 = new Promise((res, rej) => {
//   setTimeout(() => {
//     rej("sucess 2");
//   }, 2000);
// });

// // : Fulfills as soon as the first promise succeeds; rejects only if all fail
// Promise.any([pa1, pa2])
//   .then((value) => console.log(value))
//   .catch((reason) => console.log("failure", reason));

// **************************************** create own promise.all functions

// const customPromiseAll = (arr) => {
//   return new Promise((res, rej) => {
//     if (arr.length === 0) {
//       res([]);
//       return;
//     }
//     let result = [];
//     let finished = 0;
//     arr.forEach((pr, index) => {
//       pr.then((value) => {
//         result[index] = value;
//         finished++;
//         if (finished == arr.length) {
//           res(result);
//         }
//       }).catch((reason) => {
//         rej(reason);
//       });
//     });
//   });
// };

// const pa1 = new Promise((res, rej) => {
//   setTimeout(() => {
//     res("sucess 1");
//   }, 2000);
// });

// const pa2 = new Promise((res, rej) => {
//   setTimeout(() => {
//     res("sucess 2");
//   }, 2000);
// });

// Promise.customAll = customPromiseAll;

// Promise.customAll([pa1, pa2])
//   .then((result) => console.log("result", result))
//   .catch((errror) => console.log("reason", errror));

// // **************************************** create custome promise.race functions
// const customRace = (promArr) => {
//   return new Promise((res, rej) => {
//     if (promArr.length == 0) {
//       return;
//     }
//     promArr.forEach((pr) => {
//       pr.then((value) => res(value)).catch((reason) => rej(reason));
//     });
//   });
// };

// Promise.customRace = customRace;

// const pa1 = new Promise((res, rej) => {
//   setTimeout(() => {
//     res("sucess 1");
//   }, 4000);
// });

// const pa2 = new Promise((res, rej) => {
//   setTimeout(() => {
//     rej("rejected 2");
//   }, 3000);
// });

// Promise.customRace([pa1, pa2])
//   .then((value) => console.log(value))
//   .catch((reason) => console.log(reason));

// // // **************************************** create custome promise.any() functions

// Promise.customAny = (promArr) => {
//   return new Promise((res, rej) => {
//     if (promArr.length == 0) {
//       rej('Aggregate error');
//       return;
//     }
//     let failed = 0;
//     let errors = [];

//     promArr.forEach((prom) => {
//       prom
//         .then((value) => {
//           res(value);
//           return;
//         })
//         .catch((reason) => {
//           failed++;
//           errors[index] = reason // Save error by its original index
//           if (failed == promArr.length) {
//             rej(reason);
//             return;
//           }
//         });
//     });
//   });
// };

// const pa1 = new Promise((res, rej) => {
//   setTimeout(() => {
//     rej("sucess 1");
//   }, 4000);
// });

// const pa2 = new Promise((res, rej) => {
//   setTimeout(() => {
//     rej("success 2");
//   }, 5000);
// });

// Promise.customAny([pa1, pa2])
//   .then((value) => console.log(value))
//   .catch((reason) => console.log("reject<<", reason));

// // // // // **************************************** create custome promise.allSettled functions

// Promise.customAllSettled = (promArr) => {
//   return new Promise((res, rej) => {
//     if (promArr.length == 0) {
//       res([]);
//       return;
//     }
//     let results = [];
//     let settled = 0;
//     promArr.forEach((prom, index) => {
//       Promise.resolve(prom)
//         .then((value) => {
//           results[index] = {
//             status: "fulfilled",
//             value: value,
//           };
//         })
//         .catch((reason) => {
//           results[index] = {
//             status: "rejected",
//             value: reason,
//           };
//         })
//         .finally(() => {
//           settled++;
//           if (settled == promArr.length) {
//             res(results);
//             return;
//           }
//         });
//     });
//   });
// };

// const pa1 = new Promise((res, rej) => {
//   setTimeout(() => {
//     res("sucess 1");
//   }, 1000);
// });

// const pa2 = new Promise((res, rej) => {
//   setTimeout(() => {
//     res("success 2");
//   }, 2000);
// });

// Promise.customAllSettled([pa1, pa2]).then((value) => console.log(value));
