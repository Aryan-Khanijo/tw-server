'use strict'

const express = require('express');
const router = express.Router();
const SignupMiddleware = require('../middlewares/signup.middleware');
const UserController = require('../controllers/user.controller');
const AuthCRUD = new UserController();

/**
 * @description Signup route
 * @param {string} path
 * @param {function} middleware
 * @param {function} callback
 * @returns {object} response
 * @memberof AuthRoutes
 * @async
 */
router.post('/signup', SignupMiddleware.validateSignup, async (req, res) => {
	await AuthCRUD.signUp(req, res);
});

/**
 * @description Login route
 * @param {string} path
 * @param {function} callback
 * @returns {object} response
 * @memberof AuthRoutes
 * @async
 */
router.post('/login', async (req, res) => {
	await AuthCRUD.login(req, res);
});

module.exports = router;