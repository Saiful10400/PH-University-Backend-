import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";


const academicDepartmentSchema=new Schema<TAcademicDepartment>(
    {
        name:{
            type:String,
            required:true,
            unique:true
        },
        academicFaculty:{
            type:Schema.Types.ObjectId,
            ref:"academicfacultie"

        }
        
    },
    {timestamps:true}
)

export const academicDepartmentModel=model<TAcademicDepartment>("academicDepartment",academicDepartmentSchema)