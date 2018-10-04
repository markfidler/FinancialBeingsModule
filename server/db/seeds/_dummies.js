'use strict';

/**
 * Assign the project to an employee.
 * @param {object} knex - Knex object.
 * @return {boolean} true
 */
async function seed(knex) {
  try {
    await knex('dummy').del();
    await knex('dummy').insert({
      'name': 'ookie'
    });
    return true;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  seed: seed
};
