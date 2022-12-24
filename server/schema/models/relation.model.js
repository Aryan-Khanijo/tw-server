'use strict';

const relation = (follower_id, followed_id) => {
	return {
		follower_id,
		followed_id
	};
}

module.exports = {
	relation
};