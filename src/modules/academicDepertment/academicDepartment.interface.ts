import { Schema } from "mongoose";


export interface TAcademicDepartment{
    name:string,
    academicFaculty:Schema.Types.ObjectId
}