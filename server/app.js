'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const graphqlHTTP = require('express-graphql');
const {schema} = require('./src/controller');
const cors = require('cors');

const notAllowed = {
  'errors': [
    {
      'code': 401,
      'message': 'Wait, you\'re not supposed to be here, go through the gate as everyone else'
    }
  ]
};

const {
  Prisma,
  extractFragmentReplacements
} = require('prisma-binding');

const {resolvers} = require('./src/controller');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


const db = new Prisma({
  fragmentReplacements: extractFragmentReplacements(resolvers),
  typeDefs: './src/db/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
  // secret: process.env.PRISMA_SECRET,
  debug: true
});

app.use('/graphql', (req, res, next) => {
  if (req.headers.preshared === process.env.GATEWAY_PRESHARED) {
    next();
  } else {
    return res.status(401).send(notAllowed);
  }
});

app.use('/graphql', graphqlHTTP(async req => ({
  schema: schema,
  graphiql: true,
  context: {
    db: db,
    req: req,
    __userId: req.headers.userid ? req.headers.userid : null
  }
})));


module.exports = app;
