'use strict';

const express = require('express');
const routes = express.Router();
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');

/**
 * @description Auth routes
 * @param {string} path
 * @param {function} callback
 */
routes.use('/auth', authRoutes);

/**
 * @description User routes
 * @param {string} path
 * @param {function} callback
 */
routes.use('/user', userRoutes);

module.exports = routes;