const sql = require("mysql");

const connection = sql.createConnection({
  host: "localhost",
  port: 3306,
  database: "learningbit",
  user: "aditya",
  password: "aditya123",
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("LearningBit Db Connected");
});

module.exports = connection;
