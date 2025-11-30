import { RequestHandler } from "express";
import { catchAsync } from "../utils/catchAsycn";
import Joi from "joi";
export const validate = (schema: Joi.ObjectSchema): RequestHandler =>
  catchAsync(async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(error);
    }
    next();
  });
