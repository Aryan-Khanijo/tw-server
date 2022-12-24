'use strict';

const RelationService = require('../service/relation.service');

module.exports = class FollowerService extends RelationService {
	constructor() {
		super('followers_view');
	}

	async getFollowers(id) {
		try {
			const result =  await this.getAllFromViewById('user_id', id);
			if (result.length === 0) {
				return [];
			}
			const ids = result.map(relation => relation.follower_id);
			return ids;
		} catch (err) {
			console.log(err);
		}
	
	}
}