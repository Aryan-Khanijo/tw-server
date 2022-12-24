'use strict';

/**
 * @description Tweet model
 * @param {string} content
 * @param {number} user_id
 * @returns {object} tweetModel
 */
const tweetModel = (content, user_id) => {
	return {
		content,
		user_id
	};
}

module.exports = {
	tweetModel
};