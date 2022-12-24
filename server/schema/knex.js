'use strict';
/**
 * @description Importind Knex configuration
 */
const config = require('../../knexfile');
module.exports = require('knex')(config);