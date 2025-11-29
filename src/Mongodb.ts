import mongoose from "mongoose";
import { IUser, User } from "./models/UserSchema";
require("dotenv").config();
export const connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/User");
    console.log("Mongodb Connected on port 27017");
    const admin: IUser | null = await User.findOne({
      name: process.env.first_Admin_name || "Hello WOrld",
    });
    if (admin) {
      return;
    }
    await User.create({
      name: process.env.first_Admin_name || "Hello WOrld",
      password: process.env.first_Admin_Password || "Hello WOrld",
      email: process.env.first_Admin_email || "Hello WOrld",
      role: "admin",
    });
    return;
  } catch (err) {
    console.error("Mongodb Failed.");
    process.exit(1);
  }
};
