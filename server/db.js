require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const query = (text, params) => {
  return pool.query(text, params);
};


const close = () => {
  pool.end();
};

module.exports = {
  query,
  close,
};
