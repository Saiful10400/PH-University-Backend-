import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
const zodValidation = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
      await schema.parseAsync(req.body);
       return next();
      } catch (err) {
        next(err);
      }
    };
  };

  export default zodValidation