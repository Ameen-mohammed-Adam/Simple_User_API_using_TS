import { IUser, User } from "../models/UserSchema";
// import { MiddleWarefn } from "../types/types";
import { catchAsync } from "../utils/catchAsycn";
export const CreateUser = catchAsync(async (req, res, next) => {
  const { name, password, email } = req.body || {};
  //   if (role === "admin" && req.user.role != "admin") {
  //     return next(new Error("Only admins can do that"));
  //   }
  const user = await User.create({
    name,
    password,
    email,
  });
  //   if(!user)throw new AppError("Something Went Wrong P?")
  res.status(201).json({ status: "success", data: user });
});

export const getUserData = catchAsync(async (req, res, next) => {
  const { email } = req.body || {};
  const user: IUser | null = await User.findOne({ email });
  if (!user) {
    return next(new Error("User Not Found"));
  }
  res.status(200).json({ status: "success", data: user });
});

export const AdminDeleteUser = catchAsync(async (req, res, next) => {});
