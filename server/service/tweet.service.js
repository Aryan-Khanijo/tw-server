'use strict';

const ViewService = require("./view.service");
const FollowingService = require("./following.service");

module.exports = class TweetService extends ViewService {

	constructor() {
		super('tweets', null);
		this.followingService = new FollowingService();
	}

	async getFeed(ids, page, limit) {
		try {
			const options = {
				conditions: [
					{ column: 'user_id', values: ids, operator: 'IN' }
				],
				order: '-created_at',
				limit,
				page,
			};
			const result = await this.getAll(options);
			return result;
		}
		catch (err) {
			console.log(err);
		}
	}

	
}