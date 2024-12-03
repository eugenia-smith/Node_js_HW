import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const port = process.env.PORT || 3003;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chatMessage", (msg) => {
    console.log("message received: " + msg);

    io.emit("message", msg);

    socket.emit("reply", "It is clear!");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log(`server is running on port: *:${port}`);
});

// io.on("connection", (socket) => {
//   socket.on("message", (msg) => {
//     socket.emit("reply", "It is clear!")
//   })
// })
