'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const router = require('./routes/index.routes');
const PORT = process.env.PORT;
// const knex = require('./schema/knex');

app.get('/', async (req, res) => {
	// console.log(await knex.raw('select * FROM user_info_view;'))
	res.sendFile(path.join(__dirname, '../resource/message.html'))
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
	origin: process.env.CLIENT_URL,
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Access-Control-Request-Method', 'Access-Control-Request-Headers']
}));
app.use('/api', router);


app.listen(PORT, '0.0.0.0', () => {
	console.log(`Twitter-clone API is live at http://localhost:${PORT}`);
});