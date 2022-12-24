'use strict';
const BaseDbService = require('./db.service');

module.exports = class ViewService extends BaseDbService {

	/**
	 * @description Creates an instance of ViewService.
	 * @param {string} model
	 * @param {string} view
	 * @memberof ViewService
	 * @constructor
	 * @extends BaseDbService
	 */
	constructor(model, view) {
		super(model);
		this.views = view;
	}


	/**
	 * @description Get all from view
	 * @param {string} column
	 * @param {string} id
	 * @returns {array} result
	 * @memberof ViewService
	 * @async
	 */
	async getSingleFromView(options) {
		try {
			options.limit = 1;
			const query = await this._getfromViewQuery(options);
			const result = await this._runQuery(query);
			return result[0];
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * @description Get all from view
	 * @param {string} column
	 * @param {string} id
	 * @returns {array} result
	 */
	async getAllFromViewById(options) {
		try {
			const query = await this._getfromViewQuery(options);
			const result = await this._runQuery(query);
			return result;
		} catch (err) {
			console.log(err);
		}
	}

	async _getfromViewQuery(options) {
		const { conditions, limit, offset } = options;
		let query = `SELECT * FROM ${this.views}`;
		let conditionString = '';
		let conditionArray = [];
		if (conditions?.length) {
			conditions.forEach((condition) => {
				if (condition.type)
					conditionArray.push(`"${condition.column}" ${condition.type} (${condition.values.join(',')}) `);
				else
					conditionArray.push(`"${condition.column}" = '${condition.values[0]}' `);
			});
		}
		if (conditionArray.length)
			conditionString += ` where ${conditionArray.join('and ')}`;
		
		query += conditionString;

		if (limit) {
			query += ` LIMIT ${limit}`;
		}
		if (offset) {
			query += ` OFFSET ${offset}`;
		}
		query += ';';
		return query;
	}


	async getAllFromViewByMany(options) {
		try {
			const query = await this._getfromViewQuery(options);
			const result = await this._runQuery(query);
			return result;

		} catch (err) {
			console.log(err);
		}
	}

}
