// This example demonstrates a simple server with some
// relational data: Posts and Authors. You can get the
// posts for a particular author, and vice-versa

// Read the complete docs for graphql-tools here:
// http://dev.apollodata.com/tools/graphql-tools/generate-schema.html

const authors = [
  {id: 1, firstName: 'Tom', lastName: 'Coleman'},
  {id: 2, firstName: 'Sashko', lastName: 'Stubailo'},
  {id: 3, firstName: 'Mikhail', lastName: 'Novikov'}
];

const posts = [
  {id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2},
  {id: 2, authorId: 2, title: 'Welcome to Apollo', votes: 3},
  {id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1},
  {id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7}
];

module.exports = {
  authors: authors,
  posts: posts
};
