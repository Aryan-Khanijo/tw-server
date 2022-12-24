'use strict';

const relationModel = (follower_id, followed_id) => {
	return {
		follower_id,
		followed_id
	};
}

module.exports = {
	relationModel
};