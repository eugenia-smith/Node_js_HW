import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Publisher from "./models/Puplisher.js";
import Magazine from "./models/Magazine.js";
import Tag from "./models/Tag.js";
import Article from "./models/Article.js";

dotenv.config();

const port = process.env.PORT || 3003;
const mongoUri = process.env.MONGO_URI;

const app = express();

mongoose
  .connect(mongoUri, {})
  .then(() => {
    console.log("Connection established");
  })
  .catch((error) => {
    console.error("Connection failed", error);
  });

// // Задание - 1: Тестирование создания Publisher и Magazine с привязкой
async function testRelationships() {
  try {
    // Создать издателя
    const publisher = new Publisher({
      name: "Tech Publishers",
      location: "NY",
    });
    await publisher.save();

    // Создать журнал с привязкой к издателю
    const magazine = new Magazine({
      title: "Tech Monthly",
      issueNumber: "42",
      publisher: publisher._id, // Ссылка на _id Publisher
    });
    await magazine.save();

    // Получить журнал с информацией об издателе
    const result = await Magazine.findOne({ title: "Tech Monthly" }).populate(
      "publisher"
    );

    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
}

// testRelationships();

// Задание - 2: Тестирование Tags and Articles

async function createArticleWithTags(title, contents, tagNames) {
  try {
    // Поиск или создание тегов
    const tags = await Promise.all(
      tagNames.map(async (name) => {
        let tag = await Tag.findOne({ name });
        if (!tag) {
          tag = new Tag({ name });
          await tag.save();
        }
        return tag;
      })
    );

    // Создание статьи с привязкой тегов
    const article = new Article({
      title,
      contents,
      tags: tags.map((tag) => tag._id),
    });

    await article.save();

    // Обновление тегов с привязкой к статье
    await Promise.all(
      tags.map(async (tag) => {
        if (!tag.articles.includes(article._id)) {
          tag.articles.push(article._id);
          await tag.save();
        }
      })
    );

    console.log("Article and tags updated successfully!");
  } catch (error) {
    console.error("Error creating article with tags:", error.message);
  }
}

// await createArticleWithTags(
//   "The Pancakes",
//   "This is a detailed article about how to eat and cook perfect pancakes".repeat(
//     6
//   ),
//   ["Technology", "Food"]
// );

app.get("/", (req, res) => {
  res.status(200).json(result);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
