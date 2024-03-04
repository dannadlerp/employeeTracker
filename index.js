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
      } else if (answers.main_selection === "View all roles") {
        connection.query("SELECT * FROM role", (err, res) => {
          if (err) throw err;
          console.log("View all roles:");
          console.table(res);
          init(); //brings back to menu
        });
      } else if (answers.main_selection === "View all employees") {
        connection.query("SELECT * FROM employee", (err, res) => {
          if (err) throw err;
          console.log("View all employees:");
          console.table(res);
          init(); //brings back to menu
        });
      } else if (answers.main_selection === "Add a department") {
        inquirer
        .prompt([
          {
            name: "dept_input",
            type: "input",
            message: "Please input the department name to add:"
          },
        ])
        .then((answer) => {
          connection.query("INSERT INTO department (name) VALUES (?)", //VALUES (?) creates a placeholder for future value
          [answer.dept_input],
          (err, res) => {
            if (err) throw err;
        })
        connection.query("SELECT * FROM employee", (err, res) => {
          if (err) throw err;
          console.log("Department added successfully");
          init(); //brings back to menu
        });
      })
    })
    .catch((error) => {
      errorHandler(res, err);
      
    });

  console.log("finished");
}
init();
