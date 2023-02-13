const { gql, ApolloServer } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { serializeQueryPlan } = require('@apollo/query-planner');

const typeDefs = gql`
  interface Node {
    id: ID!
  }

  type Repository implements Node {
    id: ID!
    name: String
    repository_name: String
  }

  type User implements Node {
    id: ID!
    name: String
    user_name: String
  }

  extend type Query {
    search: Node
  }
`;

const resolvers = {
  Query: {
    search: (_parent, _args, { utils, rootPath, dataSources }) => {
      return {
        type: "user",
        id: "user-id",
        name: "Miguel",
        user_name: "miguelwebtales",
      };
    },
  },
  Node: {
    __resolveType: () => "User",
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([
    {
      typeDefs,
      resolvers,
    },
  ]),
});

server.listen({ port: 4005 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});