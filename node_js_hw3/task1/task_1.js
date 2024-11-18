const fs = require("fs");

fs.mkdir("myFolder", (err) => {
  try {
    if (err) {
      console.log("Error while creating the catalogue: ", err);
      return;
    }
    console.log("New catalogue is created");
  } catch (error) {
    console.log(error);
  }
});

fs.rmdir("myFolder", (err) => {
  try {
    if (err) {
      console.log("Error while deleting the folder");
      return;
    }
    console.log("The folder is successfully deleted");
  } catch (error) {
    console.log(error);
  }
});
