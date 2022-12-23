'use-strict';

require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path')
const router = require('./routes/index.routes');
const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Resource/mess.html'));
})

app.use('/api', router);



app.listen(PORT, '0.0.0.0',() => {
    console.log(`Twitter-clone API is live at http://localhost:${PORT}`);
});