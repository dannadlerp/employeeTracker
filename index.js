const inquirer = require('inquirer');
const mysql2 = require('mysql2');

const init = async () => {
mysql2
await inquirer

.prompt([
  {
    name: "menu",
    type: "list",
    choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"],
    message: "Main Menu: Please make a selection.",
  }
  
])

.then(
    // => {};
)

console.log("finished");
}
init();