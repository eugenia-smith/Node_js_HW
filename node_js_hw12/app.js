import express from "express";
import dotenv from "dotenv";
import { connectToDatabase, getDb } from "./db/index.js";
import { ObjectId } from "mongodb";

dotenv.config();

const port = process.env.PORT || 3003;
const app = express();

app.use(express.json());

//подсключение к Mongo при запуске сервера
connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log("Failed to start the server", error);
  });

app.get("/", (req, res) => {
  res.send("Hi there");
});

// маршрут для создания нового продукта
app.post("/products", async (req, res) => {
  try {
    const db = getDb();
    const product = req.body;

    if (!product.name || !product.price || !product.description) {
      return res.status(400).json({ error: "All product data required" });
    }

    const result = await db.collection("products").insertOne(product);

    res.status(201).json({ ...product, _id: result.insertedId });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
});

// маршрут `GET /products` для получения списка всех продуктов
app.get("/products", async (req, res) => {
  try {
    const db = getDb();
    const products = await db.collection("products").find().toArray();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// маршрут `GET /products/:id` для получения конкретного продукта по ID
app.get("/products/:id", async (req, res) => {
  try {
    const db = getDb();
    const productId = req.params.id;

    if (!ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(productId) });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// маршрут `PUT /products/:id` для обновления информации о продукте
app.put("/products/:id", async (req, res) => {
  try {
    const db = getDb();
    const productId = req.params.id;
    const updateData = req.body;

    if (!ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid productId" });
    }

    const result = await db
      .collection("products")
      .updateOne({ _id: new ObjectId(productId) }, { $set: updateData });
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product data updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

// маршрут `DELETE /products/:id` для удаления продукта
app.delete("/products/:id", async (req, res) => {
  try {
    const db = getDb();
    const productId = req.params.id;

    if (!ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const result = await db
      .collection("products")
      .deleteOne({ _id: new ObjectId(productId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});
