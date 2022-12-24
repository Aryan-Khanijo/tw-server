'use strict';

const RelationService = require('../service/relation.service');

module.exports = class FollowerService extends RelationService {

	/**
	 * @description Creates an instance of FollowerService.
	 * @memberof FollowerService
	 * @constructor
	 * @extends RelationService
	 */
	constructor() {
		super('followers_view');
	}

	
}