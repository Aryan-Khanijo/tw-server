'use strict';

const { getSlug } = require('../../utils/createSlug');

/**
 * @description User model
 * @param {string} name
 * @param {string} username
 * @param {string} password
 * @param {boolean} isAdmin
 * @returns {object} UserModel
 */
const UserModel = (name, username, password, isAdmin = false) => {
	const slug = getSlug(name);
	return {
		name,
		username,
		password,
		slug,
		isAdmin
	};
}

module.exports = { UserModel };