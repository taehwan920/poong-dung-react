import express from 'express';
import dbResult from './dbResult';

const app = express();


app.get('/', (req, res) => {
    dbResult();
    // res.json(dbResult);
})

app.listen(3000, () => {
    console.log('server is running on port 3000!')
})

// const server = http.createServer(function (req, res) {
//     res.writeHead(200);
//     res.end(dbResult);
// })

// server.listen(9205);