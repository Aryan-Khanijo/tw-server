'use strict';

const BaseController = require('../controllers/base.controller');
const RelationService = require('../service/relation.service');
const { relationModel } = require('../schema/models/relation.model');

module.exports = class RelationController extends BaseController {

	/**
	 * @description Creates an instance of RelationController.
	 * @param {RelationService} service
	 * @memberof RelationController
	 * @constructor
	 * @extends BaseController
	 */
	constructor(service = RelationService) {
		super(service, relationModel, 'relations');
	}

	/**
	 * @description Get all relations
	 * @param {*} id
	 * @returns {object} response
	 * @memberof RelationController
	 * @async
	 */
	async _getRelations(id) {
		try {
			const result = await this.getAllView('user_id', id);
			return result;
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * @description Get all relations
	 * @param {*} req
	 * @param {*} res
	 * @returns {object} response
	 * @memberof RelationController
	 * @async
	 */
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