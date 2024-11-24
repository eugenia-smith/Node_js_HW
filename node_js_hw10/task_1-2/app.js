import express from "express";
import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config({ path: "./.env" });

const port = process.env.PORT || 3003;
const jwtSecret = process.env.JWT_SECRET;

const app = express();

app.use(express.json());

// симудяция базы данных
const users = [
  {
    id: 1,
    username: "Ali",
    email: "ali@email.com",
    password: await bcrypt.hash("super123456", 10),
  },
  {
    id: 2,
    username: "Bali",
    email: "bali@email.com",
    password: await bcrypt.hash("mega123456", 10),
  },
];

// маршрут аутентификации

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = users.find((elem) => elem.email === email);

    if (!user) {
      return res.status(404).json({ message: "user is not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ mesaage: "invalid password" });
    }

    const token = jwt.sign(
      {
        userId: user.id, // Это payload токена
        email: user.email,
      },
      jwtSecret, // Это secret из .env
      { expiresIn: "1h" } // Это время жизни токена
    );
    res.json({ token }); // передача токена клиенту
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// создание middleware для проверки токена

function authenticateJWT(req, res, next) {
  // извлечение токена из заголовка
  const authHeader = req.headers.authorization;

  // проверяем передан ли заголовок Authorization и начинается ли он с Bearer
  if (authHeader && authHeader.startsWith("Bearer ")) {
    // извлекаем сам токен
    const token = authHeader.substring(7, authHeader.length);

    //проверяем и декодируем токен
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) {
        // если токен неверный или истекший
        res.status(403).json({ message: "Forbidden" });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: "Unathorized: no token provided" });
  }
}

// Добавить маршрут /update-email, защищённый middleware authenticateJWT.
// Найти пользователя по id из токена.
// Обновить его email.
// Вернуть обновлённые данные или соответствующую ошибку.

app.post("/update-email", authenticateJWT, (req, res) => {
  try {
    const { newEmail } = req.body;
    if (!newEmail) {
      res.status(400).json({ message: "No data provided" });
    }

    // ищем пользователя по id
    const user = users.find((elem) => elem.id === req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isEmailValid = users.find((elem) => elem.email === newEmail);
    if (isEmailValid) {
      return res.status(400).json({ message: "This email is registered" });
    }
    user.email = newEmail;

    res.status(200).json({
      message: "Email has been updated",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
      },
    });
  } catch (error) {
    console.error("error updating email: ", error);
    res.status(500).json({ message: "Error updating data" });
  }
});

// удаление аккаунта
app.delete("/delete-account", authenticateJWT, (req, res) => {
  try {
    const userId = req.user.userId; // ID пользователя из JWT

    // Ищем пользователя в массиве
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    // Удаляем пользователя
    users.splice(userIndex, 1);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
  res.json({ message: `user with is ${userId} deleted` });
});

app.get("/", (req, res) => {
  res.status(200).json(users);
});

app.listen(port, () => {
  console.log(`Server is started on port: ${port}`);
});
