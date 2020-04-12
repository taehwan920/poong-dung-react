// import mysql from 'mysql';
import http from 'http';
// import password from './password.mjs';

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: password,
//     database: 'poongdung'
// });

// db.connect();

// db.query('SELECT * FROM hangang_temp', function (error, result) {
//     if (error) { throw error; }
//     console.log(result);
// });

const server = http.createServer(function (req, res) {
    res.writeHead(200);
    res.end('Hello nodejs');
})

server.listen(9205);