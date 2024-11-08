//Task 1
// const moment = require("moment");

// const now_capital = moment().format(`DD-MM-YYYY`);
// const now_reduced = moment().format(`MMM Do YY`);
// const now_reduced_to_a_day = moment().format("dddd");

// console.log(now_capital, now_reduced, now_reduced_to_a_day);

//Task 2
require("dotenv").config();
const fs = require("fs");
const fileName = process.env.FILE_NAME;

// console.log(fileName);

fs.writeFile(`${fileName}`, "test stuff", "utf-8", (err) => {
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

fs.readFile(`${fileName}`, "utf-8", (err, data) => {
  try {
    if (err) {
      console.error("Error while reading the file:", err);
      return;
    }
    console.log(data);
  } catch (error) {
    console.error(error);
  }
});
