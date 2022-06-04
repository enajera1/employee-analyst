const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your SQL username,
    user: 'root',
    //Your SQL password
    password: 'ENZOboltonNajera1223.',
    database: 'employee'
  },
  console.log(`Connected to the employee database.`)
);


module.exports = db;