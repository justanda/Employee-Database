import inquirer from "inquirer";
// const { Pool } = pg;
import promptUser from "./index";
import pool from "./connection";

interface Department {
  id: number;
  name: string;
}

interface Role {
  id: number;
  title: string;
  salary: number;
  department_id: number;
}

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  role_id: number;
  manager_id?: number;
}

function viewDepartments(): void {
  pool.query("SELECT * FROM department", (err: Error, res: any) => {
    if (err) throw err;
    console.table(res.rows);
    promptUser();
  });
}

function viewRoles(): void {
  pool.query("SELECT * FROM role", (err: Error, res: any) => {
    if (err) throw err;
    console.table(res.rows);
    promptUser();
  });
}
function viewEmployees(): void {
  pool.query("SELECT * FROM employee", (err: Error, res: any) => {
    if (err) throw err;
    console.table(res.rows);
    promptUser();
  });
}

function addDepartment(): void {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the name of the department:",
      },
    ])
    .then((answer: { name: string }) => {
      pool.query(
        "INSERT INTO department (name) VALUES ($1)",
        [answer.name],
        (err: Error, __res: any) => {
          if (err) throw err;
          console.log("Department added successfully!");
          promptUser();
        }
      );
    });
}

function addRole(): void {
  pool.query("SELECT * FROM department", (err: Error, res: any) => {
    if (err) throw err;
    const departments: { name: string; value: number }[] = res.rows.map(
      (department: Department) => ({
        name: department.name,
        value: department.id,
      })
    );

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
      .then(
        (answer: { title: string; salary: number; department_id: number }) => {
          pool.query(
            "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)",
            [answer.title, answer.salary, answer.department_id],
            (err: Error, __res: any) => {
              if (err) throw err;
              console.log("Role added successfully!");
              promptUser();
            }
          );
        }
      );
  });
}

function addEmployee(): void {
  pool.query("SELECT * FROM role", (err: Error, res: any) => {
    if (err) throw err;
    const roles: { name: string; value: number }[] = res.rows.map(
      (role: Role) => ({
        name: role.title,
        value: role.id,
      })
    );

    pool.query("SELECT * FROM employee", (err: Error, res: any) => {
      if (err) throw err;
      const managers: { name: string; value: number }[] = res.rows.map(
        (employee: Employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        })
      );

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
        .then(
          (answer: {
            first_name: string;
            last_name: string;
            role_id: number;
            manager_id: number;
          }) => {
            pool.query(
              "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)",
              [
                answer.first_name,
                answer.last_name,
                answer.role_id,
                answer.manager_id,
              ],
              (err: Error, __res: any) => {
                if (err) throw err;
                console.log("Employee added successfully!");
                promptUser();
              }
            );
          }
        );
    });
  });
}

function updateEmployeeRole(): void {
  pool.query("SELECT * FROM employee", (err: Error, res: any) => {
    if (err) throw err;
    const employees: { name: string; value: number }[] = res.rows.map(
      (employee: Employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      })
    );

    pool.query("SELECT * FROM role", (err: Error, res: any) => {
      if (err) throw err;
      const roles: { name: string; value: number }[] = res.rows.map(
        (role: Role) => ({
          name: role.title,
          value: role.id,
        })
      );

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
        .then((answer: { employee_id: number; role_id: number }) => {
          pool.query(
            "UPDATE employee SET role_id = $1 WHERE id = $2",
            [answer.role_id, answer.employee_id],
            (err: Error, __res: any) => {
              if (err) throw err;
              console.log("Employee role updated successfully!");
              promptUser();
            }
          );
        });
    });
  });
}
const functions = {
  viewDepartments,
  viewEmployees,
  viewRoles,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
export default functions;
