// Require dependencies
const consoleTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const util = require('util');

// Connect to MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ju7ft6a;p0',
    database: 'employees_db'
},
console.log('Connected to employee_db database.')
);

db.query = util.promisify(db.query);

// Start program
db.connect(function(){
    menu()
});

// Welcome message
console.table('Welcome to the Employee Tracker!');

// Question Menu
const menu = async () => {
    let answer = await inquirer.prompt({
        name: 'menu',
        type: 'list',
        message: 'Menu',
        choices: [
            'View Departments',
            'View Roles',
            'View Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update Employee Role',
            'Exit'
        ]
    })
}

// View all departments
const deptView = async () => {
    console.log('View Departments')
    let query = 'SELECT * FROM department'
    connection.query(query, function(err,res) {
        if (err) {
            console.log(err)
        };
        let deptArray = [];
        res.forEach(department => deptArray.push(department));
        console.table(deptArray);
        menu();
    })
}
// View all roles
const roleView = async () => {
    console.log('View Roles')
    let query = 'SELECT * FROM role'
    connection.query(query, function(err,res) {
        if (err) {
            console.log(err)
        };
        let roleArray = [];
        res.forEach(role => roleArray.push(role));
        console.table(roleArray);
        menu();
    })
}
// View all employees
const empView = async () => {
    console.log('View Employees')
    let query = 'SELECT * FROM employee'
    connection.query(query, function(err,res) {
        if (err) {
            console.log(err)
        };
        let empArray = [];
        res.forEach(employee => empArray.push(employee));
        console.table(empArray);
        menu();
    })
}

// Add department

// Add role

// Add employee

// Update employee role

