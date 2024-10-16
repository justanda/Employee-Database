DROP DATABASE IF EXISTS EMPLOYESS_db;
CREATE DATABASE EMPLOYESS_db;


CREATE TABLE department(
    id  SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
); 

CREATE TABLE role(
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INTERGER NOT NULL,
    FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTERGER NOT NULL,
    manager_id INTERGER,
    FOREIGN KEY(role_id) REFERENCES role(id),
    FOREIGN KEY(manager_id) REFERENCES employee(id)
);

