'use strict';
require('dotenv').config();

const {makeExecutableSchema} = require('graphql-tools');
const {importSchema} = require('graphql-import');
const {GraphQLError} = require('graphql');

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
     * Query function - get financial beings by type
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
     * Query function - get financial being by
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
      const data = await ctx.db.mutation.createFinancialBeing({
        data: {
          type: 'BOT',
          kind: 'TRADER',
          name: 'function',
          slug: 'function',
          team: {
            connect: {
              id: 'cjnbq5wl6001i0b39qs1v7ea6'
            }
          },
          parent: {
            connect: {
              id: 'cjnbq6ynb001s0b398i9rnwvk'
            }
          }
        }
      }, BEINGS_FRAGMENT);
      return data;
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
