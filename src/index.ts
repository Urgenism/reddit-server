import { MikroORM } from "@mikro-orm/core";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  // const post = orm.em.create(Post, { title: "My First post" });
  // await orm.em.persistAndFlush(post);

  const posts = await orm.em.find(Post, {});
  console.log("posts", posts);
};

main().catch((err) => {
  console.log(err);
});
console.log("hello world");
console.log("This is the name");
