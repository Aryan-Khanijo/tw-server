'use strict';

const ViewService = require("./view.service");
const FollowingService = require("./following.service");

module.exports = class TweetService extends ViewService {

	/**
	 * @description Creates an instance of TweetService.
	 * @memberof TweetService
	 * @constructor
	 * @extends ViewService
	 */
	constructor() {
		super('tweets', null);
		this.followingService = new FollowingService();
	}

	/**
	 * @description Get all tweets for a user
	 * @param {Array} ids
	 * @param {number} page
	 * @param {number} limit
	 * @returns {Array} tweets
	 * @memberof TweetService
	 * @async
	 */
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