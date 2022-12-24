'use strict';

const RelationController = require("./relation.controller");
const FollowingService = require("../service/following.service");

module.exports = class FollowingController extends RelationController{
	constructor(){
		super(FollowingService);
	}

	async getFollowing(req, res){
		await this.getRelation(req, res, 'following');
	}

}