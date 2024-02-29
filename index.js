import { mysql, connection, errorHandler } from "./config/connection";
const inquirer = require("inquirer");

/* const app = express();
app.use('/employee', employeeRoutes);
app.use('/role', roleRoutes);
app.use('/dept', deptRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("listening...");
});
 */
//connects to DB
connection.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
  init();
});
//middleware
errorHandler();

const init = async () => {
  mysql;
  await inquirer

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
        ],
        message: "Main Menu: Please make a selection.",
      },
    ])

    .then((answers) => {
      if (answers.prompt === "View all departments") {
        connection.query("SELECT * FROM department", (err, res) => {
          if (err) throw err;
          console.log("View all departments:");
          console.table(res);
          init();
        });
      }
    });

  console.log("finished");
};
init();
