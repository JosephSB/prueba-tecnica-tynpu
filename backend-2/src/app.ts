import express, { Request, Response, Express } from "express";
import { createHandler } from "graphql-http/lib/use/express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { buildSchema } from "graphql";

import { resolvers } from "./graphql/resolvers";

const createApp = async (): Promise<Express> => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get("/", (req: Request, res: Response) => {
    res.send("Server express");
  });

  const schemaPath = path.join(__dirname, "./graphql/schema.graphql");
  const schemaString = fs.readFileSync(schemaPath, "utf-8");
  const schema = buildSchema(schemaString);

  app.use(
    "/graphql",
    createHandler({ schema, rootValue: resolvers }),
  );

  return app;
};

export default createApp;
