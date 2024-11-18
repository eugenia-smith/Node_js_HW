import http from "http";
import fs from "fs";

// Task 1

// const server = http.createServer((req, res) => {
//   res.setHeader("Content-Type", "text/plain");
//   console.log(req.headers);

//   if (req.headers.authorization) {
//     res.statusCode = 200;
//     res.end("Authorization received");
//   }
//   res.statusCode = 401;
//   res.end("Unauthorized");
// });

// server.listen(3333, () => {
//   console.log("Server is running on port 3333");
// });

// Task 2

// const server = http.createServer((req, res) => {
//   try {
//     throw new Error("test error required");
//   } catch (error) {
//     fs.appendFile("errors.log", `${error.message}\n`, "utf-8", (error) => {
//       if (error) {
//         console.error("error when writing a file: ", error);
//       }
//     });
//   }

//   res.statusCode = 500;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Server error");
// });

// server.listen(3333, () => {
//   console.log("Serevr is running on port 3333");
// });

// Task 3

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain");

  if (req.method === "PUT") {
    res.statusCode = 200;
    res.end("PUT-request is processed");
  } else if (req.method === "DELETE") {
    res.statusCode = 200;
    res.end("DELETE-request is processed");
  }
  res.statusCode = 500;
  res.end(`${req.method}-method is not allowed`);
});

server.listen(3333, () => {
  console.log("Server is running on port 3333");
});
