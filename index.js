// Require dependencies
const consoleTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connect to MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ju7ft6a;p0',
    database: 'employee_db'
},
console.log('Connected to employee_db database.')
);

// Inquirer questions

// View all departments

// View all roles

// View all employees

// Add department

// Add role

// Add employee

// Update employee role

