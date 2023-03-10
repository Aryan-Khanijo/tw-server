// Update with your config settings.
require('dotenv').config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    client: 'pg',
    connection: {
    	host: process.env.DB_HOST,
    	port: process.env.DB_PORT,
    	database: process.env.DB_NAME,
    	user: process.env.DB_USER,
    	password: process.env.DB_PASS
    },
    pool: {
    	min: 2,
    	max: 10
    },
    migrations: {
    	tableName: 'knex_migrations',
    	directory: __dirname + '/server/schema/migrations',
    },
    seeds: {
    	directory: __dirname + '/server/schema/seeds'
    }
};
