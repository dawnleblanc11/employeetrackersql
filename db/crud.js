const connection = require('./connections');
class DB{ 
    constructor(connection) {
        this.connection = connection;
    }
    getAlldepartments() {
        return this.connection.promise().query('SELECT * FROM departments')
    }
    getAllroles() {
        return this.connection.promise().query('SELECT * FROM roles')
    }
    getAllemployees() {
        return this.connection.promise().query('SELECT * FROM employees')
    }
};

module.exports = new DB(connection);