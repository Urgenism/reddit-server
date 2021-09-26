import { Response, Request } from "express";
import { Redis } from "ioredis";

export type MyContext = {
  req: Request;
  redis: Redis;
  res: Response;
};
