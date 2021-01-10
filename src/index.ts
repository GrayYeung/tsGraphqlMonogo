import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { mongoose } from "@typegoose/typegoose";
import { CommentResolver } from "./resolvers/CommentResolver";
import { Container } from "typedi";

// replace with your values if needed
const MONGO_DB_URL =
  "mongodb+srv://root:Admin@typescriptgraphqlbook.vftt4.mongodb.net/TypeScriptGraphQLBook?retryWrites=true&w=majority";

async function bootstrap() {
  try {
    // create mongoose connection
    // const mongoose =
    await mongoose.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [UserResolver, CommentResolver], // TODO
        container: Container,
      }),
      context: ({ req, res }) => ({ req, res }),
    });

    // Start the server
    const { url } = await apolloServer.listen(4000);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
  } catch (err) {
    console.error(err);
  }
}

bootstrap();

// (async () => {
//   const app = express();
//
//   await createConnection();
//
//   const apolloServer = new ApolloServer({
//     schema: await buildSchema({
//       resolvers: [UserResolver, CommentResolver] // TODO
//     }),
//     context: ({ req, res }) => ({ req, res })
//   });
//
//   apolloServer.applyMiddleware({ app, cors: false });
//
//   app.listen(4000, () => {
//     console.log("express server $port 4000 started");
//   });
// })();
