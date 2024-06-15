import mongoose from "mongoose";
import { string } from "zod";
import { TAcademicSemester } from "./academicsemister.interface";
import schemisterconstant from "./academicsemister.constant";

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
  console.log(result)
  if(Object.keys(result).length){
    throw new Error("Schemister is already existed.")
  }
})

export const academicSemesterModel = mongoose.model<TAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema
);
