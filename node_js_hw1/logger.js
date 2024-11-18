const fs = require("fs");

function logMessage(message) {
  fs.appendFile("logFile.txt", `${message}\n`, (err) => {
    if (err) {
      console.error("Failed to log:", err);
      return;
    } else {
      console.log("Log File has been updated");
    }
  });
}

module.exports = {
  logMessage,
};
