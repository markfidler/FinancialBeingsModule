'use strict';

const {posts, authors} = require('./model');
const {find, filter} = require('lodash');

const postsQueryResolver = () => posts;
const authorQueryResolver = (_, {id}) => find(authors, {id: id});
const upvotePostsMutationResolver = (_, {postId}) => {
  const post = find(posts, {id: postId});
  if (!post) {
    throw new Error(`Couldn't find post with id ${postId}`);
  }
  post.votes += 1;
  return post;
};

const postsAuthorResolver = author => filter(posts, {authorId: author.id});
const authorPostsResolver = post => find(authors, {id: post.authorId});

module.exports = {
  postsQueryResolver: postsQueryResolver,
  authorQueryResolver: authorQueryResolver,
  upvotePostsMutationResolver: upvotePostsMutationResolver,
  postsAuthorResolver: postsAuthorResolver,
  authorPostsResolver: authorPostsResolver
};
