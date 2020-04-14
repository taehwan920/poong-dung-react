import express from 'express';
import helmet from 'helmet';
import dbRouter from './dbRouter';

const app = express();



app.use(helmet());
app.use('/db', dbRouter);

app.use((req, res, next) => res.status(404).send('결과를 찾을 수 없습니다.'));

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something did wrong!')
})

export default app;
