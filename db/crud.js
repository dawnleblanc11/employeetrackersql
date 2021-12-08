const connection = require('./connections');
class DB{ 
    constructor(connection) {
        this.connection = connection;
    }
    viewAlldepartments() {
        return this.connection.promise().query('SELECT * FROM departments')
    }
    viewAllroles() {
        return this.connection.promise().query('SELECT * FROM departments JOIN roles ON roles.role_department_id = departments.department_id;')
    }
    viewAllemployees() {
        return this.connection.promise().query('SELECT last_name, first_name, role_title, manager_id FROM employees JOIN roles ON employees.employee_role_id=roles.role_department_id OR employees.employee_id = employees.manager_id;')
    }
};

module.exports = new DB(connection);