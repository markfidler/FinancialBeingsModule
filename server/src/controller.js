'use strict';
require('dotenv').config();

const _ = require('lodash');
const {GraphQLError} = require('graphql');
const {importSchema} = require('graphql-import');
const {makeExecutableSchema} = require('graphql-tools');

const {logger} = require('./utils');
const {getTeamByOwnerId, getTeamByID, getAllTeams} = require('./gateways/teams');

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
     * Mutation function - try to create financial being
     * @param {Object} parent - The result of the previous resolver fn execution
     * @param {Object} args - Object with all data needed for function execution
     * @param {String!} args.name: Name of the financial being we want to create
     * @param {String!} args.slug: Slug of the financial being we want to create
     * @param {Enumerator!} args.type: Financial being type (see ./db/datamodel)
     * @param {Enumerator!} args.kind: Financial being kind (see ./db/datamodel)
     * @param {String!} args.parentID: ID of the parent financial being (forked)
     * @param {String!} args.teamID: ID of owning team (financial being creator)
     * @param {Object} ctx - context
     * @param {Object} ctx.db - db object on provided context with closure functions to talk with Prisma DB interface
     * @param {Object} ctx.req - HTTP request object
     * @param {Object} info - query AST and more execution information
     * @return {Object} GraphQL Query response - BEINGS_FRAGMENT is the template
     */
    async createFinancialBeing(parent, args, ctx, info) {
      try {
        const owner = ctx.userid;
        
        // That means we need to verify the JWT, since we can't just add FB
        // without properly checking the user first (and its access rights)
        // For now, we'll just use the data from which we received from JWT
        
        const data = {
          type: args.type,
          kind: args.kind,
          name: args.name,
          slug: args.slug,
          owner: owner,
          admins: [
            owner
          ]
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
          
          // obligatory check to see if we perhaps have a bug here
          if (allTeams.length > 1) {
            logger.log({
              level: 'error',
              message: 'Ok, so we do have a bug here. Check to see why we have more than one teamIDs'
            });
            
            throw new GraphQLError('Something went wrong while creating team!');
          }
          
          allTeams = allTeams[0];
          
          data.team = {
            connect: {
              id: allTeams.node.id
            }
          };
        }
        
        if (args.parentID) {
          const parentFinancialBeing = await resolvers.Query.financialBeingsByID(parent, {id: args.parentID}, ctx,
            info);
          
          if (parentFinancialBeing.length < 1) {
            logger.log({level: 'warn', message: 'Invalid Financial Being parent'});
            throw new GraphQLError('Invalid Financial Being parent');
          }
          
          data.parent = {
            connect: {
              id: parentFinancialBeing.id
            }
          };
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
