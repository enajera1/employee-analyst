const { emptyStatement } = require('@babel/types');
const express = require('express');
const { appendFile } = require('fs');
const db = require('../../db/connection');
const router = express.Router();
module.exports = router; 

// Get all employees with job titles from roles table. 
const sql = SELECT 
employees.id, 
employees.first_name,
employees.last_name, 
roles.title, 
roles.department_id AS Department,
roles.salary, 
employees.manager_id
            from employees
            left join roles on employees.role_id = roles.id;
            

            //Get Employee with manager on table. 
            SELECT e.id, e.first_name, e.last_name, e.manager_id, m.first_name AS manager_first_name, m.last_name AS manager_last_name
            FROM employees e
            LEFT JOIN employees m
            ON e.manager_id = m.id

            SELECT employees.*, roles.title, roles.salary, roles.department_id
                         from employees
                         left join roles on employees.role_id = roles.id
             ;
