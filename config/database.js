const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'hostname',
  user: 'username', 
  password: 'password', 
  database: 'db_name',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
