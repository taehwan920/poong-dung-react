import db from "./handleDB";
import express from 'express';

db.connect();
const router = express.Router();

router.get('/', (req, res) => {
    db.query('SELECT * FROM hangang_temp', (error, result) => {
        if (error) { throw error; }
        res.json(result);
    });
});

router.get('/error', (req, res) => {
    res.send('요청이 이상합니다. 요청 데이터 형식을 확인해 주세요.')
});

router.get('/:start/:end', (req, res) => {
    const start = req.params.start - 1;
    const end = req.params.end;
    const dbEnd = end - start;
    if (start < 0 || dbEnd < 0) {
        res.redirect('/db/error');
    } else {
        db.query(`SELECT * FROM hangang_temp ORDER BY id DESC LIMIT ${start}, ${dbEnd}`, (error, result) => {
            if (error) { throw error; };
            console.log(result);
            res.json(result);
        });
    };
});

export default router;