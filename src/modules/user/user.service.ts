//1. create a new student.

import mongoose from "mongoose";
import config from "../../config";
import { TStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser, TnewUser } from "./user.interface";
import { UserModel } from "./user.model";
import appError from "../../handleError/appErrorHandler";
import httpStatus from "http-status";

const CreateAStudent = async (password: string, stdData: TStudent) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const userDAta: Partial<TUser> = {};
    userDAta.password = password || (config.defPassword as string);
    userDAta.id = "2024sem10001";
    userDAta.role = "student";
    const result = await UserModel.create([userDAta], { session });

    // if success then create a new student.
    if (result.length) {
      
      stdData.id = result[0].id;
      stdData.user = result[0]._id;

      // create a new student into db.
      
      const stdResult = await StudentModel.create([stdData], { session });
      console.log(stdResult)
      if (!stdResult.length) {
        throw new appError(httpStatus.BAD_REQUEST, "Failed to create student.");
      }
    
      await session.commitTransaction();
      session.endSession();
      
      return stdResult;
    }
    
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw new appError(httpStatus.INTERNAL_SERVER_ERROR,"nothing is created")
    
  }
};
 
// let's export the functions.

const userService = {
  CreateAStudent,
};

export default userService;
