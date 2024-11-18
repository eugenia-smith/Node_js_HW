import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "La-vuelta240577",
  database: "product_db",
});

connection.connect((err) => {
  if (err) {
    console.error("DB connection error: ", err.stack);
    return;
  }
  console.log("Connected to DB as: " + connection.threadId);
});

export default connection;
