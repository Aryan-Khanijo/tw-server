'use strict';

const RelationController = require("./relation.controller");
const FollowerService = require("../service/follower.service");

module.exports = class FollowingController extends RelationController {
	
	/**
	 * @description Creates an instance of FollowerController.
	 * @memberof FollowerController
	 * @constructor
	 * @extends RelationController
	 */
	constructor() {
		super(FollowerService);
	}

	/**
	 * @description Get all followers
	 * @param {*} req 
	 * @param {*} res 
	 */

	async getFollower(req, res) {
		await this.getRelation(req, res, 'follower');
	}

	/**
	 * @description Add a follower
	 * @param {*} req
	 * @param {*} res
	 * @returns {object} response
	 * @memberof FollowerController
	 * @async
	 */
	async addFollower(req, res) {
		try {
			if (!this._validateRequest(req, res))
				return;
			const followed_id = req.body.followed_id;
			const follower_id = req.user.user_id;
			const relation = this.model(follower_id, followed_id);
			const result = await this.create(relation);
			if (result) {
				return this.httpResponse(res, 201, 'success', 'Follower added');
			}
		} catch (err) {
			console.log(err);
			return this.httpResponse(res, 500, 'error', 'Internal server error');
		}
	}

	/**
	 * @description Delete a follower
	 * @param {*} req
	 * @param {*} res
	 * @returns {object} response
	 * @memberof FollowerController
	 * @async
	 */

	async deleteFollower(req, res) {
		try {
			if (!this._validateRequest(req, res))
				return;
			const followed_id = req.body.followed_id;
			const follower_id = req.user.user_id;
			const relation = this.model(follower_id, followed_id);
			const result = await this.delete(relation);
			if (result) {
				return this.httpResponse(res, 200, 'success', 'Follower deleted');
			}
		} catch (err) {
			console.log(err);
			return this.httpResponse(res, 500, 'error', 'Internal server error');
		}
	}

}