const { emptyStatement } = require('@babel/types');
const express = require('express');
const { appendFile } = require('fs');
const db = require('../../db/connection');
const router = express.Router();
module.exports = router; 

// // Get all employees with job titles from roles table. 
// const sql = `(SELECT employees.*, roles.title, roles.salary, roles.department_id
//             from employees
//             left join roles on employees.role_id = roles.id)`
            

//             //Get Employee with manager on table. 
//             `(SELECT e.id, e.first_name, e.last_name, e.manager_id, m.first_name AS manager_first_name, m.last_name AS manager_last_name
//             FROM employees e
//             LEFT JOIN employees m
//             ON e.manager_id = m.id)`


// Get employee by ID 
app.get('/api/employee/:id', (req, res) => {
  const sql = `SELECT * FROM employees WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if(err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

// Add employee
app.post ('/api/employee', ({ body }, res) => {
  const sql =  `INSERT INTO employees (first_name, last_name, role_id, manager_id)
  VALUES (?,?,?,?)`
  const params = [body.first_name, body.last_name, body.role_id, body.manager_id]; 

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

//Update Employee Role
app.put('/api/employee/:id', (req, res) => {
  const sql = `UPDATE employees SET role_id = ?
  WHERE id = ?`;
  const params = [req.body.role_id, req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      //check if a record was found
    } else if (!result.affectedRows) {
      res.json({
        message: 'Employee not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});