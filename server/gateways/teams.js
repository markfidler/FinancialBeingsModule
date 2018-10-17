'use strict';

const graphql = require('graphql-request');

const AATeamsModule = process.env.AA_TEAMS_MODULE;

const client = new graphql.GraphQLClient(AATeamsModule, {
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
    query teamsQuery {
      teams {
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
* @param {string} authId - Authorization id of the owner
* @param {string} token - JWT Token
* @return {object} Team module information
* @error {object} Error
*/
async function getTeamByOwnerId(authId, token) {
  try {
    client.options.headers = {
      Authorization: token
    };

    const query = `
    query {
      teamsByOwner(ownerId: ${authId}) {
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
    throw new Error('Getting team by owner id failed');
  }
}

/**
* Get team by name from Team Module
* NOTE: Needs authorization
* @param {string} token - JWT Token
* @return {object} Team module information
* @error {object} Error
*/
async function getCurrentmember(token) {
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
  } catch (err) {
    console.log(err);
    throw new Error('Getting current member failed');
  }
}

module.exports = {
  getAllTeams: getAllTeams,
  getTeamByName: getTeamByName,
  getTeamByOwnerId: getTeamByOwnerId,
  getCurrentmember: getCurrentmember
};
