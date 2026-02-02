import express, { NextFunction, Request, Response } from "express";
import { router } from "./routes/userRoutes";
// import { connect } from "./Mongodb";
// import axios from "axios";
require("dotenv").config();
const app = express();

app.use(express.json());
app.use("/api/v1/user", router);
app.get("/", (req, res) => {
  res.status(500).json({ Hello: "World" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
  console.log(err);
});
const start = async () => {
  // await connect();
  app.listen(4000, () => {
    console.log("Running on Port 4000");
  });
  // await axios.get("http://localhost:4000/");
};
// const arr = [1];
// const Hello = arr.find((el) => el === 2) || false;
// if (!Hello) {
//   console.log("This is Bad");
// }
const arr = [1, 2, 1, 1];
const hi = arr.filter((el) => el === 1);
console.log(hi);
start();
