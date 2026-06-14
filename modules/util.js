function getUser(id, callback) {
  return setTimeout(() => {
    if (id === 5) {
      callback(null, { nickname: "Teddy" });
    } else {
      callback(new Error("User not found"));
    }
  }, 1000);
}

// -------> callback way --------->

//   function callback (error, user) {
//     if (error) {
//       console.error(error.message);
//       return;
//     }

//     console.log(`User found! Their nickname is: ${user.nickname}`);
//   }

//   getUser(1, callback); // Prints: User not found
//   getUser(5, callback); // Prints: User found! Their nickname is: Teddy

// -------> promise way --------->

const util = require("util");

const getUserPromise = util.promisify(getUser);

async function fetchUser(id) {
  try {
    const data = await getUserPromise(id);
    console.log("data >>", data);
  } catch (error) {
    console.log("err >>", error.message);
  }
}

fetchUser(1);
fetchUser(5);
