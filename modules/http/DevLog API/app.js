const http = require("http");
const { fetchLogs, addNewLog, fetchUsersExternally } = require("./helpers");

const getRequestHandler = (req, res) => {
  //important step in http request handling for url like this localhost:8000/logs?limit=5
  const baseUrl = `https://${req.headers.host}`;
  const parsedUrl = new URL(req.url, baseUrl);
  const pathname = parsedUrl.pathname;

  if (pathname == "/") {
    res.statusCode = 200;
    res.end("👋 Welcome to DevLog HTTP Server!");
  } else if (pathname == "/logs") {
    fetchLogs((err, data) => {
      if (err) {
        res.statusCode = 500;
        return res.end("Internal Server Error");
      } else {
        res.statusCode = 200;
        return res.end(JSON.stringify(data));
      }
    });
  } else if (pathname == "/users") {
    fetchUsersExternally((err, data) => {
      if (err) {
        // ✅ 502 = Bad Gateway (YOUR server failed to reach external server)
        res.statusCode = 502;
        res.end("error in fetching user externalyy");
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify({ users: data }));
      }
    });
  } else {
    res.statusCode = 404;
    res.end("Not found");
  }
};

const postRequestHanlder = (req, res) => {
  const pathname = req.url;

  if (pathname == "/logs") {
    let body = "";
    req.on("data", (bodyChunk) => {
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
      addNewLog(newLog, (err, data) => {
        if (err) {
          res.statusCode = 400;
          return res.end("error in adding log");
        } else {
          // 201 = Created (something new was created) ← correct for POST
          res.statusCode = 201;
          return res.end(JSON.stringify(newLog));
        }
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
