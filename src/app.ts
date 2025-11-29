import express, { NextFunction, Request, Response } from "express";
import { router } from "./routes/userRoutes";
import { connect } from "./Mongodb";
require("dotenv").config();
const app = express();

app.use(express.json());
app.get("/api/v1/user", (res: Response) => {
  res.send("Hello User. How Are You");
});
app.use("/api/v1/user", router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
  console.log("Hello World This is an Error");
});
const start = async () => {
  await connect();
  app.listen(4000, () => {
    console.log("Running on Port 4000");
  });
};

start();
