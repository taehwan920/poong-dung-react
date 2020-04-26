import db from "./handleDB";
import express from 'express';

db.connect();
setInterval(() => {
    db.query('SELECT 1');
    console.log('DB server is still running');
}, 1800000);
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
    const start = Number(req.params.start - 1);
    const end = Number(req.params.end);
    const dbEnd = end - start;
    typeof (start) === "number" && typeof (end) === "number"
        ? start >= 0 && dbEnd >= 0
            ? db.query(`SELECT * FROM hangang_temp ORDER BY id DESC LIMIT ${start}, ${dbEnd}`, (error, result) => {
                if (error) { throw error; };
                console.log('Someone has requested DB!');
                res.json(result);
            })
            : res.redirect('/db/error')
        : res.redirect('/db/error')
});

export default router;