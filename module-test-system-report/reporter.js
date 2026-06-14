const os = require("os");
const util = require("util");
const fs = require("fs");

// Promisify ONCE at top — good practice
const readFileAsync = util.promisify(fs.readFile);

// Two values to test util.types — one real Date, one fake
const realDate = new Date();
const fakeDate = "13-06-2026";

const getConfig = async () => {
  try {
    const raw = await readFileAsync("./config.txt");
    return raw.toString().trim(); // "env=production"
  } catch (error) {
    console.error("Config file read failed:", error.message); // always log the error
    return "unknown";
  }
};

const main = async () => {
  try {
    const configRaw = await getConfig();

    // Parse "env=production" → "production"
    const configValue = configRaw.includes("=")
      ? configRaw.split("=")[1]
      : configRaw;

    // Memory check — this is WHY os module matters in real apps
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const freePercent = ((freeMem / totalMem) * 100).toFixed(1);

    // Warn if memory is low — real production health check pattern
    if (freePercent < 30) {
      console.warn(`⚠️  Low memory warning: only ${freePercent}% free`);
    }

    const memorySnapshot = process.memoryUsage(); // capture once, use consistently

    const report = {
      // os — system info
      os_platform: os.type(),
      os_arch: os.arch(),
      os_uptime_minutes: (os.uptime() / 60).toFixed(1),
      os_total_mem_gb: (totalMem / 1e9).toFixed(2),
      os_free_mem_percent: `${freePercent}%`,

      // process — this script's own runtime info
      process_pid: process.pid,
      process_cwd: process.cwd(), // portable, works on Windows too
      process_node_ver: process.version,
      process_heap_mb: (memorySnapshot.heapUsed / 1e6).toFixed(2) + " MB",

      // util.types — type checking
      util_realDate_check: util.types.isDate(realDate)
        ? `✅ ${realDate} is a Date`
        : "❌ not a Date",
      util_fakeDate_check: util.types.isDate(fakeDate)
        ? `✅ Date`
        : `❌ "${fakeDate}" is NOT a Date`,

      // config from file
      config_env: configValue,
    };

    console.table(report);
  } catch (error) {
    console.error("Fatal error in main:", error); // never swallow errors silently
  }
};

main();
