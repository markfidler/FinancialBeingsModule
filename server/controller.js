'use strict';
require('dotenv').config();

const {makeExecutableSchema} = require('graphql-tools');
const {importSchema} = require('graphql-import');
const {GraphQLError} = require('graphql');

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
      return await ctx.db.query.teams({}, TEAMS_FRAGMENT, ctx);
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
      return await ctx.db.query.financialBeings({}, BEINGS_FRAGMENT);
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
      return await ctx.db.query.financialBeings({where: {name: name}}, BEINGS_FRAGMENT);
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
      return await ctx.db.query.financialBeings({where: {id: id}}, BEINGS_FRAGMENT);
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
      return await ctx.db.query.financialBeings({where: {type: type}}, BEINGS_FRAGMENT);
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
      return await ctx.db.query.financialBeings({where: {kind: kind}}, BEINGS_FRAGMENT);
    }
  },
  Mutation: {
    async createFinancialBeing(parent, args, ctx, info) {
      
      try {
        const parentFinancialBeing = await resolvers.Query.financialBeingsByID(parent, {id: args.parentID}, ctx, info);
        
        if (parentFinancialBeing.length < 1) {
          throw new GraphQLError('Invalid Financial Being parent');
        }
        
        const caller = ctx.jwt.sub.split('|')[1];
        
        // TODO@Urk: we are creating a mechanism to extract data from token
        // That means we need to verify the JWT, since we can't just add FB
        // without properly checking the user first (and its access rights)
        // For now, we'll just use the data from which we received from JWT
        const teamFinancialBeing = await getTeamByOwnerId(caller, ctx.req.cookies['Authorization']);
        
        if (teamFinancialBeing.length < 1) {
          throw new GraphQLError('Team doesn\'t exist! Please, create team first.');
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
                id: teamFinancialBeing[0].id
              }
            },
            parent: {
              connect: {
                id: parentFinancialBeing[0].id
              }
            }
          }
        }, BEINGS_FRAGMENT);
      } catch (e) {
        logger.error(e.message);
        throw new GraphQLError('Something went wrong while creating financial being!');
      }
    }
    
    
    // Author: {
    //   async posts(parent, arg, ctx, info) {
    //     return await authorPostsResolver(parent);
    //   }
    // },
    // Post: {
    //   async author(parent, arg, ctx, info) {
    //     return await postsAuthorResolver(parent);
    //   }
    // }
  }
};

const schema = makeExecutableSchema({
  typeDefs: importSchema('./server/schema.graphql'),
  resolvers
});

module.exports = {
  schema: schema
};
