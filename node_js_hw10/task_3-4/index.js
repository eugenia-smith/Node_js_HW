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
    username: "Bill",
    email: "bill@email.com",
    password: await bcrypt.hash("billpass12345", 10),
    role: "user",
  },
  {
    id: 2,
    username: "Max",
    email: "max@email.com",
    password: await bcrypt.hash("maximus12345", 10),
    role: "admin",
  },
  {
    id: 3,
    username: "Elli",
    email: "elli@email.com",
    password: await bcrypt.hash("elli654321", 10),
    role: "user",
  },
];

// аутентификация и генерация токена
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = users.find((elem) => elem.email === email);

    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      jwtSecret,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// проверка токена
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7, authHeader.length);

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) {
        res.status(403).json({ message: "Forbidden" });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: "Unauthorized: no token provided" });
  }
}

//проверка роли
function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role === role) {
      next();
    } else {
      return res.status(403).json({ message: "Forbidden: access denied" });
    }
  };
}

//маршрут для админов
app.post(
  "/update-role",
  authenticateJWT,
  authorizeRole("admin"),
  (req, res) => {
    try {
      const { userId, newRole } = req.body;

      if (!userId || !newRole) {
        return res
          .status(400)
          .json({ message: "User ID and new role required" });
      }

      const user = users.find((elem) => elem.id === userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.role = newRole;

      res.status(200).json({
        message: "Role has been updated",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Error updating data" });
    }
  }
);

app.post("/refresh-token", authenticateJWT, (req, res) => {
  try {
    const { userId, email, role } = req.user;

    const newToken = jwt.sign(
      {
        userId,
        email,
        role,
      },
      jwtSecret,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token: newToken });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error refreshing token", error: error.message });
  }
});

app.get("/", (req, res) => {
  res.status(200).json(users);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
