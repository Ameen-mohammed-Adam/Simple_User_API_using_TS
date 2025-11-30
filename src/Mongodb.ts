import mongoose from "mongoose";
import { IUser, User } from "./models/UserSchema";
require("dotenv").config();
export const connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/User");
    console.log("Mongodb Connected on port 27017");
    const admin: IUser | null = await User.findOne({
      name: String(process.env.first_Admin_name),
    });
    if (admin) {
      return;
    }
    await User.create({
      name: String(process.env.first_Admin_name),
      password: String(process.env.first_Admin_Password),
      email: String(process.env.first_Admin_email),
      role: "admin",
    });
    return;
  } catch (err) {
    console.error("Mongodb Failed.");
    process.exit(1);
  }
};
