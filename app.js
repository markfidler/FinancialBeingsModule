'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const graphqlHTTP = require('express-graphql');
const {schema} = require('./server/controller');

const {
  Prisma,
  extractFragmentReplacements,
  forwardTo
} = require('prisma-binding');

const {resolvers} = require('./server/controller');
const {
  checkJwt
} = require('./server/auth/middleware/jwt');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

const db = new Prisma({
  fragmentReplacements: extractFragmentReplacements(resolvers),
  typeDefs: './server/db/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
  // secret: process.env.PRISMA_SECRET,
  debug: true
});

app.use('/graphql', graphqlHTTP(req => ({
  schema: schema,
  graphiql: true,
  context: {
    db: db,
    req: req
  }
})));

app.use(
  function(err, request, res, next) {
    if (err) {
      return res.status(201).send(err.message);
    } else {
      next();
    }
  }
);

module.exports = app;
