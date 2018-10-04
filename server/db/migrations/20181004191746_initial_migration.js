'use strict';

/**
 * Migrates the database.
 * @param {object} knex - Knex database connection object.
 * @return {boolean} true - returns true if successful, otherwise throws.
 */
async function up(knex) {
  try {
    await createTable(knex);
    return true;
  } catch (err) {
    // TODO@Urk: rollback?
    throw err;
  }
}

/**
 * Rolls back migration.
 * @param {object} knex | Knex .
 * @return {boolean} true - returns true if successful, otherwise throws.
 */
async function down(knex) {
  try {
    await knex.schema.dropTable('dummy');
    
    return true;
  } catch (err) {
    // TODO@Urk: rollback?
    throw err;
  }
}

/**
 * Creates dummy table.
 * @param {object} knex - Knex database connection object.
 * @return {object} The result of created table in Knex.js.
 */
async function createTable(knex) {
  return await knex.schema.withSchema('public').
    createTable('dummy', dummy => {
      dummy.increments('id_dummy').primary();
      dummy.string('name', 35).notNullable();
    });
}

module.exports = {
  up: up,
  down: down
};
