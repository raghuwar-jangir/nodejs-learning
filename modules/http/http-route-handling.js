const http = require("http");
const fs = require("fs");
const https = require("https");
const { hostname } = require("os");

const getRequestHandler = (req, res) => {
  const pathname = req.url;

  if (pathname === "/users") {
    makeDatabaseRequest((err, data) => {
      if (err) {
        res.writeHeader(400);
        res.write("Error occured");
      } else {
        res.writeHeader(200);
        res.write(JSON.stringify(data));
      }
      res.end();
    });
  } else if (pathname === "/codecademy-users") {
    const options = {
      hostname: "static-assets.codecademy.com",
      path: "/Courses/Learn-Node/http/data.json",
      method: "GET",
    };

    //external http request to the codecademy database
    const request = https.request(options, (response) => {
      //data comes in chunk
      let data = "";
      response.on("data", (payload) => {
        data += payload;
      });

      response.on("end", () => {
        res.write(data);
        res.end();
      });
    });
    request.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
};

const server = http.createServer((req, res) => {
  const method = req.method;

  if (method === "GET") {
    getRequestHandler(req, res);
  } else {
    throw new Error(`Unsupported request method: ${method}`);
  }
});

server.listen(8080, () => {
  console.log("server is running on 8080");
});

const makeDatabaseRequest = (cb) => {
  fs.readFile("./users.json", "utf-8", (err, data) => {
    if (err) {
      cb(err);
    } else {
      cb(null, JSON.parse(data));
    }
  });
};
