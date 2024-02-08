const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const express = require('express');
const app = express();
const employeeRoutes = require('./routes/employeeRoutes');
const roleRoutes = require('./routes/roleRoutes');
const deptRoutes = require('./routes/deptRoutes');

app.use('/employee', employeeRoutes);
app.use('/role', roleRoutes);
app.use('/dept', deptRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("listening...");
});


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
    // => { };
)

console.log("finished");
}
init();