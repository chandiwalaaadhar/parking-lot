const fs = require("fs"),
  InterativeConsoleService = require("./service/interactiveConsoleService");

var commandLineInput = process.argv; // reading command line inputs

// to avoid memory leaks errors, default max listeners = 10
require("events").EventEmitter.defaultMaxListeners = 0;

if (
  commandLineInput.length === 3 &&
  commandLineInput[commandLineInput.length - 1].endsWith(".txt") //determine if the input is a file
) {
  fs.readFile(commandLineInput[2], "utf-8", function (err, data) {
    if (err) {
      console.log("An error occured while Reading the File: " + err.message);
    }

    var arr = data.split("\n");
    for (var i = 0; i < arr.length; i++) {
      InterativeConsoleService.processUserCommands(arr[i]);
    }

    // returning to console once all the inputs are processed
    process.exit(0);
  });
} else {
  InterativeConsoleService.openInteractiveConsole();
}
