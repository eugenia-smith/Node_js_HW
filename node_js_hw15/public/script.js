// Инициализация подключения
const socket = io();

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

// Получаем элементы DOM
const form = document.querySelector(".chat_form");
const input = document.querySelector("input[name='chat_input']");
const chat = document.querySelector(".messages");

// Обработчик отправки формы
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const message = input.value.trim();
  if (message) {
    socket.emit("chatMessage", message); // Отправляем на сервер
    input.value = ""; // Очищаем поле ввода
  }
});

// Обработка входящих сообщений от сервера
socket.on("message", (msg) => {
  const li = document.createElement("li");
  li.textContent = ` Client: ${msg}`;
  chat.appendChild(li);
});

socket.on("reply", (confirmation) => {
  const li = document.createElement("li");
  li.textContent = `Server: ${confirmation}`;
  li.style.textAlign = "right"; // Дополнительно для стиля
  chat.appendChild(li);
});

// Тестовый вызов для проверки рендера
// socket.emit("chatMessage", "Test message from client");
