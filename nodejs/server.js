import express from 'express';
import db from './handleDB';

const app = express();

app.get('/db', (req, res) => {
    db.connect();
    db.query('SELECT * FROM hangang_temp', (error, result) => {
        if (error) { throw error; }
        res.json(result);
    });
})

export default app;
