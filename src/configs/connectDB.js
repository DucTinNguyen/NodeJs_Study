// get the client
// const mysql = require('mysql2');
import mysql from 'mysql2/promise';

// create the connection to database
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'db_nodejs_basic'
// });
// const connection =  mysql.createConnection({host:'localhost', user: 'root', database: 'db_nodejs_basic'});
console.log("Creating connection pool...")
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'db_nodejs_basic',
    // password: 'password'
})

// simple query
// connection.query(
//   'SELECT * FROM `users`',
//   function(err, results, fields) {
//     console.log(results); // results contains rows returned by server
//   }
// );

export  default pool;