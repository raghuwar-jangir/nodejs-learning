// const promise = () => {
//   return new Promise((resolve, reject) => {
//     // setTimeout(() => {
//     // console.log("hello");
//     if (true) {
//       resolve("Sucess");
//     } else {
//       reject("Failure");
//     }
//     // }, 2000);
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
const prom = new Promise((res, rej) => {
  if (Math.random() > 0.5) {
    res("success");
  } else {
    rej("failure");
  }
});

prom
  .then(
    (data) => {
      console.log("success handler", data);
      throw Error("erro");
      //error thrown inside success handler remain unhandled,
      //so we would need .catch handler at last
    },
    (error) => {
      console.log("error hadnler", error);
    },
  )
  .catch((finalErr) => {
    console.log(".catch error", finalErr);
    return "Beer";
  })
  .then((afterparty) => console.log("afterParty", afterparty)); // yes .then() after .catch() also works
