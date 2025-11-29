import { MiddleWarefn } from "../types/types";

export const catchAsync = (func: MiddleWarefn): MiddleWarefn => {
  return (req, res, next) => {
    Promise.resolve(func(req, res, next).catch(next));
  };
};
