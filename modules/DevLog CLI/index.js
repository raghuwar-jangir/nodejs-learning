import { addLog, readLogs } from "./utils.js";

process.stdout.write(`👋 Welcome to DevLog CLI!\n`);
process.stdout.write(`What do you want to do?\n`);
process.stdout.write(`→ Type  'add'   to log today's learning\n`);
process.stdout.write(`→ Type  "read"  to see all past logs\n`);
process.stdout.write(`→ Type  "exit"  to quit\n`);

process.stdin.once("data", (input) => {
  const inputStr = input.toString().trim();
  if (inputStr == "add") {
    addLog();
  } else if (inputStr == "read") {
    readLogs();
  } else if (inputStr == "exit") {
    console.log("👋 Goodbye! Keep building, Raghuwar.");
    process.exit();
  } else {
    console.log("❌ wrong command, try again");
    process.exit();
  }
});
