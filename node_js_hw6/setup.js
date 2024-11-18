import connection from "./db.js";

const createUsersTable = `
CREATE TABLE IF NOT EXISTS product (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
price DECIMAL(8, 2) NOT NULL

)
`;

connection.query(createUsersTable, (err, results) => {
  if (err) {
    console.log("Error while createing the table: ", err.stack);
    return;
  }
  console.log("Table created");
});

connection.end();
