const express = require('express');
const { appendFile } = require('fs');
const router = express.Router();
const db = require('../../db/connection');
const app = express();

//Get all departments
//Gets all info from employee table
app.get('/api/departments', (req, res) => {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success', 
      data: rows
    });
  });
});

app.post('/api/department', ({ body }, res) => {
  const sql = `INSERT INTO departments (name)
  VALUES (?)`;
  const params = [body.name];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});




module.exports = router; 