const { mysql, connection, errorHandler } = require("./config/connection");
const inquirer = require("inquirer");
require("dotenv").config();

connection.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
  init();
});

function init() {
  inquirer
    .prompt([
      {
        name: "main_selection",
        type: "list",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
        message: "Main Menu: Please make a selection.",
      },
    ])

    .then((answers) => {
      if (answers.main_selection === "View all departments") {
        connection.query("SELECT * FROM department", (err, res) => {
          if (err) throw err;
          console.log("View all departments:");
          console.table(res);
          init(); //brings back to menu
        });
      }
    })
    .catch((error) => {
      errorHandler(error);
    });

  console.log("finished");
}
init();
