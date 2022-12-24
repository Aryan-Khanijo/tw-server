'use strict';
const { httpResponse } = require('../utils/httpRes');

module.exports = class BaseController {

	/**
	 * @description Creates an instance of BaseController.
	 * @param {Object} service
	 * @param {Object} model
	 * @param {String} table
	 * @memberof BaseController
	 * @constructor
	 */
	constructor(service, model, table) {
		this.service = new service();
		this.model = model;
		this.table = table;
	}

	/**
	 * 
	 * @description This function is to validate the request
	 * @param {*} req
	 * @param {*} res
	 * @returns {Boolean}
	 * @memberof BaseController
	 *
	 */

	_validateRequest(req, res) {
		const reqId = req.user.user_id;
		if (!reqId) {
			this.httpResponse(res, 400, 'error', 'User id is required');
			return false
		}
		if (isNaN(parseInt(reqId)) || reqId === '0') {
			this.httpResponse(res, 400, 'error', 'User id must be a valid number');
			return false
		}

		return true;
	}

	/**
	 * @description This function is to get single records from the database
	 * @param {*} req
	 * @param {*} res
	 * @returns {Array}
	 * @memberof BaseController
	 * @async
	 * 
	 */
	async getSingle(options) {
		try {
			return await this.service.getSingle(options);
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * @description This function is to get all records from the database
	 * @param {*} options
	 * @returns {Array}
	 * @memberof BaseController
	 * @async
	 */
	async getAll(options) {
		try {
			const result = await this.service.getAll(options);
			return result;
		} catch (err) {
			console.log(err);
		}
	}


	/**
	 * @description This function is to get all records from the database
	 * @param {*} req
	 * @param {*} res
	 * @returns {Array}
	 * @memberof BaseController
	 * @async
	 * 
	 */
	async create(data) {
		try {
			const result = await this.service._create(data);
			return result;
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * @description This function is to get all records from the database
	 * @param {*} column
	 * @param {*} id
	 * @returns {Object}
	 * @async
	 */
	async getSingleView(column, id) {
		try {
			const options = {
				conditions: [
					{'column': column, 'values': [user.id]}
				]
			}
			const result = await this.service.getSingleFromView(options);
			return result;
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * @description This function is to get all records from the database
	 * @param {*} column
	 * @param {*} id
	 * @returns {Array}
	 * @async
	 */

	async getAllView(column, id) {
		try {
			const result = await this.service.getAllFromView(column, id);
			return result;
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * 
	 * @description This function is to delete record from the database
	 * @param {*} data
	 * @returns {Array}
	 * 
	 */
	async delete(data) {
		try {
			const result = await this.service.delete(data);
			return result;
		} catch (err) {
			console.log(err);
		}
	}


	/**
	 * @description This function calls httpResponse Utility
	 * @param {*} res
	 * @param {*} status
	 * @param {*} message
	 * @param {*} data
	 * @returns {Object}
	 * @memberof BaseController
	 */
	httpResponse(res, status, message, data) {
		return httpResponse(res, status, message, data);
	}

}