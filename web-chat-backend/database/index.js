const connection = require('../knexfile');

const knex = require('knex')(connection.development);

module.exports = knex;