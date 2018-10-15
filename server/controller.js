'use strict';
require('dotenv').config();

const {makeExecutableSchema} = require('graphql-tools');
const {importSchema} = require('graphql-import');

const TEAMS_CONNECTIONS_FRAGMENT = require('./db/graphql/TeamsConnectionsFragment');
const TEAMS_FRAGMENT = require('./db/graphql/TeamsFragment');
const BEINGS_FRAGMENT = require('./db/graphql/BeingsFragment');


const resolvers = {
  Query: {
    async teams(parent, args, ctx, info) {
      return await ctx.db.query.teams({}, TEAMS_FRAGMENT, ctx);
    },
    async financialBeings(parent, args, ctx, info) {
      return await ctx.db.query.financialBeings({}, BEINGS_FRAGMENT);
    },
    async financialBeingsByName(parent, {name}, ctx, info) {
      return await ctx.db.query.financialBeings({where: {name: name}}, BEINGS_FRAGMENT);
    },
    async financialBeingsByID(parent, {id}, ctx, info) {
      return await ctx.db.query.financialBeings({where: {id: id}}, BEINGS_FRAGMENT);
    }
  }
  // Mutation: {
  //   async upvotePost(parent, arg, ctx, info) {
  //     return await mutationUpvotePostsResolver(parent, {postId: arg.postId});
  //   }
  // },
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
};

const schema = makeExecutableSchema({
  typeDefs: importSchema('./server/schema.graphql'),
  resolvers
});

module.exports = {
  schema: schema
};
