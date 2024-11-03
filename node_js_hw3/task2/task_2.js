const fs = require("fs");

fs.writeFile("info.txt", "Node.js is awsome", "utf-8", (err) => {
  try {
    if (err) {
      console.log("Error while creating a file:", err);
      return;
    }
    console.log("The file is created");
  } catch (error) {
    console.error(error);
  }
});

fs.readFile("info.txt", "utf-8", (err, data) => {
  try {
    if (err) {
      console.log("Error while raeding a file:", err);
      return;
    }
    console.log("Content is as follows: ", data);
  } catch (error) {
    console.error(error);
  }
});
