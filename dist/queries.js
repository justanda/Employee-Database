import inquirer from "inquirer";
// const { Pool } = pg;
import promptUser from "./index";
import pool from "./connection";
export function viewDepartments() {
    pool.query("SELECT * FROM department", (err, res) => {
        if (err)
            throw err;
        console.table(res.rows);
        promptUser();
    });
}
export function viewRoles() {
    pool.query("SELECT * FROM role", (err, res) => {
        if (err)
            throw err;
        console.table(res.rows);
        promptUser();
    });
}
export function viewEmployees() {
    pool.query("SELECT * FROM employee", (err, res) => {
        if (err)
            throw err;
        console.table(res.rows);
        promptUser();
    });
}
export function addDepartment() {
    inquirer
        .prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the name of the department:",
        },
    ])
        .then((answer) => {
        pool.query("INSERT INTO department (name) VALUES ($1)", [answer.name], (err, __res) => {
            if (err)
                throw err;
            console.log("Department added successfully!");
            promptUser();
        });
    });
}
export function addRole() {
    pool.query("SELECT * FROM department", (err, res) => {
        if (err)
            throw err;
        const departments = res.rows.map((department) => ({
            name: department.name,
            value: department.id,
        }));
        inquirer
            .prompt([
            {
                type: "input",
                name: "title",
                message: "Enter the role title:",
            },
            {
                type: "input",
                name: "salary",
                message: "Enter the salary for the role:",
            },
            {
                type: "list",
                name: "department_id",
                message: "Select the department for the role:",
                choices: departments,
            },
        ])
            .then((answer) => {
            pool.query("INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)", [answer.title, answer.salary, answer.department_id], (err, __res) => {
                if (err)
                    throw err;
                console.log("Role added successfully!");
                promptUser();
            });
        });
    });
}
export function addEmployee() {
    pool.query("SELECT * FROM role", (err, res) => {
        if (err)
            throw err;
        const roles = res.rows.map((role) => ({
            name: role.title,
            value: role.id,
        }));
        pool.query("SELECT * FROM employee", (err, res) => {
            if (err)
                throw err;
            const managers = res.rows.map((employee) => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
            }));
            inquirer
                .prompt([
                {
                    type: "input",
                    name: "first_name",
                    message: "Enter the first name of the employee:",
                },
                {
                    type: "input",
                    name: "last_name",
                    message: "Enter the last name of the employee:",
                },
                {
                    type: "list",
                    name: "role_id",
                    message: "Select the role for the employee:",
                    choices: roles,
                },
                {
                    type: "list",
                    name: "manager_id",
                    message: "Select the manager for the employee:",
                    choices: managers,
                },
            ])
                .then((answer) => {
                pool.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)", [
                    answer.first_name,
                    answer.last_name,
                    answer.role_id,
                    answer.manager_id,
                ], (err, __res) => {
                    if (err)
                        throw err;
                    console.log("Employee added successfully!");
                    promptUser();
                });
            });
        });
    });
}
export function updateEmployeeRole() {
    pool.query("SELECT * FROM employee", (err, res) => {
        if (err)
            throw err;
        const employees = res.rows.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
        }));
        pool.query("SELECT * FROM role", (err, res) => {
            if (err)
                throw err;
            const roles = res.rows.map((role) => ({
                name: role.title,
                value: role.id,
            }));
            inquirer
                .prompt([
                {
                    type: "list",
                    name: "employee_id",
                    message: "Select the employee whose role you want to update:",
                    choices: employees,
                },
                {
                    type: "list",
                    name: "role_id",
                    message: "Select the new role for the employee:",
                    choices: roles,
                },
            ])
                .then((answer) => {
                pool.query("UPDATE employee SET role_id = $1 WHERE id = $2", [answer.role_id, answer.employee_id], (err, __res) => {
                    if (err)
                        throw err;
                    console.log("Employee role updated successfully!");
                    promptUser();
                });
            });
        });
    });
}
