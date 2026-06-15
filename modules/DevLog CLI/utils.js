import fs from "fs";
import events from "events";
import readline from "readline";

const eventEmitter = new events.EventEmitter();

const logToScreen = (str) => {
  process.stdout.write(`${str} \n`);
  process.exit();
};
eventEmitter.on("logToScreen", logToScreen);

//both streaming and readFile works but This is actually the right way to read logs —
//  stream line by line.

export const readLogsCB = () => {
  // ✅ Create stream HERE — on demand, not at module load
  const readStream = fs.createReadStream("./logs.txt");
  const myInterface = readline.createInterface({ input: readStream });

  process.stdout.write(`📚 Your Learning History:\n`);
  process.stdout.write(`─────────────────────────\n`);
  myInterface.on("line", (line) => {
    process.stdout.write(line + "\n");
  });

  myInterface.on("close", () => {
    process.stdout.write(`─────────────────────────\n`);
    process.stdout.write("✅ End of log.\n");
    process.exit();
  });
};

// export const readLogsCB = async () => {
//   // utf-8 gives you a string instead of buffer, so using .toString() is unnecessary
//   fs.readFile("./logs.txt", "utf-8", (err, logs) => {
//     if (err) {
//       console.error("Oh no ! error in reading logs!");
//       return;
//     }

//     // const logs = data.toString();
//     if (logs == "") {
//       process.stdout.write(`nothing to show 😕\n`);
//       process.exit();
//     }

//     process.stdout.write(`📚 Your Learning History:\n`);
//     process.stdout.write(`─────────────────────────\n`);
//     process.stdout.write(logs + "\n");
//     process.stdout.write(`─────────────────────────\n`);
//     process.stdout.write(`✅ End of log.\n`);
//     process.exit();
//   });
// };

eventEmitter.on("readLogs", readLogsCB);

export const addLog = () => {
  //append mode, not overwrites file every run
  const writeStream = fs.createWriteStream("./logs.txt", { flags: "a" });

  process.stdout.write(`📝 What did you learn today?\n`);

  process.stdin.once("data", (data) => {
    const log = data.toString().trim();
    const date = new Date();
    const str = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} : ${log}`;
    writeStream.write(str + "\n");
    writeStream.end();
    eventEmitter.emit("logToScreen", "✅ Log saved!");
  });
};

export const readLogs = () => {
  eventEmitter.emit("readLogs");
};
