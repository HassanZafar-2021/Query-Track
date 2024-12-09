import dotenv from "dotenv";
dotenv.config();

// Import and require Pool (node-postgres)
// We'll be creating a Connection Pool. Read up on the benefits here: https://node-postgres.com/features/pooling
import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: "localhost",
  database: process.env.DB_NAME,
  port: 5432,
});

const connectToDb = async () => {
  try {
    await pool.connect();
    console.log("Connected to the database.");
  } catch (err) {
    console.error("Error connecting to database:", err);
    process.exit(1);
  }
};

export { pool, connectToDb };

/*
Question 1: Explain what connections.ts does and what what doex export from and import to does
with talking about from and as 
Question 2: Explain what joins do in SQL and how they are used
Question 3: Why is there different SQL's and which one is the best (MySQL, SQLite, PostgreSQL)
Question 4: Primary Keys vs Foreign Keys
Question 5: Check inquirer code
Question 6: Do i do npm init -y always before doing npm i, how come some scenarios install
all the packages and some I have to go one by one like pg, express, inquirer, dotenv
Question 7: What does each package do (pg, express, inquirer, dotenv)
Question 8: What port number do we use, default is 3001?
Question 9: Check folder structure, is node modules and package.json supposed to be in root dir?
Question 10: If a ID is SERIAL, we dont put it in the INSERT statement, correct?
*/
