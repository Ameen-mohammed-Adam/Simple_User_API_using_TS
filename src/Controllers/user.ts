import { IUser, User } from "../models/UserSchema";
import { AppError } from "../utils/AppError";
import { catchAsync } from "../utils/catchAsycn";
export const CreateUser = catchAsync(async (req, res, next) => {
  const { name, password, email } = req.body || {};

  const user = await User.create({
    name,
    password,
    email,
  });
  res.status(201).json({ status: "success", data: user });
});

export const getUserData = catchAsync(async (req, res, next) => {
  const { email } = req.body || {};
  const user: IUser | null = await User.findOne({ email });
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({ status: "success", data: user });
});

export const AdminDeleteUser = catchAsync(async (req, res, next) => {});
