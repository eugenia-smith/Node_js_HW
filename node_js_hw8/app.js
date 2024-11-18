import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import Book from "./models/Book.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi, it's an express server");
});

//получение всех книг
app.get("/books", async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    console.error("Error reading books: ", error);
    res.status(500).json({ message: "Failed to fetch books" });
  }
});

//добавление новой книги
app.post("/books", async (req, res) => {
  try {
    const { title, author, year } = req.body;
    if (!title || !author || !year) {
      res.status(500).json({ message: "Missing data" });
    }
    const newBook = await Book.create({
      title,
      author,
      year,
    });
    res.status(200).json(newBook);

    console.log("Book added", newBook.toJSON());
  } catch (error) {
    console.error("Error adding a book: ", error);
    res.status(500).json({ message: "Failed to add" });
  }
});

//обновление данных
app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, year } = req.body;

    if (!title && !author && !year) {
      res.status(400).json({ message: "No fields to update provided" });
    }

    const [rowsToUpdate] = await Book.update(
      { title, author, year },
      { where: { id } }
    );

    if (rowsToUpdate > 0) {
      res.json(`Book with ID ${id} is updated`);
    } else {
      res.status(400).json({ message: "Book not found" });
    }
  } catch (error) {
    console.error("Error updating data: ", error);
    res.status(500).json({ message: "Failed to update" });
  }
});

//удаление данных
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const rowsToDelete = await Book.destroy({
      where: { id },
    });

    if (rowsToDelete > 0) {
      console.log(`Book with ID ${id} is deleted`);
      res.json({ message: `Book with ID ${id} is deleted` });
    } else {
      res.status(400).json({ message: "Book not found" });
    }
  } catch (error) {
    console.error("Error deleting data: ", error);
    res.status(500).json({ message: "Failed to delete the book" });
  }
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
