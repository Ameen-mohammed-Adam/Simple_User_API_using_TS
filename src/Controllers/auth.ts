import { IUser, User } from "../models/UserSchema";
import { AppError } from "../utils/AppError";
import { catchAsync } from "../utils/catchAsycn";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return next(new AppError("Please Provide email and password", 400));
  }
  const user: IUser | null = await User.findOne({ email });
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  const success = await bcrypt.compare(password, user.password);
  if (!success) {
    return next(new AppError("User not found", 404));
  }
  const JWT = jwt.sign({ email }, String(process.env.jwt_secret), {
    expiresIn: Number(process.env.jwt_expiry_time),
  });
  res.status(200).json({ status: "success", JWT });
});
