const mysql = require("mysql2");
require("dotenv").config();
const { PORT, DB_PWD } = process.env;

const connection = mysql.createConnection({
  host: "localhost",
  port: PORT,
  user: "root",
  password: DB_PWD,
  database: "employee_tracker_db",
});

// Middleware to handle errors
function errorHandler(res, error) {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
}

/* router.get("/", (req, res) => {
  connection.query("select all from employee");
});
 */
module.exports = { mysql, connection, errorHandler };
