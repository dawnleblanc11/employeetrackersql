INSERT INTO departments (department_name)
VALUES
('ToyMakers'),
('Shipping'),
('Inventory'),
('Transportation'),
('Delivery');

INSERT INTO roles (role_title, role_salary, role_department_id)
VALUES
('Elves', 30543.12, 1),
('Quality Checker', 45987.22, 1),
('Toy Designer', 32232.11, 1),
('Bag Packer', 13212.43, 2),
('Sleigh Loader', 16543.23, 2),
('List Checker', 32434.77, 3),
('Behavior Verifier', 43232.11, 3),
('Lead Reindeer', 33543.66, 4),
('2nd Reindeer', 22432.33, 4),
('Alternate Reindeer', 32114.22, 4),
('Santa', 250000.00, 5);

INSERT INTO employees (first_name, last_name, employee_role_id, manager_id)
VALUES
('Mrs', 'Claus', 3, NULL),
('Buddy', 'Elf', 1, 1),
('Thranduil', 'Hobbit', 1, 1),
('Elrond', 'Lord', 1, 1),
('Zippity', 'Switch', 1,1),
('Hermey', 'Nose', 1, 1),
('Bernard','Clause', 11, 1),
('Jeremy','Madl', 11, 1),
('Exfed', 'Ups', 2, 1),
('Clebrimbor', 'Elven', 2, 1),
('Peer', 'Review', 3, 1),
('Tattle', 'Tale', 3, 1),
('Rudolph', 'Rednose', 4, 1),
('Comet', 'Outtaspace', 4, 1),
('Dasher', 'Fastest', 4, 1),
('Dancer', 'Graceful', 4, 1),
('Nofly', 'Trieshard', 4, 1),
('Mr', 'Claus', 5, 1);