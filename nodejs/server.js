import express from 'express';
import mysql from 'mysql';
import password from './password';

const app = express();
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: password,
    database: 'poongdung'
});
db.connect();



app.get('/', (req, res) => {
    // console.log(dbResult(function (result) {
    //     // const arr = [];
    //     const a = JSON.stringify(result);
    //     const b = JSON.parse(a)
    //     return [b];
    // }))
    db.query('SELECT * FROM hangang_temp', (error, result) => {
        if (error) { throw error; }
        res.json(result);
    });
})

app.listen(3000, () => {
    console.log('server is running on port 3000!')
})
