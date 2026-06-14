process.stdin.on("data", (data) => {
  input = data.toString();
  if (input == 3) {
    console.log("right");
    process.exit();
  } else {
    console.log("wrong");
  }
});
