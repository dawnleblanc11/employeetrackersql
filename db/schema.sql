DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;


CREATE TABLE departments (
  department_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(50) NOT NULL
);

CREATE TABLE roles (
  roles_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  role_title VARCHAR(30) NOT NULL,
  role_salary DECIMAL(10,2) NOT NULL,
  role_department_id INTEGER,
  FOREIGN KEY (role_department_id) REFERENCES departments(department_id) ON DELETE CASCADE
);

CREATE TABLE employees (
  employee_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  employee_role_id INTEGER,
  FOREIGN KEY (employee_role_id) REFERENCES roles(roles_id) ON DELETE CASCADE,
  manager_id INTEGER REFERENCES employees
);

