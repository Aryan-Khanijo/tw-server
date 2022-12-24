'use strict';

/**
 * @description Relation model
 * @param {*} follower_id 
 * @param {*} followed_id 
 * @returns {object} relationModel
 */
const relationModel = (follower_id, followed_id) => {
	return {
		follower_id,
		followed_id
	};
}

module.exports = {
	relationModel
};