import * as express from 'express';
import {json } from 'body-parser';

import {  makeExecutableSchema } from 'graphql-tools';
import mergeGraphqlSchemas = require('merge-graphql-schemas');

import * as path from 'path';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';

const fileLoader = mergeGraphqlSchemas.fileLoader;
const mergeTypes = mergeGraphqlSchemas.mergeTypes;
const mergeResolvers = mergeGraphqlSchemas.mergeResolvers;

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas'), { recursive: true, extensions: ['.graphql'] }))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

//create schema
function createSchema() {
    const executableSchema = makeExecutableSchema({
      typeDefs:  typeDefs,
      resolvers: resolvers,
      logger: { log: (e: any) => console.log(e) },
    });
    return executableSchema;
}

const app = express();
app.use(json());

const schema = createSchema();

app.use(
    '/graphql',
    json(),
    graphqlExpress(() => {
      return {
        schema,
        tracing: true,
        cacheControl: true,
      }
    }));

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: 'ws://localhost:3000/subscriptions',
  }));

app.listen(process.env.PORT || 8081, function () {
    console.log("server listening on port 8081");
});
