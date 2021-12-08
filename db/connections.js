const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: process.env.DB_USER,
  // Your MySQL password
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
db.connect(function(err){
    if(err) throw err;
})
module.exports = db;