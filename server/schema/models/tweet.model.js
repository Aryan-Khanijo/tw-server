'use strict';

const tweetModel = (content, user_id) => {
	return {
		content,
		user_id
	};
}

module.exports = {
	tweetModel
};