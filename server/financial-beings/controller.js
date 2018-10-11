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
    posts: queryPostsResolver,
    author: queryAuthorResolver
  },
  Mutation: {
    upvotePost: mutationUpvotePostsResolver
  },
  Author: {
    posts: authorPostsResolver
  },
  Post: {
    author: postsAuthorResolver
  }
};

const schema = makeExecutableSchema({
  typeDefs: importSchema('./server/schema.graphql'),
  resolvers
});

module.exports = {
  schema: schema
};
