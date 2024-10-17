INSERT INTO department (name) VALUES ('Sales'), ('Engineering'), ('Finance');

INSERT INTO roles (title, salary, department_id) VALUES ('Sales Manager', 75000, 1), ('Software Engineer', 100000, 2), ('Accountant', 60000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, null), ('Jane', 'Smith', 2, 1), ('Emily', 'Jones', 3, null);
