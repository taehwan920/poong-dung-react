import mysql from 'mysql';
import password from './password';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: password,
    database: 'poongdung'
});
db.connect();

export const dbResult = (callback) => {
    db.query('SELECT * FROM hangang_temp', (error, result) => {
        if (error) { throw error; }
        callback(result);
    });
};