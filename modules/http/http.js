const http = require("http");

const server = http.createServer((req, res) => {
  console.log("🚀 ----------------🚀");
  console.log("🚀 ~ url >>>", req);
  console.log("🚀 ----------------🚀");
  res.end(">>>res statement<<<");
});

server.listen(8080, () => {
  console.log("server is listening on 8080");
});
