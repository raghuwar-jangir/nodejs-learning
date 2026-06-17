const fs = require("fs");
const https = require("https");

const fetchLogs = (cb) => {
  fs.readFile("./logs.json", "utf-8", (err, data) => {
    if (err) {
      cb(err);
    } else {
      if (data) {
        const payload = JSON.parse(data)["logs"];
        cb(null, payload);
      } else {
        cb(null, []);
      }
    }
  });
};

const addNewLog = (newLog, cb) => {
  fs.readFile("./logs.json", "utf-8", (err, data) => {
    if (err) {
      cb(err);
    } else {
      const writeStream = fs.createWriteStream("./logs.json");
      if (data) {
        const logs = JSON.parse(data)["logs"];
        const modifiedLogs = [...logs, newLog];
        writeStream.write(JSON.stringify({ logs: modifiedLogs }));
      } else {
        writeStream.write(JSON.stringify({ logs: [newLog] }));
      }
      cb(null, newLog);
    }
  });
};

const fetchUsersExternally = (cb) => {
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
      cb(null, JSON.parse(data));
    });
  });
  request.on("error", (err) => {
    cb(err);
  });

  request.end();
};

module.exports = {
  fetchLogs,
  addNewLog,
  fetchUsersExternally,
};
