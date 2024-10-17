"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = require("inquirer");
var queries_1 = require("./queries");
function promptUser() {
  inquirer_1.default
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
    .then(function (answers) {
      switch (answers.action) {
        case "View All Departments":
          (0, queries_1.viewDepartments)();
          break;
        case "View All Roles":
          (0, queries_1.viewRoles)();
          break;
        case "View All Employees":
          (0, queries_1.viewEmployees)();
          break;
        case "Add Department":
          (0, queries_1.addDepartment)();
          break;
        case "Add Role":
          (0, queries_1.addRole)();
          break;
        case "Add Employee":
          (0, queries_1.addEmployee)();
          break;
        case "Update Employee Role":
          (0, queries_1.updateEmployeeRole)();
          break;
        case "Exit":
          console.log("Goodbye!");
          process.exit();
      }
      console.log(answers);
    });
}
exports.default = promptUser;
