'use strict';

const express = require('express');
const routes = express.Router();
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');


routes.use('/auth', authRoutes);
routes.use('/user', userRoutes);
// router.use('/user', userRoutes);
// router.use()

module.exports = routes;