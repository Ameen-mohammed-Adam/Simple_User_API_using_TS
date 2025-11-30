import Joi from "joi";
// import { catchAsync } from "./catchAsycn";?

export const UserCreationValidation = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(10).max(40).required(),
});
