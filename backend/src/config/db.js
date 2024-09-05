//setting up database

// src/config/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Uses DATABASE_URL from the environment variables
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,  // Usually 5432
});

pool.on('connect', () => {
  console.log("Connected to the database");
});


module.exports = {
  query: (text, params) => pool.query(text, params),
};
