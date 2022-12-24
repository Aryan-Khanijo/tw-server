'use strict';

const RelationController = require("./relation.controller");
const FollowingService = require("../service/following.service");

module.exports = class FollowingController extends RelationController {
	
	/**
	 * @description Creates an instance of FollowingController.
	 * @memberof FollowingController
	 * @constructor
	 * @extends RelationController
	 */
	constructor() {
		super(FollowingService);
	}

	/**
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 */
	async getFollowing(req, res) {
		await this.getRelation(req, res, 'following');
	}

}