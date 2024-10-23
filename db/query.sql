SELECT *
FROM department
JOIN roles ON department.id = roles.department_id
JOIN employee ON roles.id = employee.role_id;