'use strict';

const ViewService = require('./view.service');

module.exports = class RelationService extends ViewService {
	constructor(view){
		super('relations', view);
		this.userService = new UserService();
	}

	async getRelation(id){
		try {
			const result = await this.getAllFromView('user_id', id);
			const relation = await this.userService.getAllFromView('user_id', result);
			return relation;
		} catch (err) {
			console.log(err);
		}
	}
}