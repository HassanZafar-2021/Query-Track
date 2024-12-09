INSERT INTO department (name)
VALUES ('Engineering'),
       ('Finance'),
       ('Legal'),
       ('Sales');

INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'Software Engineer', 100000, 1),
       (2, 'Accountant', 80000, 2),
       (3, 'Lawyer', 120000, 3),
       (4, 'Sales Lead', 80000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'John', 'Doe', 1, NULL),
       (2, 'Mike', 'Chan', 1, 1),
       (3, 'Ashley', 'Rodriguez', 1, 1),
       (4, 'Kevin', 'Tupik', 2, 2),
       (5, 'Kunal', 'Singh', 3, 3),
       (6, 'Malia', 'Brown', 2, 3),
       (7, 'Sarah', 'Lourd', 4, 3),
       (8, 'Tom', 'Allen', 4, 3),
       (9, 'Tina', 'Munson', 4, 3),
       (10, 'Alice', 'Thompson', 4, 3);