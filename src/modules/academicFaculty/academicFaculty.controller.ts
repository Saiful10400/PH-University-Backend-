import { Request,Response } from "express";
import catchAsync from "../../utils/catchAsync";
import academicFacultyService from "./academicFaculty.service";
import sendRes from "../../utils/sendRes";
import httpStatus from "http-status";

// create one
const createOne=catchAsync(async(req:Request,res:Response)=>{
    const result=await academicFacultyService.createOne(req.body) 
    
    sendRes(res, {
        data: result,
        message: "academis faculty is created successfully",
        status: httpStatus.OK,
        success: true,
      });
    
})

// get all.
const getAll=catchAsync(async(req:Request,res:Response)=>{
    const result=await academicFacultyService.getAll()
    
    sendRes(res, {
        data: result,
        message: "academis facultys fetched successfully",
        status: httpStatus.OK,
        success: true,
      });
    
})

// get one.
const getOne=catchAsync(async(req:Request,res:Response)=>{
    const {facultyId}=req.params
    const result=await academicFacultyService.getOne(facultyId)
    
    sendRes(res, {
        data: result,
        message: "academis faculty fetched successfully",
        status: httpStatus.OK,
        success: true,
      });
    
})

// update one
const updateOne=catchAsync(async(req:Request,res:Response)=>{
    const{facultyId}=req.params
    const result=await academicFacultyService.updateOne(facultyId,req.body) 
    
    sendRes(res, {
        data: result,
        message: "academis faculty is created successfully",
        status: httpStatus.OK,
        success: true,
      });
    
})


const academicFacultyController={
    createOne,
    getAll,
    updateOne,
    getOne
}
export default academicFacultyController