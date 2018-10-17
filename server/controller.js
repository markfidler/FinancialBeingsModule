'use strict';
require('dotenv').config();

const {makeExecutableSchema} = require('graphql-tools');
const {importSchema} = require('graphql-import');
const {GraphQLError} = require('graphql');
const _ = require('lodash');

const {logger} = require('./utils');

const {
  getTeamByID,
  getTeamByOwnerId
} = require('./gateways/teams');

const TEAMS_CONNECTIONS_FRAGMENT = require('./db/graphql/TeamsConnectionsFragment');
const BEINGS_CONNECTIONS_FRAGMENT = require('./db/graphql/BeingsConnectionsFragment');
const TEAMS_FRAGMENT = require('./db/graphql/TeamsFragment');
const BEINGS_FRAGMENT = require('./db/graphql/BeingsFragment');

const resolvers = {
  Query: {
    async teams(parent, args, ctx, info) {
      try {
        
        return await ctx.db.query.teams({}, TEAMS_FRAGMENT, ctx);
      } catch (e) {
        if (e.__proto__.name !== 'GraphQLError') {
          logger.log({level: 'error', message: e.message});
          throw new GraphQLError('Something went wrong while getting Financial Beings');
        }
        
        throw e;
      }
    },
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
    // async financialBeingsByTeamID(parent, {team}, ctx, info) {
    //   let data =  await ctx.db.query.financialBeings({where: {team: team}}, BEINGS_FRAGMENT);
    //   return data;
    // },
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
    async createFinancialBeing(parent, args, ctx, info) {
      
      try {
        // We can extract the caller ID from JWT
        const caller = ctx.jwt.sub.split('|')[1];
        
        // TODO@Urk: we are creating a mechanism to extract data from token
        // That means we need to verify the JWT, since we can't just add FB
        // without properly checking the user first (and its access rights)
        // For now, we'll just use the data from which we received from JWT
        let teamFinancialBeing = await getTeamByOwnerId(caller, ctx.req.cookies['Authorization']);
        
        teamFinancialBeing = _.filter(teamFinancialBeing.teamsByOwner, e => {
          return e.owner === caller;
        });
        
        if (teamFinancialBeing.length < 1) {
          logger.log({level: 'error', message: 'Provided team doesn\'t exist!'});
          throw new GraphQLError('Provided team doesn\'t exist!');
        }
        
        const parentFinancialBeing = await resolvers.Query.financialBeingsByID(parent, {id: args.parentID}, ctx, info);
        
        if (parentFinancialBeing.length < 1) {
          logger.log({level: 'error', message: 'Invalid Financial Being parent'});
          throw new GraphQLError('Invalid Financial Being parent');
        }
        
        return await ctx.db.mutation.createFinancialBeing({
          data: {
            type: args.type,
            kind: args.kind,
            name: args.name,
            slug: args.slug,
            owner: caller,
            team: {
              connect: {
                id: teamFinancialBeing.id
              }
            },
            parent: {
              connect: {
                id: parentFinancialBeing.id
              }
            }
          }
        }, BEINGS_FRAGMENT);
      } catch (e) {
        if (e.__proto__.name !== 'GraphQLError') {
          logger.log({level: 'error', message: e.message});
          throw new GraphQLError('Something went wrong while creating financial being!');
        }
        
        throw e;
      }
    }
  }
};

const schema = makeExecutableSchema({
  typeDefs: importSchema('./server/schema.graphql'),
  resolvers
});

module.exports = {
  schema: schema
};
