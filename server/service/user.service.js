'use strict';

const ViewService = require('../service/view.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = class UserService extends ViewService {

	constructor() {
		super('users', 'user_info_view');
	}

	async login(username, password) {
		try {
			const user = await this.getSingle({
				conditions: [
					{
						'column': 'username',
						'values': [username]
					}
				]
			});
			if (user) {
				const isMatch = await bcrypt.compare(password, user.password);
				if (isMatch) {
					const userInfo = await this.getSingleFromView('user_id', user.id);
					return userInfo;
				}
			}
			return false;
		} catch (err) {
			console.log(err);
		}
	}

	async generateToken(user) {
		try {
			const token = await jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '8h' });
			return token;
		} catch (err) {
			console.error(err);
		}
	}


	async register(user) {
		try {
			const newUser = await this._create(user);
			delete newUser.password;
			return newUser;
		} catch (err) {
			console.log(err);
		}
	}
}