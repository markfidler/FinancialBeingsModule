'use strict';

const {makeExecutableSchema} = require('graphql-tools');
const {importSchema} = require('graphql-import');

// Import resolver implementations from service
const {
  queryPostsResolver,
  queryAuthorResolver,
  mutationUpvotePostsResolver,
  authorPostsResolver,
  postsAuthorResolver
} = require('./service');

const resolvers = {
  Query: {
    async author(parent, arg, ctx, info) {
      return await queryAuthorResolver(parent, {id: arg.id});
    },
    async posts(parent, arg, ctx, info) {
      return await queryPostsResolver(parent, {postId: arg.id});
    }
  },
  Mutation: {
    async upvotePost(parent, arg, ctx, info) {
      return await mutationUpvotePostsResolver(parent, {postId: arg.postId});
    }
  },
  Author: {
    async posts(parent, arg, ctx, info) {
      return await authorPostsResolver(parent);
    }
  },
  Post: {
    async author(parent, arg, ctx, info) {
      return await postsAuthorResolver(parent);
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
