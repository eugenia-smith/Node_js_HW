import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  useNewURLParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected successfully to mongoDB");
    dbConnection = client.db();
  } catch (error) {
    console.error("Failed to connect to Mongo DB", error);
    throw error;
  }
}

function getDb() {
  if (!dbConnection) {
    throw new Error("No connection established");
  }

  return dbConnection;
}

export { connectToDatabase, getDb };
