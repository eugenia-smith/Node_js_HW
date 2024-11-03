const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

function sendMessage(username, message, emitter) {
  emitter.emit("message", username, message);
}

eventEmitter.on("message", (user, message) => {
  console.log(`${user}: ${message}`);
});

sendMessage("Ben", "Hi, there", eventEmitter);
sendMessage("Vasia", "Have a great day all", eventEmitter);
sendMessage("Ann", "I am out today", eventEmitter);
