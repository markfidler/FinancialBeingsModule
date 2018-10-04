// Update with your config settings.
require('dotenv').config();

module.exports = {
  
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASS
    },
    migrations: {
      directory: './server/db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './server/db/seeds'
    }
  },
  
  staging: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASS
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  
  production: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_DATABASE_PRODUCTION,
      user: process.env.DB_USER_PRODUCTION,
      password: process.env.DB_PASS_PRODUCTION
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
  
};
