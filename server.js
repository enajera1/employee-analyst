const express = require('express'); 
const db = require('./db/connection'); 
// const apiRoutes = require('./routes/apiRoutes');
const cTable = require('console.table');
const inquirer = require('inquirer'); 
const router = require('./routes/apiRoutes');



const PORT = process.env.PORT || 3001;
const app = express();



// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// Use apiRoutes
// app.use('/api', apiRoutes); 


// CONSOLE TABLE FOR LATER
// var values = [
//   ['max', 20],
//   ['joe', 30],
//   ['Erik', 28]
// ];
// console.table(['name', 'age'], values);


// const promptApp = promptInquire => {
//     inquirer
//     .prompt([
//     {
//       type: 'list',
//       name: 'init-question',
//       message: 'What would you like to do?',
//       choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
//     },
//   ])
// };
// promptApp();



// // GET a single employee
// db.query(`SELECT * FROM employee WHERE id = 5`, (err, row) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(row);
// });

// // Delete an employee. May not need. We'll see. 
// db.query(`DELETE FROM employee WHERE id = ?`, 1, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

