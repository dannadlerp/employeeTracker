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
        connection.query("SELECT * FROM department", (err, res) => {
          if (err) throw err;

          const departmentChoices = res.map((department) => department.name);

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
                choices: departmentChoices,
                message: "Please select which department the role is in:",
              },
            ])
            .then((answer) => {
              const roleDeptID = departmentChoices.indexOf(answer.role_dept);

              connection.query(
                "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", //VALUES (?) creates a placeholder for future value
                [answer.role_input, answer.salary_input, roleDeptID],
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
        });
      } else if (answers.main_selection === "Add an employee") {
        connection.query("SELECT * FROM role", (err, roleRes) => {
          if (err) throw err;
          const roleChoices = roleRes.map((role) => role.title);

          connection.query("SELECT * FROM employee", (err, employeeRes) => {
            console.log("employee rec:", employeeRes);
            if (err) throw err;
            const employeeChoices = employeeRes.map((employee) => [
              employee.first_name_input,
              employee.last_name_input,
            ]);

            inquirer
              .prompt([
                {
                  name: "first_name_input",
                  type: "input",
                  message: "Please input the employee's first name:",
                },
                {
                  name: "last_name_input",
                  type: "input",
                  message: "Please input the employee's last name:",
                },
                {
                  name: "role_select",
                  type: "list",
                  choices: roleChoices,
                  message: "Please select which department the role is in:",
                },
              ])
              .then((answer) => {
                const roleSelectID = roleChoices.indexOf(answer.role_select);
                console.log(`role ID: ${roleSelectID}`);
                /*
                const roleDeptID = departmentChoices.indexOf(answer.role_dept);

                const roleSelectID = roleRes.map((role) => ({
                  name: role.title,
                  value: role.id,
                }));
 */
                connection.query(
                  "INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)", //VALUES (?) creates a placeholder for future value
                  [
                    answer.first_name_input,
                    answer.last_name_input,
                    roleSelectID,
                  ],
                  (err, res) => {
                    if (err) throw err;
                    console.log("employee added successfully");

                    init(); //brings back to menu
                  }
                );
              });
          });
        });
      }
      /* .catch((error) => {
      errorHandler(res, err); */
    });

  console.log("finished");
}
