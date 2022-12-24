'use strict';

const ViewService = require('./view.service');
const UserService = require('./user.service');

module.exports = class RelationService extends ViewService {

	/**
	 * @description Creates an instance of RelationService.
	 * @memberof RelationService
	 * @constructor
	 * @extends ViewService
	 */
	constructor(view) {
		super('relations', view);
		this.userService = new UserService();
	}

	/**
	 * @description Get all followers
	 * @param {string} id
	 * @returns {array} ids
	 * @memberof FollowerService
	 * @async
	 */
	async getRelationIds(column, id) {
		try {
			const options = {
				conditions: [
					{'column': column, 'values': [id]}
				]
			}
			const result =  await this.getSingleFromView(options);
			if (!result) {
				return [];
			}
			const relation = Object.keys(result)[1]
			const ids = result[relation];
			return ids;
		} catch (err) {
			console.log(err);
		}
	
	}

	/**
	 * @description Get all relations
	 * @param {string} id
	 * @returns {array} relations
	 * @memberof RelationService
	 * @async
	 */
	async getRelation(id) {
		try {
			const ids = await this.getRelationIds('user_id', id);
			if (ids.length === 0) {
				return [];
			}
			const relations = await this.userService.getAllFromViewByMany('user_id', ids);
			return relations;
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * @description Create a relation
	 * @param {object} relation
	 * @returns {object} relation
	 * @memberof RelationService
	 * @async
	 */
	async delete(relation) {
		try {
			const options = {
				conditions: [
					{ column: 'follower_id', values: [relation.follower_id] },
					{ column: 'followed_id', values: [relation.followed_id] }
				]
			}
			const result = await this._delete(options);
			return result;
		} catch (err) {
			console.log(err);
		}
	}
}