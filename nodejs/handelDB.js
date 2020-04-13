import mysql from 'mysql';
import password from './password';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: password,
    database: 'poongdung'
});

export default db;