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
              message: "Please input the department name to add:",
            },
          ])
          .then((answer) => {
            connection.query(
              "INSERT INTO department (name) VALUES (?)", //VALUES (?) creates a placeholder for future value
              [answer.dept_input],
              (err, res) => {
                if (err) throw err;
                console.log("Department added successfully");
                connection.query("SELECT * FROM department", (err, res) => {
                  if (err) throw err;
                });
                init(); //brings back to menu
              }
            );
          });
      } else if (answers.main_selection === "Add a role") {
        inquirer
          .prompt([
            {
              name: "role_input",
              type: "input",
              message: "Please input the role name to add:",
            },
            {
              name: "salary_input",
              type: "input",
              message: "Please input the role salary to add:",
              validate: function (value) {
                return (
                  Number.isInteger(Number(value)) ||
                  "Please enter a valid integer"
                );
              },
            },
            {
              name: "role_dept",
              type: "list",
              choices: ["Contractors", "Accounting"],
              message: "Please select which department the role is in:",
            },
          ])
          .then((answer) => {
            connection.query(
              "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", //VALUES (?) creates a placeholder for future value
              [answer.role_input, answer.salary_input, answer.role_dept],
              (err, res) => {
                if (err) throw err;
                console.log("Role added successfully");
                connection.query("SELECT * FROM role", (err, res) => {
                  if (err) throw err;
                });
                init(); //brings back to menu
              }
            );
          });
      }
      /* .catch((error) => {
      errorHandler(res, err); */
    });

  console.log("finished");
}
