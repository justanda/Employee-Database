import inquirer from "inquirer";
// const { Pool } = pg;
import { promptUser } from "./index.js";
import { pool } from "./connection.js";
export const viewDepartments = function () {
    pool.query("SELECT * FROM department", (err, res) => {
        if (err)
            throw err;
        console.table(res.rows);
        promptUser();
    });
};
export const viewRoles = function () {
    pool.query("SELECT * FROM roles", (err, res) => {
        if (err)
            throw err;
        console.table(res.rows);
        promptUser();
    });
};
export const viewEmployees = function () {
    pool.query("SELECT * FROM employee", (err, res) => {
        if (err)
            throw err;
        console.table(res.rows);
        promptUser();
    });
};
export const addDepartment = function () {
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
};
export const addRole = function () {
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
            pool.query("INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)", [answer.title, answer.salary, answer.department_id], (err, __res) => {
                if (err)
                    throw err;
                console.log("Role added successfully!");
                promptUser();
            });
        });
    });
};
export const addEmployee = function () {
    pool.query("SELECT * FROM roles", (err, res) => {
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
};
export const updateEmployeeRole = function () {
    pool.query("SELECT * FROM employee", (err, res) => {
        if (err)
            throw err;
        const employees = res.rows.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
        }));
        pool.query("SELECT * FROM roles", (err, res) => {
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
};
export const updateEmployeeManager = function () {
    pool.query("SELECT * FROM employee", (err, res) => {
        if (err)
            throw err;
        const employees = res.rows.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
        }));
        inquirer
            .prompt([
            {
                type: "list",
                name: "employee_id",
                message: "Select the employee whose manager you want to update:",
                choices: employees,
            },
            {
                type: "list",
                name: "manager_id",
                message: "Select the new manager for the employee:",
                choices: employees,
            },
        ])
            .then((answer) => {
            pool.query("UPDATE employee SET manager_id = $1 WHERE id = $2", [answer.manager_id, answer.employee_id], (err, __res) => {
                if (err)
                    throw err;
                console.log("Employee manager updated successfully!");
                promptUser();
            });
        });
    });
};
export const deleteDepartment = function () {
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
                type: "list",
                name: "department_id",
                message: "Select the department you want to delete:",
                choices: departments,
            },
        ])
            .then((answer) => {
            pool.query("DELETE FROM department WHERE id = $1", [answer.department_id], (err, __res) => {
                if (err)
                    throw err;
                console.log("Department deleted successfully!");
                promptUser();
            });
        });
    });
};
export const deleteRole = function () {
    pool.query("SELECT * FROM roles", (err, res) => {
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
                name: "role_id",
                message: "Select the role you want to delete:",
                choices: roles,
            },
        ])
            .then((answer) => {
            pool.query("DELETE FROM roles WHERE id = $1", [answer.role_id], (err, __res) => {
                if (err)
                    throw err;
                console.log("Role deleted successfully!");
                promptUser();
            });
        });
    });
};
export const deleteEmployee = function () {
    pool.query("SELECT * FROM employee", (err, res) => {
        if (err)
            throw err;
        const employees = res.rows.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
        }));
        inquirer
            .prompt([
            {
                type: "list",
                name: "employee_id",
                message: "Select the employee you want to delete:",
                choices: employees,
            },
        ])
            .then((answer) => {
            pool.query("DELETE FROM employee WHERE id = $1", [answer.employee_id], (err, __res) => {
                if (err)
                    throw err;
                console.log("Employee deleted successfully!");
                promptUser();
            });
        });
    });
};
export const viewEmployeesByManager = function () {
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
                type: "list",
                name: "manager_id",
                message: "Select the manager whose employees you want to view:",
                choices: managers,
            },
        ])
            .then((answer) => {
            pool.query("SELECT * FROM employee WHERE manager_id = $1", [answer.manager_id], (err, res) => {
                if (err)
                    throw err;
                console.table(res.rows);
                promptUser();
            });
        });
    });
};
export const viewEmployeesByDepartment = function () {
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
                type: "list",
                name: "department_id",
                message: "Select the department whose employees you want to view:",
                choices: departments,
            },
        ])
            .then((answer) => {
            pool.query("SELECT * FROM employee JOIN roles ON employee.role_id = roles.id WHERE roles.department_id = $1", [answer.department_id], (err, res) => {
                if (err)
                    throw err;
                console.table(res.rows);
                promptUser();
            });
        });
    });
};
export const viewDepartmentBudget = function () {
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
                type: "list",
                name: "department_id",
                message: "Select the department whose budget you want to view:",
                choices: departments,
            },
        ])
            .then((answer) => {
            pool.query("SELECT SUM(salary) FROM employee JOIN roles ON employee.role_id = roles.id WHERE roles.department_id = $1", [answer.department_id], (err, res) => {
                if (err)
                    throw err;
                console.table(res.rows);
                promptUser();
            });
        });
    });
};
