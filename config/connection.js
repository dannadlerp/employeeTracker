const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",
  port: PORT,
  user: "root",
  password: DB_PWD,
  database: "employee_tracker_db",
});
module.exports = connection;
