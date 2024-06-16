import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import appError from "../../handleError/appErrorHandler";
import httpStatus from "http-status";

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "academicfacultie",
    },
  },
  { timestamps: true }
);

academicDepartmentSchema.pre("save", async function (next) {
  const isDepartmentExist = await academicDepartmentModel.findOne({
    name: this.name,
  });
  if (isDepartmentExist) {
    throw new appError(httpStatus.BAD_REQUEST,"This department is already existing.");
  }
  next();
});

academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const isDepartmentExist = await academicDepartmentModel.findOne(
    this.getQuery()
  );
  if (!isDepartmentExist) {
    throw new appError(httpStatus.NOT_FOUND, "This department doesn't  exist.");
  }
  next();
});

export const academicDepartmentModel = model<TAcademicDepartment>(
  "academicDepartment",
  academicDepartmentSchema
);
