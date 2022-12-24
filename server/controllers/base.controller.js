'use strict';
const { httpResponse } = require('../utils/httpRes');

module.exports = class BaseController {

	constructor(service, model, table) {
		this.service = new service();
		this.model = model;
		this.table = table;
	}

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
			const result = await this.service.getSingleFromView(column, id);
			return result;
		} catch (err) {
			console.log(err);
		}
	}

	async getAllView(column, id) {
		try {
			const result = await this.service.getAllFromView(column, id);
			return result;
		} catch (err) {
			console.log(err);
		}
	}

	async delete(data) {
		try {
			const result = await this.service.delete(data);
			return result;
		} catch (err) {
			console.log(err);
		}
	}


	httpResponse(res, status, message, data) {
		return httpResponse(res, status, message, data);
	}

}