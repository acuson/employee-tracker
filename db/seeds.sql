INSERT INTO department (id, name)
VALUES (1,"Sales"),
       (2,"Engineering"),
       (3,"Finance"),
       (4,"Legal");

INSERT INTO role (id, title, salary, department_id)
VALUES (11,"Sales Representative",50000,1),
       (12,"Sales Manager",90000,1),
       (21,"Junior Developer",70000,2),
       (22,"Senior Software Engineer",100000,2),
       (23,"Head of Engineering",200000,2),
       (31,"Financial Analyst",55000,3),
       (32,"Senior Financial Anlyst",80000,3),
       (33,"Director of Finance",120000,3),
       (41,"Corporate Attorney",250000,4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)  
VALUES (001,"Edward","Butler",11,12),
       (002,"Julia","Barnes",12),
       (003,"Tammy","Martin",21,22),
       (004,"Steven","Perry",22,23),
       (005,"Patrick","Richardson",23),
       (006,"Amy","Peterson",31,32),
       (007,"Laura","Lopez",32,33),
       (008,"Earl","Ward",33),
       (009,"Amanda","Parker",41);