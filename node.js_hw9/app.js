import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import sequelize from "./config/db.js";
import User from "./models/User.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3303;

app.use(express.json());

// маршрут проверки сервера
app.get("/", (req, res) => {
  res.status(200).send(`server started on port: ${port}`);
});

//получение всех юзеров
app.get("/register", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error reading users: ", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// запрос на регистарцию
app.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ message: "incomplete data" });
    }

    // проверка уникальности эл.адреса
    const ifExists = await User.findOne({ where: { email } });
    if (ifExists) {
      return res
        .status(400)
        .json({ message: "this email is already registered" });
    }

    // хэширование пароля
    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      username,
      email,
      password: hashedPass,
      role: role || "user",
    });

    res.status(201).json({ message: "registered successfully", user: newUser });
  } catch (error) {
    console.error("registration error", error);
    res
      .status(500)
      .json({ message: "registaration failed", error: error.message });
  }
});

// middleware для проверки необходимости менять пароль
// по email ищем user'a, проверяем его mustChangePass
const checkMustChangePassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: "not found" });
  }

  if (user.mustChangePassword) {
    return res.status(403).json({ message: "change the password" });
  }
  next();
};

// маршрут для обновления пароля
app.post("/password-change", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: "data required" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "not found" });
    }

    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    user.password = hashedNewPassword;
    user.mustChangePassword = false;
    await user.save();

    res.status(200).json({ message: "password changed" });
  } catch (error) {
    console.error("error changing password", error);
    res.status(500).json({ message: "error changing password" });
  }
});

app.post("/login", checkMustChangePassword, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "incomplete data" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "user is not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "invalid data" });
    }

    if (user.mustChangePassword) {
      return res.status(403).json({
        message: "password is to be changed",
        redirectTo: "/password-change",
      });
    }
    res.status(200).send("login completed");
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ message: "Error during login", error: error.message });
  }
});

// удаление аккаунта
app.post("/delete-account", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "incomplete data" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json("invalid data");
    }

    await User.destroy({ where: { email } });
    res.status(200).json({ message: "user is deleted" });
  } catch (error) {
    console.error("error deleting account");
    res
      .status(500)
      .json({ message: "failed to delete account", error: error.message });
  }
});

// функциональность админа/юзера
const checkIfAdmin = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "forbidden" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "server error", error: err.message });
  }
};

app.get("/admin", checkIfAdmin, (req, res) => {
  res.status(200).json({ message: "welcome, all-mighty" });
});

// обновление e-mail
app.post("/change-email", async (req, res) => {
  try {
    const { email, newEmail, password } = req.body;

    if (!email || !newEmail || !password) {
      return res.status(400).json({ message: "incomplete data" });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "invalid data" });
    }

    // проверка уникальности эл.адреса
    const ifExists = await User.findOne({ where: { email: newEmail } });
    if (ifExists) {
      return res
        .status(400)
        .json({ message: "this email is already registered" });
    }

    user.email = newEmail;
    await user.save();

    res.status(200).json({ message: "email changed" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error changing email", error: error.message });
  }
});

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log("connection established");
    console.log(`listening to the server on ${port}`);
  } catch (error) {
    console.error("unable to connect to the db: ", error);
  }
});
