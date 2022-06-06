const { resolvePlugin } = require('@babel/core');
const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const app = express();

// Get all roles
app.get('/api/departments/roles', (req, res) => {
  const sql = `SELECT ROLES.*, DEPARTMENTS.NAME
              AS Department_name
              FROM ROLES
              LEFT JOIN DEPARTMENTS ON ROLES.DEPARTMENT_ID = DEPARTMENTS.ID`
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

// Add a role 
app.post('/api/departments/role', ({ body }, res) => {
  const sql = `INSERT INTO roles (title, salary, department_id)
              VALUES (?,?,?)`;
  const params = [body.title, body.salary, body.department_id];

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