// db.js

// You're going to need to install 'dotenv' by doing "npm install dotenv", and make a new file called ".env" to store variables 
// Also will have to change type in "package.json" to "modules" to allow for importing and exporting 
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config(); 

// Create a connection to the database
// dotenv, process.env.EXAMPLE lets you store variables in another file called ".env" 
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD, 
  database: process.env.MYSQL_DATABASE 
}).promise(); // Promise is an object representing the eventual completion of an asynchronous operation 
// Async function always returns a "promise", and "await" pauses execution of the function until the "promise" is resolved 

// Make the connection available to other files 
export {pool};
