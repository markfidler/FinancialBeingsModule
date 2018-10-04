# FinancialBeingsModule
Manages Financial Beings within the system

## Getting started

```
$ npm install
$ npm bin/www
```
Go to: <http://localhost:3000/graphql>

You can run the following query in GraphQL
```
query {
  author(id: 1) {
    id
    firstName
    lastName
  }
}
```
...and if you get this response you should be up and running

```
{
  "data": {
    "author": {
      "id": 1,
      "firstName": "Tom",
      "lastName": "Coleman"
    }
  }
}
```

### Database
Now, we need to initialize database

You need knex installed globally and PostgreSQL database created (the same in `.env DB_DATABASE=`)

After you set that up, then:
```
// You can run migration
$ knex migrate:latest

// ...and seeds if necessary
$ knex seed:run

// If you need to downgrade, do: 
$ knex migrate rollback
```

## .env Example

We're using .env in order not to push sensitive information to GitHub.

Quick reference - if you need to require dotenv, you can use `-r dotenv/config`

.env example used for this project:
```
# DATABASE
DB_HOST=
DB_USER=
DB_PASS=
DB_DATABASE=
DB_PORT=
```
