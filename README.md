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
