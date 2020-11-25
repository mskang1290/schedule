const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const db = require('./config/db');
const cors = require('cors');
app.use(cors());

app.get('/api/host', (req, res) => {
    res.send({ host : 'json clear' });
})
app.get('/api/getEvent', (req, res) => {
    db.query("select * from events", (err, data) => {
        if(!err) {
            res.send(data);

        } else {
            console.log(err);
            res.send(err);
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})