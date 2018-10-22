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

You need also docker for database (PostgreSQL and Prisma).

So you can do from the root folder:
```
$ docker-compose up -d

// and then you need to install prisma globally 

$ sudo npm install -g prisma

// after that, generate and deploy on localhost:4466 via Docker

$ prisma generate
$ prisma deploy 

```

## .env Example

We're using .env in order not to push sensitive information to GitHub.

Quick reference - if you need to require dotenv, you can use `-r dotenv/config`

.env example used for this project:
```
# DATABASE
DB_HOST=
DB_USER=
DB_PASS=root
DB_DATABASE=
DB_PORT=

AA_USER_MODULE=https://users-api.advancedalgos.net/graphql
AA_TEAMS_MODULE=https://teams-api.advancedalgos.net/graphql

PRISMA_ENDPOINT=
PRISMA_SECRET=
```
