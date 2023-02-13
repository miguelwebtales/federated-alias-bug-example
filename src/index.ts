import { ApolloServer } from "apollo-server";
import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";
const { serializeQueryPlan } = require('@apollo/query-planner');

const supergraphSdl = new IntrospectAndCompose({
  subgraphs: [{ name: "example", url: "http://localhost:4005/graphql" }],
});

const gateway = new ApolloGateway({
  supergraphSdl,
  experimental_didResolveQueryPlan: function(options) {
    if (options.requestContext.operationName !== 'IntrospectionQuery') {
      console.log(serializeQueryPlan(options.queryPlan));
    }
  }
});

const server = new ApolloServer({
  gateway,
});

server.listen(8080).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
