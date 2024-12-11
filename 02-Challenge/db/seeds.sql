INSERT INTO department (name)
VALUES ('Engineering'),
       ('Finance'),
       ('Legal'),
       ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES ('Software Engineer', 100000, 1),
       ('Accountant', 80000, 2),
       ('Lawyer', 120000, 3),
       ('Sales Lead', 80000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ( 'John', 'Doe', 1, NULL),
       ( 'Mike', 'Chan', 1, 1),
       ( 'Ashley', 'Rodriguez', 1, 1),
       ( 'Kevin', 'Tupik', 2, 2),
       ( 'Kunal', 'Singh', 3, 3),
       ( 'Malia', 'Brown', 2, 3),
       ( 'Sarah', 'Lourd', 4, 3),
       ( 'Tom', 'Allen', 4, 3),
       ( 'Tina', 'Munson', 4, 3),
       ( 'Alice', 'Thompson', 4, 3);