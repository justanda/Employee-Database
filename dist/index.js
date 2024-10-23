import inquirer from "inquirer";
import { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole, updateEmployeeManager, viewEmployeesByManager, viewEmployeesByDepartment, viewDepartmentBudget, deleteDepartment, deleteRole, deleteEmployee, } from "./queries.js";
function promptUser() {
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
                "Update Employee Manager",
                "View Employees by Manager",
                "View Employees by Department",
                "View Department Budget",
                "Update Employee Role",
                "Delete Department",
                "Delete Role",
                "Delete Employee",
                "Exit",
            ],
        },
    ])
        .then((answers) => {
        switch (answers.action) {
            case "View All Departments":
                viewDepartments();
                break;
            case "View All Roles":
                viewRoles();
                break;
            case "View All Employees":
                viewEmployees();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "Update Employee Manager":
                updateEmployeeManager();
                break;
            case "View Employees by Manager":
                viewEmployeesByManager();
                break;
            case "View Employees by Department":
                viewEmployeesByDepartment();
                break;
            case "View Department Budget":
                viewDepartmentBudget();
                break;
            case "Delete Department":
                deleteDepartment();
                break;
            case "Delete Role":
                deleteRole();
                break;
            case "Delete Employee":
                deleteEmployee();
                break;
            case "Exit":
                console.log("Goodbye!");
                process.exit();
        }
        console.log(answers);
    });
}
promptUser();
export { promptUser };
