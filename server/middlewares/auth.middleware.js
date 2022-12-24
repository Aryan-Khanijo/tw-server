'use strict'
const jwt = require('jsonwebtoken');
const { httpResponse } = require('../utils/httpRes');

module.exports = class AuthMiddleware {

	/**
	 * @description This function is to verify the token
	 * @static
	 * @param {*} req
	 * @param {*} res
	 * @returns {Boolean}
	 * @memberof AuthMiddleware
	 * @async
	 */
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

	/**
	 * @description This function is to verify the token
	 * @static
	 * @param {*} req
	 * @param {*} res
	 * @param {*} next
	 * @returns {Boolean}
	 * @memberof AuthMiddleware
	 * @async
	 */
	static async verifyToken(req, res, next) {
		await AuthMiddleware._verifyToken(req, res);
		next();
	}

	/**
	 * @description This function is to verify the token and the user id
	 * @static
	 * @param {*} req
	 * @param {*} res
	 * @param {*} next
	 * @returns {Boolean}
	 * @memberof AuthMiddleware
	 * @async
	 */
	static async verifyUser(req, res, next) {
		await AuthMiddleware._verifyToken(req, res);
		const reqId = req.user.user_id;
		if (req.user.user_id != reqId) {
			return httpResponse(res, 403, 'Forbidden');
		}
		next();
	}

}