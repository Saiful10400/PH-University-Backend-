import mongoose from "mongoose";
import { string } from "zod";
import { TAcademicSemester } from "./academicsemister.interface";
import schemisterconstant from "./academicsemister.constant";
import appError from "../../handleError/appErrorHandler";
import httpStatus from "http-status";

const academicSemesterSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: schemisterconstant.schemisterName
  },
  code: {
    type: String,
    enum: schemisterconstant.schemisterCode,
  },
  year: {
    type: String,
  },
  startMonth: {
    type: String,
    enum: schemisterconstant.month,
  },
  endMonth: {
    type: String,
    enum: schemisterconstant.month,
  },
},{timestamps:true});

academicSemesterSchema.pre("save",async function(next){
  // cheking is this exist or not in the database.
  const result=await academicSemesterModel.find({name:this.name,code:this.code,year:this.year})
  if(Object.keys(result).length){
    throw new appError(httpStatus.CONFLICT,"Schemister is already existed.")
  }
})
academicSemesterSchema.pre("findOneAndUpdate",async function(next){
  // cheking is this exist or not in the database.

  const result=await academicSemesterModel.findOne(this.getQuery())

  if(!result){
    throw new appError(httpStatus.BAD_GATEWAY,"Invalid schemister id")
  }
})

export const academicSemesterModel = mongoose.model<TAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema
);
