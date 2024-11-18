import express from "express";
import sequelize from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hi, that's Seq in express");
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection established");
    console.log(`Server is running on port: ${PORT}`);
  } catch (error) {
    console.error("Connection failed", error);
  }
});
