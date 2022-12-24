/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createViewOrReplace('user_info_view', (view) => {
		view.columns(['user_id', 'username', 'followers', 'following']);
		view.as(knex.raw('select users.id, users.name, users.username, ARRAY_LENGTH(followers_view.followers, 1), ARRAY_LENGTH(following_view.following, 1), users.slug from users left join followers_view on users.id = followers_view.user_id left join following_view on users.id = following_view.user_id;'))
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropViewIfExists('user_info_view');
};
