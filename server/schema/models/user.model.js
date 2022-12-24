'use strict';

const { getSlug } = require('../../utils/createSlug');

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