import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./models/Category.js";
import Product from "./models/Product.js";

dotenv.config();

const port = process.env.PORT || 3303;
const mongoURI = process.env.MONGO_URI;
const app = express();

mongoose
  .connect(mongoURI, {})
  .then(() => {
    console.log("Connection established");
  })
  .catch((error) => {
    console.error("Connection failed", error);
  });

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hi there!");
});

app.post("/categories", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Category name is mandatory" });
    }

    const category = new Category({ name });
    await category.save();
    res.status(201).json({ message: "Category saved", category });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving category", error: error.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    const { name, price, category } = req.body;
    if (!name || !price || !category) {
      return res.status(400).json({ message: "Incomplete data" });
    }

    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const product = new Product({ name, price, category });
    await product.save();
    res.status(201).json({ message: "Product saved", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving product", error: error.message });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({}).populate("category").exec();

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on poprt: ${port}`);
});
