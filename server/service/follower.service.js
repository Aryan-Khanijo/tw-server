'use strict';

const RelationService = require('../service/relation.service');

module.exports = class FollowerService extends RelationService {
	constructor(){
		super('followers_view');
	}
}