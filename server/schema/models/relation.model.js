'use strict';

const relation = (user_id, followed_id) =>{
	return {
		user_id,
		followed_id
	};
}

module.exports = {
	relation
};