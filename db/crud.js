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
        return this.connection.promise().query(`SELECT e.first_name, e.last_name, r.role_title,
         CONCAT(mgr.first_name, ' ',mgr.last_name) AS Manager FROM employees AS e 
        JOIN roles AS r ON e.employee_role_id = r.roles_id
        LEFT JOIN employees AS mgr ON e.manager_id = mgr.employee_id`)
    }
};

module.exports = new DB(connection);