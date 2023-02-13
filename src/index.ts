import { ApolloServer } from "apollo-server";
import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";
// import * as walk from "walk-sync";
// import { readFileSync } from "fs";

// const serviceList = walk(`${__dirname}/services`, {
// directories: false,
// }).map((file) => require(`${__dirname}/services/${file}`));

const supergraphSdl = new IntrospectAndCompose({
  subgraphs: [{ name: "accounts", url: "http://localhost:4005/graphql" }],
});

const gateway = new ApolloGateway({
  supergraphSdl,
});

const server = new ApolloServer({
  gateway,
});

server.listen(8080).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
