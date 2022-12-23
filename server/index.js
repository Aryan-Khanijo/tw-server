'use-strict';

require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path')
const router = require('./routes/index.routes');
const PORT = process.env.PORT;
// const knex = require('./schema/knex');

app.get('/', (req, res) => {
    // console.log(await knex.raw('SELECT * FROM pg_catalog.pg_tables'));
    res.sendFile(path.join(__dirname, '../resource/message.html'));
})

app.use('/api', router);



app.listen(PORT, '0.0.0.0',() => {
    console.log(`Twitter-clone API is live at http://localhost:${PORT}`);
});