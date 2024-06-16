import express from "express";
import userController from "./user.controller";
import { AnyZodObject } from "zod";
import zodValidation from "../../middleware/zodvalidation";
import { stdZodValidation } from "../student/student.validation";

const userRoute = express.Router();

// create a student.

// studetn data validator.


userRoute.post(
  "/student",
  zodValidation(stdZodValidation.create),
  userController.createAStudent
);

export default userRoute;
