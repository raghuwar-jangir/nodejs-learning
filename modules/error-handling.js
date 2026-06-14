//async code
const fetchUser = (id, callback) => {
  setTimeout(() => {
    if (id == 3) {
      callback(null, "success");
      return;
    } else {
      callback(new Error("Error in response"));
    }
  }, 3000);
};

// //normal try catch block -----> only work with modern async code like promises
// try {
//   const data = fetchUser(); //no error returned because code to event loop and hence catch block wont run
// } catch (error) {
//   console.log("Error caught", error.message);
// }

//use error first callback approach for older async code

const cb = (err, data) => {
  if (err) {
    console.log("error is captures>> ", err);
    return;
  } else {
    console.log("data>> ", data);
    return;
  }
};

fetchUser(3, cb);
