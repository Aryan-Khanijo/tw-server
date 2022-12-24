/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createView('following_view', (view) => {
		view.columns(['user_id', 'following']);
		view.as(knex.raw('select follower_id, array_agg(followed_id) followers from relations group by follower_id;'))
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists('following_view');
};
