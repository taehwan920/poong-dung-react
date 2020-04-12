import mysql from 'mysql';
import password from './password';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: password,
    database: 'poongdung'
});

db.connect();

const dbResult = db.query('SELECT * FROM hangang_temp', function (error, result) {
    if (error) { throw error; }
    const a = JSON.stringify(result)
    console.log(a);
    // return result;
});

export default dbResult;