import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import express from "express";
import microConfig from "./mikro-orm.config";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import cors from "cors";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express();

  app.use(cors());

  app.get("/", (_, res) => {
    res.send("hello");
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: new RegExp("/*/"),
    },
  });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
  // const post = orm.em.create(Post, { title: "My First post" });
  // await orm.em.persistAndFlush(post);

  // const posts = await orm.em.find(Post, {});
  // console.log("posts", posts);
};

main().catch((err) => {
  console.log(err);
});
console.log("hello world");
console.log("This is the name");
