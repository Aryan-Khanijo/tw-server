/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createView('followers_view', (view) => {
		view.columns(['user_id', 'followers']);
		view.as(knex.raw('select followed_id, array_agg(follower_id) followers from relations group by followed_id;'))
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropViewIfExists('followers_view');
};
