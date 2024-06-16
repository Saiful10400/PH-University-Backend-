import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import { UserModel } from '../user/user.model';
import { StudentModel } from './student.model';
import appError from '../../handleError/appErrorHandler';

const getAll = async (query: Record<string, unknown>) => {
    const result=await StudentModel.find().populate({path:"academicDepartment",populate:{path:"academicFaculty"}}).populate("admissionSemester").populate("user")
    return result
};

const getOne = async (id: string) => {
  const result = await StudentModel.findById(id).populate({path:"academicDepartment",populate:{path:"academicFaculty"}}).populate("admissionSemester").populate("user")
  return result;
};

const updateOne = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  /*
    guardain: {
      fatherOccupation:"Teacher"
    }

    guardian.fatherOccupation = Teacher

    name.firstName = 'Mezba'
    name.lastName = 'Abedin'
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await StudentModel.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteOne = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await StudentModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new appError(httpStatus.FAILED_DEPENDENCY,'Failed to delete student');
    }

    // get user _id from deletedStudent
    const userId = deletedStudent.user;

    const deletedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new appError(httpStatus.FAILED_DEPENDENCY,'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new appError(httpStatus.FAILED_DEPENDENCY,'Failed to delete student');
  }
};

export const StudentServices = {
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
