'use strict';

const RelationService = require('../service/relation.service');

module.exports = class FollowingService extends RelationService {
	constructor() {
		super('following_view');
	}
}