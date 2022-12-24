'use strict';

const BaseController = require('../controllers/base.controller');
const RelationService = require('../service/relation.service');
const { relationModel } = require('../schema/models/relation.model');

module.exports = class RelationController extends BaseController {

	constructor(service = RelationService) {
		super(service, relationModel, 'relations');
	}

	async _getRelations(id) {
		try {
			const result = await this.getAllView('user_id', id);
			return result;
		} catch (err) {
			console.log(err);
		}
	}

	async getRelation(req, res, relation) {
		try {
			if (!this._validateRequest(req, res))
				return;
			const relations = await this.service.getRelation(req.user.user_id);
			if (relations.length === 0) {
				return this.httpResponse(res, 204, 'success', `No ${relation} found`);
			}
			return this.httpResponse(res, 200, 'success', relations);
		} catch (err) {
			console.log(err);
			return this.httpResponse(res, 500, 'error', 'Internal server error');
		}
	}


}