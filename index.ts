import inquirer from "inquirer";

function promptUser(): void {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "Exit",
        ],
      },
    ])
    .then((answers) => {
      console.log(answers);
    });
}
