const mysql = require("mysql2/promise"); //mysql2 helps with db connection and promise cause will wrap it in async
const dotenv = require("dotenv"); //Helps in accessing .env file that contain evironement/secret safe guarded variables
//Loading env variables
dotenv.config({ path: "../.env" }); //Note ../.env cause its in the parent folder so we go back one step

//Pool is better to have multiple connections
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//To test connection
const testConnection = async () => {
  try {
    const connection = await db.getConnection();
    console.log("Database connected successfully :) \n");
    connection.release(); // release back to pool
  } catch (err) {
    console.error("Database connection failed: \n", err.message);
  }
};

testConnection(); //call it

module.exports = db;
