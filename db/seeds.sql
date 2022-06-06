INSERT INTO departments (name)
VALUES
  ('Sales'),
  ('Finance'),
  ('Human Resources'),
  ('Safety'),
  ('Warehouse');

INSERT INTO roles (title, salary, department_id)
VALUES 
  ('Salesman', '80000', 1),
  ('Sales Manager', '90000', 1),
  ('Accountant', '65000', 2),
  ('Accounting Manager', '85000', 2),
  ('Human Resources Representative', '50000', 3),
  ('Human Resources Manager', '75000', 3),
  ('Safety Coordinator', '55000', 4),
  ('Safety Manager', '88000', 4),
  ('Warehouse Associate', '40000', 5),
  ('Warehouse Manager', '60000', 5); 

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Gerlind', 'Cortez', 2, NULL),
  ('Uri', 'Nigro', 1, 1),
  ('Aod', 'Porto', 4, NULL),
  ('Hosea', 'Terrazas', 3, 3),
  ('Godzilla', 'Sala', 6, NULL),
  ('Milcah', 'Acosta', 5, 5),
  ('Ruperta', 'Romagna', 8, NULL),
  ('Erwin', 'Huerta', 7, 7),
  ('Ermenegildo', 'Gonzalez', 10, NULL),
  ('Mara', 'Trujillo', 9, 9),
  ('John', 'Smith', 1, 1),
  ('Jane', 'Williams', 9, 9),
  ('Jenifer', 'McCoy', 5, 5),
  ('William', 'Anderson', 3, 3),
  ('Shane', 'Meyer', 1, 1); 