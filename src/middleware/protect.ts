import { User } from "../models/UserSchema";
import { MiddleWarefn } from "../types/types";
import { AppError } from "../utils/AppError";
import { catchAsync } from "../utils/catchAsycn";
import Jwt from "jsonwebtoken";
interface JWTPayload {
  email: string;
  iat: number;
  exp: number;
}
export const protect: MiddleWarefn = catchAsync(async (req, res, next) => {
  let token: string | undefined = req.header("Authorization")
    ? req.header("Authorization")
    : "String";
  if (token === "String") {
    return next(new AppError("You Are not Autherized.", 401));
  }
  if (token?.includes("Bearer")) {
    token = token.split(" ")[1];
  }
  const verify = <JWTPayload>(
    Jwt.verify(String(token), String(process.env.jwt_secret))
  );
  if (!verify) {
    return next(new AppError("JWT expired", 400));
  }
  const user = await User.findOne({ email: verify.email });
  if (!user) {
    return next(
      new AppError("Something Went Wrong please Re-login and try again", 400)
    );
  }
  res.locals.user = user;
  next();
});
