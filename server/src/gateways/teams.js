'use strict';

const graphql = require('graphql-request');
const {GraphQLError} = require('graphql');
const {logger} = require('../utils');


const client = new graphql.GraphQLClient(process.env.GRAPHQL_API_URL, {
  headers: {}
});

/**
 * Get all teams from Teams Module
 * @return {object} Team module information
 * @error {object} Error
 */
async function getAllTeams() {
  try {
    const query = `
    query getAllTeams {
      teams_Teams {
        edges {
          node {
            id
            name
            slug
            owner
            status {
              status
              reason
              createdAt
            }
            createdAt
            profile {
              avatar
              banner
              description
              motto
              updatedAt
            }
            members {
              role
              email
              member {
                alias
                authId
              }
              status {
                id
                status
                reason
                createdAt
              }
            }
            fb {
              id
              name
              slug
              avatar
              kind
              status {
                status
                reason
                createdAt
              }
            }
          }
        }
      }
    }`;
    
    return await client.request(query);
  } catch (err) {
    throw new Error('Getting all teams failed');
  }
}

/**
 * Get team by name from Team Module
 * @param {string} teamName - Name of the team
 * @return {object} Team module information
 * @error {object} Error
 */
async function getTeamByName(teamName) {
  try {
    const query = `
    query {
      teamByName(name: ${teamName}) {
      name
      }
    }
    `;
    
    return await client.request(query);
  } catch (err) {
    throw new Error('');
  }
}

/**
 * Get team by name from Team Module
 * NOTE: Needs authorization
 * @param {string} ownerId - Authorization id of the owner
 * @param {string} token - JWT Token
 * @return {object} Team module information
 * @error {object} Error
 */
async function getTeamByOwnerId(ownerId, token) {
  try {
    client.options.headers = {
      Authorization: token
    };
    
    const query = `
    query {
      teamsByOwner(ownerId: "${ownerId}") {
        id
        name
        slug
        owner
        status {
          status
          reason
          createdAt
        }
        createdAt
        profile {
          avatar
          banner
          description
          motto
          updatedAt
        }
        members {
          role
          email
          member {
            alias
            authId
          }
          status {
            id
            status
            reason
            createdAt
          }
        }
        fb {
          id
          name
          slug
          avatar
          kind
          status {
            status
            reason
            createdAt
          }
        }
      }
    }
    `;
    
    return await client.request(query);
  } catch (err) {
    throw new GraphQLError('Getting team by owner id failed');
  }
}

/**
 * Get team by name from Team Module
 * NOTE: Needs authorization
 * @param {string} token - JWT Token
 * @return {object} Team module information
 * @error {object} Error
 */
async function getCurrentMember(token) {
  try {
    client.options.headers = {
      Authorization: token
    };
    
    const query = `
      query {
        currentMember {
          id
          alias
        }
      }
    `;
    
    return await client.request(query);
  } catch (e) {
    logger.error(`Error Occurred: ${e.message} | On: ${new Date().toISOString()}`);
    throw new GraphQLError('Getting current member failed');
  }
}

async function getTeamById(teamId) {
  try {
    client.options.headers = {
      Authorization: `Bearer ${process.env.TOKEN}`
    };
    
    const query = `
    query {
      teamById(teamId: "${teamId}") {
        id
        name
        slug
        owner
        status {
          status
          reason
          createdAt
        }
      }
    }
    `;
    
    return await client.request(query);
  } catch (e) {
    throw new GraphQLError('Error occurred while getting Team');
  }
}

module.exports = {
  getAllTeams: getAllTeams,
  getTeamByName: getTeamByName,
  getTeamByOwnerId: getTeamByOwnerId,
  getCurrentMember: getCurrentMember,
  getTeamById: getTeamById
};
