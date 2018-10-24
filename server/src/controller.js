'use strict';

/**
 * Controller module
 * @module src/controller
 */

require('dotenv').config();


// External modules
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const {GraphQLError} = require('graphql');
const {importSchema} = require('graphql-import');
const {makeExecutableSchema} = require('graphql-tools');
const slugify = require('slugify');

// Internal modules
const {logger} = require('./utils');
const {checkOwnership} = require('./service');
const {getAllTeams} = require('./gateways/teams');
const BEINGS_FRAGMENT = require('./db/graphql/BeingsFragment');


const resolvers = {
  Query: {
    /**
     * Query function - get all financial beings
     * @param {Object} parent - The result of the previous resolver call.
     * @param {string} args - arguments which we don't use in this function.
     * @param {Object} ctx - context
     * @param {Object} ctx.db - db object on provided context with closure functions to talk with Prisma DB interface
     * @param {Object} ctx.req - HTTP request object
     * @param {Object} info - query AST and more execution information
     * @return {Object} GraphQL Query response - BEINGS_FRAGMENT is the template
     */
    async financialBeings(parent, args, ctx, info) {
      try {
        
        return await ctx.db.query.financialBeings({}, BEINGS_FRAGMENT);
      } catch (e) {
        if (e.__proto__.name !== 'GraphQLError') {
          logger.log({level: 'error', message: e.message});
          
          throw new GraphQLError('Something went wrong while getting Financial Beings');
        }
        
        throw e;
      }
    },
    /**
     * Query function - get financial being by name
     * @param {Object} parent - The result of the previous resolver call.
     * @param {string} kind - Necessary parameter which serves as a filter.
     * @param {Object} ctx - context
     * @param {Object} ctx.db - db object on provided context with closure functions to talk with Prisma DB interface
     * @param {Object} ctx.req - HTTP request object
     * @param {Object} info - query AST and more execution information
     * @return {Object} GraphQL Query response - BEINGS_FRAGMENT is the template
     */
    async financialBeingsByName(parent, {name}, ctx, info) {
      try {
        
        return await ctx.db.query.financialBeings({where: {name: name}}, BEINGS_FRAGMENT);
      } catch (e) {
        if (e.__proto__.name !== 'GraphQLError') {
          logger.log({level: 'error', message: e.message});
          
          throw new GraphQLError('Something went wrong while getting Financial Beings');
        }
        
        throw e;
      }
    },
    /**
     * Query function - get financial beings by ID
     * @param {Object} parent - The result of the previous resolver call.
     * @param {string} name - Necessary parameter which serves as a filter.
     * @param {Object} ctx - context
     * @param {Object} ctx.db - db object on provided context with closure functions to talk with Prisma DB interface
     * @param {Object} ctx.req - HTTP request object
     * @param {Object} info - query AST and more execution information
     * @return {Object} GraphQL Query response - BEINGS_FRAGMENT is the template
     */
    async financialBeingsByID(parent, {id}, ctx, info) {
      try {
        
        return await ctx.db.query.financialBeings({where: {id: id}}, BEINGS_FRAGMENT);
      } catch (e) {
        if (e.__proto__.name !== 'GraphQLError') {
          logger.log({level: 'error', message: e.message});
          
          throw new GraphQLError('Something went wrong while getting Financial Beings');
        }
        
        throw e;
      }
    },
    async financialBeingsByTeamID(parent, {team}, ctx, info) {
      try {
        
        return await ctx.db.query.financialBeings({where: {team: team}}, BEINGS_FRAGMENT);
      } catch (e) {
        if (e.__proto__.name !== 'GraphQLError') {
          logger.log({level: 'error', message: e.message});
          
          throw new GraphQLError('Something went wrong while getting Financial Beings');
        }
        
        throw e;
      }
    },
    /**
     * Query function - get financial beings by type
     * @param {Object} parent - The result of the previous resolver call.
     * @param {string} type - Necessary parameter which serves as a filter.
     * @param {Object} ctx - context
     * @param {Object} ctx.db - db object on provided context with closure functions to talk with Prisma DB interface
     * @param {Object} ctx.req - HTTP request object
     * @param {Object} info - query AST and more execution information
     * @return {Object} GraphQL Query response - BEINGS_FRAGMENT is the template
     */
    async financialBeingsByType(parent, {type}, ctx, info) {
      try {
        
        return await ctx.db.query.financialBeings({where: {type: type}}, BEINGS_FRAGMENT);
      } catch (e) {
        if (e.__proto__.name !== 'GraphQLError') {
          logger.log({level: 'error', message: e.message});
          
          throw new GraphQLError('Something went wrong while getting Financial Beings');
        }
        
        throw e;
      }
    },
    /**
     * Query function - get financial being by kind
     * @param {Object} parent - The result of the previous resolver call.
     * @param {string} kind - Necessary parameter which serves as a filter.
     * @param {Object} ctx - context
     * @param {Object} ctx.db - db object on provided context with closure functions to talk with Prisma DB interface
     * @param {Object} ctx.req - HTTP request object
     * @param {Object} info - query AST and more execution information
     * @return {Object} GraphQL Query response - BEINGS_FRAGMENT is the template
     */
    async financialBeingsByKind(parent, {kind}, ctx, info) {
      try {
        
        return await ctx.db.query.financialBeings({where: {kind: kind}}, BEINGS_FRAGMENT);
      } catch (e) {
        if (e.__proto__.name !== 'GraphQLError') {
          logger.log({level: 'error', message: e.message});
          
          throw new GraphQLError('Something went wrong while getting Financial Beings');
        }
        
        throw e;
      }
    }
  },
  Mutation: {
    /**
     * Mutation function - try to create Financial Being
     *
     * @param {Object} parent - Returned result from previous functions execution
     *
     * @param {Object!} args - GraphQL parameters required for function execution
     * @param {Enumerator!} args.type - Financial being type (see ./db/datamodel)
     * @param {Enumerator!} args.kind - Financial being kind (see ./db/datamodel)
     * @param {String!} args.name - Name of the financial being we want to create
     * @param {String!} args.slug - Slug of the financial being we want to create
     * @param {String} args.avatar - Image URL used for avatar of financial being
     * @param {String!} args.teamID - ID of owning team (financial being creator)
     * @param {Object!} args.status - Status of the FBeing (defaults to inactive)
     * @param {String} args.parent - Financial Being this being was forked out of
     *
     * @param {Object!} ctx - Function execution context enriched with new params
     * @param {Object} ctx.db - DB ob with closure functions for Prisma interface
     * @param {Object} ctx.req - HTTPS request object passed from the API gateway
     * @param {Object} info - info contains the query AST and more execution info
     *
     * @return {Object!} GraphQL Query response - BEINGS_FRAGMENT is the template
     */
    async createFinancialBeing(parent, args, ctx, info) {
      try {
        // TODO@cordo-van-saviour: change this when API starts working again
        // const owner = ctx.userid;
        let owner = await jwt.decode(ctx.req.cookies['Authorization'].split(' ')[1]);
        owner = owner.sub.split('|')[1];
        
        // That means we need to verify the JWT, since we can't just add FB
        // without properly checking the user first (and its access rights)
        // For now, we'll just use the data from which we received from JWT
        
        const currentTime = Math.floor(Date.now() / 1000);
        
        const data = {
          type: args.type,
          kind: args.kind,
          name: args.name,
          slug: slugify(args.name),
          avatar: args.avatar,
          owner: owner,
          admin: {
            set: owner
          },
          status: {
            create: {
              status: args.status,
              reason: args.reason,
              createdOn: currentTime
            }
          },
          createdOn: currentTime,
          updatedOn: currentTime
        };
        
        
        if (args.teamID) {
          // TODO@cordo-van-saviour: change this when API starts working again
          // let teams = await getTeamByID(args.teamID, ctx.req.cookies['Authorization']);
          let allTeams = await getAllTeams();
          
          allTeams = _.filter(allTeams.teams.edges, e => {
            
            if (e.node.id === args.teamID) {
              
              return _.filter(allTeams.teams.members, e => {
                
                return e.authId.split('|')[1] === owner;
              });
            }
          });
          
          if (allTeams.length < 1) {
            logger.log({level: 'warn', message: 'Provided team doesn\'t exist!'});
            throw new GraphQLError('Provided team doesn\'t exist!');
          }
          
          data.team = allTeams[0].node.id;
        }
        
        if (args.parentID) {
          const parentFinancialBeing = await resolvers.Query.financialBeingsByID(parent, {
            id: args.parentID
          }, ctx, info);
          
          if (parentFinancialBeing.length < 1) {
            logger.log({level: 'warn', message: 'Invalid Financial Being parent'});
            throw new GraphQLError('Invalid Financial Being parent');
          }
          
          data.parent = parentFinancialBeing.id;
        }
        
        // now call the create function
        return await ctx.db.mutation.createFinancialBeing({
          data: data
        }, BEINGS_FRAGMENT);
        
      } catch (e) {
        if (e.__proto__.name !== 'GraphQLError') {
          logger.log({level: 'error', message: e.message});
          throw new GraphQLError('Something went wrong while creating financial being!');
        }
        
        throw e;
      }
    },
    
    /**
     * Mutation function - try to update Financial Being
     *
     * @param {Object} parent - Returned result from previous functions execution
     *
     * @param {Object!} args - GraphQL parameters required for function execution
     * @param {String!} args.id - Identifier of Financial Being we want to update
     * @param {Enumerator!} args.type - Financial being type (see ./db/datamodel)
     * @param {Enumerator!} args.kind - Financial being kind (see ./db/datamodel)
     * @param {String!} args.name - Name of the financial being we want to create
     * @param {String!} args.slug - Slug of the financial being we want to create
     * @param {String} args.avatar - Image URL used for avatar of financial being
     * @param {String!} args.teamID - ID of owning team (financial being creator)
     * @param {Object!} args.status - Status of the FBeing (defaults to inactive)
     * @param {String} args.parent - Financial Being this being was forked out of
     *
     * @param {Object!} ctx - Function execution context enriched with new params
     * @param {Object} ctx.db - DB ob with closure functions for Prisma interface
     * @param {Object} ctx.req - HTTPS request object passed from the API gateway
     * @param {Object} info - info contains the query AST and more execution info
     *
     * @return {Object!} GraphQL Query response - BEINGS_FRAGMENT is the template
     */
    async updateFinancialBeing(parent, args, ctx, info) {
      try {
        
        // const owner = ctx.userid;
        
        let owner = await jwt.decode(ctx.req.cookies['Authorization'].split(' ')[1]);
        owner = owner.sub.split('|')[1];
        
        const returnedFinancialBeing = await checkOwnership(owner, args.id, ctx);
        
        const data = {
          type: args.type | returnedFinancialBeing.type,
          kind: args.kind | returnedFinancialBeing.kind,
          name: args.name | returnedFinancialBeing.name,
          slug: slugify(args.name) | returnedFinancialBeing.slug,
          avatar: args.avatar | returnedFinancialBeing.avatar,
          status: {
            create: {
              status: args.status | returnedFinancialBeing.status.status,
              reason: args.reason | returnedFinancialBeing.status.reason
            }
          },
          updatedAt: Math.floor(Date.now() / 1000),
          owner: owner
        };
        
        if (args.teamID) {
          // TODO@cordo-van-saviour: change this when API starts working again
          // let teams = await getTeamByID(args.teamID, ctx.req.cookies['Authorization']);
          
          let allTeams = await getAllTeams();
          
          allTeams = _.filter(allTeams.teams.edges, e => {
            
            if (e.node.id === args.teamID) {
              
              return _.filter(allTeams.teams.members, e => {
                
                return e.authId.split('|')[1] === owner;
              });
            }
          });
          
          if (allTeams.length < 1) {
            logger.log({level: 'warn', message: 'Provided team doesn\'t exist!'});
            throw new GraphQLError('Provided team doesn\'t exist!');
          }
          
          data.team = allTeams[0].id;
        }
        
        if (args.parentID) {
          const parentFinancialBeing = await resolvers.Query.financialBeingsByID(parent, {
            id: args.parentID
          }, ctx, info);
          
          if (parentFinancialBeing.length < 1) {
            logger.log({level: 'warn', message: 'Invalid Financial Being parent'});
            throw new GraphQLError('Invalid Financial Being parent');
          }
          
          data.parent = parentFinancialBeing.id;
        }
        
        // now call the create function
        return await ctx.db.mutation.createFinancialBeing({
          data: data
        }, BEINGS_FRAGMENT);
        
      } catch (e) {
        if (e.__proto__.name !== 'GraphQLError') {
          logger.log({level: 'error', message: e.message});
          throw new GraphQLError('Something went wrong while creating financial being!');
        }
        
        throw e;
      }
    },
    
    /**
     * Mutation function - try to remove the Financial Being from the team
     *
     * @param {Object} parent - Returned result from previous functions execution
     *
     * @param {Object!} args - GraphQL parameters required for function execution
     * @param {String!} args.id - Identifier of Financial Being we want to remove
     * @param {String!} args.teamId - Identifier of the Team we want to remove FB
     *
     * @param {Object!} ctx - Function execution context enriched with new params
     * @param {Object} ctx.db - DB ob with closure functions for Prisma interface
     * @param {Object} ctx.req - HTTPS request object passed from the API gateway
     * @param {Object} info - info contains the query AST and more execution info
     *
     * @return {Object!} GraphQL Query response - BEINGS_FRAGMENT is the template
     */
    async removeFinancialBeingFromTeam(parent, args, ctx, info) {
      // Only financial being owner can remove it from the team
      // const owner = ctx.userid;
      
      let owner = await jwt.decode(ctx.req.cookies['Authorization'].split(' ')[1]);
      owner = owner.sub.split('|')[1];
      await checkOwnership(owner, args.id, ctx);
      
    },
    
    /**
     * Mutation function - try to add the new Financial Being administrator
     *
     * @param {Object} parent - Returned result from previous functions execution
     *
     * @param {Object!} args - GraphQL parameters required for function execution
     * @param {String!} args.id - Identifier of Financial Being we want to mutate
     * @param {String!} args.adminId - ID of the Admin we want to add to FinBeing
     *
     * @param {Object!} ctx - Function execution context enriched with new params
     * @param {Object} ctx.db - DB ob with closure functions for Prisma interface
     * @param {Object} ctx.req - HTTPS request object passed from the API gateway
     * @param {Object} info - info contains the query AST and more execution info
     *
     * @return {Object!} GraphQL Query response - BEINGS_FRAGMENT is the template
     */
    async addFinancialBeingAdmin(parent, args, ctx, info) {
      // Only financial being owner can add admin to the financial being
      // const owner = ctx.userid;
      
      let owner = await jwt.decode(ctx.req.cookies['Authorization'].split(' ')[1]);
      owner = owner.sub.split('|')[1];
      await checkOwnership(owner, args.id, ctx);
      
    },
    
    /**
     * Mutation function - try to remove one of Financial Being administrators
     *
     * @param {Object} parent - Returned result from previous functions execution
     *
     * @param {Object!} args - GraphQL parameters required for function execution
     * @param {String!} args.id - ID of the FinBeing we want to remove Admin from
     * @param {String!} args.adminId - ID of the Admin we actually want to remove
     *
     * @param {Object!} ctx - Function execution context enriched with new params
     * @param {Object} ctx.db - DB ob with closure functions for Prisma interface
     * @param {Object} ctx.req - HTTPS request object passed from the API gateway
     * @param {Object} info - info contains the query AST and more execution info
     *
     * @return {Object!} GraphQL Query response - BEINGS_FRAGMENT is the template
     */
    async removeFinancialBeingAdmin(parent, args, ctx, info) {
      // Only financial being owner can remove admin from financial being
      // const owner = ctx.userid;
      
      let owner = await jwt.decode(ctx.req.cookies['Authorization'].split(' ')[1]);
      owner = owner.sub.split('|')[1];
      await checkOwnership(owner, args.id, ctx);
      
    }
    
  }
};

const schema = makeExecutableSchema({
  typeDefs: importSchema('./src/schema.graphql'),
  resolvers
});

module.exports = {
  schema: schema
};
