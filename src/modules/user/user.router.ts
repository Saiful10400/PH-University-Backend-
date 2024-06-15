import express from "express";
import userController from "./user.controller";
import { AnyZodObject } from "zod";
import stdZodValSchema from "../student/student.validation";
import zodValidation from "../../middleware/zodvalidation";

const userRoute = express.Router();

// create a student.

// studetn data validator.


userRoute.post(
  "/student",
  zodValidation(stdZodValSchema.stdMiddlewareVal),
  userController.createAStudent
);

export default userRoute;
