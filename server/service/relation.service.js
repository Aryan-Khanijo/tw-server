'use strict';

const ViewService = require('./view.service');
const UserService = require('./user.service');

module.exports = class RelationService extends ViewService {

	constructor(view) {
		super('relations', view);
		this.userService = new UserService();
	}

	async getRelation(id) {
		try {
			const result = await this.getAllFromView('user_id', id);
			if (result.length === 0) {
				return [];
			}
			const relation = await this.userService.getAllFromView('user_id', result);
			return relation;
		} catch (err) {
			console.log(err);
		}
	}

	async delete(relation) {
		try {
			const options = {
				conditions: [
					{ column: 'follower_id', values: [relation.follower_id] },
					{ column: 'followed_id', values: [relation.followed_id] }
				]
			}
			const result = await this._delete(options);
			return result;
		} catch (err) {
			console.log(err);
		}
	}
}