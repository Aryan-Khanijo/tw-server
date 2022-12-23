'use-strict';

const express = require('express');
const routes = express.Router();
const userRoutes = require('./user.routes');


routes.use('/user', userRoutes);
// router.use('/post');
// router.use()

module.exports = routes;