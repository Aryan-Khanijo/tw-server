'use strict';

const RelationController = require("./relation.controller");
const FollowerService = require("../service/follower.service");

module.exports = class FollowingController extends RelationController {
	constructor() {
		super(FollowerService);
	}

	async getFollower(req, res) {

		await this.getRelation(req, res, 'follower');
	}

	async addFollower(req, res) {
		try {
			if (!this._validateRequest(req, res))
				return;
			const followed_id = req.body.followed_id;
			const follower_id = req.params.id;
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

	async deleteFollower(req, res) {
		try {
			if (!this._validateRequest(req, res))
				return;
			const followed_id = req.body.followed_id;
			const follower_id = req.params.id;
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