const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",
  port: PORT,
  user: "root",
  password: DB_PWD,
  database: "employee_tracker_db",
});
connection.connect((err) => {
  if (err) {
    console.log(`Error: ${err}`);
    return;
  }
  console.log("Connected to SQL server");
});

// Middleware to handle errors
function errorHandler(res, error) {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
}

router.get("/", (req, res) => {
  connection.query("select all from employee");
});

(module.exports = mysql), connection, errorHandler;
