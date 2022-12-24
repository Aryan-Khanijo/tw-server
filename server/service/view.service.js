'use strict';
const DbService = require('./db.service');

module.exports = class ViewService extends DbService {

	constructor(model, view) {
		super(model);
		this.views = view;
	}


	async getSingleFromView(column, id) {
		try {
			const query = `SELECT * FROM ${this.views} WHERE ${column} = ${id} LIMIT 1`;
			const result = await this._runQuery(query);
			return result[0];
		} catch (err) {
			console.log(err);
		}
	}

	async getAllFromView(column, id) {
		try {
			const query = `SELECT * FROM ${this.views} WHERE ${column} = ${id}`;
			const result = await this._runQuery(query);
			return result;
		} catch (err) {
			console.log(err);
		}
	}

}
