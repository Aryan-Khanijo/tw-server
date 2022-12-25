'use strict';

const { UserModel } = require("../schema/models/user.model");
const UserService = require("../service/user.service");
const BaseController = require("./base.controller");
const bycrpt = require("bcrypt");

module.exports = class UserController extends BaseController {

	/**
	 * @description Creates an instance of UserController.
	 * @param {UserService} service
	 * @memberof UserController
	 * @constructor
	 * @extends BaseController
	 */
	constructor() {
		super(UserService, UserModel, 'users');
	}


	async login(req, res) {
		try {
			const { username, password } = req.body;
			const user = await this.service.login(username, password);
			if (user) {
				const access_token = await this.service.generateToken(user);
				const data = {
					issuedAt: new Date(),
					user,
					access_token,
					expiresAt: new Date(new Date().getTime() + 8 * 60 * 60 * 1000)
				};
				return this.httpResponse(res, 200, 'Login successful', data);
			}
			return this.httpResponse(res, 401, 'error', 'Invalid credentials');
		} catch (err) {
			return this.httpResponse(res, 500, 'error', 'Internal server error');
		}
	}

	async signUp(req, res) {
		try {
			const { name, username, password } = req.body;
			const hash = await bycrpt.hash(password, 10);
			const user = this.model(name, username, hash);
			const newUser = await this.service.register(user);
			if (!newUser) {
				return this.httpResponse(res, 400, 'error', 'User already exists');
			}
			return this.httpResponse(res, 201, 'success', 'User created', newUser);
		} catch (err) {
			console.log(err);
			return this.httpResponse(res, 500, 'error', 'Internal server error');
		}
	}

	async getUserByName(req, res) {
		try {
			if (req.params.$name === undefined) {
				return this.httpResponse(res, 400, 'error', 'Invalid request');
			}
			const name = '%' + req.params.$name + '%';
			const options = {
				conditions: [
					{
						column: 'name',
						values: [name],
						type: 'LIKE'
					}
				]};
			const users = await this.getAll(options);
			if (!users) {
				return this.httpResponse(res, 204, 'No users found');
			}
			return this.httpResponse(res, 200, 'Users found', users);
		} catch (err) {
			console.log(err);
			return this.httpResponse(res, 500, 'error', 'Internal server error');
		}
	}
	


	async getUser(req, res) {
		try {
			if (!this._validateRequest(req, res))
				return;
			const user = await this.getSingleView('user_id', req.params.id);
			if (!user) {
				return this.httpResponse(res, 404, 'error', 'User not found');
			}
			return this.httpResponse(res, 200, 'User Found', user);
		} catch (err) {
			console.log(err);
			return this.httpResponse(res, 500, 'error', 'Internal server error');
		}
	}

}