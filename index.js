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
    try {
        let answer = await inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'Menu',
            choices: [
                'View Employees',
                'View Departments',
                'View Roles',
                'Add Employees',
                'Add Departments',
                'Add Roles',
                'Update Employee Role',
                'Exit'
            ]
        });
        switch (answer.action) {
            case 'View Employees':
                empView();
                break;
            case 'View Departments':
                deptView();
                break;
            case 'View Roles':
                roleView();
                break;
            case 'Add Employees':
                empAdd();
                break
            case 'Add Departments':
                deptAdd();
                break
            case 'Add Roles':
                roleAdd();
                break
            case 'Update Employee':
                empUpdate();
                break
            case 'Exit':
                db.end();
                break;
        };
    } catch (err) {
        console.log(err);
        menu();
    };
}

// Function to view all departments
const deptView = async () => {
    console.log('View Departments')
    let query = 'SELECT * FROM department'
    db.query(query, function(err,res) {
        if (err) {
            console.log(err)
        };
        let deptArray = [];
        res.forEach(department => deptArray.push(department));
        console.table(deptArray);
        menu();
    })
}
// Function to view all roles
const roleView = async () => {
    console.log('View Roles')
    let query = 'SELECT * FROM role'
    db.query(query, function(err,res) {
        if (err) {
            console.log(err)
        };
        let roleArray = [];
        res.forEach(role => roleArray.push(role));
        console.table(roleArray);
        menu();
    })
}
// Function to view all employees
const empView = async () => {
    console.log('View Employees')
    let query = 'SELECT * FROM employee'
    db.query(query, function(err,res) {
        if (err) {
            console.log(err)
        };
        let empArray = [];
        res.forEach(employee => empArray.push(employee));
        console.table(empArray);
        menu();
    })
}

// Function to add department
const deptAdd = async () => {
    try {
        console.log('Add Department');
        let answer = await inquirer.prompt([
            {
                name: 'deptName',
                type: 'input',
                message: 'What is the name of the department?'
            }
        ]);
        let result = await db.query("INSERT INTO department SET ?", {
            name: answer.deptName
        });
        console.log(`${answer.deptName} added successfully to departments.\n`)
        menu();
    } catch (err) {
        console.log(err);
        menu();
    };
}
// Function to add role
const roleAdd = async () => {
    try {
        console.log('Add Role');
        let department = await db.query('SELECT * FROM department');
        let answer = await inquirer.prompt([
            {
                name: 'roleName',
                type: 'input',
                message: 'What is the name of the role?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary for this role?'
            },
            {
                name: 'dept',
                type: 'list',
                choices: department.map((dept) => {
                    return {
                        name: dept.department_name,
                        value: dept.id
                    }
                }),
                message: 'What department ID for this role?',
            }
        ]);
        
        let chosenDept;
        for (i = 0; i < department.length; i++) {
            if(department[i].department_id === answer.choice) {
                chosenDept = department[i];
            };
        }
        let result = await db.query("INSERT INTO role SET ?", {
            title: answer.title,
            salary: answer.salary,
            deptartment_id: answer.deptId
        })
        console.log(`${answer.title} role added successfully.\n`)
        menu();
    } catch (err) {
        console.log(err);
        menu();
    };
}
        
// Function to add employee
const empAdd = async () => {
    try {
        console.log('Add Employee');
        let roles = await db.query("SELECT * FROM role");
        let managers = await db.query("SELECT * FROM employee");
        let answer = await inquirer.prompt([
            {
                name: 'firstName',
                type: 'input',
                message: 'What is the first name of the employee?'
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'What is the last name of the employee?'
            },
            {
                name: 'employeeRoleId',
                type: 'list',
                choices: roles.map((role) => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                }),
                message: "What is the employee's role id?"
            },
            {
                name: 'employeeManagerId',
                type: 'list',
                choices: managers.map((manager) => {
                    return {
                        name: manager.first_name + " " + manager.last_name,
                        value: manager.id
                    }
                }),
                message: "What is the employee's manager's Id?"
            }
        ])
        let result = await db.query("INSERT INTO employee SET ?", {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: (answer.employeeRoleId),
            manager_id: (answer.employeeManagerId)
        });
        console.log(`${answer.firstName} ${answer.lastName} added successfully.\n`);
        menu();
    } catch (err) {
        console.log(err);
        menu();
    };
}
// Function to update employee role
const empUpdate = async () => {
    try {
        console.log('Update Employee');
        let employees = await db.query("SELECT * FROM employee");
        let employeeSelection = await inquirer.prompt([
            {
                name: 'employee',
                type: 'list',
                choices: employees.map((employeeName) => {
                    return {
                        name: employeeName.first_name + " " + employeeName.last_name,
                        value: employeeName.id
                    }
                }),
                message: 'Which employee would you like to update?'
            }
        ]);
        let roles = await db.query("SELECT * FROM role");
        let roleSelection = await inquirer.prompt([
            {
                name: 'role',
                type: 'list',
                choices: roles.map((roleName) => {
                    return {
                        name: roleName.title,
                        value: roleName.id
                    }
                }),
                message: 'Please select the role to update the employee with.'
            }
        ]);
        let result = await db.query("UPDATE employee SET ? WHERE ?", [{ role_id: roleSelection.role }, { id: employeeSelection.employee }]);
        console.log(`The role was successfully updated.\n`);
        menu();

    } catch (err) {
        console.log(err);
        menu();
    };
}
