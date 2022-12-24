'use strict';

const RelationService = require('../service/relation.service');

module.exports = class FollowingService extends RelationService {

	/**
	 * @description Creates an instance of FollowingService.
	 * @memberof FollowingService
	 * @constructor
	 * @extends RelationService
	 */
	constructor() {
		super('following_view');
	}
}