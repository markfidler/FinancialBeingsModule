'use strict';

const {makeExecutableSchema} = require('graphql-tools');
const {importSchema} = require('graphql-import');

// Import resolver implementations from service
const {
  postsQueryResolver,
  authorQueryResolver,
  upvotePostsMutationResolver,
  postsAuthorResolver,
  authorPostsResolver
} = require('./service');

const resolvers = {
  Query: {
    posts: postsQueryResolver,
    author: authorQueryResolver
  },
  Mutation: {
    upvotePost: upvotePostsMutationResolver
  },
  Author: {
    posts: postsAuthorResolver
  },
  Post: {
    author: authorPostsResolver
  }
};

const schema = makeExecutableSchema({
  typeDefs: importSchema('./server/schema.graphql'),
  resolvers
});

module.exports = {
  schema: schema
};
