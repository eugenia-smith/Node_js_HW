import express from "express";
import connection from "./db.js";

const app = express();
const port = 3033;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//маршруты из задания 3

app.get("/", (req, res, next) => {
  try {
    res.send("hi, i am your express server");
  } catch (error) {
    next(error);
  }
});

app.post("/", (req, res, next) => {
  try {
    const userName = req.body.username;
    const randomData = req.body.data;
    if (!userName || !randomData) {
      return res.status(400).json({ err: "incomplete data" });
    }
    res.send(`Username: ${userName}, Data: ${randomData}`);
  } catch (error) {
    next(error);
  }
});

//маршруты из задания 5

app.get("/product", (req, res) => {
  const query = "SELECT * FROM product";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching product ", err.stack);
      res.status(500).send("Fetching failed");
      return;
    }
    res.json(results);
  });
});

app.post("/product", (req, res, next) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: "incomplete data" });
  }

  const query = "INSERT INTO product (name, price) VALUES (?, ?)";

  connection.query(query, [name, price], (err, results) => {
    if (err) {
      console.error("Error adding a product: ", err.stack);
      res.status(500).send("Failed to add a product");
      return;
    }
    // res.status(201).send("Product is added");
    res
      .status(201)
      .json({ message: "Product is added", productId: results.insertId });
  });
});

//middleware для обработки ошибок

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "server failed to process the request",
    error: err.message,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
