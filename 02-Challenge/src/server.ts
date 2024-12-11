import inquirer from "inquirer";
import { connectToDb, pool } from "./connection.js";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  await connectToDb();
})();

// Function to start the CLI application
const startQuery = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
      },
    ])
    .then(async (answer) => {
      switch (answer.action) {
        case "View All Employees":
          await viewEmployees();
          break;
        case "Add Employee":
          await addEmployee();
          break;
        case "Update Employee Role":
          await updateRole();
          break;
        case "View All Roles":
          await viewRoles();
          break;
        case "Add Role":
          await addRole();
          break;
        case "View All Departments":
          await viewDepartments();
          break;
        case "Add Department":
          await addDepartment();
          break;
        case "Quit":
          console.log("Goodbye!");
          process.exit(0);
          break;
      }
    });
};

// Query functions
const viewDepartments = async () => {
  const query = "SELECT id, name AS department FROM department";
  const result = await pool.query(query);
  console.table(result.rows);
  startQuery();
};

const viewRoles = async () => {
  const query = `
    SELECT 
      role.id, 
      role.title AS role, 
      role.salary, 
      department.name AS department 
    FROM role
    JOIN department ON role.department_id = department.id`;
  const result = await pool.query(query);
  console.table(result.rows);
  startQuery();
};

const viewEmployees = async () => {
  const query = `
    SELECT 
      employee.id, 
      employee.first_name, 
      employee.last_name, 
      role.title AS role, 
      department.name AS department, 
      role.salary, 
      CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
    FROM employee
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    ORDER BY employee.id`;
  const result = await pool.query(query);
  console.table(result.rows);
  startQuery();
};

const addDepartment = async () => {
  const { department } = await inquirer.prompt([
    {
      type: "input",
      name: "department",
      message: "What is the name of the department?",
    },
  ]);
  const query = "INSERT INTO department (name) VALUES ($1)";
  await pool.query(query, [department]);
  console.log(`Added ${department} to the database.`);
  startQuery();
};

const addRole = async () => {
  const departments = await pool.query("SELECT id, name FROM department");
  const { title, salary, department } = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the name of the role?",
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary for this role?",
    },
    {
      type: "list",
      name: "department",
      message: "Which department does this role belong to?",
      choices: departments.rows.map((d) => ({ name: d.name, value: d.id })),
    },
  ]);
  const query =
    "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)";
  await pool.query(query, [title, salary, department]);
  console.log(`Added ${title} to the database.`);
  startQuery();
};

const addEmployee = async () => {
  const roles = await pool.query("SELECT id, title FROM role");
  const managers = await pool.query(
    "SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee"
  );
  const { firstName, lastName, role, manager } = await inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the employee's first name?",
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the employee's last name?",
    },
    {
      type: "list",
      name: "role",
      message: "What is the employee's role?",
      choices: roles.rows.map((r) => ({ name: r.title, value: r.id })),
    },
    {
      type: "list",
      name: "manager",
      message: "Who is the employee's manager?",
      choices: managers.rows.map((m) => ({ name: m.name, value: m.id })),
    },
  ]);
  const query =
    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)";
  await pool.query(query, [firstName, lastName, role, manager]);
  console.log(`Added ${firstName} ${lastName} to the database.`);
  startQuery();
};

const updateRole = async () => {
  const employees = await pool.query(
    "SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee"
  );
  const roles = await pool.query("SELECT id, title FROM role");
  const { employee, role } = await inquirer.prompt([
    {
      type: "list",
      name: "employee",
      message: "Which employee's role do you want to update?",
      choices: employees.rows.map((e) => ({ name: e.name, value: e.id })),
    },
    {
      type: "list",
      name: "role",
      message: "What is the employee's new role?",
      choices: roles.rows.map((r) => ({ name: r.title, value: r.id })),
    },
  ]);
  const query = "UPDATE employee SET role_id = $1 WHERE id = $2";
  await pool.query(query, [role, employee]);
  console.log("Updated the employee's role.");
  startQuery();
};

// Start Express server and CLI
startQuery();
