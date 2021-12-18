
const mysql = require("mysql2");
const express = require('express');
const inquirer = require("inquirer");
const TreePrompt = require('inquirer-tree-prompt');
//const DB = require('./db/crud');
inquirer.registerPrompt('tree', TreePrompt);
//const apiRoutes = require('./routes/apiRoutes');
const connection = require('./db/connections');

const { printTable } = require('console-table-printer');
//const { restoreDefaultPrompts } = require('inquirer');


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
        case "Completed all Tasks": 
             exit;
        break;     

        }
    })
};
// START of Functions

// View Functions ************************************************
// View all Departments ------------------------------------------
function viewAlldepartments() {
    connection.query('SELECT * FROM departments', 
    function(err, res) {
      if (err) throw err
      printTable(res);
      console.log("function completed")
  })
}
// View All Roles Function ----------------------------------------
function viewAllroles() {
    connection.query('SELECT * FROM departments JOIN roles ON roles.role_department_id = departments.department_id', 
    function(err, res) {
      if (err) throw err
      printTable(res);
      console.log("function completed")
  })
}
// View All Employees Function -------------------------------------
// see if you can sort tables by alpha in sql
function viewAllemployees() {
    connection.query(`SELECT e.first_name, e.last_name, r.role_title,
    CONCAT(mgr.first_name, ' ',mgr.last_name) AS Manager FROM employees AS e 
   JOIN roles AS r ON e.employee_role_id = r.roles_id
   LEFT JOIN employees AS mgr ON e.manager_id = mgr.employee_id
   ORDER BY e.last_name`, 
    function(err, res) {
      if (err) throw err
      printTable(res);
      console.log("function completed")
  })
}
// View All Employees by Role Function -------------------------------------
// need to reorder table to put role first
function viewAllemployeesbyRole() {
    connection.query(`SELECT e.first_name, e.last_name, r.role_title,
    CONCAT(mgr.first_name, ' ',mgr.last_name) AS Manager FROM employees AS e 
   JOIN roles AS r ON e.employee_role_id = r.roles_id
   LEFT JOIN employees AS mgr ON e.manager_id = mgr.employee_id
   ORDER BY r.role_title`, 
    function(err, res) {
      if (err) throw err
      printTable(res);
      console.log("function completed")
  })
}
// View All Employees by Manager Function -------------------------------------
// need to reorder table to put manager first
function viewAllemployeesbyManager() {
    connection.query(`SELECT e.first_name, e.last_name, r.role_title,
    CONCAT(mgr.first_name, ' ',mgr.last_name) AS Manager FROM employees AS e 
   JOIN roles AS r ON e.employee_role_id = r.roles_id
   LEFT JOIN employees AS mgr ON e.manager_id = mgr.employee_id
   ORDER BY e.manager_id`, 
    function(err, res) {
      if (err) throw err
      printTable(res);
      console.log("function completed")
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
                viewAlldepartments();
                console.log("function completed")
            }
        )
    })
  }

// Add Role Function-----------------------------------------------------------------
function addRole() { 
    connection.query("SELECT * FROM departments JOIN roles ON roles.role_department_id = departments.department_id", 
    function(err, res) {
      inquirer.prompt([
        {
            name: "DepartmentID",
            type: "input",
            message: "What is the DepartmentID is the Role in?"
            // change this to list all the departments
          },  
        {
            name: "Title",
            type: "input",
            message: "What is the Title for this Role?"
          },
          {
            name: "Salary",
            type: "input",
            message: "What is the Salary for this Role?"
  
          } 
      ]).then(function(res) {
        console.log(res.Title,res.Salary,res.DepartmentID)  
        connection.query(
              "INSERT INTO roles SET ?",
              {
                role_title: res.Title,
                role_salary: res.Salary,
                role_department_id: res.DepartmentID
              },
              function(err) {
                  if (err) throw err
                  viewAllroles();
                  console.log("function completed")
              }
          )
  
      });
    });
    }
// Add Employee Function-----------------------------------------------------------------
function addEmployee() { 
    connection.query(`SELECT e.first_name, e.last_name, r.role_title,
    CONCAT(mgr.first_name, ' ',mgr.last_name) AS Manager FROM employees AS e 
   JOIN roles AS r ON e.employee_role_id = r.roles_id
   LEFT JOIN employees AS mgr ON e.manager_id = mgr.employee_id`, 
    function(err, res) {
      inquirer.prompt([
        {
            name: "EmployeeFirst",
            type: "input",
            message: "What is the Employees First Name?"

          },  
        {
            name: "EmployeeLast",
            type: "input",
            message: "What is the Employees Last Name?"
          },
          {
            name: "EmployeeRole",
            type: "input",
            message: "What is the RoleID for this employee?"
            // update to include choices
  
          },
          {
            name: "Manager",
            type: "input",
            message: "What is the EmployeeID for this employee's manager?"
            //update to include choices
          } 
      ]).then(function(res) {
        console.log(res.Title,res.Salary,res.DepartmentID)  
        connection.query(
              "INSERT INTO employees SET ?",
              {
                first_name: res.EmployeeFirst,
                last_name: res.EmployeeLast,
                employee_role_id: res.EmployeeRole,
                manager_id: res.Manager
              },
              function(err) {
                  if (err) throw err
                  viewAllemployees();
                  console.log("function completed")
              }
          )
  
      });
    });
    }

// Update Functions ********************************************************    

start();
