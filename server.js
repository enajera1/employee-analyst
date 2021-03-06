const express = require('express'); 
const db = require('./db/connection'); 
const inquirer = require('inquirer'); 


// const PORT = process.env.PORT || 3001;
const app = express();



// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.connect(async function () {
  promptApp ();
})




const promptApp = promptInquire => {
    inquirer
    .prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        'View Departments',
        'View Roles',
        'View Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role',
        'Quit'
      ],
    },
  ])
    .then((answer) => {
      switch(answer.choice) {
        case 'View Departments':
          viewDepartments();
          return;
        case 'View Roles':
          viewRoles();
          return;
        case 'View Employees':
          viewEmployees();
          return; 
        case 'Add an Employee':
          newEmployee();
          return;
        case 'Add a Role':
          addRole();
          return;
        case 'Add a Department':
          addDepartment();
          return;
        case 'Update an Employee Role':
          updateRole();
          return;
        case 'Quit': 
          quit();
          return;
      }
    })
};

function viewDepartments() {
  const sql = `SELECT * FROM departments`;
  db.query(sql, function(err, row) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    };
    console.log('---Viewing All Departments---');
    console.table(row);
    inquirer.prompt([
      {
        type: 'list',
        name: 'choice', 
        message: 'Select an option.',
        choices: [
          'Main Menu',
          "Quit"
        ]
      }
    ])
    .then((answer) => {
      switch (answer.choice){
        case 'Main Menu':
          promptApp();
          return;
        case 'Quit':
          quit(); 
      }
    })
  })
}

function viewRoles () {
  const sql = `SELECT ROLES.id, roles.title, roles.salary, DEPARTMENTS.NAME
  AS Department_name
  FROM ROLES
  LEFT JOIN DEPARTMENTS ON ROLES.DEPARTMENT_ID = DEPARTMENTS.ID`;
  db.query(sql, function(err, row) {
  if (err) {
    res.status(500).json({ error: err.message });
    return;
  };
    console.log('Viewing All Roles');
    console.table(row);
    inquirer.prompt([
      {
        type: 'list',
        name: 'choice', 
        message: 'Select an option.',
        choices: [
          'Main Menu',
          "Quit"
        ]
      }
    ])
    .then((answer) => {
      switch (answer.choice){
        case 'Main Menu':
          promptApp();
          return;
        case 'Quit':
          quit(); 
      }
    })
  })
}

function viewEmployees () {
  const sql = `  SELECT  
  employees.id,
  employees.first_name , 
  employees.last_name,
  roles.title AS Title,
  roles.salary AS Salary, 
  roles.department_id AS Department,
  employees.manager_id AS Manager
  FROM employees
  LEFT JOIN roles ON employees.role_id = roles.id`;

  db.query(sql, function(err, row) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    };
    console.log('Viewing All Employees');
    console.table(row);
    inquirer.prompt([
      {
        type: 'list',
        name: 'choice', 
        message: 'Select an option.',
        choices: [
          'Main Menu',
          "Quit"
        ]
      }
    ])
    .then((answer) => {
      switch (answer.choice){
        case 'Main Menu':
          promptApp();
          return;
        case 'Quit':
          quit(); 
      }
    })
  })
}

function addDepartment () {
  console.log(`
  Adding a New Department. Tell me more..
  `)
  inquirer.prompt ([
    {
      type: 'input',
      message: `Enter name of new department`,
      name: 'name'
    }
  ])
  .then(function (answer) {
    db.query(`INSERT INTO departments (name) VALUES (?)`,
    [answer.name],
    function(err, row){
      if (err) throw err; 
      console.table(row);
      inquirer.prompt([
        {
          type: 'list',
          name: 'choice', 
          message: 'Select an option.',
          choices: [
            'Main Menu',
            "Quit"
          ]
        }
      ])
      .then((answer) => {
        switch (answer.choice){
          case 'Main Menu':
            promptApp();
            return;
          case 'Quit':
            quit(); 
        }
      })
    })
  })
}

function newEmployee() {
  console.log(`
  
  Adding New Employee. Tell me more..
  
  `)
  inquirer.prompt ([
    {
      type: 'input',
      message: `Enter employee's first name`,
      name: 'firstName'
    },
    {
      type: 'input', 
      message: `Enter employee's last name`,
      name: 'lastName'
    },
    {
      type: 'input',
      message: `Enter employee's role ID`,
      name: 'roleId'
    },
    {
      type: 'input',
      message: `Enter their manager's ID number`,
      name: 'managerId'
    }
  ])
  .then(function (answer) {
    db.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
    [answer.firstName, answer.lastName, answer.roleId, answer.managerId],
    function(err, row){
      if (err) throw err;
      console.table(row);
      inquirer.prompt([
        {
          type: 'list',
          name: 'choice', 
          message: 'Select an option.',
          choices: [
            'Main Menu',
            "Quit"
          ]
        }
      ])
      .then((answer) => {
        switch (answer.choice){
          case 'Main Menu':
            promptApp();
            return;
          case 'Quit':
            quit(); 
        }
    })
  })}
  )
}

function addRole () {
  console.log(`
  
  Adding  a New Role. Tell me more..

  `)
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the new title',
      name: 'title'
    },
    {
      type: 'input',
      message: 'How much is the salary',
      name: 'salary'
    },
    {
      type: 'input',
      message: `What is the department ID?
      (1. Sales, 2.Finance, 3.HR, 4.Safety, 5.Warehouse)`,
      name: 'department_id'
    }
  ])
  .then(function(answer) {
    db.query(`INSERT INTO roles(title, salary, department_id) VALUES (?,?,?)`,
    [answer.title, answer.salary, answer.department_id], 
    function(err, row){
      if (err) throw err;
      console.table(row);
      inquirer.prompt([
        {
          type: 'list',
          name: 'choice', 
          message: 'Select an option.',
          choices: [
            'Main Menu',
            "Quit"
          ]
        }
      ])
      .then((answer) => {
        switch (answer.choice){
          case 'Main Menu':
            promptApp();
            return;
          case 'Quit':
            quit(); 
        }
      })
    })
  })
}
function updateRole() {
  console.log( `
  
  Updating Employee Role
  
  `)
  inquirer.prompt([
    {
      type: 'input',
      message: `What is employee's ID number?`,
      name: 'id'
    },
    {
      type: 'input',
      message: `What is employee's new role?`,
      name: 'role'
    }
  ])
  .then(function(answer) {
    db.query(`UPDATE employees SET role_id = ? WHERE id = ?`,
    [answer.role, answer.id],
    function(err, row){
      if (err) throw err;
      console.table(row);
      inquirer.prompt([
        {
          type: 'list',
          name: 'choice', 
          message: 'Select an option.',
          choices: [
            'Main Menu',
            "Quit"
          ]
        }
      ])
      .then((answer) => {
        switch (answer.choice){
          case 'Main Menu':
            promptApp();
            return;
          case 'Quit':
            quit(); 
        }
      })
    })
  })
}

function quit() {
  console.log('Goodbye Friend!');
  process.exit();
}


// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

