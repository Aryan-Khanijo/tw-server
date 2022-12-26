const knex = require('../schema/knex');
const { getOffset } = require('../utils/getOffest');

module.exports = class BaseDbService {

	/**
	 * @description Creates an instance of BaseDbService.
	 * @param {string} model
	 * @param {string} view
	 * @memberof BaseDbService
	 * @constructor
	 */
	constructor(model, view) {
		this.model = model;
		this.view = view;
	}

	/** 
	 * @param {*} options
	 * @returns {Object}
	*/
	_evaluateOptions(options) {
		let cols = [], order = {}, conditions = [], limit = 1, offset = null;
		if (options.cols)
			cols.push(...options.cols);
		if (options.order) {
			if (options.order[0] === '-') {
				order.atr = 'desc';
				order.column = options.order.slice(1);
			} else {
				order.atr = 'asc';
				order.column = options.order;
			}
		}
		if (options?.conditions?.length)
			conditions = options.conditions
		if (options?.limit)
			limit = options.limit
		if (options?.page)
			offset = getOffset(options.page, options.limit);
		return { cols, order, conditions, limit, offset };
	}

	/**
	 * 
	 * @description This function is to get single records from the database
	 * @param {*} options 
	 * @returns {Object}
	 * @async
	 * 
	 */
	async getSingle(options) {
		const result = await this._get(options);
		if (!result)
			return false;
		return result[0];
	}

	/**
	 * 
	 * @param {*} options 
	 * @description This function is to get all records from the database
	 * @returns {Array}
	 */

	async getAll(options) {
		const result = await this._get(options);
		return result;
	}

	/**
	 * 
	 * @param {*} query
	 * @description This function is to run the query
	 * @returns {Array} Result.rows
	 * @async
	 * 
	 */

	async _runQuery(query) {
		const result = await knex.raw(query);
		return result.rows;
	}

	/**
	 * 
	 * @param {*} options
	 * @description This function is to get all records from the database
	 * @returns {Array}
	 * @async
	 */

	async _get(options) {
		const query = this._getSelectQuery(options);
		const result = await this._runQuery(query);
		return result;
	}

	/**
	 * 
	 * @param {*} data
	 * @description This function is to create a record in the database
	 * @returns {Object} Result[0]
	 * @async
	 * 
	 */

	async _create(data) {
		const result = await knex(this.model).insert(data).returning('*');
		return result[0];
	}


	/**
	 * 
	 * @param {*} options
	 * @description This function is to get the query
	 * @returns {String}
	 * 
	 */
	_getSelectQuery(options) {
		const { cols, order, conditions, limit, offset } = this._evaluateOptions(options);
		let conditionArray = [];
		let conditionString = '';
		let query = 'Select ';
		if (cols.length)
			query += `${cols.join(',')} `;
		else
			query += '* ';
		query += `from ${this.model} `;
		if (conditions?.length) {
			conditions.forEach((condition) => {
				if (condition.type)
					conditionArray.push(`"${condition.column}" ${condition.type} (${condition.values.join(',')}) `);
				else
					conditionArray.push(`"${condition.column}" = '${condition.values[0]}' `);
			});
		}
		if (conditionArray.length)
			conditionString += `where ${conditionArray.join('and')} `;

		if (order?.column) {
			conditionString += `order by ${order.column} ${order.atr} `;
		}
		
		if (conditionString.length)
			query += `${conditionString}`;

		if (offset)
			query += `OFFSET ${offset} `;

		if (limit)
			query += `LIMIT ${limit}`;

		query += ';';

		return query;
	}

	_getDeleteQuery(options) {
		const { conditions } = this._evaluateOptions(options);
		let conditionString = [];
		let query = `Delete from ${this.model} `;
		if (conditions?.length) {
			conditions.forEach((condition) => {
				if (condition.type)
					conditionString.push(`"${condition.column}" ${condition.type} (${condition.values.join(',')}) `);
				else
					conditionString.push(`"${condition.column}" = '${condition.values[0]}' `);
			});
		}
		if (conditionString.length)
			query += `where ${conditionString.join('and')}`;

		query += ';';

		return query;
	}

	async _delete(options) {
		const query = this._getDeleteQuery(options);
		const result = await this._runQuery(query);
		return result;
	}

}