const readline = require("readline");
const fs = require("fs");

// readable stream
const interface = readline.createInterface({
  input: fs.createReadStream("./fruits.txt"),
});

const writeStream = fs.createWriteStream("./output.txt");

interface.on("line", (data) => {
  // //writeable stream
  console.log(typeof line)
  writeStream.write(`${data}\n`);
});
