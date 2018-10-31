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
const BEINGS_FRAGMENT = require('./db/BeingsFragment');
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
    
    return isSenderOwner[0].node;
    
  } catch (e) {
    if (e.__proto__.name !== 'GraphQLError') {
      logger.log({level: 'error', message: e.message});
      
      throw new GraphQLError('Something went wrong while getting Financial Beings');
    }
    
    throw e;
  }
}

async function checkFinancialBeingOwnership(messageSender, financialBeingID, ctx) {
  try {
    const financialBeing = await ctx.db.query.financialBeings({where: {id: financialBeingID}}, BEINGS_FRAGMENT);
    
    if (financialBeing.length < 1) {
      return false;
    }
    
    if (financialBeing[0].creator === messageSender) {
      return financialBeing[0];
    }
    
  } catch (e) {
    logger.log({level: 'error', message: e.message});
    throw new GraphQLError('Something went wrong while getting Financial Beings');
  }
}

async function checkTeamOwnership(messageSender, teamID) {
  
  try {
    // TODO@Urk: change this when Teams API starts to function
    // const team = await getTeamByID(financialBeing[0].team);
    let team = await getAllTeams();
    
    team = _.filter(team.teams.edges, e => {
      return e.node.id === teamID;
    });
    
    if (!team) {
      throw new GraphQLError('Something went wrong while getting team');
    }
    
    const isSenderOwner = _.filter(team[0].node.members, e => {
      if (e.role === 'OWNER') {
        return e.member.authId.split('|')[1] === messageSender;
      }
    });
    
    if (isSenderOwner < 1 || !isSenderOwner) {
      return false;
    }
    
    return team[0].node;
  } catch (e) {
    logger.log({level: 'error', message: e.message});
    throw new GraphQLError('Something went wrong while getting Financial Beings');
  }
}

async function checkTeamMembership(memberToCheck, teamID) {
  try {
    let team = await getAllTeams();
    
    team = _.filter(team.teams.edges, e => {
      return e.node.id === teamID;
    });
    
    if (!team) {
      throw new GraphQLError('Something went wrong while getting team');
    }
    
    const isMember = _.filter(team[0].node.members, e => {
      return e.member.authId.split('|')[1] === memberToCheck;
    });
    
    if (isMember < 1 || !isMember) {
      return false;
    }
    
    return isMember;
  } catch (e) {
    logger.log('error', e);
    throw new GraphQLError('Unauthorized');
  }
}

function removeFalseyValues(object) {
  for (const key in object) {
    if (object.hasOwnProperty(key) && !object[key]) delete object[key];
  }
  return object;
}

module.exports = {
  checkOwnership: checkOwnership,
  removeFalseyValues: removeFalseyValues,
  checkTeamOwnership: checkTeamOwnership,
  checkFinancialBeingOwnership: checkFinancialBeingOwnership,
  checkTeamMembership: checkTeamMembership
};
