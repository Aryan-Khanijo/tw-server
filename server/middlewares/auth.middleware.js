'use strict'
const jwt = require('jsonwebtoken');
const { httpResponse } = require('../utils/httpRes');

module.exports = class AuthMiddleware {

	static async _verifyToken(req, res) {

		const token = req.headers['authorization'];
		if (!token) {
			return httpResponse(res, 403, 'No token provided');
		}
		try {
			const decoded = jwt.verify(token.replace('Bearer ',''), process.env.JWT_SECRET);
			req.user = decoded.user;
		} catch (error) {
			return httpResponse(res, 401, 'Unauthorized');
		}
	}

	static async verifyToken(req, res, next) {
		await AuthMiddleware._verifyToken(req, res);
		next();
	}

	static async verifyUser(req, res, next) {
		await AuthMiddleware._verifyToken(req, res);
		if (req.user.user_id != req.params.id) {
			return httpResponse(res, 403, 'Forbidden');
		}
		next();
	}

}