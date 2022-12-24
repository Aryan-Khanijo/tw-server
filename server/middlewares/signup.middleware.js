const bycrpt = require('bcrypt');
const emailValidator = require('email-validator');
const UserService = require('../service/user.service');
const UserDb = new UserService();

module.exports = class SignupMiddleware {

	static async validateSignup(req, res, next) {
		const { password, username } = req.body;
		if (!password || !username) {
			return res.status(400).json({
				message: 'Please fill in all fields'
			});
		}

		if (password.length < 6) {
			return res.status(400).json({
				message: 'Password must be at least 6 characters'
			});
		}

		if (username.length < 3) {
			return res.status(400).json({
				message: 'Username must be at least 3 characters'
			});
		}

		if (username.length > 40) {
			return res.status(400).json({
				message: 'Username must be less than 20 characters'
			});
		}

		if (emailValidator.validate(username) === false) {
			return res.status(400).json({
				message: 'Username must be a valid email'
			});
		}

		SignupMiddleware.checkIfUserExists(req, res);

		next();
	}

	static async checkIfUserExists(req, res) {
		const { username } = req.body;
		const options = {
			conditions: [
				{
					column: 'username',
					values: [username],
				}
			]
		}
		try {
			const user = await UserDb.getSingle(options);
			if (user) {
				return res.status(400).json({
					message: 'User already exists'
				});
			}
		}
		catch (err) {
			console.log(err);
			return res.status(500).json({
				message: 'Internal server error'
			});
		}

	}


}