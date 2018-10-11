'use strict';

const {posts, authors} = require('./model');
const {find, filter} = require('lodash');

const queryPostsResolver = async () => posts;
const queryAuthorResolver = async (_, {id}) => find(authors, {id: id});
const mutationUpvotePostsResolver = async (_, {postId}) => {
  const post = find(posts, {id: postId});
  if (!post) {
    throw new Error(`Couldn't find post with id ${postId}`);
  }
  post.votes += 1;
  return post;
};

const authorPostsResolver = async author => filter(posts, {authorId: author.id});
const postsAuthorResolver = async post => find(authors, {id: post.authorId});

module.exports = {
  queryPostsResolver: queryPostsResolver,
  queryAuthorResolver: queryAuthorResolver,
  mutationUpvotePostsResolver: mutationUpvotePostsResolver,
  authorPostsResolver: authorPostsResolver,
  postsAuthorResolver: postsAuthorResolver
};
