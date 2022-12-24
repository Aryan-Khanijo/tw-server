'use strict'

const express = require('express');
const router = express.Router();
const SignupMiddleware = require('../middlewares/signup.middleware');
const UserController = require('../controllers/user.controller');
const AuthCRUD = new UserController();

router.post('/signup', SignupMiddleware.validateSignup, async (req, res) => {
	await AuthCRUD.signUp(req, res);
});

router.post('/login', async (req, res) => {
	await AuthCRUD.login(req, res);
});

module.exports = router;