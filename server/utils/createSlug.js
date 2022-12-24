const { v4: uuidv4 } = require('uuid');

const getSlug = (name) => {
	let slug = name.toLowerCase().replace(/ /g, '-');
	slug += `-${uuidv4().slice(0, 5)}`;
	return slug;
};

module.exports = { getSlug };