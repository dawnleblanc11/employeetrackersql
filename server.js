const express = require('express');
const DB = require('./db/crud');
//const apiRoutes = require('./routes/apiRoutes');
const { printTable } = require('console-table-printer')

DB.viewAlldepartments().then(([rows])=>{
    let departments = rows;
    printTable(departments);
});
DB.viewAllroles().then(([rows])=>{
    let roles = rows;
    printTable(roles);
});
DB.viewAllemployees().then(([rows])=>{
    let employees = rows;
    printTable(employees);
});

// const PORT = process.env.PORT || 3001;
// const app = express();

// // Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// // Use apiRoutes
// app.use('/api', apiRoutes);

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

// Start server after DB connection
// db.connect(err => {
//   if (err) throw err;
//   console.log('Database connected.');
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// });
