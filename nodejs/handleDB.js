import mysql from 'mysql';
import { environment } from './environment';

const db = mysql.createConnection({
    host: environment.DB_HOST,
    user: environment.DB_USER,
    password: environment.DB_PASSWORD,
    database: environment.DB_DB
});

export default db;