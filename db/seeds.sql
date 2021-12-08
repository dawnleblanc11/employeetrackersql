INSERT INTO department (id, department_name)
VALUES
(1, 'ToyMakers'),
(2, 'Shipping'),
(3, 'Inventory'),
(4, 'Transportation'),
(5, 'Delivery');

INSERT INTO roles (id, title, salary, department_id)
VALUES
(100, 'Elves', 30543.12, 1),
(110, 'Quality Checker', 45987.22, 1),
(120, 'Toy Designer', 32232.11, 1),
(200, 'Bag Packer', 13212.43, 2),
(210, 'Sleigh Loader', 16543.23, 2)
(300, 'List Checker', 32434.77, 3),
(310, 'Behavior Verifier', 43232.11, 3)
(400, 'Lead Reindeer', 33543.66, 4),
(410, '2nd Reindeer', 22432.33, 4),
(420, 'Alternate Reindeer', 32114.22, 4),
(500, 'Santa', 250000.00, 5);

INSERT INTO employee (id, first_name, last_name, roles_id, manager_id)
VALUES
(1001, 'Buddy', 'Elf', 100, 5000),
(1002, 'Thranduil', 'Hobbit', 100, 1001),
(1003, 'Elrond', 'Lord', 100, 1001),
(1004, 'Zippity', 'Switch', 100, 1001),
(1005, 'Hermey', 'Nose', 100, 1001),
(1006, 'Bernard', 'Clause' 110, 1001),
(1201, 'Jeremy', 'Madl', 120, 1001),
(2001, 'Exfed', 'Ups', 200, 1001),
(2002, 'Clebrimbor', 'Elven', 210, 1001),
(3001, 'Peer', 'Review', 300, 3002),
(3002, 'Mrs', 'Claus', 300, ),
(3003, 'Tattle', 'Tale', 310, 3002),
(4000, 'Rudolph', 'Rednose', 400, 5000),
(4001, 'Comet', 'Outtaspace', 410, 4000),
(4002, 'Dasher', 'Fastest', 410, 4000),
(4003, 'Dancer', 'Graceful', 410, 4000),
(4004, 'Nofly', 'Trieshard', 420, 4001),
(5000, 'Mr', 'Claus', 500, 3002);