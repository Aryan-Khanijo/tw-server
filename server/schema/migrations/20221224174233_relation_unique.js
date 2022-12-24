/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.alterTable('relations', (table) => {
		table.unique(['follower_id', 'followed_id']);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.alterTable('relations', (table) => {
		table.dropUnique(['follower_id', 'followed_id']);
	});
};
