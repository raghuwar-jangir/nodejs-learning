const fs = require("fs");
const https = require("https");

const fetchLogs = () => {
  return fs.promises
    .readFile("./logs.json", "utf-8")
    .then((data) => {
      if (data) {
        const payload = JSON.parse(data)["logs"];
        return payload;
      } else {
        return [];
      }
    })
    .catch((err) => {
      // ❌ Your code — error becomes resolved value!
      // return err; //this RESOLVES the promise with the error object

      throw err; // ✅ Fix — re-throw so the caller's .catch() actually fires
    });
};

const addNewLog = (newLog) => {
  return fs.promises
    .readFile("./logs.json", "utf-8")
    .then((data) => {
      const writeStream = fs.createWriteStream("./logs.json");
      const logs = data ? JSON.parse(data)["logs"] : [];
      const modifiedLogs = [...logs, newLog];
      writeStream.write(JSON.stringify({ logs: modifiedLogs }));
      return newLog;
    })
    .catch((err) => {
      throw err;
    });
};

const fetchUsersExternally = () => {
  return new Promise((res, rej) => {
    const options = {
      hostname: "jsonplaceholder.typicode.com",
      path: "/users",
      method: "GET",
    };

    const request = https.request(options, (response) => {
      let data = "";
      response.on("data", (chunk) => {
        data += chunk;
      });
      response.on("end", () => {
        res(JSON.parse(data));
      });
    });
    request.on("error", (err) => {
      rej(err);
    });

    request.end();
  });
};

const getStats = () => {
  return Promise.all([fetchLogs(), fetchUsersExternally()])
    .then((data) => {
      const [logs, users] = data;
      return { totalLogs: logs.length, totalUsers: users.length };
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  fetchLogs,
  addNewLog,
  fetchUsersExternally,
  getStats,
};
