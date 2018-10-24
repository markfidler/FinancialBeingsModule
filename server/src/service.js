'use strict';

/**
 * @module service.js
 * @param {Object} employee - The employee who is responsible for the project.
 * @param {string} employee.name - The name of the employee.
 * @param {string} employee.department - The employee's department.
 */

const _ = require('lodash');
const {logger} = require('./utils');
const {GraphQLError} = require('graphql');
const BEINGS_FRAGMENT = require('./db/graphql/BeingsFragment');
const {getTeamByID, getAllTeams} = require('./gateways/teams');

/**
 * Check ownership.
 * @param {Object!} owner - The employee who is responsible for the project.
 * @param {String!} financialBeingID - The name of the employee.
 * @param {Object!} ctx
 */
async function checkOwnership(owner, financialBeingID, ctx) {
  try {
    const financialBeing = await ctx.db.query.financialBeings({where: {id: financialBeingID}}, BEINGS_FRAGMENT);
    
    if (!financialBeing[0].team) {
      throw new GraphQLError('Something went wrong while getting team');
    }
    
    // TODO@Urk: change this when Teams API starts to function
    // const team = await getTeamByID(financialBeing[0].team);
    let team = await getAllTeams();
    
    team = _.filter(team.teams.edges, e => {
      return e.node.id === financialBeing[0].team;
    });
    
    if (!team) {
      throw new GraphQLError('Something went wrong while getting team');
    }
    
    const isSenderOwner = _.filter(team, e => {
      
      // TODO@Urk: change this when Teams API starts to function
      return e.node.owner.split('|')[1] === owner;
    });
    
    if (!isSenderOwner) {
      throw new GraphQLError('Unauthorized');
    }
    
    return financialBeing[0];
  } catch (e) {
    if (e.__proto__.name !== 'GraphQLError') {
      logger.log({level: 'error', message: e.message});
      
      throw new GraphQLError('Something went wrong while getting Financial Beings');
    }
    
    throw e;
  }
}

module.exports = {
  checkOwnership: checkOwnership
};
