INSERT INTO department (name)
VALUES 
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES 
    ("Sales Representative",50000,1),
    ("Sales Manager",90000,1),
    ("Junior Developer",70000,2),
    ("Senior Software Engineer",100000,2),
    ("Head of Engineering",200000,2),
    ("Financial Analyst",55000,3),
    ("Senior Financial Anlyst",80000,3),
    ("Director of Finance",120000,3),
    ("Corporate Attorney",250000,4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)  
VALUES 
    ("Edward","Butler",1,2),
    ("Julia","Barnes",2,NULL),
    ("Tammy","Martin",3,5),
    ("Steven","Perry",4,5),
    ("Patrick","Richardson",5,NULL),
    ("Amy","Peterson",6,8),
    ("Laura","Lopez",7,8),
    ("Earl","Ward",8,NULL),
    ("Amanda","Parker",9,NULL);