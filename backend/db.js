const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: "localhost",
  database: "taskmaster_db",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

module.exports = pool;
