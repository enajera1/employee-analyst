const mysql = require('mysql2');
const express = require('express');
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

const router = express.Router();
module.exports = router; 
module.exports = db;