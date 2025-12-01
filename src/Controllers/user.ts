import { User } from "../models/UserSchema";
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
  const user = res.locals.user;
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({ status: "success", data: user });
});
