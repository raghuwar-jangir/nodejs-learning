const http = require("http");
const {
  fetchLogs,
  addNewLog,
  fetchUsersExternally,
  getStats,
} = require("./helpers");

const getRequestHandler = (req, res) => {
  //important step in http request handling for url like this localhost:8000/logs?limit=5
  const baseUrl = `https://${req.headers.host}`;
  const parsedUrl = new URL(req.url, baseUrl);
  const pathname = parsedUrl.pathname;

  if (pathname == "/") {
    res.statusCode = 200;
    res.end("👋 Welcome to DevLog HTTP Server!");
  } else if (pathname == "/logs") {
    fetchLogs()
      .then((data) => {
        // res.statusCode = 200;
        res.writeHeader(200, {
          "Content-Type": "application/json",
        });
        return res.end(JSON.stringify(data));
      })
      .catch((err) => {
        res.statusCode = 500;
        return res.end("Internal Server Error");
      });
  } else if (pathname == "/users") {
    fetchUsersExternally()
      .then((data) => {
        res.statusCode = 200;
        res.end(JSON.stringify({ users: data }));
      })
      .catch((err) => {
        // ✅ 502 = Bad Gateway (YOUR server failed to reach external server)
        res.statusCode = 502;
        res.end("error in fetching user externalyy");
      });
  } else if (pathname == "/stats") {
    getStats()
      .then((data) => {
        res.writeHeader(200, {
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify(data));
      })
      .catch((err) => {
        res.statusCode = 500;
        res.end("Error in fetching stats");
      });
  } else {
    res.statusCode = 404;
    res.end("Not found");
  }
};

const postRequestHanlder = (req, res) => {
  const pathname = req.url;

  if (pathname == "/logs") {
    let body = ""; //string
    req.on("data", (bodyChunk) => {
      //**   important  */
      //body(string) + bodyChunk(buffer object),
      // coersion happens and javascript will convert buffer Object to string and expression become string + string
      body += bodyChunk;
    });

    req.on("end", () => {
      const date = new Date();
      const logText = JSON.parse(body)["text"];
      if (!logText) {
        res.statusCode = 400;
        return res.end("❌ Missing 'text' field in body");
      }
      const newLog = {
        date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
        text: logText,
      };
      addNewLog(newLog)
        .then((data) => {
          res.statusCode = 201;
          return res.end(JSON.stringify(data));
        })
        .catch((err) => {
          res.statusCode = 400;
          return res.end("error in adding log");
        });
    });
  }
};

const server = http.createServer((req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      return getRequestHandler(req, res);
    case "POST":
      return postRequestHanlder(req, res);

    default:
      res.statusCode = 400;
      res.end("wrong method");
  }
});

server.listen(8000, () => {
  console.log("server is listening on port 8000");
});
