# federated-alias-bug-example

## How to setup and run this demo

1) Install dependencies

```
npm install
```

2) Run subgraph

```
npm run subgraph-start
```

3) Run gateway

```
npm run gateway-start
```

4) Run the query 

```graphql
query {
  search {
    __typename
    id

    ... on Repository {
      good_alias: name
      broken_alias: repository_name
    }
    ... on User {
        good_alias: name
        broken_alias: user_name
    }

  }

}
```
