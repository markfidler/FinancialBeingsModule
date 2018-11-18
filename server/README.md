# FinancialBeingsModule
Manages Financial Beings within the system

## Getting started

```
$ npm install
$ npm run start
```
Go to: <http://localhost:4001/graphql>

You can run the following query in GraphQL
```
query FB {
  financialBeings {
    id
    type
    kind
    name
    slug
    avatar
    creator
    status {
      status
      reason
    }
    updatedOn
    createdOn
    team
    admins {
      adminId
    }
  }
}

mutation CreateFB {
  createFinancialBeing(
    type: BOT,
    kind: TRADER,
    name: "test2",
    teamId: "cjnlqituh006u0871x63l92sf",
    status: ACTIVE,
    reason: "some-reason",
  ) {
    id
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
AA_USER_MODULE=
AA_TEAMS_MODULE=
TOKEN=
PORT=
```
