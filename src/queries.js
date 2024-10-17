"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewDepartments = viewDepartments;
exports.viewRoles = viewRoles;
exports.viewEmployees = viewEmployees;
exports.addDepartment = addDepartment;
exports.addRole = addRole;
exports.addEmployee = addEmployee;
exports.updateEmployeeRole = updateEmployeeRole;
var inquirer_1 = require("inquirer");
// const { Pool } = pg;
var index_1 = require("../index");
var connection_1 = require("./connection");
function viewDepartments() {
    connection_1.default.query("SELECT * FROM department", function (err, res) {
        if (err)
            throw err;
        console.table(res.rows);
        (0, index_1.default)();
    });
}
function viewRoles() {
    connection_1.default.query("SELECT * FROM role", function (err, res) {
        if (err)
            throw err;
        console.table(res.rows);
        (0, index_1.default)();
    });
}
function viewEmployees() {
    connection_1.default.query("SELECT * FROM employee", function (err, res) {
        if (err)
            throw err;
        console.table(res.rows);
        (0, index_1.default)();
    });
}
function addDepartment() {
    inquirer_1.default
        .prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the name of the department:",
        },
    ])
        .then(function (answer) {
        connection_1.default.query("INSERT INTO department (name) VALUES ($1)", [answer.name], function (err, __res) {
            if (err)
                throw err;
            console.log("Department added successfully!");
            (0, index_1.default)();
        });
    });
}
function addRole() {
    connection_1.default.query("SELECT * FROM department", function (err, res) {
        if (err)
            throw err;
        var departments = res.rows.map(function (department) { return ({
            name: department.name,
            value: department.id,
        }); });
        inquirer_1.default
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
            .then(function (answer) {
            connection_1.default.query("INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)", [answer.title, answer.salary, answer.department_id], function (err, __res) {
                if (err)
                    throw err;
                console.log("Role added successfully!");
                (0, index_1.default)();
            });
        });
    });
}
function addEmployee() {
    connection_1.default.query("SELECT * FROM role", function (err, res) {
        if (err)
            throw err;
        var roles = res.rows.map(function (role) { return ({
            name: role.title,
            value: role.id,
        }); });
        connection_1.default.query("SELECT * FROM employee", function (err, res) {
            if (err)
                throw err;
            var managers = res.rows.map(function (employee) { return ({
                name: "".concat(employee.first_name, " ").concat(employee.last_name),
                value: employee.id,
            }); });
            inquirer_1.default
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
                .then(function (answer) {
                connection_1.default.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)", [
                    answer.first_name,
                    answer.last_name,
                    answer.role_id,
                    answer.manager_id,
                ], function (err, __res) {
                    if (err)
                        throw err;
                    console.log("Employee added successfully!");
                    (0, index_1.default)();
                });
            });
        });
    });
}
function updateEmployeeRole() {
    connection_1.default.query("SELECT * FROM employee", function (err, res) {
        if (err)
            throw err;
        var employees = res.rows.map(function (employee) { return ({
            name: "".concat(employee.first_name, " ").concat(employee.last_name),
            value: employee.id,
        }); });
        connection_1.default.query("SELECT * FROM role", function (err, res) {
            if (err)
                throw err;
            var roles = res.rows.map(function (role) { return ({
                name: role.title,
                value: role.id,
            }); });
            inquirer_1.default
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
                .then(function (answer) {
                connection_1.default.query("UPDATE employee SET role_id = $1 WHERE id = $2", [answer.role_id, answer.employee_id], function (err, __res) {
                    if (err)
                        throw err;
                    console.log("Employee role updated successfully!");
                    (0, index_1.default)();
                });
            });
        });
    });
}
