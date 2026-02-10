import express, { NextFunction, Request, Response } from "express";
import { router } from "./routes/userRoutes";
import { connect } from "./Mongodb";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
require("dotenv").config();
const app = express();
const options: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Simple User API",
      version: "0.0.1",
      description: "This is a simple TypeScript User API",
    },
    servers: [{ url: "http://localhost:4000" }],
  },
  apis: ["./src/routes/*.ts"],
};
const precs = swaggerJsDoc(options);
app.use(express.json());
app.use("/api/v1/user", router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(precs));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
  console.log(err);
});
const start = async () => {
  await connect();
  app.listen(4000, () => {
    console.log("Running on Port 4000");
  });
};

start();
