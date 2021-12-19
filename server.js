
const mysql = require("mysql2");
const express = require('express');
const inquirer = require("inquirer");
// allows for multiple layered questioning
const TreePrompt = require('inquirer-tree-prompt');
inquirer.registerPrompt('tree', TreePrompt);
// sets up connection to database
const connection = require('./db/connections');
// needed to use PrintTable since other function did not work
const { printTable } = require('console-table-printer');
const { response } = require("express");
var colors = require("colors");

let deptArr = [];
let roleArr = [];
let emplArr = [];
let mgrArr = [];

// Start with what they would like to do
function start() {
    inquirer.prompt ([
     {
        name: "choice",
        type: "tree",
        message: "What would you like to do?",
        tree: [
            { 
                value: "View information",
                open: true,
                children: [  
                    "View all departments",
                    "View all roles",
                    {
                        value: "View all employees",
                        children: [
                            "View employees by department",
                            "View employees by role",
                            "View employees by manager"
                        ]
                    },
                ]
            },
            {
                value: "Add information",
                open: true,
                children: [
                    "Add a department",
                    "Add a role",
                    "Add an employee"
                ]   
            },
            {
                value: "Update information",
                open: true,
                children: [
                    "Update an employee role",
                    "Update an employee manager"
                ]
            },
            {
            value: "Update information",
                open: true,
                children: [
                    "Update an employee role",
                    "Update an employee manager"
                ]
            },
            {
                value: "Perform Calculations",
                open: true,
                children: [
                    "Calulate utilized budget by department"
                ]
            },
            
                "Completed all Tasks"           
        ]
     }
]).then (function(answer) {  
     switch(answer.choice) {
         case "View all departments":
           viewAlldepartments();
        break;
        case "View all roles": 
            viewAllroles();
        break;
        case "View all employees": 
            viewAllemployees();
        break;
        case "View employees by department": 
            viewAllemployeesbyDepartment();
        break;
        case "View employees by role": 
            viewAllemployeesbyRole();
        break;
        case "View employees by manager": 
            viewAllemployeesbyManager();
        break;
        case "Add a department": 
             addDepartment();
        break;
        case "Add a role": 
             addRole();
        break;
        case "Add an employee": 
             addEmployee();
        break;
        case "Update an employee role": 
             updateEmployeeRole();
        break;
        case "Update an employee manager": 
             updateEmployeemanager();
        break;
        case "Calulate utilized budget by department": 
             calculateBudget();
        break;
        case "Exit: Completed all Tasks": 
            connection.end();
        break;
        default:
            connection.end();     

        }
    })
    // update everytime you restart
    deptList();
    rolesList();
    mgrList();
};
// START of Functions
// Creation of Arrays to list in multiple inquirer choices

// Lists all available departments in an array
function deptList() {
    connection.query("SELECT department_name FROM departments", 
    function (err, resdept){
        deptArr = [];
        if (err) throw err;
        for (i=0; i<resdept.length; i++){
            deptArr.push(resdept[i].department_name);
}})};

// Lists all available roles in an array
function rolesList() {
    connection.query("SELECT role_title FROM roles", 
    function (err, resrole){
        rolesArr = [];
        if (err) throw err;
        for (i=0; i<resrole.length; i++){
            rolesArr.push(resrole[i].role_title);
}})};

// Lists all available roles in an array
//need to fix this
function mgrList() {
    connection.query("SELECT employees.last_name FROM employees WHERE manager_id = 'NULL'", 
    function (err, resmgr){
        mgrArr = [];
        if (err) throw err;
        for (i=0; i<resmgr.length; i++){
            mgrArr.push(resmgr[i].last_name);
}})};

// View Functions ************************************************
// View all Departments ------------------------------------------
function viewAlldepartments() {
    connection.query('SELECT * FROM departments', 
    function(err, res) {
      if (err) throw err
      console.log("View of All Departments".green);
      printTable(res);
  })
}
// View All Roles Function ----------------------------------------
function viewAllroles() {
    connection.query(`SELECT roles.role_title, roles.role_salary, roles.roles_id, departments.department_name 
    FROM departments JOIN roles ON roles.role_department_id = departments.department_id
    ORDER BY roles.role_title`, 
    function(err, res) {
      if (err) throw err
      console.log("View of all Roles".green);
      printTable(res);
      
  })
}
// View All Employees Function -------------------------------------
// sorted by employee last name
function viewAllemployees() {
    connection.query(`SELECT  e.employee_id, e.first_name, e.last_name, r.role_title AS Job_Title,
    d.department_name AS Departments, r.role_salary AS Salaries, CONCAT(mgr.first_name, ' ',mgr.last_name) AS Manager FROM employees AS e 
   JOIN roles AS r ON e.employee_role_id = r.roles_id
   JOIN departments as d on r.role_department_id = d. department_id
   LEFT JOIN employees AS mgr ON e.manager_id = mgr.employee_id
   ORDER BY e.last_name`, 
    function(err, res) {
      if (err) throw err
      console.log("View All Employees By Last Name".green);
      printTable(res);
      
  })
}
// View All Employees by Department Function -------------------------------------
// need to reorder table to put role first
function viewAllemployeesbyDepartment() {
    connection.query(`SELECT  d.department_name AS Departments,r.role_title AS Job_Title,e.employee_id, e.first_name, e.last_name, 
     r.role_salary AS Salaries, CONCAT(mgr.first_name, ' ',mgr.last_name) AS Manager FROM employees AS e 
   JOIN roles AS r ON e.employee_role_id = r.roles_id
   JOIN departments as d on r.role_department_id = d. department_id
   LEFT JOIN employees AS mgr ON e.manager_id = mgr.employee_id
   ORDER BY d.department_name`, 
    function(err, res) {
      if (err) throw err
      console.log("View All Employees By Department".green);
      printTable(res);
      
  })
}
// View All Employees by Role Function -------------------------------------
// need to reorder table to put role first
function viewAllemployeesbyRole() {
    connection.query(`SELECT  r.role_title AS Job_Title,e.employee_id, e.first_name, e.last_name, 
    d.department_name AS Departments, r.role_salary AS Salaries, CONCAT(mgr.first_name, ' ',mgr.last_name) AS Manager FROM employees AS e 
   JOIN roles AS r ON e.employee_role_id = r.roles_id
   JOIN departments as d on r.role_department_id = d. department_id
   LEFT JOIN employees AS mgr ON e.manager_id = mgr.employee_id
   ORDER BY r.role_title`, 
    function(err, res) {
      if (err) throw err
      console.log("View All Employees By Role".green);
      printTable(res);
      
  })
}
// View All Employees by Manager Function -------------------------------------
// add second ORDER BY departments
function viewAllemployeesbyManager() {
    connection.query(`SELECT CONCAT(mgr.first_name, ' ',mgr.last_name) AS Manager, d.department_name AS Departments,
    e.employee_id, e.first_name, e.last_name, r.role_title AS Job_Title,
     r.role_salary AS Salaries FROM employees AS e 
   JOIN roles AS r ON e.employee_role_id = r.roles_id
   JOIN departments as d on r.role_department_id = d. department_id
   LEFT JOIN employees AS mgr ON e.manager_id = mgr.employee_id
   ORDER BY e.manager_id`, 
    function(err, res) {
      if (err) throw err
      console.log("View All Employees By Manager".green);
      printTable(res);
      
  })
}
// ADD Functions ****************************************
// Add Department Function -----------------------------------------------
function addDepartment() { 

    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What Department would you like to add?"
        }
    ]).then(function(res) {
        var query = connection.query(
            "INSERT INTO departments SET ? ",
            {
              department_name: res.name
            
            },
            function(err) {
                if (err) throw err
                console.log("A New Department Added".red)
                viewAlldepartments();
                
            }
        )
        })
  }

// Add Role Function-----------------------------------------------------------------
      function addRole() {
        //pull department list for new role assignment 
        connection.query("SELECT * from departments", function (req, res) {
            inquirer
                .prompt([{
                    message: "Enter new role name: ",
                    type: "input",
                    name: "newRole"
                },
                {
                    message: "Enter salary for new role: ",
                    type: "input",
                    name: "newSalary"
                },
                {
                    message: "Assign department: ",
                    type: "list",
                    choices: res.map(depList => ({ name: depList.department_name, value: depList.department_id })),
                    name: "roleDepartment"
                }
    
                ]).then(function (response) {
                    connection.query(`INSERT INTO roles (role_title, role_salary, role_department_id) 
                    VALUES ('${response.newRole}', '${response.newSalary}','${response.roleDepartment}')`,
                     function (err, res) {
                        if (err) throw err;
                        console.log(`New Role Add Complete`.red);
                        viewAllroles();
                    });
                });
        });
    
    };     
// Add Employee Function-----------------------------------------------------------------
function addEmployee() { 
    //pull managers to assign new employee manager
    connection.query(`SELECT CONCAT(first_name, " " ,last_name) AS Manager, employee_id FROM employees`, function (err, res) {
        //pull roles to assign new employee a role
        connection.query("SELECT role_title, roles_id FROM roles", function (err, roleList) {
            inquirer.prompt([{
                message: "Enter new employee's first name: ",
                type: "input",
                name: "first_name"
            },
            {
                message: "Enter new employee's last name: ",
                type: "input",
                name: "last_name"
            },
            {
                message: "Select role for new employee: ",
                type: "list",
                choices: roleList.map(currentRoles => ({ name: currentRoles.role_title, value: currentRoles.roles_id })),
                name: "newRole"

            },
            {
                message: "Assign manager: ",
                type: "list",
                choices: res.map(managers => ({ name: managers.Manager, value: managers.employee_id})),
                name: "newManager"
            }

            ]).then(function (response) {
                connection.query(`INSERT INTO employees(first_name, last_name, employee_role_id, manager_id) 
                VALUES ('${response.first_name}','${response.last_name}','${response.newRole}','${response.newManager}')`,
                 function (err, res) {
                    if (err) throw err;
                    console.log(`New Employee Added`.red);
                    viewAllemployeesbyRole();
                });
            });
        });
    });

};

// Update Functions ********************************************************    

// Update Employee Role ----------------------------------------------------------


function updateEmployeeRole() {
// creates the list of employees to choose from
    const employeeArr = [];
    connection.query("SELECT CONCAT(employees.first_name, ' ' ,employees.last_name) AS Name FROM employees",
     function (err, res) {
      if (err) throw err;
      for (i=0; i < res.length; i++) {
        employeeArr.push(res[i].Name);
      }
  
      inquirer.prompt([
        {
          type: "list",
          name: "updateEmployee",
          message: "Which employee's role would you like to update?",
          choices: employeeArr
        },
        {
          type: "list",
          name: "roleType",
          message: "What role will this employee have?",
          choices: rolesArr
        }
      ]).then(response => {
// identifies the role id from the role selected
        roleTypeID= "";
        connection.query("SELECT roles_id FROM roles WHERE role_title =?",
        [response.roleType],
        function (err, res) {
            if (err) throw err;
            for (i=0; i < res.length; i++) {
              roleTypeID=res[i].roles_id;
            }             
// updates the db with role id and employee id
            connection.query(
              `UPDATE employees SET employee_role_id = ? WHERE employee_id = (SELECT employee_id 
                FROM(SELECT employee_id FROM employees WHERE CONCAT(first_name," ",last_name) = ?)AS Name)`,
              [roleTypeID, response.updateEmployee],
              function (err) {
                if (err) throw err;
                viewAllemployeesbyRole()
              });
          });
        });    
      })
  };
  // Update Employee Manager ----------------------------------------------------------

function updateEmployeemanager() {

    // creates the list of employees to choose from
const employeeArr = [];
connection.query("SELECT CONCAT(employees.first_name, ' ' ,employees.last_name) AS Name FROM employees ",
 function (err, res) {
  if (err) throw err;
  for (i=0; i < res.length; i++) {
    employeeArr.push(res[i].Name);
  }
 

  // creates a list of managers to choose from 
const mgrArr = [];
connection.query("SELECT CONCAT(employees.first_name, ' ' ,employees.last_name) AS MName FROM employees WHERE manager_id IS NULL",
function (err, res) {
    if (err) throw err;
    for (i=0; i < res.length; i++) {
      mgrArr.push(res[i].MName);
    }

// prompts user for choices
  inquirer.prompt([
    {
        type: "list",
        name: "updateEmployee",
        message: "Which employee's manager would you like to update?",
        choices: employeeArr
      },
    {
        type: "list",
        name: "updateManager",
        message: "Which Manager would you like to choose?",
        choices: mgrArr
      }
 
 ]).then(response => {
// identifies the manager id from the manager selected
// PROBLEM- CANT GET EMPLOYEE ID INTO FIELD
    var updateManagersplit= []; 
    const updateManagerID="";
    updateManagersplit= response.updateManager.split(' '),
    connection.query(`SELECT employees.employee_id FROM employees WHERE (employees.first_name = ? AND employees.last_name = ?)`,
    [updateManagersplit[0],updateManagersplit[1]],
    function (err, res2) {
     if (err) throw err;
          console.log(res2.employee_id)
          updateManagerID = res2.employee_id;
     },         
// updates the db with role id and employee id
    connection.query(
          `UPDATE employees SET manager_id = ? WHERE employee_id = (SELECT employee_id 
            FROM(SELECT employee_id FROM employees WHERE CONCAT(first_name," ",last_name) = ?)AS Name)`,
          [updateManagerID, response.updateEmployee],
          function (err) {
            if (err) throw err;
            viewAllemployeesbyManager()
        }
        )
 )
    })
});
});
};

 // Calculate Combined Salaries of all employees in that department ----------------------------------------------------------

function calculateBudget() {

    // creates a total of salaries by role
    // fix to total by employees in departments
const employeeArr = [];
connection.query("SELECT SUM(role_salary), role_department_id FROM roles GROUP BY role_department_id",
 function (err, ressal) {
  if (err) throw err;
  printTable(ressal);
      console.log("Salary totals complete")
})};

      
start();
