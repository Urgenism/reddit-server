import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import { Response, Request } from "express";
import { Redis } from "ioredis";

export type MyContext = {
  em: EntityManager<IDatabaseDriver<Connection>>;
  req: Request;
  redis: Redis;
  res: Response;
};
