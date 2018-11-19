'use strict';

/**
 * Controller module
 * @module src/controller
 */

require('dotenv').config();


// External modules
const _ = require('lodash');
const gql = require('graphql-tag');
const {GraphQLError} = require('graphql');
const {importSchema} = require('graphql-import');
const {makeExecutableSchema} = require('graphql-tools');

const slugify = require('slugify');

// Internal modules
const {logger} = require('./utils');
const {
  checkTeamOwnership,
  checkTeamMembership,
  checkFinancialBeingOwnership,
  removeFalseyValues
} = require('./service');

const BEINGS_FRAGMENT = require('./db/BeingsFragment');

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
    async financialBeingsByPartialName(parent, {name}, ctx, info) {
      try {
        
        return await ctx.db.query.financialBeings({where: {name_contains: name}}, BEINGS_FRAGMENT);
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
     * @param {String} args.avatar - Image URL used for avatar of financial being
     * @param {String!} args.teamId - ID of owning team (financial being creator)
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
        const messageSender = ctx.__userId;
        
        if (!messageSender) {
          throw new Error('Unauthorized');
        }
        
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
          creator: messageSender,
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
        
        
        if (args.teamId) {
          // TODO@cordo-van-saviour: change this when API starts working again
          // let teams = await getTeamByID(args.teamId, ctx.req.cookies['Authorization']);
          
          const team = await checkTeamMembership(messageSender, args.teamId);
          
          if (!team) {
            throw new GraphQLError('Could not add non-existing team ID');
          }
          
          data.team = args.teamId;
        }
        
        if (args.parent) {
          const parentFinancialBeing = await resolvers.Query.financialBeingsByID(parent, {
            id: args.parent
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
     * @param {String} args.avatar - Image URL used for avatar of financial being
     * @param {String!} args.teamId - ID of owning team (financial being creator)
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
        
        const messageSender = ctx.__userId;
        // let messageSender = await jwt.decode(ctx.req.cookies['Authorization'].split(' ')[1]);
        // messageSender = messageSender.sub.split('|')[1];
        
        await checkFinancialBeingOwnership(messageSender, args.id, ctx);
        
        if (args.slug && !args.name) {
          throw new GraphQLError('Cannot change slug without changing name');
        }
        
        let data = {
          type: args.type,
          kind: args.kind,
          name: args.name,
          slug: slugify(args.name),
          avatar: args.avatar,
          status: {
            create: {
              status: args.status,
              reason: args.reason
            }
          },
          updatedOn: Math.floor(Date.now() / 1000)
        };
        
        // filter out the unnecessary fields
        data.status.create = removeFalseyValues(data.status.create);
        data.status = _.isEmpty(data.status);
        data = removeFalseyValues(data);
        
        
        if (args.parent) {
          const parentFinancialBeing = await resolvers.Query.financialBeingsByID(parent, {
            id: args.parent
          }, ctx, info);
          
          if (parentFinancialBeing.length < 1) {
            logger.log({level: 'warn', message: 'Invalid Financial Being parent'});
            throw new GraphQLError('Invalid Financial Being parent');
          }
          
          data.parent = parentFinancialBeing.id;
        }
        
        // now call the create function
        return await ctx.db.mutation.updateFinancialBeing({
          where: {id: args.id},
          data: data
        }, BEINGS_FRAGMENT);
        
      } catch (e) {
        if (e.__proto__.name !== 'GraphQLError') {
          logger.log({level: 'error', message: e.message});
          throw new GraphQLError('Something went wrong while updating financial being!');
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
      
      try {
        // Only financial being owner can remove it from the team
        const messageSender = ctx.__userId;
        
        const isTeamOwner = await checkTeamOwnership(messageSender, args.teamId, ctx);
        
        if (!isTeamOwner) {
          throw new GraphQLError('Unauthorized');
        }
        
        return await ctx.db.mutation.updateFinancialBeing({
          where: {id: args.id},
          data: {team: ''}
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
     * Mutation function - try to attach the Financial Being to the new team
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
    async addFinancialBeingToTeam(parent, args, ctx, info) {
      
      try {
        // Only financial being owner can remove it from the team
        const messageSender = ctx.__userId;
        
        // let messageSender = await jwt.decode(ctx.req.cookies['Authorization'].split(' ')[1]);
        // messageSender = messageSender.sub.split('|')[1];
        const isTeamMember = await checkTeamMembership(messageSender, args.teamId, ctx);
        
        if (!isTeamMember) {
          throw new GraphQLError('Caller is not a team member');
        }
        
        const isBeingOwner = await checkFinancialBeingOwnership(messageSender, args.id, ctx);
        
        if (!isBeingOwner) {
          throw new GraphQLError('Caller is not a Financial Being owner');
        }
        
        return await ctx.db.mutation.updateFinancialBeing({
          where: {id: args.id},
          data: {team: args.teamId}
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
      
      try {
        // Only financial being owner can add admin to the financial being
        const messageSender = ctx.__userId;
        
        const financialBeing = await checkFinancialBeingOwnership(messageSender, args.id, ctx);
        
        if (!financialBeing) {
          throw new GraphQLError('Sender is not a provided financial being creator');
        }
        
        const adminAlreadyExists = _.filter(financialBeing.admins, e => {
          return e.adminId === args.adminId;
        });
        
        if (adminAlreadyExists.length > 0) {
          throw new GraphQLError('Admin already exists');
        }
        
        const isNewAdminMember = await checkTeamMembership(args.adminId, financialBeing.team);
        
        if (!isNewAdminMember) {
          throw new GraphQLError('Could not add a non-team member to admins list');
        }
        
        return await ctx.db.mutation.updateFinancialBeing({
          where: {id: args.id},
          data: {
            admins: {
              create: {
                adminId: args.adminId,
                financialBeingId: financialBeing.id
              }
            }
          }
        }, BEINGS_FRAGMENT);
        
      } catch (e) {
        if (e.__proto__.name !== 'GraphQLError') {
          logger.log({level: 'error', message: e.message});
          throw new GraphQLError('Something went wrong while adding financial being admin!');
        }
        
        throw e;
      }
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
      try {
        // Only financial being owner can remove admin from financial being
        const messageSender = ctx.__userId;
        
        const financialBeing = await checkFinancialBeingOwnership(messageSender, args.id, ctx);
        
        const adminExists = _.filter(financialBeing.admins, e => {
          return e.adminId === args.adminId;
        });
        
        if (adminExists.length < 1) {
          throw new GraphQLError('Admin doesn\'t exist!');
        }
        
        return await ctx.db.mutation.deleteManyAdmins({
          where: {adminId: args.adminId, financialBeingId: args.id}
        }, gql`{count}`);
        
      } catch (e) {
        
        if (e.__proto__.name !== 'GraphQLError') {
          logger.log({level: 'error', message: e.message});
          throw new GraphQLError('Something went wrong while removing financial being admin!');
        }
        
        throw e;
      }
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
